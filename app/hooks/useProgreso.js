'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '../lib/supabase-client';

// ============================================================
// HOOK: useProgreso (versión Supabase)
// Reemplaza la versión en memoria. Ahora:
//   - Carga el progreso del usuario logueado al montar
//   - Sincroniza completarLeccion() con la base de datos
//   - El estado local es solo cache de lo que ya está en BD
// ============================================================

export const useProgreso = () => {
  const [progreso, setProgreso] = useState({
    leccionesCompletadas: [],
    xpTotal: 0,
    racha: 0,
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
        .select('xp_total, racha')
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
        cargando: false,
      });
    };

    cargarProgreso();
  }, []);

  // Completar lección: actualiza BD y estado local
  const completarLeccion = useCallback(async (leccionId, xp) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Evitar duplicar si ya está completada
    if (progreso.leccionesCompletadas.includes(leccionId)) return;

    // 1. Insertar lección completada
    const { error: errorLeccion } = await supabase
      .from('lecciones_completadas')
      .insert({ user_id: user.id, leccion_id: leccionId });

    if (errorLeccion && errorLeccion.code !== '23505') {
      // 23505 = unique violation (ya existía), no es error real
      console.error('Error al completar lección:', errorLeccion);
      return;
    }

    // 2. Actualizar progreso global (XP + racha)
    const nuevoXp = progreso.xpTotal + xp;
    const nuevaRacha = progreso.racha + 1;

    await supabase
      .from('progreso')
      .update({
        xp_total: nuevoXp,
        racha: nuevaRacha,
        ultimo_dia: new Date().toISOString().split('T')[0],
        actualizado_en: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    // 3. Actualizar estado local
    setProgreso(prev => ({
      ...prev,
      leccionesCompletadas: [...prev.leccionesCompletadas, leccionId],
      xpTotal: nuevoXp,
      racha: nuevaRacha,
    }));
  }, [progreso.xpTotal, progreso.racha, progreso.leccionesCompletadas]);

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
      .update({ xp_total: 0, racha: 0, ultimo_dia: null })
      .eq('user_id', user.id);

    setProgreso({
      leccionesCompletadas: [],
      xpTotal: 0,
      racha: 0,
      cargando: false,
    });
  }, []);

  return { progreso, completarLeccion, reiniciar };
};
