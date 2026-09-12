'use client';

import { Lock, Trophy } from 'lucide-react';
import { useLogros } from '../../hooks/useLogros';
import AppShell from '../../components/dashboard/AppShell';

// ============================================================
// PÁGINA: /app/logros  (estilo suave)
// Galería de badges: obtenidos a color, pendientes bloqueados.
// ============================================================

export default function PaginaLogros() {
  const { logrosObtenidos, todosLosLogros, cargando } = useLogros();

  const obtenidos = todosLosLogros.filter((l) => logrosObtenidos.includes(l.id));
  const pendientes = todosLosLogros.filter((l) => !logrosObtenidos.includes(l.id));
  const total = todosLosLogros.length || 1;
  const porcentaje = Math.round((obtenidos.length / total) * 100);

  return (
    <AppShell title="Logros">
      {cargando ? (
        <div className="grid place-items-center py-20 text-neutral-400 animate-pulse">
          Cargando…
        </div>
      ) : (
        <div className="flex flex-col gap-8 max-w-5xl">
          {/* Resumen */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-amber-500">
              <Trophy size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Tu colección
              </span>
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-4xl font-bold tracking-tight">
                {obtenidos.length}
              </span>
              <span className="text-lg text-neutral-400 mb-1">
                / {todosLosLogros.length} badges
              </span>
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-violet-600 transition-all"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-neutral-500">{porcentaje}% desbloqueado</p>
          </section>

          {/* Desbloqueados */}
          {obtenidos.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-bold tracking-tight">Desbloqueados</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {obtenidos.map((logro) => (
                  <BadgeCard key={logro.id} logro={logro} obtenido />
                ))}
              </div>
            </section>
          )}

          {/* Por desbloquear */}
          {pendientes.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-bold tracking-tight">Por desbloquear</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {pendientes.map((logro) => (
                  <BadgeCard key={logro.id} logro={logro} obtenido={false} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </AppShell>
  );
}

function BadgeCard({ logro, obtenido }) {
  return (
    <div
      className={`rounded-2xl border border-black/5 p-5 text-center shadow-sm transition-shadow ${
        obtenido ? 'bg-white hover:shadow-md' : 'bg-neutral-50'
      }`}
    >
      <div className="flex justify-center mb-3">
        <span
          className="grid place-items-center w-16 h-16 rounded-2xl text-3xl"
          style={{
            backgroundColor: obtenido ? `${logro.color}22` : '#F0F0F0',
          }}
        >
          {obtenido ? (
            logro.emoji
          ) : (
            <Lock size={24} className="text-neutral-300" />
          )}
        </span>
      </div>
      <h3 className="text-sm font-semibold leading-tight">
        {obtenido ? logro.titulo : '???'}
      </h3>
      <p className="mt-1 text-xs text-neutral-500 leading-snug">
        {logro.descripcion}
      </p>
    </div>
  );
}
