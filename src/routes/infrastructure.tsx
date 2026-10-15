import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { INFRA } from "@/lib/content";
import { EASE, MaskImage, Reveal, SafeImg } from "@/components/site/Reveal";

const LEAD = INFRA[1]!.imgs[0]!;

export const Route = createFileRoute("/infrastructure")({
  head: () => ({
    meta: [
      { title: "Infrastructure — Laboratories & Manufacturing | Neelikon" },
      { name: "description", content: "Inside Neelikon's laboratories, manufacturing plants in Raigad and Bharuch, EHS systems, warehouses and wastewater treatment." },
      { property: "og:title", content: "Neelikon infrastructure" },
      { property: "og:description", content: "Laboratories, manufacturing, EHS, warehousing and wastewater treatment at Neelikon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: LEAD },
      { name: "twitter:image", content: LEAD },
    ],
  }),
  component: Infra,
});

function Infra() {
  const all = INFRA.flatMap((g) => g.imgs.map((src, i) => ({ src, alt: `${g.title} — photo ${i + 1}` })));
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % all.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + all.length) % all.length));
    };
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); opener.current?.focus(); };
  }, [open, all.length]);

  let idx = 0;
  return (
    <main>
      <section className="relative min-h-[calc(85vh-104px)] overflow-hidden bg-ink text-paper">
        <SafeImg src={LEAD} alt="Neelikon manufacturing plant" eager className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="film-shade absolute inset-0" />
        <div className="container-x relative flex min-h-[calc(85vh-104px)] flex-col justify-end pb-16 pt-16 md:pt-20">
          <p className="eyebrow text-sky">Infrastructure</p>
          <h1 className="display mt-4 max-w-4xl fs-section">The backbone of <span className="serif-accent text-flame">Neelikon.</span></h1>
          <p className="mt-6 max-w-xl text-lg text-paper/85">Choosing a supplier goes beyond a polished website. We invite distributors and customers — current, new and prospective — to visit our facilities in Raigad, Maharashtra and Bharuch, Gujarat.</p>
        </div>
      </section>

      {INFRA.map((g, gi) => (
        <section key={g.title} className={`py-20 md:section-y ${gi % 2 ? "bg-card" : "bg-background"}`} aria-labelledby={`g-${gi}`}>
          <div className="container-x">
            <Reveal className="grid gap-4 md:grid-cols-12 md:items-end">
              <p className="font-mono text-sm text-navy md:col-span-1">0{gi + 1}</p>
              <h2 id={`g-${gi}`} className="display text-4xl md:col-span-6 md:text-6xl">{g.title}</h2>
              <p className="text-muted-foreground md:col-span-4 md:col-start-9">{g.note}</p>
            </Reveal>
            <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {g.imgs.map((src, i) => {
                const n = idx++;
                return (
                  <li key={src} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                    <button onClick={(e) => { opener.current = e.currentTarget; setOpen(n); }} aria-label={`Enlarge ${g.title} photo ${i + 1}`} className="group block h-full w-full">
                      <MaskImage src={src} alt={`${g.title} — photo ${i + 1}`} className="aspect-[4/3] h-full bg-muted" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <AnimatePresence>
        {open !== null && (
          <motion.div role="dialog" aria-modal="true" aria-label={all[open]!.alt} className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.img key={open} src={all[open]!.src} alt={all[open]!.alt} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: EASE }} className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-paper/80">{all[open]!.alt}</p>
            <button ref={closeRef} onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-paper p-2 text-ink"><X /></button>
            <button onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + all.length) % all.length); }} aria-label="Previous photo" className="absolute left-4 top-1/2 rounded-full bg-paper p-2 text-ink"><ChevronLeft /></button>
            <button onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % all.length); }} aria-label="Next photo" className="absolute right-4 top-1/2 rounded-full bg-paper p-2 text-ink"><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
