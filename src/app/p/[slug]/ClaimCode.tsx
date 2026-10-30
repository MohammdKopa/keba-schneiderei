"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import type { Code } from "@/lib/partners/db";
import { formatDate } from "@/lib/partners/codes";
import { brand } from "@/lib/brand";

type State =
  | { status: "loading" }
  | { status: "ready"; code: Code }
  | { status: "error"; message: string };

export default function ClaimCode({
  slug,
  discount,
  initial,
}: {
  slug: string;
  discount: string;
  initial: Code | null;
}) {
  const [state, setState] = useState<State>(
    initial ? { status: "ready", code: initial } : { status: "loading" },
  );

  // Claimed from the browser, not during server render, so link-preview bots don't burn codes.
  useEffect(() => {
    if (initial) return;
    let cancelled = false;
    fetch(`/p/${encodeURIComponent(slug)}/claim`, { method: "POST" })
      .then(async (res) => {
        if (cancelled) return;
        if (res.ok) setState({ status: "ready", code: await res.json() });
        else
          setState({
            status: "error",
            message:
              res.status === 429
                ? "Zu viele Anfragen. Bitte versuchen Sie es später noch einmal."
                : "Der Code konnte nicht erstellt werden.",
          });
      })
      .catch(() => !cancelled && setState({ status: "error", message: "Keine Verbindung." }));
    return () => {
      cancelled = true;
    };
  }, [slug, initial]);

  return (
    <div className="mt-8 border-2 bg-white p-6" style={{ borderColor: brand.teal }}>
      <p className="flex items-center gap-3">
        <span
          className="rounded-full px-3 py-1 text-lg font-semibold leading-none"
          style={{ background: brand.yellow, color: brand.teal }}
        >
          {discount}
        </span>
        <span className="text-sm font-medium">Rabatt auf Ihre Änderung</span>
      </p>

      {state.status === "loading" && (
        <p className="mt-5 h-[3.5rem] animate-pulse text-[var(--color-ink-mute)]">Code wird erstellt …</p>
      )}

      {state.status === "error" && <p className="mt-5 text-[var(--color-cognac-deep)]">{state.message}</p>}

      {state.status === "ready" && (
        <>
          <p
            className={`mt-4 font-mono text-[3.25rem] font-semibold leading-none tracking-[0.12em] ${
              state.code.redeemedAt ? "text-[var(--color-mushroom)] line-through" : "text-[var(--color-ink)]"
            }`}
          >
            {state.code.code}
          </p>
          {state.code.redeemedAt ? (
            <p className="mt-4 text-sm">Eingelöst am {formatDate(state.code.redeemedAt)}. Danke für Ihren Besuch!</p>
          ) : (
            <>
              <RedeemQr code={state.code.code} />
              <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
                Gültig bis {formatDate(state.code.expiresAt)}. Zeigen Sie diesen QR-Code im Laden — wir scannen
                ihn kurz, fertig.
              </p>
              <p className="mt-2 text-xs text-[var(--color-ink-mute)]">Tipp: Machen Sie einen Screenshot.</p>
            </>
          )}
        </>
      )}
    </div>
  );
}

/** The shop scans this with the phone camera; it opens /laden with the code already checked. */
function RedeemQr({ code }: { code: string }) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    const url = `${window.location.origin}/laden?code=${encodeURIComponent(code)}`;
    QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#0A0908", light: "#0000" } })
      .then(setSvg)
      .catch(() => setSvg(null));
  }, [code]);

  return (
    <div
      className="mx-auto mt-5 aspect-square w-full max-w-[220px] [&_svg]:h-full [&_svg]:w-full"
      aria-label={`QR-Code für ${code}`}
      role="img"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
