'use client';

import {
  Flame,
  Star,
  Trophy,
  CheckCircle2,
  Circle,
  PlayCircle,
  Bell,
  ArrowRight,
} from 'lucide-react';

// ============================================================
// DashboardContenido — vista principal de /app (estilo suave).
// Presentacional: recibe todos los datos ya calculados.
// ============================================================

function StatPill({ icon: Icon, valor, label, tono }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4">
      <span className={`grid place-items-center w-10 h-10 rounded-xl ${tono}`}>
        <Icon size={20} />
      </span>
      <div>
        <p className="text-xl font-bold leading-none">{valor}</p>
        <p className="text-xs text-neutral-500 mt-1">{label}</p>
      </div>
    </div>
  );
}

function NivelCard({ nivel, onAbrir }) {
  return (
    <button
      type="button"
      onClick={() => onAbrir?.(nivel)}
      className="text-left rounded-2xl border border-black/5 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-neutral-500">Nivel</p>
          <h3 className="text-lg font-bold tracking-tight">{nivel.titulo}</h3>
        </div>
        <span
          className="grid place-items-center w-11 h-11 rounded-xl text-xl shrink-0"
          style={{ backgroundColor: `${nivel.color}22` }}
        >
          {nivel.icono}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-neutral-500">Progreso</span>
        <span className="font-bold">{nivel.pct}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-neutral-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${nivel.pct}%`, backgroundColor: nivel.color }}
        />
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        {nivel.completadas} de {nivel.total} lecciones
      </p>
    </button>
  );
}

function FilaLeccion({ leccion, onAbrir }) {
  const Estado =
    leccion.estado === 'completada'
      ? CheckCircle2
      : leccion.estado === 'en-progreso'
        ? PlayCircle
        : Circle;
  const colorEstado =
    leccion.estado === 'completada'
      ? 'text-emerald-500'
      : leccion.estado === 'en-progreso'
        ? 'text-violet-600'
        : 'text-neutral-300';

  return (
    <button
      type="button"
      onClick={() => onAbrir?.(leccion)}
      className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-neutral-50 transition-colors"
    >
      <Estado size={22} className={`shrink-0 ${colorEstado}`} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold truncate">{leccion.titulo}</p>
        <p className="text-xs text-neutral-500 truncate">{leccion.nivelTitulo}</p>
      </div>
      <div className="hidden sm:block w-28">
        <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${leccion.pct}%` }}
          />
        </div>
      </div>
      <span className="hidden md:block text-xs text-neutral-500 w-12 text-right">
        {leccion.hechos}/{leccion.total}
      </span>
      <ArrowRight size={16} className="text-neutral-300 shrink-0" />
    </button>
  );
}

export default function DashboardContenido({
  stats,
  niveles = [],
  continuar = [],
  proxima = null,
  recordatorio = null,
  logrosRecientes = [],
  onSeleccionarLeccion,
  onSeleccionarNivel,
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
      {/* Columna principal */}
      <div className="flex flex-col gap-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatPill icon={Star} valor={stats.xp} label="XP total" tono="bg-violet-100 text-violet-700" />
          <StatPill icon={Flame} valor={stats.racha} label="Días de racha" tono="bg-orange-100 text-orange-600" />
          <StatPill icon={CheckCircle2} valor={`${stats.leccionesCompletadas}/${stats.totalLecciones}`} label="Lecciones" tono="bg-emerald-100 text-emerald-600" />
          <StatPill icon={Trophy} valor={stats.logros} label="Logros" tono="bg-amber-100 text-amber-600" />
        </div>

        {/* Niveles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {niveles.slice(0, 3).map((n) => (
            <NivelCard key={n.id} nivel={n} onAbrir={onSeleccionarNivel} />
          ))}
        </div>

        {/* Continuar aprendiendo */}
        <section className="rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
            <h2 className="font-bold tracking-tight">Continuar aprendiendo</h2>
            <span className="text-xs text-neutral-500">{continuar.length} lecciones</span>
          </div>
          <div className="divide-y divide-black/5">
            {continuar.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-neutral-500">
                ¡Todo al día! No tienes lecciones pendientes.
              </p>
            ) : (
              continuar.map((l) => (
                <FilaLeccion key={l.id} leccion={l} onAbrir={onSeleccionarLeccion} />
              ))
            )}
          </div>
        </section>
      </div>

      {/* Columna lateral */}
      <div className="flex flex-col gap-6">
        {/* Próxima lección / recordatorio */}
        <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-violet-600">
            <Bell size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              {recordatorio?.activo ? `Recordatorio · ${recordatorio.hora}` : 'Tu próxima lección'}
            </span>
          </div>
          {proxima ? (
            <>
              <h3 className="mt-3 text-lg font-bold tracking-tight leading-snug">
                {proxima.titulo}
              </h3>
              <p className="mt-2 text-sm text-neutral-500">{proxima.descripcion}</p>
              <button
                type="button"
                onClick={() => onSeleccionarLeccion?.(proxima)}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
              >
                <PlayCircle size={18} />
                Empezar
              </button>
            </>
          ) : (
            <p className="mt-3 text-sm text-neutral-500">
              ¡Felicidades! Completaste todas las lecciones disponibles.
            </p>
          )}
        </section>

        {/* Logros recientes */}
        <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold tracking-tight">Logros recientes</h3>
            <Trophy size={16} className="text-amber-500" />
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {logrosRecientes.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Aún no tienes logros. ¡Completa una lección para empezar!
              </p>
            ) : (
              logrosRecientes.slice(0, 4).map((l) => (
                <div key={l.id} className="flex items-center gap-3">
                  <span
                    className="grid place-items-center w-10 h-10 rounded-xl text-lg shrink-0"
                    style={{ backgroundColor: `${l.color}22` }}
                  >
                    {l.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{l.titulo}</p>
                    <p className="text-xs text-neutral-500 truncate">{l.descripcion}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
