import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  // 1. Extract the token from the browser cookies
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // 2. Protection Logic
  
  // IF: User is trying to access the Dashboard WITHOUT a token
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      // Redirect them to the login page
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // IF: User is already logged in and tries to go to Login/Signup
  // We want to skip the login screen and send them to the dashboard
  if (pathname.startsWith('/login')) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// 3. Matcher Configuration
// This ensures the middleware only runs for your app routes and not for 
// static files (images, favicon, etc.) or internal Next.js paths.
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/login',
  ],
};