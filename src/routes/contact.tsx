import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
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
    <main className="bg-white min-h-[calc(100dvh-104px)] pt-12 pb-24 text-[#17231F]">
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
          CONTACT US
        </p>

        <h1
          className="mt-4 text-[38px] sm:text-[48px] lg:text-[56px] font-medium leading-[1.12] tracking-tight text-[#17231F]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Great possibilities begin with a<br />conversation.
        </h1>

        <p
          className="mt-4 max-w-2xl text-[14px] sm:text-[15px] leading-relaxed text-[#66756F]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Tell us what you have in mind. Our team can help you find the right colour solution for your application.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              className="text-[22px] font-medium text-[#17231F]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Connect with Neelikon
            </h2>

            <div className="mt-8 space-y-0">
              <div className="flex items-start gap-3.5">
                <Mail className="h-5 w-5 shrink-0 text-[#17664F] mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold text-[#17231F]">General enquiries</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 block text-sm text-[#66756F] transition-colors hover:text-[#17664F]"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="my-6 border-b border-[#E5EBE8]" />

              <div className="flex items-start gap-3.5">
                <Phone className="h-5 w-5 shrink-0 text-[#17664F] mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold text-[#17231F]">Call our team</p>
                  <a
                    href="tel:+912246221415"
                    className="mt-1 block text-sm text-[#66756F] transition-colors hover:text-[#17664F]"
                  >
                    +91 22 4622 1415
                  </a>
                  <p className="mt-1 text-sm text-[#66756F]">
                    Export sales: +91 22 6662 6874
                  </p>
                </div>
              </div>

              <div className="my-6 border-b border-[#E5EBE8]" />

              <div className="flex items-start gap-3.5">
                <MapPin className="h-5 w-5 shrink-0 text-[#17664F] mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold text-[#17231F]">Head office</p>
                  <address className="mt-1 text-sm not-italic leading-relaxed text-[#66756F]">
                    D-08, Everest Building, 5th Floor,<br />
                    Pt. Madan Mohan Malaviya Marg,<br />
                    Tardeo Circle, Mumbai 400034,<br />
                    Maharashtra, India.
                  </address>
                </div>
              </div>

              <div className="mt-6 border-b border-[#E5EBE8]" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </main>
  );
}
