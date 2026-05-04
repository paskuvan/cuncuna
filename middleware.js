import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// ============================================================
// MIDDLEWARE
// Se ejecuta en CADA request. Hace dos cosas:
//   1. Refresca la sesión de Supabase (cookies)
//   2. Redirige a /login si el usuario no está autenticado
//      (excepto en /login y /auth/callback, claro)
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

  // Refrescar sesión
  const { data: { user } } = await supabase.auth.getUser();

  // Rutas públicas (no requieren login)
  const rutasPublicas = ['/login', '/auth/callback'];
  const esRutaPublica = rutasPublicas.some(ruta =>
    request.nextUrl.pathname.startsWith(ruta)
  );

  // Si NO está logueado y NO es ruta pública → redirigir a /login
  if (!user && !esRutaPublica) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Si SÍ está logueado y va a /login → redirigir al inicio
  if (user && request.nextUrl.pathname === '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return response;
}

// Aplicar middleware a todas las rutas excepto archivos estáticos
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logos|videos|posters|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
};
