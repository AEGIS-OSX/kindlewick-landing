import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-[var(--color-bg)] border-t border-[var(--color-border)]"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-[var(--space-xs)] sm:px-[var(--space-sm)] py-[var(--space-md)] flex flex-col sm:flex-row items-center justify-between gap-[var(--space-xs)]">
        {/* Wordmark */}
        <span
          className="font-[family-name:var(--font-display)] text-[var(--color-text)] tracking-widest text-xs font-semibold uppercase"
          aria-label="Kindlewick Candle Co."
        >
          KINDLEWICK
        </span>

        {/* Legal line */}
        <p className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-xs text-center order-last sm:order-none">
          &copy; 2027 Kindlewick Candle Co., Asheville NC
        </p>

        {/* Instagram link */}
        <Link
          href="https://www.instagram.com/kindlewickcandles"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-body)] text-[var(--color-muted)] hover:text-[var(--color-text)] text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 rounded-[var(--radius-s)]"
          aria-label="Follow Kindlewick on Instagram"
        >
          Instagram
        </Link>
      </div>
    </footer>
  );
}
