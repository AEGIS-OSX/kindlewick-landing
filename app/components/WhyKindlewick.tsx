import { motion } from "framer-motion";

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
    copy: `Poured to order, never warehoused. We make only what you ask for.`,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function WhyKindlewick() {
  return (
    <section
      aria-labelledby="why-kindlewick-heading"
      className="bg-[var(--color-bg)] py-[var(--space-xxl)] px-[var(--space-xs)] sm:px-[var(--space-md)]"
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
            className="font-[family-name:var(--font-display)] text-[var(--color-text)] text-[2.125rem] leading-[2.5rem] font-semibold mb-[var(--space-xl)] tracking-tight"
          >
            Why Kindlewick
          </motion.h2>

          <ul className="space-y-0" role="list">
            {trustPoints.map((point, index) => (
              <motion.li
                key={point.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Terracotta hairline top border — micro-accent only */}
                <span
                  aria-hidden="true"
                  className="block h-px w-8 bg-[var(--color-accent)] mb-[var(--space-sm)]"
                />
                <p
                  className={`font-[family-name:var(--font-body)] text-[var(--color-text)] text-[1.125rem] leading-[1.75rem] font-normal${
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
