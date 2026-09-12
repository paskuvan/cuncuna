'use client';

import { useEffect } from 'react';

// Error boundary para errores de renderizado en las rutas de la app.
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error en la aplicación:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F6F1EC] text-neutral-900 flex items-center justify-center p-4">
      <div className="rounded-2xl border border-black/5 bg-white p-8 max-w-md w-full text-center shadow-sm">
        <div className="text-5xl mb-4">🐛</div>
        <h1 className="text-xl font-bold tracking-tight mb-2">Algo salió mal</h1>
        <p className="text-neutral-500 mb-6">
          Tuvimos un problema al cargar esto. Puedes reintentar.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
