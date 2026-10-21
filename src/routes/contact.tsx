import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/content";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Neelikon Colours Global" },
      {
        name: "description",
        content: "Get in touch with Neelikon Food Dyes & Chemicals Limited for colour solutions, sample requests, and technical documentation.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="bg-white min-h-[calc(100dvh-104px)] py-12 lg:py-16 text-[#0F221B]">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
          {/* Left Column: Contact details */}
          <div className="lg:pr-12 xl:pr-16 lg:border-r lg:border-[#E5EBE8]">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <p
                className="text-[11px] font-bold uppercase tracking-[2px] text-[#17664F]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                CONTACT US
              </p>
              <span className="h-[1.5px] w-6 bg-[#17664F]" aria-hidden />
            </div>

            {/* Main Headline */}
            <h1
              className="mt-4 text-[42px] sm:text-[50px] lg:text-[56px] font-bold leading-[1.08] tracking-tight text-[#0F221B]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Great possibilities<br />
              begin with a<br />
              <span className="text-[#17664F]">conversation.</span>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-5 max-w-lg text-[14.5px] sm:text-[15px] leading-relaxed text-[#5F6E68]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Tell us what you have in mind. Our team can help you find the right colour solution for your application.
            </p>

            {/* Section title with divider */}
            <div className="mt-12 flex items-center gap-4">
              <h2
                className="text-[20px] sm:text-[22px] font-bold text-[#0F221B] whitespace-nowrap"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Connect with Neelikon
              </h2>
              <div className="h-px flex-1 bg-[#DCE4E0]" />
            </div>

            {/* Contact Rows */}
            <div className="mt-7 space-y-0">
              {/* Item 1: General enquiries */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF4F0]">
                  <Mail className="h-5 w-5 text-[#17664F]" strokeWidth={1.75} />
                </div>
                <div className="pt-0.5">
                  <p className="text-[14px] sm:text-[15px] font-semibold text-[#0F221B]">General enquiries</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 block text-[13.5px] sm:text-[14px] text-[#5F6E68] transition-colors hover:text-[#17664F]"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="my-5 border-b border-[#E5EBE8]" />

              {/* Item 2: Call our team */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF4F0]">
                  <Phone className="h-5 w-5 text-[#17664F]" strokeWidth={1.75} />
                </div>
                <div className="pt-0.5">
                  <p className="text-[14px] sm:text-[15px] font-semibold text-[#0F221B]">Call our team</p>
                  <a
                    href="tel:+912246221415"
                    className="mt-1 block text-[13.5px] sm:text-[14px] text-[#5F6E68] transition-colors hover:text-[#17664F]"
                  >
                    +91 22 4622 1415
                  </a>
                  <p className="mt-0.5 text-[13.5px] sm:text-[14px] text-[#5F6E68]">
                    Export sales: +91 22 6662 6874
                  </p>
                </div>
              </div>

              <div className="my-5 border-b border-[#E5EBE8]" />

              {/* Item 3: Head office */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF4F0]">
                  <MapPin className="h-5 w-5 text-[#17664F]" strokeWidth={1.75} />
                </div>
                <div className="pt-0.5">
                  <p className="text-[14px] sm:text-[15px] font-semibold text-[#0F221B]">Head office</p>
                  <address className="mt-1 text-[13.5px] sm:text-[14px] not-italic leading-relaxed text-[#5F6E68]">
                    D-08, Everest Building, 5th Floor,<br />
                    Pt. Madan Mohan Malaviya Marg,<br />
                    Tardeo Circle, Mumbai 400034,<br />
                    Maharashtra, India.
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:pl-12 xl:pl-16">
            {/* Top green dash */}
            <div className="w-8 h-[3px] bg-[#17664F] rounded-full mb-3" />

            <h2
              className="text-[26px] sm:text-[30px] lg:text-[32px] font-bold text-[#0F221B] tracking-tight"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Send us your enquiry
            </h2>

            <p
              className="mt-2 mb-8 text-[14px] sm:text-[14.5px] leading-relaxed text-[#5F6E68]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Fill in the details below and our team will get back to you with the right colour solution for your application.
            </p>

            <EnquiryForm />
          </div>
        </div>
      </div>
    </main>
  );
}
