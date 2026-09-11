'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  HeartHandshake,
  Sparkles,
  Target,
} from 'lucide-react';
import Cuncuna from '../../components/mascota/Cuncuna';
import {
  completarOnboarding,
  guardarOnboarding,
  obtenerOnboarding,
} from '../../lib/onboarding-local';

// ============================================================
// PÁGINA: /app/onboarding  (asistente de primer uso, estilo suave)
// ============================================================

const motivos = [
  { id: 'familia', titulo: 'Familia o amistades', texto: 'Comunicarme mejor con alguien cercano.', icono: HeartHandshake, color: '#8B5CF6' },
  { id: 'trabajo', titulo: 'Trabajo o atención', texto: 'Atender mejor a personas sordas.', icono: BookOpen, color: '#10B981' },
  { id: 'curiosidad', titulo: 'Aprendizaje personal', texto: 'Aprender LSCh desde cero.', icono: Sparkles, color: '#F59E0B' },
];
const niveles = [
  { id: 'cero', titulo: 'Desde cero', texto: 'No conozco señas todavía.' },
  { id: 'basico', titulo: 'Básico', texto: 'Sé algunas señas sueltas.' },
  { id: 'practica', titulo: 'Con práctica', texto: 'Ya puedo saludar o presentarme.' },
];
const intereses = ['Saludos', 'Familia', 'Trabajo', 'Emergencias', 'Números', 'Conversación diaria'];
const metas = [
  { valor: '3', titulo: '3 días', texto: 'Suave y realista' },
  { valor: '5', titulo: '5 días', texto: 'Buen ritmo' },
  { valor: '7', titulo: 'Todos los días', texto: 'Modo racha' },
];
const ritmos = [
  { valor: '5', titulo: '5 min', texto: 'Micro práctica' },
  { valor: '10', titulo: '10 min', texto: 'Recomendado' },
  { valor: '15', titulo: '15 min', texto: 'Más intenso' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [datos, setDatos] = useState(() => {
    const g = obtenerOnboarding();
    return {
      motivo: g.motivo,
      nivel: g.nivel,
      metaSemanal: g.metaSemanal,
      ritmo: g.ritmo,
      intereses: g.intereses,
      recordatorio: g.recordatorio,
    };
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const pasos = useMemo(
    () => [
      { etiqueta: 'Meta', valido: Boolean(datos.motivo) },
      { etiqueta: 'Nivel', valido: Boolean(datos.nivel) },
      { etiqueta: 'Ritmo', valido: Boolean(datos.metaSemanal && datos.ritmo) },
      { etiqueta: 'Temas', valido: datos.intereses.length > 0 },
    ],
    [datos]
  );

  const actualizar = (cambios) => {
    const siguiente = { ...datos, ...cambios };
    setDatos(siguiente);
    guardarOnboarding(siguiente);
  };

  const alternarInteres = (interes) => {
    const existe = datos.intereses.includes(interes);
    actualizar({
      intereses: existe
        ? datos.intereses.filter((i) => i !== interes)
        : [...datos.intereses, interes],
    });
  };

  const finalizar = () => {
    completarOnboarding(datos);
    router.push('/app');
  };

  const saltar = () => {
    completarOnboarding({
      ...datos,
      motivo: datos.motivo || 'aprendizaje',
      nivel: datos.nivel || 'cero',
      intereses: datos.intereses.length ? datos.intereses : ['Saludos'],
    });
    router.push('/app');
  };

  const puedeAvanzar = pasos[paso].valido;
  const titulos = [
    '¿Por qué quieres aprender?',
    '¿Cuál es tu nivel?',
    'Elige tu ritmo',
    '¿Qué temas te interesan?',
  ];
  const subtitulos = [
    'Esto ayuda a recomendar ejemplos y misiones cercanas a tu vida diaria.',
    'Cuncuna partirá con una dificultad amable, sin hacerte perder tiempo.',
    'La constancia vale más que estudiar mucho una sola vez.',
    'Marca al menos uno para personalizar tus primeras recomendaciones.',
  ];

  const opcionBase = 'w-full text-left rounded-2xl border p-4 transition-colors';
  const opcionActiva = 'border-violet-400 ring-2 ring-violet-200 bg-violet-50';
  const opcionInactiva = 'border-black/10 bg-white hover:bg-neutral-50';

  return (
    <main className="min-h-screen bg-[#F6F1EC] p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Barra superior */}
        <header className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={saltar}
            className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            Omitir
          </button>
          <div className="flex items-center gap-2">
            {pasos.map((item, index) => (
              <div
                key={item.etiqueta}
                className={`h-2 rounded-full transition-all ${
                  index <= paso ? 'bg-violet-600 w-10' : 'bg-neutral-200 w-5'
                }`}
              />
            ))}
          </div>
        </header>

        <section className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* Aside */}
            <aside className="bg-violet-600 text-white p-6 md:p-8 flex flex-col justify-between gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-3">
                  Bienvenida
                </p>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                  Hagamos tu ruta LSCh
                </h1>
                <p className="mt-4 text-white/80 leading-relaxed">
                  Ajustamos el inicio para personas oyentes que quieren aprender Lengua de Señas
                  Chilena con práctica constante.
                </p>
              </div>
              <div className="self-start rounded-2xl bg-white/10 p-5">
                <Cuncuna estado="pensando" size={110} />
              </div>
            </aside>

            {/* Contenido */}
            <div className="p-5 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Paso {paso + 1} de {pasos.length}: {pasos[paso].etiqueta}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{titulos[paso]}</h2>
              <p className="mt-2 text-neutral-500">{subtitulos[paso]}</p>

              <div className="mt-6">
                {/* Paso 0: motivo */}
                {paso === 0 && (
                  <div className="grid md:grid-cols-3 gap-4">
                    {motivos.map((motivo) => {
                      const Icono = motivo.icono;
                      const activo = datos.motivo === motivo.id;
                      return (
                        <button
                          key={motivo.id}
                          onClick={() => actualizar({ motivo: motivo.id })}
                          className={`${opcionBase} ${activo ? opcionActiva : opcionInactiva}`}
                        >
                          <span
                            className="grid place-items-center w-11 h-11 rounded-xl mb-3"
                            style={{ backgroundColor: `${motivo.color}22` }}
                          >
                            <Icono size={22} style={{ color: motivo.color }} />
                          </span>
                          <h3 className="font-semibold leading-tight">{motivo.titulo}</h3>
                          <p className="mt-1 text-sm text-neutral-500">{motivo.texto}</p>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Paso 1: nivel */}
                {paso === 1 && (
                  <div className="flex flex-col gap-3">
                    {niveles.map((nivel) => {
                      const activo = datos.nivel === nivel.id;
                      return (
                        <button
                          key={nivel.id}
                          onClick={() => actualizar({ nivel: nivel.id })}
                          className={`${opcionBase} flex items-center gap-4 ${
                            activo ? opcionActiva : opcionInactiva
                          }`}
                        >
                          <span className="grid place-items-center w-11 h-11 rounded-xl bg-violet-100 text-violet-700 shrink-0">
                            {activo ? <Check size={20} /> : <Target size={20} />}
                          </span>
                          <span>
                            <span className="block font-semibold">{nivel.titulo}</span>
                            <span className="block text-sm text-neutral-500">{nivel.texto}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Paso 2: ritmo */}
                {paso === 2 && (
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Flag size={16} className="text-neutral-500" />
                        <h3 className="font-semibold">Meta semanal</h3>
                      </div>
                      <div className="flex flex-col gap-3">
                        {metas.map((meta) => (
                          <button
                            key={meta.valor}
                            onClick={() => actualizar({ metaSemanal: meta.valor })}
                            className={`${opcionBase} ${
                              datos.metaSemanal === meta.valor ? opcionActiva : opcionInactiva
                            }`}
                          >
                            <span className="font-semibold">{meta.titulo}</span>
                            <span className="block text-sm text-neutral-500">{meta.texto}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock size={16} className="text-neutral-500" />
                        <h3 className="font-semibold">Tiempo por práctica</h3>
                      </div>
                      <div className="flex flex-col gap-3">
                        {ritmos.map((ritmo) => (
                          <button
                            key={ritmo.valor}
                            onClick={() => actualizar({ ritmo: ritmo.valor })}
                            className={`${opcionBase} ${
                              datos.ritmo === ritmo.valor ? opcionActiva : opcionInactiva
                            }`}
                          >
                            <span className="font-semibold">{ritmo.titulo}</span>
                            <span className="block text-sm text-neutral-500">{ritmo.texto}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => actualizar({ recordatorio: !datos.recordatorio })}
                      className={`md:col-span-2 ${opcionBase} flex items-center gap-3 ${
                        datos.recordatorio ? opcionActiva : opcionInactiva
                      }`}
                    >
                      <Bell size={22} className="text-violet-600 shrink-0" />
                      <span>
                        <span className="block font-semibold">Recordarme practicar</span>
                        <span className="block text-sm text-neutral-500">
                          Preparado para notificaciones cuando activemos recordatorios reales.
                        </span>
                      </span>
                    </button>
                  </div>
                )}

                {/* Paso 3: intereses */}
                {paso === 3 && (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {intereses.map((interes) => {
                        const activo = datos.intereses.includes(interes);
                        return (
                          <button
                            key={interes}
                            onClick={() => alternarInteres(interes)}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                              activo
                                ? 'border-violet-600 bg-violet-600 text-white'
                                : 'border-black/10 bg-white text-neutral-600 hover:bg-neutral-50'
                            }`}
                          >
                            {activo && <Check size={14} />}
                            {interes}
                          </button>
                        );
                      })}
                    </div>
                    <div className="rounded-2xl bg-violet-50 border border-violet-100 p-5">
                      <p className="font-semibold text-violet-900 mb-1">Tu ruta inicial</p>
                      <p className="text-sm text-violet-800/80">
                        Practicarás {datos.metaSemanal} días por semana, cerca de {datos.ritmo}{' '}
                        minutos por sesión, empezando con{' '}
                        {datos.intereses.join(', ') || 'Saludos'}.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <footer className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={() => setPaso(Math.max(0, paso - 1))}
                  disabled={paso === 0}
                  className="inline-flex items-center justify-center gap-1 rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  Atrás
                </button>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={saltar}
                    className="rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    Completar después
                  </button>
                  {paso < pasos.length - 1 ? (
                    <button
                      onClick={() => setPaso(Math.min(pasos.length - 1, paso + 1))}
                      disabled={!puedeAvanzar}
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Siguiente
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={finalizar}
                      disabled={!puedeAvanzar}
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Empezar ruta
                      <Check size={16} />
                    </button>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
