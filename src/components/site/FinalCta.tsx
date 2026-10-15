import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="navy-field relative overflow-hidden section-y text-paper md:py-36">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow text-flame">Start a conversation</p>
          <h2 className="display mt-5 max-w-5xl fs-section">Have a colour challenge? <span className="serif-accent text-sky">Let's solve it together.</span></h2>
          <p className="mt-8 max-w-xl text-lg text-paper/80">Tell us about your application and requirements. Our team can help you explore the right colour solutions.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="/#contact" className="group inline-flex items-center gap-2 rounded-full bg-flame btn text-ink transition-transform hover:-translate-y-0.5 active:scale-95">Start a Conversation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
            <Link to="/products" className="inline-flex items-center rounded-full border border-paper/40 btn transition-colors hover:bg-paper/10">Explore Our Products</Link>
          </div>
        </Reveal>
      </div>
      <div className="spectrum-bar absolute inset-x-0 bottom-0 h-1" />
    </section>
  );
}
