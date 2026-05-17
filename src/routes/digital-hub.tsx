import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useState } from "react";

export const Route = createFileRoute("/digital-hub")({
  head: () => ({
    meta: [
      { title: "Digital Hub — Optimum Edge" },
      { name: "description", content: "Industry insights, corporate articles and digital perspectives from Optimum Edge." },
    ],
  }),
  component: HubPage,
});

const cats = ["All", "Infrastructure", "Digital", "Agriculture", "Leadership", "Policy"] as const;

const articles = [
  { cat: "Digital", title: "How African Enterprises Are Operationalizing AI", excerpt: "A field view on what is genuinely working — and what is not — when teams move from pilots into production AI." },
  { cat: "Infrastructure", title: "Designing Resilient Public Buildings", excerpt: "Climate-aware design choices for civic facilities that need to perform across decades, not seasons." },
  { cat: "Agriculture", title: "Cold-Chain Economics for Smallholders", excerpt: "The unit economics behind cold-chain investments and the policies that unlock them." },
  { cat: "Leadership", title: "From Strategy to Execution: Closing the 30% Gap", excerpt: "Why most strategies stall in the middle of the organization and how to fix it structurally." },
  { cat: "Policy", title: "Procurement Reform That Actually Improves Outcomes", excerpt: "Lessons from multi-state procurement modernization programs." },
  { cat: "Digital", title: "Cybersecurity Baselines Every Mid-Market Firm Needs", excerpt: "Pragmatic controls that move the needle without enterprise-scale budgets." },
] as const;

function HubPage() {
  const [active, setActive] = useState<(typeof cats)[number]>("All");
  const filtered = active === "All" ? articles : articles.filter((a) => a.cat === active);
  return (
    <>
      <PageHero eyebrow="Digital Hub" title="Insights from the field." subtitle="Practitioner perspectives on what is working across the industries we serve." />
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={`rounded-full border px-4 py-2 text-sm font-medium ${active === c ? "border-secondary bg-secondary text-secondary-foreground" : "border-border bg-card hover:border-secondary"}`}>{c}</button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <article key={a.title} className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-secondary">{a.cat}</div>
              <h3 className="mt-2 text-lg font-bold text-primary">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
              <button className="mt-4 text-sm font-semibold text-secondary hover:underline">Read more →</button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}