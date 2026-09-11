'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles, BookOpen, Trophy, Play, Check,
  Mail, ArrowRight, Zap, Users, ShieldCheck,
} from 'lucide-react';
import Cuncuna from './components/mascota/Cuncuna';
import FormularioListaEspera from './components/FormularioListaEspera';

// ============================================================
// LANDING PAGE (ruta /)
// Pública, estilo SaaS suave (morado), optimizada para waitlist.
// ============================================================

export default function LandingPage() {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F1EC] text-neutral-900 overflow-x-hidden">
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
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#F6F1EC]/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-violet-600">
            <Cuncuna estado="idle" size={22} animado={false} />
          </span>
          <span className="text-lg font-bold tracking-tight">Cuncuna</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#planes"
            className="hidden md:block px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Planes
          </a>
          <Link
            href="/lista-espera"
            className="rounded-xl border border-black/10 bg-white px-3 sm:px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Lista de espera
          </Link>
          <Link
            href="/login"
            className="rounded-xl bg-violet-600 px-3 sm:px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
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
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
      <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 mb-6">
            🇨🇱 Hecho en Chile
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            Aprende{' '}
            <span className="text-violet-600">lengua de señas chilena</span>.
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-lg">
            Una plataforma educativa para personas oyentes que quieren aprender
            Lengua de Señas Chilena. Lecciones interactivas, gamificadas y visuales.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/lista-espera"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-violet-700 transition-colors"
            >
              <Mail size={18} />
              Únete a la lista
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-6 py-3.5 text-base font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Entrar
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {[
              { icon: BookOpen, texto: 'Para aprender LSCh' },
              { icon: Sparkles, texto: 'Gamificado' },
              { icon: Zap, texto: 'Próximamente' },
            ].map(({ icon: Icon, texto }) => (
              <span
                key={texto}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-600"
              >
                <Icon size={13} className="text-violet-500" />
                {texto}
              </span>
            ))}
          </div>
        </div>

        {/* Mascota */}
        <div className="flex justify-center md:justify-end">
          <div className="relative rounded-3xl bg-gradient-to-br from-violet-200 via-violet-100 to-amber-100 p-10 md:p-14 shadow-sm">
            <Cuncuna estado="saludando" size={220} />
            <span className="absolute -top-3 -right-3 grid place-items-center w-12 h-12 rounded-2xl bg-white shadow-sm">
              <Sparkles size={20} className="text-violet-500" />
            </span>
            <span className="absolute -bottom-3 -left-3 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-violet-700 shadow-sm">
              ¡Hola!
            </span>
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
    { icon: BookOpen, tono: 'bg-violet-100 text-violet-700', titulo: 'Lecciones estructuradas', descripcion: 'Niveles progresivos desde saludos básicos hasta conversaciones completas. Aprende a tu ritmo.' },
    { icon: Play, tono: 'bg-rose-100 text-rose-600', titulo: 'Videos en LSCh', descripcion: 'Cada seña explicada con video real, repetible las veces que necesites. Diseñado para aprender mirando.' },
    { icon: Trophy, tono: 'bg-emerald-100 text-emerald-600', titulo: 'Logros y rachas', descripcion: 'Sistema gamificado con XP, badges y rachas diarias. La motivación que necesitas para no abandonar.' },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-3">
            Características
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Pensado para aprender de verdad
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.titulo}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className={`grid place-items-center w-14 h-14 rounded-2xl mb-4 ${f.tono}`}>
                <f.icon size={26} />
              </span>
              <h3 className="text-lg font-bold tracking-tight mb-1">{f.titulo}</h3>
              <p className="text-neutral-500 leading-relaxed">{f.descripcion}</p>
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
    { num: '01', titulo: 'Mira la seña', descripcion: 'Observa el video con la seña explicada paso a paso, las veces que necesites.', estado: 'estudiando' },
    { num: '02', titulo: 'Responde el quiz', descripcion: 'Pon a prueba lo que aprendiste con preguntas interactivas que refuerzan tu memoria.', estado: 'pensando' },
    { num: '03', titulo: 'Gana XP y logros', descripcion: 'Suma experiencia, mantén tu racha y desbloquea badges. ¡Llega a Cuncuna Mariposa!', estado: 'celebrando' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-black/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-3">
            Cómo funciona
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Tres pasos. Sin complicaciones.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pasos.map((p) => (
            <div key={p.num} className="rounded-2xl border border-black/5 bg-[#F6F1EC] p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl font-bold text-violet-200 leading-none">{p.num}</span>
                <Cuncuna estado={p.estado} size={64} />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-1">{p.titulo}</h3>
              <p className="text-neutral-500 leading-relaxed">{p.descripcion}</p>
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
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="rounded-3xl bg-neutral-900 text-white p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-400 mb-3">
                Por qué Cuncuna
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6">
                Una app con propósito.
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                La LSCh es una lengua oficial reconocida en Chile, pero las herramientas
                para aprenderla son escasas. Cuncuna nace para cambiar eso, con una
                experiencia digna de la comunidad que la usa.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {beneficios.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3"
                >
                  <span className="grid place-items-center w-7 h-7 rounded-lg bg-violet-500 shrink-0">
                    <Check size={15} className="text-white" />
                  </span>
                  <p className="text-sm font-medium text-white/90">{b}</p>
                </div>
              ))}
            </div>
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
      id: 'gratis', nombre: 'Gratis', descripcion: 'Para comenzar de seña en seña.',
      precio: 0, icon: BookOpen,
      beneficios: ['Lecciones básicas', 'Un repaso diario', 'Rachas y logros', 'Progreso en este dispositivo'],
      accion: 'Comenzar gratis', href: '/login',
    },
    {
      id: 'plus', nombre: 'Plus', descripcion: 'Para aprender sin límites.',
      precioMensual: 4990, precioAnual: 3990, icon: Zap,
      beneficios: ['Todas las lecciones', 'Repasos ilimitados', 'Práctica con cámara', 'Sin anuncios', 'Estadísticas completas', 'Progreso sincronizado'],
      accion: 'Elegir Plus', destacado: true,
    },
    {
      id: 'familia', nombre: 'Familia', descripcion: 'Aprender juntos sale mejor.',
      precioMensual: 8990, precioAnual: 6990, icon: Users,
      beneficios: ['Todo lo incluido en Plus', 'Hasta 5 perfiles', 'Progreso individual', 'Metas compartidas', 'Panel familiar'],
      accion: 'Elegir Familia',
    },
  ];

  const mostrarPrecio = (plan) => {
    if (plan.precio === 0) return '$0';
    return `$${(anual ? plan.precioAnual : plan.precioMensual).toLocaleString('es-CL')}`;
  };

  return (
    <section id="planes" className="py-16 md:py-24 bg-white border-y border-black/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-3">
            Planes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Elige cómo quieres aprender.
          </h2>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-black/10 bg-[#F6F1EC] p-1" aria-label="Periodo de suscripción">
            <button
              type="button"
              onClick={() => setPeriodo('mensual')}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${!anual ? 'bg-violet-600 text-white' : 'text-neutral-600'}`}
              aria-pressed={!anual}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => setPeriodo('anual')}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${anual ? 'bg-violet-600 text-white' : 'text-neutral-600'}`}
              aria-pressed={anual}
            >
              Anual · ahorra
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {planes.map((plan) => (
            <article
              key={plan.nombre}
              className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm ${
                plan.destacado ? 'border-violet-300 ring-2 ring-violet-200' : 'border-black/5'
              }`}
            >
              {plan.destacado && (
                <span className="absolute -top-3 left-6 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                  Más elegido
                </span>
              )}

              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{plan.nombre}</h3>
                  <p className="mt-1 text-sm text-neutral-500">{plan.descripcion}</p>
                </div>
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-violet-100 text-violet-700 shrink-0">
                  <plan.icon size={24} />
                </span>
              </div>

              <div className="border-y border-black/5 py-5 mb-5">
                <p className="text-4xl font-bold tracking-tight">{mostrarPrecio(plan)}</p>
                <p className="mt-1 text-xs font-medium text-neutral-500">
                  {plan.precio === 0 ? 'para siempre' : anual ? 'al mes · cobro anual' : 'al mes'}
                </p>
              </div>

              <ul className="flex-1 flex flex-col gap-3 mb-7">
                {plan.beneficios.map((beneficio) => (
                  <li key={beneficio} className="flex items-start gap-2 text-sm text-neutral-700">
                    <Check size={18} className="shrink-0 mt-0.5 text-violet-600" />
                    {beneficio}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.precio === 0 ? plan.href : `/suscripcion?plan=${plan.id}&periodo=${periodo}`}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  plan.destacado
                    ? 'bg-violet-600 text-white hover:bg-violet-700'
                    : 'border border-black/10 bg-white text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {plan.accion}
                <ArrowRight size={18} />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-start justify-center gap-3 max-w-3xl mx-auto text-center">
          <ShieldCheck size={22} className="text-violet-600 shrink-0" />
          <p className="text-sm text-neutral-500">
            Parte de cada suscripción financia contenido creado y validado junto a personas
            sordas y docentes de LSCh, para enseñar con respeto y precisión.
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
  return (
    <section id="waitlist" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-violet-700 p-8 md:p-12 text-center text-white">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <span className="grid place-items-center rounded-3xl bg-white/10 p-4">
                <Cuncuna estado="idle" size={100} />
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-3">
              Sé de las primeras en saberlo.
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Únete a la lista de espera y entérate cuando Cuncuna esté lista para usar.
              Sin spam, lo prometemos.
            </p>
            <FormularioListaEspera origen="landing" />
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
    <footer className="border-t border-black/5 bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-violet-600">
              <Cuncuna estado="idle" size={22} animado={false} />
            </span>
            <div>
              <p className="font-bold tracking-tight leading-none">Cuncuna</p>
              <p className="text-xs text-neutral-400 mt-1">De seña en seña</p>
            </div>
          </div>
          <p className="text-sm text-neutral-500 text-center">
            🤟 Hecho para quienes quieren aprender LSCh
          </p>
        </div>

        <div className="border-t border-black/5 mt-8 pt-6 text-center">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-5">
            <Link href="/legal/terminos" className="text-sm font-medium text-neutral-500 hover:text-violet-600 transition-colors">Términos</Link>
            <Link href="/legal/privacidad" className="text-sm font-medium text-neutral-500 hover:text-violet-600 transition-colors">Privacidad</Link>
            <Link href="/legal/reembolsos" className="text-sm font-medium text-neutral-500 hover:text-violet-600 transition-colors">Cancelaciones</Link>
            <Link href="/soporte" className="text-sm font-medium text-neutral-500 hover:text-violet-600 transition-colors">Soporte</Link>
          </nav>
          <p className="text-xs text-neutral-400">© 2026 Cuncuna · Parte de Códiseñas</p>
        </div>
      </div>
    </footer>
  );
}
