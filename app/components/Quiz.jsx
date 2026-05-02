'use client';

import { useState } from 'react';
import { Check, X, ChevronRight } from 'lucide-react';

// ============================================================
// COMPONENTE: Quiz
// Cuestionario de opción múltiple con feedback visual:
//   - Verde si acierta
//   - Rojo si falla
//   - Explicación al verificar
//   - Soporta imagen opcional (quiz-imagen)
//
// Props:
//   - ejercicio: objeto con pregunta, opciones, correcta, explicación
//   - onResponder: callback (acierto: boolean) => void
// ============================================================

export default function Quiz({ ejercicio, onResponder }) {
  const [seleccionada, setSeleccionada] = useState(null);
  const [verificada, setVerificada] = useState(false);

  const verificar = () => {
    if (seleccionada === null) return;
    setVerificada(true);
  };

  const continuar = () => {
    onResponder(seleccionada === ejercicio.correcta);
  };

  const esCorrecta = seleccionada === ejercicio.correcta;

  return (
    <div className="w-full">
      {ejercicio.imagenUrl && (
        <div
          className="mb-6 bg-white border-[3px] border-black overflow-hidden"
          style={{ boxShadow: '8px 8px 0 #000' }}
        >
          <img
            src={ejercicio.imagenUrl}
            alt="Imagen del ejercicio"
            className="w-full aspect-video object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML =
                '<div class="aspect-video bg-pink-200 flex flex-col items-center justify-center p-6"><div class="text-6xl mb-2">🖼️</div><p class="font-black uppercase">Imagen no disponible</p></div>';
            }}
          />
        </div>
      )}

      <h3 className="text-2xl md:text-3xl font-black text-black uppercase mb-6 leading-tight">
        {ejercicio.pregunta}
      </h3>

      <div className="space-y-3 mb-6">
        {ejercicio.opciones.map((opcion, idx) => {
          const esSeleccionada = seleccionada === idx;
          const esCorrectaOpcion = idx === ejercicio.correcta;
          let bgColor = 'bg-white';
          let textColor = 'text-black';

          if (verificada) {
            if (esCorrectaOpcion) {
              bgColor = 'bg-[#7FFF6B]';
            } else if (esSeleccionada && !esCorrectaOpcion) {
              bgColor = 'bg-[#FF6B6B]';
              textColor = 'text-white';
            } else {
              bgColor = 'bg-gray-100';
            }
          } else if (esSeleccionada) {
            bgColor = 'bg-[#FFD23F]';
          }

          return (
            <button
              key={idx}
              onClick={() => !verificada && setSeleccionada(idx)}
              disabled={verificada}
              className={`w-full text-left p-4 border-[3px] border-black ${bgColor} ${textColor} font-black text-lg uppercase transition-all ${
                !verificada
                  ? 'hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0'
                  : ''
              } flex items-center justify-between gap-3`}
              style={{
                boxShadow:
                  esSeleccionada || (verificada && esCorrectaOpcion)
                    ? '6px 6px 0 #000'
                    : '4px 4px 0 #000',
              }}
            >
              <span className="flex-1">{opcion}</span>
              {verificada && esCorrectaOpcion && <Check size={24} strokeWidth={4} />}
              {verificada && esSeleccionada && !esCorrectaOpcion && <X size={24} strokeWidth={4} />}
            </button>
          );
        })}
      </div>

      {verificada && (
        <div
          className={`p-4 border-[3px] border-black mb-6 ${
            esCorrecta ? 'bg-[#7FFF6B]' : 'bg-[#FFD23F]'
          }`}
          style={{ boxShadow: '6px 6px 0 #000' }}
        >
          <p className="font-black uppercase text-sm mb-1">
            {esCorrecta ? '¡Excelente!' : 'Casi...'}
          </p>
          <p className="font-bold text-black">{ejercicio.explicacion}</p>
        </div>
      )}

      {!verificada ? (
        <button
          onClick={verificar}
          disabled={seleccionada === null}
          className={`w-full p-4 border-[3px] border-black font-black uppercase text-xl tracking-wider transition-all ${
            seleccionada !== null
              ? 'bg-black text-[#FFD23F] hover:translate-y-[-2px] active:translate-y-0'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={{ boxShadow: seleccionada !== null ? '6px 6px 0 #FFD23F' : 'none' }}
        >
          Verificar
        </button>
      ) : (
        <button
          onClick={continuar}
          className="w-full p-4 border-[3px] border-black bg-[#7FFF6B] text-black font-black uppercase text-xl tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform"
          style={{ boxShadow: '6px 6px 0 #000' }}
        >
          Continuar <ChevronRight className="inline ml-1" size={24} strokeWidth={4} />
        </button>
      )}
    </div>
  );
}
