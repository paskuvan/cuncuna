'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '../lib/supabase-client';

// ============================================================
// HOOK: useProgreso (versión Supabase)
// Reemplaza la versión en memoria. Ahora:
//   - Carga el progreso del usuario logueado al montar
//   - Sincroniza completarLeccion() con la base de datos
//   - Registra videos vistos y quizzes acertados (para logros)
//   - El estado local es solo cache de lo que ya está en BD
// ============================================================

export const useProgreso = () => {
  const [progreso, setProgreso] = useState({
    leccionesCompletadas: [],
    xpTotal: 0,
    racha: 0,
    videosVistos: 0,
    quizzesAcertados: 0,
    cargando: true,
  });

  // Cargar progreso al montar
  useEffect(() => {
    const cargarProgreso = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setProgreso(p => ({ ...p, cargando: false }));
        return;
      }

      // Stats globales
      const { data: stats } = await supabase
        .from('progreso')
        .select('xp_total, racha, videos_vistos, quizzes_acertados')
        .eq('user_id', user.id)
        .single();

      // Lecciones completadas
      const { data: lecciones } = await supabase
        .from('lecciones_completadas')
        .select('leccion_id')
        .eq('user_id', user.id);

      setProgreso({
        leccionesCompletadas: lecciones?.map(l => l.leccion_id) ?? [],
        xpTotal: stats?.xp_total ?? 0,
        racha: stats?.racha ?? 0,
        videosVistos: stats?.videos_vistos ?? 0,
        quizzesAcertados: stats?.quizzes_acertados ?? 0,
        cargando: false,
      });
    };

    cargarProgreso();
  }, []);

  // Completar lección: actualiza BD y estado local.
  // Devuelve los stats actualizados para verificar logros.
  const completarLeccion = useCallback(async (leccionId, xp) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Evitar duplicar si ya está completada
    if (progreso.leccionesCompletadas.includes(leccionId)) return null;

    // 1. Insertar lección completada
    const { error: errorLeccion } = await supabase
      .from('lecciones_completadas')
      .insert({ user_id: user.id, leccion_id: leccionId });

    if (errorLeccion && errorLeccion.code !== '23505') {
      // 23505 = unique violation (ya existía), no es error real
      console.error('Error al completar lección:', errorLeccion);
      return null;
    }

    // 2. Actualizar progreso global (XP + racha)
    const nuevoXp = progreso.xpTotal + xp;
    const nuevaRacha = progreso.racha + 1;

    // Usamos upsert para crear la fila si el usuario aún no tiene una
    // (evita perder el progreso si no existe un trigger que la cree).
    await supabase
      .from('progreso')
      .upsert(
        {
          user_id: user.id,
          xp_total: nuevoXp,
          racha: nuevaRacha,
          ultimo_dia: new Date().toISOString().split('T')[0],
          actualizado_en: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

    // 3. Actualizar estado local
    const nuevasLecciones = [...progreso.leccionesCompletadas, leccionId];
    setProgreso(prev => ({
      ...prev,
      leccionesCompletadas: nuevasLecciones,
      xpTotal: nuevoXp,
      racha: nuevaRacha,
    }));

    // 4. Devolver stats para verificar logros
    return {
      leccionesCompletadas: nuevasLecciones,
      xpTotal: nuevoXp,
      racha: nuevaRacha,
      videosVistos: progreso.videosVistos,
      quizzesAcertados: progreso.quizzesAcertados,
    };
  }, [
    progreso.xpTotal,
    progreso.racha,
    progreso.leccionesCompletadas,
    progreso.videosVistos,
    progreso.quizzesAcertados,
  ]);

  // Registrar que el usuario vio un video (para el logro de videos vistos).
  const registrarVideoVisto = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const nuevoValor = progreso.videosVistos + 1;

    await supabase
      .from('progreso')
      .upsert(
        {
          user_id: user.id,
          videos_vistos: nuevoValor,
          actualizado_en: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

    setProgreso(prev => ({ ...prev, videosVistos: prev.videosVistos + 1 }));

    return {
      leccionesCompletadas: progreso.leccionesCompletadas,
      xpTotal: progreso.xpTotal,
      racha: progreso.racha,
      videosVistos: nuevoValor,
      quizzesAcertados: progreso.quizzesAcertados,
    };
  }, [
    progreso.videosVistos,
    progreso.leccionesCompletadas,
    progreso.xpTotal,
    progreso.racha,
    progreso.quizzesAcertados,
  ]);

  // Registrar un quiz acertado (para el logro de quizzes acertados).
  const registrarQuizAcertado = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const nuevoValor = progreso.quizzesAcertados + 1;

    await supabase
      .from('progreso')
      .upsert(
        {
          user_id: user.id,
          quizzes_acertados: nuevoValor,
          actualizado_en: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

    setProgreso(prev => ({ ...prev, quizzesAcertados: prev.quizzesAcertados + 1 }));

    return {
      leccionesCompletadas: progreso.leccionesCompletadas,
      xpTotal: progreso.xpTotal,
      racha: progreso.racha,
      videosVistos: progreso.videosVistos,
      quizzesAcertados: nuevoValor,
    };
  }, [
    progreso.quizzesAcertados,
    progreso.leccionesCompletadas,
    progreso.xpTotal,
    progreso.racha,
    progreso.videosVistos,
  ]);

  // Reiniciar progreso (borra todo en BD)
  const reiniciar = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('lecciones_completadas')
      .delete()
      .eq('user_id', user.id);

    await supabase
      .from('progreso')
      .upsert(
        {
          user_id: user.id,
          xp_total: 0,
          racha: 0,
          videos_vistos: 0,
          quizzes_acertados: 0,
          ultimo_dia: null,
        },
        { onConflict: 'user_id' }
      );

    setProgreso({
      leccionesCompletadas: [],
      xpTotal: 0,
      racha: 0,
      videosVistos: 0,
      quizzesAcertados: 0,
      cargando: false,
    });
  }, []);

  return {
    progreso,
    completarLeccion,
    registrarVideoVisto,
    registrarQuizAcertado,
    reiniciar,
  };
};
