"use client";

import { useState, useTransition } from "react";
import { lookupCode, redeem, type LookupResult } from "./actions";
import { formatDate } from "@/lib/partners/codes";

const MESSAGES: Record<LookupResult["status"], { de: string; ar: string; tone: "ok" | "bad" }> = {
  valid: { de: "Gültig", ar: "صالح", tone: "ok" },
  expired: { de: "Abgelaufen", ar: "منتهي الصلاحية", tone: "bad" },
  redeemed: { de: "Schon eingelöst", ar: "مستخدم من قبل", tone: "bad" },
  not_found: { de: "Code unbekannt", ar: "الكود غير موجود", tone: "bad" },
  invalid: { de: "4 Zeichen eingeben", ar: "أدخل ٤ أحرف", tone: "bad" },
};

export default function RedeemPanel() {
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(null);
    startTransition(async () => setResult(await lookupCode(input)));
  };

  const confirm = () => {
    if (!result || result.status !== "valid") return;
    const code = result.code;
    startTransition(async () => {
      const ok = await redeem(code, amount);
      if (ok) {
        setDone(code);
        setResult(null);
        setInput("");
        setAmount("");
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
              setInput(e.target.value.toUpperCase().replace(/^K-/, "").replace(/[^A-Z0-9]/g, "").slice(0, 4));
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
                Rabatt: <strong className="text-lg">{result.discount}</strong>
              </p>
              <p>Von: {result.partnerName}</p>
              {result.status === "redeemed" && result.redeemedAt && (
                <p>Eingelöst am {formatDate(result.redeemedAt)}</p>
              )}
              {result.status === "expired" && <p>Abgelaufen am {formatDate(result.expiresAt)}</p>}
            </div>
          )}

          {result.status === "valid" && (
            <div className="mt-5 space-y-3">
              <label className="block text-sm">
                Betrag in € (optional) · المبلغ
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  inputMode="decimal"
                  placeholder="z. B. 18"
                  className="mt-1 block w-full border border-[var(--color-ink)] bg-white px-3 py-3 text-lg outline-none"
                />
              </label>
              <button
                type="button"
                onClick={confirm}
                disabled={pending}
                className="w-full bg-emerald-700 py-4 text-lg font-semibold text-white disabled:opacity-50"
              >
                Eingelöst ✓ · تم
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
