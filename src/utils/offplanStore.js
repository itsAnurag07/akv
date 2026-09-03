// ============================================================
// AKV GLOBAL CONSULTANCY — Off-Plan Data Store & Storage Manager
// ============================================================
import { OFFPLAN, PROPERTIES } from '../data';

const STORAGE_KEY = 'akv_offplan_projects_v1';

// Initial seed builder merging OFFPLAN array and any offplan PROPERTIES
export function getInitialSeedData() {
  const seedList = [...OFFPLAN];
  
  // Merge any properties marked offplan: true from PROPERTIES if not already in seed
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

  // Ensure all seed items have images array and required defaults
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

// Retrieve off-plan projects from localStorage (or fallback to seed)
export function getOffPlanProjects() {
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

  // Fallback to seed data and store it
  const seedData = getInitialSeedData();
  saveOffPlanProjects(seedData);
  return seedData;
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
export function addOffPlanProject(newProject) {
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
  return updated;
}

// Update an existing off-plan project
export function updateOffPlanProject(id, updatedData) {
  const current = getOffPlanProjects();
  const updated = current.map(item => {
    if (String(item.id) === String(id)) {
      const merged = {
        ...item,
        ...updatedData,
        id: item.id, // Preserve ID
        offplan: true,
        updatedDate: new Date().toISOString()
      };
      if (merged.images && merged.images.length > 0) {
        merged.img = merged.images[0];
      }
      return merged;
    }
    return item;
  });
  saveOffPlanProjects(updated);
  return updated;
}

// Delete an off-plan project
export function deleteOffPlanProject(id) {
  const current = getOffPlanProjects();
  const updated = current.filter(item => String(item.id) !== String(id));
  saveOffPlanProjects(updated);
  return updated;
}

// Reset data back to default seed dataset
export function resetOffPlanProjects() {
  const seedData = getInitialSeedData();
  saveOffPlanProjects(seedData);
  return seedData;
}
