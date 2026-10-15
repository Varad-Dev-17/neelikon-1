import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function MaskImage({ src, alt, className, imgClassName, eager }: { src: string; alt: string; className?: string; imgClassName?: string; eager?: boolean | undefined }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`overflow-hidden ${className ?? ""}`}
      initial={reduce ? false : { clipPath: "inset(12% 12% 12% 12%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <SafeImg src={src} alt={alt} eager={eager} className={`h-full w-full object-cover ${imgClassName ?? ""}`} />
    </motion.div>
  );
}

export function SafeImg({ src, alt, className, eager }: { src: string; alt: string; className?: string; eager?: boolean | undefined }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div role="img" aria-label={alt} className={`spectrum-bar opacity-80 ${className ?? ""}`} />
    );
  return <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} className={className} />;
}
