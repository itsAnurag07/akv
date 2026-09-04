// ============================================================
// AKV GLOBAL CONSULTANCY — Off-Plan Data Store & Storage Manager
// Dual-mode: Supports Supabase Cloud DB with LocalStorage fallback
// ============================================================
import { OFFPLAN, PROPERTIES } from '../data';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'akv_offplan_projects_v1';

// Initial seed builder merging OFFPLAN array and any offplan PROPERTIES
export function getInitialSeedData() {
  const seedList = [...OFFPLAN];
  
  PROPERTIES.forEach(p => {
    if (p.offplan) {
      const exists = seedList.some(item => item.name.toLowerCase() === p.name.toLowerCase() || item.id === `op_${p.id}`);
      if (!exists) {
        seedList.push({
          id: `op_prop_${p.id}`,
          name: p.name,
          developer: p.developer || 'Leading Developer',
          location: p.location,
          price: p.price,
          paymentPlan: p.paymentPlan || '60/40',
          completion: p.completion || 'Q4 2026',
          img: p.img,
          images: [p.img, 'images/apartment.png', 'images/villa.png'],
          beds: p.beds,
          baths: p.baths,
          area: p.area,
          type: p.type || 'Off-Plan Apartment',
          category: p.category || 'Apartment',
          desc: p.desc || `${p.name} is an exclusive off-plan development offering luxury living and exceptional investment potential in ${p.location}.`,
          amenities: p.amenities || ['Swimming Pool', 'Fitness Center', '24/7 Security', 'Concierge Service', 'Landscaped Gardens'],
          community: p.community || p.location,
          offplan: true,
          createdDate: new Date().toISOString()
        });
      }
    }
  });

  return seedList.map(item => ({
    id: String(item.id),
    name: item.name || 'Untitled Project',
    developer: item.developer || 'Emaar Properties',
    location: item.location || 'Dubai',
    price: item.price || 'AED 1,500,000',
    paymentPlan: item.paymentPlan || '70/30',
    completion: item.completion || 'Q4 2026',
    img: item.img || 'images/offplan.png',
    images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.img || 'images/offplan.png', 'images/penthouse.png', 'images/villa.png'],
    beds: Number(item.beds) || 2,
    baths: Number(item.baths) || 2,
    area: String(item.area || '1,400'),
    type: item.type || 'Off-Plan Apartment',
    category: item.category || 'Apartment',
    desc: item.desc || `${item.name} is a high-end off-plan residential project by ${item.developer || 'master developer'}, located in ${item.location || 'Dubai'}.`,
    amenities: item.amenities || ['Lagoon Access', 'Infinity Pool', 'Smart Home System', 'Valet Parking', 'Concierge'],
    community: item.community || item.location || 'Dubai',
    offplan: true,
    createdDate: item.createdDate || new Date().toISOString()
  }));
}

// Map Supabase row to App project schema
function mapFromSupabase(row) {
  return {
    id: row.id,
    name: row.name,
    developer: row.developer,
    location: row.location,
    price: row.price,
    paymentPlan: row.payment_plan,
    completion: row.completion,
    img: row.img,
    images: Array.isArray(row.images) ? row.images : [],
    beds: row.beds,
    baths: row.baths,
    area: row.area,
    type: row.type,
    category: row.category,
    desc: row.description,
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    community: row.community,
    offplan: row.offplan,
    createdDate: row.created_at
  };
}

// Map App project to Supabase payload
function mapToSupabase(p) {
  return {
    id: String(p.id),
    name: p.name,
    developer: p.developer,
    location: p.location,
    price: p.price,
    payment_plan: p.paymentPlan,
    completion: p.completion,
    img: p.img,
    images: p.images || [],
    beds: Number(p.beds) || 0,
    baths: Number(p.baths) || 0,
    area: String(p.area || ''),
    type: p.type,
    category: p.category,
    description: p.desc || '',
    amenities: p.amenities || [],
    community: p.community,
    offplan: true,
    updated_at: new Date().toISOString()
  };
}

// Retrieve off-plan projects (Sync/Async compatible)
export function getOffPlanProjects() {
  // Always maintain local fallback synchronously for initial renders
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read off-plan projects from localStorage:', err);
  }

  const seedData = getInitialSeedData();
  saveOffPlanProjects(seedData);
  return seedData;
}

// Async fetch from Supabase
export async function fetchOffPlanProjectsFromSupabase() {
  if (!isSupabaseConfigured || !supabase) return getOffPlanProjects();

  try {
    const { data, error } = await supabase
      .from('offplan_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error.message);
      return getOffPlanProjects();
    }

    if (data && data.length > 0) {
      const formatted = data.map(mapFromSupabase);
      saveOffPlanProjects(formatted); // Sync to local storage
      return formatted;
    } else {
      // If table is empty, seed it to Supabase
      const seedData = getInitialSeedData();
      for (const item of seedData) {
        await supabase.from('offplan_projects').upsert(mapToSupabase(item));
      }
      return seedData;
    }
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
    return getOffPlanProjects();
  }
}

// Save complete list to localStorage
export function saveOffPlanProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save off-plan projects to localStorage:', err);
  }
}

// Create a new off-plan project
export async function addOffPlanProject(newProject) {
  const current = getOffPlanProjects();
  const id = `op_custom_${Date.now()}`;
  const formatted = {
    ...newProject,
    id,
    offplan: true,
    createdDate: new Date().toISOString(),
    img: newProject.img || (newProject.images && newProject.images[0]) || 'images/offplan.png',
    images: newProject.images && newProject.images.length > 0 ? newProject.images : [newProject.img || 'images/offplan.png']
  };
  const updated = [formatted, ...current];
  saveOffPlanProjects(updated);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('offplan_projects').insert(mapToSupabase(formatted));
    } catch (err) {
      console.error('Supabase insert error:', err);
    }
  }

  return updated;
}

// Update an existing off-plan project
export async function updateOffPlanProject(id, updatedData) {
  const current = getOffPlanProjects();
  let updatedItem = null;
  const updated = current.map(item => {
    if (String(item.id) === String(id)) {
      const mergedItem = {
        ...item,
        ...updatedData,
        id: item.id,
        offplan: true,
        updatedDate: new Date().toISOString()
      };
      if (mergedItem.images && mergedItem.images.length > 0) {
        mergedItem.img = mergedItem.images[0];
      }
      updatedItem = mergedItem;
      return mergedItem;
    }
    return item;
  });
  saveOffPlanProjects(updated);

  if (isSupabaseConfigured && supabase && updatedItem) {
    try {
      await supabase
        .from('offplan_projects')
        .update(mapToSupabase(updatedItem))
        .eq('id', String(id));
    } catch (err) {
      console.error('Supabase update error:', err);
    }
  }

  return updated;
}

// Delete an off-plan project
export async function deleteOffPlanProject(id) {
  const current = getOffPlanProjects();
  const updated = current.filter(item => String(item.id) !== String(id));
  saveOffPlanProjects(updated);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('offplan_projects').delete().eq('id', String(id));
    } catch (err) {
      console.error('Supabase delete error:', err);
    }
  }

  return updated;
}

// Reset data back to default seed dataset
export async function resetOffPlanProjects() {
  const seedData = getInitialSeedData();
  saveOffPlanProjects(seedData);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('offplan_projects').delete().neq('id', '0');
      for (const item of seedData) {
        await supabase.from('offplan_projects').upsert(mapToSupabase(item));
      }
    } catch (err) {
      console.error('Supabase reset error:', err);
    }
  }

  return seedData;
}

// Submit Inquiry to Supabase
export async function submitInquiry(inquiryData) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('inquiries').insert([{
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone || '',
        message: inquiryData.message || '',
        property_id: inquiryData.propertyId || ''
      }]);
      if (error) console.error('Inquiry submission error:', error.message);
      return { success: !error };
    } catch (err) {
      console.error('Inquiry error:', err);
    }
  }
  return { success: true };
}
