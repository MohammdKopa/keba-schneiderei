"use client";

import { useState, useTransition } from "react";
import { removePartner } from "./actions";

/** Two-step delete: first tap asks, second tap removes the partner and all its codes. */
export default function DeletePartnerButton({ id, name }: { id: number; name: string }) {
  const [asking, setAsking] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!asking) {
    return (
      <button
        type="button"
        onClick={() => setAsking(true)}
        className="text-xs text-red-700 underline underline-offset-4"
      >
        Löschen
      </button>
    );
  }

  return (
    <span className="flex basis-full items-center justify-end gap-3 pt-2 text-xs">
      <span className="text-red-800">„{name}“ mit allen Codes löschen?</span>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => removePartner(id))}
        className="bg-red-700 px-3 py-1.5 font-semibold text-white disabled:opacity-50"
      >
        Ja, löschen
      </button>
      <button type="button" onClick={() => setAsking(false)} className="underline underline-offset-4">
        Abbrechen
      </button>
    </span>
  );
}
