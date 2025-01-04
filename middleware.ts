import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define the paths that should be excluded from the middleware (public routes)
const PUBLIC_FILE = /\.(.*)$/;
const PUBLIC_PATHS = ["/login", "/signup", "/api/auth", "/favicon.ico"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the request if it's for a public file or a public path
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path)) || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // Get the token from NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token is found, redirect to the login page
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|auth/login|auth/signup|favicon.ico|public|_next/static|_next/image|assets).*)",
  ],
}; 