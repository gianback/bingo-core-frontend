import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "./services/validate-token.service";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token") as RequestCookie;

  if (
    request.nextUrl.pathname.startsWith("/play-game") ||
    request.nextUrl.pathname === "/"
  ) {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
    const statusCode = await validateToken(token.value);

    if (statusCode === 401) {
      request.cookies.delete("token");
      request.cookies.set("token", "");

      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  }
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    if (!token) return NextResponse.next();

    const statusCode = await validateToken(token.value);

    return statusCode === 401
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/play-game/:path*", "/login", "/register"],
};
