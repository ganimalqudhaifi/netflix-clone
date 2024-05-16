import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/utils';
 
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userId = token ? await verifyToken(token) : null;

  if (!token || !userId)  {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  matcher: ['/:path', '/browse/:path*', '/video/:path*']
}