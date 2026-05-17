import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Service = {
  title: string;
  tagline: string;
  overview: string;
  offerings: { name: string; desc: string }[];
  industries: string[];
};

const SERVICES: Record<string, Service> = {
  consultancy: {
    title: "Professional & Business Consultancy",
    tagline: "Strategy that translates into measurable performance.",
    overview: "We partner with leadership teams to clarify strategy, redesign operations and unlock growth. Our consultants combine sector depth with delivery discipline so recommendations actually become results.",
    offerings: [
      { name: "Corporate Strategy", desc: "Vision, market positioning and growth roadmaps grounded in data." },
      { name: "Organizational Design", desc: "Structures, roles and operating models that align to strategy." },
      { name: "Performance Improvement", desc: "Cost optimization, process redesign and KPI re-architecture." },
      { name: "Public Sector Advisory", desc: "Reform programs, capacity diagnostics and implementation support." },
    ],
    industries: ["Public Sector", "Financial Services", "Manufacturing", "Education"],
  },
  logistics: {
    title: "Logistics Solutions",
    tagline: "Reliable supply chains, end to end.",
    overview: "From first mile to last mile we design and operate logistics networks that move goods efficiently, safely and on schedule across regional and national footprints.",
    offerings: [
      { name: "Freight & Distribution", desc: "Road, rail and air freight coordination with full visibility." },
      { name: "Warehousing", desc: "Modern warehousing, inventory management and fulfilment." },
      { name: "Cold-Chain", desc: "Temperature-controlled logistics for agriculture and pharma." },
      { name: "Route Optimization", desc: "Data-driven network design and continuous improvement." },
    ],
    industries: ["Agriculture", "Retail", "Healthcare", "FMCG"],
  },
  cleaning: {
    title: "Cleaning Services",
    tagline: "Clean, safe, healthy environments — every day.",
    overview: "Professional cleaning programs for offices, institutions and industrial sites, delivered by trained crews using modern equipment and verified safety standards.",
    offerings: [
      { name: "Commercial Office Cleaning", desc: "Daily and periodic cleaning programs with quality assurance." },
      { name: "Industrial & Post-Construction", desc: "Specialist cleaning for sites that demand more." },
      { name: "Janitorial Outsourcing", desc: "Managed teams operating to defined SLAs." },
      { name: "Fumigation & Sanitization", desc: "Public-health grade treatments by certified technicians." },
    ],
    industries: ["Corporate", "Healthcare", "Education", "Hospitality"],
  },
  agriculture: {
    title: "Agriculture",
    tagline: "Innovation that feeds communities.",
    overview: "We support productivity and food security through mechanization, agronomy advisory, value-chain integration and farmer enablement.",
    offerings: [
      { name: "Mechanization Services", desc: "Equipment access for land preparation, planting and harvest." },
      { name: "Inputs & Advisory", desc: "Quality inputs paired with field-level agronomy support." },
      { name: "Aggregation & Off-take", desc: "Connecting smallholder output to structured markets." },
      { name: "Post-Harvest Solutions", desc: "Drying, storage and processing to reduce losses." },
    ],
    industries: ["Smallholder", "Commercial Farms", "Cooperatives", "Agri-Export"],
  },
  entrepreneurship: {
    title: "Entrepreneurship Development",
    tagline: "Equipping founders to build durable businesses.",
    overview: "Programs that combine training, mentorship and ecosystem access to help entrepreneurs move from idea to traction to scale.",
    offerings: [
      { name: "Founder Bootcamps", desc: "Intensive programs covering ideation through go-to-market." },
      { name: "MSME Acceleration", desc: "Structured growth support for established small businesses." },
      { name: "Mentorship Networks", desc: "Curated access to senior operators and investors." },
      { name: "Grant & Loan Readiness", desc: "Preparing ventures for institutional capital." },
    ],
    industries: ["Early-stage", "MSMEs", "Youth", "Women-led Enterprises"],
  },
  "capacity-building": {
    title: "Capacity Building",
    tagline: "Stronger people, stronger institutions.",
    overview: "Tailored programs that strengthen technical skills, leadership capability and institutional systems across public and private sector clients.",
    offerings: [
      { name: "Technical Skills Training", desc: "Practical, role-relevant skills with measurable assessments." },
      { name: "Leadership Development", desc: "Programs for emerging and senior leaders." },
      { name: "Institutional Strengthening", desc: "Systems, policies and governance assessments." },
      { name: "Coaching & Mentoring", desc: "1:1 support to translate learning into behavior change." },
    ],
    industries: ["Government", "NGOs", "Corporates", "Academia"],
  },
  digital: {
    title: "Digital Solutions",
    tagline: "Software, data and AI that move your business forward.",
    overview: "We architect, build and run digital products that automate workflows, unlock insight and scale with your business.",
    offerings: [
      { name: "Custom Software Development", desc: "Bespoke web and mobile platforms designed for your operations." },
      { name: "AI Integrations", desc: "Practical AI for document processing, decisioning and customer experience." },
      { name: "Enterprise Architecture", desc: "Cloud, data and integration strategies that scale." },
      { name: "Managed Services", desc: "Reliable run-state operations with 24/7 monitoring." },
    ],
    industries: ["Finance", "Public Sector", "Education", "Logistics"],
  },
  procurement: {
    title: "Procurement Services",
    tagline: "The right goods, sourced the right way.",
    overview: "End-to-end procurement support — from specification through sourcing, evaluation, contracting and delivery — with full traceability.",
    offerings: [
      { name: "Strategic Sourcing", desc: "Category strategies that lower cost and risk." },
      { name: "Tender Management", desc: "Compliant tender processes with rigorous evaluation." },
      { name: "Supplier Development", desc: "Capability building for critical suppliers." },
      { name: "Contract Administration", desc: "Active management of obligations and performance." },
    ],
    industries: ["Public Sector", "Construction", "Healthcare", "Education"],
  },
  administrative: {
    title: "Administrative & Business Support",
    tagline: "Operational backbone for growing organizations.",
    overview: "Reliable administrative and operational support that keeps your business running smoothly so leadership can focus on what matters.",
    offerings: [
      { name: "Office Operations", desc: "Facilities, vendor and front-office management." },
      { name: "Document & Records", desc: "Modern records management and digitization." },
      { name: "Event & Travel", desc: "Coordinated logistics for corporate events and travel." },
      { name: "Outsourced HR Support", desc: "Recruitment support, onboarding and payroll administration." },
    ],
    industries: ["SMEs", "Embassies & NGOs", "Corporates", "Public Sector"],
  },
  contracts: {
    title: "General Contract Services",
    tagline: "Disciplined execution across supply, maintenance and projects.",
    overview: "Professional contract delivery across supply contracts, facility maintenance and turnkey project execution.",
    offerings: [
      { name: "Supply Contracts", desc: "Reliable supply with quality controls and documentation." },
      { name: "Facility Maintenance", desc: "Scheduled and reactive maintenance for buildings and assets." },
      { name: "Turnkey Projects", desc: "Single-point accountability for multi-discipline projects." },
      { name: "Plant & Equipment", desc: "Sourcing, installation and commissioning." },
    ],
    industries: ["Public Sector", "Industrial", "Education", "Healthcare"],
  },
  infrastructure: {
    title: "Infrastructure Services",
    tagline: "Building the foundations of stronger communities.",
    overview: "Civil engineering, project management and urban planning support for clients delivering complex infrastructure outcomes.",
    offerings: [
      { name: "Project Management", desc: "Independent management of multi-stakeholder builds." },
      { name: "Civil Engineering Consultations", desc: "Design review, feasibility and construction supervision." },
      { name: "Urban Planning", desc: "Master-planning and land-use frameworks." },
      { name: "Building & Renovations", desc: "New build and refurbishment programs." },
    ],
    industries: ["Government", "Real Estate", "Education", "Healthcare"],
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const data = SERVICES[params.slug];
    if (!data) throw notFound();
    return { service: data };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} — Optimum Edge` },
          { name: "description", content: loaderData.service.tagline },
        ]
      : [{ title: "Service — Optimum Edge" }],
  }),
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-primary">Service not found</h1>
      <Link to="/" className="mt-4 inline-block text-secondary hover:underline">Return home</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="container mx-auto p-12 text-destructive">{error.message}</div>,
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const [form, setForm] = useState({ name: "", email: "", brief: "" });
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.brief) {
      toast.error("Please complete all fields.");
      return;
    }
    toast.success("Request received. A specialist will reach out within 24 hours.");
    setForm({ name: "", email: "", brief: "" });
  }
  return (
    <>
      <PageHero eyebrow="Services" title={service.title} subtitle={service.tagline} />
      <section className="container mx-auto grid gap-12 px-4 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-primary">Overview</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{service.overview}</p>
          <h2 className="mt-10 text-2xl font-bold text-primary">What we offer</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {service.offerings.map((o) => (
              <div key={o.name} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <div>
                    <div className="font-bold text-primary">{o.name}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{o.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h2 className="mt-10 text-2xl font-bold text-primary">Industries we serve</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {service.industries.map((i) => (
              <span key={i} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">{i}</span>
            ))}
          </div>
        </div>
        <aside>
          <form onSubmit={submit} className="sticky top-32 space-y-3 rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-bold text-primary">Request this service</h3>
            <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Work email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea rows={5} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Brief description of your need" value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} />
            <button className="w-full rounded-md bg-secondary px-4 py-2 font-semibold text-secondary-foreground hover:bg-secondary/90">Send Request</button>
          </form>
        </aside>
      </section>
    </>
  );
}