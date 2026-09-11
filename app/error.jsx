'use client';

import { useEffect } from 'react';

// Error boundary para errores de renderizado en las rutas de la app.
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error en la aplicación:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
      <div
        className="bg-white border-[4px] border-black p-8 max-w-md w-full text-center"
        style={{ boxShadow: '12px 12px 0 #000' }}
      >
        <div className="text-6xl mb-4">🐛</div>
        <h1 className="text-2xl font-black uppercase text-black mb-3 tracking-tight">
          Algo salió mal
        </h1>
        <p className="text-black/70 font-bold mb-6">
          Tuvimos un problema al cargar esto. Puedes reintentar.
        </p>
        <button
          onClick={() => reset()}
          className="inline-block bg-[#FFD23F] text-black border-[3px] border-black px-6 py-3 font-black uppercase text-sm tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform"
          style={{ boxShadow: '6px 6px 0 #FF6B9D' }}
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
