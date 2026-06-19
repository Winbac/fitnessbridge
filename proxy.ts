
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ Change function name to "proxy"
export function proxy(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};