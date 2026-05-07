import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// ============================================================
// MIDDLEWARE (versión con landing pública)
// ⚠️ REEMPLAZA el middleware.js anterior.
//
// CAMBIOS:
//   - / es PÚBLICA (landing)
//   - /app/* es PROTEGIDA (requiere login)
//   - /login y /auth/callback siguen siendo públicas
//
// Si usuario logueado entra a /login → redirige a /app
// Si usuario no logueado entra a /app/* → redirige a /login
// ============================================================

export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Rutas que requieren autenticación (todas las que empiecen con /app)
  const requiereAuth = path.startsWith('/app');

  // Si necesita auth y no hay usuario → al login
  if (requiereAuth && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Si está logueado y va a /login → directo a la app
  if (user && path === '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/app';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logos|videos|posters|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
};
