import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { EMAIL_SOPORTE } from '../lib/contacto';

export const metadata = { title: 'Soporte · Cuncuna' };

export default function SoportePage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <header className="bg-black border-b-[4px] border-black">
        <div className="max-w-4xl mx-auto p-4">
          <Link href="/" className="inline-flex bg-white border-[3px] border-white p-2" aria-label="Volver">
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <section className="bg-[#4ECDC4] border-[4px] border-black p-6 md:p-9" style={{ boxShadow: '12px 12px 0 #000' }}>
          <MessageCircle size={42} strokeWidth={3} className="mb-4" />
          <h1 className="font-black uppercase text-4xl md:text-5xl text-black leading-none">¿Necesitas ayuda?</h1>
          <p className="font-bold text-black/70 text-lg mt-4 max-w-2xl">Cuéntanos qué ocurrió e incluye la información necesaria para encontrar una solución.</p>
        </section>

        <section className="bg-white border-[4px] border-black p-6 md:p-8 mt-8" style={{ boxShadow: '10px 10px 0 #000' }}>
          <p className="font-black uppercase text-xs tracking-[0.2em] text-black/50">Correo de soporte</p>
          <a href={`mailto:${EMAIL_SOPORTE}?subject=Soporte%20Cuncuna`} className="font-black text-xl md:text-3xl text-black underline decoration-[#FF6B9D] decoration-4 break-all">
            {EMAIL_SOPORTE}
          </a>
          <div className="flex items-start gap-3 mt-6 bg-[#FFD23F] border-[3px] border-black p-4">
            <Mail size={22} strokeWidth={3} className="shrink-0" />
            <p className="font-bold text-sm">Incluye el correo de tu cuenta, dispositivo, navegador y una descripción del problema. Nunca envíes contraseñas ni datos completos de tarjetas.</p>
          </div>
          <div className="flex items-center gap-2 mt-5 font-bold text-sm text-black/60">
            <ShieldCheck size={20} strokeWidth={3} />
            Responderemos tan pronto como sea posible.
          </div>
        </section>
      </main>
    </div>
  );
}
