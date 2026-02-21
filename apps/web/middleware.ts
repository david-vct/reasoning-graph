import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  // Si pas de session, rediriger vers login avec callbackUrl
  if (!req.auth) {
    const url = new URL('/login', req.url);
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/editor/:path*', '/my-graphs/:path*', '/api/graphs/:path*'],
};
