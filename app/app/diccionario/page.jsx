'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, Star } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import AppShell from '../../components/dashboard/AppShell';
import {
  obtenerNivelesDiccionario,
  obtenerSenasDiccionario,
} from '../../lib/diccionario';
import { registrarDiccionarioEstadisticas } from '../../lib/estadisticas-locales';
import {
  alternarFavoritoLocal,
  esFavoritaLocal,
  obtenerFavoritosLocales,
} from '../../lib/favoritos-locales';
import { registrarEventoMision } from '../../lib/misiones-locales';
import { obtenerSenasPublicadas } from '../../lib/contenido-publicado';
import { obtenerPlanActual, puedeAccederLeccion } from '../../lib/acceso-plan';

// ============================================================
// PÁGINA: /app/diccionario  (estilo suave)
// ============================================================

export default function PaginaDiccionario() {
  const planActual = useMemo(() => obtenerPlanActual(), []);
  const senasBase = useMemo(() => obtenerSenasDiccionario(), []);
  const [senasPublicadas, setSenasPublicadas] = useState([]);
  const senasBasePermitidas = useMemo(
    () => senasBase.filter((sena) => puedeAccederLeccion(sena.leccionId, planActual)),
    [senasBase, planActual]
  );
  const senasPublicadasPermitidas = useMemo(
    () => senasPublicadas.filter((sena) => puedeAccederLeccion(sena.leccionId, planActual)),
    [senasPublicadas, planActual]
  );
  const senas = useMemo(
    () => [...senasPublicadasPermitidas, ...senasBasePermitidas],
    [senasBasePermitidas, senasPublicadasPermitidas]
  );
  const senasBloqueadas = senasBase.length + senasPublicadas.length - senas.length;
  const niveles = useMemo(() => obtenerNivelesDiccionario(), []);
  const [busqueda, setBusqueda] = useState('');
  const [nivelActivo, setNivelActivo] = useState('todos');
  const [senaActiva, setSenaActiva] = useState(senas[0] ?? null);
  const [favoritos, setFavoritos] = useState(() => obtenerFavoritosLocales());

  useEffect(() => {
    registrarDiccionarioEstadisticas();
    registrarEventoMision('explorar_diccionario');
    obtenerSenasPublicadas().then(setSenasPublicadas).catch(() => {});
  }, []);

  const senasFiltradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return senas.filter((sena) => {
      const coincideNivel = nivelActivo === 'todos' || sena.nivelId === nivelActivo;
      const coincideTexto =
        texto.length === 0 ||
        sena.palabra.toLowerCase().includes(texto) ||
        sena.descripcion.toLowerCase().includes(texto) ||
        sena.leccionTitulo.toLowerCase().includes(texto);
      return coincideNivel && coincideTexto;
    });
  }, [busqueda, nivelActivo, senas]);

  const seleccionarNivel = (nivelId) => {
    setNivelActivo(nivelId);
    const siguiente = senas.find((sena) => nivelId === 'todos' || sena.nivelId === nivelId);
    setSenaActiva(siguiente ?? null);
  };

  const alternarFavorita = (senaId) => setFavoritos(alternarFavoritoLocal(senaId));

  const chipBase =
    'rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors';

  return (
    <AppShell title="Diccionario">
      <div className="flex flex-col gap-5">
        {senasBloqueadas > 0 && (
          <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4">
            <div>
              <p className="font-semibold text-violet-900">
                Diccionario limitado por tu plan
              </p>
              <p className="text-sm text-violet-700/80">
                Hay {senasBloqueadas} señas premium disponibles con Plus.
              </p>
            </div>
            <Link
              href="/suscripcion?plan=plus"
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white text-center hover:bg-violet-700 transition-colors"
            >
              Ver Plus
            </Link>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
          {/* Lista */}
          <div className="flex flex-col gap-4">
            {/* Buscador */}
            <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5">
              <Search size={18} className="text-neutral-400 shrink-0" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar seña, lección o tema"
                aria-label="Buscar seña, lección o tema"
                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
              <span className="text-xs text-neutral-400 shrink-0">
                {senasFiltradas.length}
              </span>
            </div>

            {/* Filtros de nivel */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => seleccionarNivel('todos')}
                className={`${chipBase} ${
                  nivelActivo === 'todos'
                    ? 'bg-violet-600 border-violet-600 text-white'
                    : 'bg-white border-black/10 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                Todo
              </button>
              {niveles.map((nivel) => (
                <button
                  key={nivel.id}
                  onClick={() => seleccionarNivel(nivel.id)}
                  className={`${chipBase} ${
                    nivelActivo === nivel.id
                      ? 'bg-violet-600 border-violet-600 text-white'
                      : 'bg-white border-black/10 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {nivel.icono} Nivel {nivel.numero}
                </button>
              ))}
            </div>

            {/* Grid de señas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {senasFiltradas.map((sena) => {
                const activa = senaActiva?.id === sena.id;
                return (
                  <button
                    key={sena.id}
                    onClick={() => setSenaActiva(sena)}
                    className={`text-left rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                      activa ? 'border-violet-400 ring-2 ring-violet-200' : 'border-black/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span
                        className="grid place-items-center w-11 h-11 rounded-xl text-xl shrink-0"
                        style={{ backgroundColor: `${sena.nivelColor}22` }}
                      >
                        {sena.nivelIcono}
                      </span>
                      <span className="rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-semibold text-neutral-500">
                        Nivel {sena.nivelNumero}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg leading-tight">{sena.palabra}</h3>
                    <p className="mt-1 text-xs text-neutral-500 line-clamp-2">
                      {sena.descripcion}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-[11px] text-neutral-400 truncate">
                        {sena.leccionTitulo}
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700 shrink-0">
                        <Star size={12} fill={favoritos.includes(sena.id) ? 'currentColor' : 'none'} />
                        {sena.xp}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {senasFiltradas.length === 0 && (
              <div className="rounded-2xl border border-black/5 bg-white p-8 text-center text-sm text-neutral-500 shadow-sm">
                Sin resultados
              </div>
            )}
          </div>

          {/* Detalle */}
          <aside className="lg:sticky lg:top-24">
            {senaActiva ? (
              <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs font-medium text-neutral-500">
                      {senaActiva.nivelTitulo}
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight">
                      {senaActiva.palabra}
                    </h2>
                  </div>
                  <button
                    onClick={() => alternarFavorita(senaActiva.id)}
                    className={`grid place-items-center w-10 h-10 rounded-xl border transition-colors ${
                      esFavoritaLocal(senaActiva.id)
                        ? 'border-violet-200 bg-violet-100 text-violet-700'
                        : 'border-black/10 bg-white text-neutral-400 hover:bg-neutral-50'
                    }`}
                    aria-label="Guardar favorita"
                  >
                    <Star size={20} fill={favoritos.includes(senaActiva.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 mb-3">{senaActiva.descripcion}</p>

                {senaActiva.origen === 'panel' && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-semibold text-sky-700">
                      Variante: {senaActiva.region}
                    </span>
                    {senaActiva.credito && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                        Seña por {senaActiva.credito}
                      </span>
                    )}
                  </div>
                )}

                <div className="overflow-hidden rounded-xl">
                  <VideoPlayer
                    src={senaActiva.videoUrl}
                    poster={senaActiva.posterUrl}
                    titulo={senaActiva.palabra}
                  />
                </div>

                <div className="mt-4 rounded-xl bg-neutral-50 border border-black/5 p-3">
                  <p className="text-xs text-neutral-500">Lección</p>
                  <p className="font-semibold">{senaActiva.leccionTitulo}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
                <BookOpen size={36} className="mx-auto text-neutral-300 mb-3" />
                <p className="text-sm text-neutral-500">Elige una seña</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
