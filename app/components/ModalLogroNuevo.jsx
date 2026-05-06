'use client';

import { useState, useEffect } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

// ============================================================
// COMPONENTE: ModalLogroNuevo
// Se muestra cuando el usuario desbloquea uno o más logros.
// Si hay varios, los muestra de a uno con botón "Siguiente".
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
      setIndice(0); // Reset para próxima vez
    } else {
      setIndice(indice + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
      <div
        className={`bg-white border-[4px] border-black p-6 md:p-8 max-w-md w-full text-center transition-transform ${
          animar ? 'scale-110' : 'scale-100'
        }`}
        style={{ boxShadow: '12px 12px 0 #000' }}
      >
        {/* Tag superior */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles size={20} strokeWidth={3} className="text-[#FFD23F]" />
          <span className="font-black uppercase text-xs tracking-[0.2em] text-black">
            ¡Logro desbloqueado!
          </span>
          <Sparkles size={20} strokeWidth={3} className="text-[#FFD23F]" />
        </div>

        {/* Badge gigante */}
        <div className="flex justify-center mb-6">
          <div
            className="border-[4px] border-black w-32 h-32 flex items-center justify-center text-7xl"
            style={{
              backgroundColor: logro.color,
              boxShadow: '8px 8px 0 #000',
            }}
          >
            {logro.emoji}
          </div>
        </div>

        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-black uppercase text-black leading-none mb-3 tracking-tight">
          {logro.titulo}
        </h2>

        {/* Descripción */}
        <div
          className="bg-[#FFD23F] border-[3px] border-black p-3 mb-6"
          style={{ boxShadow: '4px 4px 0 #000' }}
        >
          <p className="font-bold text-black">{logro.descripcion}</p>
        </div>

        {/* Indicador si hay más */}
        {logrosNuevos.length > 1 && (
          <p className="font-black uppercase text-xs text-black/60 mb-3 tracking-wider">
            {indice + 1} de {logrosNuevos.length} logros
          </p>
        )}

        {/* Botón continuar */}
        <button
          onClick={siguiente}
          className="w-full p-4 border-[3px] border-black bg-black text-[#FFD23F] font-black uppercase text-lg tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform"
          style={{ boxShadow: '6px 6px 0 #FF6B9D' }}
        >
          {ultimo ? '¡Genial!' : 'Siguiente'}
          <ChevronRight className="inline ml-1" size={22} strokeWidth={4} />
        </button>
      </div>
    </div>
  );
}
