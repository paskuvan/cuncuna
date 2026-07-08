const STORAGE_KEY = 'cuncuna:seleccion-plan';

export function guardarSeleccionPlan({ plan, periodo }) {
  if (typeof window === 'undefined') return null;

  const seleccion = {
    plan,
    periodo,
    estado: 'pendiente',
    fecha: new Date().toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seleccion));
  return seleccion;
}

export function obtenerSeleccionPlan() {
  if (typeof window === 'undefined') return null;

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null');
  } catch {
    return null;
  }
}
