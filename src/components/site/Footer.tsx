import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Globe, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="border-t border-[#E5EBE8] bg-white text-[#17231F]">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12 lg:gap-12 lg:py-20">
        {/* Brand & Mission */}
        <div className="md:col-span-4">
          <Logo className="h-12 md:h-[72px] w-auto object-contain" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#66756F]">
            Neelikon Food Dyes and Chemicals Limited is a Mumbai-based manufacturer and exporter of high-quality colourants for global customers since 1983.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/neelikon-food-dyes-&-chemicals-ltd-/"
              target="_blank"
              rel="noreferrer"
              aria-label="Neelikon LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#D7E2DC] text-[#17231F] transition-colors hover:border-[#17664F] hover:bg-[#EAF3EF] hover:text-[#17664F]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@neelikonfooddyeschemicals8084"
              target="_blank"
              rel="noreferrer"
              aria-label="Neelikon YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#D7E2DC] text-[#17231F] transition-colors hover:border-[#17664F] hover:bg-[#EAF3EF] hover:text-[#17664F]"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 md:col-start-5">
          <p
            className="mb-4 text-[11px] font-bold uppercase tracking-[2px] text-[#17664F]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            QUICK LINKS
          </p>
          <ul className="space-y-2.5 text-sm text-[#66756F]">
            <li><Link to="/about" className="transition-colors hover:text-[#17664F]">About Us</Link></li>
            <li><Link to="/products" className="transition-colors hover:text-[#17664F]">Products</Link></li>
            <li><Link to="/formulation" className="transition-colors hover:text-[#17664F]">Formulations</Link></li>
            <li><Link to="/infrastructure" className="transition-colors hover:text-[#17664F]">Infrastructure</Link></li>
            <li><Link to="/innovation" className="transition-colors hover:text-[#17664F]">Innovation</Link></li>
            <li><Link to="/quality" className="transition-colors hover:text-[#17664F]">Quality</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div className="md:col-span-3">
          <p
            className="mb-4 text-[11px] font-bold uppercase tracking-[2px] text-[#17664F]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            PRODUCTS
          </p>
          <ul className="space-y-2.5 text-sm text-[#66756F]">
            <li><a href="/products" className="transition-colors hover:text-[#17664F]">Food Colours</a></li>
            <li><a href="/products" className="transition-colors hover:text-[#17664F]">Lake Colours</a></li>
            <li><a href="/products" className="transition-colors hover:text-[#17664F]">Blended Colours</a></li>
            <li><Link to="/formulation" className="transition-colors hover:text-[#17664F]">Custom Formulations</Link></li>
            <li><a href="/#contact" className="transition-colors hover:text-[#17664F]">Technical Support</a></li>
            <li><Link to="/industries" className="transition-colors hover:text-[#17664F]">Applications</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="md:col-span-3">
          <p
            className="mb-4 text-[11px] font-bold uppercase tracking-[2px] text-[#17664F]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            CONTACT US
          </p>
          <ul className="space-y-3 text-sm text-[#66756F]">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-[#17664F] mt-0.5" />
              <span>Neelikon Food Dyes and Chemicals Limited Mumbai, Maharashtra, India</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#17664F]" />
              <a href="tel:+912242268456" className="transition-colors hover:text-[#17664F]">+91 22 4226 8456</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#17664F]" />
              <a href="mailto:info@neelikon.com" className="transition-colors hover:text-[#17664F]">info@neelikon.com</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="h-4 w-4 shrink-0 text-[#17664F]" />
              <a href="https://neelikon.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#17664F]">www.neelikon.com</a>
            </li>
          </ul>
        </div>
      </div>

      <motion.div
        className="spectrum-bar h-1 origin-left opacity-90"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      />

      <div className="container-x flex flex-col justify-between gap-2 border-t border-[#E5EBE8] py-6 text-[11px] leading-[1.8] text-[#66756F] sm:flex-row">
        <p>© 2025 Neelikon Food Dyes and Chemicals Limited. All rights reserved.</p>
        <p className="flex items-center gap-3">
          <a href="#" className="hover:text-[#17231F]">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-[#17231F]">Terms of Use</a>
          <span>|</span>
          <a href="#" className="hover:text-[#17231F]">Site Map</a>
        </p>
      </div>
    </footer>
  );
}
