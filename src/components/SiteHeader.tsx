import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram, ChevronDown } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/projects", label: "Projects" },
  { to: "/training", label: "Training" },
  { to: "/digital-hub", label: "Digital Hub" },
] as const;

const serviceLinks = [
  { to: "/services/consultancy", label: "Business Consultancy" },
  { to: "/services/logistics", label: "Logistics Solutions" },
  { to: "/services/cleaning", label: "Cleaning Services" },
  { to: "/services/agriculture", label: "Agriculture" },
  { to: "/services/entrepreneurship", label: "Entrepreneurship Development" },
  { to: "/services/capacity-building", label: "Capacity Building" },
  { to: "/services/digital", label: "Digital Solutions" },
  { to: "/services/procurement", label: "Procurement" },
  { to: "/services/administrative", label: "Administrative Support" },
  { to: "/services/contracts", label: "General Contracts" },
  { to: "/services/infrastructure", label: "Infrastructure" },
];

const resourceLinks = [
  { to: "/resources/whitepapers", label: "Whitepapers" },
  { to: "/resources/case-studies", label: "Case Studies" },
  { to: "/resources/brochures", label: "Brochures" },
];

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      {/* Top contact strip */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary font-bold text-primary">OE</div>
            <div className="leading-tight">
              <div className="text-base font-bold text-primary tracking-wide">OPTIMUM EDGE</div>
              <div className="text-[10px] font-semibold text-muted-foreground tracking-widest">GLOBAL SERVICES LIMITED</div>
              <div className="text-[9px] text-muted-foreground">COMPANY REG. NO. 8896447</div>
            </div>
          </Link>
          <div className="hidden items-center gap-6 text-muted-foreground md:flex">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-secondary" />08033654994, 08174494848</span>
            <a href="mailto:info@optimumedgeglobal.com" className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4 text-secondary" />info@optimumedgeglobal.com</a>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" />FCT - ABUJA, Nigeria</span>
          </div>
          <div className="flex items-center gap-2">
            <a aria-label="LinkedIn" href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-secondary"><Linkedin className="h-4 w-4" /></a>
            <a aria-label="Facebook" href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-secondary"><Facebook className="h-4 w-4" /></a>
            <a aria-label="Instagram" href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-secondary"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      {/* Main nav */}
      <div className="bg-primary">
        <div className="container mx-auto flex items-center justify-end px-4">
          <nav className="flex flex-wrap items-center gap-1 py-2 text-sm font-medium text-primary-foreground">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-md px-4 py-2 transition-colors hover:bg-white/10"
                activeProps={{ className: "rounded-md px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/90" }}
              >
                {l.label}
              </Link>
            ))}
            <Dropdown
              label="Services"
              open={openMenu === "services"}
              onToggle={() => setOpenMenu(openMenu === "services" ? null : "services")}
              onClose={() => setOpenMenu(null)}
              items={serviceLinks}
            />
            <Dropdown
              label="Resources"
              open={openMenu === "resources"}
              onToggle={() => setOpenMenu(openMenu === "resources" ? null : "resources")}
              onClose={() => setOpenMenu(null)}
              items={resourceLinks}
            />
            <Link to="/contact" className="ml-2 rounded-md bg-secondary px-5 py-2 font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90">Contact Us</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Dropdown({
  label,
  items,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  items: { to: string; label: string }[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 rounded-md px-4 py-2 transition-colors hover:bg-white/10"
      >
        {label} <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-lg">
          {items.map((i) => (
            <a
              key={i.to}
              href={i.to}
              onClick={(e) => {
                e.preventDefault();
                onClose();
                window.history.pushState({}, "", i.to);
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              className="block px-4 py-2 text-sm hover:bg-muted hover:text-secondary"
            >
              {i.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}