import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import hero from "@/assets/hero-pigment.jpg";
import lab from "@/assets/lab.jpg";
import globe from "@/assets/globe.png";
import { INFRA } from "@/lib/content";
import { EASE, SafeImg } from "./Reveal";

/** Set to a verified MP4 URL to enable scroll-scrubbed video. Empty = chapter-image film. */
export const VIDEO_SRC = "";

const CHAPTERS = [
  { n: "01", t: "The World of Colour", line: "An extraordinary world begins with colour.", d: "Colour shapes how we see food, medicine and the products we use every day.", img: hero, pos: "object-[70%_50%]" },
  { n: "02", t: "Precision in Every Particle", line: "Driven by science. Defined by precision.", d: "Analytical testing — HPLC, ion and gas chromatography, ICP-OES — behind every batch.", img: lab, pos: "object-center" },
  { n: "03", t: "Engineered for Industry", line: "Designed for the demands of real-world applications.", d: "Manufacturing facilities in Raigad, Maharashtra and Bharuch, Gujarat.", img: INFRA[1]!.imgs[0]!, pos: "object-center" },
  { n: "04", t: "Quality Without Borders", line: "One world. One quality philosophy.", d: "Colours tested to meet the regulations of the markets our customers sell into.", img: globe, pos: "object-[60%_50%]" },
  { n: "05", t: "A Legacy of Expertise", line: "Decades of expertise. A world of possibilities.", d: "Since 1983, from Mumbai to customers in more than 100 countries.", img: INFRA[0]!.imgs[5]!, pos: "object-center" },
];

export function ScrollFilm() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const ch = CHAPTERS[active] ?? CHAPTERS[0]!;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(CHAPTERS.length - 1, Math.floor(v * CHAPTERS.length * 0.999)));
  });

  // rAF-throttled scroll→video time sync
  useEffect(() => {
    const v = videoRef.current;
    if (!VIDEO_SRC || !v || reduce) return;
    let raf = 0;
    let target = 0;
    const onMeta = () => setVideoReady(true);
    v.addEventListener("loadedmetadata", onMeta);
    const unsub = scrollYProgress.on("change", (p) => {
      if (!v.duration || !isFinite(v.duration)) return;
      target = Math.max(0, Math.min(v.duration - 0.05, p * v.duration));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        try { if (Math.abs(v.currentTime - target) > 0.03) v.currentTime = target; } catch { /* seeking unsupported */ }
      });
    });
    return () => { unsub(); cancelAnimationFrame(raf); v.removeEventListener("loadedmetadata", onMeta); };
  }, [scrollYProgress, reduce]);

  if (reduce) {
    return (
      <section id="film" aria-label="Neelikon story" className="bg-ink section-y text-paper">
        <div className="container-x">
          <Intro />
          <ol className="mt-16 grid gap-10 md:grid-cols-2">
            {CHAPTERS.map((c) => (
              <li key={c.n}>
                <SafeImg src={c.img} alt={c.t} className="aspect-video w-full object-cover" />
                <p className="eyebrow mt-4 text-sky">Chapter {c.n} — {c.t}</p>
                <p className="mt-2 text-2xl font-bold">{c.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id="film" ref={ref} aria-label="Neelikon story — scroll to play" className="relative h-[360vh] bg-ink text-paper md:h-[520vh]">
      <h2 className="sr-only">Every colour has a story. Every particle has a purpose.</h2>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <AnimatePresence initial={false}>
            {!(VIDEO_SRC && videoReady) && (
              <motion.img
                key={active}
                src={ch.img}
                alt=""
                aria-hidden
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
                className={`absolute inset-0 h-full w-full object-cover ${ch.pos}`}
              />
            )}
          </AnimatePresence>
          {VIDEO_SRC && (
            <video ref={videoRef} src={VIDEO_SRC} muted playsInline preload="metadata" poster={hero} aria-hidden className="absolute inset-0 h-full w-full object-cover">
              A film about Neelikon's colour science.
            </video>
          )}
        </motion.div>
        <div className="film-shade absolute inset-0" />

        <div className="container-x relative flex h-full flex-col justify-end pb-14 pt-28">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.55, ease: EASE }}>
                  <p className="eyebrow text-flame"><span className="font-mono">{ch.n} / 05</span> — {ch.t}</p>
                  <p className="display fs-section mt-4 max-w-3xl">{ch.line}</p>
                  <p className="mt-5 max-w-md text-lg text-paper/85">{ch.d}</p>
                  {active === CHAPTERS.length - 1 && <Link to="/about" className="btn mt-8 bg-paper text-ink">Discover Our Story</Link>}
                </motion.div>
              </AnimatePresence>
            </div>
            <ol className="hidden space-y-2 md:col-span-4 md:block" aria-label="Chapters">
              {CHAPTERS.map((c, i) => (
                <li key={c.n} className={`flex gap-3 text-sm transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-40"}`}>
                  <span className="font-mono text-sky">{c.n}</span>{c.t}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <motion.div style={{ scaleX: bar }} className="spectrum-bar absolute bottom-0 left-0 h-1 w-full origin-left" />
      </div>
    </section>
  );
}

function Intro() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow text-sky">Beyond colour. Into science.</p>
      <h2 className="display mt-4 fs-sub">Every colour has a story. <span className="serif-accent">Every particle has a purpose.</span></h2>
      <p className="mt-4 max-w-xl text-paper/70">Explore the precision, research, and manufacturing expertise behind Neelikon's world of colourants.</p>
    </div>
  );
}
