import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "admin_session";
const ADMIN_COOKIE_TOKEN = process.env.ADMIN_COOKIE_TOKEN;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page and login API through without a session
  if (pathname.startsWith("/admin/login") || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // Only enforce protection for /admin and /api/admin routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  // If we don't have a configured token, fail closed for safety
  if (!ADMIN_COOKIE_TOKEN) {
    if (isAdminRoute) {
      const loginUrl = new URL("/admin/login", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
    return new NextResponse("Admin not configured", { status: 500 });
  }

  const isValid = cookie === ADMIN_COOKIE_TOKEN;

  if (isValid) {
    return NextResponse.next();
  }

  if (isAdminRoute) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  // For API routes, return 401 instead of redirecting HTML
  if (isAdminApiRoute) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};


