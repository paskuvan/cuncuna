'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Filter, Search, Star } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
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

export default function PaginaDiccionario() {
  const senas = useMemo(() => obtenerSenasDiccionario(), []);
  const niveles = useMemo(() => obtenerNivelesDiccionario(), []);
  const [busqueda, setBusqueda] = useState('');
  const [nivelActivo, setNivelActivo] = useState('todos');
  const [senaActiva, setSenaActiva] = useState(senas[0] ?? null);
  const [favoritos, setFavoritos] = useState(() => obtenerFavoritosLocales());

  useEffect(() => {
    registrarDiccionarioEstadisticas();
    registrarEventoMision('explorar_diccionario');
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

  const alternarFavorita = (senaId) => {
    setFavoritos(alternarFavoritoLocal(senaId));
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <header className="bg-black border-b-[4px] border-black sticky top-0 z-20">
        <div className="max-w-6xl mx-auto p-4 flex items-center gap-3">
          <Link
            href="/app"
            className="bg-white border-[3px] border-white p-2 hover:translate-x-[-2px] transition-transform"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            aria-label="Volver"
          >
            <ArrowLeft size={20} strokeWidth={3} className="text-black" />
          </Link>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <BookOpen size={24} strokeWidth={3} className="text-[#FFD23F]" />
            <div className="min-w-0">
              <h1 className="text-white font-black text-xl md:text-2xl uppercase leading-none">
                Diccionario
              </h1>
              <p className="text-white/70 text-xs font-bold uppercase tracking-wider hidden sm:block">
                {senas.length} señas disponibles
              </p>
            </div>
          </div>

          <div
            className="bg-[#FFD23F] border-[3px] border-white px-3 py-1.5 font-black text-black text-sm"
            style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
          >
            LSCh
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
          <div className="space-y-5">
            <div
              className="bg-[#FFD23F] border-[4px] border-black p-5 md:p-6"
              style={{ boxShadow: '10px 10px 0 #000' }}
            >
              <p className="font-black uppercase text-xs tracking-[0.2em] text-black/70 mb-2">
                Biblioteca visual
              </p>
              <h2 className="font-black uppercase text-3xl md:text-5xl text-black leading-none mb-4">
                Señas por nivel
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-3">
                <label
                  className="bg-white border-[3px] border-black flex items-center gap-2 px-3 py-2"
                  style={{ boxShadow: '4px 4px 0 #000' }}
                >
                  <Search size={20} strokeWidth={3} className="text-black shrink-0" />
                  <input
                    value={busqueda}
                    onChange={(event) => setBusqueda(event.target.value)}
                    placeholder="Buscar seña, lección o tema"
                    className="w-full bg-transparent outline-none font-bold text-black placeholder:text-black/50"
                  />
                </label>

                <div
                  className="bg-black border-[3px] border-black px-3 py-2 flex items-center gap-2"
                  style={{ boxShadow: '4px 4px 0 #fff' }}
                >
                  <Filter size={18} strokeWidth={3} className="text-[#FFD23F]" />
                  <span className="font-black uppercase text-white text-xs whitespace-nowrap">
                    {senasFiltradas.length} resultados
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => seleccionarNivel('todos')}
                className={`border-[3px] border-black px-4 py-2 font-black uppercase text-xs whitespace-nowrap transition-transform hover:translate-y-[-2px] ${
                  nivelActivo === 'todos' ? 'bg-black text-[#FFD23F]' : 'bg-white text-black'
                }`}
                style={{ boxShadow: '4px 4px 0 #000' }}
              >
                Todo
              </button>

              {niveles.map((nivel) => (
                <button
                  key={nivel.id}
                  onClick={() => seleccionarNivel(nivel.id)}
                  className={`border-[3px] border-black px-4 py-2 font-black uppercase text-xs whitespace-nowrap transition-transform hover:translate-y-[-2px] ${
                    nivelActivo === nivel.id ? 'text-black' : 'bg-white text-black'
                  }`}
                  style={{
                    backgroundColor: nivelActivo === nivel.id ? nivel.color : undefined,
                    boxShadow: '4px 4px 0 #000',
                  }}
                >
                  {nivel.icono} Nivel {nivel.numero}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {senasFiltradas.map((sena) => {
                const activa = senaActiva?.id === sena.id;

                return (
                  <button
                    key={sena.id}
                    onClick={() => setSenaActiva(sena)}
                    className={`text-left border-[3px] border-black p-4 transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] ${
                      activa ? 'bg-[#7FFF6B]' : 'bg-white'
                    }`}
                    style={{ boxShadow: activa ? '7px 7px 0 #000' : '5px 5px 0 #000' }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div
                        className="border-[3px] border-black w-12 h-12 flex items-center justify-center text-2xl shrink-0"
                        style={{
                          backgroundColor: sena.nivelColor,
                          boxShadow: '3px 3px 0 #000',
                        }}
                      >
                        {sena.nivelIcono}
                      </div>
                      <div className="bg-black text-[#FFD23F] px-2 py-1 border-2 border-black font-black text-[10px] uppercase">
                        Nivel {sena.nivelNumero}
                      </div>
                    </div>

                    <h3 className="font-black uppercase text-xl text-black leading-tight mb-1">
                      {sena.palabra}
                    </h3>
                    <p className="text-black/70 font-bold text-xs mb-3 line-clamp-2">
                      {sena.descripcion}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-black uppercase text-[10px] text-black/50 truncate">
                        {sena.leccionTitulo}
                      </span>
                      <span className="flex items-center gap-1 bg-black text-[#FFD23F] px-2 py-1 font-black text-xs shrink-0">
                        <Star
                          size={12}
                          strokeWidth={3}
                          fill={favoritos.includes(sena.id) ? '#FFD23F' : 'none'}
                        />
                        {sena.xp}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {senasFiltradas.length === 0 && (
              <div
                className="bg-white border-[3px] border-black p-6 text-center"
                style={{ boxShadow: '6px 6px 0 #000' }}
              >
                <p className="font-black uppercase text-black">Sin resultados</p>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24">
            {senaActiva ? (
              <div
                className="bg-white border-[4px] border-black p-4"
                style={{ boxShadow: '10px 10px 0 #000' }}
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black uppercase text-xs tracking-[0.2em] text-black/50 mb-1">
                        {senaActiva.nivelTitulo}
                      </p>
                      <h2 className="font-black uppercase text-3xl text-black leading-none">
                        {senaActiva.palabra}
                      </h2>
                    </div>
                    <button
                      onClick={() => alternarFavorita(senaActiva.id)}
                      className={`border-[3px] border-black p-2 hover:translate-y-[-2px] transition-transform ${
                        esFavoritaLocal(senaActiva.id) ? 'bg-[#FFD23F]' : 'bg-white'
                      }`}
                      style={{ boxShadow: '3px 3px 0 #000' }}
                      aria-label="Guardar favorita"
                    >
                      <Star
                        size={22}
                        strokeWidth={3}
                        className="text-black"
                        fill={favoritos.includes(senaActiva.id) ? 'black' : 'none'}
                      />
                    </button>
                  </div>
                  <p className="font-bold text-black/70 text-sm mt-2">
                    {senaActiva.descripcion}
                  </p>
                </div>

                <VideoPlayer
                  src={senaActiva.videoUrl}
                  poster={senaActiva.posterUrl}
                  titulo={senaActiva.palabra}
                />

                <div
                  className="mt-4 border-[3px] border-black p-3"
                  style={{
                    backgroundColor: senaActiva.nivelColor,
                    boxShadow: '4px 4px 0 #000',
                  }}
                >
                  <p className="font-black uppercase text-xs text-black/70">
                    Lección
                  </p>
                  <p className="font-black uppercase text-black">
                    {senaActiva.leccionTitulo}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="bg-white border-[4px] border-black p-6 text-center"
                style={{ boxShadow: '10px 10px 0 #000' }}
              >
                <BookOpen size={42} strokeWidth={3} className="mx-auto text-black mb-3" />
                <p className="font-black uppercase text-black">Elige una seña</p>
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}
