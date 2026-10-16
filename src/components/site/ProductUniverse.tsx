import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTS, type Group } from "@/lib/content";
import { CATALOG } from "@/lib/catalog";
import { EASE, Reveal, SafeImg } from "./Reveal";

const FILTERS: ("All" | Group)[] = ["All", "Food", "Pharma", "Cosmetics", "Specialty"];
const TONE: Record<Group, string> = { Food: "bg-leaf", Pharma: "bg-sky", Cosmetics: "bg-flame", Specialty: "bg-navy" };

export function ProductUniverse({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const list = PRODUCTS.filter((p) => f === "All" || p.group === f);
  const H = heading;

  return (
    <section id="products" className="scroll-mt-20 bg-background section-y">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow text-navy">Product portfolio · {PRODUCTS.length} families</p>
            <H className="display mt-4 fs-section">One world.<br /><span className="serif-accent text-sky">Countless possibilities.</span></H>
          </Reveal>
          <div role="group" aria-label="Filter by industry" className="flex flex-wrap gap-x-5 gap-y-2 border-b pb-1">
            {FILTERS.map((x) => (
              <button key={x} aria-pressed={f === x} onClick={() => setF(x)} className={`relative py-2 text-sm font-bold transition-colors ${f === x ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {x}
                {f === x && <motion.span layoutId="filter-line" className="spectrum-bar absolute inset-x-0 -bottom-[5px] h-0.5" transition={{ duration: 0.4, ease: EASE }} />}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={f} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {list.map((p) => (
                <li key={p.slug}>
                  <Link to="/products/$slug" params={{ slug: p.slug }} className="group flex h-full flex-col">
                    <div className="overflow-hidden aspect-[4/3] rounded-2xl bg-card border border-[#D7E2DC]/60 shadow-2xs">
                      <SafeImg src={p.img} alt={p.name} className="h-[135%] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-3 pt-3.5">
                      <div className="min-w-0">
                        <p className="eyebrow flex items-center gap-1.5 text-muted-foreground text-[10px] tracking-wider uppercase">
                          <span className={`h-1.5 w-1.5 rounded-full ${TONE[p.group]}`} />
                          {p.group}
                        </p>
                        <h3 className="mt-1.5 text-[16px] lg:text-[17px] font-bold leading-snug text-[#17231F] group-hover:text-primary transition-colors">
                          {p.name}
                        </h3>
                        <p className="mt-1 text-xs lg:text-[13px] leading-relaxed text-[#66756F] line-clamp-2">
                          {p.blurb}
                        </p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[#66756F] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary mt-1" aria-hidden />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
