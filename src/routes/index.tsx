import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import hero from "@/assets/hero-pigment.jpg";
import lab from "@/assets/lab.jpg";
import globe from "@/assets/globe.jpg";
import { ABOUT_IMG, CERT_LABELS, CERT_LOGOS, CONTACT, NEWS } from "@/lib/content";
import { EASE, MaskImage, Reveal, SafeImg } from "@/components/site/Reveal";
import { ScrollFilm } from "@/components/site/ScrollFilm";
import { ProductUniverse } from "@/components/site/ProductUniverse";
import { SpectrumDivider } from "@/components/site/SpectrumDivider";
import { FinalCta } from "@/components/site/FinalCta";
import { EnquiryForm } from "@/components/site/EnquiryForm";

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
      <Testimonial />
      <div className="bg-card"><SpectrumDivider /></div>
      <Insights />
      <FinalCta />
      <Contact />
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
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-ink text-paper">
      <motion.div style={{ y }} className="absolute inset-0 md:left-[38%]">
        <motion.img
          src={hero}
          alt="Blue, orange and green pigment clouds swirling through water"
          width={1600}
          height={1200}
          initial={reduce ? false : { clipPath: "inset(0 0 0 100%)", scale: 1.15 }}
          animate={{ clipPath: "inset(0 0 0 0%)", scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent md:from-ink/90 md:via-transparent" />
      </motion.div>
      <div className="container-x relative flex min-h-[100dvh] flex-col justify-end pb-16 pt-32">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="eyebrow text-sky">
          Colour science. Global expertise.
        </motion.p>
        <h1 className="display fs-hero mt-6 max-w-[12ch]">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: EASE }}>
                {l}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <motion.span className="serif-accent block text-[0.55em] text-flame" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: EASE }}>
              For a World in Motion.
            </motion.span>
          </span>
        </h1>
        <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7, ease: EASE }} className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="measure text-lg leading-relaxed text-paper/85">High-purity colourants backed by decades of expertise, rigorous quality standards, and a global network serving industries around the world.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/products" className="group inline-flex items-center gap-2 rounded-full bg-paper btn text-ink transition-transform hover:-translate-y-0.5 active:scale-95">
                Explore Our Colours <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#film" className="inline-flex items-center rounded-full border border-paper/40 btn transition-colors hover:bg-paper/10">Discover Neelikon</a>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-6 border-t border-paper/20 pt-6 md:col-span-6 md:col-start-7">
            {[["1983", "Established"], ["100+", "Countries served"], ["4", "Core industries"]].map(([a, b]) => (
              <div key={a}><dt className="sr-only">{b}</dt><dd className="fs-stat">{a}</dd><dd className="mt-2 text-sm leading-snug text-paper/75">{b}</dd></div>
            ))}
          </dl>
        </motion.div>
        <a href="#film" aria-label="Scroll to story" className="absolute bottom-6 right-6 hidden items-center gap-2 text-xs text-paper/60 md:flex">
          Scroll <ArrowDown className="h-4 w-4 motion-safe:animate-bounce" />
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
  const caps = ["Research & development", "HPLC — High-performance liquid chromatography", "Ion chromatography", "Gas chromatography", "ICP-OES analytical instrumentation", "Product quality & testing processes"];
  return (
    <section id="innovation" className="scroll-mt-20 bg-ink section-y text-paper">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="eyebrow text-sky">Science meets precision</p>
            <h2 className="display mt-4 fs-section">Beautiful colour. <span className="serif-accent text-flame">Serious science.</span></h2>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end" delay={0.1}>
            <p className="text-lg text-paper/70">Behind every colourant is a commitment to analytical rigour, product consistency, and continuous improvement.</p>
          </Reveal>
        </div>
        <div className="relative mt-16">
          <MaskImage src={lab} alt="Analytical laboratory with HPLC instrument and coloured dye vials" className="aspect-[16/9]" />
                    <span className="eyebrow absolute bottom-6 left-6 hidden bg-ink/70 px-3 py-2 text-paper md:block">In-house analytical laboratory</span>
        </div>
        <ol className="mt-16 grid gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
          {caps.map((c, i) => (
            <li key={c} className="bg-ink p-8">
              <span className="font-mono text-xs text-sky">R&D / {String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 text-xl font-bold">{c}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Global() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <SafeImg src={globe} alt="Earth at night with connection lines radiating from India" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="film-shade absolute inset-0" />
      <svg aria-hidden viewBox="0 0 1000 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {([[160, 120], [820, 140], [700, 340], [250, 320]] as const).map(([x, yy], i) => (
          <motion.path key={i} d={`M580 200 Q ${(580 + x) / 2} ${Math.min(yy, 200) - 120} ${x} ${yy}`} stroke="var(--flame)" strokeWidth="1.2" fill="none"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: i * 0.25, ease: EASE }} />
        ))}
      </svg>
      <div className="container-x relative flex min-h-[85vh] flex-col justify-end section-y">
        <Reveal>
          <p className="eyebrow text-sky">Global reach · Headquartered in Mumbai</p>
          <h2 className="display mt-4 max-w-4xl fs-section">Rooted in India. <span className="serif-accent">Connected to the world.</span></h2>
          <p className="mt-6 max-w-xl text-lg text-paper/75">Serving customers across 100+ countries, supported by international business and distribution partnerships.</p>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper btn text-ink">Let's Work Together <ArrowRight className="h-4 w-4" /></a>
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

function Insights() {
  return (
    <section id="insights" className="scroll-mt-20 bg-background section-y">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal><p className="eyebrow text-navy">News & events</p><h2 className="display mt-4 fs-section">Moments from Neelikon.</h2></Reveal>
          <a href="https://neelikon.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold hover:text-navy">All news on neelikon.com <ArrowRight className="h-4 w-4" /></a>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NEWS.map((n, i) => (
            <li key={n} className={i % 2 ? "lg:mt-16" : ""}>
              <MaskImage src={n} alt={`Neelikon news and event ${i + 1}`} className="aspect-[3/4] bg-card" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="navy-field scroll-mt-16 section-y text-paper">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-flame">Enquiries</p>
          <h2 className="display mt-4 fs-section">Let's create something <span className="serif-accent text-sky">exceptional.</span></h2>
          <p className="mt-6 text-lg text-paper/75">Connect with our team to discuss your application, product requirements, and opportunities to work together.</p>
          <ul className="mt-10 space-y-4 text-paper/85">
            <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-flame" /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-flame" /><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
            <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-flame" /><span>{CONTACT.address}</span></li>
          </ul>
          <a href="/products" className="mt-10 inline-flex rounded-full border border-paper/40 btn">Explore Our Products</a>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7"><EnquiryForm /></div>
      </div>
    </section>
  );
}

