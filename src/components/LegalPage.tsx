import Link from "next/link";
import type { Locale } from "@/lib/business";
import { t } from "@/lib/dictionary";

interface Props {
  locale: Locale;
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function LegalPage({ locale, title, lastUpdated, children }: Props) {
  const lang = t(locale);
  const homeHref = locale === "ar" ? "/ar" : "/";

  return (
    <article className="bg-[var(--color-paper)] text-[var(--color-ink)] section">
      <div className="wrap-narrow max-w-[760px]">
        <Link
          href={homeHref}
          className="eyebrow text-[var(--color-cognac)] hover:text-[var(--color-ink)] transition-colors"
        >
          {lang.legal.back}
        </Link>

        <h1 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] tracking-[-0.025em] mt-6 mb-4">
          {title}
        </h1>

        {lastUpdated && (
          <p className="caption text-[var(--color-ink-mute)] mb-12">
            {lang.legal.lastUpdated}: {lastUpdated}
          </p>
        )}

        <div className="legal-prose space-y-6 text-[15px] leading-[1.75] text-[var(--color-ink-soft)]">
          {children}
        </div>
      </div>

      <style>{`
        .legal-prose h2 {
          font-family: var(--font-fraunces), serif;
          font-size: clamp(1.6rem, 3vw, 2.1rem);
          line-height: 1.15;
          letter-spacing: -0.015em;
          color: var(--color-ink);
          margin-top: 3rem;
          margin-bottom: 1rem;
        }
        .legal-prose h3 {
          font-family: var(--font-fraunces), serif;
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--color-ink);
          margin-top: 2rem;
          margin-bottom: 0.5rem;
        }
        .legal-prose p { margin-bottom: 1rem; }
        .legal-prose strong { color: var(--color-ink); font-weight: 500; }
        .legal-prose a {
          color: var(--color-cognac);
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: var(--color-rule);
        }
        .legal-prose a:hover { text-decoration-color: var(--color-cognac); }
        .legal-prose ul {
          margin: 1rem 0 1rem 1.25rem;
          list-style: none;
        }
        .legal-prose ul li {
          position: relative;
          padding-left: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .legal-prose ul li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: var(--color-cognac);
        }
        html[dir="rtl"] .legal-prose ul li {
          padding-left: 0;
          padding-right: 1.25rem;
        }
        html[dir="rtl"] .legal-prose ul li::before {
          left: auto;
          right: 0;
        }
        .legal-prose .lede {
          font-family: var(--font-instrument), serif;
          font-size: 1.25rem;
          line-height: 1.6;
          color: var(--color-ink);
          margin-bottom: 2rem;
        }
        .legal-prose .block {
          padding: 1rem 1.25rem;
          background: var(--color-paper-warm);
          border-left: 2px solid var(--color-cognac);
          margin: 1.25rem 0;
        }
        html[dir="rtl"] .legal-prose .block {
          border-left: none;
          border-right: 2px solid var(--color-cognac);
        }
      `}</style>
    </article>
  );
}
