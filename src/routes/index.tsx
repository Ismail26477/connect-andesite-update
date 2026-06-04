import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, Pencil, User2, Briefcase, MapPin, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { initials, type Member } from "@/lib/members";
import { fetchMembersAPI, createMemberAPI } from "@/lib/api/members.server";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BNI Andesite Member Directory 2026" },
      { name: "description", content: "Search and connect with BNI Andesite members." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: () => fetchMembersAPI(),
  });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const addMutation = useMutation({
    mutationFn: () => createMemberAPI({}),
    onSuccess: async (m) => {
      await qc.invalidateQueries({ queryKey: ["members"] });
      toast.success("Member created — fill in details");
      navigate({ to: "/members/$id/edit", params: { id: m.id } });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not create member"),
  });

  const categories = useMemo(() => {
    const set = new Set<string>();
    members.forEach((m) => m.category && set.add(m.category));
    return ["All", ...Array.from(set).sort()];
  }, [members]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => {
      if (category !== "All" && m.category !== category) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.business_name.toLowerCase().includes(q) ||
        (m.office_location ?? "").toLowerCase().includes(q)
      );
    });
  }, [members, query, category]);

  return (
    <div className="min-h-screen bg-secondary/40">
      {/* Hero header */}
      <header className="bg-gradient-primary px-5 pb-8 pt-10 text-primary-foreground shadow-elevated">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-90">BNI Andesite</p>
          <h1 className="mt-1 text-2xl font-bold leading-tight">Member Directory 2026</h1>
          <p className="mt-1 text-sm opacity-90">{members.length} members · tap to view or update</p>

          <div className="relative mt-5">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              inputMode="search"
              placeholder="Search name, business, category…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-14 w-full rounded-2xl border-0 bg-white pl-12 pr-4 text-base text-foreground shadow-card placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>
        </div>
      </header>

      {/* Category chips */}
      <div className="mx-auto -mt-3 max-w-xl px-2">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 py-3">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition " +
                  (active
                    ? "bg-primary text-primary-foreground shadow-elevated"
                    : "bg-white text-foreground shadow-card hover:bg-accent")
                }
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Member list */}
      <main className="mx-auto max-w-xl px-4 pb-24 pt-2">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-white shadow-card" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-16 text-center text-muted-foreground">
            <p className="text-base">No members match your search.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </ul>
        )}
      </main>

      {/* Floating Add Member button */}
      <button
        onClick={() => addMutation.mutate()}
        disabled={addMutation.isPending}
        className="fixed bottom-6 right-5 z-20 flex h-14 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-elevated active:opacity-90 disabled:opacity-60"
      >
        {addMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
        Add Member
      </button>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <li className="overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="flex items-center gap-4 p-4">
        <Avatar name={member.name} src={member.photo_url} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-foreground">{member.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-primary">
            <Briefcase className="h-3.5 w-3.5" />
            <span className="truncate">{member.category || "Please update"}</span>
          </p>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {member.business_name || <MissingTag />}
          </p>
          {member.office_location ? (
            <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {member.office_location}
            </p>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-border">
        <Link
          to="/members/$id"
          params={{ id: member.id }}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-foreground active:bg-secondary"
        >
          <User2 className="h-4 w-4" /> View Profile
        </Link>
        <Link
          to="/members/$id/edit"
          params={{ id: member.id }}
          className="flex items-center justify-center gap-2 border-l border-border bg-primary py-3.5 text-sm font-semibold text-primary-foreground active:opacity-90"
        >
          <Pencil className="h-4 w-4" /> Update Details
        </Link>
      </div>
    </li>
  );
}

function Avatar({ name, src }: { name: string; src: string | null }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-border"
      />
    );
  }
  return (
    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-accent text-lg font-bold text-primary ring-1 ring-border">
      {initials(name)}
    </div>
  );
}

function MissingTag() {
  return (
    <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
      Please Update
    </span>
  );
}
