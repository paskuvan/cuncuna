'use client';

import { useMemo, useState } from 'react';
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

const motivos = [
  {
    id: 'familia',
    titulo: 'Familia o amistades',
    texto: 'Quiero comunicarme mejor con alguien cercano.',
    icono: HeartHandshake,
    color: '#FFD23F',
  },
  {
    id: 'trabajo',
    titulo: 'Trabajo o atención',
    texto: 'Quiero atender mejor a personas sordas.',
    icono: BookOpen,
    color: '#4ECDC4',
  },
  {
    id: 'curiosidad',
    titulo: 'Aprendizaje personal',
    texto: 'Me interesa aprender LSCh desde cero.',
    icono: Sparkles,
    color: '#FF6B9D',
  },
];

const niveles = [
  { id: 'cero', titulo: 'Desde cero', texto: 'No conozco señas todavía.' },
  { id: 'basico', titulo: 'Básico', texto: 'Sé algunas señas sueltas.' },
  { id: 'practica', titulo: 'Con práctica', texto: 'Ya puedo saludar o presentarme.' },
];

const intereses = [
  'Saludos',
  'Familia',
  'Trabajo',
  'Emergencias',
  'Números',
  'Conversación diaria',
];

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
    const guardado = obtenerOnboarding();
    return {
      motivo: guardado.motivo,
      nivel: guardado.nivel,
      metaSemanal: guardado.metaSemanal,
      ritmo: guardado.ritmo,
      intereses: guardado.intereses,
      recordatorio: guardado.recordatorio,
    };
  });

  const pasos = useMemo(
    () => [
      {
        etiqueta: 'Meta',
        valido: Boolean(datos.motivo),
      },
      {
        etiqueta: 'Nivel',
        valido: Boolean(datos.nivel),
      },
      {
        etiqueta: 'Ritmo',
        valido: Boolean(datos.metaSemanal && datos.ritmo),
      },
      {
        etiqueta: 'Temas',
        valido: datos.intereses.length > 0,
      },
    ],
    [datos],
  );

  const actualizar = (cambios) => {
    const siguiente = { ...datos, ...cambios };
    setDatos(siguiente);
    guardarOnboarding(siguiente);
  };

  const alternarInteres = (interes) => {
    const existe = datos.intereses.includes(interes);
    const siguientes = existe
      ? datos.intereses.filter((item) => item !== interes)
      : [...datos.intereses, interes];
    actualizar({ intereses: siguientes });
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

  return (
    <main className="min-h-screen bg-[#F5F0E8] p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={saltar}
            className="bg-white border-[3px] border-black px-4 py-2 font-black uppercase text-xs text-black hover:-translate-y-0.5 transition-transform"
            style={{ boxShadow: '4px 4px 0 #000' }}
          >
            Omitir
          </button>
          <div className="flex items-center gap-2">
            {pasos.map((item, index) => (
              <div
                key={item.etiqueta}
                className={`h-3 border-[2px] border-black transition-all ${
                  index <= paso ? 'bg-[#FFD23F] w-10' : 'bg-white w-5'
                }`}
              />
            ))}
          </div>
        </header>

        <section
          className="bg-white border-[4px] border-black overflow-hidden"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="bg-[#FFD23F] border-b-[4px] lg:border-b-0 lg:border-r-[4px] border-black p-6 md:p-8 flex flex-col justify-between gap-8">
              <div>
                <p className="font-black uppercase text-xs tracking-[0.2em] text-black/70 mb-3">
                  Onboarding
                </p>
                <h1 className="text-4xl md:text-5xl font-black uppercase text-black leading-none tracking-tight">
                  Hagamos tu ruta LSCh
                </h1>
                <p className="mt-4 text-black/75 font-bold leading-relaxed">
                  Ajustamos el inicio para personas oyentes que quieren aprender
                  Lengua de Señas Chilena con práctica constante.
                </p>
              </div>

              <div
                className="bg-white border-[4px] border-black p-5 self-start"
                style={{ boxShadow: '8px 8px 0 #FF6B9D' }}
              >
                <Cuncuna estado="pensando" size={120} />
              </div>
            </aside>

            <div className="p-5 md:p-8">
              <div className="mb-6">
                <p className="font-black uppercase text-xs tracking-[0.2em] text-black/50 mb-2">
                  Paso {paso + 1} de {pasos.length}: {pasos[paso].etiqueta}
                </p>
                {paso === 0 && (
                  <>
                    <h2 className="text-3xl md:text-4xl font-black uppercase text-black leading-none">
                      ¿Por qué quieres aprender?
                    </h2>
                    <p className="mt-3 text-black/70 font-bold">
                      Esto ayuda a recomendar ejemplos y misiones más cercanas a tu vida diaria.
                    </p>
                  </>
                )}
                {paso === 1 && (
                  <>
                    <h2 className="text-3xl md:text-4xl font-black uppercase text-black leading-none">
                      ¿Cuál es tu nivel?
                    </h2>
                    <p className="mt-3 text-black/70 font-bold">
                      Cuncuna partirá con una dificultad amable, pero sin hacerte perder tiempo.
                    </p>
                  </>
                )}
                {paso === 2 && (
                  <>
                    <h2 className="text-3xl md:text-4xl font-black uppercase text-black leading-none">
                      Elige tu ritmo
                    </h2>
                    <p className="mt-3 text-black/70 font-bold">
                      La constancia vale más que estudiar mucho una sola vez.
                    </p>
                  </>
                )}
                {paso === 3 && (
                  <>
                    <h2 className="text-3xl md:text-4xl font-black uppercase text-black leading-none">
                      ¿Qué temas te interesan?
                    </h2>
                    <p className="mt-3 text-black/70 font-bold">
                      Marca al menos uno para personalizar tus primeras recomendaciones.
                    </p>
                  </>
                )}
              </div>

              {paso === 0 && (
                <div className="grid md:grid-cols-3 gap-4">
                  {motivos.map((motivo) => {
                    const Icono = motivo.icono;
                    const activo = datos.motivo === motivo.id;
                    return (
                      <button
                        key={motivo.id}
                        onClick={() => actualizar({ motivo: motivo.id })}
                        className={`text-left border-[3px] border-black p-4 transition-all ${
                          activo ? 'translate-x-[-3px] translate-y-[-3px]' : 'bg-white'
                        }`}
                        style={{
                          backgroundColor: activo ? motivo.color : '#FFFFFF',
                          boxShadow: activo ? '8px 8px 0 #000' : '5px 5px 0 #000',
                        }}
                      >
                        <Icono size={30} strokeWidth={3} className="text-black mb-4" />
                        <h3 className="font-black uppercase text-black text-lg leading-tight">
                          {motivo.titulo}
                        </h3>
                        <p className="text-black/70 font-bold text-sm mt-2">{motivo.texto}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {paso === 1 && (
                <div className="space-y-4">
                  {niveles.map((nivel) => {
                    const activo = datos.nivel === nivel.id;
                    return (
                      <button
                        key={nivel.id}
                        onClick={() => actualizar({ nivel: nivel.id })}
                        className={`w-full text-left border-[3px] border-black p-4 flex items-center gap-4 transition-all ${
                          activo ? 'bg-[#7FFF6B]' : 'bg-white'
                        }`}
                        style={{ boxShadow: activo ? '8px 8px 0 #000' : '5px 5px 0 #000' }}
                      >
                        <div className="w-12 h-12 bg-black text-[#FFD23F] border-[3px] border-black flex items-center justify-center shrink-0">
                          {activo ? <Check size={24} strokeWidth={4} /> : <Target size={24} strokeWidth={4} />}
                        </div>
                        <div>
                          <h3 className="font-black uppercase text-black text-xl">{nivel.titulo}</h3>
                          <p className="text-black/70 font-bold text-sm">{nivel.texto}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {paso === 2 && (
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Flag size={20} strokeWidth={3} className="text-black" />
                      <h3 className="font-black uppercase text-black">Meta semanal</h3>
                    </div>
                    <div className="space-y-3">
                      {metas.map((meta) => (
                        <button
                          key={meta.valor}
                          onClick={() => actualizar({ metaSemanal: meta.valor })}
                          className={`w-full border-[3px] border-black p-4 text-left ${
                            datos.metaSemanal === meta.valor ? 'bg-[#FFD23F]' : 'bg-white'
                          }`}
                          style={{ boxShadow: '5px 5px 0 #000' }}
                        >
                          <span className="font-black uppercase text-black">{meta.titulo}</span>
                          <span className="block text-sm font-bold text-black/70">{meta.texto}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={20} strokeWidth={3} className="text-black" />
                      <h3 className="font-black uppercase text-black">Tiempo por práctica</h3>
                    </div>
                    <div className="space-y-3">
                      {ritmos.map((ritmo) => (
                        <button
                          key={ritmo.valor}
                          onClick={() => actualizar({ ritmo: ritmo.valor })}
                          className={`w-full border-[3px] border-black p-4 text-left ${
                            datos.ritmo === ritmo.valor ? 'bg-[#4ECDC4]' : 'bg-white'
                          }`}
                          style={{ boxShadow: '5px 5px 0 #000' }}
                        >
                          <span className="font-black uppercase text-black">{ritmo.titulo}</span>
                          <span className="block text-sm font-bold text-black/70">{ritmo.texto}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => actualizar({ recordatorio: !datos.recordatorio })}
                    className={`md:col-span-2 border-[3px] border-black p-4 flex items-center gap-3 text-left ${
                      datos.recordatorio ? 'bg-[#FF6B9D]' : 'bg-white'
                    }`}
                    style={{ boxShadow: '5px 5px 0 #000' }}
                  >
                    <Bell size={24} strokeWidth={3} className={datos.recordatorio ? 'text-white' : 'text-black'} />
                    <span>
                      <span className={`block font-black uppercase ${datos.recordatorio ? 'text-white' : 'text-black'}`}>
                        Recordarme practicar
                      </span>
                      <span className={`block text-sm font-bold ${datos.recordatorio ? 'text-white/80' : 'text-black/70'}`}>
                        Preparado para notificaciones cuando activemos recordatorios reales.
                      </span>
                    </span>
                  </button>
                </div>
              )}

              {paso === 3 && (
                <div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {intereses.map((interes) => {
                      const activo = datos.intereses.includes(interes);
                      return (
                        <button
                          key={interes}
                          onClick={() => alternarInteres(interes)}
                          className={`border-[3px] border-black px-4 py-3 font-black uppercase text-sm transition-transform ${
                            activo ? 'bg-[#7FFF6B] text-black -translate-y-0.5' : 'bg-white text-black'
                          }`}
                          style={{ boxShadow: '4px 4px 0 #000' }}
                        >
                          {activo && <Check size={16} strokeWidth={4} className="inline mr-2" />}
                          {interes}
                        </button>
                      );
                    })}
                  </div>

                  <div
                    className="bg-[#FFD23F] border-[3px] border-black p-5"
                    style={{ boxShadow: '6px 6px 0 #000' }}
                  >
                    <p className="font-black uppercase text-black mb-2">Tu ruta inicial</p>
                    <p className="text-black/75 font-bold">
                      Practicarás {datos.metaSemanal} días por semana, cerca de {datos.ritmo}
                      {' '}minutos por sesión, empezando con {datos.intereses.join(', ') || 'Saludos'}.
                    </p>
                  </div>
                </div>
              )}

              <footer className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={() => setPaso(Math.max(0, paso - 1))}
                  disabled={paso === 0}
                  className="bg-white border-[3px] border-black px-5 py-3 font-black uppercase text-sm text-black flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ boxShadow: '5px 5px 0 #000' }}
                >
                  <ChevronLeft size={18} strokeWidth={4} />
                  Atrás
                </button>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={saltar}
                    className="bg-white border-[3px] border-black px-5 py-3 font-black uppercase text-sm text-black"
                    style={{ boxShadow: '5px 5px 0 #000' }}
                  >
                    Completar después
                  </button>
                  {paso < pasos.length - 1 ? (
                    <button
                      onClick={() => setPaso(Math.min(pasos.length - 1, paso + 1))}
                      disabled={!puedeAvanzar}
                      className="bg-black border-[3px] border-black px-5 py-3 font-black uppercase text-sm text-[#FFD23F] flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ boxShadow: '5px 5px 0 #FF6B9D' }}
                    >
                      Siguiente
                      <ChevronRight size={18} strokeWidth={4} />
                    </button>
                  ) : (
                    <button
                      onClick={finalizar}
                      disabled={!puedeAvanzar}
                      className="bg-[#7FFF6B] border-[3px] border-black px-5 py-3 font-black uppercase text-sm text-black flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ boxShadow: '5px 5px 0 #000' }}
                    >
                      Empezar ruta
                      <Check size={18} strokeWidth={4} />
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
