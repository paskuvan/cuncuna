'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronRight, RotateCcw, Star, Trash2, X } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import AppShell from '../../components/dashboard/AppShell';
import { crearOpcionesRepaso, obtenerSenasDiccionario } from '../../lib/diccionario';
import {
  alternarFavoritoLocal,
  limpiarFavoritosLocales,
  obtenerFavoritosLocales,
  obtenerSenasFavoritas,
} from '../../lib/favoritos-locales';

// ============================================================
// PÁGINA: /app/favoritos  (estilo suave)
// ============================================================

export default function PaginaFavoritos() {
  const todasLasSenas = useMemo(() => obtenerSenasDiccionario(), []);
  const [favoritos, setFavoritos] = useState(() => obtenerFavoritosLocales());
  const [modoPractica, setModoPractica] = useState(false);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [verificada, setVerificada] = useState(false);
  const [resultados, setResultados] = useState([]);

  const senasFavoritas = useMemo(
    () => obtenerSenasFavoritas(todasLasSenas, favoritos),
    [favoritos, todasLasSenas]
  );
  const ejercicios = senasFavoritas.slice(0, 5);
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
    setVerificada(false);
    setResultados([]);
  };

  const salirPractica = () => {
    setModoPractica(false);
    setIndice(0);
    setSeleccion(null);
    setVerificada(false);
    setResultados([]);
  };

  const quitarFavorito = (senaId) => setFavoritos(alternarFavoritoLocal(senaId));
  const limpiarTodo = () => setFavoritos(limpiarFavoritosLocales());

  const siguiente = () => {
    const acerto = seleccion?.id === ejercicio.id;
    setResultados([...resultados, acerto]);
    setSeleccion(null);
    setVerificada(false);
    setIndice(indice + 1);
  };

  // ─── Práctica completa ───
  if (practicaCompleta) {
    return (
      <AppShell title="Favoritos">
        <div className="grid place-items-center py-10">
          <div className="rounded-2xl border border-black/5 bg-white p-8 max-w-md w-full text-center shadow-sm">
            <div className="text-5xl mb-3">⭐</div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Favoritos practicados
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {aciertos}/{ejercicios.length}
            </h1>
            <p className="text-neutral-500">respuestas correctas</p>
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
      <AppShell title="Favoritos">
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
                if (verificada && esCorrecta) clases = 'border-emerald-300 bg-emerald-50 text-emerald-800';
                else if (verificada && estaSeleccionada) clases = 'border-rose-300 bg-rose-50 text-rose-800';
                else if (estaSeleccionada) clases = 'border-violet-300 bg-violet-50 text-violet-800';
                return (
                  <button
                    key={opcion.id}
                    onClick={() => !verificada && setSeleccion(opcion)}
                    disabled={verificada}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left font-semibold transition-colors ${clases}`}
                  >
                    <span>{opcion.palabra}</span>
                    {verificada && esCorrecta && <Check size={18} />}
                    {verificada && estaSeleccionada && !esCorrecta && <X size={18} />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={verificada ? siguiente : () => seleccion && setVerificada(true)}
              disabled={!seleccion}
              className="mt-5 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
    <AppShell title="Favoritos">
      <div className="flex flex-col gap-6 max-w-5xl">
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-medium text-neutral-500">Colección personal</p>
            <h2 className="text-2xl font-bold tracking-tight">
              {senasFavoritas.length} señas guardadas
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={empezarPractica}
              disabled={senasFavoritas.length === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw size={16} />
              Practicar
            </button>
            <button
              onClick={limpiarTodo}
              disabled={senasFavoritas.length === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Trash2 size={16} />
              Limpiar
            </button>
          </div>
        </section>

        {senasFavoritas.length === 0 ? (
          <div className="rounded-2xl border border-black/5 bg-white p-10 text-center shadow-sm">
            <Star size={40} className="mx-auto text-neutral-300 mb-3" />
            <p className="font-semibold">Aún no hay favoritas</p>
            <p className="mt-1 text-sm text-neutral-500">
              Guarda señas desde el diccionario para repasarlas aquí.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {senasFavoritas.map((sena) => (
              <article key={sena.id} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] text-neutral-400">{sena.leccionTitulo}</p>
                    <h3 className="text-xl font-bold tracking-tight">{sena.palabra}</h3>
                  </div>
                  <button
                    onClick={() => quitarFavorito(sena.id)}
                    className="grid place-items-center w-9 h-9 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                    aria-label={`Quitar ${sena.palabra} de favoritos`}
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{sena.descripcion}</p>
                <span
                  className="mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: `${sena.nivelColor}22`, color: '#525252' }}
                >
                  Nivel {sena.nivelNumero} · {sena.nivelTitulo}
                </span>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
