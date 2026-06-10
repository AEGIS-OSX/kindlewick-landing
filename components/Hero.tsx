"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const sectionStyle: React.CSSProperties = {
    backgroundColor: "var(--color-bg)",
    minHeight: "80vh",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "var(--space-lg)",
    maxWidth: "1200px",
    margin: "0 auto",
    paddingInline: "var(--space-xs)",
    paddingBlock: "var(--space-xl)",
    alignItems: "center",
  };

  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-sm)",
    order: 1,
  };

  const headlineStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "var(--type-h2)",
    lineHeight: 1.18,
    color: "var(--color-text)",
    margin: 0,
  };

  const subheadStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: 400,
    fontSize: "var(--type-md)",
    lineHeight: 1.56,
    color: "var(--color-text)",
    margin: 0,
    maxWidth: "32rem",
  };

  const ctaStyle: React.CSSProperties = {
    backgroundColor: "var(--color-cta-bg)",
    color: "var(--color-cta-text)",
    borderRadius: "var(--radius-m)",
    minHeight: "44px",
    paddingInline: "var(--space-sm)",
    paddingBlock: "var(--space-xxs)",
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    fontSize: "var(--type-sm)",
    letterSpacing: "0.02em",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  };

  const microcopyStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: 400,
    fontSize: "var(--type-sm)",
    lineHeight: 1.5,
    color: "var(--color-muted)",
    margin: 0,
  };

  const imageWrapStyle: React.CSSProperties = {
    order: 2,
    width: "100%",
    overflow: "hidden",
    borderRadius: "var(--radius-card)",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "cover",
    aspectRatio: "3 / 4",
    backgroundColor: "var(--color-border)",
  };

  return (
    <section
      aria-labelledby="hero-heading"
      style={sectionStyle}
      className="hero-section"
    >
      <div style={contentStyle}>
        <h1 id="hero-heading" style={headlineStyle}>
          Light the Slow Hours.
        </h1>
        <p style={subheadStyle}>
          Small-batch soy candles, hand-poured in Asheville. Fall collection
          arriving October 2027.
        </p>
        <button
          type="button"
          style={ctaStyle}
          className="hero-cta"
          onClick={() => {
            const el = document.getElementById("waitlist");
            if (el)
              el.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
              });
          }}
        >
          Join the Waitlist
        </button>
        <p style={microcopyStyle}>
          One view, one moment. Tap to hold your place.
        </p>
      </div>

      <div style={imageWrapStyle}>
        <img
          src="/hero-candle.jpg"
          alt="A hand-poured soy candle in a reclaimed glass vessel, lit on a wooden surface"
          style={imageStyle}
          width={600}
          height={800}
        />
      </div>

      <style>{`
        .hero-cta:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 3px;
          border-radius: var(--radius-m);
        }

        @media (min-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr 1fr !important;
            min-height: 85vh !important;
            padding-block: var(--space-xxl) !important;
          }
        }

        @media (min-width: 1024px) {
          .hero-section {
            grid-template-columns: 1fr 0.85fr !important;
          }
          .hero-section h1 {
            font-size: var(--type-h1) !important;
            line-height: 1.17 !important;
          }
        }
      `}</style>
    </section>
  );
}
