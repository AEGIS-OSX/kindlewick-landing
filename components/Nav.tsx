"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mq.addEventListener("change", onMotionChange);

    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMotionChange);
    };
  }, []);

  const navStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backgroundColor: scrolled ? "var(--color-bg)" : "transparent",
    transition: reducedMotion ? "none" : "background-color 200ms ease-out",
    borderBottom: scrolled
      ? "1px solid var(--color-border)"
      : "1px solid transparent",
  };

  const ctaStyle: React.CSSProperties = {
    backgroundColor: "var(--color-cta-bg)",
    color: "var(--color-cta-text)",
    borderRadius: "var(--radius-m)",
    minHeight: "44px",
    paddingInline: "var(--space-sm)",
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    fontSize: "1rem",
    letterSpacing: "0.02em",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "1.125rem",
    letterSpacing: "0.12em",
    color: "var(--color-text)",
    textDecoration: "none",
  };

  return (
    <nav aria-label="Main navigation" style={navStyle}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingInline: "var(--space-xs)",
          paddingBlock: "var(--space-xxs)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "64px",
        }}
      >
        <a href="#top" style={logoStyle} aria-label="Kindlewick home">
          KINDLEWICK
        </a>

        <button
          type="button"
          style={ctaStyle}
          onClick={() => {
            const el = document.getElementById("waitlist");
            if (el) el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
          }}
        >
          Join the Waitlist
        </button>
      </div>

      <style>{`
        nav a:focus-visible,
        nav button:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 3px;
          border-radius: var(--radius-s);
        }
      `}</style>
    </nav>
  );
}
