'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Flag, RotateCcw, Star } from 'lucide-react';
import {
  obtenerMisionesConProgreso,
  reiniciarMisionesHoy,
} from '../../lib/misiones-locales';
import AppShell from '../../components/dashboard/AppShell';

// ============================================================
// PÁGINA: /app/misiones  (estilo suave)
// ============================================================

export default function PaginaMisiones() {
  const [misiones, setMisiones] = useState(() => obtenerMisionesConProgreso());

  const completadas = misiones.filter((m) => m.completada).length;
  const xpGanado = misiones.filter((m) => m.completada).reduce((t, m) => t + m.xp, 0);
  const xpDisponible = misiones.reduce((t, m) => t + m.xp, 0);
  const porcentaje = misiones.length ? (completadas / misiones.length) * 100 : 0;

  const reiniciar = () => setMisiones(reiniciarMisionesHoy());

  return (
    <AppShell title="Misiones">
      <div className="flex flex-col gap-6 max-w-5xl">
        {/* Resumen del día */}
        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-violet-600">
            <Flag size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Metas de hoy
            </span>
          </div>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-4xl font-bold tracking-tight">{xpGanado}</span>
            <span className="text-lg text-neutral-400 mb-1">/ {xpDisponible} XP</span>
          </div>
          <div className="mt-4 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-violet-600 transition-all"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-neutral-500">
            {completadas} de {misiones.length} misiones completas
          </p>
        </section>

        {/* Lista de misiones */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {misiones.map((mision) => {
            const progreso = mision.objetivo
              ? (mision.progreso / mision.objetivo) * 100
              : 0;
            return (
              <article
                key={mision.id}
                className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <span
                      className="grid place-items-center w-11 h-11 rounded-xl shrink-0"
                      style={{ backgroundColor: `${mision.color}22` }}
                    >
                      {mision.completada ? (
                        <Check size={20} className="text-emerald-600" />
                      ) : (
                        <Flag size={20} style={{ color: mision.color }} />
                      )}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-tight">{mision.titulo}</h3>
                      <p className="mt-0.5 text-sm text-neutral-500">
                        {mision.descripcion}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700 shrink-0">
                    <Star size={12} fill="currentColor" />
                    {mision.xp}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${progreso}%`, backgroundColor: mision.color }}
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-500">
                  {mision.progreso}/{mision.objetivo}
                </p>
              </article>
            );
          })}
        </section>

        {/* Acciones */}
        <div className="flex flex-wrap gap-3">
          <Link href="/app/repaso" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors">
            Ir a repaso
          </Link>
          <Link href="/app/diccionario" className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
            Abrir diccionario
          </Link>
          <button
            onClick={reiniciar}
            className="ml-auto inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <RotateCcw size={16} />
            Reiniciar hoy
          </button>
        </div>
      </div>
    </AppShell>
  );
}
