import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authSession = request.cookies.get("firebase-auth-token")?.value;

  // Si intenta acceder al dashboard sin estar autenticado
  if (request.nextUrl.pathname.startsWith("/dashboard") && !authSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si intenta acceder a login estando autenticado
  if (request.nextUrl.pathname.startsWith("/login") && authSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
