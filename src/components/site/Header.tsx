import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LOGO, PRODUCTS } from "@/lib/content";
import { EASE } from "./Reveal";

const NAV = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Formulation", href: "/formulation" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Innovation", href: "/innovation" },
  { label: "Quality", href: "/quality" },
];

export function Logo({ invert, className }: { invert?: boolean; className?: string } = {}) {
  const [failed, setFailed] = useState(false);
  return (
    <Link to="/" aria-label="Neelikon home" className="flex items-center shrink-0">
      {!failed && (
        <img
          src={LOGO}
          alt="Neelikon"
          width={320}
          height={96}
          className={`${className ?? "h-14 md:h-[68px] lg:h-[78px] w-auto object-contain"} ${
            invert ? "drop-shadow-[0_1px_10px_rgba(255,255,255,0.7)]" : ""
          } transition-all duration-300`}
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="flex flex-col">
          <span
            className={`text-[32px] md:text-[38px] font-extrabold tracking-tight leading-none ${
              invert ? "text-white" : "text-[#17231F]"
            }`}
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            NEELIKON
          </span>
          <span
            className="text-[8px] font-medium uppercase tracking-[2.6px] text-primary mt-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            COLOURS GLOBAL
          </span>
        </div>
      )}
    </Link>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const isHome = pathname === "/";
  const [isDark, setIsDark] = useState(isHome);

  useEffect(() => {
    setOpen(false);
    setMega(false);
    if (isHome) setIsDark(true);
  }, [pathname, isHome]);

  // Adapt navbar style when scrolling through the dark #film canvas section
  useEffect(() => {
    const checkDark = () => {
      const film = document.getElementById("film");
      if (!film) {
        setIsDark(false);
        return;
      }
      const rect = film.getBoundingClientRect();
      // When the dark film section is behind the header (header is ~104px tall)
      const inFilm = rect.top <= 120 && rect.bottom >= 60;
      setIsDark(inFilm);
    };

    window.addEventListener("scroll", checkDark, { passive: true });
    window.addEventListener("resize", checkDark, { passive: true });
    checkDark();

    return () => {
      window.removeEventListener("scroll", checkDark);
      window.removeEventListener("resize", checkDark);
    };
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-500 ease-out"
      style={{
        backgroundColor: isDark ? "transparent" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: isDark ? "none" : "blur(12px)",
        WebkitBackdropFilter: isDark ? "none" : "blur(12px)",
        borderBottom: isDark ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: isDark ? "none" : "0 4px 20px -8px rgba(0, 0, 0, 0.07)",
      }}
    >
      <div className="container-x flex h-[104px] items-center justify-between w-full transition-all">

        {/* 1. Left Logo */}
        <Logo invert={isDark} />

        {/* 2. Center Navigation Links */}
        <nav
          aria-label="Main"
          className="hidden lg:flex items-center justify-center relative"
          onMouseLeave={() => {
            setHover(null);
            setMega(false);
          }}
        >
          <ul className="flex items-center gap-[34px]">
            {NAV.map((n) => {
              const isActive =
                pathname === n.href ||
                (n.href !== "/" && pathname.startsWith(n.href)) ||
                (n.label === "Infrastructure" && (pathname.startsWith("/infrastructure") || pathname.startsWith("/industries")));
              const isIndicatorActive = hover ? hover === n.label : isActive;

              return (
                <li
                  key={n.label}
                  className="relative py-2"
                  onMouseEnter={() => {
                    setHover(n.label);
                    setMega(n.label === "Products");
                  }}
                >
                  <a
                    href={n.href}
                    onFocus={() => setHover(n.label)}
                    className={`relative flex items-center gap-1 text-[13px] font-medium transition-colors duration-300 drop-shadow-xs ${
                      isActive
                        ? isDark
                          ? "text-sky font-semibold"
                          : "text-[#17664F] font-semibold"
                        : isDark
                          ? "text-white/90 hover:text-white"
                          : "text-[#17231F] hover:text-[#17664F]"
                    }`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {n.label}
                    {n.label === "Products" && (
                      <ChevronDown
                        className={`h-3 w-3 transition-all group-hover:rotate-180 ${
                          isDark ? "text-white/70" : "opacity-60"
                        }`}
                        aria-hidden
                      />
                    )}
                    {isIndicatorActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="spectrum-bar absolute inset-x-0 -bottom-1 h-0.5"
                        transition={{ duration: 0.3, ease: EASE }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mega dropdown for Products */}
          <AnimatePresence>
            {mega && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className={`absolute left-1/2 top-full mt-2 w-[min(58rem,92vw)] -translate-x-1/2 rounded-2xl p-8 shadow-2xl backdrop-blur-xl ${
                  isDark
                    ? "border border-white/15 bg-ink/95 text-paper"
                    : "border border-black/[0.08] bg-white/98 text-[#17231F]"
                }`}
              >
                <p className={`eyebrow mb-5 ${isDark ? "text-sky" : "text-[#66756F]"}`}>
                  Product Portfolio
                </p>
                <ul className="grid grid-cols-3 gap-x-8 gap-y-3">
                  {PRODUCTS.map((p) => (
                    <li key={p.slug}>
                      <a
                        href={`/products/${p.slug}`}
                        className={`text-[13px] font-medium transition-colors ${
                          isDark
                            ? "text-paper/85 hover:text-white"
                            : "text-[#17231F] hover:text-[#17664F]"
                        }`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* 3. Right Call-To-Action Pill Button */}
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className={`group hidden lg:inline-flex items-center justify-center gap-2 h-[43px] px-[21px] text-[12px] font-semibold transition-all duration-300 active:scale-98 shadow-xs ${
              isDark
                ? "bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md"
                : "text-white bg-[#17664F] hover:bg-[#12523f]"
            }`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: "9999px",
            }}
          >
            <span>Discuss Your Requirements</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile hamburger button */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`p-2.5 rounded-lg transition-colors lg:hidden focus:outline-none ${
              isDark
                ? "text-white hover:bg-white/10"
                : "text-[#17231F] hover:bg-black/[0.04]"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 4. Animated Mobile Slide-Down Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className={`overflow-hidden backdrop-blur-xl border-t lg:hidden ${
              isDark
                ? "bg-ink/95 border-white/10 text-paper"
                : "bg-white/98 border-black/[0.08] text-[#17231F]"
            }`}
          >
            <div className="container-x py-6 w-full">
              <ul className={`flex flex-col divide-y ${isDark ? "divide-white/10" : "divide-black/[0.06]"}`}>
                {NAV.map((n, i) => {
                  const isActive =
                    pathname === n.href ||
                    (n.href !== "/" && pathname.startsWith(n.href)) ||
                    (n.label === "Infrastructure" && (pathname.startsWith("/infrastructure") || pathname.startsWith("/industries")));
                  return (
                    <motion.li
                      key={n.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i, ease: EASE }}
                    >
                      <a
                        href={n.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between py-3.5 text-[15px] font-medium transition-colors ${
                          isActive
                            ? isDark
                              ? "text-sky font-semibold"
                              : "text-[#17664F] font-semibold"
                            : isDark
                              ? "text-white/85 hover:text-white"
                              : "text-[#17231F] hover:text-[#17664F]"
                        }`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <span>{n.label}</span>
                        <ArrowUpRight className={`h-4 w-4 ${isActive ? (isDark ? "text-sky" : "text-[#17664F]") : isDark ? "text-white/40" : "text-black/30"}`} />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="pt-6 mt-2">
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={`group w-full h-[43px] px-[21px] text-[12px] font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-xs ${
                    isDark
                      ? "bg-white text-ink hover:bg-white/90"
                      : "text-white bg-[#17664F] hover:bg-[#12523f]"
                  }`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: "9999px",
                  }}
                >
                  <span>Discuss Your Requirements</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
