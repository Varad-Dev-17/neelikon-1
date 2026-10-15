import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { CONTACT, PRODUCTS } from "@/lib/content";

/** Submission adapter: set to a form endpoint (POST JSON) to deliver enquiries directly. Empty = opens the visitor's email app. */
export const ENQUIRY_ENDPOINT = "";

type F = { name: string; company: string; email: string; country: string; phone: string; product: string; application: string; message: string };
const EMPTY: F = { name: "", company: "", email: "", country: "", phone: "", product: "", application: "", message: "" };

function validate(v: F) {
  const e: Partial<Record<keyof F, string>> = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (v.company.trim().length < 2) e.company = "Please enter your company name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid business email.";
  if (v.country.trim().length < 2) e.country = "Please enter your country.";
  if (!/^[+()\d\s-]{7,20}$/.test(v.phone.trim())) e.phone = "Please enter a valid contact number.";
  if (v.product.trim().length < 2) e.product = "Please choose or type a product or product family.";
  if (v.message.trim().length < 10) e.message = "Please tell us a little more (10+ characters).";
  return e;
}

export function EnquiryForm({ product, intent }: { product?: string; intent?: "sample" | "documents" | "enquiry" }) {
  const [v, setV] = useState<F>(EMPTY);
  const [err, setErr] = useState<Partial<Record<keyof F, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mail" | "error">("idle");
  const busy = useRef(false);

  useEffect(() => {
    const p = product ?? new URLSearchParams(window.location.search).get("product") ?? "";
    if (!p) return;
    const msg = intent === "sample" ? `I would like to request a sample of ${p}.` : intent === "documents" ? `Please share the TDS / MSDS for ${p}.` : "";
    setV((s) => ({ ...s, product: p, message: msg || s.message }));
    setState("idle");
  }, [product, intent]);

  const set = (k: keyof F) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (busy.current) return;
    const er = validate(v);
    setErr(er);
    if (Object.keys(er).length) {
      document.getElementById(`f-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    busy.current = true;
    setState("sending");
    if (ENQUIRY_ENDPOINT) {
      try {
        const r = await fetch(ENQUIRY_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
        if (!r.ok) throw new Error();
        setState("sent");
      } catch {
        setState("error");
      }
      busy.current = false;
      return;
    }
    const body = `Name: ${v.name}\nCompany: ${v.company}\nEmail: ${v.email}\nCountry: ${v.country}\nPhone: ${v.phone}\nProduct: ${v.product}\nApplication: ${v.application}\n\n${v.message}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Enquiry: ${v.product} — ${v.company}`)}&body=${encodeURIComponent(body)}`;
    setState("mail");
    busy.current = false;
  }

  if (state === "sent" || state === "mail")
    return (
      <div role="status" className="flex flex-col items-start gap-4 border border-paper/20 p-10">
        <CheckCircle2 className="h-10 w-10 text-flame" />
        <p className="text-2xl font-bold">{state === "sent" ? "Thank you — your enquiry has been received." : "Your email app should now be open with your enquiry ready."}</p>
        <p className="text-paper/70">{state === "mail" ? <>Your enquiry is only delivered once you press send in your email app. If it didn't open, write to <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call <a className="underline" href={CONTACT.phoneHref}>{CONTACT.phone}</a>.</> : "Our team will be in touch."}</p>
        <button onClick={() => { setV(EMPTY); setState("idle"); }} className="mt-2 text-sm font-bold underline">Start a new enquiry</button>
      </div>
    );

  const field = "w-full border-b border-paper/30 bg-transparent py-3 text-base text-paper placeholder:text-paper/40 focus:border-flame focus:outline-none";
  const input = (k: keyof F, label: string, type = "text", auto?: string, list?: string) => (
    <div>
      <label htmlFor={`f-${k}`} className="eyebrow text-paper/70">{label}</label>
      <input id={`f-${k}`} type={type} list={list} autoComplete={auto} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `e-${k}` : undefined} className={field} />
      {err[k] && <p id={`e-${k}`} className="mt-1 text-sm text-flame">{err[k]}</p>}
    </div>
  );

  return (
    <form noValidate onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
      {input("name", "Name", "text", "name")}
      {input("company", "Company name", "text", "organization")}
      {input("email", "Business email", "email", "email")}
      {input("country", "Country", "text", "country-name")}
      {input("phone", "Contact number", "tel", "tel")}
      {input("product", "Product or product family", "text", "off", "f-products")}
      <datalist id="f-products">{PRODUCTS.map((p) => <option key={p.slug} value={p.name} />)}</datalist>
      <div className="sm:col-span-2">{input("application", "Application or end use (optional)")}</div>
      <div className="sm:col-span-2">
        <label htmlFor="f-message" className="eyebrow text-paper/70">Message</label>
        <textarea id="f-message" rows={4} value={v.message} onChange={set("message")} aria-invalid={!!err.message} aria-describedby={err.message ? "e-message" : undefined} className={field} />
        {err.message && <p id="e-message" className="mt-1 text-sm text-flame">{err.message}</p>}
      </div>
      {state === "error" && <p role="alert" className="text-flame sm:col-span-2">We couldn't send your enquiry. Please try again or email {CONTACT.email}.</p>}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className="rounded-full bg-flame btn text-ink transition-transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-60">
          {state === "sending" ? "Preparing…" : "Send Enquiry"}
        </button>
        {!ENQUIRY_ENDPOINT && <p className="text-sm text-paper/60">Opens your email app with the enquiry filled in.</p>}
      </div>
    </form>
  );
}
