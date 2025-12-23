import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_COOKIE_TOKEN = process.env.ADMIN_COOKIE_TOKEN;
  const ADMIN_COOKIE_NAME = "admin_session";

  console.log("=== LOGIN DEBUG ===");
  console.log("ADMIN_PASSWORD env:", ADMIN_PASSWORD ? `SET (${ADMIN_PASSWORD.length} chars)` : "NOT SET");
  console.log("ADMIN_COOKIE_TOKEN env:", ADMIN_COOKIE_TOKEN ? "SET" : "NOT SET");

  if (!ADMIN_PASSWORD || !ADMIN_COOKIE_TOKEN) {
    console.log("ERROR: Missing env vars");
    return NextResponse.json(
      { error: "Admin not configured. Set ADMIN_PASSWORD and ADMIN_COOKIE_TOKEN env vars." },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null) as { password?: string } | null;
  console.log("Request body:", body);

  if (!body || typeof body.password !== "string") {
    console.log("ERROR: Invalid body");
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  console.log("Password received:", body.password);
  console.log("Password expected:", ADMIN_PASSWORD);
  console.log("Match:", body.password === ADMIN_PASSWORD);

  if (body.password !== ADMIN_PASSWORD) {
    console.log("ERROR: Password mismatch");
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


