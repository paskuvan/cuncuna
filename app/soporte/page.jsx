import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { EMAIL_SOPORTE } from '../lib/contacto';

export const metadata = { title: 'Soporte' };

export default function SoportePage() {
  return (
    <div className="min-h-screen bg-[#F6F1EC] text-neutral-900">
      <header className="border-b border-black/5 bg-[#F6F1EC]/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-3.5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Inicio
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14 flex flex-col gap-6">
        <section className="rounded-3xl bg-gradient-to-br from-violet-600 to-violet-700 p-6 md:p-10 text-white">
          <MessageCircle size={36} className="mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            ¿Necesitas ayuda?
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl">
            Cuéntanos qué ocurrió e incluye la información necesaria para encontrar una solución.
          </p>
        </section>

        <section className="rounded-2xl border border-black/5 bg-white p-6 md:p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
            Correo de soporte
          </p>
          <a
            href={`mailto:${EMAIL_SOPORTE}?subject=Soporte%20Cuncuna`}
            className="mt-1 block text-xl md:text-2xl font-bold tracking-tight text-violet-600 hover:text-violet-700 break-all transition-colors"
          >
            {EMAIL_SOPORTE}
          </a>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-neutral-50 border border-black/5 p-4">
            <Mail size={20} className="text-violet-600 shrink-0" />
            <p className="text-sm text-neutral-600">
              Incluye el correo de tu cuenta, dispositivo, navegador y una descripción del
              problema. Nunca envíes contraseñas ni datos completos de tarjetas.
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-neutral-500">
            <ShieldCheck size={18} />
            Responderemos tan pronto como sea posible.
          </div>
        </section>
      </main>
    </div>
  );
}
