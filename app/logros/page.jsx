'use client';

import Link from 'next/link';
import { ArrowLeft, Lock, Trophy } from 'lucide-react';
import { useLogros } from '../hooks/useLogros';

// ============================================================
// PÁGINA: /logros
// Galería completa: badges obtenidos a color, pendientes en gris
// ============================================================

export default function PaginaLogros() {
  const { logrosObtenidos, todosLosLogros, cargando } = useLogros();

  const obtenidos = todosLosLogros.filter((l) => logrosObtenidos.includes(l.id));
  const pendientes = todosLosLogros.filter((l) => !logrosObtenidos.includes(l.id));
  const porcentaje = (obtenidos.length / todosLosLogros.length) * 100;

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <div className="font-black uppercase text-black tracking-widest animate-pulse">
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* HEADER */}
      <header className="bg-black border-b-[4px] border-black sticky top-0 z-10">
        <div className="max-w-4xl mx-auto p-4 flex items-center gap-3">
          <Link
            href="/"
            className="bg-white border-[3px] border-white p-2 hover:translate-x-[-2px] transition-transform"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            aria-label="Volver"
          >
            <ArrowLeft size={20} strokeWidth={3} className="text-black" />
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <Trophy size={24} strokeWidth={3} className="text-[#FFD23F]" fill="#FFD23F" />
            <h1 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight">
              Logros
            </h1>
          </div>
          <div
            className="bg-[#FFD23F] border-[3px] border-white px-3 py-1.5 font-black text-black"
            style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
          >
            {obtenidos.length}/{todosLosLogros.length}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {/* HERO con progreso */}
        <section className="mb-8">
          <div
            className="bg-[#FFD23F] border-[4px] border-black p-6 md:p-8"
            style={{ boxShadow: '12px 12px 0 #000' }}
          >
            <p className="font-black uppercase text-xs tracking-[0.2em] text-black mb-2">
              Tu colección
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-black leading-none mb-4 tracking-tight">
              {obtenidos.length}
              <span className="text-[#FF6B9D]">/</span>
              {todosLosLogros.length}
              <span className="block text-base md:text-lg mt-2 text-black/70">
                badges desbloqueados
              </span>
            </h2>

            <div
              className="h-6 bg-white border-[3px] border-black overflow-hidden"
              style={{ boxShadow: '4px 4px 0 #000' }}
            >
              <div
                className="h-full bg-black transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${porcentaje}%` }}
              >
                {porcentaje > 0 && (
                  <span className="text-[#FFD23F] font-black text-xs">
                    {Math.round(porcentaje)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* OBTENIDOS */}
        {obtenidos.length > 0 && (
          <section className="mb-10">
            <h3 className="font-black uppercase text-2xl text-black mb-4 tracking-tight">
              Desbloqueados
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {obtenidos.map((logro) => (
                <BadgeCard key={logro.id} logro={logro} obtenido />
              ))}
            </div>
          </section>
        )}

        {/* PENDIENTES */}
        {pendientes.length > 0 && (
          <section className="mb-10">
            <h3 className="font-black uppercase text-2xl text-black mb-4 tracking-tight">
              Por desbloquear
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {pendientes.map((logro) => (
                <BadgeCard key={logro.id} logro={logro} obtenido={false} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sub-componente: tarjeta de un badge
// ─────────────────────────────────────────────
function BadgeCard({ logro, obtenido }) {
  return (
    <div
      className={`border-[3px] border-black p-4 text-center transition-all ${
        obtenido ? 'bg-white' : 'bg-gray-200'
      }`}
      style={{ boxShadow: obtenido ? '6px 6px 0 #000' : '3px 3px 0 #000' }}
    >
      <div className="flex justify-center mb-3">
        <div
          className={`border-[3px] border-black w-20 h-20 flex items-center justify-center text-4xl ${
            !obtenido ? 'grayscale opacity-50' : ''
          }`}
          style={{
            backgroundColor: obtenido ? logro.color : '#D4D4D4',
            boxShadow: obtenido ? '4px 4px 0 #000' : '2px 2px 0 #000',
          }}
        >
          {obtenido ? logro.emoji : <Lock size={28} strokeWidth={3} className="text-black/50" />}
        </div>
      </div>
      <h4 className="font-black uppercase text-sm text-black leading-tight mb-1">
        {obtenido ? logro.titulo : '???'}
      </h4>
      <p className="text-xs text-black/70 font-bold leading-tight">
        {logro.descripcion}
      </p>
    </div>
  );
}
