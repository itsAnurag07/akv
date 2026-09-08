import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WP_BASE_URL = 'https://akv.intelloft.in';
const WP_MEDIA_ENDPOINT = `${WP_BASE_URL}/wp-json/wp/v2/media`;
const WP_USERNAME = 'Image';
const WP_APP_PASSWORD = 'p3X5 KaJm 3mbj 6RZx AcDQ eTkI';
const AUTH_HEADER = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const OUTPUT_MAP_FILE = path.join(__dirname, '..', 'src', 'data', 'wpMediaMap.json');

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

async function uploadFile(fileName) {
  const filePath = path.join(IMAGES_DIR, fileName);
  const ext = path.extname(fileName).toLowerCase();
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
  const fileBuffer = fs.readFileSync(filePath);

  console.log(`\n[Uploading] ${fileName} (${(fileBuffer.length / 1024).toFixed(1)} KB)...`);

  const res = await fetch(WP_MEDIA_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': mimeType
    },
    body: fileBuffer
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`[Error] Failed to upload ${fileName}: HTTP ${res.status} ${res.statusText}`, errorText);
    throw new Error(`Upload failed for ${fileName}: ${res.statusText}`);
  }

  const data = await res.json();
  console.log(`[Success] ${fileName} uploaded -> ID: ${data.id}`);
  console.log(`          URL: ${data.source_url}`);
  return {
    id: data.id,
    sourceUrl: data.source_url,
    title: data.title?.rendered || fileName
  };
}

async function migrateAll() {
  console.log('====================================================');
  console.log('AKV Website -> WordPress Media Library Migration');
  console.log(`Target: ${WP_BASE_URL}`);
  console.log('====================================================');

  let mapping = {};
  if (fs.existsSync(OUTPUT_MAP_FILE)) {
    try {
      mapping = JSON.parse(fs.readFileSync(OUTPUT_MAP_FILE, 'utf8'));
    } catch (e) {
      mapping = {};
    }
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.webp'].includes(ext);
  });

  console.log(`Found ${imageFiles.length} image files to process.`);

  for (const file of imageFiles) {
    const relativeKey = `images/${file}`;
    if (mapping[relativeKey] && mapping[relativeKey].sourceUrl) {
      console.log(`[Skipping] ${file} is already migrated: ${mapping[relativeKey].sourceUrl}`);
      continue;
    }

    try {
      const result = await uploadFile(file);
      mapping[relativeKey] = {
        id: result.id,
        sourceUrl: result.sourceUrl,
        fileName: file,
        uploadedAt: new Date().toISOString()
      };
      fs.mkdirSync(path.dirname(OUTPUT_MAP_FILE), { recursive: true });
      fs.writeFileSync(OUTPUT_MAP_FILE, JSON.stringify(mapping, null, 2), 'utf8');
    } catch (err) {
      console.error(`Error uploading ${file}:`, err.message);
    }
  }

  console.log('\n====================================================');
  console.log(`Migration Complete! Total mapped images: ${Object.keys(mapping).length}`);
  console.log(`Mapping saved to: ${OUTPUT_MAP_FILE}`);
  console.log('====================================================');
}

migrateAll();
