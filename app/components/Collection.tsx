"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectImage } from "./ProjectImage";

interface Product {
  id: "feature_1" | "feature_2" | "feature_3";
  name: string;
  scent: string;
  price: string;
  /** Vertical offset applied on md+ to create the stagger. Positive = down, negative = up. */
  offsetClass: string;
}

const PRODUCTS: Product[] = [
  {
    id: "feature_1",
    name: "Hearth",
    scent: "Cedar, clove, warm ember. A low, steady scent for evenings beside a window.",
    price: "$28 / 9 oz",
    offsetClass: "md:mt-0",
  },
  {
    id: "feature_2",
    name: "Orchard Dusk",
    scent: "Apple, amber, pressed linen. Crisp fruit softened by warm spice.",
    price: "$28 / 9 oz",
    offsetClass: "md:mt-16",
  },
  {
    id: "feature_3",
    name: "Reading Rain",
    scent: "Petrichor, vetiver, worn pages. The quiet after a summer storm.",
    price: "$28 / 9 oz",
    offsetClass: "md:mt-8",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const cardVariantsReduced = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
};

export function Collection() {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? cardVariantsReduced : cardVariants;

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className="bg-[var(--color-bg)] py-[var(--space-xxl)] px-[var(--space-xs)] md:px-[var(--space-xl)]"
    >
      {/* Section header */}
      <div className="max-w-5xl mx-auto mb-[var(--space-xl)]">
        <p
          className="font-[family-name:var(--font-body)] text-[var(--color-accent)] text-[0.875rem] leading-[1.25rem] tracking-[0.08em] uppercase mb-[var(--space-xxs)]"
          aria-hidden="true"
        >
          The Collection
        </p>
        <h2
          id="collection-heading"
          className="font-[family-name:var(--font-display)] text-[var(--color-text)] text-[2.125rem] leading-[2.5rem] font-semibold md:text-[2.75rem] md:leading-[3rem]"
        >
          Fall 2027
        </h2>
        <p
          className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-[1rem] leading-[1.5rem] mt-[var(--space-xs)] max-w-md"
        >
          Three scents, hand-poured in small batches. Arriving October 2027.
        </p>
      </div>

      {/* Offset card grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-[var(--space-md)] md:grid-cols-3 md:gap-[var(--space-sm)] md:items-start">
        {PRODUCTS.map((product, i) => (
          <motion.article
            key={product.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={variants}
            className={[
              "group flex flex-col bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-card)] overflow-hidden",
              "shadow-[var(--shadow-soft)] hover:shadow-[0_4px_16px_rgba(17,16,15,0.08)] transition-shadow duration-300",
              product.offsetClass,
            ].join(" ")}
            aria-label={product.name}
          >
            {/* Image crop — 4:5 portrait aspect */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <ProjectImage
                id={product.id}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              {/* Subtle terracotta accent line at bottom of image */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-accent)] opacity-60"
                aria-hidden="true"
              />
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-1 p-[var(--space-sm)]">
              <h3
                className="font-[family-name:var(--font-display)] text-[var(--color-text)] text-[1.5rem] leading-[2rem] font-semibold mb-[var(--space-xxs)]"
              >
                {product.name}
              </h3>
              <p
                className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-[0.875rem] leading-[1.375rem] flex-1 mb-[var(--space-sm)]"
              >
                {product.scent}
              </p>
              <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-[var(--space-xs)]">
                <span
                  className="font-[family-name:var(--font-body)] text-[var(--color-text)] text-[0.875rem] leading-[1.25rem] font-medium tracking-[0.02em]"
                >
                  {product.price}
                </span>
                {/* Terracotta micro-accent stamp */}
                <span
                  className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent)]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
