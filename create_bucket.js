import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lzjirrgswjoifjykbsuh.supabase.co';
const supabaseKey = 'sb_publishable_8h-WEpnRZ5lIE87ami34uQ_jjMdbL3Q';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.storage.createBucket('property-images', {
    public: true,
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'],
    fileSizeLimit: 10485760, // 10MB
  });
  console.log('Create Bucket Data:', data);
  console.log('Create Bucket Error:', error);
}

main();
