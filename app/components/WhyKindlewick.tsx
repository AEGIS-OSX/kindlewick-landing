"use client";

import { motion, useReducedMotion } from "framer-motion";

const trustPoints = [
  {
    id: 1,
    copy: "100% soy wax and cotton wicks for a cleaner burn.",
  },
  {
    id: 2,
    copy: "Reclaimed glass vessels, refill-ready and thoughtfully labeled.",
  },
  {
    id: 3,
    copy: "Poured to order, never warehoused. We make only what you ask for.",
  },
];

export function WhyKindlewick() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      aria-labelledby="why-kindlewick-heading"
      style={{ backgroundColor: "var(--color-bg)" }}
      className="py-[var(--space-xxl)] px-[var(--space-xs)] sm:px-[var(--space-md)]"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2
            id="why-kindlewick-heading"
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
            className="text-[2.125rem] leading-[2.5rem] font-semibold mb-[var(--space-xl)] tracking-tight"
          >
            Why Kindlewick
          </motion.h2>

          <ul role="list">
            {trustPoints.map((point, index) => (
              <motion.li
                key={point.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Terracotta hairline — micro-accent only, not text */}
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: "var(--color-accent)" }}
                  className="block h-px w-8 mb-[var(--space-sm)]"
                />
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text)",
                  }}
                  className={`text-[1.125rem] leading-[1.75rem] font-normal${
                    index < trustPoints.length - 1
                      ? " pb-[var(--space-lg)]"
                      : ""
                  }`}
                >
                  {point.copy}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
