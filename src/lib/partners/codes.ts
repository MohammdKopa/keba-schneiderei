import type { Code, PartnerKind } from "./db";

export function codeCookieName(slug: string): string {
  return `kc_${slug}`;
}

/** Valid to show the customer: unexpired, or already redeemed (so they see the "used" state). */
export function isCodeUsable(code: Code, includeRedeemed = false): boolean {
  if (code.redeemedAt) return includeRedeemed;
  return new Date(code.expiresAt).getTime() > Date.now();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Berlin",
  });
}

export function formatEuro(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export const kindCopy: Record<
  PartnerKind,
  { label: string; headline: [string, string, string]; pitch: string }
> = {
  mode: {
    label: "Mode",
    headline: ["Passt nicht ganz?", "Wir machen es", "passend."],
    pitch: "Hosen kürzen, enger machen, Ärmel anpassen — schnell und sauber, direkt in Marl.",
  },
  braut: {
    label: "Brautmode",
    headline: ["Ihr Kleid.", "Perfekt", "angepasst."],
    pitch: "Brautkleid kürzen, Taille anpassen, Träger und Schleppe — mit Ruhe, Erfahrung und Anproben.",
  },
};
