'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../lib/supabase-client';

// ============================================================
// HOOK: useUsuario
// Devuelve el usuario logueado y función de logout.
// ============================================================

export function useUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Cargar usuario actual
    supabase.auth.getUser().then(({ data }) => {
      setUsuario(data.user);
      setCargando(false);
    });

    // Escuchar cambios de auth (login/logout en otras pestañas)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUsuario(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/'; // Redirigir al inicio después de cerrar sesión /login
  };

  return { usuario, cargando, cerrarSesion };
}
