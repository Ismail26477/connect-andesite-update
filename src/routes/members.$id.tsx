import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Pencil,
  Phone,
  Mail,
  Globe,
  MapPin,
  Cake,
  Instagram,
  Facebook,
  Linkedin,
  Briefcase,
} from "lucide-react";
import { fetchMember, initials } from "@/lib/members";

export const Route = createFileRoute("/members/$id")({
  head: () => ({
    meta: [{ title: "Member Profile · BNI Andesite" }],
  }),
  component: ProfilePage,
  errorComponent: ({ error }) => (
    <div className="p-6 text-center text-muted-foreground">Could not load profile: {error.message}</div>
  ),
  notFoundComponent: () => <div className="p-6 text-center">Member not found.</div>,
});

function ProfilePage() {
  const { id } = useParams({ from: "/members/$id" });
  const { data: member, isLoading } = useQuery({
    queryKey: ["member", id],
    queryFn: () => fetchMember(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary/40">
        <div className="h-64 animate-pulse bg-gradient-primary" />
        <div className="mx-auto max-w-xl space-y-3 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-white shadow-card" />
          ))}
        </div>
      </div>
    );
  }

  if (!member) {
    return <div className="p-6 text-center">Member not found.</div>;
  }

  return (
    <div className="min-h-screen bg-secondary/40 pb-32">
      {/* Header */}
      <div className="relative bg-gradient-primary px-5 pb-20 pt-6 text-primary-foreground">
        <div className="mx-auto flex max-w-xl items-center justify-between">
          <Link to="/" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur active:bg-white/25">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Link
            to="/members/$id/edit"
            params={{ id: member.id }}
            className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur active:bg-white/25"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="mx-auto -mt-16 max-w-xl px-4">
        {/* Avatar + name card */}
        <div className="rounded-3xl bg-white p-5 text-center shadow-elevated">
          {member.photo_url ? (
            <img
              src={member.photo_url}
              alt={member.name}
              className="mx-auto -mt-16 h-28 w-28 rounded-3xl object-cover ring-4 ring-white shadow-card"
            />
          ) : (
            <div className="mx-auto -mt-16 grid h-28 w-28 place-items-center rounded-3xl bg-accent text-3xl font-bold text-primary ring-4 ring-white shadow-card">
              {initials(member.name)}
            </div>
          )}
          <h1 className="mt-4 text-2xl font-bold text-foreground">{member.name}</h1>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <Briefcase className="h-4 w-4" />
            {member.category || "Please Update"}
          </p>
          <p className="mt-1 text-base text-muted-foreground">
            {member.business_name || <MissingInline />}
          </p>
          {member.logo_url ? (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
              <img src={member.logo_url} alt="Logo" className="h-6 w-6 rounded object-contain" />
              <span className="text-xs font-medium text-muted-foreground">Business Logo</span>
            </div>
          ) : null}
        </div>

        {/* Tap-to-edit hint */}
        <p className="mt-4 text-center text-xs text-muted-foreground">Tap any field below to edit it</p>

        {/* Contact section */}
        <Section title="Contact">
          <Row memberId={member.id} icon={<Phone className="h-5 w-5" />} label="Phone" value={member.phone} href={member.phone ? `tel:${member.phone}` : undefined} />
          <Row memberId={member.id} icon={<Mail className="h-5 w-5" />} label="Email" value={member.email} href={member.email ? `mailto:${member.email}` : undefined} />
          <Row memberId={member.id} icon={<Globe className="h-5 w-5" />} label="Website" value={member.website} href={member.website ?? undefined} external />
          <Row memberId={member.id} icon={<MapPin className="h-5 w-5" />} label="Office Location" value={member.office_location} />
          <Row memberId={member.id} icon={<Cake className="h-5 w-5" />} label="Date of Birth" value={member.date_of_birth} />
        </Section>

        {/* About */}
        <Section title="About the Business">
          <Link to="/members/$id/edit" params={{ id: member.id }} className="block active:opacity-80">
            <div className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-foreground shadow-card">
              {member.business_description || <MissingInline />}
            </div>
          </Link>
        </Section>

        {/* Social */}
        <Section title="Social">
          <div className="flex flex-wrap gap-2">
            <SocialChip memberId={member.id} icon={<Instagram className="h-4 w-4" />} label="Instagram" href={member.instagram} />
            <SocialChip memberId={member.id} icon={<Facebook className="h-4 w-4" />} label="Facebook" href={member.facebook} />
            <SocialChip memberId={member.id} icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" href={member.linkedin} />
          </div>
        </Section>

        <Section title="Notes">
          <Link to="/members/$id/edit" params={{ id: member.id }} className="block active:opacity-80">
            <div className="rounded-2xl bg-white p-4 text-sm text-muted-foreground shadow-card">
              {member.additional_notes || <MissingInline />}
            </div>
          </Link>
        </Section>
      </div>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-white/95 px-4 pt-3 safe-bottom backdrop-blur">
        <div className="mx-auto max-w-xl">
          <Link
            to="/members/$id/edit"
            params={{ id: member.id }}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-elevated active:opacity-90"
          >
            <Pencil className="h-5 w-5" /> Update My Information
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Row({
  icon, label, value, href, external,
}: { icon: React.ReactNode; label: string; value: string | null; href?: string; external?: boolean }) {
  const content = (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-foreground">
          {value || <MissingInline />}
        </p>
      </div>
    </div>
  );
  if (value && href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="block active:opacity-80">
        {content}
      </a>
    );
  }
  return content;
}

function SocialChip({ icon, label, href }: { icon: React.ReactNode; label: string; href: string | null }) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-medium text-muted-foreground shadow-card">
        {icon} {label}: <span className="text-primary">Please Update</span>
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-card active:opacity-90"
    >
      {icon} {label}
    </a>
  );
}

function MissingInline() {
  return <span className="text-sm font-medium text-primary">Please Update</span>;
}
