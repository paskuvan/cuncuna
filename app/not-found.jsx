import Link from 'next/link';

// Página 404 global (App Router).
export default function NoEncontrado() {
  return (
    <div className="min-h-screen bg-[#F6F1EC] text-neutral-900 flex items-center justify-center p-4">
      <div className="rounded-2xl border border-black/5 bg-white p-8 max-w-md w-full text-center shadow-sm">
        <p className="text-6xl md:text-7xl font-bold tracking-tight leading-none mb-2">
          4<span className="text-violet-600">0</span>4
        </p>
        <h1 className="text-xl font-bold tracking-tight mb-2">Página no encontrada</h1>
        <p className="text-neutral-500 mb-6">
          Esta seña no existe (todavía). Volvamos a un lugar conocido.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
