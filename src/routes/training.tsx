import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training & Capacity Building — Optimum Edge" },
      { name: "description", content: "Professional development frameworks, capacity-building tracks and technical masterclasses." },
    ],
  }),
  component: TrainingPage,
});

const courses = [
  { code: "OE-LDR-101", title: "Executive Leadership & Strategy", duration: "5 days", schedule: "Quarterly", modules: ["Strategic thinking", "Org design", "Change leadership", "Board governance"] },
  { code: "OE-PMG-201", title: "Project Management Masterclass", duration: "10 days", schedule: "Monthly", modules: ["PMBOK foundations", "Agile delivery", "Risk & quality", "Stakeholder management"] },
  { code: "OE-DIG-301", title: "Digital Transformation for Leaders", duration: "4 days", schedule: "Bi-monthly", modules: ["AI & automation", "Cloud strategy", "Data-driven decisions", "Cybersecurity"] },
  { code: "OE-AGR-110", title: "Modern Agricultural Practices", duration: "7 days", schedule: "Seasonal", modules: ["Mechanization", "Soil & inputs", "Post-harvest", "Value chains"] },
  { code: "OE-ENT-150", title: "Entrepreneurship Bootcamp", duration: "14 days", schedule: "Monthly", modules: ["Idea validation", "MVP build", "Go-to-market", "Funding"] },
  { code: "OE-OPS-220", title: "Logistics & Supply Chain Excellence", duration: "6 days", schedule: "Quarterly", modules: ["Network design", "Warehousing", "Distribution", "Analytics"] },
];

function TrainingPage() {
  const [form, setForm] = useState({ name: "", email: "", course: courses[0].code, phone: "" });
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please complete required fields.");
      return;
    }
    toast.success("Enrollment received. Our training office will contact you within 24 hours.");
    setForm({ name: "", email: "", course: courses[0].code, phone: "" });
  }
  return (
    <>
      <PageHero eyebrow="Training" title="A learning portal built for measurable growth." subtitle="Professional development frameworks, corporate capacity-building tracks and technical masterclasses delivered by senior practitioners." />
      <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-primary">Course Catalog</h2>
          <div className="mt-6 grid gap-4">
            {courses.map((c) => (
              <div key={c.code} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-secondary">{c.code}</div>
                    <h3 className="text-lg font-bold text-primary">{c.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground">{c.duration} • {c.schedule}</div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.modules.map((m) => (
                    <span key={m} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside>
          <form onSubmit={submit} className="sticky top-32 space-y-3 rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-bold text-primary">Enroll Now</h3>
            <p className="text-sm text-muted-foreground">Reserve your seat in any upcoming cohort.</p>
            <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Email *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
              {courses.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.title}</option>)}
            </select>
            <button className="w-full rounded-md bg-secondary px-4 py-2 font-semibold text-secondary-foreground hover:bg-secondary/90">Submit Enrollment</button>
          </form>
        </aside>
      </section>
    </>
  );
}