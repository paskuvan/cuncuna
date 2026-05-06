'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '../lib/supabase-client';
import { detectarLogrosNuevos, LOGROS } from '../data/logros';

// ============================================================
// HOOK: useLogros (versión con verificación retroactiva)
// ⚠️ REEMPLAZA el useLogros anterior.
//
// CAMBIO IMPORTANTE:
// Ahora acepta `progreso` como parámetro y verifica logros
// AUTOMÁTICAMENTE al cargar, no solo al completar lecciones.
// Esto soluciona el caso en que el usuario tenía progreso antes
// de que existiera el sistema de logros.
// ============================================================

export const useLogros = (progreso) => {
  const [logrosObtenidos, setLogrosObtenidos] = useState([]);
  const [logrosNuevos, setLogrosNuevos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [yaVerificadoRetroactivamente, setYaVerificadoRetroactivamente] = useState(false);

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
   * Verifica logros sin mostrar modal (para verificación retroactiva silenciosa).
   * Útil al cargar la app: si ya tenías logros pendientes, los guarda.
   */
  const verificarSilencioso = useCallback(async (stats) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const nuevos = detectarLogrosNuevos(stats, logrosObtenidos);
    if (nuevos.length === 0) return;

    const inserts = nuevos.map((logro) => ({
      user_id: user.id,
      logro_id: logro.id,
    }));

    const { error } = await supabase.from('logros_obtenidos').insert(inserts);
    if (error && error.code !== '23505') {
      console.error('Error guardando logros retroactivos:', error);
      return;
    }

    setLogrosObtenidos((prev) => [...prev, ...nuevos.map((l) => l.id)]);
    // ⚠️ Sí mostramos el modal aunque sea retroactivo, para que el usuario
    // vea que desbloqueó algo. Si prefieres no mostrar modal en retroactivo,
    // comenta la línea de abajo.
    setLogrosNuevos(nuevos);
  }, [logrosObtenidos]);

  // Verificación retroactiva: al cargar, si ya tienes progreso pero te
  // faltan logros que te corresponden, los detecta y guarda.
  useEffect(() => {
    if (
      !cargando &&
      !progreso?.cargando &&
      !yaVerificadoRetroactivamente &&
      progreso
    ) {
      const stats = {
        leccionesCompletadas: progreso.leccionesCompletadas,
        xpTotal: progreso.xpTotal,
        racha: progreso.racha,
        videosVistos: progreso.videosVistos ?? 0,
        quizzesAcertados: progreso.quizzesAcertados ?? 0,
      };
      verificarSilencioso(stats);
      setYaVerificadoRetroactivamente(true);
    }
  }, [cargando, progreso, yaVerificadoRetroactivamente, verificarSilencioso]);

  /** Verificación normal (al completar lección) */
  const verificarLogros = useCallback(
    async (stats) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const nuevos = detectarLogrosNuevos(stats, logrosObtenidos);
      if (nuevos.length === 0) return;

      const inserts = nuevos.map((logro) => ({
        user_id: user.id,
        logro_id: logro.id,
      }));

      const { error } = await supabase.from('logros_obtenidos').insert(inserts);
      if (error && error.code !== '23505') {
        console.error('Error guardando logros:', error);
        return;
      }

      setLogrosObtenidos((prev) => [...prev, ...nuevos.map((l) => l.id)]);
      setLogrosNuevos(nuevos);
    },
    [logrosObtenidos]
  );

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
