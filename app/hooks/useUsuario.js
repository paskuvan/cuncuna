'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase-client';

// ============================================================
// HOOK: useUsuario
// Devuelve el usuario logueado y función de logout.
// ============================================================

export function useUsuario() {
  const router = useRouter();
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
    // Redirigir al inicio después de cerrar sesión y refrescar para que
    // el proxy re-evalúe la sesión.
    router.push('/');
    router.refresh();
  };

  return { usuario, cargando, cerrarSesion };
}
