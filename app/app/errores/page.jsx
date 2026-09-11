'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronRight, RotateCcw, Target, Trash2, X } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import AppShell from '../../components/dashboard/AppShell';
import { crearOpcionesRepaso, obtenerSenasDiccionario } from '../../lib/diccionario';
import {
  enriquecerSenasConErrores,
  limpiarErrorLocal,
  limpiarTodosLosErroresLocales,
  obtenerErroresLocales,
  registrarResultadoSena,
} from '../../lib/errores-locales';
import { registrarPracticaErroresEstadisticas } from '../../lib/estadisticas-locales';
import { registrarEventoMision } from '../../lib/misiones-locales';

// ============================================================
// PÁGINA: /app/errores  (estilo suave)
// ============================================================

export default function PaginaErrores() {
  const todasLasSenas = useMemo(() => obtenerSenasDiccionario(), []);
  const [errores, setErrores] = useState(() => obtenerErroresLocales());
  const [modoPractica, setModoPractica] = useState(false);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [verificado, setVerificado] = useState(false);
  const [resultados, setResultados] = useState([]);

  const senasDebiles = useMemo(
    () => enriquecerSenasConErrores(todasLasSenas, errores),
    [errores, todasLasSenas]
  );

  const ejercicios = senasDebiles.slice(0, 5);
  const ejercicio = modoPractica ? ejercicios[indice] : null;
  const opciones = useMemo(
    () => (ejercicio ? crearOpcionesRepaso(ejercicio, todasLasSenas, 4) : []),
    [ejercicio, todasLasSenas]
  );
  const practicaCompleta = modoPractica && indice >= ejercicios.length;
  const aciertos = resultados.filter(Boolean).length;

  const empezarPractica = () => {
    setModoPractica(true);
    setIndice(0);
    setSeleccion(null);
    setVerificado(false);
    setResultados([]);
  };

  const salirPractica = () => {
    setModoPractica(false);
    setIndice(0);
    setSeleccion(null);
    setVerificado(false);
    setResultados([]);
  };

  const siguiente = () => {
    const acerto = seleccion?.id === ejercicio.id;
    const nuevosErrores = registrarResultadoSena(ejercicio.id, acerto);
    if (indice === ejercicios.length - 1) {
      const siguientesResultados = [...resultados, acerto];
      registrarPracticaErroresEstadisticas({
        correctas: siguientesResultados.filter(Boolean).length,
        total: ejercicios.length,
      });
      registrarEventoMision('practicar_errores');
    }
    setErrores(nuevosErrores);
    setResultados([...resultados, acerto]);
    setSeleccion(null);
    setVerificado(false);
    setIndice(indice + 1);
  };

  const limpiarSena = (senaId) => setErrores(limpiarErrorLocal(senaId));
  const limpiarTodo = () => setErrores(limpiarTodosLosErroresLocales());

  // ─── Completa ───
  if (practicaCompleta) {
    return (
      <AppShell title="Mis errores">
        <div className="grid place-items-center py-10">
          <div className="rounded-2xl border border-black/5 bg-white p-8 max-w-md w-full text-center shadow-sm">
            <div className="text-5xl mb-3">🎯</div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Práctica terminada
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {aciertos}/{ejercicios.length}
            </h1>
            <p className="text-neutral-500">señas recuperadas</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={empezarPractica} className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
                Repetir
              </button>
              <button onClick={salirPractica} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors">
                Ver lista
              </button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  // ─── En práctica ───
  if (modoPractica && ejercicio) {
    const progreso = ((indice + 1) / ejercicios.length) * 100;
    return (
      <AppShell title="Mis errores">
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <button onClick={salirPractica} className="text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors shrink-0">
              ← Salir
            </button>
            <div className="flex-1 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
              <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${progreso}%` }} />
            </div>
            <span className="text-sm font-semibold text-neutral-500 shrink-0">
              {indice + 1}/{ejercicios.length}
            </span>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="overflow-hidden rounded-xl">
              <VideoPlayer src={ejercicio.videoUrl} poster={ejercicio.posterUrl} titulo={ejercicio.palabra} />
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opciones.map((opcion) => {
                const estaSeleccionada = seleccion?.id === opcion.id;
                const esCorrecta = opcion.id === ejercicio.id;
                let clases = 'border-black/10 bg-white text-neutral-800 hover:bg-neutral-50';
                if (verificado && esCorrecta) clases = 'border-emerald-300 bg-emerald-50 text-emerald-800';
                else if (verificado && estaSeleccionada) clases = 'border-rose-300 bg-rose-50 text-rose-800';
                else if (estaSeleccionada) clases = 'border-violet-300 bg-violet-50 text-violet-800';
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
              <div
                className={`mt-5 rounded-xl border p-4 ${
                  seleccion?.id === ejercicio.id
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-rose-200 bg-rose-50'
                }`}
              >
                <p className="font-semibold">
                  {seleccion?.id === ejercicio.id ? '¡Recuperada!' : `Era: ${ejercicio.palabra}`}
                </p>
                <p className="mt-1 text-sm text-neutral-600">{ejercicio.descripcion}</p>
              </div>
            )}

            <button
              onClick={verificado ? siguiente : () => seleccion && setVerificado(true)}
              disabled={!seleccion}
              className="mt-5 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {verificado ? 'Siguiente' : 'Verificar'}
              {verificado && <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  // ─── Lista ───
  return (
    <AppShell title="Mis errores">
      <div className="flex flex-col gap-6 max-w-5xl">
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-medium text-neutral-500">Entrenamiento enfocado</p>
            <h2 className="text-2xl font-bold tracking-tight">
              {senasDebiles.length} señas para recuperar
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={empezarPractica}
              disabled={senasDebiles.length === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw size={16} />
              Practicar
            </button>
            <button
              onClick={limpiarTodo}
              disabled={senasDebiles.length === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Trash2 size={16} />
              Limpiar
            </button>
          </div>
        </section>

        {senasDebiles.length === 0 ? (
          <div className="rounded-2xl border border-black/5 bg-white p-10 text-center shadow-sm">
            <Target size={40} className="mx-auto text-neutral-300 mb-3" />
            <p className="font-semibold">Aún no hay errores</p>
            <p className="mt-1 text-sm text-neutral-500">
              Cuando falles una seña en el repaso diario, aparecerá aquí.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {senasDebiles.map((sena) => (
              <article key={sena.id} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] text-neutral-400">{sena.leccionTitulo}</p>
                    <h3 className="text-xl font-bold tracking-tight">{sena.palabra}</h3>
                  </div>
                  <button
                    onClick={() => limpiarSena(sena.id)}
                    className="grid place-items-center w-9 h-9 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                    aria-label={`Marcar ${sena.palabra} como recuperada`}
                  >
                    <Check size={16} />
                  </button>
                </div>
                <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{sena.descripcion}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-rose-50 border border-rose-100 p-2 text-center text-sm font-semibold text-rose-600">
                    {sena.fallos} fallos
                  </div>
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-2 text-center text-sm font-semibold text-emerald-600">
                    {sena.aciertos} aciertos
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
