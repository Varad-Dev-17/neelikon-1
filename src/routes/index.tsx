import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import hero from "@/assets/hero-pigment.jpg";
import lab from "@/assets/lab.png";
import globe from "@/assets/globe.png";
import { ABOUT_IMG, CERT_LABELS, CERT_LOGOS, CONTACT, NEWS } from "@/lib/content";
import { EASE, MaskImage, Reveal, SafeImg } from "@/components/site/Reveal";
import { ScrollFilm } from "@/components/site/ScrollFilm";
import { ProductUniverse } from "@/components/site/ProductUniverse";
import { SpectrumDivider } from "@/components/site/SpectrumDivider";
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
    <section className="relative overflow-hidden bg-[#07130F] text-white">
      <SafeImg
        src={globe}
        alt="Earth at night with connection lines radiating from India"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      {/* High-contrast gradient backdrops ensuring crystal clear readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07130F]/90 via-[#07130F]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07130F]/95 via-[#07130F]/40 to-transparent pointer-events-none" />


      <div className="container-x relative flex min-h-[85vh] flex-col justify-end section-y">
        <Reveal>
          <p className="eyebrow text-[#5EEAD4] font-semibold tracking-[2px]">
            Global reach · Headquartered in Mumbai
          </p>

          <h2
            className="display mt-4 max-w-4xl fs-section text-white"
            style={{ color: "#FFFFFF", fontFamily: "'Manrope', sans-serif" }}
          >
            Rooted in India. <span className="serif-accent text-[#5EEAD4]">Connected to the world.</span>
          </h2>

          <p
            className="mt-6 max-w-xl text-[16px] md:text-[18px] leading-relaxed text-white/90"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Serving customers across 100+ countries, supported by international business and distribution partnerships.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[13px] font-semibold text-[#17231F] transition-all hover:bg-[#DFF0E5] active:scale-98 shadow-lg"
          >
            <span>Let's Work Together</span>
            <ArrowRight className="h-4 w-4 text-[#17231F]" />
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
    <section id="contact" className="scroll-mt-16 bg-white py-16 md:py-24 text-[#17231F]">
      <div className="container-x">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[12px] font-medium text-[#66756F] transition-colors hover:text-[#17231F]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to home</span>
        </Link>

        <p className="mt-8 text-[10px] font-bold uppercase tracking-[2px] text-[#17664F]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          CONTACT US
        </p>

        <h2
          className="mt-4 text-[36px] sm:text-[46px] lg:text-[54px] font-medium leading-[1.12] tracking-tight text-[#17231F]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Great possibilities begin with a<br />conversation.
        </h2>

        <p className="mt-4 max-w-2xl text-[14px] sm:text-[15px] leading-relaxed text-[#66756F]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Tell us what you have in mind. Our team can help you find the right colour solution for your application.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h3 className="text-[22px] font-medium text-[#17231F]" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Connect with Neelikon
            </h3>

            <div className="mt-8 space-y-0">
              <div className="flex items-start gap-3.5">
                <Mail className="h-5 w-5 shrink-0 text-[#17664F] mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold text-[#17231F]">General enquiries</p>
                  <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-sm text-[#66756F] transition-colors hover:text-[#17664F]">
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="my-6 border-b border-[#E5EBE8]" />

              <div className="flex items-start gap-3.5">
                <Phone className="h-5 w-5 shrink-0 text-[#17664F] mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold text-[#17231F]">Call our team</p>
                  <a href="tel:+912246221415" className="mt-1 block text-sm text-[#66756F] transition-colors hover:text-[#17664F]">
                    +91 22 4622 1415
                  </a>
                  <p className="mt-1 text-sm text-[#66756F]">
                    Export sales: +91 22 6662 6874
                  </p>
                </div>
              </div>

              <div className="my-6 border-b border-[#E5EBE8]" />

              <div className="flex items-start gap-3.5">
                <MapPin className="h-5 w-5 shrink-0 text-[#17664F] mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold text-[#17231F]">Head office</p>
                  <address className="mt-1 text-sm not-italic leading-relaxed text-[#66756F]">
                    D-08, Everest Building, 5th Floor,<br />
                    Pt. Madan Mohan Malaviya Marg,<br />
                    Tardeo Circle, Mumbai 400034,<br />
                    Maharashtra, India.
                  </address>
                </div>
              </div>

              <div className="mt-6 border-b border-[#E5EBE8]" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}

