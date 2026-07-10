'use client';

const CLAVE_ONBOARDING = 'cuncuna:onboarding';

export const onboardingInicial = {
  completado: false,
  motivo: '',
  nivel: '',
  metaSemanal: '3',
  ritmo: '10',
  intereses: [],
  recordatorio: false,
  actualizadoEn: null,
};

export function obtenerOnboarding() {
  if (typeof window === 'undefined') return onboardingInicial;

  try {
    const guardado = window.localStorage.getItem(CLAVE_ONBOARDING);
    if (!guardado) return onboardingInicial;
    return { ...onboardingInicial, ...JSON.parse(guardado) };
  } catch {
    return onboardingInicial;
  }
}

export function guardarOnboarding(datos) {
  if (typeof window === 'undefined') return onboardingInicial;

  const siguiente = {
    ...onboardingInicial,
    ...datos,
    actualizadoEn: new Date().toISOString(),
  };

  window.localStorage.setItem(CLAVE_ONBOARDING, JSON.stringify(siguiente));
  return siguiente;
}

export function completarOnboarding(datos) {
  return guardarOnboarding({
    ...datos,
    completado: true,
  });
}
