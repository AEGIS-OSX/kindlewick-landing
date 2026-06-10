"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Nav() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      role="banner"
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-colors duration-300 ease-out",
        scrolled
          ? "bg-[var(--color-bg)] border-b border-[var(--color-border)]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex items-center justify-between px-[var(--space-xs)] md:px-[var(--space-xl)] h-[60px] max-w-[1280px]"
      >
        {/* Wordmark */}
        <a
          href="/"
          aria-label="Kindlewick home"
          className="font-[family-name:var(--font-display)] font-semibold tracking-tight text-[var(--color-text)] text-[1rem] md:text-[1.125rem] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[var(--radius-s)]"
        >
          KINDLEWICK
        </a>

        {/* CTA */}
        <a
          href="#waitlist"
          className="inline-flex items-center justify-center h-[44px] px-[var(--space-sm)] rounded-[var(--radius-m)] bg-[var(--color-primary)] text-[var(--color-bg)] font-[family-name:var(--font-body)] font-medium text-[1rem] tracking-[0.02em] transition-opacity duration-200 ease-out hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        >
          Join the Waitlist
        </a>
      </nav>
    </motion.header>
  );
}
