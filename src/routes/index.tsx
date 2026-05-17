import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Building2, Target, Eye, Briefcase, Truck, Sparkles, Sprout,
  Lightbulb, TrendingUp, Monitor, ShoppingCart, Headphones, FileCheck, Building,
  Award, Users, Rocket, ShieldCheck
} from "lucide-react";
import heroBuilding from "@/assets/hero-building.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Optimum Edge Global Services Limited — Building Excellence. Delivering Solutions." },
      { name: "description", content: "Optimum Edge Global Services Limited delivers innovative, reliable, result-driven solutions across consultancy, logistics, agriculture, infrastructure, digital and more." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Briefcase, color: "bg-secondary", title: "Professional & Business Consultancy Services", desc: "Strategic advisory and business solutions that elevate growth and improve performance." },
  { icon: Truck, color: "bg-primary", title: "Logistics Solutions", desc: "Efficient logistics and supply chain solutions ensuring timely and reliable delivery." },
  { icon: Sparkles, color: "bg-secondary", title: "Cleaning Services", desc: "Professional cleaning services for clean, safe and healthy environments." },
  { icon: Sprout, color: "bg-primary", title: "Agriculture", desc: "Innovative agricultural solutions supporting productivity and food security." },
  { icon: Lightbulb, color: "bg-secondary", title: "Entrepreneurship Development", desc: "Empowering entrepreneurs with the skills, tools and support to build successful businesses." },
  { icon: TrendingUp, color: "bg-primary", title: "Capacity Building", desc: "Training and development programs that strengthen skills and organizational capacity." },
  { icon: Monitor, color: "bg-primary", title: "Digital Solutions", desc: "Smart digital solutions that help businesses innovate, automate and grow." },
  { icon: ShoppingCart, color: "bg-secondary", title: "Procurement Services", desc: "Efficient procurement and supply solutions tailored to your business needs." },
  { icon: Headphones, color: "bg-primary", title: "Administrative & Other Business Support Activities", desc: "Reliable administrative and operational support that keeps your business running smoothly." },
  { icon: FileCheck, color: "bg-secondary", title: "General Contract Services", desc: "Professional contract services in supply, maintenance, and project execution." },
  { icon: Building, color: "bg-primary", title: "Infrastructure Services", desc: "Infrastructure development and support services that build stronger communities." },
] as const;

const serviceSlugs: Record<string, string> = {
  "Professional & Business Consultancy Services": "consultancy",
  "Logistics Solutions": "logistics",
  "Cleaning Services": "cleaning",
  "Agriculture": "agriculture",
  "Entrepreneurship Development": "entrepreneurship",
  "Capacity Building": "capacity-building",
  "Digital Solutions": "digital",
  "Procurement Services": "procurement",
  "Administrative & Other Business Support Activities": "administrative",
  "General Contract Services": "contracts",
  "Infrastructure Services": "infrastructure",
};

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-6xl">
              Building Excellence.<br />Delivering Solutions.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Optimum Edge Global Services Limited is a dynamic and forward-thinking company delivering innovative, reliable, and result-driven solutions across multiple industries. We help businesses, institutions, and communities achieve sustainable growth and long-term success.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services/consultancy" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-primary/90">
                Explore Our Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border-2 border-primary bg-background px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src={heroBuilding} alt="Optimum Edge corporate headquarters" width={1280} height={896} className="h-full max-h-[520px] w-full rounded-2xl object-cover shadow-2xl" />
            <div className="absolute -right-2 top-6 hidden w-72 space-y-5 rounded-2xl bg-card p-6 text-card-foreground shadow-2xl lg:block">
              <InfoRow icon={<Building2 className="h-5 w-5 text-primary" />} title="Company Reg. No." text="8896447" />
              <InfoRow icon={<Target className="h-5 w-5 text-secondary" />} title="Our Mission" text="To provide high-quality, sustainable and innovative services that empower businesses and communities." />
              <InfoRow icon={<Eye className="h-5 w-5 text-primary" />} title="Our Vision" text="To be a leading global service provider recognized for excellence, integrity and customer satisfaction." />
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">Our Core Services</h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded bg-secondary" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s) => {
              const Icon = s.icon;
              const slug = serviceSlugs[s.title];
              return (
                <Link
                  key={s.title}
                  to="/services/$slug"
                  params={{ slug }}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-xl"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${s.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.desc}</p>
                  <ArrowRight className="mt-4 h-5 w-5 text-secondary transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Banner */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Award, title: "Professional Excellence", desc: "Setting the highest standards of quality in every engagement." },
            { icon: Users, title: "Customer-Focused Approach", desc: "Solutions tailored around each client's unique objectives." },
            { icon: Rocket, title: "Innovative Solutions", desc: "Modern thinking, modern tools, measurable outcomes." },
            { icon: ShieldCheck, title: "Reliable Service Delivery", desc: "Dependable execution, on time and to specification." },
          ].map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-secondary text-secondary">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="font-bold">{v.title}</div>
                <p className="mt-2 text-sm text-primary-foreground/70">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">{icon}</div>
      <div>
        <div className="text-sm font-bold text-primary">{title}</div>
        <div className="text-xs leading-relaxed text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}
