import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //   let cookie = request.cookies.get("token");
  if (
    request.nextUrl.pathname.startsWith("/play-game") ||
    request.nextUrl.pathname.startsWith("/")
  ) {
    // if(!token){
    //     return NextResponse.redirect(new URL("/login", request.url));
    // }else{
    //     return NextResponse.next();
    // }
  }
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    // if(token){
    //     return NextResponse.redirect(new URL("/", request.url));
    // }else{
    //     return NextResponse.next();
    // }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/play-game/:path*", "/login", "/register"],
};
