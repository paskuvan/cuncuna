'use client';

import { useEffect } from 'react';
import {
  debeRecordarHoy,
  enviarNotificacionPrueba,
  obtenerEstadoNotificaciones,
  obtenerRecordatorios,
  registrarAvisoDeHoy,
} from '../lib/recordatorios-locales';

export default function RecordatorioActivo() {
  useEffect(() => {
    const revisar = () => {
      const config = obtenerRecordatorios();
      if (!debeRecordarHoy(config)) return;
      if (obtenerEstadoNotificaciones() !== 'granted') return;

      const enviada = enviarNotificacionPrueba();
      if (enviada) {
        registrarAvisoDeHoy(config);
      }
    };

    revisar();
    const intervalo = window.setInterval(revisar, 60 * 1000);
    return () => window.clearInterval(intervalo);
  }, []);

  return null;
}
