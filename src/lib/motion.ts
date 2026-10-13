import type { Variants, Transition } from "motion/react";

export const ease = [0.16, 1, 0.3, 1] as const;
export const baseTransition: Transition = { duration: 0.7, ease };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

export const lineReveal: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease } },
};

export const stagger = (s = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: delay } },
});

export const viewportOnce = { once: true, margin: "-10% 0px" } as const;
