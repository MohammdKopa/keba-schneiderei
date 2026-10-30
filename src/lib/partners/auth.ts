import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";

const COOKIE = "keba_laden";
const SESSION_DAYS = 90;

function secret(): string | null {
  const s = process.env.SESSION_SECRET;
  return s && s.length >= 32 ? s : null;
}

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/** Fails closed: without SHOP_PIN and SESSION_SECRET nobody gets in. */
export function isConfigured(): boolean {
  return Boolean(process.env.SHOP_PIN && secret());
}

export function checkPin(pin: string): boolean {
  const expected = process.env.SHOP_PIN;
  if (!expected || !secret()) return false;
  return safeEqual(pin.trim(), expected);
}

export async function startSession(): Promise<void> {
  const key = secret();
  if (!key) return;
  const exp = String(Date.now() + SESSION_DAYS * 86_400_000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp, key)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export async function isLoggedIn(): Promise<boolean> {
  const key = secret();
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!key || !raw) return false;
  const [exp, sig] = raw.split(".");
  if (!exp || !sig || !safeEqual(sig, sign(exp, key))) return false;
  return Number(exp) > Date.now();
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("cf-connecting-ip") ||
    h.get("x-forwarded-for")?.split(",")[0].trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

const buckets = new Map<string, { count: number; resetAt: number }>();

/** In-memory fixed window. Single container, so this is enough. */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    if (buckets.size > 5000) buckets.clear();
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  b.count++;
  return b.count <= max;
}
