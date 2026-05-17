import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Optimum Edge Global Services Limited" },
      { name: "description", content: "Learn about Optimum Edge — our history, leadership, values and milestones across consulting and infrastructure." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2014", title: "Foundation", desc: "Optimum Edge incorporated in Abuja with a focus on professional consultancy and contract services." },
  { year: "2016", title: "First Major Infrastructure Engagement", desc: "Delivered a multi-site infrastructure rollout for a federal institution." },
  { year: "2018", title: "Expansion into Agriculture & Logistics", desc: "Diversified our service portfolio to support food security and supply chains." },
  { year: "2020", title: "Digital Transformation Practice", desc: "Launched the Digital Solutions division offering enterprise software and AI integrations." },
  { year: "2022", title: "Training & Capacity Building Institute", desc: "Opened a dedicated learning facility for professional development tracks." },
  { year: "2024", title: "Global Service Footprint", desc: "Expanded operations across West Africa with strategic partnerships and joint ventures." },
];

const values = [
  "Integrity in every engagement",
  "Excellence as a non-negotiable standard",
  "Innovation that compounds value",
  "Sustainability across people, planet and profit",
  "Accountability at every level of delivery",
  "Partnership built on mutual respect",
];

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="A dynamic company built to deliver excellence." subtitle="We exist to help businesses, institutions and communities achieve sustainable growth and long-term success through professional, innovative, result-driven services." />
      <section className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-primary">Our Story</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Founded in the Federal Capital Territory of Nigeria, Optimum Edge Global Services Limited was established to bridge the persistent gap between strategy and execution in emerging markets. Across a decade of operations we have grown from a focused consulting firm into a diversified, multi-sector service provider trusted by federal agencies, private enterprises and international development partners.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our approach is grounded in a simple conviction: clients deserve partners who are equally fluent in vision and in delivery. That conviction has shaped the disciplines we operate today — consultancy, logistics, agriculture, infrastructure, digital transformation, procurement, contracts, cleaning, training, and entrepreneurship development.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary">Core Values</h2>
          <ul className="mt-4 grid gap-3">
            {values.map((v) => (
              <li key={v} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span className="text-card-foreground">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-primary">Our Journey</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-secondary" />
          <div className="mx-auto mt-12 max-w-3xl">
            {timeline.map((t, i) => (
              <div key={t.year} className="relative flex gap-6 pb-10 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{t.year}</div>
                  {i < timeline.length - 1 && <div className="my-1 w-px flex-1 bg-border" />}
                </div>
                <div className="flex-1 rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="font-bold text-primary">{t.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-primary">Executive Leadership</h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">Our leadership team brings together decades of experience across engineering, consulting, public administration and technology — united by a commitment to deliver measurable outcomes for every client we serve.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { name: "Managing Director", title: "Strategy & Operations", bio: "Twenty years of executive leadership across infrastructure and federal advisory engagements." },
            { name: "Director of Digital", title: "Technology & Innovation", bio: "Background in enterprise software, AI integrations and large-scale digital transformation." },
            { name: "Director of Operations", title: "Delivery & Quality", bio: "Specialist in logistics, procurement and program management across multi-state portfolios." },
          ].map((p) => (
            <div key={p.name} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
              <div className="font-bold text-primary">{p.name}</div>
              <div className="text-sm font-medium text-secondary">{p.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}