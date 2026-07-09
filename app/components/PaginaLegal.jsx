import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PaginaLegal({ etiqueta, titulo, introduccion, children }) {
  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <header className="bg-black border-b-[4px] border-black">
        <div className="max-w-4xl mx-auto p-4 flex items-center gap-3">
          <Link
            href="/"
            className="bg-white border-[3px] border-white p-2"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            aria-label="Volver al inicio"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div>
            <p className="text-[#FFD23F] font-black uppercase text-xs tracking-[0.2em]">
              Cuncuna
            </p>
            <p className="text-white font-black uppercase text-lg leading-none">
              Información legal
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <section
          className="bg-[#FFD23F] border-[4px] border-black p-6 md:p-8 mb-7"
          style={{ boxShadow: '10px 10px 0 #000' }}
        >
          <p className="font-black uppercase text-xs tracking-[0.2em] text-black/60 mb-2">
            {etiqueta}
          </p>
          <h1 className="font-black uppercase text-3xl md:text-5xl text-black leading-none">
            {titulo}
          </h1>
          <p className="font-bold text-black/70 mt-4 max-w-2xl">{introduccion}</p>
          <p className="font-black uppercase text-[10px] tracking-[0.15em] text-black/50 mt-5">
            Última actualización: 8 de julio de 2026
          </p>
        </section>

        <article
          className="bg-white border-[4px] border-black p-6 md:p-8 legal-content"
          style={{ boxShadow: '10px 10px 0 #000' }}
        >
          {children}
        </article>
      </main>
    </div>
  );
}

export function SeccionLegal({ titulo, children }) {
  return (
    <section>
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}
