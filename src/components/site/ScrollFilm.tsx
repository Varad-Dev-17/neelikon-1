import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import hero from "@/assets/hero-pigment.jpg";
import lab from "@/assets/lab.png";
import globe from "@/assets/globe.png";
import { INFRA } from "@/lib/content";
import { EASE, SafeImg } from "./Reveal";

/** Total frames extracted in /public/frames/ */
const TOTAL_FRAMES = 240;
/** Frames required before dismissing loader */
const INITIAL_PRELOAD_COUNT = 80;
/** Frame path formatter (e.g., /frames/frame_0001.webp) */
const getFrameUrl = (index: number) =>
  `/frames/frame_${String(index + 1).padStart(4, "0")}.webp`;

const CHAPTERS = [
  { n: "01", t: "The World of Colour", line: "An extraordinary world begins with colour.", d: "Colour shapes how we see food, medicine and the products we use every day.", img: hero },
  { n: "02", t: "Precision in Every Particle", line: "Driven by science. Defined by precision.", d: "Analytical testing — HPLC, ion and gas chromatography, ICP-OES — behind every batch.", img: lab },
  { n: "03", t: "Engineered for Industry", line: "Designed for the demands of real-world applications.", d: "Manufacturing facilities in Raigad, Maharashtra and Bharuch, Gujarat.", img: INFRA[1]!.imgs[0]! },
  { n: "04", t: "Quality Without Borders", line: "One world. One quality philosophy.", d: "Colours tested to meet the regulations of the markets our customers sell into.", img: globe },
  { n: "05", t: "A Legacy of Expertise", line: "Decades of expertise. A world of possibilities.", d: "Since 1983, from Mumbai to customers in more than 100 countries.", img: INFRA[0]!.imgs[5]! },
];

export function ScrollFilm() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());

  const [active, setActive] = useState(0);
  const [loadPercent, setLoadPercent] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasCanvasFrames, setHasCanvasFrames] = useState(false);

  const ch = CHAPTERS[active] ?? CHAPTERS[0]!;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Track chapter change based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(CHAPTERS.length - 1, Math.floor(v * CHAPTERS.length * 0.999)));
  });

  // Draw frame on canvas with object-cover aspect ratio
  const renderFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;

    const r = Math.max(cw / iw, ch / ih);
    const nw = iw * r;
    const nh = ih * r;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, cx, cy, nw, nh);
  };

  // Preloader: Stage 1 (Initial 150 frames) + Stage 2 (Background cache remaining)
  useEffect(() => {
    if (reduce) return;

    let loadedCount = 0;
    let cancelled = false;

    // Helper to load single image
    const loadImg = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current.has(index)) {
          resolve(imagesRef.current.get(index)!);
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!cancelled) {
            imagesRef.current.set(index, img);
            resolve(img);
          }
        };
        img.onerror = () => reject();
      });
    };

    // Stage 1: Load first INITIAL_PRELOAD_COUNT frames
    const preloadFirstBatch = async () => {
      // Test if frame 0 exists
      try {
        const first = await loadImg(0);
        setHasCanvasFrames(true);
        renderFrame(first);
      } catch {
        // No /public/frames/ present yet -> fallback to original images
        setHasCanvasFrames(false);
        setIsReady(true);
        return;
      }

      const promises: Promise<void>[] = [];
      for (let i = 0; i < Math.min(INITIAL_PRELOAD_COUNT, TOTAL_FRAMES); i++) {
        promises.push(
          loadImg(i)
            .then(() => {
              if (cancelled) return;
              loadedCount++;
              setLoadPercent(Math.round((loadedCount / INITIAL_PRELOAD_COUNT) * 100));
            })
            .catch(() => {})
        );
      }

      await Promise.allSettled(promises);
      if (!cancelled) {
        setIsReady(true);
        preloadRemainingBatch();
      }
    };

    // Stage 2: Background cache remaining frames quietly
    const preloadRemainingBatch = () => {
      let current = INITIAL_PRELOAD_COUNT;
      const loadNext = () => {
        if (cancelled || current >= TOTAL_FRAMES) return;
        loadImg(current)
          .catch(() => {})
          .finally(() => {
            current++;
            if ("requestIdleCallback" in window) {
              window.requestIdleCallback(loadNext);
            } else {
              setTimeout(loadNext, 16);
            }
          });
      };
      loadNext();
    };

    preloadFirstBatch();

    return () => {
      cancelled = true;
    };
  }, [reduce]);

  // Sync canvas size to display DPI
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Re-draw current frame
      const currentFrameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(scrollYProgress.get() * (TOTAL_FRAMES - 1))
      );
      const img = imagesRef.current.get(currentFrameIndex) || imagesRef.current.get(0);
      if (img) renderFrame(img);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasCanvasFrames]);

  // Scrub canvas frame on scroll
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!hasCanvasFrames) return;
    const targetIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(progress * (TOTAL_FRAMES - 1))
    );
    // Find closest loaded frame if target isn't loaded yet
    let img = imagesRef.current.get(targetIndex);
    if (!img) {
      for (let offset = 1; offset <= 20; offset++) {
        img = imagesRef.current.get(targetIndex - offset) || imagesRef.current.get(targetIndex + offset);
        if (img) break;
      }
    }
    if (img) renderFrame(img);
  });

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
    <section
      id="film"
      ref={containerRef}
      aria-label="Neelikon story — scroll to play"
      className="relative h-[260vh] bg-ink text-paper md:h-[320vh]"
    >
      <h2 className="sr-only">Every colour has a story. Every particle has a purpose.</h2>

      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Preloader Overlay (disappears when 150 frames are ready) */}
        <AnimatePresence>
          {!isReady && hasCanvasFrames && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-ink/90 backdrop-blur-md"
            >
              <div className="flex flex-col items-center gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-sky">
                  Loading Experience
                </span>
                <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky to-flame"
                    style={{ width: `${loadPercent}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <span className="font-mono text-sm text-paper/70">{loadPercent}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visual Layer: HTML5 Canvas or Fallback Image Slideshow */}
        <div className="absolute inset-0">
          {hasCanvasFrames ? (
            <canvas ref={canvasRef} className="h-full w-full object-cover" />
          ) : (
            <AnimatePresence initial={false}>
              <motion.img
                key={active}
                src={ch.img}
                alt=""
                aria-hidden
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover object-[70%_50%]"
              />
            </AnimatePresence>
          )}
        </div>

        {/* Subtle localized bottom & left vignette — keeps video vivid & vibrant while text stays readable */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Narrative Chapter Content */}
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-14 pt-28">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <p className="eyebrow font-semibold tracking-wider text-[#4ef2bb] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    <span className="font-mono text-white/90">{ch.n} / 05</span> — {ch.t}
                  </p>
                  <p className="display fs-section mt-4 max-w-3xl font-bold text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                    {ch.line}
                  </p>
                  <p className="mt-5 max-w-lg text-lg font-normal leading-relaxed text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    {ch.d}
                  </p>
                  {active === CHAPTERS.length - 1 && (
                    <Link
                      to="/about"
                      className="btn mt-8 bg-white font-semibold text-ink shadow-xl transition-transform hover:scale-102 hover:bg-white/95"
                    >
                      Discover Our Story
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Chapter Stepper Tracker */}
            <ol
              className="hidden space-y-2 md:col-span-4 md:block md:w-fit md:ml-auto"
              aria-label="Chapters"
            >
              {CHAPTERS.map((c, i) => (
                <li
                  key={c.n}
                  className={`flex items-center gap-3.5 px-2 py-1.5 text-sm transition-all duration-300 ${
                    i === active
                      ? "font-semibold text-white"
                      : "text-white/60 hover:text-white/90"
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-semibold ${
                      i === active ? "text-[#4ef2bb] drop-shadow-[0_0_8px_rgba(78,242,187,0.5)]" : "text-white/50"
                    }`}
                  >
                    {c.n}
                  </span>
                  <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">{c.t}</span>
                  {i === active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ef2bb] shadow-[0_0_8px_#4ef2bb]" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Bottom spectrum progress line */}
        <motion.div
          style={{ scaleX: bar }}
          className="spectrum-bar absolute bottom-0 left-0 z-20 h-1 w-full origin-left"
        />
      </div>
    </section>
  );
}

function Intro() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow text-sky">Beyond colour. Into science.</p>
      <h2 className="display mt-4 fs-sub">
        Every colour has a story. <span className="serif-accent">Every particle has a purpose.</span>
      </h2>
      <p className="mt-4 max-w-xl text-paper/70">
        Explore the precision, research, and manufacturing expertise behind Neelikon's world of
        colourants.
      </p>
    </div>
  );
}

