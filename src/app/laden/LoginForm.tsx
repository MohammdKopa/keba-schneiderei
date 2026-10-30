"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm({ scanned }: { scanned?: string }) {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="space-y-4">
      {scanned && (
        <>
          <input type="hidden" name="code" value={scanned} />
          <p className="text-sm text-[var(--color-ink-soft)]">
            Nach der Anmeldung wird <span className="font-mono font-semibold">{scanned}</span> sofort geprüft.
          </p>
        </>
      )}
      <label className="block">
        <span className="eyebrow">PIN · الرمز</span>
        <input
          name="pin"
          type="password"
          inputMode="numeric"
          autoComplete="current-password"
          autoFocus
          required
          className="mt-2 block w-full border border-[var(--color-ink)] bg-[var(--color-paper-warm)] px-4 py-4 text-2xl tracking-[0.3em] outline-none focus:ring-2 focus:ring-[var(--color-cognac)]"
        />
      </label>
      {error && <p className="text-sm text-[var(--color-cognac-deep)]">{error}</p>}
      <button disabled={pending} className="btn btn-ink w-full">
        <span>{pending ? "…" : "Anmelden · دخول"}</span>
      </button>
    </form>
  );
}
