import "server-only";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { randomInt } from "node:crypto";

export type PartnerKind = "mode" | "braut";

export interface Partner {
  id: number;
  slug: string;
  name: string;
  kind: PartnerKind;
  address: string;
  contact: string;
  discount: string;
  validDays: number;
  active: boolean;
  createdAt: string;
}

export interface PartnerStats extends Partner {
  issued: number;
  redeemed: number;
  revenueCents: number;
}

export interface Code {
  code: string;
  partnerId: number;
  createdAt: string;
  expiresAt: string;
  redeemedAt: string | null;
  amountCents: number | null;
}

export const DEFAULT_VALID_DAYS: Record<PartnerKind, number> = { mode: 30, braut: 90 };

// No 0/O, 1/I/L, 5/S, 8/B — the code is read aloud and typed in by hand.
const ALPHABET = "234679ACDEFGHJKMNPQRTUVWXYZ";
const CODE_LENGTH = 4;

let db: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (db) return db;
  const dir = process.env.DATA_DIR || path.join(process.cwd(), "data");
  mkdirSync(dir, { recursive: true });
  db = new DatabaseSync(path.join(dir, "partners.db"));
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      kind TEXT NOT NULL CHECK (kind IN ('mode', 'braut')),
      address TEXT NOT NULL DEFAULT '',
      contact TEXT NOT NULL DEFAULT '',
      discount TEXT NOT NULL DEFAULT '10 %',
      valid_days INTEGER NOT NULL DEFAULT 30,
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
    CREATE TABLE IF NOT EXISTS codes (
      code TEXT PRIMARY KEY,
      partner_id INTEGER NOT NULL REFERENCES partners(id),
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      expires_at TEXT NOT NULL,
      redeemed_at TEXT,
      amount_cents INTEGER
    );
    CREATE INDEX IF NOT EXISTS codes_partner ON codes(partner_id);
  `);
  return db;
}

type Row = Record<string, unknown>;

function toPartner(r: Row): Partner {
  return {
    id: Number(r.id),
    slug: String(r.slug),
    name: String(r.name),
    kind: r.kind as PartnerKind,
    address: String(r.address),
    contact: String(r.contact),
    discount: String(r.discount),
    validDays: Number(r.valid_days),
    active: Number(r.active) === 1,
    createdAt: String(r.created_at),
  };
}

function toCode(r: Row): Code {
  return {
    code: String(r.code),
    partnerId: Number(r.partner_id),
    createdAt: String(r.created_at),
    expiresAt: String(r.expires_at),
    redeemedAt: r.redeemed_at == null ? null : String(r.redeemed_at),
    amountCents: r.amount_cents == null ? null : Number(r.amount_cents),
  };
}

export function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "partner"
  );
}

export function getPartnerBySlug(slug: string): Partner | null {
  const r = getDb().prepare("SELECT * FROM partners WHERE slug = ?").get(slug) as Row | undefined;
  return r ? toPartner(r) : null;
}

export function getPartnerById(id: number): Partner | null {
  const r = getDb().prepare("SELECT * FROM partners WHERE id = ?").get(id) as Row | undefined;
  return r ? toPartner(r) : null;
}

export function listPartnerStats(): PartnerStats[] {
  const rows = getDb()
    .prepare(
      `SELECT p.*,
              COUNT(c.code) AS issued,
              COUNT(c.redeemed_at) AS redeemed,
              COALESCE(SUM(c.amount_cents), 0) AS revenue_cents
         FROM partners p
         LEFT JOIN codes c ON c.partner_id = p.id
        GROUP BY p.id
        ORDER BY p.active DESC, redeemed DESC, p.name`,
    )
    .all() as Row[];
  return rows.map((r) => ({
    ...toPartner(r),
    issued: Number(r.issued),
    redeemed: Number(r.redeemed),
    revenueCents: Number(r.revenue_cents),
  }));
}

export function createPartner(input: {
  name: string;
  kind: PartnerKind;
  address: string;
  contact: string;
  discount: string;
}): Partner {
  const d = getDb();
  const base = slugify(input.name);
  let slug = base;
  for (let i = 2; d.prepare("SELECT 1 FROM partners WHERE slug = ?").get(slug); i++) {
    slug = `${base}-${i}`;
  }
  const r = d
    .prepare(
      `INSERT INTO partners (slug, name, kind, address, contact, discount, valid_days)
       VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`,
    )
    .get(
      slug,
      input.name,
      input.kind,
      input.address,
      input.contact,
      input.discount || "10 %",
      DEFAULT_VALID_DAYS[input.kind],
    ) as Row;
  return toPartner(r);
}

export function setPartnerActive(id: number, active: boolean): void {
  getDb().prepare("UPDATE partners SET active = ? WHERE id = ?").run(active ? 1 : 0, id);
}

/** Removes the partner and all of its codes. Their QR links then show the 404 page. */
export function deletePartner(id: number): void {
  const d = getDb();
  d.exec("BEGIN");
  try {
    d.prepare("DELETE FROM codes WHERE partner_id = ?").run(id);
    d.prepare("DELETE FROM partners WHERE id = ?").run(id);
    d.exec("COMMIT");
  } catch (e) {
    d.exec("ROLLBACK");
    throw e;
  }
}

function randomCode(): string {
  let s = "";
  for (let i = 0; i < CODE_LENGTH; i++) s += ALPHABET[randomInt(ALPHABET.length)];
  return `K-${s}`;
}

export function issueCode(partner: Partner): Code {
  const d = getDb();
  const expires = new Date(Date.now() + partner.validDays * 86_400_000).toISOString();
  for (let attempt = 0; attempt < 20; attempt++) {
    const code = randomCode();
    if (d.prepare("SELECT 1 FROM codes WHERE code = ?").get(code)) continue;
    const r = d
      .prepare("INSERT INTO codes (code, partner_id, expires_at) VALUES (?, ?, ?) RETURNING *")
      .get(code, partner.id, expires) as Row;
    return toCode(r);
  }
  throw new Error("Could not allocate a unique code");
}

/** Accepts "k7f3a", "K-7F3A", " 7f3a " … and returns the canonical form, or null. */
export function normalizeCode(raw: string): string | null {
  const body = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^K(?=.{4}$)/, "");
  if (body.length !== CODE_LENGTH) return null;
  for (const ch of body) if (!ALPHABET.includes(ch)) return null;
  return `K-${body}`;
}

export function getCode(code: string): Code | null {
  const r = getDb().prepare("SELECT * FROM codes WHERE code = ?").get(code) as Row | undefined;
  return r ? toCode(r) : null;
}

/** Marks the code redeemed. Returns false if it was already redeemed (or doesn't exist). */
export function redeemCode(code: string, amountCents: number | null): boolean {
  const res = getDb()
    .prepare(
      `UPDATE codes SET redeemed_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), amount_cents = ?
        WHERE code = ? AND redeemed_at IS NULL`,
    )
    .run(amountCents, code);
  return Number(res.changes) === 1;
}

export function recentRedemptions(limit = 15): (Code & { partnerName: string })[] {
  const rows = getDb()
    .prepare(
      `SELECT c.*, p.name AS partner_name FROM codes c JOIN partners p ON p.id = c.partner_id
        WHERE c.redeemed_at IS NOT NULL ORDER BY c.redeemed_at DESC LIMIT ?`,
    )
    .all(limit) as Row[];
  return rows.map((r) => ({ ...toCode(r), partnerName: String(r.partner_name) }));
}
