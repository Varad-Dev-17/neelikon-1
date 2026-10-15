import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Beaker, CheckCircle2, Cpu, Eye, Microscope, ShieldCheck, Sparkles } from "lucide-react";
import lab from "@/assets/lab.png";
import { INFRA } from "@/lib/content";
import { MaskImage, Reveal, SafeImg } from "@/components/site/Reveal";

export const Route = createFileRoute("/innovation")({
  head: () => ({
    meta: [
      { title: "Innovation & Science — R&D and Analytical Chemistry | Neelikon" },
      {
        name: "description",
        content: "Explore Neelikon's in-house R&D capabilities, advanced analytical instrumentation (HPLC, GC, ICP-OES), and custom colour formulation science.",
      },
      { property: "og:title", content: "Innovation & Science — Neelikon Colours Global" },
      {
        property: "og:description",
        content: "Analytical precision meets pigment chemistry: HPLC, Ion Chromatography, ICP-OES heavy metals analysis, and customized shade engineering.",
      },
    ],
  }),
  component: InnovationPage,
});

const INSTRUMENTS = [
  {
    icon: Microscope,
    name: "HPLC — High-Performance Liquid Chromatography",
    code: "ANALYTICAL / 01",
    purpose: "Organic impurity profiling & isomer separation",
    details:
      "Enables ultra-sensitive separation and quantification of subsidiary colours, intermediate synthesis markers, and trace organic impurities down to parts-per-million levels.",
  },
  {
    icon: Cpu,
    name: "ICP-OES Optical Emission Spectroscopy",
    code: "ANALYTICAL / 02",
    purpose: "Sub-ppm heavy metals detection",
    details:
      "Inductively Coupled Plasma analysis accurately detects and quantifies heavy metals including Lead (Pb), Arsenic (As), Cadmium (Cd), and Mercury (Hg) far below global statutory limits.",
  },
  {
    icon: Beaker,
    name: "Ion Chromatography (IC)",
    code: "ANALYTICAL / 03",
    purpose: "Anion & cation determination",
    details:
      "Precision measurement of water-soluble chlorides, sulfates, carbonates, and ionic salts critical for pharmaceutical-grade excipients and low-conductivity industrial applications.",
  },
  {
    icon: Sparkles,
    name: "Gas Chromatography (GC & Headspace)",
    code: "ANALYTICAL / 04",
    purpose: "Residual solvent detection",
    details:
      "Screening for volatile organic compounds (VOCs) and residual processing solvents to comply strictly with USP <467> and EP 5.4 guidelines.",
  },
  {
    icon: Eye,
    name: "Spectrophotometric Colorimetry (UV-Vis & CIE Lab)",
    code: "ANALYTICAL / 05",
    purpose: "Spectral absorption & Delta-E shade matching",
    details:
      "Dual-beam spectrophotometers and sphere-geometry colorimeters provide objective, computer-controlled Delta-E color consistency across production batches.",
  },
  {
    icon: ShieldCheck,
    name: "Particle Size & Laser Diffraction",
    code: "ANALYTICAL / 06",
    purpose: "Micronization & lake soft-texture control",
    details:
      "Ensures narrow particle-size distribution for aluminum lakes and cosmetic pigments, guaranteeing smooth dispersion without grittiness in lip care and coatings.",
  },
];

const RND_INITIATIVES = [
  {
    title: "Alternatives for FD&C Red No. 3",
    description:
      "With the US FDA revoking FD&C Red 3 for food and ingested drugs, Neelikon offers customized natural and synthetic alternatives that match hue, clarity, and bake stability.",
  },
  {
    title: "Titanium Dioxide-Free White Pigments",
    description:
      "Proprietary formulations engineered without TiO2 to provide opacity and clean white tones in response to EU food additive regulations.",
  },
  {
    title: "Microbial & Heavy Metal Purity Limits",
    description:
      "Setting self-imposed purity benchmarks that exceed standard pharmacopeias, enabling customers to use a single product grade worldwide.",
  },
  {
    title: "Tailor-Made Natural Colour Blends",
    description:
      "Blending botanical extracts with clean-label carrier systems to maximize color longevity under thermal processing and light exposure.",
  },
];

function InnovationPage() {
  const labPhotos = INFRA[0]!.imgs;

  return (
    <main className="bg-white text-[#17231F]">
      {/* Hero Section */}
      <section className="border-b border-[#D7E2DC] bg-[#17231F] py-20 md:py-28 text-white">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-[#2A9D79]">Science & Innovation</p>
                <h1
                  className="mt-4 text-[42px] sm:text-[54px] lg:text-[66px] font-medium leading-[1.1] tracking-tight text-white"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Beautiful colour. <br />
                  <span className="text-[#2A9D79]">Serious science.</span>
                </h1>
                <p
                  className="mt-6 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-white/75"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Behind every batch of Neelikon colourants lies analytical chemistry, continuous synthesis R&D, and certified laboratory validation to ensure uncompromising safety and purity.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#17664F] px-7 py-3 text-[13px] font-semibold text-white transition-all hover:bg-[#2A9D79] active:scale-98"
                  >
                    <span>Request Technical Dossier</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href="#instruments"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
                  >
                    View Analytical Equipment
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <img
                  src={lab}
                  alt="Neelikon HPLC and analytical laboratory testing"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytical Instrumentation */}
      <section id="instruments" className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-primary">In-House Quality Control & R&D</p>
                <h2
                  className="mt-3 text-[34px] sm:text-[44px] font-medium text-[#17231F]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Analytical Instrumentation
                </h2>
              </div>
              <p className="max-w-md text-sm text-[#66756F]">
                Our Mumbai and Raigad laboratories feature computerized testing suites verifying molecular purity before any batch is released.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INSTRUMENTS.map((inst, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-[#D7E2DC] bg-[#F8FAF9] p-7 transition-all hover:-translate-y-1 hover:border-[#17664F]/50 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#17664F]">{inst.code}</span>
                    <inst.icon className="h-5 w-5 text-[#17664F]" />
                  </div>
                  <h3
                    className="mt-4 text-[17px] font-semibold text-[#17231F]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {inst.name}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-[#17664F]">
                    {inst.purpose}
                  </p>
                  <p className="mt-4 text-[13px] leading-relaxed text-[#66756F]">
                    {inst.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Innovation Priorities */}
      <section className="border-y border-[#D7E2DC] bg-[#F8FAF9] py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-primary">Forward-Looking Science</p>
            <h2
              className="mt-3 text-[34px] sm:text-[44px] font-medium text-[#17231F]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Current R&D Initiatives
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] text-[#66756F]">
              Anticipating regulatory updates and clean-label consumer trends through scientific formulation and synthesis breakthroughs.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RND_INITIATIVES.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-[#D7E2DC] bg-white p-6 shadow-xs">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#DFF0E5] text-xs font-bold text-[#17664F]">
                  0{idx + 1}
                </span>
                <h3 className="mt-4 text-[16px] font-semibold text-[#17231F]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#66756F]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laboratory Photo Showcase */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-primary">Inside the Facility</p>
                <h2
                  className="mt-3 text-[34px] sm:text-[44px] font-medium text-[#17231F]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Our Laboratories in Action
                </h2>
              </div>
              <Link to="/infrastructure" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#17664F] hover:underline">
                <span>View Full Infrastructure Tour</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {labPhotos.slice(0, 4).map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-[#D7E2DC] bg-[#F8FAF9] shadow-xs">
                <SafeImg
                  src={src}
                  alt={`Neelikon laboratory facility ${i + 1}`}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#D7E2DC] bg-[#DFF0E5] py-16 text-[#17231F]">
        <div className="container-x flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <h3 className="text-[26px] md:text-[32px] font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Need technical documentation or testing data?
            </h3>
            <p className="mt-2 text-sm text-[#66756F]">
              We provide comprehensive TDS, SDS, Certificate of Analysis (CoA), and regulatory compliance dossiers for every product.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#17664F] px-7 py-3 text-[13px] font-semibold text-white transition-all hover:bg-[#12523f] active:scale-98 shadow-sm"
          >
            <span>Request Documentation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
