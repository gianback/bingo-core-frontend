import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token") as RequestCookie;
  if (
    request.nextUrl.pathname.startsWith("/play-game") ||
    request.nextUrl.pathname === "/"
  ) {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
    try {
      await jose.jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return NextResponse.next();
    } catch (error) {
      request.cookies.delete("token");
      request.cookies.set("token", "");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    if (!token) return NextResponse.next();
    try {
      await jose.jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/play-game/:path*", "/login", "/register"],
};
