import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CONTACT, PRODUCTS } from "@/lib/content";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="border-t border-[#D7E2DC] bg-white text-[#17231F]">
      <div className="container-x grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo className="h-12 md:h-[86px] w-auto object-contain" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#66756F]">
            Neelikon Food Dyes and Chemicals Limited — manufacturer of food colours, pharmaceutical colourants, cosmetic pigments and specialty dyes, since 1983.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-primary font-bold">Products</p>
          <ul className="space-y-2.5 text-sm text-[#66756F]">
            {PRODUCTS.slice(0, 7).map((p) => (
              <li key={p.slug}>
                <a href={`/products/${p.slug}`} className="transition-colors hover:text-[#17664F]">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4 text-primary font-bold">Company</p>
          <ul className="space-y-2.5 text-sm text-[#66756F]">
            <li><Link to="/about" className="transition-colors hover:text-[#17664F]">About Neelikon</Link></li>
            <li><Link to="/formulation" className="transition-colors hover:text-[#17664F]">Formulation Lab</Link></li>
            <li><Link to="/industries" className="transition-colors hover:text-[#17664F]">Industries</Link></li>
            <li><Link to="/quality" className="transition-colors hover:text-[#17664F]">Quality & Certifications</Link></li>
            <li><Link to="/infrastructure" className="transition-colors hover:text-[#17664F]">Infrastructure</Link></li>
            <li><Link to="/innovation" className="transition-colors hover:text-[#17664F]">R&D & Science</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-[#17664F]">Contact Us</Link></li>
            <li><a href="https://neelikon.com/" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#17664F]">Privacy & disclaimer</a></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-primary font-bold">Contact</p>
          <address className="space-y-2.5 text-sm not-italic text-[#66756F]">
            <p className="leading-relaxed">{CONTACT.address}</p>
            <p><a href={`mailto:${CONTACT.email}`} className="font-medium text-[#17231F] transition-colors hover:text-[#17664F]">{CONTACT.email}</a></p>
            <p><a href={CONTACT.phoneHref} className="font-medium text-[#17231F] transition-colors hover:text-[#17664F]">{CONTACT.phone}</a></p>
          </address>
        </div>
      </div>
      <motion.div className="spectrum-bar h-1 origin-left opacity-90" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
      <div className="container-x flex flex-col justify-between gap-2 border-t border-[#D7E2DC]/60 py-6 text-[11px] leading-[1.8] text-[#66756F] sm:flex-row">
        <p>© {new Date().getFullYear()} Neelikon Food Dyes and Chemicals Limited. All rights reserved.</p>
        <p>Colour has a science. Quality has a standard.</p>
      </div>
    </footer>
  );
}
