const steps = [
  {
    numeral: "01",
    title: "Small batches",
    body: "We blend each scent in small batches so every candle smells true.",
  },
  {
    numeral: "02",
    title: "Hand-poured vessels",
    body: "We pour into reclaimed glass by hand and set the wick with care.",
  },
  {
    numeral: "03",
    title: "Fourteen day cure",
    body: "We let jars rest to deepen the scent and ensure an even, clean burn.",
  },
];

export default function OurCraft() {
  return (
    <>
      <style>{`
        .our-craft {
          background-color: var(--color-primary);
          color: var(--color-bg);
          padding: var(--space-xxl) var(--space-xl);
        }

        .our-craft__inner {
          max-width: 72rem;
          margin-inline: auto;
        }

        .our-craft__eyebrow {
          font-family: var(--font-body);
          font-size: var(--type-xs);
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-bg);
          opacity: 0.55;
          margin: 0 0 var(--space-xl) 0;
        }

        .our-craft__steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        .our-craft__step {
          display: grid;
          grid-template-columns: 5.5rem 1fr;
          column-gap: var(--space-sm);
          align-items: start;
        }

        .our-craft__numeral {
          font-family: var(--font-display);
          font-size: 6rem;
          font-weight: 400;
          line-height: 0.82;
          color: var(--color-bg);
          opacity: 0.22;
          text-align: right;
          /* Pull numeral up so its cap-height aligns with the step title */
          margin-top: -0.05em;
          user-select: none;
          aria-hidden: true;
        }

        .our-craft__text {
          display: flex;
          flex-direction: column;
          gap: var(--space-xxs);
          padding-top: 0.1em;
        }

        .our-craft__title {
          font-family: var(--font-display);
          font-size: var(--type-lg);
          font-weight: 600;
          line-height: 1.15;
          color: var(--color-bg);
          margin: 0;
        }

        .our-craft__body {
          font-family: var(--font-body);
          font-size: var(--type-md);
          font-weight: 400;
          line-height: 1.65;
          color: var(--color-bg);
          opacity: 0.75;
          margin: 0;
        }

        /* Divider between steps */
        .our-craft__step + .our-craft__step {
          border-top: 1px solid var(--color-border);
          padding-top: var(--space-xl);
          margin-top: calc(-1 * var(--space-xl));
        }

        /* Responsive: tighten on mobile */
        @media (max-width: 479px) {
          .our-craft {
            padding: var(--space-xl) var(--space-sm);
          }

          .our-craft__step {
            grid-template-columns: 4rem 1fr;
            column-gap: var(--space-xs);
          }

          .our-craft__numeral {
            font-size: 4.5rem;
          }

          .our-craft__title {
            font-size: 1.25rem;
          }

          .our-craft__body {
            font-size: 1rem;
          }
        }

        /* Desktop: wider numeral column, larger numerals */
        @media (min-width: 768px) {
          .our-craft__step {
            grid-template-columns: 8rem 1fr;
            column-gap: var(--space-md);
          }

          .our-craft__numeral {
            font-size: 8rem;
          }
        }

        @media (min-width: 1024px) {
          .our-craft__numeral {
            font-size: 9.5rem;
          }

          .our-craft__step {
            grid-template-columns: 10rem 1fr;
          }
        }
      `}</style>

      <section className="our-craft" aria-labelledby="our-craft-heading">
        <div className="our-craft__inner">
          <p className="our-craft__eyebrow" id="our-craft-heading">
            Our Craft
          </p>

          <ol className="our-craft__steps">
            {steps.map((step) => (
              <li key={step.numeral} className="our-craft__step">
                <span className="our-craft__numeral" aria-hidden="true">
                  {step.numeral}
                </span>
                <div className="our-craft__text">
                  <h3 className="our-craft__title">{step.title}</h3>
                  <p className="our-craft__body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
