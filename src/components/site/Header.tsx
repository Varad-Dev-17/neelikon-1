import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LOGO, PRODUCTS } from "@/lib/content";
import { EASE } from "./Reveal";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/#industries" },
  { label: "Innovation", href: "/#innovation" },
  { label: "About Us", href: "/about" },
  { label: "Quality", href: "/#quality" },
  { label: "Contact", href: "/#contact" },
];

export function Logo({ invert }: { invert?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <Link to="/" aria-label="Neelikon home" className="flex items-center gap-2">
      {!failed && (
        <span className={`rounded-sm px-1.5 py-1 ${invert ? "bg-paper" : ""}`}>
          <img src={LOGO} alt="Neelikon" width={140} height={40} className="h-8 w-auto" onError={() => setFailed(true)} />
        </span>
      )}
      {failed && <span className="text-xl font-extrabold tracking-tight">NEELIKON</span>}
    </Link>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${overHero ? "bg-transparent text-paper" : "border-b bg-background/85 text-foreground backdrop-blur-xl"}`}
    >
      <div className="container-x flex h-18 items-center justify-between gap-6 py-4">
        <Logo invert={overHero} />
        <nav aria-label="Main" className="hidden lg:block" onMouseLeave={() => { setHover(null); setMega(false); }}>
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.label} className="relative" onMouseEnter={() => { setHover(n.label); setMega(n.label === "Products"); }}>
                <a
                  href={n.href}
                  onFocus={() => setHover(n.label)}
                  className="relative flex items-center gap-1 px-3 py-2 text-sm font-semibold"
                >
                  {n.label}
                  {n.label === "Products" && <ChevronDown className="h-3.5 w-3.5" aria-hidden />}
                  {hover === n.label && (
                    <motion.span layoutId="nav-underline" className="spectrum-bar absolute inset-x-3 -bottom-0.5 h-0.5" transition={{ duration: 0.35, ease: EASE }} />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <AnimatePresence>
            {mega && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute left-1/2 top-full w-[min(56rem,92vw)] -translate-x-1/2 border bg-background p-8 text-foreground shadow-2xl"
              >
                <p className="eyebrow mb-5 text-muted-foreground">Product portfolio</p>
                <ul className="grid grid-cols-3 gap-x-8 gap-y-3">
                  {PRODUCTS.map((p) => (
                    <li key={p.slug}>
                      <a href={`/products/${p.slug}`} className="text-sm font-medium transition-colors hover:text-navy">{p.name}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/#contact" className={`hidden rounded-full btn min-h-11 px-5 text-sm transition-transform hover:-translate-y-0.5 sm:inline-flex ${overHero ? "bg-paper text-ink" : "bg-navy text-paper"}`}>
            Discuss Your Requirements
          </a>
          <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)} className="p-2 lg:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden bg-ink text-paper lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pt-6">
              {NAV.map((n, i) => (
                <motion.li key={n.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1, ease: EASE }}>
                  <a href={n.href} onClick={() => setOpen(false)} className="display block py-2 text-4xl">{n.label}</a>
                </motion.li>
              ))}
              <li className="mt-6">
                <a href="/#contact" onClick={() => setOpen(false)} className="inline-flex rounded-full bg-flame btn text-ink">Discuss Your Requirements</a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
