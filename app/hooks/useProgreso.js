'use client';

import { useState } from 'react';

// ============================================================
// HOOK: useProgreso
// Maneja el estado del progreso del usuario:
//   - Lecciones completadas
//   - XP total acumulado
//   - Racha de días/lecciones
//
// En el futuro, este hook se puede expandir para:
//   - Persistir en localStorage
//   - Sincronizar con backend (Supabase, Firebase)
//   - Manejar autenticación
// ============================================================

export const useProgreso = () => {
  const [progreso, setProgreso] = useState({
    leccionesCompletadas: [],
    xpTotal: 0,
    racha: 0,
    ultimoDia: null,
  });

  const completarLeccion = (leccionId, xp) => {
    setProgreso((prev) => {
      // Evita duplicar XP si la lección ya estaba completada
      if (prev.leccionesCompletadas.includes(leccionId)) return prev;

      return {
        ...prev,
        leccionesCompletadas: [...prev.leccionesCompletadas, leccionId],
        xpTotal: prev.xpTotal + xp,
        racha: prev.racha + 1,
      };
    });
  };

  const reiniciar = () => {
    setProgreso({
      leccionesCompletadas: [],
      xpTotal: 0,
      racha: 0,
      ultimoDia: null,
    });
  };

  return { progreso, completarLeccion, reiniciar };
};
