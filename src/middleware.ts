import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token") as RequestCookie;

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/check-status`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
  const { statusCode } = await resp.json();
  if (
    request.nextUrl.pathname.startsWith("/play-game") ||
    request.nextUrl.pathname === "/"
  ) {
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
    if (statusCode === 401) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/play-game/:path*", "/login", "/register"],
};
