import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";
import { CONTACT } from "@/lib/content";

/** Submission adapter: set to a form endpoint (POST JSON) to deliver enquiries directly. Empty = opens the visitor's email app. */
export const ENQUIRY_ENDPOINT = "";

type F = {
  name: string;
  email: string;
  company: string;
  industry: string;
  message: string;
};

const EMPTY: F = {
  name: "",
  email: "",
  company: "",
  industry: "",
  message: "",
};

function validate(v: F) {
  const e: Partial<Record<keyof F, string>> = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid work email.";
  if (v.company.trim().length < 2) e.company = "Please enter your company name.";
  if (!v.industry.trim()) e.industry = "Please select your industry.";
  if (v.message.trim().length < 5) e.message = "Please tell us about your requirements.";
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
    const msg =
      intent === "sample"
        ? `I would like to request a sample of ${p}.`
        : intent === "documents"
        ? `Please share the TDS / MSDS for ${p}.`
        : `I am interested in learning more about ${p}.`;
    setV((s) => ({ ...s, message: msg || s.message }));
    setState("idle");
  }, [product, intent]);

  const set = (k: keyof F) => (e: { target: { value: string } }) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (err[k]) {
      setErr((s) => ({ ...s, [k]: undefined }));
    }
  };

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
        const r = await fetch(ENQUIRY_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(v),
        });
        if (!r.ok) throw new Error();
        setState("sent");
      } catch {
        setState("error");
      }
      busy.current = false;
      return;
    }
    const subject = `Enquiry from ${v.name} (${v.company})`;
    const body = `Name: ${v.name}\nWork Email: ${v.email}\nCompany: ${v.company}\nIndustry: ${v.industry}\n\nRequirements / Message:\n${v.message}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setState("mail");
    busy.current = false;
  }

  if (state === "sent" || state === "mail") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-xl border border-[#D7E2DC] bg-[#F8FAF9] p-8 text-[#17231F]">
        <CheckCircle2 className="h-10 w-10 text-[#17664F]" />
        <p className="text-xl font-semibold" style={{ fontFamily: "'Manrope', sans-serif" }}>
          {state === "sent" ? "Thank you — your enquiry has been received." : "Your email app is opening with your enquiry ready."}
        </p>
        <p className="text-sm text-[#66756F]">
          {state === "mail" ? (
            <>
              Your enquiry is delivered once you click send in your email client. If it did not open automatically, reach us directly at{" "}
              <a className="font-medium text-[#17231F] underline" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>.
            </>
          ) : (
            "Our team will review your application and respond promptly."
          )}
        </p>
        <button
          onClick={() => {
            setV(EMPTY);
            setState("idle");
          }}
          className="mt-2 text-xs font-semibold text-[#17664F] hover:underline"
        >
          Start a new enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="mb-1.5 block text-[12px] font-normal text-[#17231F]">
            Your name
          </label>
          <input
            id="f-name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            value={v.name}
            onChange={set("name")}
            aria-invalid={!!err.name}
            className={`w-full rounded-md border bg-white px-3.5 py-2.5 text-[13px] text-[#17231F] placeholder:text-[#9AA8A1] transition-colors focus:outline-none ${
              err.name ? "border-red-500 focus:border-red-500" : "border-[#D7E2DC] focus:border-[#17664F]"
            }`}
          />
          {err.name && <p className="mt-1 text-[11px] text-red-600">{err.name}</p>}
        </div>

        <div>
          <label htmlFor="f-email" className="mb-1.5 block text-[12px] font-normal text-[#17231F]">
            Work email
          </label>
          <input
            id="f-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={v.email}
            onChange={set("email")}
            aria-invalid={!!err.email}
            className={`w-full rounded-md border bg-white px-3.5 py-2.5 text-[13px] text-[#17231F] placeholder:text-[#9AA8A1] transition-colors focus:outline-none ${
              err.email ? "border-red-500 focus:border-red-500" : "border-[#D7E2DC] focus:border-[#17664F]"
            }`}
          />
          {err.email && <p className="mt-1 text-[11px] text-red-600">{err.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="f-company" className="mb-1.5 block text-[12px] font-normal text-[#17231F]">
          Company
        </label>
        <input
          id="f-company"
          type="text"
          autoComplete="organization"
          placeholder="Company name"
          value={v.company}
          onChange={set("company")}
          aria-invalid={!!err.company}
          className={`w-full rounded-md border bg-white px-3.5 py-2.5 text-[13px] text-[#17231F] placeholder:text-[#9AA8A1] transition-colors focus:outline-none ${
            err.company ? "border-red-500 focus:border-red-500" : "border-[#D7E2DC] focus:border-[#17664F]"
          }`}
        />
        {err.company && <p className="mt-1 text-[11px] text-red-600">{err.company}</p>}
      </div>

      <div>
        <label htmlFor="f-industry" className="mb-1.5 block text-[12px] font-normal text-[#17231F]">
          Your industry
        </label>
        <div className="relative">
          <select
            id="f-industry"
            value={v.industry}
            onChange={set("industry")}
            aria-invalid={!!err.industry}
            className={`w-full appearance-none rounded-md border bg-white px-3.5 py-2.5 pr-10 text-[13px] transition-colors focus:outline-none cursor-pointer ${
              !v.industry ? "text-[#9AA8A1]" : "text-[#17231F]"
            } ${err.industry ? "border-red-500 focus:border-red-500" : "border-[#D7E2DC] focus:border-[#17664F]"}`}
          >
            <option value="" disabled>
              Select an industry
            </option>
            <option value="Food & Beverages">Food & Beverages</option>
            <option value="Pharmaceuticals">Pharmaceuticals</option>
            <option value="Cosmetics & Personal Care">Cosmetics & Personal Care</option>
            <option value="Specialty & Industrial Dyes">Specialty & Industrial Dyes</option>
            <option value="Other">Other</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#17231F]" />
        </div>
        {err.industry && <p className="mt-1 text-[11px] text-red-600">{err.industry}</p>}
      </div>

      <div>
        <label htmlFor="f-message" className="mb-1.5 block text-[12px] font-normal text-[#17231F]">
          How can we help?
        </label>
        <textarea
          id="f-message"
          rows={4}
          placeholder="Tell us about your application or colour requirements..."
          value={v.message}
          onChange={set("message")}
          aria-invalid={!!err.message}
          className={`w-full rounded-md border bg-white px-3.5 py-2.5 text-[13px] text-[#17231F] placeholder:text-[#9AA8A1] transition-colors focus:outline-none min-h-[120px] resize-y ${
            err.message ? "border-red-500 focus:border-red-500" : "border-[#D7E2DC] focus:border-[#17664F]"
          }`}
        />
        {err.message && <p className="mt-1 text-[11px] text-red-600">{err.message}</p>}
      </div>

      {state === "error" && (
        <p role="alert" className="text-xs text-red-600">
          We couldn't send your enquiry. Please reach us directly at {CONTACT.email}.
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#17664F] px-6 py-3 text-[12px] font-semibold text-white transition-all hover:bg-[#12523f] active:scale-[0.98] disabled:opacity-60"
        >
          <span>{state === "sending" ? "Preparing…" : "Prepare email enquiry"}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
}
