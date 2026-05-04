import { NextResponse } from 'next/server';
import { createClient } from '../../lib/supabase-server';

// ============================================================
// /auth/callback
// Google redirige aquí después del login.
// Intercambiamos el código por una sesión y redirigimos al inicio.
// ============================================================

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Si algo falla, volver al login
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
