import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import hero from "@/assets/hero-pigment.jpg";
import lab from "@/assets/lab.png";
import globe from "@/assets/globe.png";
import { ABOUT_IMG, CERT_LABELS, CERT_LOGOS, NEWS } from "@/lib/content";
import { EASE, MaskImage, Reveal, SafeImg } from "@/components/site/Reveal";
import { ScrollFilm } from "@/components/site/ScrollFilm";
import { ProductUniverse } from "@/components/site/ProductUniverse";
import { SpectrumDivider } from "@/components/site/SpectrumDivider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neelikon — Colour, Engineered. Food, Pharma & Cosmetic Colourants" },
      { name: "description", content: "Neelikon manufactures high-purity food colours, pharmaceutical colourants, cosmetic pigments and specialty dyes for customers in 100+ countries since 1983." },
      { property: "og:title", content: "Neelikon — Colour, Engineered. For a World in Motion." },
      { property: "og:description", content: "High-purity colourants for food, pharmaceutical, cosmetic and industrial applications, from Mumbai to 100+ countries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || reduce) return;

    // Slow, luxurious, cinematic smooth scroll for the home page storytelling experience
    const lenis = new Lenis({
      duration: 2.2, // Extended duration creates a slow, graceful glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.65, // Slower wheel response for a deliberate, slow, cinematic feel
      touchMultiplier: 1.4,
      infinite: false,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis RAF with GSAP's ticker to ensure zero jitter with pinned elements
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Ensure ScrollTrigger measures heights and offsets accurately with Lenis
    ScrollTrigger.refresh();

    // Intercept in-page hash anchor clicks (e.g. href="#film") to scroll gently via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 2.2 });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, [reduce]);

  return (
    <main>
      <Hero />
      <ScrollFilm />
      <Everywhere />
      <SpectrumDivider />
      <ProductUniverse />
      <Industries />
      <Science />
      <Global />
      <Quality />
      <div className="bg-card"><SpectrumDivider /></div>
      <Insights />
      <Testimonial />
    </main>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const lines = ["Colour,", "Engineered."];
  return (
    <section ref={ref} className="relative min-h-[calc(100dvh-104px)] overflow-hidden bg-white text-foreground">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 md:left-[28%] lg:left-[34%]">
        <motion.img
          src={hero}
          alt="Natural vivid pigment colours explosion"
          width={1920}
          height={1080}
          initial={reduce ? false : { clipPath: "inset(0 0 0 100%)", scale: 1.05 }}
          animate={{ clipPath: "inset(0 0 0 0%)", scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="h-full w-full object-cover object-right pigment-img"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent w-full md:w-3/5" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent" />
      </motion.div>
      <div className="container-x relative flex min-h-[calc(100dvh-104px)] flex-col justify-end pb-16 pt-16 md:pt-20">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="eyebrow text-primary font-bold">
          Colour science. Global expertise.
        </motion.p>
        <h1 className="display fs-hero mt-6 max-w-[12ch] text-[#17231F]">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block text-[#17231F]" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: EASE }}>
                {l}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <motion.span className="serif-accent block text-[0.55em] text-primary" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: EASE }}>
              For a World in Motion.
            </motion.span>
          </span>
        </h1>
        <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7, ease: EASE }} className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="measure text-[14px] leading-[1.8] text-[#66756F]">High-purity colourants backed by decades of expertise, rigorous quality standards, and a global network serving industries around the world.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/products" className="group inline-flex items-center gap-2 rounded-full bg-primary btn min-h-10 px-5 text-[12px] font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-[#12523f] active:scale-95 shadow-xs">
                Explore Our Colours <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#film" className="inline-flex items-center rounded-full border border-primary/30 btn min-h-10 px-5 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/10">Discover Neelikon</a>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-6 rounded-2xl border border-[#D7E2DC] bg-white/80 p-6 backdrop-blur-md shadow-xs md:col-span-6 md:col-start-7">
            {[["1983", "Established"], ["100+", "Countries served"], ["4", "Core industries"]].map(([a, b]) => (
              <div key={a}><dt className="sr-only">{b}</dt><dd className="fs-stat text-[#17231F]">{a}</dd><dd className="mt-1 text-[11px] leading-snug text-[#66756F]">{b}</dd></div>
            ))}
          </dl>
        </motion.div>
        <a href="#film" aria-label="Scroll to story" className="absolute bottom-6 right-6 hidden items-center gap-2 text-xs text-[#66756F] md:flex hover:text-primary transition-colors">
          Scroll <ArrowDown className="h-4 w-4 motion-safe:animate-bounce text-primary" />
        </a>
      </div>
    </section>
  );
}

function Everywhere() {
  return (
    <section className="bg-background section-y">
      <div className="container-x grid gap-12 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-7">
          <h2 className="display fs-section">Colour is everywhere. <span className="serif-accent text-navy">Our expertise helps make it extraordinary.</span></h2>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">Neelikon brings specialised colourant manufacturing, research, and quality-focused processes to industries that shape everyday life.</p>
        </Reveal>
        <MaskImage src={ABOUT_IMG.oneWorld} alt="One World, One Quality — Neelikon colours" className="aspect-[4/5] bg-card md:col-span-5" />
      </div>
    </section>
  );
}

const APPLICATION_CATEGORIES = [
  {
    num: "01",
    shortName: "Food & Beverage",
    title: "Food & Beverage",
    description: "Colour solutions for food and beverage applications.",
    slug: "natural-food",
    img: "https://neelikon.com/wp-content/uploads/2025/09/Natural-Food-Colourants.png",
  },
  {
    num: "02",
    shortName: "Pharmaceuticals",
    title: "Pharmaceutical Colourants",
    description: "Colourants for pharmaceutical applications, including capsules and tablets.",
    slug: "pharma",
    img: "https://neelikon.com/wp-content/uploads/2025/09/Pharmaceutical-Colourants.png",
  },
  {
    num: "03",
    shortName: "Cosmetics",
    title: "Cosmetics & Personal Care",
    description: "Colour solutions for cosmetics and personal care products.",
    slug: "cosmetic",
    img: "https://neelikon.com/wp-content/uploads/2025/09/Cosmetic-Pigments.png",
  },
  {
    num: "04",
    shortName: "Specialty Dyes",
    title: "Specialty & Industrial Dyes",
    description: "Specialty colour solutions for industrial applications.",
    slug: "fluorescent",
    img: "https://neelikon.com/wp-content/uploads/2025/09/Fluorescent-and-Solvent-Dyes.png",
  },
];

function Industries() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textPanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageInnersRef = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || reduce) return;

    // Preload all 4 images
    APPLICATION_CATEGORIES.forEach((cat) => {
      const img = new Image();
      img.src = cat.img;
    });

    const ctx = gsap.context(() => {
      const pinEl = pinRef.current;
      if (!pinEl) return;

      const textPanels = textPanelsRef.current;
      const imageLayers = imageLayersRef.current;
      const imageInners = imageInnersRef.current;

      const p0 = textPanels[0];
      const p1 = textPanels[1];
      const p2 = textPanels[2];
      const p3 = textPanels[3];

      const l1 = imageLayers[1];
      const l2 = imageLayers[2];
      const l3 = imageLayers[3];

      const i0 = imageInners[0];
      const i1 = imageInners[1];
      const i2 = imageInners[2];
      const i3 = imageInners[3];

      if (!p0 || !p1 || !p2 || !p3 || !l1 || !l2 || !l3 || !i0 || !i1 || !i2 || !i3) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "+=5600",
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            let currentIdx = 0;
            if (p < 0.23) currentIdx = 0;
            else if (p < 0.50) currentIdx = 1;
            else if (p < 0.77) currentIdx = 2;
            else currentIdx = 3;
            setActive(currentIdx);
          },
        },
      });

      // Continuous subtle green progress line
      if (progressBarRef.current) {
        tl.to(
          progressBarRef.current,
          { scaleX: 1, ease: "none", duration: 7.8 },
          0
        );
      }

      // Initial restful dwell period for Category 0 (Food & Beverage)
      // Transition 0 -> 1 begins at time 1.2 and completes at 2.2
      tl.to(
        p0,
        { opacity: 0, y: -24, pointerEvents: "none", ease: "power2.inOut", duration: 0.8 },
        1.2
      );
      tl.fromTo(
        p1,
        { opacity: 0, y: 30, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", ease: "power2.out", duration: 0.8 },
        1.35
      );
      tl.fromTo(
        l1,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 1.0 },
        1.2
      );
      tl.to(
        i0,
        { scale: 0.96, opacity: 0.3, ease: "power2.inOut", duration: 1.0 },
        1.2
      );
      tl.fromTo(
        i1,
        { scale: 1.06, yPercent: 4 },
        { scale: 1.0, yPercent: 0, ease: "power2.out", duration: 1.0 },
        1.2
      );

      // Category 1 dwells at rest from 2.2 to 3.4
      // Transition 1 -> 2 begins at time 3.4 and completes at 4.4
      tl.to(
        p1,
        { opacity: 0, y: -24, pointerEvents: "none", ease: "power2.inOut", duration: 0.8 },
        3.4
      );
      tl.fromTo(
        p2,
        { opacity: 0, y: 30, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", ease: "power2.out", duration: 0.8 },
        3.55
      );
      tl.fromTo(
        l2,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 1.0 },
        3.4
      );
      tl.to(
        i1,
        { scale: 0.96, opacity: 0.3, ease: "power2.inOut", duration: 1.0 },
        3.4
      );
      tl.fromTo(
        i2,
        { scale: 1.06, yPercent: 4 },
        { scale: 1.0, yPercent: 0, ease: "power2.out", duration: 1.0 },
        3.4
      );

      // Category 2 dwells at rest from 4.4 to 5.6
      // Transition 2 -> 3 begins at time 5.6 and completes at 6.6
      tl.to(
        p2,
        { opacity: 0, y: -24, pointerEvents: "none", ease: "power2.inOut", duration: 0.8 },
        5.6
      );
      tl.fromTo(
        p3,
        { opacity: 0, y: 30, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", ease: "power2.out", duration: 0.8 },
        5.75
      );
      tl.fromTo(
        l3,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 1.0 },
        5.6
      );
      tl.to(
        i2,
        { scale: 0.96, opacity: 0.3, ease: "power2.inOut", duration: 1.0 },
        5.6
      );
      tl.fromTo(
        i3,
        { scale: 1.06, yPercent: 4 },
        { scale: 1.0, yPercent: 0, ease: "power2.out", duration: 1.0 },
        5.6
      );

      // Final restful dwell period so category 4 stays comfortably viewable before unpinning
      tl.to({}, { duration: 1.2 }, 6.6);
    }, containerRef);

    return () => ctx.revert();
  }, [reduce]);

  const scrollToCategory = (index: number) => {
    const triggers = ScrollTrigger.getAll();
    const currentST = triggers.find((t) => t.trigger === pinRef.current);
    if (!currentST) return;
    const progressMap = [0.08, 0.36, 0.64, 0.92];
    const targetProgress = progressMap[index] ?? 0;
    const targetScroll = currentST.start + targetProgress * (currentST.end - currentST.start);
    const win = window as unknown as { __lenis?: Lenis };
    if (win.__lenis) {
      win.__lenis.scrollTo(targetScroll, { duration: 2.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section id="industries" ref={containerRef} className="scroll-mt-20 bg-white text-[#17231F]">
      {/* Mobile & Reduced Motion Fallback: Natural Vertical Flow */}
      <div className={`${reduce ? "block" : "block md:hidden"} container-x py-16 sm:py-20`}>
        <div>
          <div className="mb-3 h-[2px] w-8 bg-[#17664F]" />
          <p className="eyebrow text-[#17664F] font-semibold tracking-[2px]">
            APPLICATIONS / COLOUR SCIENCE
          </p>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-normal tracking-tight text-[#17231F]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Four worlds. <span className="italic text-[#17664F]">One standard.</span>
          </h2>
          <p className="mt-3 text-sm text-[#66756F] leading-relaxed max-w-lg">
            Colour science designed for the products people use every day.
          </p>
        </div>

        <div className="mt-12 space-y-16">
          {APPLICATION_CATEGORIES.map((cat) => (
            <article key={cat.title} className="flex flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#D7E2DC] bg-[#F8FAF9] shadow-xs">
                <SafeImg
                  src={cat.img}
                  alt={cat.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 rounded-md bg-white/95 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-[#17231F] uppercase shadow-xs">
                  {cat.num} — {cat.title}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#17664F]">
                    {cat.num}
                  </span>
                  <div className="h-px w-8 bg-[#D7E2DC]" />
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#66756F]">
                    Category
                  </span>
                </div>
                <h3
                  className="mt-2 text-2xl font-serif text-[#17231F]"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#66756F]">
                  {cat.description}
                </p>
                <Link
                  to="/products/$slug"
                  params={{ slug: cat.slug }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#17664F] hover:underline"
                >
                  <span>See products</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Desktop Pinned Scroll-Driven Cinematic Showcase */}
      {!reduce && (
        <div ref={pinRef} className="relative hidden md:block">
          <div className="h-[100dvh] flex flex-col justify-between py-6 lg:py-8 overflow-hidden bg-white">
            <div className="container-x flex-1 flex flex-col justify-between">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-[#E5EBE8] pb-5">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="eyebrow text-[#17664F] font-semibold tracking-[2px]">
                      APPLICATIONS / COLOUR SCIENCE
                    </p>
                    <div className="h-px w-10 bg-[#D7E2DC]" />
                  </div>
                  <h2
                    className="mt-1 text-2xl lg:text-3xl font-normal tracking-tight text-[#17231F]"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    Four worlds. <span className="italic text-[#17664F]">One standard.</span>
                  </h2>
                </div>

                <div className="flex items-center gap-6">
                  <p className="hidden xl:block text-xs text-[#66756F] max-w-xs text-right leading-relaxed">
                    Colour science designed for the products people use every day.
                  </p>

                  {/* 4 Interactive Category Step Pills */}
                  <div className="flex items-center gap-2">
                    {APPLICATION_CATEGORIES.map((cat, i) => (
                      <button
                        key={cat.title}
                        type="button"
                        onClick={() => scrollToCategory(i)}
                        className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                          i === active
                            ? "bg-[#17664F] text-white font-semibold shadow-xs scale-102"
                            : "bg-[#F4F7F5] text-[#66756F] hover:text-[#17231F] hover:bg-[#E5EBE8]"
                        }`}
                      >
                        {cat.num} {cat.shortName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Showcase Grid: Left Stacked Details + Right Cinematic Image Stage */}
              <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center my-auto py-4">
                {/* Left Column: 4 Synchronized Content Panels */}
                <div className="col-span-5 relative pr-4 lg:pr-8 min-h-[320px] flex flex-col justify-center">
                  {APPLICATION_CATEGORIES.map((cat, i) => (
                    <div
                      key={cat.title}
                      ref={(el) => {
                        textPanelsRef.current[i] = el;
                      }}
                      className={`w-full will-change-transform ${
                        i === 0 ? "relative" : "absolute inset-0 pointer-events-none"
                      }`}
                      style={{
                        opacity: i === 0 ? 1 : 0,
                        transform: i === 0 ? "translateY(0px)" : "translateY(30px)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base font-mono font-bold text-[#17664F]">
                          {cat.num}
                        </span>
                        <div className="h-px w-12 bg-[#D7E2DC]" />
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#66756F]">
                          APPLICATION {i + 1} OF 4
                        </span>
                      </div>

                      {/* Clipped Headline Reveal */}
                      <div className="overflow-hidden mt-5">
                        <h3
                          className="text-4xl lg:text-[52px] font-normal leading-[1.06] tracking-tight text-[#17231F]"
                          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                        >
                          {cat.title}
                        </h3>
                      </div>

                      <p
                        className="mt-5 text-[16px] lg:text-[18px] leading-relaxed text-[#66756F] max-w-md"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {cat.description}
                      </p>

                      <div className="mt-8 flex items-center gap-4">
                        <Link
                          to="/products/$slug"
                          params={{ slug: cat.slug }}
                          className="inline-flex items-center gap-2.5 rounded-full bg-[#17664F] px-6 py-3 text-[13px] font-semibold text-white transition-all hover:bg-[#12523F] active:scale-98 shadow-sm"
                        >
                          <span>Explore {cat.shortName}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}

                  {/* Understated Segmented Progress Bar */}
                  <div className="mt-12 pt-6 border-t border-[#E5EBE8] flex items-center gap-3">
                    {APPLICATION_CATEGORIES.map((_, i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full bg-[#E5EBE8] overflow-hidden transition-colors"
                      >
                        <div
                          className={`h-full bg-[#17664F] transition-all duration-300 ${
                            i === active
                              ? "w-full"
                              : i < active
                              ? "w-full opacity-60"
                              : "w-0"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Stacked Photographic Stage with Clip-Path Reveal */}
                <div className="col-span-7">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#D7E2DC]/80 shadow-md bg-[#F8FAF9]">
                    {APPLICATION_CATEGORIES.map((cat, i) => (
                      <div
                        key={cat.title}
                        ref={(el) => {
                          imageLayersRef.current[i] = el;
                        }}
                        className="absolute inset-0 overflow-hidden will-change-[clip-path]"
                        style={{
                          zIndex: i + 1,
                          clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                        }}
                      >
                        <div
                          ref={(el) => {
                            imageInnersRef.current[i] = el;
                          }}
                          className="relative h-full w-full will-change-transform"
                          style={{
                            transform: i === 0 ? "scale(1)" : "scale(1.06)",
                          }}
                        >
                          <SafeImg
                            src={cat.img}
                            alt={cat.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute bottom-5 left-5 rounded-md bg-white/95 px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider text-[#17231F] uppercase shadow-xs backdrop-blur-xs">
                            {cat.num} — {cat.title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Subtle Bar with Scroll Progress Line */}
              <div className="relative flex items-center justify-between text-xs font-mono text-[#66756F] border-t border-[#E5EBE8] pt-3">
                {/* Thin dynamic green accent line responding continuously to scroll progress */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E5EBE8] overflow-hidden">
                  <div
                    ref={progressBarRef}
                    className="h-full bg-[#17664F] origin-left scale-x-0"
                  />
                </div>

                <span className="tracking-wider uppercase">Scroll to explore colour science</span>
                <span className="font-semibold text-[#17664F] tabular-nums">
                  0{active + 1} — 04
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Science() {
  const caps = [
    { num: "01", title: "Research & development" },
    { num: "02", title: "HPLC – High-performance liquid chromatography" },
    { num: "03", title: "Ion chromatography" },
    { num: "04", title: "Gas chromatography" },
    { num: "05", title: "ICP-OES analytical instrumentation" },
    { num: "06", title: "Product quality & testing processes" },
  ];
  return (
    <section id="innovation" className="scroll-mt-20 bg-white section-y text-[#17231F]">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="eyebrow text-primary">Science meets precision</p>
            <h2 className="display mt-4 fs-section text-[#17231F]">
              Beautiful colour. <span className="serif-accent text-primary">Serious science.</span>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end" delay={0.1}>
            <p className="text-lg text-[#66756F]">
              Behind every colourant is a commitment to analytical rigour, product consistency, and continuous improvement.
            </p>
          </Reveal>
        </div>
        <div className="relative mt-12 sm:mt-16 overflow-hidden">
          <MaskImage
            src={lab}
            alt="In-house analytical laboratory with HPLC instrument and coloured dye vials"
            className="aspect-[2048/768] w-full"
          />
          <span className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 rounded-md border border-[#D7E2DC]/80 bg-white/95 px-3.5 py-1.5 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#17231F] uppercase shadow-xs backdrop-blur-xs">
            In-house analytical laboratory
          </span>
        </div>
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16">
          {caps.map((c) => (
            <div
              key={c.num}
              className="flex items-center py-5 sm:py-6 border-b border-[#D7E2DC] first:border-t md:[&:nth-child(2)]:border-t transition-colors duration-150 hover:bg-[#F8FAF9]/50"
            >
              <div className="flex items-center gap-5 sm:gap-7 shrink-0">
                <span className="w-8 sm:w-10 text-center text-[15px] sm:text-base font-medium text-[#17664F]">
                  {c.num}
                </span>
                <div className="h-5 w-px bg-[#D7E2DC] shrink-0" />
              </div>
              <p
                className="pl-5 sm:pl-7 text-[20px] sm:text-[22px] lg:text-[23px] text-[#17231F] leading-snug"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                {c.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Global() {
  return (
    <section className="relative overflow-hidden bg-white text-[#17231F]">
      <SafeImg
        src={globe}
        alt="Earth with connection lines radiating from India"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Subtle soft daylight vignette on the left to ensure crisp text readability */}
      <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-white/70 via-white/30 to-transparent pointer-events-none" />

      <div className="container-x relative flex min-h-[70vh] lg:min-h-[82vh] flex-col justify-center py-20 sm:py-28">
        <Reveal>
          <div className="mb-4 h-[2px] w-8 bg-[#17664F]" />
          <p className="eyebrow text-[#17664F] font-semibold tracking-[2px]">
            Global reach · Headquartered in Mumbai
          </p>

          <h2
            className="display mt-4 max-w-2xl text-[36px] sm:text-[46px] lg:text-[54px] font-medium leading-[1.12] text-[#17231F]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Rooted in India.
            <br />
            <span
              className="serif-accent text-[#17664F] font-normal italic"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Connected to the world.
            </span>
          </h2>

          <p
            className="mt-6 max-w-xl text-[16px] md:text-[18px] leading-relaxed text-[#2E3D37]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Serving customers across 100+ countries, supported by international business and distribution partnerships.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17664F] px-7 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#12523F] active:scale-98 shadow-sm"
          >
            <span>Let's Work Together</span>
            <ArrowRight className="h-4 w-4 text-white" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Quality() {
  const pillsRow1 = ["ISO 9001", "ISO 14001", "ISO 45001", "FSSC 22000", "GMP", "REACH", "Halal"];
  const pillsRow2 = ["Kosher", "Sedex", "EcoVadis", "US-FDA", "NABL"];

  const certCards = [
    { num: "01", name: "ISO 9001", logo: CERT_LOGOS[0] ?? "" },
    { num: "02", name: "ISO 14001", logo: CERT_LOGOS[1] ?? "" },
    { num: "03", name: "ISO 45001", logo: CERT_LOGOS[2] ?? "" },
    { num: "04", name: "NABL", logo: CERT_LOGOS[3] ?? "" },
    { num: "05", name: "EcoVadis", logo: CERT_LOGOS[4] ?? "" },
    { num: "06", name: "US-FDA", logo: CERT_LOGOS[5] ?? "" },
  ];

  return (
    <section id="quality" className="scroll-mt-20 bg-white text-[#17231F] py-20 lg:py-28">
      <div className="container-x">
        {/* Top-Right Header: TRUSTED GLOBALLY ──── 01 */}
        <div className="flex items-center justify-end gap-4 mb-10">
          <span className="text-[11px] sm:text-[13px] font-mono font-bold tracking-[2.5px] text-[#17664F] uppercase">
            TRUSTED GLOBALLY
          </span>
          <div className="h-px w-16 bg-[#D7E2DC]" />
          <span className="text-[14px] sm:text-[15px] font-mono font-bold text-[#17231F]">
            01
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Vertical Index Line + Heading & Copy */}
          <Reveal className="lg:col-span-5">
            <div className="flex items-start gap-6 sm:gap-7">
              {/* Far Left 01 + Vertical Line */}
              <div className="flex flex-col items-center shrink-0 pt-1">
                <span className="text-[13px] font-mono font-bold text-[#17664F] mb-3">
                  01
                </span>
                <div className="w-px h-64 sm:h-80 bg-[#D7E2DC]" />
              </div>

              {/* Title & Copy */}
              <div className="flex-1">
                <div className="flex items-center gap-3.5">
                  <p className="eyebrow text-[#17664F] font-bold tracking-[2.5px] text-[11px] sm:text-[12px]">
                    Quality credentials
                  </p>
                  <div className="h-px w-16 bg-[#D7E2DC]" />
                </div>

                <h2
                  className="mt-5 text-[44px] sm:text-[56px] md:text-[66px] lg:text-[76px] xl:text-[84px] font-normal leading-[1.04] tracking-tight text-[#17231F]"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Quality, verified.
                  <br />
                  <span className="italic text-[#17664F]">
                    At every stage.
                  </span>
                </h2>

                <p
                  className="mt-7 max-w-md text-[16px] sm:text-[18px] leading-relaxed text-[#66756F]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Certifications and memberships as published by Neelikon.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Pills & 6 Certification Cards */}
          <div className="lg:col-span-7">
            {/* Pills Rows */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {pillsRow1.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-[#D7E2DC] bg-white px-5 py-2 text-[13px] sm:text-[15px] font-medium text-[#17231F] shadow-2xs transition-all hover:border-[#17664F] hover:text-[#17664F]"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {pillsRow2.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-[#D7E2DC] bg-white px-5 py-2 text-[13px] sm:text-[15px] font-medium text-[#17231F] shadow-2xs transition-all hover:border-[#17664F] hover:text-[#17664F]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* 6 Certification Cards Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certCards.map((card) => (
                <div
                  key={card.num}
                  className="flex flex-col justify-between rounded-none border border-[#D7E2DC] bg-white p-5 min-h-[165px] sm:min-h-[175px] transition-all duration-200 hover:border-[#17664F]/60 hover:shadow-xs"
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] sm:text-[14px] font-semibold text-[#17664F]">
                      {card.num}
                    </span>
                    <div className="h-3.5 w-px bg-[#D7E2DC]" />
                    <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-wider text-[#17231F]">
                      {card.name}
                    </span>
                  </div>

                  {/* Logo Centered */}
                  <div className="my-auto flex h-16 sm:h-20 items-center justify-center pt-3">
                    <SafeImg
                      src={card.logo}
                      alt={`${card.name} certification logo`}
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Insights() {
  const [activeIndex, setActiveIndex] = useState(0);

  const newsItems = [
    {
      num: "01",
      title: "Export Award Recognition",
      description: "Honoured at the CHEMEXCIL Presentation of Export Awards.",
      img: NEWS[0] ?? "",
      accent: "left",
    },
    {
      num: "02",
      title: "Exporters' Excellence",
      description: "Recognised for outstanding performance in international trade.",
      img: NEWS[1] ?? "",
      accent: "right",
    },
    {
      num: "03",
      title: "Community Initiative",
      description: "Supporting education and child development for a brighter future.",
      img: NEWS[2] ?? "",
      accent: "none",
    },
    {
      num: "04",
      title: "Industry Collaboration",
      description: "Participation in key industry events and knowledge initiatives.",
      img: NEWS[3] ?? "",
      accent: "right",
    },
  ];

  return (
    <section id="insights" className="scroll-mt-20 bg-white section-y relative overflow-hidden">
      <div className="container-x">
        {/* Top Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div className="mb-3 h-[2px] w-8 bg-[#17664F]" />
            <p className="eyebrow text-[#17664F] font-semibold tracking-[2px]">News & events</p>
            <h2
              className="mt-3 text-[36px] sm:text-[46px] lg:text-[54px] font-normal tracking-tight text-[#17231F]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Moments from <span className="italic text-[#17664F]">Neelikon.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
              <p
                className="max-w-[280px] text-[14px] leading-relaxed text-[#66756F]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Events, recognitions and initiatives that reflect our journey, our people and our purpose.
              </p>
              <a
                href="https://neelikon.com/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 shrink-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#17664F] text-white transition-all group-hover:scale-105 group-hover:bg-[#12523F] shadow-xs">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <span className="text-[13px] sm:text-[14px] font-medium text-[#17231F] group-hover:text-[#17664F] transition-colors">
                  All news on neelikon.com
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Cards Row with Decorative Line */}
        <div className="relative mt-14 sm:mt-16">
          {/* Delicate decorative connecting line with green node */}
          <svg
            className="pointer-events-none absolute -top-8 left-1/4 right-8 h-28 w-3/4 text-[#17664F]/25 hidden lg:block"
            fill="none"
            viewBox="0 0 900 120"
            preserveAspectRatio="none"
          >
            <path d="M 0,90 Q 260,-20 540,65 T 900,20" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="230" cy="28" r="4.5" fill="#17664F" />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {newsItems.map((item, i) => (
              <div key={item.num} className="relative group flex flex-col">
                {/* Offset graphic green backdrop shape */}
                {item.accent === "left" && (
                  <div className="absolute -left-2.5 -top-2.5 h-full w-full rounded-2xl bg-[#17664F] -z-10 transition-transform duration-300 group-hover:-translate-x-1" />
                )}
                {item.accent === "right" && (
                  <div className="absolute -right-2.5 -top-2.5 h-full w-full rounded-2xl bg-[#17664F] -z-10 transition-transform duration-300 group-hover:translate-x-1" />
                )}

                {/* Main Photo Card */}
                <div className="relative overflow-hidden rounded-xl bg-white border border-[#D7E2DC]/50 shadow-xs">
                  <SafeImg
                    src={item.img}
                    alt={item.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Details below photo */}
                <div className="mt-5 flex items-start gap-3.5">
                  <span className="text-[13px] font-semibold text-[#17664F] pt-0.5 min-w-[20px]">
                    {item.num}
                  </span>
                  <div className="h-4 w-px bg-[#D7E2DC] shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3
                      className="text-[17px] sm:text-[18px] font-serif text-[#17231F] leading-snug"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-1.5 text-[12px] sm:text-[13px] leading-relaxed text-[#66756F]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Slider & Timeline Navigation (commented out for now) */}
        {/*
        <div className="mt-14 pt-6 flex items-center justify-between border-t border-[#E5EBE8]">
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : newsItems.length - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8ECE9] text-[#17231F] transition-all hover:bg-[#D7E2DC] active:scale-95 cursor-pointer"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev < newsItems.length - 1 ? prev + 1 : 0))}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17664F] text-white transition-all hover:bg-[#12523F] active:scale-95 cursor-pointer shadow-xs"
              aria-label="Next slide"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="relative mx-8 hidden sm:flex flex-1 items-center">
            <div className="h-px w-full bg-[#D7E2DC]" />
            <div className="absolute inset-x-0 flex items-center justify-between px-2">
              {newsItems.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all cursor-pointer ${
                    i === activeIndex
                      ? "h-3.5 w-3.5 rounded-full bg-[#17664F] ring-4 ring-[#E8ECE9]"
                      : "h-2.5 w-2.5 rounded-full border border-[#B8C8C0] bg-white hover:border-[#17664F]"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="shrink-0 text-xs font-mono font-medium tracking-widest text-[#66756F]">
            {String(activeIndex + 1).padStart(2, "0")} — {String(newsItems.length).padStart(2, "0")}
          </div>
        </div>
        */}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="bg-card section-y">
      <div className="container-x">
        <Reveal>
          <span aria-hidden className="serif-accent block text-[10rem] leading-none text-sky">“</span>
          <blockquote className="-mt-16 max-w-4xl text-2xl font-semibold leading-snug tracking-tight md:text-[2.25rem] md:leading-[1.25]">
            Pioneers of the Colour and Dye Industry, Neelikon is a well-established name that has continued providing the best quality products and efficient technical support to its customers for decades. We are happy to be associated with them and look forward to continuing to do so in the long future.
          </blockquote>
          <p className="eyebrow mt-10 text-muted-foreground">Distributor – Food – India</p>
        </Reveal>
      </div>
    </section>
  );
}

