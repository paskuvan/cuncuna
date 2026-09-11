import Link from 'next/link';

// Página 404 global (App Router).
export default function NoEncontrado() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
      <div
        className="bg-white border-[4px] border-black p-8 max-w-md w-full text-center"
        style={{ boxShadow: '12px 12px 0 #000' }}
      >
        <p className="text-7xl md:text-8xl font-black text-black leading-none mb-2">
          4<span className="text-[#FF6B9D]">0</span>4
        </p>
        <h1 className="text-2xl font-black uppercase text-black mb-3 tracking-tight">
          Página no encontrada
        </h1>
        <p className="text-black/70 font-bold mb-6">
          Esta seña no existe (todavía). Volvamos a un lugar conocido.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#FFD23F] text-black border-[3px] border-black px-6 py-3 font-black uppercase text-sm tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform"
          style={{ boxShadow: '6px 6px 0 #FF6B9D' }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
