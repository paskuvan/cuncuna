'use client';

const CLAVE_RECORDATORIOS = 'cuncuna:recordatorios';

const diasBase = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

export const recordatoriosIniciales = {
  activo: false,
  hora: '19:00',
  dias: diasBase,
  tipo: 'repaso',
  ultimoAviso: null,
  actualizadoEn: null,
};

export function obtenerRecordatorios() {
  if (typeof window === 'undefined') return recordatoriosIniciales;

  try {
    const guardado = window.localStorage.getItem(CLAVE_RECORDATORIOS);
    if (!guardado) return recordatoriosIniciales;
    return { ...recordatoriosIniciales, ...JSON.parse(guardado) };
  } catch {
    return recordatoriosIniciales;
  }
}

export function guardarRecordatorios(datos) {
  if (typeof window === 'undefined') return recordatoriosIniciales;

  const siguiente = {
    ...recordatoriosIniciales,
    ...datos,
    actualizadoEn: new Date().toISOString(),
  };

  window.localStorage.setItem(CLAVE_RECORDATORIOS, JSON.stringify(siguiente));
  return siguiente;
}

export function obtenerEstadoNotificaciones() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'no_soportado';
  }

  return window.Notification.permission;
}

export async function pedirPermisoNotificaciones() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'no_soportado';
  }

  return window.Notification.requestPermission();
}

export function enviarNotificacionPrueba() {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  if (window.Notification.permission !== 'granted') return false;

  new window.Notification('Cuncuna', {
    body: 'Tu recordatorio está listo para practicar LSCh.',
    icon: '/android-chrome-192x192.png',
  });

  return true;
}

export function obtenerClaveFecha(fecha = new Date()) {
  return fecha.toISOString().slice(0, 10);
}

export function obtenerDiaRecordatorio(fecha = new Date()) {
  const dias = [
    'domingo',
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
  ];

  return dias[fecha.getDay()];
}

export function debeRecordarHoy(config = obtenerRecordatorios(), fecha = new Date()) {
  if (!config.activo) return false;
  if (!config.dias.includes(obtenerDiaRecordatorio(fecha))) return false;
  if (config.ultimoAviso === obtenerClaveFecha(fecha)) return false;

  const [hora, minuto] = config.hora.split(':').map(Number);
  const horaProgramada = new Date(fecha);
  horaProgramada.setHours(hora, minuto, 0, 0);

  return fecha >= horaProgramada;
}

export function registrarAvisoDeHoy(config = obtenerRecordatorios()) {
  return guardarRecordatorios({
    ...config,
    ultimoAviso: obtenerClaveFecha(),
  });
}
