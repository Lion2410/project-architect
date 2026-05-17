import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Optimum Edge Global Services Limited" },
      { name: "description", content: "Reach the Optimum Edge team in Abuja, Nigeria for project enquiries and partnerships." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(30).optional(),
  type: z.string().min(1),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "General Enquiry", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    toast.success("Message sent. We'll be in touch within one business day.");
    setForm({ name: "", email: "", phone: "", type: "General Enquiry", message: "" });
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's build what's next, together." subtitle="Reach our team for project enquiries, partnerships or general questions." />
      <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-1">
          <Info icon={<MapPin className="h-5 w-5" />} title="Head Office" text="Plot 12, Central Business District, FCT — Abuja, Nigeria" />
          <Info icon={<Phone className="h-5 w-5" />} title="Phone" text="08033654994, 08174494848" />
          <Info icon={<Mail className="h-5 w-5" />} title="Email" text="info@optimumedgeglobal.com" />
          <Info icon={<Clock className="h-5 w-5" />} title="Operating Hours" text="Monday — Friday: 8:00am – 6:00pm | Saturday: 9:00am – 2:00pm" />
          <div className="overflow-hidden rounded-xl border border-border">
            <iframe title="Abuja office" className="h-64 w-full" src="https://www.openstreetmap.org/export/embed.html?bbox=7.4%2C9.05%2C7.55%2C9.12&layer=mapnik" />
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <h2 className="text-2xl font-bold text-primary">Send us a message</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full Name *" error={errors.name}>
              <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Email *" error={errors.email}>
              <input type="email" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="Enquiry Type">
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {["General Enquiry", "Project Brief", "Partnership", "Procurement", "Training", "Media"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Message *" error={errors.message}>
            <textarea rows={6} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </Field>
          <button className="rounded-md bg-secondary px-6 py-3 font-semibold text-secondary-foreground hover:bg-secondary/90">Send Message</button>
        </form>
      </section>
    </>
  );
}

function Info({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">{icon}</div>
      <div>
        <div className="font-semibold text-primary">{title}</div>
        <div className="text-sm text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-primary">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}