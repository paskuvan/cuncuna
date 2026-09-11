'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Activity, BookOpen, Camera, RotateCcw, Target, Trophy } from 'lucide-react';
import { obtenerSenasDiccionario } from '../../lib/diccionario';
import { enriquecerSenasConErrores, obtenerErroresLocales } from '../../lib/errores-locales';
import {
  calcularPrecision,
  obtenerEstadisticasLocales,
  reiniciarEstadisticasLocales,
} from '../../lib/estadisticas-locales';
import { obtenerResumenMisiones } from '../../lib/misiones-locales';
import AppShell from '../../components/dashboard/AppShell';

// ============================================================
// PÁGINA: /app/estadisticas  (estilo suave)
// ============================================================

export default function PaginaEstadisticas() {
  const todasLasSenas = useMemo(() => obtenerSenasDiccionario(), []);
  const [stats, setStats] = useState(() => obtenerEstadisticasLocales());
  const errores = useMemo(
    () => enriquecerSenasConErrores(todasLasSenas, obtenerErroresLocales()),
    [todasLasSenas]
  );
  const resumenMisiones = useMemo(() => obtenerResumenMisiones(), []);
  const precision = calcularPrecision(stats);
  const cobertura = todasLasSenas.length
    ? Math.min(100, Math.round((stats.senasVistas / todasLasSenas.length) * 100))
    : 0;

  const reiniciar = () => setStats(reiniciarEstadisticasLocales());

  return (
    <AppShell title="Estadísticas">
      <div className="flex flex-col gap-6 max-w-5xl">
        {/* Precisión total */}
        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium text-neutral-500">Precisión total</p>
          <div className="mt-1 flex items-end gap-3">
            <span className="text-4xl font-bold tracking-tight">{precision}%</span>
          </div>
          <div className="mt-4 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${precision}%` }}
            />
          </div>
        </section>

        {/* Métricas */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <StatCard icon={Activity} titulo="Repasos" valor={stats.repasosCompletados} tono="bg-violet-100 text-violet-700" />
          <StatCard icon={BookOpen} titulo="Señas vistas" valor={stats.senasVistas} tono="bg-emerald-100 text-emerald-600" />
          <StatCard icon={Target} titulo="Errores" valor={errores.length} tono="bg-rose-100 text-rose-600" />
          <StatCard icon={Trophy} titulo="Misiones" valor={`${resumenMisiones.completadas}/${resumenMisiones.total}`} tono="bg-amber-100 text-amber-600" />
          <StatCard icon={Camera} titulo="Con cámara" valor={stats.senasPracticadasCamara.length} tono="bg-sky-100 text-sky-600" />
        </section>

        {/* Progreso */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PanelProgreso
            titulo="Cobertura del diccionario"
            valor={`${cobertura}%`}
            detalle={`${stats.senasVistas} vistas de ${todasLasSenas.length} señas disponibles`}
            porcentaje={cobertura}
            color="#10B981"
          />
          <PanelProgreso
            titulo="XP de misiones hoy"
            valor={`${resumenMisiones.xpGanado}/${resumenMisiones.xpDisponible}`}
            detalle={`${resumenMisiones.completadas} misiones completas`}
            porcentaje={(resumenMisiones.completadas / (resumenMisiones.total || 1)) * 100}
            color="#8B5CF6"
          />
        </section>

        {/* Actividad */}
        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold tracking-tight">Actividad</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <MiniDato etiqueta="Respuestas" valor={`${stats.respuestasCorrectas}/${stats.respuestasTotales}`} />
            <MiniDato etiqueta="Diccionario" valor={stats.visitasDiccionario} />
            <MiniDato etiqueta="Errores recuperados" valor={stats.erroresRecuperados} />
          </div>
        </section>

        {/* Acciones */}
        <div className="flex flex-wrap gap-3">
          <Link href="/app/repaso" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors">
            Practicar
          </Link>
          <Link href="/app/practica" className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
            Abrir cámara
          </Link>
          <Link href="/app/misiones" className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
            Ver misiones
          </Link>
          <button
            onClick={reiniciar}
            className="ml-auto inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <RotateCcw size={16} />
            Reiniciar stats
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({ icon: Icon, titulo, valor, tono }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <span className={`grid place-items-center w-10 h-10 rounded-xl ${tono}`}>
        <Icon size={20} />
      </span>
      <p className="mt-3 text-2xl font-bold leading-none">{valor}</p>
      <p className="mt-1 text-xs text-neutral-500">{titulo}</p>
    </div>
  );
}

function PanelProgreso({ titulo, valor, detalle, porcentaje, color }) {
  return (
    <article className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-neutral-500">{titulo}</p>
      <h3 className="mt-1 text-3xl font-bold tracking-tight">{valor}</h3>
      <div className="mt-3 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(100, porcentaje)}%`, backgroundColor: color }}
        />
      </div>
      <p className="mt-2 text-sm text-neutral-500">{detalle}</p>
    </article>
  );
}

function MiniDato({ etiqueta, valor }) {
  return (
    <div className="rounded-xl bg-neutral-50 border border-black/5 p-4">
      <p className="text-xs text-neutral-500">{etiqueta}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{valor}</p>
    </div>
  );
}
