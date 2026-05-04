'use client';

import { useState } from 'react';
import { createClient } from '../lib/supabase-client';

// ============================================================
// PÁGINA: /login
// Solo botón de Google, full neobrutalist, con la cuncuna grande
// ============================================================

export default function LoginPage() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const supabase = createClient();

  const loginConGoogle = async () => {
    setCargando(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
      <div
        className="bg-white border-[4px] border-black p-8 max-w-md w-full"
        style={{ boxShadow: '12px 12px 0 #000' }}
      >
        {/* Mascota / logo */}
        <div className="flex justify-center mb-6">
          <div
            className="bg-[#FFD23F] border-[4px] border-black p-6"
            style={{ boxShadow: '8px 8px 0 #FF6B9D' }}
          >
            <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <line x1="40" y1="22" x2="35" y2="6" stroke="#000" strokeWidth="3" strokeLinecap="round" />
              <line x1="60" y1="22" x2="65" y2="6" stroke="#000" strokeWidth="3" strokeLinecap="round" />
              <circle cx="35" cy="6" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />
              <circle cx="65" cy="6" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />
              <circle cx="50" cy="55" r="35" fill="#FFFFFF" stroke="#000" strokeWidth="4" />
              <circle cx="38" cy="48" r="8" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
              <circle cx="62" cy="48" r="8" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
              <circle cx="38" cy="48" r="4" fill="#000" />
              <circle cx="62" cy="48" r="4" fill="#000" />
              <circle cx="40" cy="46" r="1.5" fill="#FFFFFF" />
              <circle cx="64" cy="46" r="1.5" fill="#FFFFFF" />
              <path d="M 36 65 Q 50 75 64 65" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="28" cy="62" r="3.5" fill="#FF6B9D" />
              <circle cx="72" cy="62" r="3.5" fill="#FF6B9D" />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-black uppercase text-black text-center leading-none mb-2 tracking-tight">
          Cuncuna<span className="text-[#FF6B9D]">.</span>
        </h1>
        <p className="text-center text-black font-bold uppercase text-xs tracking-[0.2em] mb-8">
          De seña en seña
        </p>

        {/* Mensaje de bienvenida */}
        <div
          className="bg-[#FFD23F] border-[3px] border-black p-4 mb-6"
          style={{ boxShadow: '6px 6px 0 #000' }}
        >
          <p className="font-black text-black text-center uppercase text-sm">
            Bienvenida a la primera plataforma para aprender LSCh
          </p>
        </div>

        {/* Botón Google */}
        <button
          onClick={loginConGoogle}
          disabled={cargando}
          className="w-full bg-white border-[3px] border-black p-4 font-black uppercase text-base tracking-wider text-black flex items-center justify-center gap-3 transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0 disabled:opacity-50 disabled:cursor-wait"
          style={{ boxShadow: '6px 6px 0 #000' }}
        >
          {/* Logo Google SVG */}
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {cargando ? 'Conectando...' : 'Continuar con Google'}
        </button>

        {/* Error */}
        {error && (
          <div
            className="mt-4 bg-[#FF6B6B] border-[3px] border-black p-3 text-white font-black text-sm uppercase"
            style={{ boxShadow: '4px 4px 0 #000' }}
          >
            Error: {error}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-black/60 font-bold mt-6 uppercase tracking-wider">
          Hecho para la comunidad sorda
        </p>
      </div>
    </div>
  );
}
