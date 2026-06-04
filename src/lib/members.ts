import { supabase } from "@/integrations/supabase/client";

export type Member = {
  id: string;
  name: string;
  category: string;
  business_name: string;
  office_location: string | null;
  date_of_birth: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  business_description: string | null;
  additional_notes: string | null;
  photo_url: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
};

export async function fetchMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("name", { ascending: true })
    .limit(1000);
  if (error) throw error;
  return (data ?? []) as Member[];
}

export async function fetchMember(id: string): Promise<Member | null> {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Member) ?? null;
}

export async function updateMember(id: string, patch: Partial<Member>) {
  const { data, error } = await supabase
    .from("members")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Member;
}

export async function createMember(seed?: Partial<Member>): Promise<Member> {
  const { data, error } = await supabase
    .from("members")
    .insert({
      name: seed?.name ?? "New Member",
      category: seed?.category ?? "",
      business_name: seed?.business_name ?? "",
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as Member;
}

export async function deleteMember(id: string) {
  const { error } = await supabase.from("members").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadMedia(memberId: string, kind: "photo" | "logo", file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${memberId}/${kind}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("member-media").upload(path, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type,
  });
  if (error) throw error;
  // Bucket is private — use a long-lived signed URL (10 years) so the image renders publicly.
  const { data, error: signErr } = await supabase.storage
    .from("member-media")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (signErr) throw signErr;
  return data.signedUrl;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}
