import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  fetchMembers as _fetchMembers,
  fetchMember as _fetchMember,
  createMember as _createMember,
  updateMember as _updateMember,
  deleteMember as _deleteMember,
  uploadMedia as _uploadMedia,
  type Member,
} from "@/lib/members";

export const fetchMembersAPI = createServerFn({ method: "GET" }).handler(
  async () => {
    return _fetchMembers();
  }
);

export const fetchMemberAPI = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    return _fetchMember(id);
  });

export const createMemberAPI = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().optional(),
      category: z.string().optional(),
      business_name: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    return _createMember(data);
  });

export const updateMemberAPI = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      category: z.string().optional(),
      business_name: z.string().optional(),
      office_location: z.string().optional(),
      date_of_birth: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional(),
      website: z.string().optional(),
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      linkedin: z.string().optional(),
      business_description: z.string().optional(),
      additional_notes: z.string().optional(),
      photo_url: z.string().optional(),
      logo_url: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    const { id, ...patch } = data;
    return _updateMember(id, patch);
  });

export const deleteMemberAPI = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    await _deleteMember(id);
    return { success: true };
  });
