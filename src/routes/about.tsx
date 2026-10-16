import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Neelikon — Four Decades of Colour Expertise" },
      {
        name: "description",
        content:
          "Since 1983, Neelikon has manufactured food colours, pharmaceutical colourants, cosmetic pigments and specialty dyes in Mumbai for customers in 100+ countries worldwide.",
      },
      { property: "og:title", content: "About Neelikon — Four Decades of Colour Expertise" },
      {
        property: "og:description",
        content:
          "From our Mumbai base to global markets, we manufacture high-performance colourants with scientific precision, consistent quality and a commitment to a more colourful tomorrow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

/* Reusable Pigment Dispersion Cloud matching the reference visual */
function PigmentDispersion({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 240"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <defs>
        <radialGradient id="pigmentGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#38B6FF" stopOpacity="0.25" />
          <stop offset="75%" stopColor="#7CD4FD" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      {/* Soft pigment fog */}
      <circle cx="130" cy="120" r="85" fill="url(#pigmentGlow)" filter="url(#blurFilter)" />
      <circle cx="155" cy="100" r="55" fill="url(#pigmentGlow)" filter="url(#blurFilter)" />
      {/* Fine scattered micro-pigment particles */}
      <circle cx="110" cy="95" r="3" fill="#00A3E0" opacity="0.6" />
      <circle cx="125" cy="80" r="2.2" fill="#38B6FF" opacity="0.5" />
      <circle cx="140" cy="70" r="1.8" fill="#0077B6" opacity="0.6" />
      <circle cx="160" cy="85" r="2.5" fill="#00A3E0" opacity="0.55" />
      <circle cx="175" cy="105" r="3" fill="#0284C7" opacity="0.5" />
      <circle cx="165" cy="130" r="2.2" fill="#38B6FF" opacity="0.6" />
      <circle cx="180" cy="145" r="1.8" fill="#00A3E0" opacity="0.45" />
      <circle cx="145" cy="155" r="2.8" fill="#0284C7" opacity="0.5" />
      <circle cx="120" cy="140" r="2" fill="#38B6FF" opacity="0.55" />
      <circle cx="95" cy="115" r="1.5" fill="#00A3E0" opacity="0.4" />
      <circle cx="190" cy="110" r="1.8" fill="#38B6FF" opacity="0.4" />
      <circle cx="150" cy="60" r="2" fill="#00A3E0" opacity="0.4" />
      <circle cx="135" cy="170" r="1.6" fill="#0284C7" opacity="0.4" />
    </svg>
  );
}

/* Dotted World Map Silhouette for Who We Are */
function DottedWorldMap() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 180"
      className="pointer-events-none absolute -right-6 -top-10 h-64 w-96 opacity-25"
      fill="#6BA3DA"
    >
      {/* North America dots */}
      <circle cx="50" cy="45" r="2" /><circle cx="58" cy="42" r="2" /><circle cx="66" cy="44" r="2" />
      <circle cx="52" cy="54" r="2" /><circle cx="60" cy="52" r="2" /><circle cx="70" cy="50" r="2" />
      <circle cx="64" cy="62" r="2" /><circle cx="72" cy="60" r="2" /><circle cx="80" cy="58" r="2" />
      <circle cx="76" cy="70" r="2" /><circle cx="84" cy="68" r="2" />
      {/* South America dots */}
      <circle cx="92" cy="95" r="2" /><circle cx="100" cy="98" r="2" />
      <circle cx="96" cy="108" r="2" /><circle cx="104" cy="112" r="2" />
      <circle cx="100" cy="122" r="2" /><circle cx="106" cy="132" r="2" />
      {/* Europe & Africa dots */}
      <circle cx="150" cy="42" r="2" /><circle cx="158" cy="40" r="2" /><circle cx="166" cy="44" r="2" />
      <circle cx="154" cy="52" r="2" /><circle cx="162" cy="50" r="2" /><circle cx="170" cy="52" r="2" />
      <circle cx="156" cy="72" r="2" /><circle cx="164" cy="70" r="2" /><circle cx="172" cy="74" r="2" />
      <circle cx="160" cy="85" r="2" /><circle cx="168" cy="90" r="2" /><circle cx="174" cy="98" r="2" />
      <circle cx="166" cy="110" r="2" /><circle cx="172" cy="120" r="2" />
      {/* Asia dots */}
      <circle cx="190" cy="40" r="2" /><circle cx="200" cy="38" r="2" /><circle cx="212" cy="42" r="2" /><circle cx="224" cy="40" r="2" /><circle cx="236" cy="44" r="2" />
      <circle cx="195" cy="52" r="2" /><circle cx="206" cy="50" r="2" /><circle cx="218" cy="54" r="2" /><circle cx="230" cy="52" r="2" /><circle cx="242" cy="56" r="2" />
      <circle cx="202" cy="65" r="2" /><circle cx="212" cy="64" r="2" /><circle cx="224" cy="66" r="2" /><circle cx="234" cy="68" r="2" />
      <circle cx="210" cy="76" r="2" /><circle cx="220" cy="78" r="2" /><circle cx="230" cy="80" r="2" />
      {/* Australia dots */}
      <circle cx="260" cy="120" r="2" /><circle cx="270" cy="118" r="2" /><circle cx="280" cy="122" r="2" />
      <circle cx="264" cy="130" r="2" /><circle cx="274" cy="132" r="2" />
    </svg>
  );
}

/* Concentric Radar Ripples for Chapter 1 */
function ConcentricRadarLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 260 260"
      className="pointer-events-none absolute -right-6 -top-12 h-64 w-64 text-[#6BA3DA]/45 stroke-current fill-none"
    >
      <ellipse cx="180" cy="80" rx="120" ry="85" strokeWidth="1.2" />
      <ellipse cx="180" cy="80" rx="95" ry="68" strokeWidth="1" strokeDasharray="4 4" />
      <ellipse cx="180" cy="80" rx="70" ry="50" strokeWidth="0.8" />
      <ellipse cx="180" cy="80" rx="46" ry="32" strokeWidth="0.7" strokeDasharray="3 3" />
      <ellipse cx="180" cy="80" rx="24" ry="16" strokeWidth="0.6" />
    </svg>
  );
}

const CHAPTERS = [
  {
    eyebrow: "QUALITY AT EVERY STEP",
    title: "Analytical rigour\nat the core.",
    description:
      "Continuous R&D and in-house testing — including HPLC and other advanced analytical techniques — ensure consistent quality, compliance and performance across our range.",
    img: "/aboutus/2.png",
    alt: "Analytical testing laboratory with advanced scientific instruments",
    imageSide: "left",
    decor: "radar",
  },
  {
    eyebrow: "GLOBAL PRESENCE",
    title: "International\nrelationships.",
    description:
      "Long-standing distribution and business partnerships have enabled Neelikon colourants to reach customers in more than 100 countries, strengthening our position as a reliable global supplier.",
    img: "/aboutus/3.png",
    alt: "Modern warehousing facility with high pallet racks and logistics forklift",
    imageSide: "right",
  },
  {
    eyebrow: "CUSTOMER FOCUS",
    title: "Built around\nthe customer.",
    description:
      "Manufacturing in our customer-centric packaging formats and backed by technical support for each application, we help our partners bring better, brighter products to market.",
    img: "/aboutus/4.png",
    alt: "Organized inventory and multi-tier pallet storage of colourants",
    imageSide: "left",
    decor: "pigment",
  },
  {
    eyebrow: "SUSTAINABLE OPERATIONS",
    title: "Responsible\noperations.",
    description:
      "Environmental initiatives, including efficient wastewater treatment, are part of how we manufacture responsibly for a cleaner, safer tomorrow.",
    img: "/aboutus/5.png",
    alt: "Effluent treatment plant and environmental engineering infrastructure",
    imageSide: "right",
  },
  {
    eyebrow: "PEOPLE & COMMUNITY",
    title: "Commitment\nbeyond business.",
    description:
      "We believe in creating a positive impact in the communities we are part of, through responsible practices, education and support initiatives.",
    img: "/aboutus/6.png",
    alt: "Neelikon leadership inaugurating community and CSR initiatives",
    imageSide: "left",
    decor: "pigment",
  },
];

function About() {
  return (
    <main className="bg-white">
      {/* 1. Hero Section: Full-Width Panoramic Banner matching expected design */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="relative w-full aspect-[2880/1000] min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] xl:min-h-[620px] flex items-center">
          <img
            src="/aboutus/1.png"
            alt="Neelikon campus and analytical laboratory"
            className="absolute inset-0 h-full w-full object-cover object-right md:object-center"
            loading="eager"
          />

          {/* Text Container aligned with container-x */}
          <div className="container-x relative z-10 w-full py-12 lg:py-16">
            <div className="max-w-xl lg:max-w-2xl">
              <Reveal>
                <p
                  className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#17664F]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  OUR JOURNEY. OUR PEOPLE. OUR COLOURS.
                </p>

                <h1
                  className="mt-4 text-[42px] sm:text-[54px] lg:text-[62px] font-normal leading-[1.08] tracking-tight text-[#17231F]"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Four decades of<br />
                  colour expertise.<br />
                  <span className="serif-accent text-[#17664F] italic">
                    A future of possibilities.
                  </span>
                </h1>

                <p
                  className="mt-6 max-w-xl text-[14px] sm:text-[15px] leading-relaxed text-[#66756F]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  From our Mumbai base to global markets, we manufacture high-performance colourants with scientific precision, consistent quality and a commitment to a more colourful tomorrow.
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <span className="h-[2px] w-10 bg-[#17664F]" />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[2px] text-[#66756F]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    A GLOBAL COLOUR SOLUTIONS PARTNER
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who We Are & Narrative */}
      <section className="bg-white pt-10 sm:pt-14 pb-8 text-[#17231F]">
        <div className="container-x">
          <Reveal>
            <p
              className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#17664F]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              WHO WE ARE
            </p>
          </Reveal>

          <div className="mt-3 grid gap-8 lg:grid-cols-12 lg:gap-14 items-start relative">
            <Reveal className="lg:col-span-5">
              <h2
                className="text-[36px] sm:text-[44px] lg:text-[48px] font-normal leading-[1.12] tracking-tight text-[#17231F]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                A Mumbai manufacturer<br />with a global outlook.
              </h2>
            </Reveal>

            <Reveal className="lg:col-span-7 relative" delay={0.1}>
              {/* Dotted World Map Silhouette matching expected mockup */}
              <DottedWorldMap />
              <p
                className="text-[15px] sm:text-[16px] leading-[1.75] text-[#66756F] max-w-2xl relative z-10"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Neelikon Food Dyes and Chemicals Limited was established in 1983 as a Mumbai-based manufacturing and export house. Today, we are a trusted partner to some of the world's leading brands, providing high-quality colour solutions to customers in 100+ countries through an extensive international network.
              </p>
            </Reveal>
          </div>

          {/* 3. Three Milestones (1983, Growth, Today) */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5EBE8] py-8">
            <Reveal className="pb-8 md:pb-0 md:pr-8">
              <h3
                className="text-[40px] sm:text-[46px] font-normal text-[#17231F] leading-none"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                1983
              </h3>
              <p
                className="mt-4 text-[14px] sm:text-[15px] text-[#66756F] leading-relaxed max-w-[280px]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Neelikon was established in Mumbai.
              </p>
            </Reveal>

            <Reveal className="py-8 md:py-0 md:px-8" delay={0.1}>
              <h3
                className="text-[40px] sm:text-[46px] font-normal text-[#17231F] leading-none"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Growth
              </h3>
              <p
                className="mt-4 text-[14px] sm:text-[15px] text-[#66756F] leading-relaxed max-w-[280px]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Expanded our reach through innovation, consistent quality and global collaboration.
              </p>
            </Reveal>

            <Reveal className="pt-8 md:pt-0 md:pl-8" delay={0.2}>
              <h3
                className="text-[40px] sm:text-[46px] font-normal text-[#17231F] leading-none"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Today
              </h3>
              <p
                className="mt-4 text-[14px] sm:text-[15px] text-[#66756F] leading-relaxed max-w-[280px]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Serving customers in 100+ countries through our international network.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Five Visual Story Chapters (Alternating) */}
      <section className="bg-white py-14 sm:py-20 text-[#17231F]">
        <div className="container-x space-y-28 sm:space-y-36">
          {CHAPTERS.map((c, i) => {
            const isImageLeft = c.imageSide === "left";
            return (
              <article
                key={c.eyebrow}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 relative"
              >
                {/* Image block */}
                <div
                  className={`lg:col-span-7 ${
                    isImageLeft ? "order-1" : "order-1 lg:order-2"
                  }`}
                >
                  <Reveal>
                    <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs bg-[#F5F8F6]">
                      <img
                        src={c.img}
                        alt={c.alt}
                        className="aspect-[16/10] w-full object-cover"
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  </Reveal>
                </div>

                {/* Text block */}
                <div
                  className={`lg:col-span-5 relative ${
                    isImageLeft ? "order-2" : "order-2 lg:order-1"
                  }`}
                >
                  {/* Decorative radar/swirl for Chapter 1 */}
                  {c.decor === "radar" && <ConcentricRadarLines />}

                  {/* Decorative pigment powder dispersion for Chapters 3 and 5 */}
                  {c.decor === "pigment" && (
                    <PigmentDispersion className="absolute -right-8 -top-12 h-64 w-64" />
                  )}

                  <Reveal delay={0.1}>
                    <p
                      className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#17664F]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {c.eyebrow}
                    </p>

                    <h3
                      className="mt-3 text-[36px] sm:text-[44px] lg:text-[48px] font-normal leading-[1.12] tracking-tight text-[#17231F] whitespace-pre-line"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      {c.title}
                    </h3>

                    <p
                      className="mt-5 text-[15px] sm:text-[16px] leading-[1.75] text-[#66756F]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {c.description}
                    </p>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. Call To Action Banner */}
      <section className="bg-[#EAF3EF] py-16 sm:py-20 text-[#17231F] border-t border-[#D7E2DC] relative overflow-hidden">
        {/* Subtle decorative color powder glow at bottom left and top right */}
        <PigmentDispersion className="absolute -left-12 -bottom-16 h-80 w-80 scale-125 opacity-70" />
        <PigmentDispersion className="absolute -right-16 -top-16 h-80 w-80 scale-110 opacity-40" />

        <div className="container-x relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#17664F]" />
              <p
                className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#17664F]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                PARTNER WITH NEELIKON
              </p>
            </div>

            <h2
              className="mt-3 text-[36px] sm:text-[46px] lg:text-[50px] font-normal leading-[1.1] text-[#17231F] max-w-2xl"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Let's create what's next in colour.
            </h2>
          </div>

          <a
            href="/#contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#17664F] px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#12523f] hover:scale-[1.02] active:scale-98 shadow-sm shrink-0"
          >
            <span>Discuss Your Requirement</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
