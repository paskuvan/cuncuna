'use client';

import { useState } from 'react';
import { Check, ChevronRight, MessageCircle, X } from 'lucide-react';
import { CONVERSACIONES } from '../../data/conversaciones';
import { registrarConversacionEstadisticas } from '../../lib/estadisticas-locales';
import { registrarEventoMision } from '../../lib/misiones-locales';
import AppShell from '../../components/dashboard/AppShell';

// ============================================================
// PÁGINA: /app/conversaciones  (estilo suave)
// ============================================================

export default function PaginaConversaciones() {
  const [conversacion, setConversacion] = useState(null);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [verificada, setVerificada] = useState(false);
  const [resultados, setResultados] = useState([]);

  const paso = conversacion?.pasos[indice];
  const completada = conversacion && indice >= conversacion.pasos.length;
  const aciertos = resultados.filter(Boolean).length;

  const empezar = (item) => {
    setConversacion(item);
    setIndice(0);
    setSeleccion(null);
    setVerificada(false);
    setResultados([]);
  };

  const volverLista = () => {
    setConversacion(null);
    setIndice(0);
    setSeleccion(null);
    setVerificada(false);
    setResultados([]);
  };

  const siguiente = () => {
    const acerto = seleccion === paso.correcta;
    const nuevosResultados = [...resultados, acerto];
    if (indice === conversacion.pasos.length - 1) {
      registrarConversacionEstadisticas({
        correctas: nuevosResultados.filter(Boolean).length,
        total: conversacion.pasos.length,
      });
      registrarEventoMision('conversacion');
    }
    setResultados(nuevosResultados);
    setSeleccion(null);
    setVerificada(false);
    setIndice(indice + 1);
  };

  // ─── Completada ───
  if (completada) {
    return (
      <AppShell title="Conversaciones">
        <div className="grid place-items-center py-10">
          <div className="rounded-2xl border border-black/5 bg-white p-8 max-w-md w-full text-center shadow-sm">
            <div className="text-5xl mb-3">💬</div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Conversación completada
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {aciertos}/{conversacion.pasos.length}
            </h1>
            <p className="text-neutral-500">decisiones correctas</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => empezar(conversacion)}
                className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Repetir
              </button>
              <button
                onClick={volverLista}
                className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
              >
                Ver más
              </button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  // ─── En conversación ───
  if (conversacion && paso) {
    const progreso = ((indice + 1) / conversacion.pasos.length) * 100;
    return (
      <AppShell title={conversacion.titulo}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <button
              onClick={volverLista}
              className="text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors shrink-0"
            >
              ← Salir
            </button>
            <div className="flex-1 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-violet-600 transition-all"
                style={{ width: `${progreso}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-neutral-500 shrink-0">
              {indice + 1}/{conversacion.pasos.length}
            </span>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="rounded-xl bg-neutral-50 border border-black/5 p-4 mb-5">
              <p className="text-xs font-medium text-neutral-500 mb-1">Escena</p>
              <p className="text-neutral-800">{paso.escena}</p>
            </div>

            <h2 className="text-xl font-bold tracking-tight mb-5">{paso.pregunta}</h2>

            <div className="grid grid-cols-1 gap-3">
              {paso.opciones.map((opcion, idx) => {
                const estaSeleccionada = seleccion === idx;
                const esCorrecta = idx === paso.correcta;
                let clases = 'border-black/10 bg-white text-neutral-800 hover:bg-neutral-50';
                if (verificada && esCorrecta) {
                  clases = 'border-emerald-300 bg-emerald-50 text-emerald-800';
                } else if (verificada && estaSeleccionada) {
                  clases = 'border-rose-300 bg-rose-50 text-rose-800';
                } else if (estaSeleccionada) {
                  clases = 'border-violet-300 bg-violet-50 text-violet-800';
                }
                return (
                  <button
                    key={opcion}
                    onClick={() => !verificada && setSeleccion(idx)}
                    disabled={verificada}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left font-medium transition-colors ${clases}`}
                  >
                    <span>{opcion}</span>
                    {verificada && esCorrecta && <Check size={18} />}
                    {verificada && estaSeleccionada && !esCorrecta && <X size={18} />}
                  </button>
                );
              })}
            </div>

            {verificada && (
              <div
                className={`mt-5 rounded-xl border p-4 ${
                  seleccion === paso.correcta
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-rose-200 bg-rose-50'
                }`}
              >
                <p className="font-semibold">
                  {seleccion === paso.correcta
                    ? '¡Buena decisión!'
                    : 'Otra respuesta encaja mejor'}
                </p>
                <p className="mt-1 text-sm text-neutral-600">{paso.explicacion}</p>
              </div>
            )}

            <button
              onClick={verificada ? siguiente : () => seleccion !== null && setVerificada(true)}
              disabled={seleccion === null}
              className="mt-6 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {verificada ? 'Siguiente' : 'Verificar'}
              {verificada && <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  // ─── Lista ───
  return (
    <AppShell title="Conversaciones">
      <div className="flex flex-col gap-6">
        <p className="text-neutral-500">
          Practica decisiones en situaciones reales con mini diálogos.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONVERSACIONES.map((item) => (
            <button
              key={item.id}
              onClick={() => empezar(item)}
              className="text-left rounded-2xl border border-black/5 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <span
                className="grid place-items-center w-11 h-11 rounded-xl mb-4"
                style={{ backgroundColor: `${item.color}22` }}
              >
                <MessageCircle size={20} style={{ color: item.color }} />
              </span>
              <h3 className="text-lg font-bold tracking-tight">{item.titulo}</h3>
              <p className="mt-1 text-sm text-neutral-500">{item.contexto}</p>
              <span className="mt-4 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                {item.pasos.length} decisiones
              </span>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
