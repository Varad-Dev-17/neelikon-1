import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, Calendar, FileText, FlaskConical, Globe, MapPin, Trophy } from "lucide-react";
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
import app1 from "@/assets/applications/1.png";
import app2 from "@/assets/applications/2.png";
import app3 from "@/assets/applications/3.png";
import app4 from "@/assets/applications/4.png";
import { ABOUT_IMG, CERT_LABELS, CERT_LOGOS, GLOBAL_CERT_CARDS, GLOBAL_CERT_PILLS, NEWS } from "@/lib/content";
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

    // Smooth, responsive cinematic scroll for storytelling experience
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
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
    <main className="-mt-[104px]">
      <ScrollFilm />
      <Hero />
      <SpectrumDivider />
      <ProductUniverse showOnlyOnePerGroup={true} />
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
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
          className="mt-8 max-w-xl"
        >
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-[#66756F]">
            High-purity colourants backed by decades of expertise, rigorous quality standards, and a global network serving industries around the world.
          </p>
        </motion.div>
        <a href="#products" aria-label="Scroll to products" className="absolute bottom-6 right-6 hidden items-center gap-2 text-xs text-[#66756F] md:flex hover:text-primary transition-colors">
          Scroll <ArrowDown className="h-4 w-4 motion-safe:animate-bounce text-primary" />
        </a>
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
    img: app1,
  },
  {
    num: "02",
    shortName: "Pharmaceuticals",
    title: "Pharmaceutical Colourants",
    description: "Colourants for pharmaceutical applications, including capsules and tablets.",
    slug: "pharma",
    img: app2,
  },
  {
    num: "03",
    shortName: "Cosmetics",
    title: "Cosmetics & Personal Care",
    description: "Colour solutions for cosmetics and personal care products.",
    slug: "cosmetic",
    img: app3,
  },
  {
    num: "04",
    shortName: "Specialty Dyes",
    title: "Specialty & Industrial Dyes",
    description: "Specialty colour solutions for industrial applications.",
    slug: "fluorescent",
    img: app4,
  },
];

function Industries() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const showcaseRowRef = useRef<HTMLDivElement>(null);
  const imageStageWrapperRef = useRef<HTMLDivElement>(null);
  const textStageWrapperRef = useRef<HTMLDivElement>(null);
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
      const rowEl = showcaseRowRef.current;
      const imgWrapper = imageStageWrapperRef.current;
      const textWrapper = textStageWrapperRef.current;
      if (!pinEl || !rowEl || !imgWrapper || !textWrapper) return;

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

      // Responsive shift calculation for the alternating left-right glide
      const getShift = () => {
        const rowW = rowEl.offsetWidth;
        const imgW = imgWrapper.offsetWidth;
        const textW = textWrapper.offsetWidth;
        return {
          imgShift: Math.max(0, rowW - imgW),
          textShift: -Math.max(0, rowW - textW),
        };
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "+=2200",
          pin: true,
          scrub: 0.8,
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

      // -------------------------------------------------------------
      // 01 Food & Beverage (Time 0 to 1.2): Image on LEFT, Text on RIGHT
      // -------------------------------------------------------------

      // -------------------------------------------------------------
      // Transition 0 -> 1 (Time 1.2 to 2.2):
      // Image glides LEFT -> RIGHT, Text glides RIGHT -> LEFT
      // -------------------------------------------------------------
      tl.to(
        imgWrapper,
        { x: () => getShift().imgShift, ease: "power2.inOut", duration: 1.0 },
        1.2
      );
      tl.to(
        textWrapper,
        { x: () => getShift().textShift, ease: "power2.inOut", duration: 1.0 },
        1.2
      );

      tl.to(
        p0,
        { opacity: 0, y: -20, pointerEvents: "none", ease: "power2.in", duration: 0.4 },
        1.2
      );
      tl.fromTo(
        p1,
        { opacity: 0, y: 24, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", ease: "power2.out", duration: 0.6 },
        1.5
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

      // -------------------------------------------------------------
      // 02 Pharmaceutical (Time 2.2 to 3.4): Image on RIGHT, Text on LEFT
      // -------------------------------------------------------------

      // -------------------------------------------------------------
      // Transition 1 -> 2 (Time 3.4 to 4.4):
      // Image glides RIGHT -> LEFT, Text glides LEFT -> RIGHT
      // -------------------------------------------------------------
      tl.to(
        imgWrapper,
        { x: 0, ease: "power2.inOut", duration: 1.0 },
        3.4
      );
      tl.to(
        textWrapper,
        { x: 0, ease: "power2.inOut", duration: 1.0 },
        3.4
      );

      tl.to(
        p1,
        { opacity: 0, y: -20, pointerEvents: "none", ease: "power2.in", duration: 0.4 },
        3.4
      );
      tl.fromTo(
        p2,
        { opacity: 0, y: 24, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", ease: "power2.out", duration: 0.6 },
        3.7
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

      // -------------------------------------------------------------
      // 03 Cosmetics (Time 4.4 to 5.6): Image on LEFT, Text on RIGHT
      // -------------------------------------------------------------

      // -------------------------------------------------------------
      // Transition 2 -> 3 (Time 5.6 to 6.6):
      // Image glides LEFT -> RIGHT, Text glides RIGHT -> LEFT
      // -------------------------------------------------------------
      tl.to(
        imgWrapper,
        { x: () => getShift().imgShift, ease: "power2.inOut", duration: 1.0 },
        5.6
      );
      tl.to(
        textWrapper,
        { x: () => getShift().textShift, ease: "power2.inOut", duration: 1.0 },
        5.6
      );

      tl.to(
        p2,
        { opacity: 0, y: -20, pointerEvents: "none", ease: "power2.in", duration: 0.4 },
        5.6
      );
      tl.fromTo(
        p3,
        { opacity: 0, y: 24, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", ease: "power2.out", duration: 0.6 },
        5.9
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

      // -------------------------------------------------------------
      // 04 Specialty (Time 6.6 to 7.8): Image on RIGHT, Text on LEFT
      // Restful dwell before releasing cleanly into Science
      // -------------------------------------------------------------
      tl.to({}, { duration: 1.2 }, 6.6);
    }, containerRef);

    return () => ctx.revert();
  }, [reduce]);

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
          <div className="h-[100dvh] flex flex-col justify-between pt-[144px] pb-6 overflow-hidden bg-white">
            <div className="container-x flex-1 flex flex-col justify-between">
              {/* Header Bar */}
              <div className="flex flex-col items-center justify-center text-center pb-2">
                <div className="flex items-center justify-center gap-3.5">
                  <div className="h-px w-10 bg-[#D7E2DC]" />
                  <p className="eyebrow text-[#17664F] font-semibold tracking-[3px] text-xs lg:text-sm">
                    APPLICATIONS / COLOUR SCIENCE
                  </p>
                  <div className="h-px w-10 bg-[#D7E2DC]" />
                </div>
                <h2
                  className="mt-2 text-5xl lg:text-[58px] xl:text-[66px] font-normal tracking-tight text-[#17231F] leading-[1.05]"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Four worlds. <span className="italic text-[#17664F]">One standard.</span>
                </h2>
              </div>

              {/* Main Showcase Stage: Dynamic Alternating Left-Right-Left-Right Movement */}
              <div
                ref={showcaseRowRef}
                className="relative w-full flex items-center justify-between my-auto py-4 min-h-[480px]"
              >
                {/* Image Stage Wrapper (starts on LEFT, moves to RIGHT for 02, LEFT for 03, RIGHT for 04) */}
                <div
                  ref={imageStageWrapperRef}
                  className="w-[48%] lg:w-[46%] max-w-[540px] will-change-transform z-10"
                >
                  <div className="relative aspect-[16/10] max-h-[360px] lg:max-h-[390px] w-full rounded-2xl overflow-hidden border border-[#D7E2DC]/80 shadow-md bg-[#F8FAF9]">
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

                {/* Text Content Wrapper (starts on RIGHT, moves to LEFT for 02, RIGHT for 03, LEFT for 04) */}
                <div
                  ref={textStageWrapperRef}
                  className="w-[46%] lg:w-[48%] relative min-h-[300px] flex flex-col justify-center will-change-transform z-10"
                >
                  {APPLICATION_CATEGORIES.map((cat, i) => (
                    <div
                      key={cat.title}
                      ref={(el) => {
                        textPanelsRef.current[i] = el;
                      }}
                      className={`w-full will-change-transform ${i === 0 ? "relative" : "absolute inset-0 pointer-events-none"
                        }`}
                      style={{
                        opacity: i === 0 ? 1 : 0,
                        transform: i === 0 ? "translateY(0px)" : "translateY(30px)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[15px] font-mono font-bold text-[#17664F]">
                          {cat.num}
                        </span>
                        <div className="h-px w-10 bg-[#D7E2DC]" />
                        <span className="text-[11px] lg:text-xs font-mono font-semibold uppercase tracking-wider text-[#66756F]">
                          APPLICATION {i + 1} OF 4
                        </span>
                      </div>

                      {/* Clipped Headline Reveal */}
                      <div className="overflow-hidden mt-6">
                        <h3
                          className="text-5xl lg:text-[64px] xl:text-[72px] font-normal leading-[1.02] tracking-tight text-[#17231F]"
                          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                        >
                          {cat.title}
                        </h3>
                      </div>

                      <p
                        className="mt-6 text-[18px] lg:text-[21px] leading-[1.6] text-[#66756F] max-w-lg"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {cat.description}
                      </p>

                      <div className="mt-9 flex items-center gap-4">
                        <Link
                          to="/products/$slug"
                          params={{ slug: cat.slug }}
                          className="inline-flex items-center gap-3 rounded-full bg-[#17664F] px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[#12523F] active:scale-98 shadow-md hover:shadow-lg"
                        >
                          <span>Explore {cat.shortName}</span>
                          <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
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

const TOP_GLOBAL_HIGHLIGHTS = [
  {
    img: "/global and certifivates/01_one_world_one_quality.png",
    title: "One World,\nOne Quality",
    desc: "Globalized quality with zero compromises.",
  },
  {
    img: "/global and certifivates/02_revolutionary_rd_systems.png",
    title: "Revolutionary\nR&D Systems",
    desc: "Sophisticated laboratories for product development",
  },
  {
    img: "/global and certifivates/03_ranked_top_3_worldwide.png",
    title: "Ranked In Top 3\nWorldwide",
    desc: "Global trailblazers over the years.",
  },
  {
    img: "/global and certifivates/04_service_to_100_nations.png",
    title: "Service to 100+\nNations",
    desc: "Colouring the world since 1983.",
  },
];

function Quality() {
  const [activeFilter, setActiveFilter] = useState("All");

  const isMatch = (tags: string[]) => {
    if (activeFilter === "All") return true;
    return tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase());
  };

  return (
    <section id="quality" className="scroll-mt-20 bg-white text-[#17231F] py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        {/* Top 4 Highlights Strip matching Image 1: Icon + Text with vertical dividers */}
        <div className="mb-14 sm:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#E5EBE8] items-center">
            {TOP_GLOBAL_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 lg:gap-5 lg:px-6 first:lg:pl-0 last:lg:pr-0"
              >
                <img
                  src={item.img}
                  alt={item.title.replace("\n", " ")}
                  className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 object-contain transition-transform duration-200 hover:scale-105"
                  loading="lazy"
                />
                <div className="flex flex-col justify-center">
                  <h4
                    className="font-bold text-[16px] sm:text-[18px] text-[#0B4D8C] leading-[1.25] whitespace-pre-line"
                    style={{ fontFamily: "'Manrope', -apple-system, sans-serif" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-[12px] sm:text-[13px] text-[#64748B] leading-snug mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main 2-Column Section */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Eyebrow, Heading, Description */}
          <div className="lg:col-span-4 lg:border-r lg:border-[#E5EBE8] lg:pr-8">
            <Reveal>
              <div className="flex items-center gap-3">
                <p className="eyebrow text-[#5F6E68] text-[11px] font-semibold tracking-widest uppercase">
                  QUALITY CREDENTIALS
                </p>
                <div className="h-px w-14 bg-[#75B8AA]" />
              </div>

              <h2
                className="mt-5 text-[44px] sm:text-[54px] lg:text-[60px] font-normal leading-[1.04] tracking-tight text-[#0F223D]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Quality, verified.
                <br />
                <span className="serif-accent text-[#0B7D6C] italic">
                  At every stage.
                </span>
              </h2>

              <p
                className="mt-6 text-[14px] sm:text-[15px] leading-relaxed text-[#66756F] max-w-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Certifications and memberships that reflect our commitment to global standards.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Header, Filter Pills, and Cards */}
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              {/* Header: Certifications & Memberships + View All Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
                <div className="flex items-center gap-4 flex-1">
                  <h3
                    className="font-serif text-[24px] sm:text-[28px] font-medium text-[#0F223D]"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    Certifications &amp; Memberships
                  </h3>
                  <div className="h-px flex-1 bg-[#85C4B7] hidden sm:block" />
                </div>
                <Link
                  to="/quality"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B7D6C] hover:text-[#085A4E] transition-colors shrink-0"
                >
                  <span>View All Certifications</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {GLOBAL_CERT_PILLS.map((pill) => {
                  const active = activeFilter === pill;
                  return (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => setActiveFilter(active ? "All" : pill)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${active
                          ? "bg-[#0B7D6C] text-white shadow-2xs font-semibold"
                          : "border border-[#CCE3DE] bg-white text-[#2B3F38] hover:border-[#0B7D6C] hover:text-[#0B7D6C]"
                        }`}
                    >
                      {pill}
                    </button>
                  );
                })}
              </div>

              {/* Certification Cards Grid: All 15 cards displayed across two rows */}
              <div className="mt-7 space-y-3">
                {/* Row 1: 8 cards */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5">
                  {GLOBAL_CERT_CARDS.filter((c) => c.row === 1).map((card) => {
                    const matched = isMatch(card.tags);
                    return (
                      <div
                        key={card.id}
                        className={`group relative flex items-center justify-center transition-all duration-200 ${matched
                            ? "opacity-100 hover:scale-105"
                            : "opacity-30 grayscale hover:grayscale-0 hover:opacity-80"
                          }`}
                      >
                        <img
                          src={card.img}
                          alt={card.alt}
                          className="w-full h-auto object-contain transition-shadow duration-200 hover:shadow-xs"
                          loading="lazy"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Row 2: 7 cards */}
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 sm:gap-2.5">
                  {GLOBAL_CERT_CARDS.filter((c) => c.row === 2).map((card) => {
                    const matched = isMatch(card.tags);
                    return (
                      <div
                        key={card.id}
                        className={`group relative flex items-center justify-center transition-all duration-200 ${matched
                            ? "opacity-100 hover:scale-105"
                            : "opacity-30 grayscale hover:grayscale-0 hover:opacity-80"
                          }`}
                      >
                        <img
                          src={card.img}
                          alt={card.alt}
                          className="w-full h-auto object-contain transition-shadow duration-200 hover:shadow-xs"
                          loading="lazy"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Insights() {
  const awards = [
    {
      id: "chemexcil",
      title: "CHEMEXCIL Presentation of Export Awards",
      img: "/awards/01_export_award_ceremony.jpg",
    },
    {
      id: "exporters",
      title: "D&B Indian Exporters' Excellence Awards",
      img: "/awards/02_exporters_award_group.jpg",
    },
    {
      id: "rise-shine",
      title: "Inauguration of Rise & Shine Child Development Centre",
      img: "/awards/03_rise_and_shine_event.jpg",
    },
    {
      id: "lecture",
      title: "Industry Collaboration & Award Lecture",
      img: "/awards/04_award_presentation_event.jpg",
    },
  ] as const;

  return (
    <section id="insights" className="scroll-mt-20 bg-white py-20 sm:py-28 relative overflow-hidden">
      {/* Background Soft Radiance matching Neelikon Brand */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[550px] w-[550px] rounded-full bg-[#EAF3EF]/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/2 h-[450px] w-[450px] rounded-full bg-[#EAF3EF]/40 blur-3xl" />

      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          {/* Left Column: Asymmetric Award Collage with Flowing Lines & Brand Orbs */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center">
            <Reveal>
              <div className="relative w-full max-w-[390px] sm:max-w-[430px] lg:max-w-[450px] xl:max-w-[470px] mx-auto py-2">
                {/* Flowing SVG Line connecting the composition */}
                <svg
                  className="pointer-events-none absolute -inset-4 sm:-inset-6 h-[calc(100%+2rem)] sm:h-[calc(100%+3rem)] w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] z-0"
                  viewBox="0 0 600 560"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="brandCurveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#17664F" stopOpacity="0.45" />
                      <stop offset="50%" stopColor="#0086B3" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#17664F" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  {/* Outer sweeping curved paths */}
                  <path
                    d="M 30,120 C 10,240 60,420 180,480 C 300,540 440,510 540,420 C 600,360 580,180 500,80 C 420,-20 200,-10 60,80"
                    stroke="url(#brandCurveGrad)"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  <path
                    d="M 520,30 C 580,140 620,380 460,490 C 340,570 120,530 60,460"
                    stroke="#17664F"
                    strokeOpacity="0.2"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>

                {/* Floating Brand Emerald Spherical Orbs */}
                <div className="absolute top-8 -left-2 sm:-left-3 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-gradient-to-br from-[#2BB68D] via-[#17664F] to-[#0E4233] shadow-[0_2px_8px_rgba(23,102,79,0.35)] ring-2 ring-white z-30" />
                <div className="absolute -top-2 left-[46%] h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-gradient-to-br from-[#2BB68D] via-[#17664F] to-[#0E4233] shadow-[0_2px_8px_rgba(23,102,79,0.35)] ring-2 ring-white z-30" />
                <div className="absolute top-[40%] -left-3 sm:-left-4 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-gradient-to-br from-[#2BB68D] via-[#17664F] to-[#0E4233] shadow-[0_2px_8px_rgba(23,102,79,0.35)] ring-2 ring-white z-30" />
                <div className="absolute bottom-[28%] left-[1%] h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-gradient-to-br from-[#2BB68D] via-[#17664F] to-[#0E4233] shadow-[0_2px_8px_rgba(23,102,79,0.35)] ring-2 ring-white z-30" />
                <div className="absolute -bottom-1 left-[36%] h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-gradient-to-br from-[#2BB68D] via-[#17664F] to-[#0E4233] shadow-[0_2px_8px_rgba(23,102,79,0.35)] ring-2 ring-white z-30" />
                <div className="absolute bottom-4 -right-1 sm:-right-2 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-gradient-to-br from-[#2BB68D] via-[#17664F] to-[#0E4233] shadow-[0_2px_8px_rgba(23,102,79,0.35)] ring-2 ring-white z-30" />
                <div className="absolute top-[16%] -right-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#2BB68D] via-[#17664F] to-[#0E4233] shadow-[0_2px_8px_rgba(23,102,79,0.35)] ring-2 ring-white z-30" />

                {/* Photo 1: Big Top Card (CHEMEXCIL Export Awards) */}
                <div className="relative z-10 w-[92%] ml-auto overflow-hidden rounded-[20px] sm:rounded-[24px] border-[3px] border-white bg-white shadow-[0_12px_32px_rgba(23,35,31,0.1)]">
                  <SafeImg
                    src={awards[0].img}
                    alt={awards[0].title}
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>

                {/* Bottom Row Cluster */}
                <div className="relative z-20 flex items-start justify-between -mt-6 sm:-mt-8">
                  {/* Left Column in Cluster: Card 2 & Overlapping Card 4 */}
                  <div className="w-[50%] relative">
                    {/* Photo 2: D&B Exporters' Award */}
                    <div className="overflow-hidden rounded-[15px] sm:rounded-[18px] border-[3px] border-white bg-white shadow-[0_10px_26px_rgba(23,35,31,0.1)]">
                      <SafeImg
                        src={awards[1].img}
                        alt={awards[1].title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </div>

                    {/* Photo 4: Award Lecture / Presentation (Overlapping below Card 2) */}
                    <div className="relative -mt-10 sm:-mt-14 ml-7 sm:ml-9 w-[88%] overflow-hidden rounded-[15px] sm:rounded-[18px] border-[3px] border-white bg-white shadow-[0_14px_34px_rgba(23,35,31,0.16)] z-30">
                      <SafeImg
                        src={awards[3].img}
                        alt={awards[3].title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  {/* Right Column in Cluster: Photo 3 (Rise & Shine Event) */}
                  <div className="w-[46%] ml-auto mt-2 sm:mt-4 overflow-hidden rounded-[15px] sm:rounded-[18px] border-[3px] border-white bg-white shadow-[0_10px_26px_rgba(23,35,31,0.1)]">
                    <SafeImg
                      src={awards[2].img}
                      alt={awards[2].title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial News & Events Content */}
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal delay={0.15}>
              {/* Eyebrow with Neelikon brand dash */}
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-9 bg-[#17664F]" />
                <p className="text-[11.5px] sm:text-[12px] font-bold tracking-[2.5px] uppercase text-[#17664F]">
                  NEELIKON &nbsp;/&nbsp; NEWS &amp; EVENTS
                </p>
              </div>

              {/* Serif Heading */}
              <h2
                className="mt-4 sm:mt-5 text-[42px] sm:text-[52px] lg:text-[58px] font-normal leading-[1.05] tracking-tight text-[#17231F]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Latest News and
                <br />
                <span className="italic text-[#17664F]">Upcoming Events</span>
                <span className="text-[#17664F]">.</span>
              </h2>

              {/* Description Paragraph */}
              <p
                className="mt-5 text-[14px] sm:text-[15px] leading-relaxed text-[#66756F] max-w-xl"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                At Neelikon, we&apos;re highly proactive and are always getting things done. You can keep up with our most recent press releases and events to get a glance into our consistent effort for excellence. Stay tuned to this section to learn the most recent activities, research breakthroughs, industry news and other upcoming events.
              </p>

              {/* 3 Icon Feature Badges in Neelikon Brand Mint/Emerald */}
              <div className="mt-8 flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-7">
                {/* Press Releases */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3EF] text-[#17664F] shadow-2xs">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="text-[13px] font-bold leading-tight text-[#17231F]">
                    Press<br />Releases
                  </div>
                </div>

                {/* Events & Participation */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3EF] text-[#17664F] shadow-2xs">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="text-[13px] font-bold leading-tight text-[#17231F]">
                    Events &amp;<br />Participation
                  </div>
                </div>

                {/* Awards & Recognitions */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3EF] text-[#17664F] shadow-2xs">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div className="text-[13px] font-bold leading-tight text-[#17231F]">
                    Awards &amp;<br />Recognitions
                  </div>
                </div>
              </div>

              {/* Call-to-action button in Neelikon Emerald */}
              <div className="mt-9">
                <a
                  href="https://neelikon.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-[#17664F] hover:bg-[#12523F] px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_8px_22px_rgba(23,102,79,0.25)] transition-all hover:scale-[1.02] active:scale-95"
                >
                  Explore News &amp; Events
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
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

