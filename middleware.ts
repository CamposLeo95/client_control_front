import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/app"];

export function middleware(request: NextRequest) {
  if( PROTECTED_PATHS.some(path => request.nextUrl.pathname.startsWith(path))) {
    const token = request.cookies.get("api-token")?.value;
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("from", request.nextUrl.pathname);
      return NextResponse.redirect(url, 302);
    }

  }

return NextResponse.next(); 
}

export const config = {
  matcher: ['/app/:path*']
}