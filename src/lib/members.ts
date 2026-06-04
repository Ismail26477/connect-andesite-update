import { ObjectId } from 'mongodb';
import { getDatabase, convertObjectId, convertObjectIdArray } from '@/lib/mongodb';

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
  try {
    const db = await getDatabase();
    const members = await db
      .collection('members')
      .find({})
      .sort({ name: 1 })
      .limit(1000)
      .toArray();
    
    return convertObjectIdArray(members).map(doc => ({
      id: doc.id,
      name: doc.name,
      category: doc.category,
      business_name: doc.business_name,
      office_location: doc.office_location || null,
      date_of_birth: doc.date_of_birth || null,
      phone: doc.phone || null,
      email: doc.email || null,
      website: doc.website || null,
      instagram: doc.instagram || null,
      facebook: doc.facebook || null,
      linkedin: doc.linkedin || null,
      business_description: doc.business_description || null,
      additional_notes: doc.additional_notes || null,
      photo_url: doc.photo_url || null,
      logo_url: doc.logo_url || null,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
    }));
  } catch (error) {
    console.error('[v0] Error fetching members:', error);
    throw error;
  }
}

export async function fetchMember(id: string): Promise<Member | null> {
  try {
    const db = await getDatabase();
    const member = await db
      .collection('members')
      .findOne({ _id: new ObjectId(id) });
    
    if (!member) return null;
    
    const converted = convertObjectId(member);
    return {
      id: converted.id,
      name: converted.name,
      category: converted.category,
      business_name: converted.business_name,
      office_location: converted.office_location || null,
      date_of_birth: converted.date_of_birth || null,
      phone: converted.phone || null,
      email: converted.email || null,
      website: converted.website || null,
      instagram: converted.instagram || null,
      facebook: converted.facebook || null,
      linkedin: converted.linkedin || null,
      business_description: converted.business_description || null,
      additional_notes: converted.additional_notes || null,
      photo_url: converted.photo_url || null,
      logo_url: converted.logo_url || null,
      created_at: converted.created_at,
      updated_at: converted.updated_at,
    };
  } catch (error) {
    console.error('[v0] Error fetching member:', error);
    throw error;
  }
}

export async function updateMember(id: string, patch: Partial<Member>) {
  try {
    const db = await getDatabase();
    const now = new Date().toISOString();
    
    const result = await db
      .collection('members')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...patch,
            updated_at: now,
          },
        },
        { returnDocument: 'after' }
      );
    
    if (!result.value) throw new Error('Member not found');
    
    const converted = convertObjectId(result.value);
    return {
      id: converted.id,
      name: converted.name,
      category: converted.category,
      business_name: converted.business_name,
      office_location: converted.office_location || null,
      date_of_birth: converted.date_of_birth || null,
      phone: converted.phone || null,
      email: converted.email || null,
      website: converted.website || null,
      instagram: converted.instagram || null,
      facebook: converted.facebook || null,
      linkedin: converted.linkedin || null,
      business_description: converted.business_description || null,
      additional_notes: converted.additional_notes || null,
      photo_url: converted.photo_url || null,
      logo_url: converted.logo_url || null,
      created_at: converted.created_at,
      updated_at: converted.updated_at,
    };
  } catch (error) {
    console.error('[v0] Error updating member:', error);
    throw error;
  }
}

export async function createMember(seed?: Partial<Member>): Promise<Member> {
  try {
    const db = await getDatabase();
    const now = new Date().toISOString();
    
    const newMember = {
      name: seed?.name ?? "New Member",
      category: seed?.category ?? "",
      business_name: seed?.business_name ?? "",
      office_location: seed?.office_location || null,
      date_of_birth: seed?.date_of_birth || null,
      phone: seed?.phone || null,
      email: seed?.email || null,
      website: seed?.website || null,
      instagram: seed?.instagram || null,
      facebook: seed?.facebook || null,
      linkedin: seed?.linkedin || null,
      business_description: seed?.business_description || null,
      additional_notes: seed?.additional_notes || null,
      photo_url: seed?.photo_url || null,
      logo_url: seed?.logo_url || null,
      created_at: now,
      updated_at: now,
    };
    
    const result = await db
      .collection('members')
      .insertOne(newMember as any);
    
    return {
      id: result.insertedId.toString(),
      ...newMember,
    };
  } catch (error) {
    console.error('[v0] Error creating member:', error);
    throw error;
  }
}

export async function deleteMember(id: string) {
  try {
    const db = await getDatabase();
    const result = await db
      .collection('members')
      .deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) throw new Error('Member not found');
  } catch (error) {
    console.error('[v0] Error deleting member:', error);
    throw error;
  }
}

export async function uploadMedia(memberId: string, kind: "photo" | "logo", file: File): Promise<string> {
  // This function is no longer used - uploads are handled client-side via FileReader
  // Kept for backwards compatibility if needed
  return '';
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}
