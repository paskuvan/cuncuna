'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronRight, RotateCcw, Sparkles, X } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import AppShell from '../../components/dashboard/AppShell';
import {
  crearOpcionesRepaso,
  obtenerSenasDiccionario,
} from '../../lib/diccionario';
import { registrarResultadoSena } from '../../lib/errores-locales';
import { registrarRepasoEstadisticas } from '../../lib/estadisticas-locales';
import { registrarEventoMision } from '../../lib/misiones-locales';
import {
  describirProximoRepaso,
  obtenerRepasoInteligente,
  registrarRepasoEspaciado,
} from '../../lib/repeticion-espaciada';
import { obtenerPlanActual, puedeAccederLeccion } from '../../lib/acceso-plan';

// ============================================================
// PÁGINA: /app/repaso  (estilo suave)
// Repaso inteligente con repetición espaciada.
// ============================================================

export default function PaginaRepaso() {
  const planActual = useMemo(() => obtenerPlanActual(), []);
  const todasLasSenas = useMemo(
    () =>
      obtenerSenasDiccionario().filter((sena) =>
        puedeAccederLeccion(sena.leccionId, planActual)
      ),
    [planActual]
  );
  const ejercicios = useMemo(
    () => obtenerRepasoInteligente(todasLasSenas, 5),
    [todasLasSenas]
  );
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [verificado, setVerificado] = useState(false);
  const [resultados, setResultados] = useState([]);

  const ejercicio = ejercicios[indice];
  const opciones = useMemo(
    () => (ejercicio ? crearOpcionesRepaso(ejercicio, todasLasSenas, 4) : []),
    [ejercicio, todasLasSenas]
  );
  const aciertos = resultados.filter(Boolean).length;
  const completado = indice >= ejercicios.length;
  const progreso = completado ? 100 : ((indice + 1) / ejercicios.length) * 100;

  const verificar = () => {
    if (!seleccion) return;
    setVerificado(true);
  };

  const siguiente = (calidad) => {
    const acerto = seleccion?.id === ejercicio.id;
    const siguientesResultados = [...resultados, acerto];
    registrarResultadoSena(ejercicio.id, acerto);
    registrarRepasoEspaciado(ejercicio.id, acerto ? calidad : 'incorrecta');
    if (indice === ejercicios.length - 1) {
      registrarRepasoEstadisticas({
        correctas: siguientesResultados.filter(Boolean).length,
        total: ejercicios.length,
        senasVistas: ejercicios.length,
      });
      registrarEventoMision('repaso_diario');
      if (siguientesResultados.filter(Boolean).length >= 4) {
        registrarEventoMision('precision_repaso');
      }
    }
    setResultados(siguientesResultados);
    setSeleccion(null);
    setVerificado(false);
    setIndice(indice + 1);
  };

  const reiniciar = () => {
    setIndice(0);
    setSeleccion(null);
    setVerificado(false);
    setResultados([]);
  };

  // ─── Terminado ───
  if (completado) {
    return (
      <AppShell title="Repaso">
        <div className="grid place-items-center py-10">
          <div className="rounded-2xl border border-black/5 bg-white p-8 max-w-md w-full text-center shadow-sm">
            <div className="text-5xl mb-3">✨</div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Repaso terminado
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {aciertos}/{ejercicios.length}
            </h1>
            <p className="text-neutral-500">respuestas correctas</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={reiniciar}
                className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Repetir
              </button>
              <Link
                href="/app"
                className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  // ─── Sin señas ───
  if (!ejercicio) {
    return (
      <AppShell title="Repaso">
        <div className="grid place-items-center py-10">
          <div className="rounded-2xl border border-black/5 bg-white p-8 max-w-md w-full text-center shadow-sm">
            <h1 className="text-2xl font-bold tracking-tight">
              No hay señas para repasar todavía
            </h1>
            <p className="mt-2 text-neutral-500">
              Completa una lección disponible o desbloquea Plus para acceder a más señas.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/app"
                className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Ir al dashboard
              </Link>
              <Link
                href="/suscripcion?plan=plus"
                className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
              >
                Ver Plus
              </Link>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Repaso">
      <div className="max-w-3xl mx-auto flex flex-col gap-5">
        {/* Progreso */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-violet-600 transition-all"
              style={{ width: `${progreso}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-neutral-500 shrink-0">
            {indice + 1}/{ejercicios.length}
          </span>
        </div>

        {/* Pregunta */}
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-violet-600">
            <Sparkles size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Repaso inteligente
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">¿Qué seña ves?</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Mira el video y elige la respuesta correcta.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl">
            <VideoPlayer
              src={ejercicio.videoUrl}
              poster={ejercicio.posterUrl}
              titulo={ejercicio.palabra}
            />
          </div>

          {/* Opciones */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {opciones.map((opcion) => {
              const estaSeleccionada = seleccion?.id === opcion.id;
              const esCorrecta = opcion.id === ejercicio.id;
              let clases = 'border-black/10 bg-white text-neutral-800 hover:bg-neutral-50';
              if (verificado && esCorrecta) {
                clases = 'border-emerald-300 bg-emerald-50 text-emerald-800';
              } else if (verificado && estaSeleccionada) {
                clases = 'border-rose-300 bg-rose-50 text-rose-800';
              } else if (estaSeleccionada) {
                clases = 'border-violet-300 bg-violet-50 text-violet-800';
              }
              return (
                <button
                  key={opcion.id}
                  onClick={() => !verificado && setSeleccion(opcion)}
                  disabled={verificado}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left font-semibold transition-colors ${clases}`}
                >
                  <span>{opcion.palabra}</span>
                  {verificado && esCorrecta && <Check size={18} />}
                  {verificado && estaSeleccionada && !esCorrecta && <X size={18} />}
                </button>
              );
            })}
          </div>

          {verificado && (
            <>
              <div
                className={`mt-5 rounded-xl border p-4 ${
                  seleccion?.id === ejercicio.id
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-rose-200 bg-rose-50'
                }`}
              >
                <p className="font-semibold">
                  {seleccion?.id === ejercicio.id
                    ? '¡Correcto!'
                    : `Era: ${ejercicio.palabra}`}
                </p>
                <p className="mt-1 text-sm text-neutral-600">{ejercicio.descripcion}</p>
              </div>

              {seleccion?.id === ejercicio.id ? (
                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium text-neutral-500">
                    ¿Qué tan fácil fue recordarla?
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'dificil', texto: 'Difícil' },
                      { id: 'bien', texto: 'Bien' },
                      { id: 'facil', texto: 'Fácil' },
                    ].map((calidad) => (
                      <button
                        key={calidad.id}
                        onClick={() => siguiente(calidad.id)}
                        className="rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
                        title={describirProximoRepaso(calidad.id)}
                      >
                        {calidad.texto}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => siguiente('incorrecta')}
                  className="mt-5 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
                >
                  Practicar de nuevo pronto
                  <ChevronRight size={18} />
                </button>
              )}
            </>
          )}

          {!verificado && (
            <button
              onClick={verificar}
              disabled={!seleccion}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Verificar
            </button>
          )}
        </div>
      </div>
    </AppShell>
  );
}
