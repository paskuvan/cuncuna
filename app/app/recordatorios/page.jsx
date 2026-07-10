'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Bell,
  BellRing,
  CalendarDays,
  Check,
  Clock,
  RotateCcw,
} from 'lucide-react';
import {
  enviarNotificacionPrueba,
  guardarRecordatorios,
  obtenerEstadoNotificaciones,
  obtenerRecordatorios,
  pedirPermisoNotificaciones,
} from '../../lib/recordatorios-locales';

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
  {
    id: 'repaso',
    titulo: 'Repaso diario',
    texto: 'Volver a practicar señas que ya viste.',
  },
  {
    id: 'mision',
    titulo: 'Misiones',
    texto: 'Completar una meta corta del día.',
  },
  {
    id: 'leccion',
    titulo: 'Nueva lección',
    texto: 'Avanzar en el mapa principal.',
  },
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
    [config.dias],
  );

  const actualizar = (cambios) => {
    const siguiente = guardarRecordatorios({ ...config, ...cambios });
    setConfig(siguiente);
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
      enviada
        ? 'Notificación de prueba enviada.'
        : 'Primero activa el permiso de notificaciones.',
    );
  };

  const restablecer = () => {
    const siguiente = guardarRecordatorios({
      activo: true,
      hora: '19:00',
      dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
      tipo: 'repaso',
      ultimoAviso: null,
    });
    setConfig(siguiente);
    setMensaje('Recordatorio restablecido a días hábiles a las 19:00.');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <header className="bg-black border-b-[4px] border-black sticky top-0 z-20">
        <div className="max-w-5xl mx-auto p-4 flex items-center gap-3">
          <Link
            href="/app"
            className="bg-white border-[3px] border-white p-2 hover:translate-x-[-2px] transition-transform"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            aria-label="Volver"
          >
            <ArrowLeft size={20} strokeWidth={3} className="text-black" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-black text-xl md:text-2xl uppercase leading-none">
              Recordatorios
            </h1>
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider hidden sm:block">
              Practicar con constancia
            </p>
          </div>
          <div
            className={`border-[3px] border-white px-3 py-1.5 font-black text-sm ${
              config.activo ? 'bg-[#7FFF6B] text-black' : 'bg-white text-black'
            }`}
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
          >
            {config.activo ? 'Activo' : 'Pausado'}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6">
        <section
          className="bg-[#FFD23F] border-[4px] border-black p-5 md:p-7 mb-6"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BellRing size={24} strokeWidth={3} className="text-black" />
            <p className="font-black uppercase text-xs tracking-[0.2em] text-black/70">
              Tu rutina
            </p>
          </div>
          <h2 className="font-black uppercase text-4xl md:text-5xl text-black leading-none mb-3">
            {config.hora}
            <span className="block text-lg md:text-xl text-black/70 mt-2">
              {diasActivos.length ? diasActivos.join(', ') : 'Sin días seleccionados'}
            </span>
          </h2>
          <p className="font-bold text-black/75 max-w-2xl">
            Estos recordatorios son locales del navegador. Para enviar push aunque la app esté cerrada,
            después conectamos webhooks o Supabase Edge Functions.
          </p>
        </section>

        <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5">
          <div
            className="bg-white border-[4px] border-black p-5"
            style={{ boxShadow: '8px 8px 0 #000' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Bell size={22} strokeWidth={3} className="text-black" />
              <h2 className="font-black uppercase text-2xl text-black leading-none">
                Permiso del navegador
              </h2>
            </div>

            <div
              className="bg-[#F5F0E8] border-[3px] border-black p-4 mb-4"
              style={{ boxShadow: '4px 4px 0 #000' }}
            >
              <p className="font-black uppercase text-black">
                {describirEstado(permiso)}
              </p>
              <p className="font-bold text-black/70 text-sm mt-1">
                Cuncuna pedirá permiso solo cuando pulses activar.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={activarPermiso}
                disabled={permiso === 'granted' || permiso === 'no_soportado'}
                className="bg-black text-[#FFD23F] border-[3px] border-black px-4 py-3 font-black uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: '5px 5px 0 #FF6B9D' }}
              >
                Activar permiso
              </button>
              <button
                onClick={probar}
                className="bg-white text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm"
                style={{ boxShadow: '5px 5px 0 #000' }}
              >
                Probar aviso
              </button>
            </div>

            {mensaje && (
              <p
                className="mt-4 bg-[#7FFF6B] border-[3px] border-black p-3 font-black text-black text-sm"
                style={{ boxShadow: '4px 4px 0 #000' }}
              >
                {mensaje}
              </p>
            )}
          </div>

          <div
            className="bg-white border-[4px] border-black p-5"
            style={{ boxShadow: '8px 8px 0 #000' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock size={22} strokeWidth={3} className="text-black" />
              <h2 className="font-black uppercase text-2xl text-black leading-none">
                Horario
              </h2>
            </div>

            <label className="block mb-5">
              <span className="block font-black uppercase text-xs tracking-[0.15em] text-black/60 mb-2">
                Hora preferida
              </span>
              <input
                type="time"
                value={config.hora}
                onChange={(event) => actualizar({ hora: event.target.value })}
                className="w-full bg-white border-[3px] border-black p-3 font-black text-black outline-none"
                style={{ boxShadow: '4px 4px 0 #000' }}
              />
            </label>

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays size={20} strokeWidth={3} className="text-black" />
                <p className="font-black uppercase text-black">Días activos</p>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {dias.map((dia) => {
                  const activo = config.dias.includes(dia.id);
                  return (
                    <button
                      key={dia.id}
                      onClick={() => alternarDia(dia.id)}
                      className={`aspect-square border-[3px] border-black font-black text-sm ${
                        activo ? 'bg-[#FFD23F] text-black' : 'bg-white text-black/50'
                      }`}
                      style={{ boxShadow: '3px 3px 0 #000' }}
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
              className={`w-full border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center justify-center gap-2 ${
                config.activo ? 'bg-[#FF6B6B] text-white' : 'bg-[#7FFF6B] text-black'
              }`}
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              {config.activo ? 'Pausar recordatorio' : 'Activar recordatorio'}
            </button>
          </div>
        </section>

        <section
          className="bg-white border-[4px] border-black p-5 mt-6"
          style={{ boxShadow: '8px 8px 0 #000' }}
        >
          <h2 className="font-black uppercase text-2xl text-black leading-none mb-4">
            ¿Qué recordar?
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {tipos.map((tipo) => {
              const activo = config.tipo === tipo.id;
              return (
                <button
                  key={tipo.id}
                  onClick={() => actualizar({ tipo: tipo.id })}
                  className={`text-left border-[3px] border-black p-4 ${
                    activo ? 'bg-[#4ECDC4]' : 'bg-white'
                  }`}
                  style={{ boxShadow: activo ? '7px 7px 0 #000' : '5px 5px 0 #000' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black uppercase text-black text-lg leading-tight">
                        {tipo.titulo}
                      </h3>
                      <p className="font-bold text-black/70 text-sm mt-2">{tipo.texto}</p>
                    </div>
                    {activo && <Check size={22} strokeWidth={4} className="text-black shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={restablecer}
            className="mt-5 bg-white text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2"
            style={{ boxShadow: '5px 5px 0 #000' }}
          >
            <RotateCcw size={18} strokeWidth={4} />
            Restablecer
          </button>
        </section>
      </main>
    </div>
  );
}
