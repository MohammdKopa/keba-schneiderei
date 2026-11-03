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

/** Normal prices before the partner discount, shown on the customer page for clothing-shop partners. */
export const alterationPrices: { label: string; cents: number; from?: boolean }[] = [
  { label: "Jeans kürzen", cents: 1000 },
  { label: "Jeans kürzen mit Originalsaum", cents: 1500 },
  { label: "Stoffhose kürzen", cents: 1500 },
  { label: "Hose enger oder weiter machen", cents: 1500 },
  { label: "Ärmel anpassen", cents: 1500, from: true },
  { label: "Kleid kürzen", cents: 2500, from: true },
];

/** Reads the percentage from a partner's discount text ("10 %"); null if it isn't a percentage. */
export function discountPercent(discount: string): number | null {
  const match = discount.match(/(\d+(?:[.,]\d+)?)\s*%/);
  return match ? Number(match[1].replace(",", ".")) : null;
}

/** "10 €", "13,50 €", or "ab 15 €". Whole euros drop the decimals. */
export function formatPrice(cents: number, from = false): string {
  const amount = (cents / 100).toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
  return from ? `ab ${amount}` : amount;
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
