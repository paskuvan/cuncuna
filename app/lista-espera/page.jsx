import Link from 'next/link';
import { ArrowLeft, BellRing, Check, Mail, ShieldCheck } from 'lucide-react';
import Cuncuna from '../components/mascota/Cuncuna';
import FormularioListaEspera from '../components/FormularioListaEspera';

export const metadata = {
  title: 'Lista de espera',
  description: 'Únete a la lista de espera de Cuncuna para aprender LSCh.',
};

const razones = [
  'Aviso cuando se abra el acceso anticipado',
  'Novedades de los primeros niveles de LSCh',
  'Sin spam ni correos innecesarios',
];

export default function PaginaListaEspera() {
  return (
    <main className="min-h-screen bg-[#F6F1EC] text-neutral-900">
      {/* Nav */}
      <header className="border-b border-black/5 bg-[#F6F1EC]/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Inicio
          </Link>
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-violet-600">
              <Cuncuna estado="idle" size={22} animado={false} />
            </span>
            <span className="text-lg font-bold tracking-tight">Cuncuna</span>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6 items-stretch">
          {/* CTA principal */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-violet-700 p-6 md:p-10 text-white">
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/10" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold mb-6">
                <BellRing size={15} />
                Acceso anticipado
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                Súmate a la lista de espera
              </h1>
              <p className="mt-5 text-white/80 text-lg max-w-2xl">
                Cuncuna está preparando una experiencia para personas oyentes que quieren
                aprender Lengua de Señas Chilena paso a paso.
              </p>
              <div className="mt-8 max-w-xl">
                <FormularioListaEspera origen="pagina-lista-espera" variante="grande" />
              </div>
            </div>
          </div>

          {/* Aside */}
          <aside className="rounded-3xl border border-black/5 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex justify-center mb-6">
              <span className="grid place-items-center rounded-2xl bg-gradient-to-br from-violet-100 to-amber-100 p-5">
                <Cuncuna estado="saludando" size={120} />
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight mb-4">¿Qué recibirás?</h2>
            <div className="flex flex-col gap-3">
              {razones.map((razon) => (
                <div
                  key={razon}
                  className="flex items-start gap-3 rounded-xl bg-neutral-50 border border-black/5 p-3"
                >
                  <span className="grid place-items-center w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
                    <Check size={15} />
                  </span>
                  <p className="text-sm font-medium text-neutral-700">{razon}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-black/5 pt-5">
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-violet-600 shrink-0" />
                <p className="text-sm text-neutral-500">
                  Usaremos tu correo solo para avisarte sobre Cuncuna. Puedes revisar nuestra
                  política de privacidad cuando quieras.
                </p>
              </div>
              <Link
                href="/legal/privacidad"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
              >
                <Mail size={16} />
                Política de privacidad
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
