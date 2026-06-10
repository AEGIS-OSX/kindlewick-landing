export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-md) var(--space-lg)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-xs)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Wordmark */}
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--type-sm)',
            fontWeight: 600,
            color: 'var(--color-text)',
            letterSpacing: '0.08em',
          }}
        >
          KINDLEWICK
        </span>

        {/* Legal line */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--type-xs)',
            color: 'var(--color-muted)',
          }}
        >
          &copy; 2027 Kindlewick Candle Co., Asheville NC
        </span>

        {/* Instagram link */}
        <a
          href="https://www.instagram.com/kindlewickcandle"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--type-xs)',
            color: 'var(--color-text)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
