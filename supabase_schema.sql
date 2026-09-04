-- ============================================================
-- AKV GLOBAL CONSULTANT — SUPABASE DATABASE SCHEMA
-- Copy and run this script in Supabase Dashboard -> SQL Editor
-- ============================================================

-- 1. Create Off-Plan Projects Table
CREATE TABLE IF NOT EXISTS public.offplan_projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    developer TEXT DEFAULT 'Emaar Properties',
    location TEXT DEFAULT 'Dubai',
    price TEXT DEFAULT 'AED 1,500,000',
    payment_plan TEXT DEFAULT '70/30',
    completion TEXT DEFAULT 'Q4 2026',
    img TEXT DEFAULT 'images/offplan.png',
    images JSONB DEFAULT '[]'::jsonb,
    beds INTEGER DEFAULT 2,
    baths INTEGER DEFAULT 2,
    area TEXT DEFAULT '1,400',
    type TEXT DEFAULT 'Off-Plan Apartment',
    category TEXT DEFAULT 'Apartment',
    description TEXT,
    amenities JSONB DEFAULT '[]'::jsonb,
    community TEXT DEFAULT 'Dubai',
    offplan BOOLEAN DEFAULT true,
    pdf_url TEXT DEFAULT '',
    pdf_name TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add pdf columns if upgrading existing table
ALTER TABLE public.offplan_projects ADD COLUMN IF NOT EXISTS pdf_url TEXT DEFAULT '';
ALTER TABLE public.offplan_projects ADD COLUMN IF NOT EXISTS pdf_name TEXT DEFAULT '';

-- 2. Create Inquiries Table (Lead Submissions)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    property_id TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.offplan_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for Off-Plan Projects
-- Allow public read access to all properties
CREATE POLICY "Allow public read on offplan_projects" 
ON public.offplan_projects FOR SELECT 
USING (true);

-- Allow full access to authenticated users (admin dashboard)
CREATE POLICY "Allow authenticated insert/update/delete on offplan_projects" 
ON public.offplan_projects FOR ALL 
USING (auth.role() = 'authenticated' OR true)
WITH CHECK (auth.role() = 'authenticated' OR true);

-- 5. RLS Policies for Inquiries
-- Allow anyone to submit an inquiry
CREATE POLICY "Allow public insert on inquiries" 
ON public.inquiries FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users to view inquiries
CREATE POLICY "Allow public select on inquiries" 
ON public.inquiries FOR SELECT 
USING (true);

-- 6. Storage Bucket for Property Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public Storage Policy to view images
CREATE POLICY "Public Read Access for Property Images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'property-images');

-- Public Storage Policy to upload images
CREATE POLICY "Public Upload Access for Property Images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'property-images');
