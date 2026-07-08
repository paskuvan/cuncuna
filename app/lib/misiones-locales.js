const STORAGE_KEY = 'cuncuna:misiones-diarias';

export const MISIONES_DIARIAS = [
  {
    id: 'repaso_diario',
    evento: 'repaso_diario',
    titulo: 'Repaso del día',
    descripcion: 'Completa una sesión de repaso diario.',
    objetivo: 1,
    xp: 20,
    color: '#FFD23F',
  },
  {
    id: 'precision_repaso',
    evento: 'precision_repaso',
    titulo: 'Ojo fino',
    descripcion: 'Acierta al menos 4 señas en un repaso.',
    objetivo: 1,
    xp: 25,
    color: '#7FFF6B',
  },
  {
    id: 'explorar_diccionario',
    evento: 'explorar_diccionario',
    titulo: 'Exploradora visual',
    descripcion: 'Visita el diccionario de señas.',
    objetivo: 1,
    xp: 10,
    color: '#4ECDC4',
  },
  {
    id: 'practicar_errores',
    evento: 'practicar_errores',
    titulo: 'Vuelve fuerte',
    descripcion: 'Completa una práctica de Mis errores.',
    objetivo: 1,
    xp: 20,
    color: '#FF6B9D',
  },
];

function fechaLocal() {
  return new Date().toLocaleDateString('en-CA');
}

function leerStore() {
  if (typeof window === 'undefined') return {};

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function guardarStore(store) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function estadoBase() {
  return Object.fromEntries(MISIONES_DIARIAS.map((mision) => [mision.id, 0]));
}

export function obtenerEstadoMisiones(fecha = fechaLocal()) {
  const store = leerStore();
  return {
    ...estadoBase(),
    ...(store[fecha] ?? {}),
  };
}

export function obtenerMisionesConProgreso(fecha = fechaLocal()) {
  const estado = obtenerEstadoMisiones(fecha);

  return MISIONES_DIARIAS.map((mision) => ({
    ...mision,
    progreso: Math.min(estado[mision.id] ?? 0, mision.objetivo),
    completada: (estado[mision.id] ?? 0) >= mision.objetivo,
  }));
}

export function registrarEventoMision(evento, cantidad = 1) {
  const hoy = fechaLocal();
  const store = leerStore();
  const estado = {
    ...estadoBase(),
    ...(store[hoy] ?? {}),
  };

  MISIONES_DIARIAS.filter((mision) => mision.evento === evento).forEach((mision) => {
    estado[mision.id] = Math.min((estado[mision.id] ?? 0) + cantidad, mision.objetivo);
  });

  store[hoy] = estado;
  guardarStore(store);
  return obtenerMisionesConProgreso(hoy);
}

export function reiniciarMisionesHoy() {
  const hoy = fechaLocal();
  const store = leerStore();
  store[hoy] = estadoBase();
  guardarStore(store);
  return obtenerMisionesConProgreso(hoy);
}

export function obtenerResumenMisiones() {
  const misiones = obtenerMisionesConProgreso();
  const completadas = misiones.filter((mision) => mision.completada).length;
  const xpDisponible = misiones.reduce((total, mision) => total + mision.xp, 0);
  const xpGanado = misiones
    .filter((mision) => mision.completada)
    .reduce((total, mision) => total + mision.xp, 0);

  return {
    completadas,
    total: misiones.length,
    xpDisponible,
    xpGanado,
  };
}
