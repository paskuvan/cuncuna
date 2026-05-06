'use client';

import { useState } from 'react';
import { X, Star, ChevronRight } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import Quiz from './Quiz';

// ============================================================
// COMPONENTE: VistaLeccion (versión con logros)
// ⚠️ REEMPLAZA el VistaLeccion anterior.
//
// Cambios:
//   - Recibe registrarVideoVisto y registrarQuizAcertado
//   - Llama esos métodos cuando corresponde
//   - onCompletar ahora puede devolver stats para verificar logros
// ============================================================

export default function VistaLeccion({
  leccion,
  nivel,
  onCompletar,
  onVolver,
  registrarVideoVisto,
  registrarQuizAcertado,
}) {
  const [indiceEjercicio, setIndiceEjercicio] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [terminada, setTerminada] = useState(false);

  const ejercicio = leccion.ejercicios[indiceEjercicio];
  const porcentaje = ((indiceEjercicio + 1) / leccion.ejercicios.length) * 100;

  const siguiente = async (acerto = true, esQuiz = false) => {
    // Registrar evento según tipo de ejercicio
    if (esQuiz && acerto) {
      await registrarQuizAcertado?.();
      setAciertos(aciertos + 1);
    }

    if (indiceEjercicio < leccion.ejercicios.length - 1) {
      setIndiceEjercicio(indiceEjercicio + 1);
    } else {
      setTerminada(true);
      await onCompletar(leccion.id, leccion.xp);
    }
  };

  const siguienteVideo = async () => {
    await registrarVideoVisto?.();
    siguiente(true, false);
  };

  const siguienteQuiz = async (acerto) => {
    siguiente(acerto, true);
  };

  // Pantalla de éxito
  if (terminada) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="bg-[#FFD23F] border-[4px] border-black p-8 max-w-md w-full text-center"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <div className="text-7xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-4xl font-black uppercase text-black mb-2">
            ¡Lección completa!
          </h2>
          <p className="text-black font-bold mb-6 text-lg">
            {aciertos} de{' '}
            {leccion.ejercicios.filter((e) => e.tipo.startsWith('quiz')).length}{' '}
            respuestas correctas
          </p>
          <div
            className="bg-black text-[#FFD23F] p-4 border-[3px] border-black mb-6"
            style={{ boxShadow: '6px 6px 0 #FF6B9D' }}
          >
            <div className="flex items-center justify-center gap-2">
              <Star
                className="text-[#FFD23F]"
                size={28}
                strokeWidth={3}
                fill="#FFD23F"
              />
              <span className="text-3xl font-black">+{leccion.xp} XP</span>
            </div>
          </div>
          <button
            onClick={onVolver}
            className="w-full p-4 border-[3px] border-black bg-black text-white font-black uppercase text-lg hover:translate-y-[-2px] active:translate-y-0 transition-transform"
            style={{ boxShadow: '6px 6px 0 #fff' }}
          >
            Volver al mapa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: nivel.color }}>
      {/* Header con progreso */}
      <div className="bg-white border-b-[4px] border-black p-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={onVolver}
            className="bg-white border-[3px] border-black p-2 hover:translate-x-[-2px] transition-transform shrink-0"
            style={{ boxShadow: '4px 4px 0 #000' }}
            aria-label="Volver"
          >
            <X size={24} strokeWidth={4} className="text-black" />
          </button>
          <div className="flex-1">
            <div
              className="h-5 bg-white border-[3px] border-black overflow-hidden"
              style={{ boxShadow: '3px 3px 0 #000' }}
            >
              <div
                className="h-full transition-all duration-300"
                style={{ width: `${porcentaje}%`, backgroundColor: nivel.color }}
              />
            </div>
          </div>
          <span className="font-black text-black text-sm uppercase shrink-0">
            {indiceEjercicio + 1}/{leccion.ejercicios.length}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 md:p-6">
        <div
          className="bg-white border-[4px] border-black p-6 md:p-8"
          style={{ boxShadow: '10px 10px 0 #000' }}
        >
          {ejercicio.tipo === 'video' && (
            <div>
              <div
                className="bg-black text-[#FFD23F] inline-block px-3 py-1 border-[3px] border-black mb-4 font-black uppercase text-sm"
                style={{ boxShadow: '4px 4px 0 #FF6B9D' }}
              >
                Mira y aprende
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase mb-2 leading-tight">
                {ejercicio.titulo}
              </h2>
              <p className="text-black font-bold mb-6">{ejercicio.descripcion}</p>
              <VideoPlayer
                src={ejercicio.videoUrl}
                poster={ejercicio.posterUrl}
                titulo={ejercicio.titulo}
              />
              <button
                onClick={siguienteVideo}
                className="w-full mt-6 p-4 border-[3px] border-black bg-black text-[#FFD23F] font-black uppercase text-xl tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform"
                style={{ boxShadow: '6px 6px 0 #FF6B9D' }}
              >
                Ya lo vi <ChevronRight className="inline ml-1" size={24} strokeWidth={4} />
              </button>
            </div>
          )}

          {(ejercicio.tipo === 'quiz' || ejercicio.tipo === 'quiz-imagen') && (
            <div>
              <div
                className="bg-[#FF6B9D] text-white inline-block px-3 py-1 border-[3px] border-black mb-4 font-black uppercase text-sm"
                style={{ boxShadow: '4px 4px 0 #000' }}
              >
                Pregunta
              </div>
              <Quiz ejercicio={ejercicio} onResponder={siguienteQuiz} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
