import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PaginaLegal({ etiqueta, titulo, introduccion, children }) {
  return (
    <div className="min-h-screen bg-[#F6F1EC] text-neutral-900">
      <header className="border-b border-black/5 bg-[#F6F1EC]/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-3.5 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            aria-label="Volver al inicio"
          >
            <ArrowLeft size={16} />
            Inicio
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Cuncuna
            </p>
            <p className="text-sm font-bold tracking-tight leading-none">Información legal</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col gap-6">
        <section className="rounded-2xl border border-black/5 bg-white p-6 md:p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">
            {etiqueta}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{titulo}</h1>
          <p className="text-neutral-500 mt-4 max-w-2xl">{introduccion}</p>
          <p className="text-xs text-neutral-400 mt-5">
            Última actualización: 8 de julio de 2026
          </p>
        </section>

        <article className="rounded-2xl border border-black/5 bg-white p-6 md:p-8 shadow-sm legal-content">
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
