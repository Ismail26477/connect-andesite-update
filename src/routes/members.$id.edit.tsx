import { createFileRoute, useNavigate, useParams, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera, Check, Image as ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { fetchMember, initials, updateMember, uploadMedia, type Member } from "@/lib/members";
import { toast } from "sonner";

export const Route = createFileRoute("/members/$id/edit")({
  head: () => ({ meta: [{ title: "Edit Profile · BNI Andesite" }] }),
  component: EditPage,
  errorComponent: ({ error }) => (
    <div className="p-6 text-center text-muted-foreground">Could not load: {error.message}</div>
  ),
  notFoundComponent: () => <div className="p-6 text-center">Member not found.</div>,
});

type FormState = Omit<Member, "id" | "created_at" | "updated_at">;

function EditPage() {
  const { id } = useParams({ from: "/members/$id/edit" });
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: member, isLoading } = useQuery({
    queryKey: ["member", id],
    queryFn: () => fetchMember(id),
  });
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<"photo" | "logo" | null>(null);

  useEffect(() => {
    if (member && !form) {
      const { id: _i, created_at: _c, updated_at: _u, ...rest } = member;
      setForm(rest);
    }
  }, [member, form]);

  if (isLoading || !form) {
    return (
      <div className="min-h-screen bg-secondary/40 p-4">
        <div className="mx-auto max-w-xl space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-2xl bg-white shadow-card" />
          ))}
        </div>
      </div>
    );
  }

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));

  async function handleUpload(kind: "photo" | "logo", file: File) {
    setUploading(kind);
    try {
      const url = await uploadMedia(id, kind, file);
      const field = kind === "photo" ? "photo_url" : "logo_url";
      set(field, url);
      await updateMember(id, { [field]: url });
      await qc.invalidateQueries({ queryKey: ["member", id] });
      await qc.invalidateQueries({ queryKey: ["members"] });
      toast.success(`${kind === "photo" ? "Photo" : "Logo"} uploaded`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  async function handleRemove(kind: "photo" | "logo") {
    const field = kind === "photo" ? "photo_url" : "logo_url";
    setUploading(kind);
    try {
      set(field, null);
      await updateMember(id, { [field]: null });
      await qc.invalidateQueries({ queryKey: ["member", id] });
      await qc.invalidateQueries({ queryKey: ["members"] });
      toast.success(`${kind === "photo" ? "Profile photo" : "Business logo"} removed`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not remove image");
    } finally {
      setUploading(null);
    }
  }

  async function handleSave() {
    if (!form) return;
    if (!form.name.trim()) { toast.error("Name is required"); return; }
    setSaving(true);
    try {
      await updateMember(id, form);
      await qc.invalidateQueries({ queryKey: ["member", id] });
      await qc.invalidateQueries({ queryKey: ["members"] });
      toast.success("Saved!");
      navigate({ to: "/members/$id", params: { id } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-secondary/40 pb-36">
      <header className="sticky top-0 z-10 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-xl items-center gap-3 px-4 py-3">
          <Link to="/members/$id" params={{ id }} className="grid h-10 w-10 place-items-center rounded-full bg-secondary active:bg-accent">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <p className="text-xs text-muted-foreground">Edit Profile</p>
            <h1 className="text-base font-semibold leading-tight">{form.name || "New Member"}</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 pt-5">
        {/* Photos */}
        <div className="rounded-3xl bg-white p-5 shadow-card">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Photos</p>
          <div className="flex items-center gap-5">
            <UploadAvatar
              label="Profile Photo"
              src={form.photo_url}
              fallback={initials(form.name || "?")}
              uploading={uploading === "photo"}
              onPick={(f) => handleUpload("photo", f)}
              onRemove={() => handleRemove("photo")}
              shape="round"
            />
            <UploadAvatar
              label="Business Logo"
              src={form.logo_url}
              fallback={<ImageIcon className="h-6 w-6" />}
              uploading={uploading === "logo"}
              onPick={(f) => handleUpload("logo", f)}
              onRemove={() => handleRemove("logo")}
              shape="square"
            />
          </div>
        </div>

        {/* Form */}
        <div className="mt-4 space-y-3">
          <Field label="Full Name" required value={form.name} onChange={(v) => set("name", v)} />
          <Field label="Category" value={form.category} onChange={(v) => set("category", v)} placeholder="e.g. Real Estate" />
          <Field label="Business Name" value={form.business_name} onChange={(v) => set("business_name", v)} />
          <Field label="Office Location" value={form.office_location ?? ""} onChange={(v) => set("office_location", v)} />
          <Field label="Date of Birth" type="date" value={form.date_of_birth ?? ""} onChange={(v) => set("date_of_birth", v || null)} />
          <Field label="Phone Number" type="tel" inputMode="tel" value={form.phone ?? ""} onChange={(v) => set("phone", v)} />
          <Field label="Email" type="email" inputMode="email" value={form.email ?? ""} onChange={(v) => set("email", v)} />
          <Field label="Website" type="url" inputMode="url" value={form.website ?? ""} onChange={(v) => set("website", v)} placeholder="https://" />
          <Field label="Instagram" value={form.instagram ?? ""} onChange={(v) => set("instagram", v)} placeholder="https://instagram.com/…" />
          <Field label="Facebook" value={form.facebook ?? ""} onChange={(v) => set("facebook", v)} placeholder="https://facebook.com/…" />
          <Field label="LinkedIn" value={form.linkedin ?? ""} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/in/…" />
          <Field label="Business Description" multiline value={form.business_description ?? ""} onChange={(v) => set("business_description", v)} />
          <Field label="Additional Notes" multiline value={form.additional_notes ?? ""} onChange={(v) => set("additional_notes", v)} />
        </div>
      </main>

      {/* Sticky save */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-white/95 px-4 pt-3 safe-bottom backdrop-blur">
        <div className="mx-auto max-w-xl">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-elevated active:opacity-90 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder, required, multiline, inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const empty = !value;
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 px-1 text-sm font-medium text-foreground">
        {label}{required && <span className="text-primary">*</span>}
        {empty && !required && (
          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            Please Update
          </span>
        )}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={
            "w-full rounded-2xl border bg-white px-4 py-3 text-base text-foreground shadow-card outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 " +
            (empty ? "border-primary/30" : "border-border")
          }
        />
      ) : (
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={
            "h-12 w-full rounded-2xl border bg-white px-4 text-base text-foreground shadow-card outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 " +
            (empty ? "border-primary/30" : "border-border")
          }
        />
      )}
    </label>
  );
}

function UploadAvatar({
  label, src, fallback, uploading, onPick, shape,
}: {
  label: string;
  src: string | null;
  fallback: React.ReactNode;
  uploading: boolean;
  onPick: (f: File) => void;
  shape: "round" | "square";
}) {
  const ref = useRef<HTMLInputElement>(null);
  const radius = shape === "round" ? "rounded-full" : "rounded-2xl";
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={"relative h-24 w-24 overflow-hidden " + radius + " bg-accent ring-2 ring-border active:opacity-80"}
      >
        {src ? (
          <img src={src} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center text-xl font-bold text-primary">{fallback}</div>
        )}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-primary py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
          {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Camera className="h-3 w-3" />}
          {uploading ? "Uploading" : "Change"}
        </div>
      </button>
      <span className="mt-2 text-xs font-medium text-muted-foreground">{label}</span>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
