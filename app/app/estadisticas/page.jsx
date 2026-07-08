'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Activity, ArrowLeft, BarChart3, BookOpen, RotateCcw, Target, Trophy } from 'lucide-react';
import { obtenerSenasDiccionario } from '../../lib/diccionario';
import { enriquecerSenasConErrores, obtenerErroresLocales } from '../../lib/errores-locales';
import {
  calcularPrecision,
  obtenerEstadisticasLocales,
  reiniciarEstadisticasLocales,
} from '../../lib/estadisticas-locales';
import { obtenerResumenMisiones } from '../../lib/misiones-locales';

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

  const reiniciar = () => {
    setStats(reiniciarEstadisticasLocales());
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
              Estadísticas
            </h1>
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider hidden sm:block">
              Perfil de aprendizaje
            </p>
          </div>
          <div
            className="bg-[#4ECDC4] border-[3px] border-white px-3 py-1.5 font-black text-black text-sm"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
          >
            {precision}%
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6">
        <section
          className="bg-[#4ECDC4] border-[4px] border-black p-5 md:p-7 mb-6"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={24} strokeWidth={3} className="text-black" />
            <p className="font-black uppercase text-xs tracking-[0.2em] text-black/70">
              Tu tablero
            </p>
          </div>
          <h2 className="font-black uppercase text-4xl md:text-5xl text-black leading-none">
            {precision}%
            <span className="block text-lg md:text-xl text-black/70 mt-2">
              precisión total
            </span>
          </h2>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icono={<Activity size={24} strokeWidth={3} />} titulo="Repasos" valor={stats.repasosCompletados} color="#FFD23F" />
          <StatCard icono={<BookOpen size={24} strokeWidth={3} />} titulo="Señas vistas" valor={stats.senasVistas} color="#7FFF6B" />
          <StatCard icono={<Target size={24} strokeWidth={3} />} titulo="Errores" valor={errores.length} color="#FF6B9D" />
          <StatCard icono={<Trophy size={24} strokeWidth={3} />} titulo="Misiones" valor={`${resumenMisiones.completadas}/${resumenMisiones.total}`} color="#A78BFA" />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PanelProgreso
            titulo="Cobertura del diccionario"
            valor={`${cobertura}%`}
            detalle={`${stats.senasVistas} vistas de ${todasLasSenas.length} señas disponibles`}
            porcentaje={cobertura}
            color="#7FFF6B"
          />
          <PanelProgreso
            titulo="XP de misiones hoy"
            valor={`${resumenMisiones.xpGanado}/${resumenMisiones.xpDisponible}`}
            detalle={`${resumenMisiones.completadas} misiones completas`}
            porcentaje={(resumenMisiones.completadas / resumenMisiones.total) * 100}
            color="#FFD23F"
          />
        </section>

        <section
          className="bg-white border-[4px] border-black p-5 mt-6"
          style={{ boxShadow: '10px 10px 0 #000' }}
        >
          <h3 className="font-black uppercase text-2xl text-black mb-3">
            Actividad
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <MiniDato etiqueta="Respuestas" valor={`${stats.respuestasCorrectas}/${stats.respuestasTotales}`} />
            <MiniDato etiqueta="Diccionario" valor={stats.visitasDiccionario} />
            <MiniDato etiqueta="Errores recuperados" valor={stats.erroresRecuperados} />
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app/repaso"
            className="bg-black text-[#FFD23F] border-[3px] border-black px-4 py-3 font-black uppercase text-sm hover:translate-y-[-2px] transition-transform"
            style={{ boxShadow: '5px 5px 0 #FF6B9D' }}
          >
            Practicar
          </Link>
          <Link
            href="/app/misiones"
            className="bg-[#7FFF6B] text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm hover:translate-y-[-2px] transition-transform"
            style={{ boxShadow: '5px 5px 0 #000' }}
          >
            Ver misiones
          </Link>
          <button
            onClick={reiniciar}
            className="bg-[#FF6B6B] text-white border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 hover:translate-y-[-2px] transition-transform"
            style={{ boxShadow: '5px 5px 0 #000' }}
          >
            <RotateCcw size={18} strokeWidth={4} />
            Reiniciar stats
          </button>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icono, titulo, valor, color }) {
  return (
    <div
      className="border-[3px] border-black p-4"
      style={{ backgroundColor: color, boxShadow: '6px 6px 0 #000' }}
    >
      <div className="mb-3">{icono}</div>
      <p className="font-black uppercase text-[10px] tracking-[0.15em] text-black/60">
        {titulo}
      </p>
      <p className="font-black uppercase text-3xl text-black leading-none mt-1">
        {valor}
      </p>
    </div>
  );
}

function PanelProgreso({ titulo, valor, detalle, porcentaje, color }) {
  return (
    <article
      className="bg-white border-[4px] border-black p-5"
      style={{ boxShadow: '8px 8px 0 #000' }}
    >
      <p className="font-black uppercase text-xs tracking-[0.2em] text-black/50 mb-2">
        {titulo}
      </p>
      <h3 className="font-black uppercase text-4xl text-black leading-none mb-3">
        {valor}
      </h3>
      <div
        className="h-5 bg-[#F5F0E8] border-[3px] border-black overflow-hidden"
        style={{ boxShadow: '3px 3px 0 #000' }}
      >
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${Math.min(100, porcentaje)}%`, backgroundColor: color }}
        />
      </div>
      <p className="font-bold text-black/60 text-sm mt-3">{detalle}</p>
    </article>
  );
}

function MiniDato({ etiqueta, valor }) {
  return (
    <div className="bg-[#F5F0E8] border-[3px] border-black p-3">
      <p className="font-black uppercase text-[10px] tracking-[0.15em] text-black/50">
        {etiqueta}
      </p>
      <p className="font-black text-2xl text-black">{valor}</p>
    </div>
  );
}
