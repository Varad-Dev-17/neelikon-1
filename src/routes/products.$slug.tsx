import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronRight, FileText, FlaskConical, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CONTACT, PRODUCTS } from "@/lib/content";
import { CATALOG } from "@/lib/catalog";
import { EASE, Reveal, SafeImg } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — Neelikon` : "Product not found — Neelikon";
    const desc = p ? (p.intro ?? p.blurb) : "This Neelikon product page could not be found.";
    return {
      meta: [
        { title }, { name: "description", content: desc.slice(0, 160) },
        { property: "og:title", content: title }, { property: "og:description", content: desc.slice(0, 160) },
        { property: "og:type", content: "product.group" }, { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [{ property: "og:image", content: p.img }, { name: "twitter:image", content: p.img }] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <main className="container-x py-48 text-center">
      <h1 className="display text-5xl">Product family not found.</h1>
      <Link to="/products" className="mt-8 inline-flex rounded-full bg-navy btn text-paper">View all products</Link>
    </main>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const tabs = CATALOG[p.slug] ?? [];
  const [tab, setTab] = useState(0);
  const [q, setQ] = useState("");
  const [grp, setGrp] = useState("All");
  const [req, setReq] = useState<{ product: string; intent: "sample" | "documents" | "enquiry" }>({ product: p.name, intent: "enquiry" });
  const current = tabs[tab];
  const total = tabs.reduce((n, t) => n + t.groups.reduce((m, g) => m + g.items.length, 0), 0);

  const groups = useMemo(() => {
    if (!current) return [];
    const s = q.trim().toLowerCase();
    return current.groups
      .filter((g) => grp === "All" || g.title === grp)
      .map((g) => ({ ...g, items: g.items.filter((i) => !s || i.name.toLowerCase().includes(s) || (i.ci ?? "").toLowerCase().includes(s)) }))
      .filter((g) => g.items.length);
  }, [current, q, grp]);

  const ask = (product: string, intent: "sample" | "documents" | "enquiry") => {
    setReq({ product, intent });
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.getElementById("f-name")?.focus({ preventScroll: true }), 600);
  };

  const others = PRODUCTS.filter((x) => x.group === p.group && x.slug !== p.slug).slice(0, 3);

  return (
    <main>
      <section className="bg-card pb-20 pt-12 md:pt-16">
        <div className="container-x">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              <li><Link to="/products" className="hover:text-foreground">Products</Link></li>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              <li aria-current="page" className="font-semibold text-foreground">{p.name}</li>
            </ol>
          </nav>
          <div className="mt-10 grid gap-12 md:grid-cols-12 md:items-center">
            <Reveal className="md:col-span-6">
              <p className="eyebrow text-navy">{p.group} · Product family</p>
              <h1 className="display mt-4 fs-section">{p.name}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.intro ?? p.blurb}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => ask(p.name, "sample")} className="inline-flex items-center gap-2 rounded-full bg-primary btn text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-[#12523f] active:scale-95"><FlaskConical className="h-4 w-4" /> Request a Sample</button>
                <button onClick={() => ask(p.name, "enquiry")} className="rounded-full border border-foreground/20 btn transition-colors hover:bg-background">Enquire About This Range</button>
              </div>
            </Reveal>
            <div className="aspect-[4/3] overflow-hidden bg-background md:col-span-6">
              <SafeImg src={p.img} alt={p.name} eager className="h-[135%] w-full object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="range" className="bg-background section-y">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-navy">Product range</p>
              <h2 id="range" className="display mt-3 fs-sub">{total ? `${total} listed grades` : "Range details on request"}</h2>
            </div>
            {total > 0 && (
              <label className="relative block w-full md:w-80">
                <span className="sr-only">Search by product name or Colour Index number</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or CI number" className="w-full border bg-card py-3 pl-11 pr-4 text-base focus:border-sky focus:outline-none" />
              </label>
            )}
          </div>

          {total === 0 ? (
            <div className="mt-12 grid gap-8 border-l-4 border-sky bg-card p-8 md:grid-cols-12 md:p-12">
              <p className="text-lg md:col-span-8">A detailed product list for this family isn't published yet. Tell us your application and our team will share grades, specifications and documentation.</p>
              <div className="md:col-span-4 md:text-right"><button onClick={() => ask(p.name, "enquiry")} className="inline-flex items-center gap-2 rounded-full bg-primary btn text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-[#12523f]">Ask Our Team <ArrowRight className="h-4 w-4" /></button></div>
            </div>
          ) : (
            <>
              {tabs.length > 1 && (
                <div role="tablist" aria-label="Application" className="mt-10 flex gap-1 overflow-x-auto border-b">
                  {tabs.map((t, i) => (
                    <button key={t.tab} role="tab" aria-selected={tab === i} onClick={() => { setTab(i); setGrp("All"); }} className={`relative shrink-0 px-5 py-3 text-sm font-bold transition-colors ${tab === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {t.tab}
                      {tab === i && <motion.span layoutId="tab-line" className="spectrum-bar absolute inset-x-0 -bottom-px h-0.5" transition={{ duration: 0.35, ease: EASE }} />}
                    </button>
                  ))}
                </div>
              )}
              {current && current.groups.length > 1 && (
                <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter by product group">
                  {["All", ...current.groups.map((g) => g.title)].map((g) => (
                    <button key={g} aria-pressed={grp === g} onClick={() => setGrp(g)} className={`border px-3.5 py-1.5 text-sm font-semibold transition-colors ${grp === g ? "border-ink bg-ink text-paper" : "hover:border-foreground/40"}`}>{g}</button>
                  ))}
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.div key={`${tab}-${grp}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="mt-10 space-y-14">
                  {groups.length === 0 && <p className="text-muted-foreground">No products match “{q}”.</p>}
                  {groups.map((g) => (
                    <div key={g.title}>
                      <h3 className="flex items-baseline gap-3 text-xl font-extrabold">{g.title}<span className="text-sm font-semibold text-muted-foreground">{g.items.length}</span></h3>
                      <table className="mt-4 w-full border-collapse text-left">
                        <thead className="hidden text-xs uppercase tracking-widest text-muted-foreground md:table-header-group">
                          <tr className="border-b"><th className="py-3 pr-4 font-bold">Common name</th><th className="py-3 pr-4 font-bold">Colour Index No.</th><th className="py-3 pr-4 font-bold">TDS / MSDS</th><th className="py-3 font-bold"><span className="sr-only">Sample</span></th></tr>
                        </thead>
                        <tbody>
                          {g.items.map((it, i) => (
                            <tr key={`${it.name}-${i}`} className="grid grid-cols-2 gap-x-4 gap-y-2 border-b py-4 transition-colors hover:bg-card md:table-row md:py-0">
                              <td className="col-span-2 font-semibold md:py-4 md:pr-4">{it.name}</td>
                              <td className="font-mono text-sm text-muted-foreground md:py-4 md:pr-4"><span className="mr-1 md:hidden">CI</span>{it.ci ?? "—"}</td>
                              <td className="text-right md:py-4 md:pr-4 md:text-left">
                                <button onClick={() => ask(it.name, "documents")} className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline"><FileText className="h-4 w-4" aria-hidden />Request documents</button>
                              </td>
                              <td className="col-span-2 md:py-4 md:text-right">
                                <button onClick={() => ask(it.name, "sample")} className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-sm font-bold transition-colors hover:border-navy hover:text-navy" aria-label={`Request a sample of ${it.name}`}>Request sample</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
              <p className="mt-10 max-w-2xl text-sm text-muted-foreground">Names and Colour Index numbers as published on <a href={p.source} target="_blank" rel="noreferrer" className="underline">neelikon.com</a>{p.slug === "pearlescent" ? " (CI numbers available on request)" : ""}. Technical data sheets and safety data sheets are shared by our team on request.</p>
            </>
          )}
        </div>
      </section>

      <section id="enquire" className="scroll-mt-16 bg-[#DFF0E5] section-y text-[#17231F]">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-primary">{req.intent === "sample" ? "Sample request" : req.intent === "documents" ? "Documentation request" : "Product enquiry"}</p>
            <h2 className="display mt-4 fs-section text-[#17231F]">Let's create something <span className="serif-accent text-primary">exceptional.</span></h2>
            <p className="mt-6 text-lg text-[#66756F]">Selected: <strong className="text-[#17231F]">{req.product}</strong></p>
            <p className="mt-4 text-[#66756F]">Or reach us directly at <a href={`mailto:${CONTACT.email}`} className="text-[#17231F] underline">{CONTACT.email}</a> · <a href={CONTACT.phoneHref} className="text-[#17231F] underline">{CONTACT.phone}</a></p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7"><EnquiryForm product={req.product} intent={req.intent} /></div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-background section-y">
          <div className="container-x">
            <h2 className="display fs-sub">Related product families</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link to="/products/$slug" params={{ slug: o.slug }} className="group block">
                    <div className="aspect-[4/3] overflow-hidden bg-card"><SafeImg src={o.img} alt={o.name} className="h-[135%] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" /></div>
                    <p className="mt-4 flex items-center justify-between font-bold">{o.name}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
