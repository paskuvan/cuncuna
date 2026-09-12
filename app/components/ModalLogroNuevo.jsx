'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Cuncuna from './mascota/Cuncuna';

// ============================================================
// COMPONENTE: ModalLogroNuevo  (estilo suave)
// Se muestra al desbloquear uno o más logros.
// ============================================================

export default function ModalLogroNuevo({ logrosNuevos, onCerrar }) {
  const [indice, setIndice] = useState(0);
  const [animar, setAnimar] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setAnimar(false), 600);
    return () => {
      clearTimeout(t);
      setAnimar(true);
    };
  }, [indice]);

  if (!logrosNuevos || logrosNuevos.length === 0) return null;

  const logro = logrosNuevos[indice];
  const ultimo = indice === logrosNuevos.length - 1;

  const siguiente = () => {
    if (ultimo) {
      onCerrar();
      setIndice(0);
    } else {
      setIndice(indice + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div
        className={`rounded-3xl border border-black/5 bg-white p-8 max-w-md w-full text-center shadow-xl transition-transform ${
          animar ? 'scale-105' : 'scale-100'
        }`}
      >
        <div className="flex justify-center mb-2">
          <Cuncuna estado="celebrando" size={72} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-4">
          ¡Logro desbloqueado!
        </p>

        <div className="flex justify-center mb-5">
          <span
            className="grid place-items-center w-28 h-28 rounded-3xl text-6xl"
            style={{ backgroundColor: `${logro.color}22` }}
          >
            {logro.emoji}
          </span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-3">{logro.titulo}</h2>

        <div className="rounded-xl bg-neutral-50 border border-black/5 p-3 mb-6">
          <p className="text-sm text-neutral-600">{logro.descripcion}</p>
        </div>

        {logrosNuevos.length > 1 && (
          <p className="text-xs text-neutral-400 mb-3">
            {indice + 1} de {logrosNuevos.length} logros
          </p>
        )}

        <button
          onClick={siguiente}
          className="inline-flex w-full items-center justify-center gap-1 rounded-xl bg-violet-600 px-4 py-3.5 text-base font-semibold text-white hover:bg-violet-700 transition-colors"
        >
          {ultimo ? '¡Genial!' : 'Siguiente'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
