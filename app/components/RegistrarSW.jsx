'use client';

import { useEffect } from 'react';

// Registra el service worker (/sw.js) para habilitar la PWA (instalar +
// offline). Solo en producción: en desarrollo el cacheo del SW interfiere
// con el hot reload.
export default function RegistrarSW() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' ||
      typeof navigator === 'undefined' ||
      !('serviceWorker' in navigator)
    ) {
      return;
    }

    const registrar = () => {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => console.error('No se pudo registrar el SW:', err));
    };

    window.addEventListener('load', registrar);
    return () => window.removeEventListener('load', registrar);
  }, []);

  return null;
}
