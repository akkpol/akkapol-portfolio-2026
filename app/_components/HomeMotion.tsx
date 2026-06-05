"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="ak-scroll-progress fixed inset-x-0 top-0 z-50 h-0.5 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
