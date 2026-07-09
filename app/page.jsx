'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles, BookOpen, Trophy, Heart, Play, Check,
  Mail, ArrowRight, Star, Zap, Users, ShieldCheck
} from 'lucide-react';
import Cuncuna from './components/mascota/Cuncuna';

// ============================================================
// LANDING PAGE (ruta /)
// Pública, neobrutalista, optimizada para conversión a waitlist.
// ============================================================

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] overflow-x-hidden">
      <NavBar />
      <Hero />
      <Caracteristicas />
      <ComoFunciona />
      <Beneficios />
      <Planes />
      <CtaWaitlist />
      <Footer />
    </div>
  );
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
function NavBar() {
  return (
    <header className="bg-black border-b-[4px] border-black sticky top-0 z-40">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="bg-[#FFD23F] border-[3px] border-white p-1.5"
            style={{ boxShadow: '4px 4px 0 #FF6B9D' }}
          >
            <Cuncuna estado="idle" size={32} animado={false} />
          </div>
          <div>
            <h1 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight leading-none">
              Cuncuna<span className="text-[#FFD23F]">.</span>
            </h1>
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest hidden sm:block">
              De seña en seña
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#planes"
            className="text-white px-2 py-2 font-black uppercase text-xs sm:text-sm tracking-wider hover:text-[#FFD23F] transition-colors hidden md:block"
          >
            Planes
          </a>
          <a
            href="#waitlist"
            className="bg-[#FFD23F] text-black border-[3px] border-white px-3 sm:px-4 py-2 font-black uppercase text-xs sm:text-sm tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform"
            style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
          >
            Lista de espera
          </a>
          <Link
            href="/login"
            className="bg-white text-black border-[3px] border-white px-3 sm:px-4 py-2 font-black uppercase text-xs sm:text-sm tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Texto */}
        <div>
          <div
            className="inline-block bg-[#FF6B9D] text-white border-[3px] border-black px-4 py-2 mb-6 font-black uppercase text-xs tracking-[0.2em]"
            style={{ boxShadow: '4px 4px 0 #000' }}
          >
            🇨🇱 Hecho en Chile
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-black leading-[0.95] mb-6 tracking-tight">
            Aprende
            <br />
            <span className="bg-[#FFD23F] inline-block px-2 border-[3px] border-black">
              lengua de señas
            </span>
            <br />
            chilena.
          </h2>

          <p className="text-lg md:text-xl text-black font-bold mb-8 leading-relaxed">
            Una plataforma educativa para personas oyentes que quieren aprender Lengua de Señas Chilena. Lecciones interactivas, gamificadas y visuales.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#waitlist"
              className="bg-black text-[#FFD23F] border-[3px] border-black px-6 py-4 font-black uppercase text-base tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform inline-flex items-center justify-center gap-2"
              style={{ boxShadow: '6px 6px 0 #FF6B9D' }}
            >
              <Mail size={20} strokeWidth={3} />
              Únete a la lista
            </a>
            <Link
              href="/login"
              className="bg-white text-black border-[3px] border-black px-6 py-4 font-black uppercase text-base tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform inline-flex items-center justify-center gap-2"
              style={{ boxShadow: '6px 6px 0 #000' }}
            >
              Entrar
              <ArrowRight size={20} strokeWidth={3} />
            </Link>
          </div>

          {/* Badges sociales */}
          <div className="flex flex-wrap gap-2 mt-8">
            <div className="bg-white border-[3px] border-black px-3 py-1.5 font-black uppercase text-xs flex items-center gap-1.5"
              style={{ boxShadow: '3px 3px 0 #000' }}>
              <Heart size={12} strokeWidth={3} className="text-[#FF6B9D]" fill="#FF6B9D" />
              Para aprender LSCh
            </div>
            <div className="bg-white border-[3px] border-black px-3 py-1.5 font-black uppercase text-xs flex items-center gap-1.5"
              style={{ boxShadow: '3px 3px 0 #000' }}>
              <Sparkles size={12} strokeWidth={3} className="text-[#FFD23F]" fill="#FFD23F" />
              Gamificado
            </div>
            <div className="bg-white border-[3px] border-black px-3 py-1.5 font-black uppercase text-xs flex items-center gap-1.5"
              style={{ boxShadow: '3px 3px 0 #000' }}>
              <Zap size={12} strokeWidth={3} className="text-[#4ECDC4]" />
              Próximamente
            </div>
          </div>
        </div>

        {/* Mascota grande */}
        <div className="flex justify-center md:justify-end">
          <div
            className="bg-[#FFD23F] border-[4px] border-black p-8 md:p-12 relative"
            style={{ boxShadow: '12px 12px 0 #000' }}
          >
            <Cuncuna estado="saludando" size={240} />
            {/* Decoraciones */}
            <div
              className="absolute -top-4 -right-4 bg-[#FF6B9D] border-[3px] border-black p-2"
              style={{ boxShadow: '4px 4px 0 #000' }}
            >
              <Sparkles size={20} strokeWidth={3} className="text-white" />
            </div>
            <div
              className="absolute -bottom-4 -left-4 bg-[#4ECDC4] border-[3px] border-black px-3 py-1.5 font-black uppercase text-xs tracking-wider text-black"
              style={{ boxShadow: '4px 4px 0 #000' }}
            >
              ¡Hola!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CARACTERÍSTICAS
// ─────────────────────────────────────────────
function Caracteristicas() {
  const features = [
    {
      icono: <BookOpen size={40} strokeWidth={3} />,
      color: '#FFD23F',
      titulo: 'Lecciones estructuradas',
      descripcion: 'Niveles progresivos desde saludos básicos hasta conversaciones completas. Aprende a tu ritmo.',
    },
    {
      icono: <Play size={40} strokeWidth={3} />,
      color: '#FF6B9D',
      titulo: 'Videos en LSCh',
      descripcion: 'Cada seña explicada con video real, repetible las veces que necesites. Diseñado para aprender mirando.',
    },
    {
      icono: <Trophy size={40} strokeWidth={3} />,
      color: '#7FFF6B',
      titulo: 'Logros y rachas',
      descripcion: 'Sistema gamificado con XP, badges y rachas diarias. La motivación que necesitas para no abandonar.',
    },
  ];

  return (
    <section className="bg-white border-y-[4px] border-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="font-black uppercase text-xs tracking-[0.3em] text-black/60 mb-3">
            Características
          </p>
          <h3 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight leading-none">
            Pensado para aprender
            <br />
            <span className="bg-[#FF6B9D] text-white inline-block px-3 mt-2 border-[3px] border-black">
              de verdad
            </span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white border-[3px] border-black p-6 hover:translate-x-[-3px] hover:translate-y-[-3px] transition-transform"
              style={{ boxShadow: '8px 8px 0 #000' }}
            >
              <div
                className="border-[3px] border-black w-20 h-20 flex items-center justify-center mb-4 text-black"
                style={{ backgroundColor: f.color, boxShadow: '4px 4px 0 #000' }}
              >
                {f.icono}
              </div>
              <h4 className="font-black uppercase text-xl text-black mb-2 leading-tight">
                {f.titulo}
              </h4>
              <p className="text-black font-bold leading-relaxed">
                {f.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CÓMO FUNCIONA
// ─────────────────────────────────────────────
function ComoFunciona() {
  const pasos = [
    {
      num: '01',
      titulo: 'Mira la seña',
      descripcion: 'Observa el video con la seña explicada paso a paso, las veces que necesites.',
      color: '#FFD23F',
      estado: 'estudiando',
    },
    {
      num: '02',
      titulo: 'Responde el quiz',
      descripcion: 'Pon a prueba lo que aprendiste con preguntas interactivas que refuerzan tu memoria.',
      color: '#4ECDC4',
      estado: 'pensando',
    },
    {
      num: '03',
      titulo: 'Gana XP y logros',
      descripcion: 'Suma experiencia, mantén tu racha y desbloquea badges. ¡Llega a Cuncuna Mariposa!',
      color: '#7FFF6B',
      estado: 'celebrando',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="font-black uppercase text-xs tracking-[0.3em] text-black/60 mb-3">
            Cómo funciona
          </p>
          <h3 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight leading-none">
            Tres pasos.
            <br />
            <span className="bg-[#FFD23F] inline-block px-3 mt-2 border-[3px] border-black">
              Sin complicaciones.
            </span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {pasos.map((p, i) => (
            <div key={i} className="relative">
              <div
                className="border-[3px] border-black p-6 h-full flex flex-col"
                style={{ backgroundColor: p.color, boxShadow: '8px 8px 0 #000' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-black text-5xl md:text-6xl text-black/20 leading-none">
                    {p.num}
                  </span>
                  <Cuncuna estado={p.estado} size={70} />
                </div>
                <h4 className="font-black uppercase text-2xl text-black mb-2 leading-tight">
                  {p.titulo}
                </h4>
                <p className="text-black font-bold leading-relaxed">
                  {p.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// BENEFICIOS / POR QUÉ
// ─────────────────────────────────────────────
function Beneficios() {
  const beneficios = [
    'Aprende a tu ritmo, sin presión',
    'Contenido específico para Chile, no traducido',
    'Diseño visual pensado para personas oyentes',
    'Experiencia sin publicidad en Plus',
    'Tu progreso siempre guardado',
    'Gratuito durante el lanzamiento',
  ];

  return (
    <section className="bg-black py-16 md:py-24 border-y-[4px] border-black">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p className="font-black uppercase text-xs tracking-[0.3em] text-[#FFD23F] mb-3">
              Por qué Cuncuna
            </p>
            <h3 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight leading-none mb-8">
              Una app
              <br />
              <span className="bg-[#FF6B9D] text-white inline-block px-3 mt-2 border-[3px] border-white">
                con propósito.
              </span>
            </h3>
            <p className="text-white/80 font-bold text-lg leading-relaxed">
              La LSCh es una lengua oficial reconocida en Chile, pero las herramientas para aprenderla son escasas. Cuncuna nace para cambiar eso, con una experiencia digna de la comunidad que la usa.
            </p>
          </div>

          <div className="space-y-3">
            {beneficios.map((b, i) => (
              <div
                key={i}
                className="bg-white border-[3px] border-white p-3 flex items-center gap-3"
                style={{ boxShadow: '4px 4px 0 #FFD23F' }}
              >
                <div className="bg-[#7FFF6B] border-[3px] border-black p-1 shrink-0">
                  <Check size={16} strokeWidth={4} className="text-black" />
                </div>
                <p className="font-black uppercase text-sm text-black tracking-tight">
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PLANES
// ─────────────────────────────────────────────
function Planes() {
  const [periodo, setPeriodo] = useState('mensual');
  const anual = periodo === 'anual';
  const planes = [
    {
      id: 'gratis',
      nombre: 'Gratis',
      descripcion: 'Para comenzar de seña en seña.',
      precio: 0,
      color: '#FFFFFF',
      icono: <BookOpen size={26} strokeWidth={3} />,
      beneficios: [
        'Lecciones básicas',
        'Un repaso diario',
        'Rachas y logros',
        'Progreso en este dispositivo',
      ],
      accion: 'Comenzar gratis',
      href: '/login',
    },
    {
      id: 'plus',
      nombre: 'Plus',
      descripcion: 'Para aprender sin límites.',
      precioMensual: 4990,
      precioAnual: 3990,
      color: '#FFD23F',
      icono: <Zap size={26} strokeWidth={3} />,
      beneficios: [
        'Todas las lecciones',
        'Repasos ilimitados',
        'Práctica con cámara',
        'Sin anuncios',
        'Estadísticas completas',
        'Progreso sincronizado',
      ],
      accion: 'Elegir Plus',
      destacado: true,
    },
    {
      id: 'familia',
      nombre: 'Familia',
      descripcion: 'Aprender juntos sale mejor.',
      precioMensual: 8990,
      precioAnual: 6990,
      color: '#4ECDC4',
      icono: <Users size={26} strokeWidth={3} />,
      beneficios: [
        'Todo lo incluido en Plus',
        'Hasta 5 perfiles',
        'Progreso individual',
        'Metas compartidas',
        'Panel familiar',
      ],
      accion: 'Elegir Familia',
    },
  ];

  const mostrarPrecio = (plan) => {
    if (plan.precio === 0) return '$0';
    return `$${(anual ? plan.precioAnual : plan.precioMensual).toLocaleString('es-CL')}`;
  };

  return (
    <section id="planes" className="bg-white border-b-[4px] border-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-9">
          <p className="font-black uppercase text-xs tracking-[0.3em] text-black/60 mb-3">
            Planes
          </p>
          <h3 className="text-3xl md:text-5xl font-black uppercase text-black leading-none">
            Elige cómo
            <br />
            <span className="bg-[#7FFF6B] inline-block px-3 mt-2 border-[3px] border-black">
              quieres aprender.
            </span>
          </h3>
        </div>

        <div className="flex justify-center mb-10">
          <div
            className="bg-[#F5F0E8] border-[3px] border-black p-1 flex"
            style={{ boxShadow: '5px 5px 0 #000' }}
            aria-label="Periodo de suscripción"
          >
            <button
              type="button"
              onClick={() => setPeriodo('mensual')}
              className={`px-4 py-2 font-black uppercase text-xs transition-colors ${
                !anual ? 'bg-black text-white' : 'text-black'
              }`}
              aria-pressed={!anual}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => setPeriodo('anual')}
              className={`px-4 py-2 font-black uppercase text-xs transition-colors ${
                anual ? 'bg-black text-[#FFD23F]' : 'text-black'
              }`}
              aria-pressed={anual}
            >
              Anual · ahorra
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {planes.map((plan) => (
            <article
              key={plan.nombre}
              className="border-[4px] border-black p-6 flex flex-col relative"
              style={{
                backgroundColor: plan.color,
                boxShadow: plan.destacado ? '11px 11px 0 #FF6B9D' : '8px 8px 0 #000',
              }}
            >
              {plan.destacado && (
                <div className="absolute -top-4 left-5 bg-[#FF6B9D] text-white border-[3px] border-black px-3 py-1 font-black uppercase text-xs">
                  Más elegido
                </div>
              )}

              <div className="flex items-center justify-between gap-4 mt-2 mb-5">
                <div>
                  <h4 className="font-black uppercase text-3xl text-black leading-none">
                    {plan.nombre}
                  </h4>
                  <p className="font-bold text-black/65 text-sm mt-2">
                    {plan.descripcion}
                  </p>
                </div>
                <div className="bg-white border-[3px] border-black p-3 shrink-0">
                  {plan.icono}
                </div>
              </div>

              <div className="border-y-[3px] border-black py-5 mb-5">
                <p className="font-black text-4xl text-black leading-none">
                  {mostrarPrecio(plan)}
                </p>
                <p className="font-black uppercase text-xs text-black/60 mt-2 min-h-4">
                  {plan.precio === 0
                    ? 'para siempre'
                    : anual
                      ? 'al mes · cobro anual'
                      : 'al mes'}
                </p>
              </div>

              <ul className="space-y-3 mb-7 flex-1">
                {plan.beneficios.map((beneficio) => (
                  <li key={beneficio} className="flex items-start gap-2 font-bold text-sm text-black">
                    <Check size={18} strokeWidth={4} className="shrink-0 mt-0.5" />
                    {beneficio}
                  </li>
                ))}
              </ul>

              <Link
                href={
                  plan.precio === 0
                    ? plan.href
                    : `/suscripcion?plan=${plan.id}&periodo=${periodo}`
                }
                className={`border-[3px] border-black px-4 py-3 font-black uppercase text-sm text-center flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-transform ${
                  plan.destacado ? 'bg-black text-[#FFD23F]' : 'bg-white text-black'
                }`}
                style={{ boxShadow: '5px 5px 0 #000' }}
              >
                {plan.accion}
                <ArrowRight size={18} strokeWidth={3} />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-start justify-center gap-3 max-w-3xl mx-auto text-center">
          <ShieldCheck size={24} strokeWidth={3} className="text-black shrink-0" />
          <p className="font-bold text-black/70">
            Parte de cada suscripción financia contenido creado y validado junto a
            personas sordas y docentes de LSCh, para enseñar con respeto y precisión.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CTA WAITLIST
// ─────────────────────────────────────────────
function CtaWaitlist() {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState('idle'); // idle | enviando | exito | error | duplicado
  const [mensajeError, setMensajeError] = useState('');

  const enviar = async (e) => {
    e.preventDefault();
    if (!email) return;

    setEstado('enviando');
    setMensajeError('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.duplicado) {
        setEstado('duplicado');
      } else if (data.ok) {
        setEstado('exito');
        setEmail('');
      } else {
        setEstado('error');
        setMensajeError(data.error || 'Error desconocido');
      }
    } catch (err) {
      setEstado('error');
      setMensajeError('Error de conexión');
    }
  };

  return (
    <section id="waitlist" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div
          className="bg-[#FFD23F] border-[4px] border-black p-8 md:p-12 relative overflow-hidden text-center"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          {/* Decoración esquina */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FF6B9D] border-[4px] border-black rounded-full" />
          <div className="absolute top-2 right-2">
            <Star size={28} strokeWidth={3} className="text-black" fill="black" />
          </div>

          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <Cuncuna
                estado={estado === 'exito' ? 'celebrando' : 'idle'}
                size={120}
              />
            </div>

            <h3 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight leading-none mb-4">
              Sé de las primeras
              <br />
              en saberlo.
            </h3>

            <p className="text-black font-bold text-lg mb-8 max-w-xl mx-auto">
              Únete a la lista de espera y entérate cuando Cuncuna esté lista para usar. Sin spam, lo prometemos.
            </p>

            {estado === 'exito' ? (
              <div
                className="bg-black text-[#7FFF6B] border-[3px] border-black p-6 inline-block"
                style={{ boxShadow: '6px 6px 0 #FF6B9D' }}
              >
                <p className="font-black uppercase text-base tracking-wider mb-1">
                  ¡Listo! 🎉
                </p>
                <p className="text-white font-bold text-sm">
                  Te avisaremos en cuanto estemos listos.
                </p>
              </div>
            ) : (
              <form onSubmit={enviar} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.cl"
                    required
                    disabled={estado === 'enviando'}
                    className="flex-1 bg-white border-[3px] border-black px-4 py-3 font-black text-black placeholder-black/40 focus:outline-none focus:translate-y-[-2px] transition-transform disabled:opacity-50"
                    style={{ boxShadow: '4px 4px 0 #000' }}
                  />
                  <button
                    type="submit"
                    disabled={estado === 'enviando'}
                    className="bg-black text-[#FFD23F] border-[3px] border-black px-6 py-3 font-black uppercase tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform disabled:opacity-50 disabled:cursor-wait whitespace-nowrap"
                    style={{ boxShadow: '4px 4px 0 #FF6B9D' }}
                  >
                    {estado === 'enviando' ? 'Enviando...' : 'Unirme →'}
                  </button>
                </div>

                {estado === 'duplicado' && (
                  <p className="mt-4 font-black uppercase text-sm text-black/70">
                    Ya estás en la lista. ¡Gracias!
                  </p>
                )}

                {estado === 'error' && (
                  <div
                    className="mt-4 bg-[#FF6B6B] text-white border-[3px] border-black p-3 font-black uppercase text-sm"
                    style={{ boxShadow: '3px 3px 0 #000' }}
                  >
                    {mensajeError}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-black border-t-[4px] border-black py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Cuncuna estado="idle" size={40} animado={false} />
            <div>
              <p className="text-white font-black uppercase text-lg leading-none">
                Cuncuna<span className="text-[#FFD23F]">.</span>
              </p>
              <p className="text-white/60 text-xs font-bold uppercase tracking-wider mt-1">
                De seña en seña
              </p>
            </div>
          </div>

          <p className="text-white/60 font-bold text-sm uppercase tracking-wider text-center">
            🤟 Hecho para quienes<br className="md:hidden" /> quieren aprender LSCh
          </p>
        </div>

        <div className="border-t-[3px] border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/40 font-bold text-xs uppercase tracking-widest">
            © 2026 Cuncuna · Parte de Códiseñas
          </p>
        </div>
      </div>
    </footer>
  );
}
