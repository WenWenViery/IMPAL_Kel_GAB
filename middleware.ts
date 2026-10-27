import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt'; // Pastikan @/lib/jwt

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const { pathname } = req.nextUrl;

  const isProtected = pathname.startsWith('/dashboard');
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (isAuthPage && token) {
    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};