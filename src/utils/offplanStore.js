// ============================================================
// AKV GLOBAL CONSULTANCY — Off-Plan Data Store & Storage Manager
// Direct Cloud Mode: Supabase DB is the Single Source of Truth
// LocalStorage is permanently disabled/purged to prevent device discrepancies
// ============================================================
import { OFFPLAN, PROPERTIES } from '../data';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { resolveImageUrl } from './wpMedia';

const STORAGE_KEY = 'akv_offplan_projects_v1';

// Automatically flush and purge old legacy localStorage offplan caches across all devices
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('akv_offplan_projects');
    localStorage.removeItem('akv_offplan_data');
  } catch {
    // Ignore restricted storage environments
  }
}

// In-memory cache for fast synchronous renders
let memoryCache = [];

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
          images: [p.img, resolveImageUrl('images/apartment.png'), resolveImageUrl('images/villa.png')],
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
    img: resolveImageUrl(item.img || 'images/offplan.png'),
    images: Array.isArray(item.images) && item.images.length > 0 ? item.images.map(resolveImageUrl) : [resolveImageUrl(item.img || 'images/offplan.png'), resolveImageUrl('images/penthouse.png'), resolveImageUrl('images/villa.png')],
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
    pdfUrl: row.pdf_url || '',
    pdfName: row.pdf_name || '',
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
    pdf_url: p.pdfUrl || null,
    pdf_name: p.pdfName || null,
    updated_at: new Date().toISOString()
  };
}

// Synchronous getter for in-memory cache
export function getOffPlanProjects() {
  return memoryCache;
}

// In-memory updater (does NOT write to localStorage)
export function saveOffPlanProjects(projects) {
  memoryCache = projects || [];
}

// Async fetch directly from Supabase DB — No localStorage fallback or merge
export async function fetchOffPlanProjectsFromSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    return memoryCache;
  }

  try {
    const { data, error } = await supabase
      .from('offplan_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error.message);
      return memoryCache;
    }

    if (data && data.length > 0) {
      const formatted = data.map(mapFromSupabase);
      memoryCache = formatted;
      return formatted;
    } else {
      // If table is completely empty, seed it once
      const seedData = getInitialSeedData();
      for (const item of seedData) {
        await supabase.from('offplan_projects').upsert(mapToSupabase(item));
      }
      memoryCache = seedData;
      return seedData;
    }
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
    return memoryCache;
  }
}

// Create a new off-plan project directly in Supabase
export async function addOffPlanProject(newProject) {
  const id = `op_custom_${Date.now()}`;
  const formatted = {
    ...newProject,
    id,
    offplan: true,
    createdDate: new Date().toISOString(),
    img: resolveImageUrl(newProject.img || (newProject.images && newProject.images[0]) || 'images/offplan.png'),
    images: newProject.images && newProject.images.length > 0 
      ? newProject.images.map(resolveImageUrl) 
      : [resolveImageUrl(newProject.img || 'images/offplan.png')]
  };

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('offplan_projects')
      .insert(mapToSupabase(formatted));

    if (error) {
      console.error('Supabase insert error details:', error);
      throw new Error(error.message || 'Supabase insert failed');
    }
  }

  return await fetchOffPlanProjectsFromSupabase();
}

// Update an existing off-plan project directly in Supabase
export async function updateOffPlanProject(id, updatedData) {
  if (isSupabaseConfigured && supabase) {
    const mergedItem = {
      ...updatedData,
      id: String(id),
      offplan: true,
      updatedDate: new Date().toISOString()
    };
    if (mergedItem.images && mergedItem.images.length > 0) {
      mergedItem.img = mergedItem.images[0];
    }

    const { error } = await supabase
      .from('offplan_projects')
      .update(mapToSupabase(mergedItem))
      .eq('id', String(id));

    if (error) {
      console.error('Supabase update error details:', error);
      throw new Error(error.message || 'Supabase update failed');
    }
  }

  return await fetchOffPlanProjectsFromSupabase();
}

// Delete an off-plan project directly in Supabase
export async function deleteOffPlanProject(id) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('offplan_projects')
      .delete()
      .eq('id', String(id));

    if (error) {
      console.error('Supabase delete error details:', error);
      throw new Error(error.message || 'Supabase delete failed');
    }
  }

  return await fetchOffPlanProjectsFromSupabase();
}

// Reset data back to default seed dataset
export async function resetOffPlanProjects() {
  const seedData = getInitialSeedData();

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('offplan_projects').delete().neq('id', '0');
      for (const item of seedData) {
        await supabase.from('offplan_projects').upsert(mapToSupabase(item));
      }
      console.info('Supabase reset to defaults completed.');
    } catch (err) {
      console.error('Supabase reset error:', err);
      throw err;
    }
  }

  return await fetchOffPlanProjectsFromSupabase();
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
