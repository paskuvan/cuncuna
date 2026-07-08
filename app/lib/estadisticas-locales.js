const STORAGE_KEY = 'cuncuna:estadisticas';

function leerStats() {
  if (typeof window === 'undefined') return crearStatsBase();

  try {
    return {
      ...crearStatsBase(),
      ...JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}'),
    };
  } catch {
    return crearStatsBase();
  }
}

function guardarStats(stats) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function crearStatsBase() {
  return {
    repasosCompletados: 0,
    respuestasCorrectas: 0,
    respuestasTotales: 0,
    senasVistas: 0,
    visitasDiccionario: 0,
    practicasErrores: 0,
    erroresRecuperados: 0,
    conversacionesCompletadas: 0,
    ultimaActividad: null,
  };
}

function conActividad(stats) {
  return {
    ...stats,
    ultimaActividad: new Date().toISOString(),
  };
}

export function obtenerEstadisticasLocales() {
  return leerStats();
}

export function registrarRepasoEstadisticas({ correctas, total, senasVistas }) {
  const stats = leerStats();
  const actualizadas = conActividad({
    ...stats,
    repasosCompletados: stats.repasosCompletados + 1,
    respuestasCorrectas: stats.respuestasCorrectas + correctas,
    respuestasTotales: stats.respuestasTotales + total,
    senasVistas: stats.senasVistas + senasVistas,
  });

  guardarStats(actualizadas);
  return actualizadas;
}

export function registrarDiccionarioEstadisticas() {
  const stats = leerStats();
  const actualizadas = conActividad({
    ...stats,
    visitasDiccionario: stats.visitasDiccionario + 1,
  });

  guardarStats(actualizadas);
  return actualizadas;
}

export function registrarPracticaErroresEstadisticas({ correctas, total }) {
  const stats = leerStats();
  const actualizadas = conActividad({
    ...stats,
    practicasErrores: stats.practicasErrores + 1,
    respuestasCorrectas: stats.respuestasCorrectas + correctas,
    respuestasTotales: stats.respuestasTotales + total,
    erroresRecuperados: stats.erroresRecuperados + correctas,
  });

  guardarStats(actualizadas);
  return actualizadas;
}

export function registrarConversacionEstadisticas({ correctas, total }) {
  const stats = leerStats();
  const actualizadas = conActividad({
    ...stats,
    conversacionesCompletadas: stats.conversacionesCompletadas + 1,
    respuestasCorrectas: stats.respuestasCorrectas + correctas,
    respuestasTotales: stats.respuestasTotales + total,
  });

  guardarStats(actualizadas);
  return actualizadas;
}

export function reiniciarEstadisticasLocales() {
  const base = crearStatsBase();
  guardarStats(base);
  return base;
}

export function calcularPrecision(stats) {
  if (!stats.respuestasTotales) return 0;
  return Math.round((stats.respuestasCorrectas / stats.respuestasTotales) * 100);
}
