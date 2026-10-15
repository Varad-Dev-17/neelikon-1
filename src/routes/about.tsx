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
      <section className="bg-ink pb-20 pt-16 md:pt-20 text-paper">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-sky">About Neelikon · Est. 1983 · Mumbai</p>
            <h1 className="display mt-6 max-w-6xl fs-section">Four decades of colour expertise. <span className="serif-accent text-flame">A future of possibilities.</span></h1>
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-12">
            <MaskImage eager src={PLANT![0]!} alt="Neelikon manufacturing plant" className="aspect-[16/10] md:col-span-8" />
            <MaskImage eager src={LAB![2]!} alt="Neelikon quality-control laboratory" className="aspect-[16/10] md:aspect-auto md:col-span-4" />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5"><h2 className="display fs-section">A Mumbai manufacturer with a global outlook.</h2></Reveal>
          <Reveal className="space-y-5 text-lg text-muted-foreground md:col-span-6 md:col-start-7" delay={0.1}>
            <p>Neelikon Food Dyes and Chemicals Limited was established in 1983 as a Mumbai-based manufacturing and export business.</p>
            <p>Today its expertise spans food, pharmaceutical, cosmetic, personal-care and specialty industrial colourants — guided by a leadership focus on continuous R&D, quality improvement and long-term customer relationships.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-card section-y">
        <div className="container-x">
          <Reveal><p className="eyebrow text-navy">Timeline</p></Reveal>
          <ol className="mt-10 grid gap-px bg-border md:grid-cols-3">
            {[["1983", "Neelikon is established in Mumbai."], ["Growth", "Expansion across food, pharmaceutical, cosmetic and industrial colourants."], ["Today", "Serving customers in 100+ countries through an international network."]].map(([y, d]) => (
              <li key={y} className="bg-card p-8 md:p-10">
                <p className="fs-stat text-navy">{y}</p>
                <p className="mt-4 text-lg">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x space-y-24 md:space-y-32">
          {CHAPTERS.map((c, i) => (
            <article key={c.k} className={`grid items-center gap-10 md:grid-cols-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <MaskImage src={c.img} alt={c.k} className="aspect-[4/3] md:col-span-7" />
              <Reveal className={i % 2 ? "md:col-span-4 md:col-start-2" : "md:col-span-4 md:col-start-9"}>
                <p className="eyebrow text-navy">{String(i + 1).padStart(2, "0")} · {c.k}</p>
                <h3 className="display fs-sub mt-4">{c.t}</h3>
                <p className="mt-5 text-lg text-muted-foreground">{c.d}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#DFF0E5] section-y text-[#17231F]">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="display max-w-3xl fs-section text-[#17231F]">Let's create what's next in colour.</h2>
          <a href="/#contact" className="inline-flex items-center gap-2 rounded-full bg-primary btn text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-[#12523f]">Discuss Your Requirements <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </main>
  );
}
