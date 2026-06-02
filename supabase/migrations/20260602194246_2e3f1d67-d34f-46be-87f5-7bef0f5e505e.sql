
CREATE POLICY "Public read member-media" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'member-media');
CREATE POLICY "Public upload member-media" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'member-media');
CREATE POLICY "Public update member-media" ON storage.objects FOR UPDATE TO anon, authenticated USING (bucket_id = 'member-media') WITH CHECK (bucket_id = 'member-media');
