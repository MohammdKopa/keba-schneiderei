"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { t } from "@/lib/dictionary";
import type { Locale } from "@/lib/business";

const STORAGE_KEY = "keba-cookie-notice-v1";

interface Props { locale: Locale; }

export default function CookieBanner({ locale }: Props) {
  const [visible, setVisible] = useState(false);
  const lang = t(locale);
  const datenschutzHref = locale === "ar" ? "/ar/datenschutz" : "/datenschutz";

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        const id = window.setTimeout(() => setVisible(true), 600);
        return () => window.clearTimeout(id);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={lang.cookies.title}
      className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-5 sm:end-5 sm:max-w-[380px] z-[60] animate-[fadein_0.5s_ease-out]"
      style={{ animation: "fadein 0.45s ease-out" }}
    >
      <div className="bg-[var(--color-paper-warm)] text-[var(--color-ink)] border border-[var(--color-rule)] shadow-[0_20px_60px_-20px_rgba(10,9,8,0.35)] p-5 sm:p-6">
        <p className="eyebrow text-[var(--color-cognac)] mb-2">{lang.cookies.title}</p>
        <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
          {lang.cookies.body}
        </p>
        <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
          <Link
            href={datenschutzHref}
            className="text-xs text-[var(--color-ink-mute)] underline underline-offset-4 decoration-[var(--color-rule)] hover:decoration-[var(--color-cognac)] hover:text-[var(--color-cognac)] transition-colors"
          >
            {lang.cookies.more}
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="px-5 py-2.5 text-xs uppercase tracking-[0.16em] bg-[var(--color-ink)] text-[var(--color-paper)] border border-[var(--color-ink)] hover:bg-[var(--color-cognac)] hover:border-[var(--color-cognac)] transition-colors"
          >
            {lang.cookies.dismiss}
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
