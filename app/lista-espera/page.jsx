import Link from 'next/link';
import { ArrowLeft, BellRing, Check, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import Cuncuna from '../components/mascota/Cuncuna';
import FormularioListaEspera from '../components/FormularioListaEspera';

export const metadata = {
  title: 'Lista de espera · Cuncuna',
  description: 'Únete a la lista de espera de Cuncuna para aprender LSCh.',
};

const razones = [
  'Aviso cuando se abra el acceso anticipado',
  'Novedades de los primeros niveles de LSCh',
  'Sin spam ni correos innecesarios',
];

export default function PaginaListaEspera() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <header className="bg-black border-b-[4px] border-black">
        <div className="max-w-5xl mx-auto p-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="bg-white border-[3px] border-white p-2 hover:-translate-y-0.5 transition-transform"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            aria-label="Volver al inicio"
          >
            <ArrowLeft size={20} strokeWidth={4} className="text-black" />
          </Link>
          <div className="flex items-center gap-3">
            <div
              className="bg-[#FFD23F] border-[3px] border-white p-1.5"
              style={{ boxShadow: '4px 4px 0 #FF6B9D' }}
            >
              <Cuncuna estado="idle" size={32} animado={false} />
            </div>
            <div>
              <p className="text-white font-black uppercase text-lg leading-none">
                Cuncuna
              </p>
              <p className="text-white/60 text-xs font-bold uppercase tracking-wider">
                Lista de espera
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-7 items-center">
          <div
            className="bg-[#FFD23F] border-[4px] border-black p-6 md:p-9 relative overflow-hidden"
            style={{ boxShadow: '12px 12px 0 #000' }}
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FF6B9D] border-[4px] border-black rounded-full" />
            <Sparkles
              size={30}
              strokeWidth={4}
              className="absolute top-5 right-5 text-black"
            />
            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 bg-white border-[3px] border-black px-3 py-2 mb-6"
                style={{ boxShadow: '4px 4px 0 #000' }}
              >
                <BellRing size={18} strokeWidth={4} className="text-black" />
                <span className="font-black uppercase text-xs text-black tracking-[0.15em]">
                  Acceso anticipado
                </span>
              </div>

              <h1 className="font-black uppercase text-5xl md:text-7xl text-black leading-[0.9] tracking-tight">
                Súmate a la lista de espera
              </h1>
              <p className="font-bold text-black/75 text-lg md:text-xl mt-6 max-w-2xl">
                Cuncuna está preparando una experiencia para personas oyentes que quieren aprender Lengua de Señas Chilena paso a paso.
              </p>

              <div className="mt-8 max-w-xl">
                <FormularioListaEspera origen="pagina-lista-espera" variante="grande" />
              </div>
            </div>
          </div>

          <aside
            className="bg-white border-[4px] border-black p-6 md:p-8"
            style={{ boxShadow: '10px 10px 0 #000' }}
          >
            <div className="flex justify-center mb-6">
              <div
                className="bg-[#4ECDC4] border-[4px] border-black p-5"
                style={{ boxShadow: '7px 7px 0 #FF6B9D' }}
              >
                <Cuncuna estado="saludando" size={130} />
              </div>
            </div>

            <h2 className="font-black uppercase text-3xl text-black leading-none mb-4">
              ¿Qué recibirás?
            </h2>
            <div className="space-y-3">
              {razones.map((razon) => (
                <div
                  key={razon}
                  className="bg-[#F5F0E8] border-[3px] border-black p-3 flex items-start gap-3"
                  style={{ boxShadow: '4px 4px 0 #000' }}
                >
                  <span className="bg-[#7FFF6B] border-[3px] border-black p-1 shrink-0">
                    <Check size={16} strokeWidth={4} className="text-black" />
                  </span>
                  <p className="font-bold text-black">{razon}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t-[3px] border-black pt-5">
              <div className="flex items-start gap-3">
                <ShieldCheck size={24} strokeWidth={4} className="text-black shrink-0" />
                <p className="font-bold text-black/70 text-sm">
                  Usaremos tu correo solo para avisarte sobre Cuncuna. Puedes revisar nuestra política de privacidad cuando quieras.
                </p>
              </div>
              <Link
                href="/legal/privacidad"
                className="mt-4 inline-flex items-center gap-2 font-black uppercase text-xs text-black underline decoration-[#FF6B9D] decoration-[3px]"
              >
                <Mail size={16} strokeWidth={4} />
                Política de privacidad
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
