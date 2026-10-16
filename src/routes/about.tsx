import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ABOUT_IMG, INFRA } from "@/lib/content";

const [LAB, PLANT, , WARE, ETP] = INFRA.map((g) => g.imgs);
import { MaskImage, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Neelikon — Four Decades of Colour Expertise" },
      { name: "description", content: "Since 1983, Neelikon has manufactured food, pharmaceutical, cosmetic and specialty colourants in Mumbai for customers worldwide." },
      { property: "og:title", content: "About Neelikon — Four Decades of Colour Expertise" },
      { property: "og:description", content: "The story of Neelikon: R&D, manufacturing, distribution, and environmental and CSR initiatives." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const CHAPTERS = [
  { k: "Research & testing", t: "Analytical rigour at the core.", d: "Continuous R&D and in-house testing — including HPLC, ion chromatography, gas chromatography and ICP-OES — support quality improvement across our ranges.", img: LAB![6]! },
  { k: "Distribution network", t: "International relationships.", d: "Long-standing distribution and business partnerships take Neelikon colourants to customers across 100+ countries.", img: WARE![0]! },
  { k: "Manufacturing & packaging", t: "Built around the customer.", d: "Manufacturing and customer-centric packaging, backed by technical support for each application.", img: WARE![3]! },
  { k: "Environment", t: "Responsible operations.", d: "Environmental initiatives, including effluent treatment, are part of how we manufacture.", img: ETP![0]! },
  { k: "CSR", t: "Commitment beyond business.", d: "Corporate social responsibility initiatives in the communities we are part of.", img: ABOUT_IMG.csr },
];

function About() {
  return (
    <main>
      <section className="bg-white pb-20 pt-16 md:pt-20 text-[#17231F] border-b border-[#D7E2DC]">
        <div className="container-x">
          <Reveal>
            <div className="mb-3 h-[2px] w-8 bg-[#17664F]" />
            <p className="eyebrow text-[#17664F] font-semibold tracking-[2px]">
              About Neelikon · Est. 1983 · Mumbai
            </p>
            <h1
              className="mt-4 max-w-6xl text-[38px] sm:text-[50px] lg:text-[62px] font-normal leading-[1.08] tracking-tight text-[#17231F]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Four decades of colour expertise.{" "}
              <span className="serif-accent text-[#17664F] italic">
                A future of possibilities.
              </span>
            </h1>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-12">
            <div className="md:col-span-8 overflow-hidden rounded-2xl border border-[#D7E2DC] shadow-xs">
              <MaskImage
                eager
                src={PLANT![0]!}
                alt="Neelikon manufacturing plant"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <div className="md:col-span-4 overflow-hidden rounded-2xl border border-[#D7E2DC] shadow-xs">
              <MaskImage
                eager
                src={LAB![2]!}
                alt="Neelikon quality-control laboratory"
                className="aspect-[16/10] md:aspect-auto h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-white text-[#17231F]">
        <div className="container-x grid gap-12 md:grid-cols-12 items-center">
          <Reveal className="md:col-span-5">
            <h2
              className="text-[32px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.12] tracking-tight text-[#17231F]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              A Mumbai manufacturer with a global outlook.
            </h2>
          </Reveal>
          <Reveal className="space-y-5 text-base sm:text-lg text-[#66756F] md:col-span-6 md:col-start-7 leading-relaxed" delay={0.1}>
            <p>
              Neelikon Food Dyes and Chemicals Limited was established in 1983 as a Mumbai-based manufacturing and export business.
            </p>
            <p>
              Today its expertise spans food, pharmaceutical, cosmetic, personal-care and specialty industrial colourants — guided by a leadership focus on continuous R&D, quality improvement and long-term customer relationships.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F8FAF9] section-y border-y border-[#D7E2DC] text-[#17231F]">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-[#17664F] font-semibold tracking-wider">Timeline</p>
          </Reveal>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["1983", "Neelikon is established in Mumbai."],
              ["Growth", "Expansion across food, pharmaceutical, cosmetic and industrial colourants."],
              ["Today", "Serving customers in 100+ countries through an international network."],
            ].map(([y, d]) => (
              <li key={y} className="bg-white rounded-xl border border-[#D7E2DC] p-8 md:p-10 shadow-2xs">
                <p
                  className="text-3xl sm:text-4xl font-serif text-[#17664F]"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  {y}
                </p>
                <p className="mt-4 text-base text-[#66756F] leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-white text-[#17231F]">
        <div className="container-x space-y-24 md:space-y-32">
          {CHAPTERS.map((c, i) => (
            <article key={c.k} className={`grid items-center gap-10 md:grid-cols-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="md:col-span-7 overflow-hidden rounded-2xl border border-[#D7E2DC] shadow-sm">
                <MaskImage src={c.img} alt={c.k} className="aspect-[4/3] w-full object-cover" />
              </div>
              <Reveal className={i % 2 ? "md:col-span-4 md:col-start-2" : "md:col-span-4 md:col-start-9"}>
                <p className="eyebrow text-[#17664F] font-semibold tracking-wider">{String(i + 1).padStart(2, "0")} · {c.k}</p>
                <h3
                  className="mt-3 text-[28px] sm:text-[34px] font-normal leading-snug text-[#17231F]"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  {c.t}
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#66756F]">{c.d}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#DFF0E5] section-y text-[#17231F]">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2
            className="text-[32px] sm:text-[44px] font-normal leading-[1.12] text-[#17231F] max-w-3xl"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Let's create what's next in colour.
          </h2>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#17664F] px-7 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#12523f] active:scale-98 shadow-sm"
          >
            <span>Discuss Your Requirements</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
