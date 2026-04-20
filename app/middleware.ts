import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  // Check if the user has our JWT cookie
  const token = request.cookies.get('admin_token');

  // If they are trying to access the dashboard BUT don't have a token, kick them to login
  if (request.nextUrl.pathname.startsWith('/admin/dashboard') && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Otherwise, let them through
  return NextResponse.next();
}

// Tell Middleware to only run on admin routes
export const config = {
  matcher: '/admin/:path*',
};