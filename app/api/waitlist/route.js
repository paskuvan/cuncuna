import { NextResponse } from 'next/server';
import { createClient } from '../../lib/supabase-server';

// ============================================================
// POST /api/waitlist
// Registra un email en la lista de espera.
// ============================================================

async function notificarNuevoRegistro({ email, origen }) {
  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.WAITLIST_NOTIFY_TO;
  const remitente =
    process.env.WAITLIST_NOTIFY_FROM || 'Cuncuna <onboarding@resend.dev>';

  if (!apiKey || !destino) return;

  const respuesta = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: remitente,
      to: destino,
      subject: 'Nuevo registro en la lista de espera de Cuncuna',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h1>Nuevo registro en Cuncuna</h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Origen:</strong> ${origen}</p>
          <p>Este correo fue enviado automáticamente desde la lista de espera.</p>
        </div>
      `,
      text: `Nuevo registro en Cuncuna\nEmail: ${email}\nOrigen: ${origen}`,
    }),
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.text();
    throw new Error(`Resend respondió ${respuesta.status}: ${detalle}`);
  }
}

export async function POST(request) {
  try {
    const { email, origen = 'landing' } = await request.json();

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
    const origenSeguro =
      typeof origen === 'string'
        ? origen.toLowerCase().trim().slice(0, 80)
        : 'landing';

    const emailNormalizado = email.toLowerCase().trim();

    const { error } = await supabase
      .from('waitlist')
      .insert({ email: emailNormalizado, origen: origenSeguro || 'landing' });

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

    try {
      await notificarNuevoRegistro({
        email: emailNormalizado,
        origen: origenSeguro || 'landing',
      });
    } catch (errorNotificacion) {
      console.error('Error notificando waitlist:', errorNotificacion);
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
