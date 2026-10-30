"use client";

import { useActionState } from "react";
import { addPartner } from "./actions";

const field =
  "mt-1 block w-full border border-[var(--color-ink)] bg-[var(--color-paper-warm)] px-3 py-3 outline-none focus:ring-2 focus:ring-[var(--color-cognac)]";

export default function AddPartnerForm() {
  const [error, action, pending] = useActionState(addPartner, null);
  return (
    <form action={action} className="space-y-4 text-sm">
      <label className="block">
        Name des Geschäfts
        <input name="name" required maxLength={80} placeholder="Modehaus Anna" className={field} />
      </label>
      <fieldset>
        <legend>Art</legend>
        <div className="mt-1 grid grid-cols-2 gap-2">
          {[
            { value: "mode", label: "Mode", hint: "Code 30 Tage gültig" },
            { value: "braut", label: "Brautmode", hint: "Code 90 Tage gültig" },
          ].map((k, i) => (
            <label
              key={k.value}
              className="cursor-pointer border border-[var(--color-ink)] p-3 has-[:checked]:bg-[var(--color-ink)] has-[:checked]:text-[var(--color-paper)]"
            >
              <input type="radio" name="kind" value={k.value} defaultChecked={i === 0} className="sr-only" />
              <span className="block font-medium">{k.label}</span>
              <span className="block text-xs opacity-70">{k.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block">
        Rabatt
        <input name="discount" defaultValue="10 %" maxLength={30} className={field} />
      </label>
      <label className="block">
        Adresse (optional)
        <input name="address" maxLength={160} className={field} />
      </label>
      <label className="block">
        Ansprechpartner / Telefon (optional)
        <input name="contact" maxLength={160} className={field} />
      </label>
      {error && <p className="text-[var(--color-cognac-deep)]">{error}</p>}
      <button disabled={pending} className="btn btn-ink w-full">
        <span>{pending ? "…" : "Anlegen & Flyer erstellen"}</span>
      </button>
    </form>
  );
}
