"use client";

import React from "react";

const PRODUCTS = [
  {
    id: "hearth",
    name: "Hearth",
    description: "Cedar, clove, warm ember. A low, steady scent for evenings beside a window.",
    price: "$28 / 9 oz",
    alt: "Hearth candle in reclaimed glass vessel on a wooden surface beside dried cedar sprigs",
    // Offset: baseline — first card sits at the top of the row
    offsetClass: "card-offset-0",
  },
  {
    id: "orchard-dusk",
    name: "Orchard Dusk",
    description: "Apple, amber, pressed linen. Crisp fruit softened by warm spice.",
    price: "$28 / 9 oz",
    alt: "Orchard Dusk candle in reclaimed glass vessel surrounded by dried apple slices and amber cloth",
    // Offset: pushed down — creates the stagger
    offsetClass: "card-offset-1",
  },
  {
    id: "reading-rain",
    name: "Reading Rain",
    description: "Petrichor, vetiver, worn pages. The quiet after a summer storm.",
    price: "$28 / 9 oz",
    alt: "Reading Rain candle in reclaimed glass vessel resting on an open book with rain-streaked window behind",
    // Offset: mid-point — third card sits between the first two
    offsetClass: "card-offset-2",
  },
];

export default function TheCollection() {
  return (
    <>
      <style>{`
        .collection-section {
          background-color: var(--color-bg);
          padding: var(--space-xxl) var(--space-xs);
        }

        .collection-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .collection-header {
          margin-bottom: var(--space-xl);
        }

        .collection-eyebrow {
          font-family: var(--font-body);
          font-size: 0.875rem;
          line-height: 1.25rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0 0 var(--space-xxs) 0;
        }

        .collection-heading {
          font-family: var(--font-display);
          font-size: 2.125rem;
          line-height: 2.5rem;
          font-weight: 600;
          color: var(--color-text);
          margin: 0;
        }

        /* Card grid — mobile: single column stack */
        .collection-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-md);
          align-items: start;
        }

        /* Desktop: three unequal columns with vertical offsets */
        @media (min-width: 768px) {
          .collection-section {
            padding: var(--space-xxl) var(--space-lg);
          }

          .collection-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: var(--space-md);
            align-items: start;
          }

          /* Card 1: sits at the top — no offset */
          .card-offset-0 {
            margin-top: 0;
          }

          /* Card 2: pushed down the most — creates the primary stagger */
          .card-offset-1 {
            margin-top: var(--space-xxl);
          }

          /* Card 3: mid-height — sits between card 1 and card 2 */
          .card-offset-2 {
            margin-top: var(--space-xl);
          }
        }

        @media (min-width: 1024px) {
          .collection-section {
            padding: var(--space-xxl) var(--space-xl);
          }
        }

        /* Product card */
        .product-card {
          display: flex;
          flex-direction: column;
          background-color: var(--color-bg);
          border-radius: var(--radius-card);
          overflow: hidden;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-soft);
          transition: box-shadow 0.2s ease-out, transform 0.2s ease-out;
        }

        @media (prefers-reduced-motion: no-preference) {
          .product-card:hover {
            box-shadow: 0 6px 20px rgba(17,16,15,0.09);
            transform: translateY(-3px);
          }
        }

        /* Photo area — 4:5 portrait ratio for tactile, editorial feel */
        .product-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          background-color: var(--color-border);
          overflow: hidden;
        }

        .product-photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* Placeholder shown when no real photo is available */
        .product-photo-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(17,16,15,0.04);
        }

        .product-photo-placeholder-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xxs);
          opacity: 0.35;
        }

        .placeholder-icon {
          width: 40px;
          height: 40px;
          color: var(--color-muted);
        }

        .placeholder-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--color-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Card body */
        .product-body {
          padding: var(--space-sm);
          display: flex;
          flex-direction: column;
          gap: var(--space-xxs);
          flex: 1;
        }

        .product-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 600;
          color: var(--color-text);
          margin: 0;
        }

        .product-description {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.5rem;
          font-weight: 400;
          color: var(--color-muted);
          margin: 0;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: var(--space-xs);
          padding-top: var(--space-xs);
          border-top: 1px solid var(--color-border);
        }

        .product-price {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.5rem;
          font-weight: 500;
          color: var(--color-text);
        }

        .product-accent-mark {
          width: 20px;
          height: 2px;
          background-color: var(--color-accent);
          border-radius: 1px;
          flex-shrink: 0;
        }
      `}</style>

      <section
        className="collection-section"
        aria-labelledby="collection-heading"
      >
        <div className="collection-inner">
          <header className="collection-header">
            <p className="collection-eyebrow" aria-hidden="true">
              Fall 2027
            </p>
            <h2 className="collection-heading" id="collection-heading">
              The Collection
            </h2>
          </header>

          <ul
            className="collection-grid"
            role="list"
            aria-label="Kindlewick candle collection"
          >
            {PRODUCTS.map((product) => (
              <li key={product.id} className={product.offsetClass}>
                <article className="product-card">
                  {/* Photo */}
                  <div className="product-photo-wrap">
                    {/* Real photography goes here. Placeholder shown until assets land. */}
                    <div
                      className="product-photo-placeholder"
                      role="img"
                      aria-label={product.alt}
                    >
                      <div className="product-photo-placeholder-inner">
                        <svg
                          className="placeholder-icon"
                          viewBox="0 0 40 40"
                          fill="none"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <rect
                            x="4"
                            y="8"
                            width="32"
                            height="24"
                            rx="3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="14"
                            cy="18"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M4 26l8-6 6 5 6-4 12 7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="placeholder-label">Photo</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="product-body">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">{product.price}</span>
                      {/* Terracotta micro-accent mark — not used as text or filled button */}
                      <span
                        className="product-accent-mark"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
