'use client';

import { Check, Lock, Star, Flame, BookOpen, Sparkles } from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';
import CuncunaCabeza from './CuncunaCabeza';
import UsuarioMenu from './UsuarioMenu';

// ============================================================
// COMPONENTE: Mapa
// Vista principal de la app:
//   - Header con stats (racha, XP)
//   - Hero con progreso global
//   - Lista de niveles con sus lecciones
//   - Sistema de desbloqueo progresivo
//   - Botón de reinicio en footer
//
// Props:
//   - progreso: { leccionesCompletadas, xpTotal, racha }
//   - onSeleccionarLeccion: (leccion, nivel) => void
//   - onReiniciar: () => void
// ============================================================

export default function Mapa({ progreso, onSeleccionarLeccion, onReiniciar }) {
  const totalLecciones = CURRICULUM.reduce((acc, n) => acc + n.lecciones.length, 0);
  const completadas = progreso.leccionesCompletadas.length;

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* HEADER */}
      <header className="bg-black border-b-[4px] border-black sticky top-0 z-10">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="bg-[#FFD23F] border-[3px] border-white p-2"
              style={{ boxShadow: '4px 4px 0 #FF6B9D' }}
            >
              <CuncunaCabeza size={36} />
            </div>
            <div>
              <h1 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight leading-none">
                Cuncuna<span className="text-[#FFD23F]">.</span>
              </h1>
              <p className="text-white/70 text-xs font-bold uppercase tracking-wider">
                De seña en seña
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="bg-[#FF6B9D] border-[3px] border-white px-3 py-1.5 flex items-center gap-1.5"
              style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            >
              <Flame size={16} strokeWidth={3} className="text-white" />
              <span className="text-white font-black text-sm">{progreso.racha}</span>
            </div>
            <div
              className="bg-[#FFD23F] border-[3px] border-white px-3 py-1.5 flex items-center gap-1.5"
              style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
            >
              <Star size={16} strokeWidth={3} className="text-black" fill="black" />
              <span className="text-black font-black text-sm">{progreso.xpTotal}</span>
            </div>
             <div className="flex items-center gap-2">
  {/* Racha y XP que ya están... */}

  <UsuarioMenu />   {/* ← agregar al final */}
</div>
          </div>
        </div>
       
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {/* HERO */}
        <section className="mb-8 mt-2">
          <div
            className="bg-[#FFD23F] border-[4px] border-black p-6 md:p-8 relative overflow-hidden"
            style={{ boxShadow: '12px 12px 0 #000' }}
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FF6B9D] border-[4px] border-black rounded-full" />
            <div className="absolute top-4 right-4 z-10">
              <Sparkles size={28} strokeWidth={3} className="text-black" />
            </div>

            <div className="relative z-[2]">
              <p className="font-black uppercase text-xs tracking-[0.2em] text-black mb-2">
                Tu progreso
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-black leading-none mb-4 tracking-tight">
                {completadas}
                <span className="text-[#FF6B9D]">/</span>
                {totalLecciones}
                <span className="block text-lg md:text-xl mt-2 text-black/70">
                  lecciones completas
                </span>
              </h2>

              <div
                className="h-6 bg-white border-[3px] border-black overflow-hidden mb-2"
                style={{ boxShadow: '4px 4px 0 #000' }}
              >
                <div
                  className="h-full bg-black transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${(completadas / totalLecciones) * 100}%` }}
                >
                  {completadas > 0 && (
                    <span className="text-[#FFD23F] font-black text-xs">
                      {Math.round((completadas / totalLecciones) * 100)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NIVELES */}
        <section className="space-y-8">
          {CURRICULUM.map((nivel, idxNivel) => {
            const leccionesNivel = nivel.lecciones.length;
            const completadasNivel = nivel.lecciones.filter((l) =>
              progreso.leccionesCompletadas.includes(l.id)
            ).length;
            const nivelDesbloqueado =
              idxNivel === 0 ||
              CURRICULUM[idxNivel - 1].lecciones.every((l) =>
                progreso.leccionesCompletadas.includes(l.id)
              );

            return (
              <div key={nivel.id} className="relative">
                {/* Banner del nivel */}
                <div
                  className="border-[4px] border-black p-5 mb-5 flex items-center gap-4 relative"
                  style={{
                    backgroundColor: nivelDesbloqueado ? nivel.color : '#D4D4D4',
                    boxShadow: '8px 8px 0 #000',
                  }}
                >
                  <div
                    className="text-5xl bg-white w-16 h-16 flex items-center justify-center border-[3px] border-black shrink-0"
                    style={{ boxShadow: '4px 4px 0 #000' }}
                  >
                    {nivelDesbloqueado ? nivel.icono : '🔒'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black uppercase text-xs tracking-[0.2em] text-black/70">
                      Nivel {idxNivel + 1}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-black leading-none truncate">
                      {nivel.titulo}
                    </h3>
                    <p className="text-black font-bold text-sm mt-1 truncate">
                      {nivel.descripcion}
                    </p>
                  </div>
                  <div
                    className="bg-black text-white border-[3px] border-black px-3 py-2 font-black text-center shrink-0"
                    style={{ boxShadow: '3px 3px 0 #fff' }}
                  >
                    <div className="text-xl leading-none">{completadasNivel}</div>
                    <div className="text-[10px] uppercase tracking-wider">de {leccionesNivel}</div>
                  </div>
                </div>

                {/* Grid de lecciones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-0 md:ml-6">
                  {nivel.lecciones.map((leccion, idxLeccion) => {
                    const completada = progreso.leccionesCompletadas.includes(leccion.id);
                    const leccionAnterior =
                      idxLeccion === 0 ? null : nivel.lecciones[idxLeccion - 1];
                    const desbloqueada =
                      nivelDesbloqueado &&
                      (idxLeccion === 0 ||
                        progreso.leccionesCompletadas.includes(leccionAnterior?.id));

                    return (
                      <button
                        key={leccion.id}
                        onClick={() => desbloqueada && onSeleccionarLeccion(leccion, nivel)}
                        disabled={!desbloqueada}
                        className={`text-left border-[3px] border-black p-4 relative transition-all ${
                          desbloqueada
                            ? 'bg-white hover:translate-x-[-3px] hover:translate-y-[-3px] active:translate-x-0 active:translate-y-0 cursor-pointer'
                            : 'bg-gray-200 cursor-not-allowed opacity-70'
                        }`}
                        style={{
                          boxShadow: desbloqueada ? '6px 6px 0 #000' : '3px 3px 0 #000',
                        }}
                      >
                        {completada && (
                          <div
                            className="absolute -top-3 -right-3 bg-[#7FFF6B] border-[3px] border-black p-1.5"
                            style={{ boxShadow: '3px 3px 0 #000' }}
                          >
                            <Check size={16} strokeWidth={4} className="text-black" />
                          </div>
                        )}
                        {!desbloqueada && (
                          <div className="absolute top-3 right-3">
                            <Lock size={20} strokeWidth={3} className="text-black/40" />
                          </div>
                        )}
                        <div className="font-black uppercase text-[10px] tracking-[0.15em] text-black/50 mb-1">
                          Lección {idxLeccion + 1}
                        </div>
                        <h4 className="font-black uppercase text-lg text-black leading-tight mb-1">
                          {leccion.titulo}
                        </h4>
                        <p className="text-black/70 font-bold text-xs mb-3 line-clamp-2">
                          {leccion.descripcion}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 bg-black text-[#FFD23F] px-2 py-1 border-2 border-black font-black text-xs">
                            <Star size={12} strokeWidth={3} fill="#FFD23F" />
                            {leccion.xp} XP
                          </div>
                          <span className="text-black/60 font-black text-[10px] uppercase tracking-wider">
                            {leccion.ejercicios.length} ejerc.
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* FOOTER */}
        <footer className="mt-12 mb-6 text-center">
          <div
            className="inline-block bg-white border-[3px] border-black p-4"
            style={{ boxShadow: '6px 6px 0 #000' }}
          >
            <p className="font-black uppercase text-sm text-black mb-2">¿Empezar de nuevo?</p>
            <button
              onClick={() => {
                if (confirm('¿Seguro? Perderás todo tu progreso.')) onReiniciar();
              }}
              className="bg-[#FF6B6B] text-white border-[3px] border-black px-4 py-2 font-black uppercase text-xs tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform"
              style={{ boxShadow: '4px 4px 0 #000' }}
            >
              Reiniciar progreso
            </button>
          </div>
          <p className="mt-6 font-black uppercase text-xs text-black/50 tracking-[0.2em]">
            Hecho con cariño para la comunidad sorda
          </p>
        </footer>
      </main>
    </div>
  );
}
