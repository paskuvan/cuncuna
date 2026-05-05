// ============================================================
// CATÁLOGO DE LOGROS DE CUNCUNA
//
// Cada logro tiene:
//   - id: identificador único (no lo cambies después de lanzar)
//   - titulo, descripcion: lo que ve el usuario
//   - emoji: ícono visual
//   - color: de la paleta neobrutalista
//   - condicion: función que recibe `stats` y retorna true si lo desbloquea
//
// stats incluye:
//   - leccionesCompletadas: array de IDs
//   - xpTotal: número
//   - racha: número
//   - videosVistos: número
//   - quizzesAcertados: número
//   - totalLeccionesNivel(nivelId): helper
//   - leccionesCompletadasNivel(nivelId): helper
// ============================================================

import { CURRICULUM } from './curriculum';

const totalLeccionesNivel = (nivelId) => {
  const nivel = CURRICULUM.find((n) => n.id === nivelId);
  return nivel?.lecciones.length ?? 0;
};

const leccionesCompletadasNivel = (nivelId, leccionesCompletadas) => {
  const nivel = CURRICULUM.find((n) => n.id === nivelId);
  if (!nivel) return 0;
  return nivel.lecciones.filter((l) => leccionesCompletadas.includes(l.id)).length;
};

const totalLecciones = () =>
  CURRICULUM.reduce((acc, n) => acc + n.lecciones.length, 0);

export const LOGROS = [
  // ─── HITOS DE INICIO ──────────────────────────────────────
  {
    id: 'primera-cuncuna',
    titulo: 'Primera Cuncuna',
    descripcion: 'Completaste tu primera lección',
    emoji: '🌱',
    color: '#7FFF6B',
    condicion: (stats) => stats.leccionesCompletadas.length >= 1,
  },

  // ─── XP ──────────────────────────────────────────────────
  {
    id: 'xp-100',
    titulo: '100 XP',
    descripcion: 'Acumulaste 100 puntos de experiencia',
    emoji: '⭐',
    color: '#FFD23F',
    condicion: (stats) => stats.xpTotal >= 100,
  },
  {
    id: 'xp-500',
    titulo: '500 XP',
    descripcion: 'Acumulaste 500 puntos de experiencia',
    emoji: '🏆',
    color: '#FFD23F',
    condicion: (stats) => stats.xpTotal >= 500,
  },

  // ─── NIVELES COMPLETOS ───────────────────────────────────
  {
    id: 'nivel-1-completo',
    titulo: 'Saludador',
    descripcion: 'Completaste el Nivel 1 · Fundamentos',
    emoji: '👋',
    color: '#FFD23F',
    condicion: (stats) =>
      leccionesCompletadasNivel('nivel-1', stats.leccionesCompletadas) ===
      totalLeccionesNivel('nivel-1'),
  },
  {
    id: 'nivel-2-completo',
    titulo: 'Familiar',
    descripcion: 'Completaste el Nivel 2 · Vida cotidiana',
    emoji: '🏠',
    color: '#FF6B9D',
    condicion: (stats) =>
      leccionesCompletadasNivel('nivel-2', stats.leccionesCompletadas) ===
      totalLeccionesNivel('nivel-2'),
  },
  {
    id: 'nivel-3-completo',
    titulo: 'Conversador',
    descripcion: 'Completaste el Nivel 3 · Conversación',
    emoji: '💬',
    color: '#4ECDC4',
    condicion: (stats) =>
      leccionesCompletadasNivel('nivel-3', stats.leccionesCompletadas) ===
      totalLeccionesNivel('nivel-3'),
  },

  // ─── CONSISTENCIA ────────────────────────────────────────
  {
    id: 'racha-3',
    titulo: 'En llamas',
    descripcion: 'Completaste 3 lecciones seguidas',
    emoji: '🔥',
    color: '#FF6B9D',
    condicion: (stats) => stats.racha >= 3,
  },
  {
    id: 'racha-7',
    titulo: 'Semana en fuego',
    descripcion: 'Una semana completa de práctica',
    emoji: '🔥',
    color: '#FF6B9D',
    condicion: (stats) => stats.racha >= 7,
  },
  {
    id: 'racha-30',
    titulo: 'Imparable',
    descripcion: '30 lecciones de pura constancia',
    emoji: '🔥',
    color: '#FF6B6B',
    condicion: (stats) => stats.racha >= 30,
  },

  // ─── ACTIVIDAD ───────────────────────────────────────────
  {
    id: 'observador',
    titulo: 'Observador',
    descripcion: 'Viste 10 videos de señas',
    emoji: '📹',
    color: '#4ECDC4',
    condicion: (stats) => stats.videosVistos >= 10,
  },
  {
    id: 'quiz-master',
    titulo: 'Quiz Master',
    descripcion: 'Respondiste 20 quizzes correctamente',
    emoji: '🎯',
    color: '#7FFF6B',
    condicion: (stats) => stats.quizzesAcertados >= 20,
  },

  // ─── HITO FINAL ─────────────────────────────────────────
  {
    id: 'mariposa',
    titulo: 'Cuncuna Mariposa',
    descripcion: 'Completaste todo el curso. ¡Te transformaste!',
    emoji: '🦋',
    color: '#FFD23F',
    condicion: (stats) =>
      stats.leccionesCompletadas.length === totalLecciones(),
  },
];

/**
 * Verifica qué logros nuevos ha desbloqueado el usuario
 * comparando los logros que cumple ahora vs los que ya tiene.
 *
 * @returns array de logros nuevos (los que aún no tenía)
 */
export const detectarLogrosNuevos = (stats, logrosObtenidos) => {
  return LOGROS.filter(
    (logro) =>
      logro.condicion(stats) && !logrosObtenidos.includes(logro.id)
  );
};
