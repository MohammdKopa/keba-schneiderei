"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createPartner,
  getCode,
  getPartnerById,
  normalizeCode,
  redeemCode,
  setPartnerActive,
  type PartnerKind,
} from "@/lib/partners/db";
import { checkPin, clientIp, endSession, isLoggedIn, rateLimit, startSession } from "@/lib/partners/auth";

async function requireLogin(): Promise<void> {
  if (!(await isLoggedIn())) redirect("/laden");
}

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  if (!rateLimit(`login:${await clientIp()}`, 5, 10 * 60_000)) {
    return "Zu viele Versuche. Bitte 10 Minuten warten.";
  }
  if (!checkPin(String(form.get("pin") ?? ""))) return "Falsche PIN.";
  await startSession();
  redirect("/laden");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/laden");
}

export type LookupResult =
  | { status: "invalid" | "not_found" }
  | {
      status: "valid" | "expired" | "redeemed";
      code: string;
      partnerName: string;
      discount: string;
      expiresAt: string;
      redeemedAt: string | null;
    };

export async function lookupCode(raw: string): Promise<LookupResult> {
  await requireLogin();
  const normalized = normalizeCode(raw);
  if (!normalized) return { status: "invalid" };
  const code = getCode(normalized);
  if (!code) return { status: "not_found" };
  const partner = getPartnerById(code.partnerId);
  const status = code.redeemedAt
    ? "redeemed"
    : new Date(code.expiresAt).getTime() < Date.now()
      ? "expired"
      : "valid";
  return {
    status,
    code: code.code,
    partnerName: partner?.name ?? "—",
    discount: partner?.discount ?? "",
    expiresAt: code.expiresAt,
    redeemedAt: code.redeemedAt,
  };
}

export async function redeem(code: string, amountEuro: string): Promise<boolean> {
  await requireLogin();
  const normalized = normalizeCode(code);
  if (!normalized) return false;
  const euros = Number(amountEuro.replace(",", "."));
  const cents = amountEuro.trim() && Number.isFinite(euros) && euros > 0 ? Math.round(euros * 100) : null;
  const ok = redeemCode(normalized, cents);
  revalidatePath("/laden");
  return ok;
}

export async function addPartner(_prev: string | null, form: FormData): Promise<string | null> {
  await requireLogin();
  const name = String(form.get("name") ?? "").trim();
  const kind: PartnerKind = form.get("kind") === "braut" ? "braut" : "mode";
  if (name.length < 2) return "Bitte einen Namen eingeben.";
  const partner = createPartner({
    name: name.slice(0, 80),
    kind,
    address: String(form.get("address") ?? "").trim().slice(0, 160),
    contact: String(form.get("contact") ?? "").trim().slice(0, 160),
    discount: String(form.get("discount") ?? "").trim().slice(0, 30),
  });
  revalidatePath("/laden");
  redirect(`/laden/partner/${partner.slug}/flyer`);
}

export async function togglePartner(id: number, active: boolean): Promise<void> {
  await requireLogin();
  setPartnerActive(id, active);
  revalidatePath("/laden");
}
