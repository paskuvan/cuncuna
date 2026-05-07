import { NextResponse } from 'next/server';
import { createClient } from '../../lib/supabase-server';

// ============================================================
// POST /api/waitlist
// Registra un email en la lista de espera.
// ============================================================

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validación básica
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email requerido' },
        { status: 400 }
      );
    }

    // Validar formato de email (regex simple pero efectiva)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from('waitlist')
      .insert({ email: email.toLowerCase().trim(), origen: 'landing' });

    if (error) {
      // 23505 = email duplicado
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Este email ya está registrado', duplicado: true },
          { status: 200 }
        );
      }
      console.error('Error en waitlist:', error);
      return NextResponse.json(
        { error: 'No pudimos registrarte. Intenta de nuevo.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error inesperado:', err);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}
