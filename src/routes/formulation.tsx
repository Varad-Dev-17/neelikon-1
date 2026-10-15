import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Beaker, Check, ChevronRight, Droplet, Sparkles } from "lucide-react";

import colourWave from "@/assets/formulation/colour-wave.jpg";
import cosmeticColours from "@/assets/formulation/cosmetic-colours.jpg";
import foodColours from "@/assets/formulation/food-colours.jpg";
import formulationStudy from "@/assets/formulation/formulation-study.jpg";
import pharmaColours from "@/assets/formulation/pharma-colours.jpg";

export const Route = createFileRoute("/formulation")({
  head: () => ({
    meta: [
      { title: "Formulation Guide & Application Lab — Neelikon Colours Global" },
      {
        name: "description",
        content:
          "Formulations crafted for real-world cosmetic success. Tested benchmark formulations featuring high-purity pigments and lakes, with technical dossiers.",
      },
      { property: "og:title", content: "Formulations — Neelikon Application Lab" },
      {
        property: "og:description",
        content:
          "Explore tested benchmark formulations across Lip Care, Eye Care, Facial Care, Body Care, and Hair Care.",
      },
    ],
  }),
  component: FormulationPage,
});

type Category = "All Formulations" | "Lip Care" | "Eye Care" | "Facial Care" | "Body Care" | "Hair Care";

interface FormulationItem {
  id: string;
  code: string;
  title: string;
  category: "Lip Care" | "Eye Care" | "Facial Care" | "Body Care" | "Hair Care";
  categoryBadge: string;
  subtitle: string;
  keyPigments: string;
  texture: string;
  image: string;
}

const FORMULATIONS: FormulationItem[] = [
  {
    id: "tinted-face-fluid",
    code: "FORM FC-01",
    category: "Facial Care",
    categoryBadge: "Face Care",
    title: "Tinted Face Fluid",
    subtitle: "Weightless skin tint featuring micronized lakes for breathable coverage.",
    keyPigments: "Lavanya Fine Micronized Talc, Yellow 5 Lake & Titanium Dioxide",
    texture: "Lightweight fluid emulsion, radiant semi-matte finish",
    image: formulationStudy,
  },
  {
    id: "body-scrub",
    code: "FORM BC-01",
    category: "Body Care",
    categoryBadge: "Body Care",
    title: "Body Scrub",
    subtitle: "Exhilarating body polish with encapsulated mineral color spheres.",
    keyPigments: "FD&C Yellow 6 Aluminium Lake, Ultramarine Blue",
    texture: "Exfoliating crystalline sugar-gel matrix",
    image: foodColours,
  },
  {
    id: "lumi-cream",
    code: "FORM FC-02",
    category: "Facial Care",
    categoryBadge: "Face Care",
    title: "Lumi Cream",
    subtitle: "Multi-dimensional strobing highlighting cream for glass-skin radiance.",
    keyPigments: "Lavanya Pearlescent Gold, Silver & Bronze Pearls",
    texture: "Luminescent whipped mousse with ultra-fine shimmer",
    image: cosmeticColours,
  },
  {
    id: "silk-matte-lipstick",
    code: "FORM LC-01",
    category: "Lip Care",
    categoryBadge: "Lip Care",
    title: "Silk-Matte Lipstick",
    subtitle: "Full-coverage non-drying velvet matte lipstick with rich pigment load.",
    keyPigments: "D&C Red 7 Calcium Lake, D&C Red 6 Barium Lake & Yellow 5 Lake",
    texture: "Cushion-glide solid matte stick",
    image: cosmeticColours,
  },
  {
    id: "hair-conditioner",
    code: "FORM HC-01",
    category: "Hair Care",
    categoryBadge: "Hair Care",
    title: "Hair Conditioner",
    subtitle: "Colour-refreshing rinse-out mask with tone-correcting pigments.",
    keyPigments: "Acid Violet 43 & Basic Blue 99 / D&C Violet 2 for brass cancellation",
    texture: "Rich conditioning creme emulsion",
    image: colourWave,
  },
  {
    id: "face-scrub",
    code: "FORM FC-03",
    category: "Facial Care",
    categoryBadge: "Face Care",
    title: "Face Scrub",
    subtitle: "Clarifying micro-exfoliant with soothing mineral pigment beads.",
    keyPigments: "Chromium Oxide Green & FD&C Yellow 5 Aluminium Lake",
    texture: "Hydrating micro-bead cream paste",
    image: pharmaColours,
  },
  {
    id: "velvet-eye-shadow",
    code: "FORM EC-01",
    category: "Eye Care",
    categoryBadge: "Eye Care",
    title: "Velvet Eye Shadow",
    subtitle: "Crease-free pressed pigment shadow with ultra-saturated color payoff.",
    keyPigments: "Ultramarine Blue, Ferric Ferrocyanide & Pearl Mica",
    texture: "Silky pressed powder with high blendability",
    image: colourWave,
  },
  {
    id: "hydrating-lip-tint",
    code: "FORM LC-02",
    category: "Lip Care",
    categoryBadge: "Lip Care",
    title: "Hydrating Lip Tint",
    subtitle: "Juicy water-oil tint delivering buildable stain and moisture.",
    keyPigments: "FD&C Red 40 & D&C Red 33 Water Soluble Dyes",
    texture: "Non-sticky glossy jelly oil",
    image: formulationStudy,
  },
];

const CATEGORIES: Category[] = [
  "All Formulations",
  "Lip Care",
  "Eye Care",
  "Facial Care",
  "Body Care",
  "Hair Care",
];

function FormulationPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All Formulations");

  const filteredItems =
    selectedCategory === "All Formulations"
      ? FORMULATIONS
      : FORMULATIONS.filter((item) => item.category === selectedCategory);

  return (
    <main className="bg-white text-[#17231F]">
      {/* 1. Top Navigation & Hero */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 border-b border-[#E5EBE8]">
        <div className="container-x">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[12px] font-medium text-[#66756F] transition-colors hover:text-[#17231F]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to home</span>
          </Link>

          <p
            className="mt-8 text-[10px] font-bold uppercase tracking-[2px] text-[#17664F]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            FORMULATION LAB & TECHNICAL GUIDE
          </p>

          <h1
            className="mt-4 text-[38px] sm:text-[50px] lg:text-[62px] font-medium leading-[1.12] tracking-tight text-[#17231F]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Formulations crafted for real-<br />world cosmetic success.
          </h1>

          <p
            className="mt-4 max-w-3xl text-[14px] sm:text-[15px] leading-relaxed text-[#66756F]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Browse tested formulations featuring high-purity Neelikon pigments and lakes, complete with downloadable technical dossiers and ingredient specifications.
          </p>
        </div>
      </section>

      {/* 2. Formulation Application Lab Section */}
      <section className="py-14 md:py-20">
        <div className="container-x">
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-[#E5EBE8] pb-8">
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[2px] text-[#17664F]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                FORMULATION & APPLICATION LAB
              </p>
              <h2
                className="mt-2 text-[28px] sm:text-[36px] font-medium leading-tight text-[#17231F]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Crafted for real-world formulation success.
              </h2>
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-[#66756F]">
              Explore tested benchmark formulations developed by our application specialists across cosmetic, personal care, and specialty segments.
            </p>
          </div>

          {/* Main Grid: Left Sidebar + Right Cards */}
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Sidebar */}
            <aside className="lg:col-span-3">
              <div className="sticky top-28 space-y-6">
                {/* Header Pill */}
                <div className="rounded-md bg-[#17664F] px-4 py-2.5 text-center text-[13px] font-semibold text-white shadow-xs">
                  Formulation Categories
                </div>

                {/* Filter List */}
                <div className="flex flex-col space-y-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex items-center justify-between rounded-md px-4 py-2.5 text-left text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-[#17664F] text-white shadow-xs font-semibold"
                            : "border border-[#D7E2DC] bg-white text-[#17231F] hover:bg-[#F8FAF9] hover:border-[#17664F]/40"
                        }`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <span>{cat}</span>
                        {isSelected && <Check className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Shade Matching Box */}
                <div className="rounded-xl border border-[#D7E2DC] bg-[#F8FAF9] p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-[#17664F]">
                    <Beaker className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Lab Support</span>
                  </div>
                  <h3
                    className="mt-3 text-[15px] font-bold text-[#17231F]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    Custom Shade Matching
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#66756F]">
                    Need a tailored hue or stability trial for your cosmetic base? Our laboratory assists global formulators directly.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-4 block w-full rounded-md border border-[#D7E2DC] bg-white px-3 py-2 text-center text-[12px] font-semibold text-[#17231F] transition-colors hover:border-[#17664F] hover:text-[#17664F]"
                  >
                    Request Formulation Support
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right Formulation Cards Grid */}
            <div className="lg:col-span-9">
              {/* Category indicator / count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[13px] text-[#66756F]">
                  Showing <strong className="text-[#17231F] font-semibold">{filteredItems.length}</strong> formulations in{" "}
                  <span className="text-[#17664F] font-medium">{selectedCategory}</span>
                </p>
                {selectedCategory !== "All Formulations" && (
                  <button
                    onClick={() => setSelectedCategory("All Formulations")}
                    className="text-[12px] font-semibold text-[#17664F] hover:underline cursor-pointer"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              {/* Animated Cards Grid */}
              <motion.div
                layout
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => (
                    <motion.article
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#D7E2DC] bg-white shadow-xs transition-shadow duration-300 hover:shadow-md"
                    >
                      <div>
                        {/* Image Container with Badges */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#F8FAF9]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Top Left Badge */}
                          <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[11px] font-semibold text-[#17231F] shadow-xs">
                            {item.categoryBadge}
                          </span>
                          {/* Top Right Code Badge */}
                          <span className="absolute top-3 right-3 rounded-md bg-[#17231F]/80 backdrop-blur-xs px-2 py-0.5 font-mono text-[10px] font-medium text-white shadow-xs">
                            {item.code}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="p-5">
                          <h3
                            className="text-[17px] font-semibold text-[#17231F] group-hover:text-[#17664F] transition-colors"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                          >
                            {item.title}
                          </h3>

                          <p className="mt-2 text-[12px] leading-relaxed text-[#66756F]">
                            {item.subtitle}
                          </p>

                          {/* Technical Highlights Box */}
                          <div className="mt-4 rounded-lg bg-[#F8FAF9] p-3 border border-[#E5EBE8] space-y-2">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-[#17664F]">
                                Key Pigments
                              </p>
                              <p className="mt-0.5 text-[11px] leading-snug text-[#17231F]">
                                {item.keyPigments}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-[#17664F]">
                                Texture
                              </p>
                              <p className="mt-0.5 text-[11px] leading-snug text-[#66756F]">
                                {item.texture}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Link */}
                      <div className="border-t border-[#E5EBE8] px-5 py-3 bg-[#FAFDFB]">
                        <Link
                          to="/contact"
                          className="flex items-center justify-between text-[11px] font-semibold text-[#17664F] group-hover:underline"
                        >
                          <span>Request Dossier & Samples</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Banner (Matching Image 1) */}
      <section className="border-t border-[#D7E2DC] bg-[#DFF0E5] py-16 md:py-20 text-[#17231F]">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[2px] text-[#17664F]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              LET'S CREATE SOMETHING EXTRAORDINARY
            </p>
            <h2
              className="mt-3 text-[32px] sm:text-[40px] font-medium leading-tight text-[#17231F]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Your next idea.<br />
              Our world of colour.
            </h2>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#17231F] px-7 py-3 text-[12px] font-semibold text-white transition-all hover:bg-black active:scale-98 shadow-sm"
          >
            <span>Talk to our team</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
