import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Download } from "lucide-react";
import { toast } from "sonner";

type ResourceConfig = {
  title: string;
  subtitle: string;
  items: { title: string; desc: string; meta: string }[];
};

const RESOURCES: Record<string, ResourceConfig> = {
  whitepapers: {
    title: "Whitepapers",
    subtitle: "In-depth analyses on the sectors we serve.",
    items: [
      { title: "Operationalizing AI in African Enterprises", desc: "A framework for moving beyond pilots to production-grade AI systems.", meta: "PDF • 22 pages" },
      { title: "Cold-Chain Economics for Smallholders", desc: "Investment logic and policy levers for resilient agricultural value chains.", meta: "PDF • 18 pages" },
      { title: "Public Procurement Modernization", desc: "Lessons from multi-state procurement reform programs.", meta: "PDF • 26 pages" },
      { title: "Digital Infrastructure for Mid-Market Firms", desc: "Pragmatic blueprints for scaling tech without enterprise budgets.", meta: "PDF • 20 pages" },
    ],
  },
  "case-studies": {
    title: "Case Studies",
    subtitle: "How Optimum Edge engagements have delivered outcomes.",
    items: [
      { title: "Federal Secretariat Refurbishment", desc: "Phased delivery completed 6% under budget with zero safety incidents.", meta: "PDF • 8 pages" },
      { title: "Regional Cold-Chain Logistics Rollout", desc: "Spoilage reduced from 22% to 4.5% across rural supply routes.", meta: "PDF • 10 pages" },
      { title: "National ERP Deployment", desc: "Processing times cut by 61% across 14 departments.", meta: "PDF • 12 pages" },
      { title: "Smart Campus Network", desc: "99.7% uptime and university-wide adoption within one semester.", meta: "PDF • 9 pages" },
    ],
  },
  brochures: {
    title: "Corporate Brochures",
    subtitle: "Overviews of our practice areas and capabilities.",
    items: [
      { title: "Corporate Capability Statement", desc: "A complete overview of Optimum Edge across all service lines.", meta: "PDF • 16 pages" },
      { title: "Digital Solutions Brochure", desc: "Detailed capability statement for digital and AI services.", meta: "PDF • 12 pages" },
      { title: "Infrastructure Services Brochure", desc: "Civil, project management and planning capabilities.", meta: "PDF • 14 pages" },
      { title: "Training & Capacity Building Catalog", desc: "Complete course catalog with schedules and outcomes.", meta: "PDF • 24 pages" },
    ],
  },
};

export const Route = createFileRoute("/resources/$type")({
  loader: ({ params }) => {
    const data = RESOURCES[params.type];
    if (!data) throw notFound();
    return { data };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.data.title} — Optimum Edge Resources` },
          { name: "description", content: loaderData.data.subtitle },
        ]
      : [{ title: "Resources — Optimum Edge" }],
  }),
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-primary">Resource not found</h1>
      <Link to="/" className="mt-4 inline-block text-secondary hover:underline">Return home</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="container mx-auto p-12 text-destructive">{error.message}</div>,
  component: ResourcePage,
});

function ResourcePage() {
  const { data } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Resources" title={data.title} subtitle={data.subtitle} />
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {data.items.map((it) => (
            <article key={it.title} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
                <div className="mt-3 text-xs text-muted-foreground">{it.meta}</div>
              </div>
              <button
                onClick={() => toast.success(`Download started: ${it.title}`)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                aria-label={`Download ${it.title}`}
              >
                <Download className="h-5 w-5" />
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}