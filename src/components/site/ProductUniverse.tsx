import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTS, type Group } from "@/lib/content";
import { CATALOG } from "@/lib/catalog";
import { EASE, Reveal, SafeImg } from "./Reveal";

const FILTERS: ("All" | Group)[] = ["All", "Food", "Pharma", "Cosmetics", "Specialty"];
const TONE: Record<Group, string> = { Food: "bg-leaf", Pharma: "bg-sky", Cosmetics: "bg-flame", Specialty: "bg-navy" };
// varied editorial rhythm on a 6-col grid
const SPANS = ["md:col-span-2"];

export function ProductUniverse({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const list = PRODUCTS.filter((p) => f === "All" || p.group === f);
  const [lead, ...rest] = list;
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

        {lead && (
          <AnimatePresence mode="wait">
            <motion.div key={f} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
              <Link to="/products/$slug" params={{ slug: lead.slug }} className="group mt-14 grid overflow-hidden bg-card md:grid-cols-12">
                <div className="aspect-[4/3] overflow-hidden md:col-span-5 md:aspect-auto md:h-[28rem]">
                  <SafeImg src={lead.img} alt={lead.name} className="h-[135%] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-col justify-between gap-8 p-8 md:col-span-7 md:p-14">
                  <div>
                    <p className="eyebrow flex items-center gap-2 text-muted-foreground"><span className={`h-2 w-2 rounded-full ${TONE[lead.group]}`} />Featured · {lead.group}</p>
                    <h3 className="display mt-4 fs-sub">{lead.name}</h3>
                    <p className="mt-5 text-lg text-muted-foreground">{lead.blurb}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 font-bold text-navy">{CATALOG[lead.slug] ? "Browse the product range" : "View product family"} <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
                </div>
              </Link>
              <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-6">
                {rest.map((p, i) => (
                  <li key={p.slug} className={SPANS[i % SPANS.length]}>
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="group flex h-full flex-col">
                      <div className={`overflow-hidden aspect-[4/3]`}>
                        <SafeImg src={p.img} alt={p.name} className="h-[135%] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                      </div>
                      <div className="flex flex-1 items-start justify-between gap-4 pt-5">
                        <div>
                          <p className="eyebrow flex items-center gap-2 text-muted-foreground"><span className={`h-1.5 w-1.5 rounded-full ${TONE[p.group]}`} />{p.group}</p>
                          <h3 className="mt-2 text-xl font-bold leading-tight">{p.name}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
