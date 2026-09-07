// ============================================================
// AKV GLOBAL CONSULTANCY — WordPress Media Library Integration
// Dual-mode: Browser direct upload & Media Library gallery integration
// ============================================================
import wpMediaMap from '../data/wpMediaMap.js';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const WP_BASE_URL = (env.VITE_WP_BASE_URL || 'https://akv.intelloft.in').replace(/\/+$/, '');
const WP_USERNAME = env.VITE_WP_USERNAME || 'Image';
const WP_APP_PASSWORD = env.VITE_WP_APP_PASSWORD || 'p3X5 KaJm 3mbj 6RZx AcDQ eTkI';

// Safe base64 encoder for browser and SSR/Node environments
function getAuthHeader() {
  const token = `${WP_USERNAME}:${WP_APP_PASSWORD}`;
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return 'Basic ' + window.btoa(token);
  }
  if (typeof Buffer !== 'undefined') {
    return 'Basic ' + Buffer.from(token).toString('base64');
  }
  return '';
}

/**
 * Upload an image File or Blob directly to WordPress Media Library
 * @param {File|Blob} file - The file to upload
 * @param {string} [customFileName] - Optional override for filename
 * @returns {Promise<{ id: number, url: string, title: string, thumbnail: string }>}
 */
export async function uploadImageToWordPress(file, customFileName) {
  if (!file) throw new Error('No file provided for WordPress upload.');

  const endpoint = `${WP_BASE_URL}/wp-json/wp/v2/media`;
  const fileName = customFileName || file.name || `project_image_${Date.now()}.${(file.type || 'image/jpeg').split('/')[1] || 'jpg'}`;
  const contentType = file.type || 'image/jpeg';

  const headers = {
    'Authorization': getAuthHeader(),
    'Content-Disposition': `attachment; filename="${fileName}"`,
    'Content-Type': contentType,
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: file,
  });

  if (!response.ok) {
    let errorMsg = `WordPress upload failed: ${response.status} ${response.statusText}`;
    try {
      const errJson = await response.json();
      if (errJson.message) errorMsg += ` - ${errJson.message}`;
    } catch (_) {
      // ignore
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  const sourceUrl = data.source_url;
  const thumbnail = data.media_details?.sizes?.thumbnail?.source_url || sourceUrl;
  const medium = data.media_details?.sizes?.medium?.source_url || sourceUrl;

  return {
    id: data.id,
    url: sourceUrl,
    thumbnail,
    medium,
    title: data.title?.rendered || fileName,
  };
}

/**
 * Fetch images from WordPress Media Library Gallery
 * @param {{ page?: number, perPage?: number }} options
 * @returns {Promise<Array<{ id: number, url: string, thumbnail: string, title: string, date: string }>>}
 */
export async function fetchWordPressMediaGallery({ page = 1, perPage = 30 } = {}) {
  try {
    const endpoint = `${WP_BASE_URL}/wp-json/wp/v2/media?page=${page}&per_page=${perPage}&media_type=image`;
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': getAuthHeader(),
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch WP media: ${response.status}`);
      return [];
    }

    const items = await response.json();
    return items.map(item => ({
      id: item.id,
      url: item.source_url,
      thumbnail: item.media_details?.sizes?.thumbnail?.source_url || item.source_url,
      title: item.title?.rendered || item.slug,
      date: item.date,
    }));
  } catch (err) {
    console.error('Error fetching WordPress media gallery:', err);
    return [];
  }
}

/**
 * Resolves a local or legacy image path to its migrated WordPress Media URL.
 * If not in mapping or already a full URL, returns original path.
 * @param {string} path - Local path (e.g. 'images/penthouse.png') or full URL
 * @returns {string} WordPress media URL or original path
 */
export function resolveImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Normalize path format (remove leading slash if present for lookup)
  const cleanPath = path.replace(/^\/+/, '');
  if (wpMediaMap && wpMediaMap[cleanPath] && wpMediaMap[cleanPath].sourceUrl) {
    return wpMediaMap[cleanPath].sourceUrl;
  }

  return path;
}

export { WP_BASE_URL };
