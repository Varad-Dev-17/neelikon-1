import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTS, type Group } from "@/lib/content";
import { CATALOG } from "@/lib/catalog";
import { EASE, Reveal, SafeImg } from "./Reveal";

const FILTERS: ("All" | Group)[] = ["All", "Food", "Pharma", "Cosmetics", "Specialty"];
const TONE: Record<Group, string> = { Food: "bg-leaf", Pharma: "bg-sky", Cosmetics: "bg-flame", Specialty: "bg-navy" };

export function ProductUniverse({
  heading = "h2",
  showOnlyOnePerGroup = false,
}: {
  heading?: "h1" | "h2";
  showOnlyOnePerGroup?: boolean;
}) {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");

  const PILLAR_CONFIG: Record<Group, { num: string; slug: string }> = {
    Food: { num: "01", slug: "natural-food" },
    Pharma: { num: "02", slug: "pharma" },
    Cosmetics: { num: "03", slug: "cosmetic" },
    Specialty: { num: "04", slug: "industrial" },
  };

  const list = showOnlyOnePerGroup
    ? f === "All"
      ? (["Food", "Pharma", "Cosmetics", "Specialty"] as Group[])
          .map((grp) => PRODUCTS.find((p) => p.slug === PILLAR_CONFIG[grp].slug) || PRODUCTS.find((p) => p.group === grp))
          .filter(Boolean) as typeof PRODUCTS
      : [PRODUCTS.find((p) => p.slug === PILLAR_CONFIG[f].slug) || PRODUCTS.find((p) => p.group === f)].filter(Boolean) as typeof PRODUCTS
    : PRODUCTS.filter((p) => f === "All" || p.group === f);

  const H = heading;

  return (
    <section id="products" className="scroll-mt-20 bg-background section-y">
      <div className="container-x">
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <div className="flex items-center gap-3">
              <p className="eyebrow text-[#5F6E68] text-[11px] font-semibold tracking-widest uppercase">
                {showOnlyOnePerGroup ? "PRODUCT PORTFOLIO · 4 CORE PILLARS" : `PRODUCT PORTFOLIO · ${PRODUCTS.length} FAMILIES`}
              </p>
              {showOnlyOnePerGroup && <div className="h-px w-24 bg-[#D7E2DC]" />}
            </div>
            <H className="display mt-4 fs-section">
              One world.<br />
              <span className="serif-accent text-[#17664F]">Countless possibilities.</span>
            </H>
          </Reveal>

          {/* Filter Navigation with vertical pipes */}
          <div
            role="group"
            aria-label="Filter by industry"
            className="flex items-center gap-3 text-xs sm:text-[13px] text-[#5F6E68] pb-1"
          >
            {FILTERS.map((x, i) => (
              <div key={x} className="flex items-center gap-3">
                {i > 0 && <span className="text-[#D7E2DC] select-none text-xs">|</span>}
                <button
                  type="button"
                  aria-pressed={f === x}
                  onClick={() => setF(x)}
                  className={`relative py-1 transition-colors cursor-pointer ${
                    f === x ? "font-bold text-[#17231F]" : "text-[#5F6E68] hover:text-[#17231F]"
                  }`}
                >
                  {x}
                  {f === x && (
                    <motion.span
                      layoutId="filter-underline"
                      className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#17664F] rounded-full"
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Columns Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={f}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {showOnlyOnePerGroup ? (
              <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#E2EAE5]">
                {list.map((p) => (
                  <li key={p.slug} className="lg:px-6 first:lg:pl-0 last:lg:pr-0">
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="group flex h-full flex-col">
                      {/* Top Meta: 01 | FOOD · 5 families */}
                      <div className="flex items-center gap-2.5 pb-3">
                        <span
                          className="font-serif italic text-[32px] sm:text-[36px] font-normal leading-none text-[#5B9BD5]"
                          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                        >
                          {PILLAR_CONFIG[p.group]?.num || "01"}
                        </span>
                        <span className="h-4 w-px bg-[#D7E2DC]" />
                        <div className="flex items-center gap-1.5 text-[11px] tracking-wider uppercase">
                          <span className="font-bold text-[#17664F]">{p.group}</span>
                          <span className="text-[#7F9188] normal-case italic font-normal">
                            · {PRODUCTS.filter((x) => x.group === p.group).length} families
                          </span>
                        </div>
                      </div>

                      {/* Image Card */}
                      <div className="overflow-hidden rounded-2xl bg-card border border-[#D7E2DC]/70 shadow-2xs aspect-[4/3] w-full">
                        <SafeImg
                          src={p.img}
                          alt={p.name}
                          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>

                      {/* Title & Description Below Image */}
                      <div className="pt-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-baseline justify-between gap-2">
                            <h3
                              className="font-serif text-[19px] sm:text-[21px] font-medium leading-snug text-[#0F221B] group-hover:text-[#17664F] transition-colors"
                              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                            >
                              {p.name}
                            </h3>
                            <span
                              aria-hidden
                              className="text-base text-[#0F221B] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#17664F] shrink-0"
                            >
                              →
                            </span>
                          </div>
                          <p className="mt-2 text-[12px] sm:text-[12.5px] leading-relaxed text-[#5F6E68]">
                            {p.blurb}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
                {list.map((p) => (
                  <li key={p.slug}>
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="group flex h-full flex-col">
                      <div className="overflow-hidden rounded-2xl bg-card border border-[#D7E2DC]/70 shadow-2xs aspect-[4/3]">
                        <SafeImg
                          src={p.img}
                          alt={p.name}
                          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 items-start justify-between gap-2.5 pt-3">
                        <div className="min-w-0">
                          <p className="eyebrow flex items-center gap-1.5 text-muted-foreground text-[10px] tracking-wider uppercase">
                            <span className={`h-1.5 w-1.5 rounded-full ${TONE[p.group]}`} />
                            {p.group}
                          </p>
                          <h3 className="mt-1 text-[15px] lg:text-[16px] font-bold leading-snug text-[#17231F] group-hover:text-primary transition-colors">
                            {p.name}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-[#66756F] line-clamp-2">
                            {p.blurb}
                          </p>
                        </div>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 shrink-0 text-[#66756F] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary mt-1"
                          aria-hidden
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Bottom Complete Catalog Banner */}
            {showOnlyOnePerGroup && (
              <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-[#D7E2DC] bg-white px-7 sm:px-8 py-5 shadow-xs">
                <div>
                  <h4
                    className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#0F221B] leading-snug"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    Explore all 15 product families across Food, Pharma, Cosmetics & Specialty
                  </h4>
                  <p className="text-[12px] sm:text-[13px] text-[#5F6E68] mt-1">
                    Browse technical grades, regulatory approvals, and shade guides.
                  </p>
                </div>
                <div className="hidden md:block h-10 w-px bg-[#E2EAE5] shrink-0" />
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0B4D3C] hover:bg-[#083A2D] px-7 py-3 text-[13px] font-semibold text-white transition-all active:scale-95 shrink-0 shadow-xs"
                >
                  View Complete Catalog
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
