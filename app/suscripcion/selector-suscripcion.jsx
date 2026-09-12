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

  const ahorro = useMemo(() => (plan.mensual - plan.anual) * 12, [plan]);

  const confirmar = () => {
    guardarSeleccionPlan({ plan: planId, periodo });
    setConfirmada(true);
  };

  // ─── Confirmada ───
  if (confirmada) {
    return (
      <div className="min-h-screen bg-[#F6F1EC] text-neutral-900 flex items-center justify-center p-4">
        <main className="rounded-3xl border border-black/5 bg-white p-8 md:p-10 max-w-xl w-full text-center shadow-sm">
          <span className="grid place-items-center w-20 h-20 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 mb-6">
            <Check size={40} />
          </span>
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">
            Selección guardada
          </p>
          <h1 className="text-3xl font-bold tracking-tight mb-4">Elegiste {plan.nombre}</h1>
          <p className="text-neutral-500 mb-6">
            No realizamos ningún cobro. Te avisaremos cuando las suscripciones estén disponibles
            para que decidas si deseas activarla.
          </p>
          <div className="rounded-xl bg-neutral-50 border border-black/5 p-3 mb-7 text-sm font-semibold">
            {periodo === 'anual' ? 'Plan anual' : 'Plan mensual'} · $
            {precioMensual.toLocaleString('es-CL')} al mes
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
            >
              Crear mi cuenta
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F1EC] text-neutral-900">
      <header className="border-b border-black/5 bg-[#F6F1EC]/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3.5 flex items-center gap-3">
          <Link
            href="/#planes"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            aria-label="Volver a los planes"
          >
            <ArrowLeft size={16} />
            Planes
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold tracking-tight leading-none">Elige tu plan</h1>
            <p className="text-xs text-neutral-500 mt-0.5">Sin cobro en esta etapa</p>
          </div>
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-violet-600">
            <Cuncuna estado="idle" size={22} animado={false} />
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
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
                    className={`text-left rounded-2xl border p-4 transition-colors ${
                      activa
                        ? 'border-violet-400 ring-2 ring-violet-200 bg-violet-50'
                        : 'border-black/5 bg-white hover:bg-neutral-50'
                    }`}
                    aria-pressed={activa}
                  >
                    <span
                      className={`grid place-items-center w-10 h-10 rounded-xl mb-3 ${
                        activa ? 'bg-violet-600 text-white' : 'bg-violet-100 text-violet-700'
                      }`}
                    >
                      <OpcionIcono size={20} />
                    </span>
                    <span className="block text-lg font-bold tracking-tight">{opcion.nombre}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              2. Elige el periodo
            </p>
            <div className="flex flex-col gap-3">
              {[
                { id: 'mensual', titulo: 'Mensual', sub: 'Cancela cuando quieras', precio: plan.mensual },
                { id: 'anual', titulo: 'Anual', sub: `Ahorras $${ahorro.toLocaleString('es-CL')} al año`, precio: plan.anual },
              ].map((op) => {
                const activo = periodo === op.id;
                return (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setPeriodo(op.id)}
                    className={`w-full flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
                      activo ? 'border-violet-400 ring-2 ring-violet-200 bg-violet-50' : 'border-black/5 bg-white hover:bg-neutral-50'
                    }`}
                    aria-pressed={activo}
                  >
                    <span className={`grid place-items-center w-6 h-6 rounded-full border-2 shrink-0 ${activo ? 'border-violet-600' : 'border-neutral-300'}`}>
                      {activo && <span className="w-3 h-3 rounded-full bg-violet-600" />}
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold">{op.titulo}</span>
                      <span className="text-sm text-neutral-500">{op.sub}</span>
                    </span>
                    <strong className="text-lg font-bold">${op.precio.toLocaleString('es-CL')}</strong>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <p className="text-xs text-neutral-500">Resumen</p>
                <h2 className="text-2xl font-bold tracking-tight">{plan.nombre}</h2>
              </div>
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-violet-100 text-violet-700">
                <Icono size={22} />
              </span>
            </div>

            <p className="text-sm text-neutral-500 mb-5">{plan.descripcion}</p>
            <ul className="flex flex-col gap-2 border-y border-black/5 py-5">
              {plan.beneficios.map((beneficio) => (
                <li key={beneficio} className="flex gap-2 text-sm text-neutral-700">
                  <Check size={17} className="shrink-0 text-violet-600" />
                  {beneficio}
                </li>
              ))}
            </ul>

            <div className="py-5">
              <div className="flex items-center gap-2 mb-1 text-neutral-500">
                <CalendarDays size={16} />
                <p className="text-xs font-medium">
                  {periodo === 'anual' ? 'Total anual' : 'Total mensual'}
                </p>
              </div>
              <p className="text-4xl font-bold tracking-tight">${total.toLocaleString('es-CL')}</p>
              {periodo === 'anual' && (
                <p className="text-xs text-neutral-500 mt-1">
                  Equivale a ${precioMensual.toLocaleString('es-CL')} al mes
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={confirmar}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
            >
              Confirmar selección
              <ArrowRight size={18} />
            </button>
            <p className="text-[11px] text-neutral-400 text-center mt-4">
              Al continuar aceptas los{' '}
              <Link href="/legal/terminos" className="underline hover:text-violet-600">términos</Link>, la{' '}
              <Link href="/legal/privacidad" className="underline hover:text-violet-600">privacidad</Link> y la política de{' '}
              <Link href="/legal/reembolsos" className="underline hover:text-violet-600">cancelaciones</Link>.
            </p>
            <div className="flex items-start gap-2 mt-5">
              <ShieldCheck size={16} className="shrink-0 text-violet-600" />
              <p className="text-xs text-neutral-500">
                No pediremos tarjeta ni realizaremos cobros.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
