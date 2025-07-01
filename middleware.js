// middleware.js

import { NextResponse } from 'next/server';

// Fungsi middleware ini akan berjalan untuk rute yang cocok
export function middleware(request) {
  // Arahkan semua permintaan yang cocok ke halaman utama ('/')
  // Ini secara efektif memblokir akses ke halaman yang ditentukan di 'matcher'
  console.log('Middleware dijalankan, mengalihkan dari:', request.nextUrl.pathname);
  return NextResponse.redirect(new URL('/', request.url));
}

// Konfigurasi untuk menentukan rute mana yang akan dilindungi oleh middleware
export const config = {
  // Lindungi semua rute yang dimulai dengan '/admin'
  // Contoh: /admin, /admin/users, /admin/settings, dll.
  matcher: '/admin/:path*',
};