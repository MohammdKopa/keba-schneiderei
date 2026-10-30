import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCode, getPartnerBySlug, issueCode } from "@/lib/partners/db";
import { clientIp, rateLimit } from "@/lib/partners/auth";
import { codeCookieName, isCodeUsable } from "@/lib/partners/codes";

export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner || !partner.active) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const cookieName = codeCookieName(slug);
  const existing = (await cookies()).get(cookieName)?.value;
  if (existing) {
    const code = getCode(existing);
    if (code && code.partnerId === partner.id && isCodeUsable(code, true)) {
      return NextResponse.json(code);
    }
  }

  if (!rateLimit(`claim:${await clientIp()}`, 10, 3_600_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const code = issueCode(partner);
  const res = NextResponse.json(code);
  res.cookies.set(cookieName, code.code, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: partner.validDays * 86_400,
  });
  return res;
}
