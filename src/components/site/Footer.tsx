import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CONTACT, PRODUCTS } from "@/lib/content";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-x grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo invert />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
            Neelikon Food Dyes and Chemicals Limited — manufacturer of food colours, pharmaceutical colourants, cosmetic pigments and specialty dyes, since 1983.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-sky">Products</p>
          <ul className="space-y-2 text-sm text-paper/70">
            {PRODUCTS.slice(0, 7).map((p) => (
              <li key={p.slug}><a href={`/products/${p.slug}`} className="hover:text-paper">{p.name}</a></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4 text-sky">Company</p>
          <ul className="space-y-2 text-sm text-paper/70">
            <li><Link to="/about" className="hover:text-paper">About Neelikon</Link></li>
            <li><a href="/#quality" className="hover:text-paper">Quality & Certifications</a></li>
            <li><a href="/infrastructure" className="hover:text-paper">Infrastructure</a></li>
            <li><a href="/#innovation" className="hover:text-paper">R&D</a></li>
            <li><a href="/#insights" className="hover:text-paper">Blog & Insights</a></li>
            <li><a href="https://neelikon.com/" target="_blank" rel="noreferrer" className="hover:text-paper">Privacy & disclaimer</a></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-sky">Contact</p>
          <address className="space-y-3 text-sm not-italic text-paper/70">
            <p>{CONTACT.address}</p>
            <p><a href={`mailto:${CONTACT.email}`} className="hover:text-paper">{CONTACT.email}</a></p>
            <p><a href={CONTACT.phoneHref} className="hover:text-paper">{CONTACT.phone}</a></p>
          </address>
        </div>
      </div>
      <motion.div className="spectrum-bar h-1 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
      <div className="container-x flex flex-col justify-between gap-2 py-6 text-xs text-paper/50 sm:flex-row">
        <p>© {new Date().getFullYear()} Neelikon Food Dyes and Chemicals Limited. All rights reserved.</p>
        <p>Colour has a science. Quality has a standard.</p>
      </div>
    </footer>
  );
}
