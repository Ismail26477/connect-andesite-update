
CREATE TABLE public.members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT '',
  business_name text NOT NULL DEFAULT '',
  office_location text,
  date_of_birth date,
  phone text,
  email text,
  website text,
  instagram text,
  facebook text,
  linkedin text,
  business_description text,
  additional_notes text,
  photo_url text,
  logo_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.members TO anon, authenticated;
GRANT ALL ON public.members TO service_role;

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view members" ON public.members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can update members" ON public.members FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public can insert members" ON public.members FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER members_set_updated_at BEFORE UPDATE ON public.members
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX members_name_idx ON public.members (lower(name));
CREATE INDEX members_category_idx ON public.members (lower(category));
