import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
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

const INDUSTRIES = [
  { t: "Food & Beverages", d: "Colour solutions developed for food applications, with a focus on quality, consistency, and application requirements.", slug: "natural-food", img: "https://neelikon.com/wp-content/uploads/2025/09/Natural-Food-Colourants.png", tone: "text-leaf" },
  { t: "Pharmaceuticals", d: "Specialised colourants supported by analytical testing and quality-focused processes.", slug: "pharma", img: "https://neelikon.com/wp-content/uploads/2025/09/Pharmaceutical-Colourants.png", tone: "text-sky" },
  { t: "Cosmetics & Personal Care", d: "Colour technologies for cosmetic and personal-care formulations.", slug: "cosmetic", img: "https://neelikon.com/wp-content/uploads/2025/09/Cosmetic-Pigments.png", tone: "text-flame" },
  { t: "Specialty & Industrial", d: "Specialty fluorescent dyes and colourants for diverse industrial applications.", slug: "fluorescent", img: "https://neelikon.com/wp-content/uploads/2025/09/Fluorescent-and-Solvent-Dyes.png", tone: "text-navy" },
];

function Industries() {
  return (
    <section id="industries" className="scroll-mt-20 bg-card section-y">
      <div className="container-x">
        <Reveal><p className="eyebrow text-navy">Industries</p><h2 className="display mt-4 max-w-4xl fs-section">Four worlds. One standard.</h2></Reveal>
        <div className="mt-20 space-y-24">
          {INDUSTRIES.map((x, i) => (
            <article key={x.t} className={`grid items-center gap-10 md:grid-cols-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <MaskImage src={x.img} alt={x.t} imgClassName="h-[170%]! object-top" className={`bg-background ${i % 2 ? "aspect-square md:col-span-5" : "aspect-[16/10] md:col-span-7"}`} />
              <Reveal className={i % 2 ? "md:col-span-6 md:col-start-1" : "md:col-span-4 md:col-start-9"}>
                <p className={`font-mono text-sm ${x.tone}`}>0{i + 1}</p>
                <h3 className="display mt-3 fs-sub">{x.t}</h3>
                <p className="mt-5 text-lg text-muted-foreground">{x.d}</p>
                <Link to="/products/$slug" params={{ slug: x.slug }} className="mt-6 inline-flex items-center gap-2 font-bold hover:text-navy">See products <ArrowRight className="h-4 w-4" /></Link>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
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
  return (
    <section id="quality" className="scroll-mt-20 bg-background section-y">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-navy">Quality credentials</p>
          <h2 className="display mt-4 fs-section">Quality has a standard.</h2>
          <p className="mt-6 text-muted-foreground">Certifications and memberships as published by Neelikon.</p>
        </Reveal>
        <div className="md:col-span-7">
          <ul className="flex flex-wrap gap-2">
            {CERT_LABELS.map((c, i) => (
              <motion.li key={c} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, ease: EASE }}
                className="rounded-full border btn min-h-11 px-5 text-sm">{c}</motion.li>
            ))}
          </ul>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {CERT_LOGOS.map((l, i) => (
              <li key={l} className="flex h-24 items-center justify-center border bg-paper p-4">
                <SafeImg src={l} alt={`Neelikon certification logo ${i + 1}`} className="max-h-full w-auto object-contain" />
              </li>
            ))}
          </ul>
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

