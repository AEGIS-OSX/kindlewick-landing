import { motion } from "framer-motion";

const steps = [
  {
    numeral: "1",
    title: "Small batches",
    body: "We blend each scent in small batches so every candle smells true.",
  },
  {
    numeral: "2",
    title: "Hand-poured vessels",
    body: "We pour into reclaimed glass by hand and set the wick with care.",
  },
  {
    numeral: "3",
    title: "Fourteen day cure",
    body: "We let jars rest to deepen the scent and ensure an even, clean burn.",
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function OurCraft() {
  return (
    <section
      aria-labelledby="our-craft-heading"
      className="bg-[var(--color-primary)] py-[var(--space-xxl)] px-[var(--space-xs)] sm:px-[var(--space-md)]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-[var(--color-accent)] font-[family-name:var(--font-body)] text-[length:var(--type-xs)] tracking-[0.1em] uppercase mb-[var(--space-sm)]"
        >
          Our Craft
        </motion.p>

        {/* Section heading */}
        <motion.h2
          id="our-craft-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-[family-name:var(--font-display)] text-[var(--color-bg)] text-[length:var(--type-h2)] leading-[1.1] font-semibold mb-[var(--space-xl)]"
        >
          Made slowly, on purpose.
        </motion.h2>

        {/* Steps */}
        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)] md:gap-[var(--space-md)]"
        >
          {steps.map((step) => (
            <motion.li
              key={step.numeral}
              variants={itemVariants}
              className="relative flex flex-col"
            >
              {/* Hanging numeral */}
              <span
                aria-hidden="true"
                className="font-[family-name:var(--font-display)] text-[var(--color-bg)] font-semibold leading-none select-none mb-[var(--space-xs)] block"
                style={{ fontSize: "clamp(4rem, 10vw, 7rem)", opacity: 0.12 }}
              >
                {step.numeral}
              </span>

              {/* Step title */}
              <h3 className="font-[family-name:var(--font-display)] text-[var(--color-bg)] text-[length:var(--type-lg)] font-semibold leading-[1.2] mb-[var(--space-xxs)]">
                {step.title}
              </h3>

              {/* Step body */}
              <p className="font-[family-name:var(--font-body)] text-[var(--color-bg)] text-[length:var(--type-sm)] leading-[1.6] opacity-70">
                {step.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
