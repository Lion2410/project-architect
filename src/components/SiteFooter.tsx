import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="mb-3 text-xl font-bold">Optimum Edge</div>
          <p className="text-sm text-primary-foreground/70">
            Delivering innovative, reliable, and result-driven solutions across multiple industries since our incorporation.
          </p>
        </div>
        <div>
          <div className="mb-3 font-semibold">Company</div>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-secondary">About Us</Link></li>
            <li><Link to="/projects" className="hover:text-secondary">Projects</Link></li>
            <li><Link to="/training" className="hover:text-secondary">Training</Link></li>
            <li><Link to="/contact" className="hover:text-secondary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 font-semibold">Resources</div>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/digital-hub" className="hover:text-secondary">Digital Hub</Link></li>
            <li><Link to="/resources/whitepapers" className="hover:text-secondary">Whitepapers</Link></li>
            <li><Link to="/resources/case-studies" className="hover:text-secondary">Case Studies</Link></li>
            <li><Link to="/resources/brochures" className="hover:text-secondary">Brochures</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 font-semibold">Get in touch</div>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-secondary" />08033654994</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-secondary" />info@optimumedgeglobal.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" />FCT - Abuja, Nigeria</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Optimum Edge Global Services Limited. Company Reg. No. 8896447. All rights reserved.
      </div>
    </footer>
  );
}