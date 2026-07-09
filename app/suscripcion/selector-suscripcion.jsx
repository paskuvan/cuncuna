'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';
import Cuncuna from '../components/mascota/Cuncuna';
import { guardarSeleccionPlan } from '../lib/seleccion-plan-local';

const PLANES = {
  plus: {
    nombre: 'Plus',
    descripcion: 'Aprende LSCh sin límites y a tu ritmo.',
    color: '#FFD23F',
    mensual: 4990,
    anual: 3990,
    icono: Zap,
    beneficios: [
      'Todas las lecciones',
      'Repasos ilimitados',
      'Práctica con cámara',
      'Sin anuncios',
      'Estadísticas completas',
      'Progreso sincronizado',
    ],
  },
  familia: {
    nombre: 'Familia',
    descripcion: 'Hasta cinco personas aprendiendo juntas.',
    color: '#4ECDC4',
    mensual: 8990,
    anual: 6990,
    icono: Users,
    beneficios: [
      'Todo lo incluido en Plus',
      'Hasta 5 perfiles',
      'Progreso individual',
      'Metas compartidas',
      'Panel familiar',
    ],
  },
};

export default function SelectorSuscripcion() {
  const searchParams = useSearchParams();
  const planInicial = PLANES[searchParams.get('plan')] ? searchParams.get('plan') : 'plus';
  const periodoInicial = searchParams.get('periodo') === 'anual' ? 'anual' : 'mensual';
  const [planId, setPlanId] = useState(planInicial);
  const [periodo, setPeriodo] = useState(periodoInicial);
  const [confirmada, setConfirmada] = useState(false);
  const plan = PLANES[planId];
  const Icono = plan.icono;
  const precioMensual = plan[periodo];
  const total = periodo === 'anual' ? precioMensual * 12 : precioMensual;

  const ahorro = useMemo(
    () => (plan.mensual - plan.anual) * 12,
    [plan]
  );

  const confirmar = () => {
    guardarSeleccionPlan({ plan: planId, periodo });
    setConfirmada(true);
  };

  if (confirmada) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
        <main
          className="bg-white border-[4px] border-black p-7 md:p-10 max-w-xl w-full text-center"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <div
            className="w-24 h-24 mx-auto border-[4px] border-black flex items-center justify-center mb-6"
            style={{ backgroundColor: plan.color, boxShadow: '7px 7px 0 #FF6B9D' }}
          >
            <Check size={48} strokeWidth={4} className="text-black" />
          </div>
          <p className="font-black uppercase text-xs tracking-[0.2em] text-black/50 mb-2">
            Selección guardada
          </p>
          <h1 className="font-black uppercase text-4xl text-black leading-none mb-4">
            Elegiste {plan.nombre}
          </h1>
          <p className="font-bold text-black/70 mb-6">
            No realizamos ningún cobro. Te avisaremos cuando las suscripciones estén
            disponibles para que decidas si deseas activarla.
          </p>
          <div className="bg-[#7FFF6B] border-[3px] border-black p-3 mb-7 font-black uppercase text-sm">
            {periodo === 'anual' ? 'Plan anual' : 'Plan mensual'} ·{' '}
            ${precioMensual.toLocaleString('es-CL')} al mes
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="bg-black text-[#FFD23F] border-[3px] border-black px-5 py-3 font-black uppercase text-sm flex items-center justify-center gap-2"
              style={{ boxShadow: '5px 5px 0 #FF6B9D' }}
            >
              Crear mi cuenta
              <ArrowRight size={18} strokeWidth={3} />
            </Link>
            <Link
              href="/"
              className="bg-white text-black border-[3px] border-black px-5 py-3 font-black uppercase text-sm"
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              Volver al inicio
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <header className="bg-black border-b-[4px] border-black">
        <div className="max-w-5xl mx-auto p-4 flex items-center gap-3">
          <Link
            href="/#planes"
            className="bg-white border-[3px] border-white p-2"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            aria-label="Volver a los planes"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="flex-1">
            <h1 className="text-white font-black uppercase text-xl leading-none">
              Elige tu plan
            </h1>
            <p className="text-white/60 font-bold uppercase text-xs mt-1">
              Sin cobro en esta etapa
            </p>
          </div>
          <Cuncuna estado="idle" size={42} animado={false} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-7 items-start">
          <section>
            <p className="font-black uppercase text-xs tracking-[0.2em] text-black/50 mb-3">
              1. Selecciona
            </p>
            <div className="grid grid-cols-2 gap-3 mb-7">
              {Object.entries(PLANES).map(([id, opcion]) => {
                const OpcionIcono = opcion.icono;
                const activa = id === planId;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPlanId(id)}
                    className="border-[4px] border-black p-4 text-left transition-transform hover:translate-y-[-2px]"
                    style={{
                      backgroundColor: activa ? opcion.color : '#FFFFFF',
                      boxShadow: activa ? '7px 7px 0 #000' : '4px 4px 0 #000',
                    }}
                    aria-pressed={activa}
                  >
                    <OpcionIcono size={26} strokeWidth={3} className="mb-3" />
                    <span className="block font-black uppercase text-xl text-black">
                      {opcion.nombre}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="font-black uppercase text-xs tracking-[0.2em] text-black/50 mb-3">
              2. Elige el periodo
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setPeriodo('mensual')}
                className="w-full bg-white border-[4px] border-black p-4 flex items-center gap-4 text-left"
                style={{ boxShadow: periodo === 'mensual' ? '7px 7px 0 #FF6B9D' : '4px 4px 0 #000' }}
                aria-pressed={periodo === 'mensual'}
              >
                <span className={`w-6 h-6 rounded-full border-[3px] border-black shrink-0 ${periodo === 'mensual' ? 'bg-[#FF6B9D]' : 'bg-white'}`} />
                <span className="flex-1">
                  <span className="block font-black uppercase text-black">Mensual</span>
                  <span className="font-bold text-sm text-black/60">Cancela cuando quieras</span>
                </span>
                <strong className="font-black text-xl">${plan.mensual.toLocaleString('es-CL')}</strong>
              </button>

              <button
                type="button"
                onClick={() => setPeriodo('anual')}
                className="w-full bg-white border-[4px] border-black p-4 flex items-center gap-4 text-left"
                style={{ boxShadow: periodo === 'anual' ? '7px 7px 0 #7FFF6B' : '4px 4px 0 #000' }}
                aria-pressed={periodo === 'anual'}
              >
                <span className={`w-6 h-6 rounded-full border-[3px] border-black shrink-0 ${periodo === 'anual' ? 'bg-[#7FFF6B]' : 'bg-white'}`} />
                <span className="flex-1">
                  <span className="block font-black uppercase text-black">Anual</span>
                  <span className="font-bold text-sm text-black/60">
                    Ahorras ${ahorro.toLocaleString('es-CL')} al año
                  </span>
                </span>
                <strong className="font-black text-xl">${plan.anual.toLocaleString('es-CL')}</strong>
              </button>
            </div>
          </section>

          <aside
            className="border-[4px] border-black p-5 lg:sticky lg:top-6"
            style={{ backgroundColor: plan.color, boxShadow: '10px 10px 0 #000' }}
          >
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <p className="font-black uppercase text-xs text-black/60">Resumen</p>
                <h2 className="font-black uppercase text-3xl text-black">{plan.nombre}</h2>
              </div>
              <div className="bg-white border-[3px] border-black p-2">
                <Icono size={26} strokeWidth={3} />
              </div>
            </div>

            <p className="font-bold text-black/70 mb-5">{plan.descripcion}</p>
            <ul className="space-y-2 border-y-[3px] border-black py-5">
              {plan.beneficios.map((beneficio) => (
                <li key={beneficio} className="flex gap-2 font-bold text-sm">
                  <Check size={17} strokeWidth={4} className="shrink-0" />
                  {beneficio}
                </li>
              ))}
            </ul>

            <div className="py-5">
              <div className="flex items-center gap-2 mb-1">
                <CalendarDays size={18} strokeWidth={3} />
                <p className="font-black uppercase text-xs">
                  {periodo === 'anual' ? 'Total anual' : 'Total mensual'}
                </p>
              </div>
              <p className="font-black text-4xl">${total.toLocaleString('es-CL')}</p>
              {periodo === 'anual' && (
                <p className="font-bold text-xs text-black/60 mt-1">
                  Equivale a ${precioMensual.toLocaleString('es-CL')} al mes
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={confirmar}
              className="w-full bg-black text-[#FFD23F] border-[3px] border-black px-4 py-4 font-black uppercase text-sm flex items-center justify-center gap-2"
              style={{ boxShadow: '5px 5px 0 #FF6B9D' }}
            >
              Confirmar selección
              <ArrowRight size={19} strokeWidth={3} />
            </button>
            <p className="font-bold text-[11px] text-black/60 text-center mt-4">
              Al continuar aceptas los{' '}
              <Link href="/legal/terminos" className="underline">términos</Link>, la{' '}
              <Link href="/legal/privacidad" className="underline">privacidad</Link> y la política de{' '}
              <Link href="/legal/reembolsos" className="underline">cancelaciones</Link>.
            </p>
            <div className="flex items-start gap-2 mt-5">
              <ShieldCheck size={18} strokeWidth={3} className="shrink-0" />
              <p className="font-bold text-xs text-black/70">
                No pediremos tarjeta ni realizaremos cobros.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
