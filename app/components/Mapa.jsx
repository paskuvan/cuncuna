'use client';

import Link from 'next/link';
import { BarChart3, Bell, BookOpen, Camera, Check, Flag, Lock, MessageCircle, RotateCcw, Star, Flame, Sparkles, Target, Trophy } from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';
import UsuarioMenu from './UsuarioMenu';
import Cuncuna from './mascota/Cuncuna';
import {
  debeRecordarHoy,
  obtenerRecordatorios,
} from '../lib/recordatorios-locales';

// ============================================================
// Mapa.jsx - VERSIÓN CON LOGROS
// ⚠️ REEMPLAZA el Mapa.jsx anterior.
//
// Cambios:
//   - Recibe logrosObtenidos como prop
//   - Agrega botón Trophy en el header que va a /logros
//   - Muestra contador de badges junto a XP y racha
// ============================================================

export default function Mapa({
  progreso,
  logrosObtenidos = [],
  onSeleccionarLeccion,
  onReiniciar,
}) {
  const totalLecciones = CURRICULUM.reduce((acc, n) => acc + n.lecciones.length, 0);
  const completadas = progreso.leccionesCompletadas.length;
  const recordatorios = obtenerRecordatorios();
  const mostrarRecordatorio = debeRecordarHoy(recordatorios);

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
              <Cuncuna estado="idle" size={24} animado={false} />
            </div>
            <div>
              <h1 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight leading-none">
                Cuncuna<span className="text-[#FFD23F]">.</span>
              </h1>
              <p className="text-white/70 text-xs font-bold uppercase tracking-wider hidden sm:block">
                De seña en seña
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Racha */}
            <div
              className="bg-[#FF6B9D] border-[3px] border-white px-2 sm:px-3 py-1.5 flex items-center gap-1.5"
              style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            >
              <Flame size={16} strokeWidth={3} className="text-white" />
              <span className="text-white font-black text-sm">{progreso.racha}</span>
            </div>

            {/* XP */}
            <div
              className="bg-[#FFD23F] border-[3px] border-white px-2 sm:px-3 py-1.5 flex items-center gap-1.5"
              style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
            >
              <Star size={16} strokeWidth={3} className="text-black" fill="black" />
              <span className="text-black font-black text-sm">{progreso.xpTotal}</span>
            </div>

            {/* Logros - lleva a /app/logros */}
            <Link
              href="/app/logros"
              className="bg-[#7FFF6B] border-[3px] border-white px-2 sm:px-3 py-1.5 flex items-center gap-1.5 hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
              aria-label="Ver logros"
            >
              <Trophy size={16} strokeWidth={3} className="text-black" />
              <span className="text-black font-black text-sm">{logrosObtenidos.length}</span>
            </Link>

            <Link
              href="/app/diccionario"
              className="bg-white border-[3px] border-white p-1.5 sm:p-2 flex items-center justify-center hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '3px 3px 0 #FFD23F' }}
              aria-label="Ver diccionario"
            >
              <BookOpen size={18} strokeWidth={3} className="text-black" />
            </Link>

            <Link
              href="/app/misiones"
              className="bg-[#FFD23F] border-[3px] border-white p-1.5 sm:p-2 flex items-center justify-center hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
              aria-label="Ver misiones"
            >
              <Flag size={18} strokeWidth={3} className="text-black" />
            </Link>

            <Link
              href="/app/estadisticas"
              className="bg-[#4ECDC4] border-[3px] border-white p-1.5 sm:p-2 flex items-center justify-center hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '3px 3px 0 #FFD23F' }}
              aria-label="Ver estadísticas"
            >
              <BarChart3 size={18} strokeWidth={3} className="text-black" />
            </Link>

            <Link
              href="/app/conversaciones"
              className="bg-[#A78BFA] border-[3px] border-white p-1.5 sm:p-2 flex items-center justify-center hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '3px 3px 0 #FFD23F' }}
              aria-label="Ver conversaciones"
            >
              <MessageCircle size={18} strokeWidth={3} className="text-white" />
            </Link>

            <Link
              href="/app/favoritos"
              className="bg-[#FFD23F] border-[3px] border-white p-1.5 sm:p-2 flex items-center justify-center hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
              aria-label="Ver favoritos"
            >
              <Star size={18} strokeWidth={3} className="text-black" fill="black" />
            </Link>

            <Link
              href="/app/recordatorios"
              className="bg-[#FF6B9D] border-[3px] border-white p-1.5 sm:p-2 flex items-center justify-center hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '3px 3px 0 #FFD23F' }}
              aria-label="Ver recordatorios"
            >
              <Bell size={18} strokeWidth={3} className="text-white" />
            </Link>

            <UsuarioMenu />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {mostrarRecordatorio && (
          <section
            className="bg-[#FF6B9D] border-[4px] border-black p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ boxShadow: '8px 8px 0 #000' }}
          >
            <div className="flex items-start gap-3">
              <div className="bg-white border-[3px] border-black p-2 shrink-0">
                <Bell size={22} strokeWidth={4} className="text-black" />
              </div>
              <div>
                <p className="font-black uppercase text-white text-lg leading-none">
                  Toca practicar
                </p>
                <p className="font-bold text-white/85 text-sm mt-1">
                  Tu recordatorio de las {recordatorios.hora} está activo para hoy.
                </p>
              </div>
            </div>
            <Link
              href={recordatorios.tipo === 'mision' ? '/app/misiones' : recordatorios.tipo === 'leccion' ? '/app' : '/app/repaso'}
              className="bg-white text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm text-center hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              Empezar
            </Link>
          </section>
        )}

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

              <div className="flex flex-wrap gap-3 mt-5">
                <Link
                  href="/app/practica"
                  className="bg-[#4ECDC4] text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 hover:translate-y-[-2px] transition-transform"
                  style={{ boxShadow: '5px 5px 0 #000' }}
                >
                  <Camera size={18} strokeWidth={4} />
                  Practicar con cámara
                </Link>
                <Link
                  href="/app/repaso"
                  className="bg-black text-[#FFD23F] border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 hover:translate-y-[-2px] transition-transform"
                  style={{ boxShadow: '5px 5px 0 #FF6B9D' }}
                >
                  <RotateCcw size={18} strokeWidth={4} />
                  Repaso diario
                </Link>
                <Link
                  href="/app/diccionario"
                  className="bg-white text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 hover:translate-y-[-2px] transition-transform"
                  style={{ boxShadow: '5px 5px 0 #000' }}
                >
                  <BookOpen size={18} strokeWidth={4} />
                  Diccionario
                </Link>
                <Link
                  href="/app/errores"
                  className="bg-[#FF6B9D] text-white border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 hover:translate-y-[-2px] transition-transform"
                  style={{ boxShadow: '5px 5px 0 #000' }}
                >
                  <Target size={18} strokeWidth={4} />
                  Mis errores
                </Link>
                <Link
                  href="/app/misiones"
                  className="bg-[#7FFF6B] text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 hover:translate-y-[-2px] transition-transform"
                  style={{ boxShadow: '5px 5px 0 #000' }}
                >
                  <Flag size={18} strokeWidth={4} />
                  Misiones
                </Link>
                <Link
                  href="/app/estadisticas"
                  className="bg-[#4ECDC4] text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 hover:translate-y-[-2px] transition-transform"
                  style={{ boxShadow: '5px 5px 0 #000' }}
                >
                  <BarChart3 size={18} strokeWidth={4} />
                  Estadísticas
                </Link>
                <Link
                  href="/app/conversaciones"
                  className="bg-[#A78BFA] text-white border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 hover:translate-y-[-2px] transition-transform"
                  style={{ boxShadow: '5px 5px 0 #000' }}
                >
                  <MessageCircle size={18} strokeWidth={4} />
                  Conversaciones
                </Link>
                <Link
                  href="/app/favoritos"
                  className="bg-[#FFD23F] text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 hover:translate-y-[-2px] transition-transform"
                  style={{ boxShadow: '5px 5px 0 #000' }}
                >
                  <Star size={18} strokeWidth={4} fill="black" />
                  Favoritos
                </Link>
                <Link
                  href="/app/recordatorios"
                  className="bg-[#FF6B9D] text-white border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 hover:translate-y-[-2px] transition-transform"
                  style={{ boxShadow: '5px 5px 0 #000' }}
                >
                  <Bell size={18} strokeWidth={4} />
                  Recordatorios
                </Link>
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

        <footer className="mt-12 mb-6 text-center">
          <div
            className="inline-block bg-white border-[3px] border-black p-4"
            style={{ boxShadow: '6px 6px 0 #000' }}
          >
            <p className="font-black uppercase text-sm text-black mb-2">¿Empezar de nuevo?</p>
            <button
              onClick={() => {
                if (confirm('¿Seguro? Perderás todo tu progreso y logros.')) onReiniciar();
              }}
              className="bg-[#FF6B6B] text-white border-[3px] border-black px-4 py-2 font-black uppercase text-xs tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform"
              style={{ boxShadow: '4px 4px 0 #000' }}
            >
              Reiniciar progreso
            </button>
          </div>
          <p className="mt-6 font-black uppercase text-xs text-black/50 tracking-[0.2em]">
            Hecho para quienes quieren aprender LSCh
          </p>
        </footer>
      </main>
    </div>
  );
}

// Mini cuncuna para el header
function CuncunaIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="40" y1="22" x2="35" y2="6" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="22" x2="65" y2="6" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <circle cx="35" cy="6" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />
      <circle cx="65" cy="6" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />
      <circle cx="50" cy="55" r="35" fill="#FFFFFF" stroke="#000" strokeWidth="4" />
      <circle cx="38" cy="48" r="8" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
      <circle cx="62" cy="48" r="8" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
      <circle cx="38" cy="48" r="4" fill="#000" />
      <circle cx="62" cy="48" r="4" fill="#000" />
      <path d="M 36 65 Q 50 75 64 65" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="28" cy="62" r="3.5" fill="#FF6B9D" />
      <circle cx="72" cy="62" r="3.5" fill="#FF6B9D" />
    </svg>
  );
}
