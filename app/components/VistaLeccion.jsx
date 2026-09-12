'use client';

import { useState } from 'react';
import { X, Star, ChevronRight, BookOpen, Play } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import Quiz from './Quiz';

// ============================================================
// COMPONENTE: VistaLeccion  (estilo suave)
// Modo enfoque para tomar una lección. Tipos: video, texto y quizzes.
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

  const siguienteTexto = () => siguiente(true, false);
  const siguienteQuiz = (acerto) => siguiente(acerto, true);

  const tiposQuiz = ['quiz', 'quiz-imagen', 'quiz-video', 'verdadero-falso', 'ordenar', 'match', 'completar'];
  const totalQuizzes = leccion.ejercicios.filter((e) => tiposQuiz.includes(e.tipo)).length;

  // ─── Lección completa ───
  if (terminada) {
    return (
      <div className="min-h-screen bg-[#F6F1EC] text-neutral-900 flex items-center justify-center p-4">
        <div className="rounded-3xl border border-black/5 bg-white p-8 max-w-md w-full text-center shadow-sm">
          <div className="text-6xl mb-3 animate-bounce">🎉</div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">¡Lección completa!</h2>
          {totalQuizzes > 0 && (
            <p className="text-neutral-500 mb-6">
              {aciertos} de {totalQuizzes} respuestas correctas
            </p>
          )}
          <div className="rounded-2xl bg-violet-600 text-white p-4 mb-6">
            <div className="flex items-center justify-center gap-2">
              <Star size={24} fill="currentColor" />
              <span className="text-2xl font-bold">+{leccion.xp} XP</span>
            </div>
          </div>
          <button
            onClick={onVolver}
            className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Volver al dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F1EC] text-neutral-900">
      {/* Barra superior */}
      <div className="sticky top-0 z-10 border-b border-black/5 bg-[#F6F1EC]/80 backdrop-blur p-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={onVolver}
            className="grid place-items-center w-10 h-10 rounded-xl border border-black/10 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors shrink-0"
            aria-label="Salir de la lección"
          >
            <X size={20} />
          </button>
          <div className="flex-1 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-violet-600 transition-all"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-neutral-500 shrink-0">
            {indiceEjercicio + 1}/{leccion.ejercicios.length}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 md:p-6">
        <div className="rounded-2xl border border-black/5 bg-white p-6 md:p-8 shadow-sm">
          {/* VIDEO */}
          {ejercicio.tipo === 'video' && (
            <div>
              <Tag tono="bg-violet-100 text-violet-700" icono={<Play size={13} />} texto="Mira y aprende" />
              <h2 className="text-2xl font-bold tracking-tight mb-1">{ejercicio.titulo}</h2>
              <p className="text-neutral-500 mb-6">{ejercicio.descripcion}</p>
              <div className="overflow-hidden rounded-xl">
                <VideoPlayer src={ejercicio.videoUrl} poster={ejercicio.posterUrl} titulo={ejercicio.titulo} />
              </div>
              <button
                onClick={siguienteVideo}
                className="mt-6 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-violet-600 px-4 py-3.5 text-base font-semibold text-white hover:bg-violet-700 transition-colors"
              >
                Ya lo vi
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* TEXTO */}
          {ejercicio.tipo === 'texto' && (
            <div>
              <Tag tono="bg-violet-100 text-violet-700" icono={<BookOpen size={13} />} texto="Aprende" />
              <h2 className="text-2xl font-bold tracking-tight mb-4">{ejercicio.titulo}</h2>
              <div className="rounded-xl bg-neutral-50 border border-black/5 p-5 mb-6">
                <p className="text-neutral-700 leading-relaxed">{ejercicio.descripcion}</p>
              </div>
              <button
                onClick={siguienteTexto}
                className="inline-flex w-full items-center justify-center gap-1 rounded-xl bg-violet-600 px-4 py-3.5 text-base font-semibold text-white hover:bg-violet-700 transition-colors"
              >
                Entendido
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* QUIZZES */}
          {tiposQuiz.includes(ejercicio.tipo) && (
            <div>
              <Tag
                tono="bg-emerald-100 text-emerald-600"
                texto={
                  ejercicio.tipo === 'verdadero-falso' ? '¿Verdadero o falso?' :
                  ejercicio.tipo === 'ordenar' ? 'Ordena las palabras' :
                  ejercicio.tipo === 'match' ? 'Relaciona' :
                  'Pregunta'
                }
              />
              <Quiz ejercicio={ejercicio} onResponder={siguienteQuiz} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Tag({ tono, texto, icono }) {
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4 text-xs font-semibold ${tono}`}>
      {icono}
      {texto}
    </div>
  );
}
