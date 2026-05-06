'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '../lib/supabase-client';
import { detectarLogrosNuevos, LOGROS } from '../data/logros';

// ============================================================
// HOOK: useLogros
// Gestiona el estado de logros del usuario:
//   - Carga los logros obtenidos al montar
//   - verificarLogros(stats) → detecta y guarda logros nuevos
//   - Devuelve logros nuevos para que la UI los celebre
// ============================================================

export const useLogros = () => {
  const [logrosObtenidos, setLogrosObtenidos] = useState([]);
  const [logrosNuevos, setLogrosNuevos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const supabase = createClient();

  // Cargar logros al montar
  useEffect(() => {
    const cargar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCargando(false);
        return;
      }

      const { data } = await supabase
        .from('logros_obtenidos')
        .select('logro_id')
        .eq('user_id', user.id);

      setLogrosObtenidos(data?.map((l) => l.logro_id) ?? []);
      setCargando(false);
    };

    cargar();
  }, []);

  /**
   * Verifica si el usuario desbloqueó logros nuevos según sus stats actuales.
   * Si hay nuevos: los guarda en BD y los pone en `logrosNuevos` para que la UI los muestre.
   */
  const verificarLogros = useCallback(
    async (stats) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const nuevos = detectarLogrosNuevos(stats, logrosObtenidos);
      if (nuevos.length === 0) return;

      // Insertar en BD
      const inserts = nuevos.map((logro) => ({
        user_id: user.id,
        logro_id: logro.id,
      }));

      const { error } = await supabase.from('logros_obtenidos').insert(inserts);
      if (error && error.code !== '23505') {
        console.error('Error guardando logros:', error);
        return;
      }

      // Actualizar estado local
      setLogrosObtenidos((prev) => [...prev, ...nuevos.map((l) => l.id)]);
      setLogrosNuevos(nuevos); // Para que la UI los celebre
    },
    [logrosObtenidos]
  );

  /** Limpiar la cola de logros nuevos (cuando el usuario cierra el modal) */
  const limpiarLogrosNuevos = useCallback(() => {
    setLogrosNuevos([]);
  }, []);

  return {
    logrosObtenidos,
    logrosNuevos,
    cargando,
    verificarLogros,
    limpiarLogrosNuevos,
    todosLosLogros: LOGROS,
  };
};
