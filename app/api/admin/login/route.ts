import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_COOKIE_TOKEN = process.env.ADMIN_COOKIE_TOKEN;
  const ADMIN_COOKIE_NAME = "admin_session";

  if (!ADMIN_PASSWORD || !ADMIN_COOKIE_TOKEN) {
    return NextResponse.json(
      { error: "Admin not configured. Set ADMIN_PASSWORD and ADMIN_COOKIE_TOKEN env vars." },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null) as { password?: string } | null;

  if (!body || typeof body.password !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set(ADMIN_COOKIE_NAME, ADMIN_COOKIE_TOKEN, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}


