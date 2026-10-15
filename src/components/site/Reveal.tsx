import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, lineReveal, stagger, viewportOnce } from "@/lib/motion";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Heading with per-line masked reveal. */
export function LineHeading({
  lines,
  className,
  as: Tag = "h1",
  delay = 0,
  inView = false,
}: {
  lines: readonly string[];
  className?: string;
  as?: "h1" | "h2";
  delay?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const MotionTag = Tag === "h1" ? motion.h1 : motion.h2;
  const trigger = inView ? { whileInView: "show", viewport: viewportOnce } : { animate: "show" };
  return (
    <MotionTag className={className} initial={reduce ? false : "hidden"} {...trigger} variants={stagger(0.09, delay)}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={reduce ? {} : lineReveal}>
            {l}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
