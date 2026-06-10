"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectImage } from "./ProjectImage";

export function Hero() {
  const reduced = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
    }),
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: reduced ? 0 : 0.1 },
    },
  };

  return (
    <section
      aria-label="Hero"
      className="relative w-full bg-[var(--color-bg)] overflow-hidden"
    >
      <div className="mx-auto max-w-[1280px] px-[var(--space-xs)] sm:px-[var(--space-sm)] lg:px-[var(--space-xl)] min-h-[calc(100svh-64px)] flex flex-col lg:flex-row lg:items-stretch">
        {/* Left: content block */}
        <div className="flex flex-col justify-center pt-[var(--space-xxl)] pb-[var(--space-lg)] lg:pt-0 lg:pb-0 lg:w-[52%] lg:pr-[var(--space-xl)] z-10">
          {/* Eyebrow */}
          <motion.p
            className="text-[var(--color-accent)] font-[family-name:var(--font-body)] text-[0.875rem] leading-[1.25rem] tracking-[0.08em] uppercase mb-[var(--space-xs)]"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            Fall 2027 Collection
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-text)] text-[2.5rem] leading-[1] sm:text-[3rem] sm:leading-[1] lg:text-[4rem] lg:leading-[0.95] tracking-[-0.02em] mb-[var(--space-sm)]"
            variants={fadeUp}
            custom={reduced ? 0 : 0.1}
            initial="hidden"
            animate="visible"
          >
            Light the Slow Hours.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-[1rem] leading-[1.625] sm:text-[1.125rem] sm:leading-[1.75rem] max-w-[38ch] mb-[var(--space-md)]"
            variants={fadeUp}
            custom={reduced ? 0 : 0.2}
            initial="hidden"
            animate="visible"
          >
            Small-batch soy candles, hand-poured in Asheville. Fall collection arriving October 2027.
          </motion.p>

          {/* CTA group */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-[var(--space-xs)]"
            variants={fadeUp}
            custom={reduced ? 0 : 0.3}
            initial="hidden"
            animate="visible"
          >
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center h-[44px] px-[var(--space-sm)] rounded-[var(--radius-m)] bg-[var(--color-cta-bg)] text-[var(--color-cta-text)] font-[family-name:var(--font-body)] font-medium text-[1rem] tracking-[0.02em] transition-opacity duration-200 ease-out hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              Join the Waitlist
            </a>
            <p className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-[0.875rem] leading-[1.25rem]">
              One view, one moment. Tap to hold your place.
            </p>
          </motion.div>

          {/* Accent rule */}
          <motion.div
            className="mt-[var(--space-xl)] w-[40px] h-[2px] bg-[var(--color-accent)] rounded-full hidden lg:block"
            variants={fadeUp}
            custom={reduced ? 0 : 0.4}
            initial="hidden"
            animate="visible"
          />
        </div>

        {/* Right: tall vertical image */}
        <motion.div
          className="relative lg:w-[48%] flex-shrink-0 mt-[var(--space-md)] lg:mt-0"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {/* Tall crop container — fills viewport height on desktop */}
          <div className="relative w-full h-[480px] sm:h-[560px] lg:h-full lg:min-h-[calc(100svh-64px)] overflow-hidden">
            <ProjectImage
              id="hero"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle left-edge fade so image blends into cream bg on desktop */}
            <div
              className="absolute inset-y-0 left-0 w-[80px] hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, var(--color-bg), transparent)",
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        className="absolute bottom-[var(--space-sm)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[6px] hidden lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0 : 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        aria-hidden="true"
      >
        <span className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-[0.75rem] tracking-[0.06em] uppercase">
          Scroll
        </span>
        <span className="block w-[1px] h-[32px] bg-[var(--color-muted)] opacity-40" />
      </motion.div>
    </section>
  );
}
