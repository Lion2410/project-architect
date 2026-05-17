import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useState } from "react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Optimum Edge Global Services Limited" },
      { name: "description", content: "Portfolio of completed and ongoing projects across infrastructure, logistics, digital, agriculture and consultancy." },
    ],
  }),
  component: ProjectsPage,
});

const categories = ["All", "Infrastructure", "Logistics", "Digital Solutions", "Agriculture", "Consultancy"] as const;
type Cat = (typeof categories)[number];

const projects: { title: string; category: Exclude<Cat, "All">; client: string; challenge: string; strategy: string; outcome: string }[] = [
  { title: "Federal Secretariat Refurbishment", category: "Infrastructure", client: "Federal Ministry, Abuja", challenge: "Aging facility requiring full electrical, plumbing and finishing refurbishment without disrupting operations.", strategy: "Phased renovation plan with after-hours work, dedicated site supervision and weekly client reviews.", outcome: "Delivered on schedule and 6% below budget; zero safety incidents over 4,800 man-hours." },
  { title: "Regional Cold-Chain Logistics Rollout", category: "Logistics", client: "Agri-export Cooperative", challenge: "Produce spoilage losses exceeding 22% across rural supply routes.", strategy: "Designed a multi-hub cold-chain network with route optimization and digital tracking.", outcome: "Spoilage reduced to 4.5% and farmer income increased by an average of 28%." },
  { title: "Enterprise Resource Platform", category: "Digital Solutions", client: "National Development Authority", challenge: "Fragmented systems across 14 departments slowing program delivery.", strategy: "Built a unified ERP with role-based access, integrated reporting and AI-assisted document processing.", outcome: "Cut processing times by 61% and improved cross-department reporting accuracy." },
  { title: "Smallholder Mechanization Program", category: "Agriculture", client: "State Agriculture Board", challenge: "Low yields driven by manual cultivation and limited input access.", strategy: "Deployed mechanization clusters, agronomy advisory and aggregated procurement.", outcome: "Average yields up 47%; over 1,200 smallholders onboarded across three states." },
  { title: "Public Sector Performance Review", category: "Consultancy", client: "Sub-National Government", challenge: "Need for an independent baseline of MDA performance and reform roadmap.", strategy: "Mixed-method evaluation with stakeholder interviews, KPI redesign and an implementation playbook.", outcome: "Roadmap adopted; year-one indicators improved across 78% of monitored programs." },
  { title: "Smart Campus Network Upgrade", category: "Digital Solutions", client: "Tertiary Institution", challenge: "Unreliable connectivity hindering academic and administrative work.", strategy: "Designed a fibre-backed mesh network with managed Wi-Fi and 24/7 NOC.", outcome: "99.7% uptime; campus-wide adoption of digital learning tools within one semester." },
];

function ProjectsPage() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);
  return (
    <>
      <PageHero eyebrow="Projects" title="Outcomes that speak for themselves." subtitle="A selection of engagements where our teams have delivered measurable value across multiple industries." />
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${active === c ? "border-secondary bg-secondary text-secondary-foreground" : "border-border bg-card text-card-foreground hover:border-secondary"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((p) => (
            <article key={p.title} className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-secondary">{p.category}</div>
              <h3 className="mt-1 text-xl font-bold text-primary">{p.title}</h3>
              <div className="mt-1 text-sm text-muted-foreground">Client: {p.client}</div>
              <dl className="mt-4 space-y-3 text-sm">
                <Detail label="Challenge" value={p.challenge} />
                <Detail label="Strategy" value={p.strategy} />
                <Detail label="Outcome" value={p.outcome} />
              </dl>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-primary">{label}</dt>
      <dd className="text-muted-foreground">{value}</dd>
    </div>
  );
}