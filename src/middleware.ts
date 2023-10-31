import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "./utils/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (
    request.nextUrl.pathname.startsWith("/play-game") ||
    request.nextUrl.pathname === "/"
  ) {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
    try {
      await validateToken(token.value);
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
      await validateToken(token.value);
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
