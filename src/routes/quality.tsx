import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Award, CheckCircle2, FileText, Globe2, ShieldCheck } from "lucide-react";
import { CERT_LABELS, CERT_LOGOS } from "@/lib/content";
import { Reveal, SafeImg } from "@/components/site/Reveal";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality Credentials & Certifications — Neelikon Colours Global" },
      {
        name: "description",
        content: "Discover Neelikon's quality credentials: ISO 9001, FSSC 22000, GMP, US FDA compliance, Kosher, Halal, and NABL accredited testing.",
      },
      { property: "og:title", content: "Quality Credentials & Certifications — Neelikon" },
      {
        property: "og:description",
        content: "International certifications, quality management systems, and regulatory assurance for food, pharmaceutical, and cosmetic colourants.",
      },
    ],
  }),
  component: QualityPage,
});

const QUALITY_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Raw Material Integrity",
    desc: "Rigorous vendor audits and FTIR/chromatographic screening of raw inputs ensure zero contamination prior to synthesis.",
  },
  {
    icon: Award,
    title: "Batch-to-Batch Uniformity",
    desc: "Automated process controls and standardized drying parameters guarantee reproducible shade intensity and particle consistency.",
  },
  {
    icon: Globe2,
    title: "Global Regulatory Harmony",
    desc: "Designed to meet the most stringent overlap of US FDA, EU regulations, JECFA, and Asian pharmacopeias simultaneously.",
  },
  {
    icon: FileText,
    title: "End-to-End Traceability",
    desc: "Complete serialization from raw material batch to finished container, with 5-year retained sample archiving.",
  },
];

const CERT_DETAILS = [
  { name: "ISO 9001:2015", scope: "Quality Management System across research, development, synthesis, and distribution." },
  { name: "ISO 14001:2015", scope: "Environmental Management System with zero-discharge wastewater treatment and emissions control." },
  { name: "ISO 45001:2018", scope: "Occupational Health and Safety Management System protecting site teams and visitors." },
  { name: "FSSC 22000 / HACCP", scope: "Food Safety System Certification ensuring food-grade sanitary control and allergen safety." },
  { name: "Good Manufacturing Practice (GMP)", scope: "Strict hygienic manufacturing protocols adhering to pharmaceutical excipient standards." },
  { name: "US-FDA In-Plant Inspections", scope: "Successfully inspected and audited for food colours and cosmetic colour additives." },
  { name: "Halal & Kosher Certified", scope: "Independently verified compliance with religious dietary and processing laws." },
  { name: "Sedex & EcoVadis", scope: "Ethical supply chain, sustainability, labor standards, and corporate social responsibility audits." },
];

function QualityPage() {
  return (
    <main className="bg-white text-[#17231F]">
      {/* Hero Header */}
      <section className="border-b border-[#D7E2DC] bg-[#F8FAF9] py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-primary">Quality & Standards</p>
            <h1
              className="mt-4 text-[40px] sm:text-[52px] lg:text-[64px] font-medium leading-[1.12] tracking-tight text-[#17231F]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Quality has a standard.
            </h1>
            <p
              className="mt-6 max-w-3xl text-[15px] sm:text-[17px] leading-relaxed text-[#66756F]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              At Neelikon, quality is an engineered discipline. Our colourants are manufactured in GMP-certified facilities and tested in NABL-accredited analytical laboratories to meet international standards across 100+ countries.
            </p>
          </Reveal>

          {/* Quick badge pills */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            {CERT_LABELS.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D7E2DC] bg-white px-4 py-2 text-xs font-semibold text-[#17231F] shadow-2xs"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-[#17664F]" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Management Pillars */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-primary">Core Principles</p>
            <h2
              className="mt-3 text-[32px] sm:text-[42px] font-medium text-[#17231F]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              The Pillars of Neelikon Quality
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUALITY_PILLARS.map((pillar, idx) => (
              <div key={idx} className="rounded-xl border border-[#D7E2DC] bg-[#F8FAF9] p-6 shadow-xs transition-shadow hover:shadow-md">
                <pillar.icon className="h-6 w-6 text-[#17664F]" />
                <h3 className="mt-4 text-[17px] font-semibold text-[#17231F]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#66756F]">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Logos & Detailed Scopes */}
      <section className="border-y border-[#D7E2DC] bg-[#F8FAF9] py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-primary">Accreditations</p>
                <h2
                  className="mt-3 text-[32px] sm:text-[42px] font-medium text-[#17231F]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Certifications & Registrations
                </h2>
              </div>
              <p className="max-w-md text-sm text-[#66756F]">
                Audited regularly by independent registrars and regulatory authorities worldwide.
              </p>
            </div>
          </Reveal>

          {/* Logo badges */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {CERT_LOGOS.map((logo, i) => (
              <div
                key={i}
                className="flex h-24 items-center justify-center rounded-xl border border-[#D7E2DC] bg-white p-4 shadow-2xs transition-transform hover:scale-102"
              >
                <SafeImg
                  src={logo}
                  alt={`Neelikon certification logo ${i + 1}`}
                  className="max-h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* Detailed Certification Breakdown */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERT_DETAILS.map((cert, idx) => (
              <div key={idx} className="rounded-xl border border-[#D7E2DC] bg-white p-5 shadow-2xs">
                <h4 className="text-[14px] font-bold text-[#17231F]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {cert.name}
                </h4>
                <p className="mt-2 text-[12px] leading-relaxed text-[#66756F]">
                  {cert.scope}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Policy & Testing Assurance */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow text-primary">Policy Statement</p>
                <h2
                  className="mt-3 text-[32px] sm:text-[42px] font-medium text-[#17231F]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Our Quality Commitment
                </h2>
                <div className="mt-6 space-y-4 text-[14px] leading-relaxed text-[#66756F]">
                  <p>
                    Neelikon is committed to supplying colours, dyes, and pigments of consistent quality that strictly conform to mutually agreed specifications, statutory regulations, and food & drug safety laws.
                  </p>
                  <p>
                    We continually improve the effectiveness of our Quality Management System through technology upgradation, training of personnel, and active feedback from international customers.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#17664F] px-6 py-2.5 text-[12px] font-semibold text-white transition-all hover:bg-[#12523f] active:scale-98"
                  >
                    <span>Request Audit Pack / Certificates</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    to="/innovation"
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#17664F] hover:underline"
                  >
                    <span>Explore Analytical Lab Testing</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-[#D7E2DC] bg-[#F8FAF9] p-8 shadow-sm">
                <h3 className="text-[18px] font-semibold text-[#17231F]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Standard Certificate of Analysis (CoA) Inclusions
                </h3>
                <ul className="mt-6 space-y-3 text-[13px] text-[#66756F]">
                  {[
                    "Total dye content / pure dye assay determination",
                    "Volatile matter & moisture content at 135°C",
                    "Water-insoluble matter percentage",
                    "Combined ether extracts & subsidiary colours",
                    "Unsulfonated primary aromatic amines test",
                    "Heavy metals analysis: Lead (Pb), Arsenic (As), Cadmium (Cd), Mercury (Hg)",
                    "Microbiological assay: Total viable count, yeast & mould, E. coli, Salmonella",
                  ].map((test, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#17664F] mt-0.5" />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#D7E2DC] bg-[#DFF0E5] py-16 text-[#17231F]">
        <div className="container-x flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <h3 className="text-[26px] md:text-[32px] font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Require quality questionnaires or site audit details?
            </h3>
            <p className="mt-2 text-sm text-[#66756F]">
              Our QA/QC team will gladly assist with vendor qualification documentation and regulatory filings.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#17664F] px-7 py-3 text-[13px] font-semibold text-white transition-all hover:bg-[#12523f] active:scale-98 shadow-sm"
          >
            <span>Contact QA Department</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
