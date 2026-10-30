"use client";

import { useEffect, useState, useTransition } from "react";
import { lookupCode, redeem, type LookupResult } from "./actions";
import { formatDate } from "@/lib/partners/codes";

const MESSAGES: Record<LookupResult["status"], { de: string; ar: string; tone: "ok" | "bad" }> = {
  valid: { de: "Gültig", ar: "صالح", tone: "ok" },
  expired: { de: "Abgelaufen", ar: "منتهي الصلاحية", tone: "bad" },
  redeemed: { de: "Schon eingelöst", ar: "مستخدم من قبل", tone: "bad" },
  not_found: { de: "Code unbekannt", ar: "الكود غير موجود", tone: "bad" },
  invalid: { de: "4 Zeichen eingeben", ar: "أدخل ٤ أحرف", tone: "bad" },
};

const toBody = (raw: string) =>
  raw.toUpperCase().replace(/^K-/, "").replace(/[^A-Z0-9]/g, "").slice(0, 4);

/** `scanned` comes from /laden?code=K-XXXX — the URL inside the QR on the customer's phone. */
export default function RedeemPanel({ scanned }: { scanned?: string }) {
  const [input, setInput] = useState(scanned ? toBody(scanned) : "");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (scanned) startTransition(async () => setResult(await lookupCode(scanned)));
  }, [scanned]);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(null);
    startTransition(async () => setResult(await lookupCode(input)));
  };

  const confirm = () => {
    if (!result || result.status !== "valid") return;
    const code = result.code;
    startTransition(async () => {
      if (await redeem(code)) {
        setDone(code);
        setResult(null);
        setInput("");
        // Drop ?code= so a reload doesn't show the scanned code again.
        window.history.replaceState(null, "", "/laden");
      } else {
        setResult(await lookupCode(code));
      }
    });
  };

  const msg = result ? MESSAGES[result.status] : null;

  return (
    <section>
      <form onSubmit={check}>
        <label className="eyebrow !text-[var(--color-ink)]" htmlFor="code">
          Code einlösen · استخدام الكود
        </label>
        <div className="mt-3 flex">
          <span className="flex items-center border border-r-0 border-[var(--color-ink)] bg-[var(--color-paper-deep)] px-4 font-mono text-3xl">
            K-
          </span>
          <input
            id="code"
            value={input}
            onChange={(e) => {
              setInput(toBody(e.target.value));
              setResult(null);
              setDone(null);
            }}
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            placeholder="7F3A"
            className="min-w-0 flex-1 border border-[var(--color-ink)] bg-[var(--color-paper-warm)] px-4 py-4 font-mono text-3xl tracking-[0.25em] uppercase outline-none placeholder:text-[var(--color-rule)] focus:ring-2 focus:ring-[var(--color-cognac)]"
          />
          <button disabled={pending || input.length < 4} className="btn btn-ink !px-5 disabled:opacity-40">
            <span>Prüfen</span>
          </button>
        </div>
        <p className="mt-2 text-xs text-[var(--color-ink-mute)]">
          Oder den QR-Code auf dem Handy des Kunden mit der Kamera scannen.
        </p>
        <p dir="rtl" className="mt-0.5 text-xs text-[var(--color-ink-mute)]" style={{ fontFamily: "var(--font-noto-arabic)" }}>
          أو امسح رمز QR من هاتف الزبون بالكاميرا
        </p>
      </form>

      {done && (
        <div className="mt-5 border-2 border-emerald-700 bg-emerald-50 p-5 text-emerald-900">
          <p className="text-xl font-semibold">✓ {done} eingelöst</p>
          <p dir="rtl" className="mt-1" style={{ fontFamily: "var(--font-noto-arabic)" }}>
            تم استخدام الكود
          </p>
        </div>
      )}

      {result && msg && (
        <div
          className={`mt-5 border-2 p-5 ${
            msg.tone === "ok" ? "border-emerald-700 bg-emerald-50" : "border-red-700 bg-red-50"
          }`}
        >
          <p className="flex items-baseline justify-between gap-3 text-xl font-semibold">
            <span>{msg.de}</span>
            <span dir="rtl" style={{ fontFamily: "var(--font-noto-arabic)" }}>
              {msg.ar}
            </span>
          </p>

          {"code" in result && (
            <div className="mt-3 space-y-1 text-sm">
              <p>
                <span className="font-mono">{result.code}</span> · Rabatt:{" "}
                <strong className="text-lg">{result.discount}</strong>
              </p>
              <p>Von: {result.partnerName}</p>
              {result.status === "redeemed" && result.redeemedAt && (
                <p>Eingelöst am {formatDate(result.redeemedAt)}</p>
              )}
              {result.status === "expired" && <p>Abgelaufen am {formatDate(result.expiresAt)}</p>}
            </div>
          )}

          {result.status === "valid" && (
            <button
              type="button"
              onClick={confirm}
              disabled={pending}
              className="mt-5 w-full bg-emerald-700 py-5 text-xl font-semibold text-white disabled:opacity-50"
            >
              Eingelöst ✓ · تم
            </button>
          )}
        </div>
      )}
    </section>
  );
}
