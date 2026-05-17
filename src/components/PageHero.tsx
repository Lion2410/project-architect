export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-20 text-primary-foreground">
      <div className="container mx-auto px-4">
        {eyebrow && <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">{eyebrow}</div>}
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">{subtitle}</p>}
      </div>
    </section>
  );
}