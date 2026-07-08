'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Flag, RotateCcw, Star } from 'lucide-react';
import {
  obtenerMisionesConProgreso,
  reiniciarMisionesHoy,
} from '../../lib/misiones-locales';

export default function PaginaMisiones() {
  const [misiones, setMisiones] = useState(() => obtenerMisionesConProgreso());

  const completadas = misiones.filter((mision) => mision.completada).length;
  const xpGanado = misiones
    .filter((mision) => mision.completada)
    .reduce((total, mision) => total + mision.xp, 0);
  const xpDisponible = misiones.reduce((total, mision) => total + mision.xp, 0);
  const porcentaje = (completadas / misiones.length) * 100;

  const reiniciar = () => {
    setMisiones(reiniciarMisionesHoy());
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
              Misiones
            </h1>
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider hidden sm:block">
              Metas diarias
            </p>
          </div>
          <div
            className="bg-[#FFD23F] border-[3px] border-white px-3 py-1.5 font-black text-black text-sm"
            style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
          >
            {completadas}/{misiones.length}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6">
        <section
          className="bg-[#FFD23F] border-[4px] border-black p-5 md:p-7 mb-6"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Flag size={24} strokeWidth={3} className="text-black" />
            <p className="font-black uppercase text-xs tracking-[0.2em] text-black/70">
              Hoy
            </p>
          </div>
          <h2 className="font-black uppercase text-4xl md:text-5xl text-black leading-none mb-4">
            {xpGanado}
            <span className="text-[#FF6B9D]">/</span>
            {xpDisponible}
            <span className="block text-lg md:text-xl text-black/70 mt-2">
              XP de misiones
            </span>
          </h2>
          <div
            className="h-6 bg-white border-[3px] border-black overflow-hidden"
            style={{ boxShadow: '4px 4px 0 #000' }}
          >
            <div
              className="h-full bg-black transition-all duration-300 flex items-center justify-end pr-2"
              style={{ width: `${porcentaje}%` }}
            >
              {completadas > 0 && (
                <span className="text-[#FFD23F] font-black text-xs">
                  {Math.round(porcentaje)}%
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {misiones.map((mision) => {
            const progreso = (mision.progreso / mision.objetivo) * 100;

            return (
              <article
                key={mision.id}
                className="bg-white border-[3px] border-black p-4"
                style={{ boxShadow: '6px 6px 0 #000' }}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="border-[3px] border-black w-12 h-12 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: mision.color, boxShadow: '3px 3px 0 #000' }}
                  >
                    {mision.completada ? (
                      <Check size={24} strokeWidth={4} className="text-black" />
                    ) : (
                      <Flag size={24} strokeWidth={3} className="text-black" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black uppercase text-xl text-black leading-none">
                      {mision.titulo}
                    </h3>
                    <p className="font-bold text-black/70 text-sm mt-1">
                      {mision.descripcion}
                    </p>
                  </div>
                  <div className="bg-black text-[#FFD23F] px-2 py-1 border-2 border-black font-black text-xs flex items-center gap-1 shrink-0">
                    <Star size={12} strokeWidth={3} fill="#FFD23F" />
                    {mision.xp}
                  </div>
                </div>

                <div
                  className="h-5 bg-[#F5F0E8] border-[3px] border-black overflow-hidden"
                  style={{ boxShadow: '3px 3px 0 #000' }}
                >
                  <div
                    className="h-full transition-all duration-300"
                    style={{ width: `${progreso}%`, backgroundColor: mision.color }}
                  />
                </div>
                <p className="font-black uppercase text-xs text-black/60 mt-2">
                  {mision.progreso}/{mision.objetivo}
                </p>
              </article>
            );
          })}
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app/repaso"
            className="bg-black text-[#FFD23F] border-[3px] border-black px-4 py-3 font-black uppercase text-sm hover:translate-y-[-2px] transition-transform"
            style={{ boxShadow: '5px 5px 0 #FF6B9D' }}
          >
            Ir a repaso
          </Link>
          <Link
            href="/app/diccionario"
            className="bg-white text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm hover:translate-y-[-2px] transition-transform"
            style={{ boxShadow: '5px 5px 0 #000' }}
          >
            Abrir diccionario
          </Link>
          <button
            onClick={reiniciar}
            className="bg-[#FF6B6B] text-white border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 hover:translate-y-[-2px] transition-transform"
            style={{ boxShadow: '5px 5px 0 #000' }}
          >
            <RotateCcw size={18} strokeWidth={4} />
            Reiniciar hoy
          </button>
        </div>
      </main>
    </div>
  );
}
