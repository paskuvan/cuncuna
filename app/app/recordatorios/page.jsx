'use client';

import { useMemo, useState } from 'react';
import { Bell, CalendarDays, Check, Clock, RotateCcw } from 'lucide-react';
import {
  enviarNotificacionPrueba,
  guardarRecordatorios,
  obtenerEstadoNotificaciones,
  obtenerRecordatorios,
  pedirPermisoNotificaciones,
} from '../../lib/recordatorios-locales';
import AppShell from '../../components/dashboard/AppShell';

// ============================================================
// PÁGINA: /app/recordatorios  (estilo suave)
// ============================================================

const dias = [
  { id: 'lunes', corto: 'L', nombre: 'Lunes' },
  { id: 'martes', corto: 'M', nombre: 'Martes' },
  { id: 'miercoles', corto: 'M', nombre: 'Miércoles' },
  { id: 'jueves', corto: 'J', nombre: 'Jueves' },
  { id: 'viernes', corto: 'V', nombre: 'Viernes' },
  { id: 'sabado', corto: 'S', nombre: 'Sábado' },
  { id: 'domingo', corto: 'D', nombre: 'Domingo' },
];

const tipos = [
  { id: 'repaso', titulo: 'Repaso diario', texto: 'Volver a practicar señas que ya viste.' },
  { id: 'mision', titulo: 'Misiones', texto: 'Completar una meta corta del día.' },
  { id: 'leccion', titulo: 'Nueva lección', texto: 'Avanzar en el mapa principal.' },
];

function describirEstado(estado) {
  if (estado === 'granted') return 'Permiso activado';
  if (estado === 'denied') return 'Permiso bloqueado';
  if (estado === 'no_soportado') return 'No soportado';
  return 'Pendiente de activar';
}

export default function PaginaRecordatorios() {
  const [config, setConfig] = useState(() => obtenerRecordatorios());
  const [permiso, setPermiso] = useState(() => obtenerEstadoNotificaciones());
  const [mensaje, setMensaje] = useState('');

  const diasActivos = useMemo(
    () => dias.filter((dia) => config.dias.includes(dia.id)).map((dia) => dia.nombre),
    [config.dias]
  );

  const actualizar = (cambios) => {
    setConfig(guardarRecordatorios({ ...config, ...cambios }));
  };

  const alternarDia = (diaId) => {
    const existe = config.dias.includes(diaId);
    const siguientes = existe
      ? config.dias.filter((dia) => dia !== diaId)
      : [...config.dias, diaId];
    actualizar({ dias: siguientes });
  };

  const activarPermiso = async () => {
    const resultado = await pedirPermisoNotificaciones();
    setPermiso(resultado);
    if (resultado === 'granted') {
      actualizar({ activo: true });
      setMensaje('Permiso activado. Ya puedes recibir recordatorios mientras usas Cuncuna.');
      return;
    }
    if (resultado === 'denied') {
      setMensaje('El navegador bloqueó las notificaciones. Puedes cambiarlo en ajustes del sitio.');
      return;
    }
    setMensaje('No se pudo activar el permiso de notificaciones en este navegador.');
  };

  const probar = () => {
    const enviada = enviarNotificacionPrueba();
    setMensaje(
      enviada ? 'Notificación de prueba enviada.' : 'Primero activa el permiso de notificaciones.'
    );
  };

  const restablecer = () => {
    setConfig(
      guardarRecordatorios({
        activo: true,
        hora: '19:00',
        dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
        tipo: 'repaso',
        ultimoAviso: null,
      })
    );
    setMensaje('Recordatorio restablecido a días hábiles a las 19:00.');
  };

  return (
    <AppShell title="Recordatorios">
      <div className="flex flex-col gap-6 max-w-5xl">
        {/* Resumen */}
        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-violet-600">
            <Bell size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Tu rutina</span>
            <span
              className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                config.activo ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-100 text-neutral-500'
              }`}
            >
              {config.activo ? 'Activo' : 'Pausado'}
            </span>
          </div>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">{config.hora}</h2>
          <p className="mt-1 text-sm text-neutral-500">
            {diasActivos.length ? diasActivos.join(', ') : 'Sin días seleccionados'}
          </p>
          <p className="mt-3 text-sm text-neutral-500 max-w-2xl">
            Estos recordatorios son locales del navegador. Para enviar push aunque la app esté
            cerrada, después conectamos webhooks o Supabase Edge Functions.
          </p>
        </section>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5">
          {/* Permiso */}
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={18} className="text-neutral-500" />
              <h3 className="font-bold tracking-tight">Permiso del navegador</h3>
            </div>
            <div className="rounded-xl bg-neutral-50 border border-black/5 p-4 mb-4">
              <p className="font-semibold">{describirEstado(permiso)}</p>
              <p className="mt-1 text-sm text-neutral-500">
                Cuncuna pedirá permiso solo cuando pulses activar.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={activarPermiso}
                disabled={permiso === 'granted' || permiso === 'no_soportado'}
                className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Activar permiso
              </button>
              <button
                onClick={probar}
                className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Probar aviso
              </button>
            </div>
            {mensaje && (
              <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                {mensaje}
              </p>
            )}
          </div>

          {/* Horario */}
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-neutral-500" />
              <h3 className="font-bold tracking-tight">Horario</h3>
            </div>

            <label className="block mb-5">
              <span className="mb-2 block text-sm font-medium text-neutral-600">Hora preferida</span>
              <input
                type="time"
                value={config.hora}
                onChange={(e) => actualizar({ hora: e.target.value })}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 font-semibold outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              />
            </label>

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays size={16} className="text-neutral-500" />
                <p className="text-sm font-medium text-neutral-600">Días activos</p>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {dias.map((dia) => {
                  const activo = config.dias.includes(dia.id);
                  return (
                    <button
                      key={dia.id}
                      onClick={() => alternarDia(dia.id)}
                      className={`aspect-square rounded-xl border text-sm font-semibold transition-colors ${
                        activo
                          ? 'border-violet-600 bg-violet-600 text-white'
                          : 'border-black/10 bg-white text-neutral-400 hover:bg-neutral-50'
                      }`}
                      aria-label={dia.nombre}
                    >
                      {dia.corto}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => actualizar({ activo: !config.activo })}
              className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                config.activo
                  ? 'border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
                  : 'bg-violet-600 text-white hover:bg-violet-700'
              }`}
            >
              {config.activo ? 'Pausar recordatorio' : 'Activar recordatorio'}
            </button>
          </div>
        </div>

        {/* Qué recordar */}
        <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-bold tracking-tight">¿Qué recordar?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {tipos.map((tipo) => {
              const activo = config.tipo === tipo.id;
              return (
                <button
                  key={tipo.id}
                  onClick={() => actualizar({ tipo: tipo.id })}
                  className={`text-left rounded-2xl border p-4 transition-colors ${
                    activo
                      ? 'border-violet-400 ring-2 ring-violet-200 bg-violet-50'
                      : 'border-black/5 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold">{tipo.titulo}</h4>
                      <p className="mt-1 text-sm text-neutral-500">{tipo.texto}</p>
                    </div>
                    {activo && <Check size={18} className="text-violet-600 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
          <button
            onClick={restablecer}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <RotateCcw size={16} />
            Restablecer
          </button>
        </section>
      </div>
    </AppShell>
  );
}
