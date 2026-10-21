import { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface TestimonialItem {
  id: string;
  num: string;
  country: string;
  flagImg: string;
  quote: string;
  attribution: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "us",
    num: "01",
    country: "United States",
    flagImg: "/flags/united-states.png",
    quote:
      "The leadership of Mr. Mukund providing the clear message of QUALITY as the primary focus runs throughout the entire Neelikon organization. The Neelikon name is synonymous with quality as a result. Our customers know that when they are provided with Neelikon material that there is no concern on the quality of the product.",
    attribution: "Distributor – Food, Pharma, Cosmetic – USA",
  },
  {
    id: "za",
    num: "02",
    country: "South Africa",
    flagImg: "/flags/south-africa.png",
    quote:
      "Since 2004 we are dealing with Neelikon Food Dyes & Chemicals Ltd. During all these years we have not received single quality complaint from our customers, which clearly indicates that the quality of Neelikon colors are fully accepted and approved by the food industry in South Africa.",
    attribution: "Distributor – Food – South Africa",
  },
  {
    id: "vn",
    num: "03",
    country: "Vietnam",
    flagImg: "/flags/vietnam.png",
    quote:
      "I still remember the day I met guys from Neelikon in Vietnam. It was not the first appearance of Neelikon in Vietnam but the beginning of my start-up and the starting of a new period of Neelikon. Three meetings with three different people at different management levels gave me the same thing: hope and belief.",
    attribution: "Distributor – Food, Pharma, Cosmetic – Vietnam",
  },
  {
    id: "au",
    num: "04",
    country: "Australia",
    flagImg: "/flags/australia.png",
    quote:
      "We have been dealing with Neelikon for close to a decade, and in that time have found them to be an honest, reliable supplier with an absolute focus on quality of product. They are proactive to our needs, and very responsive when called upon to act to market demands and innovation.",
    attribution: "Distributor – Food, Pharma & Cosmetic – Australia",
  },
  {
    id: "gb",
    num: "05",
    country: "United Kingdom",
    flagImg: "/flags/united-kingdom.png",
    quote:
      "As a long standing customer of Neelikon, I can vouch for high quality consistent product, delivered with excellent customer service. A trusted supplier, highly recommended.",
    attribution: "Customer – Food & Pharma – UK",
  },
  {
    id: "jp",
    num: "06",
    country: "Japan",
    flagImg: "/flags/japan.png",
    quote:
      "We are proud to have NEELIKON as Working Partner in Japan for selling their high quality Dyestuffs in our market and for procuring Raw-Material Chemicals from Japan.",
    attribution: "Co-Producer – Food & Pharma – Japan",
  },
  {
    id: "mx",
    num: "07",
    country: "Mexico",
    flagImg: "/flags/mexico.png",
    quote:
      "We are proud to be a partner of Neelikon, we have built an absolutely satisfactory relationship with them for over a decade. Business with Neelikon is always based in trust and transparency, we can certainly rely on them and benefit the local market with Neelikon's partnership.",
    attribution: "Distributor – Mexico",
  },
  {
    id: "in",
    num: "08",
    country: "India",
    flagImg: "/flags/india.png",
    quote:
      "Pioneers of the Colour and Dye Industry, Neelikon is a well-established name that has continued providing the best quality products and efficient technical support to its customers for decades. We are happy to be associated with them and look forward to continuing to do so in the long future.",
    attribution: "Distributor – Food – India",
  },
  {
    id: "my",
    num: "09",
    country: "Malaysia",
    flagImg: "/flags/malaysia.png",
    quote:
      "Over the years that we had been selling Neelikon colors, we have upmost respect for the family for keeping to their promises. They have made continuous improvement in their product, packing and quality. We feel secure in distributing colors from Neelikon and will continue to do so in the future.",
    attribution: "Distributor – Food, Pharma, Cosmetic – Malaysia",
  },
  {
    id: "id",
    num: "10",
    country: "Indonesia",
    flagImg: "/flags/indonesia.png",
    quote:
      "More than 20 (twenty) years we have long relationship with Neelikon Food Dyes and Chemicals Limited, from the small business step by step we increase the volume of business. Neelikon is the prime manufacturer of high quality dyes, pigment and lakes color.",
    attribution: "Distributor – Food & Pharma – Indonesia",
  },
  {
    id: "de",
    num: "11",
    country: "Germany",
    flagImg: "/flags/germany.png",
    quote:
      "Since more than 25 years, Neelikon was our reliable partner for all kind of dyes, supportive, knowledgeable with the ability to move forwards and take always at the right time the right business measures. It is always a pleasure to cooperate with this team!",
    attribution: "End User – Fluorescent Dyes – Germany",
  },
  {
    id: "th",
    num: "12",
    country: "Thailand",
    flagImg: "/flags/thailand.png",
    quote:
      "Good day. Actually we know some Indian companies but Neelikon is quite quick response and good service than others. High product quality and packing is also good. When we visited you, I received kindly welcome and we could see your whole factory. It was good for us to make reliable relationship. We never felt complain or worry about your behavior. This is my honest opinion.",
    attribution: "Distributor – Fluorescent Dyes – Thailand",
  },
  {
    id: "kr",
    num: "13",
    country: "South Korea",
    flagImg: "/flags/south-korea.png",
    quote:
      "We were lucky enough to be able to promote Neelikon's Fluorescent Dyes supplied in a timely manner with the best quality and the best price for the past 20 years. We hope that we will be able to promise again for another 20 years, and grow together thanks to the continuous R&D trial of new products like last years. Congratulations on the renewal of Neelikon's web site this time.",
    attribution: "Distributor – Fluorescent Dyes – Korea",
  },
  {
    id: "cn",
    num: "14",
    country: "China",
    flagImg: "/flags/china.png",
    quote:
      "It's nice to cooperate with your excellent company for over 15 years, your great team makes shining glorious achievement, let's keep working together and make progress together.",
    attribution: "Customer – Fluorescent Dyes – China",
  },
];

const AUTOPLAY_INTERVAL = 3000; // 3 seconds

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = TESTIMONIALS.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isDragging) {
      timerRef.current = setInterval(() => {
        goToNext();
      }, AUTOPLAY_INTERVAL);
    }
  }, [isDragging, goToNext]);

  // Autoplay timer: advances automatically every 3 seconds
  useEffect(() => {
    if (isDragging) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isDragging, goToNext]);

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
      resetTimer();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
      resetTimer();
    }
  };

  // Drag / Swipe handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset < -60) {
      goToNext();
      resetTimer();
    } else if (dragOffset > 60) {
      goToPrev();
      resetTimer();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!e.touches[0]) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    setDragOffset(e.touches[0].clientX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -50) {
      goToNext();
      resetTimer();
    } else if (dragOffset > 50) {
      goToPrev();
      resetTimer();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  // Circular offset relative to current
  const getOffset = (idx: number) => {
    let diff = (idx - currentIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      className="bg-white py-12 sm:py-16 lg:py-20 text-[#17231F] overflow-hidden select-none"
      aria-label="What Our Associates Say"
    >
      <div className="container-x">
        {/* Header: Centered Eyebrow and Headline */}
        <div className="text-center flex flex-col items-center">
          {/* Eyebrow with green accent lines */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1.5px] w-7 sm:w-8 bg-[#17664F]" aria-hidden />
            <p
              className="text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[2.8px] text-[#17664F]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              TESTIMONIALS
            </p>
            <span className="h-[1.5px] w-7 sm:w-8 bg-[#17664F]" aria-hidden />
          </div>

          {/* Heading with elegant italic green serif accent */}
          <h2
            className="mt-3 text-[32px] sm:text-[40px] lg:text-[46px] font-bold tracking-tight text-[#17231F] leading-[1.12]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            What Our Associates{" "}
            <span
              className="serif-accent text-[#17664F] font-normal italic"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Say
            </span>
          </h2>
        </div>

        {/* 3D Carousel Stage */}
        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative mt-8 sm:mt-10 w-full focus:outline-none cursor-grab active:cursor-grabbing"
          style={{
            perspective: isMobile ? "900px" : "1300px",
          }}
        >
          {/* Circular Previous Arrow Button (Left Edge) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
              resetTimer();
            }}
            className="absolute left-0 sm:left-2 lg:left-0 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#D7E2DC] bg-white text-[#17231F] shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all hover:border-[#17664F] hover:bg-[#17664F] hover:text-white active:scale-95 cursor-pointer focus:outline-none"
            aria-label="Previous testimonial"
            title="Previous testimonial"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Circular Next Arrow Button (Right Edge) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
              resetTimer();
            }}
            className="absolute right-0 sm:right-2 lg:right-0 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#D7E2DC] bg-white text-[#17231F] shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all hover:border-[#17664F] hover:bg-[#17664F] hover:text-white active:scale-95 cursor-pointer focus:outline-none"
            aria-label="Next testimonial"
            title="Next testimonial"
          >
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Testimonials Stage Container - Stable Height Prevents Shifts */}
          <div className="relative w-full min-h-[480px] sm:min-h-[380px] lg:min-h-[340px]">
            {TESTIMONIALS.map((item, idx) => {
              const diff = getOffset(idx);
              const isActive = diff === 0;

              let transformStyle = "";
              if (isActive && dragOffset !== 0) {
                transformStyle = `translate3d(${dragOffset}px, 0, 0)`;
              }

              return (
                <div
                  key={item.id}
                  className={`absolute inset-0 w-full mx-auto max-w-5xl flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? "z-30 opacity-100 pointer-events-auto"
                      : "z-10 opacity-0 pointer-events-none"
                  }`}
                  style={{
                    transform: transformStyle,
                    transition: isDragging ? "none" : undefined,
                  }}
                >
                  <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center px-12 sm:px-16 lg:px-20">
                    {/* Left Column: Testimonial Quotation & Attribution */}
                    <div className="lg:col-span-8 flex flex-col justify-center">
                      {/* Understated Elegant Dark Green Quote Mark */}
                      <span
                        aria-hidden
                        className="text-[38px] sm:text-[42px] lg:text-[46px] leading-none text-[#17664F] font-serif select-none -mb-1 block"
                        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                      >
                        “
                      </span>

                      {/* Testimonial Quote: Balanced 22–24px size with comfortable line height */}
                      <blockquote
                        className="text-[18px] sm:text-[21px] lg:text-[23px] font-normal leading-[1.48] tracking-[-0.01em] text-[#1E2925] max-w-2xl"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {item.quote}
                      </blockquote>

                      {/* Customer Attribution with Horizontal Green Accent Dash */}
                      <div className="mt-5 flex items-center gap-3">
                        <span className="h-[1.5px] w-6 bg-[#17664F] shrink-0" aria-hidden />
                        <p
                          className="text-[11px] sm:text-[11.5px] font-semibold uppercase tracking-[2px] text-[#66756F]"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {item.attribution}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Country Flag in Natural Pebble Shape */}
                    <div className="lg:col-span-4 flex flex-col items-center justify-center pt-2 lg:pt-0">
                      <div className="relative group/flag transition-transform duration-500 ease-out hover:scale-105">
                        <div
                          className="w-[170px] h-[125px] sm:w-[195px] sm:h-[145px] lg:w-[220px] lg:h-[160px] overflow-hidden shadow-[0_16px_32px_-10px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.05)] bg-[#F8FAF9] border border-[#E2EAE5]"
                          style={{
                            borderRadius: "44% 56% 62% 38% / 46% 48% 52% 54%",
                          }}
                        >
                          <img
                            src={item.flagImg}
                            alt={`${item.country} national flag`}
                            className="w-full h-full object-cover object-center filter saturate-[1.06] transition-transform duration-700 ease-out group-hover/flag:scale-108"
                            loading={isActive ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </div>

                        {/* Country Label Underneath */}
                        <div className="mt-3.5 flex items-center justify-center">
                          <span
                            className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#17664F]"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {item.country}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Dots (Centered) */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  goToIndex(i);
                  resetTimer();
                }}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  i === currentIndex
                    ? "w-7 bg-[#17664F]"
                    : "w-2 bg-[#D7E2DC] hover:bg-[#17664F]/50"
                }`}
                aria-label={`Go to testimonial ${t.num} (${t.country})`}
                title={`${t.num} · ${t.country}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
