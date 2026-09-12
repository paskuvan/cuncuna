'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, X, ChevronRight } from 'lucide-react';

// ============================================================
// COMPONENTE: Quiz  (estilo suave)
// Soporta: quiz, quiz-imagen, quiz-video, verdadero-falso,
// ordenar, match, completar.
// ============================================================

export default function Quiz({ ejercicio, onResponder }) {
  switch (ejercicio.tipo) {
    case 'verdadero-falso':
      return <QuizVerdaderoFalso ejercicio={ejercicio} onResponder={onResponder} />;
    case 'ordenar':
      return <QuizOrdenar ejercicio={ejercicio} onResponder={onResponder} />;
    case 'match':
      return <QuizMatch ejercicio={ejercicio} onResponder={onResponder} />;
    case 'quiz-video':
      return <QuizVideo ejercicio={ejercicio} onResponder={onResponder} />;
    case 'quiz':
    case 'quiz-imagen':
    case 'completar':
    default:
      return <QuizMultiple ejercicio={ejercicio} onResponder={onResponder} />;
  }
}

// Clases de una opción según su estado
function clasesOpcion({ verificada, esSel, esCorrOp }) {
  if (verificada) {
    if (esCorrOp) return 'border-emerald-300 bg-emerald-50 text-emerald-800';
    if (esSel) return 'border-rose-300 bg-rose-50 text-rose-800';
    return 'border-black/10 bg-neutral-50 text-neutral-400';
  }
  if (esSel) return 'border-violet-300 bg-violet-50 text-violet-800';
  return 'border-black/10 bg-white text-neutral-800 hover:bg-neutral-50';
}

// ─────────────────────────────────────────────
// SUB: Opción múltiple (con imagen opcional)
// ─────────────────────────────────────────────
function QuizMultiple({ ejercicio, onResponder }) {
  const [seleccionada, setSeleccionada] = useState(null);
  const [verificada, setVerificada] = useState(false);
  const [imgError, setImgError] = useState(false);

  const verificar = () => seleccionada !== null && setVerificada(true);
  const continuar = () => onResponder(seleccionada === ejercicio.correcta);
  const esCorrecta = seleccionada === ejercicio.correcta;

  return (
    <div className="w-full">
      {ejercicio.imagenUrl && !imgError && (
        <div className="mb-6 rounded-xl border border-black/5 overflow-hidden aspect-video relative">
          <Image src={ejercicio.imagenUrl} alt="" fill className="object-cover" unoptimized onError={() => setImgError(true)} />
        </div>
      )}

      <h3 className="text-xl font-bold tracking-tight mb-5">{ejercicio.pregunta}</h3>

      <div className="flex flex-col gap-3 mb-5">
        {ejercicio.opciones.map((opcion, idx) => {
          const esSel = seleccionada === idx;
          const esCorrOp = idx === ejercicio.correcta;
          return (
            <button
              key={idx}
              onClick={() => !verificada && setSeleccionada(idx)}
              disabled={verificada}
              className={`w-full text-left rounded-xl border px-4 py-3 font-semibold transition-colors flex items-center justify-between gap-3 ${clasesOpcion({ verificada, esSel, esCorrOp })}`}
            >
              <span className="flex-1">{opcion}</span>
              {verificada && esCorrOp && <Check size={18} />}
              {verificada && esSel && !esCorrOp && <X size={18} />}
            </button>
          );
        })}
      </div>

      <Feedback verificada={verificada} esCorrecta={esCorrecta} explicacion={ejercicio.explicacion} />
      <BotonAccion verificada={verificada} habilitado={seleccionada !== null} onVerificar={verificar} onContinuar={continuar} />
    </div>
  );
}

// ─────────────────────────────────────────────
// SUB: Verdadero / Falso
// ─────────────────────────────────────────────
function QuizVerdaderoFalso({ ejercicio, onResponder }) {
  const [respuesta, setRespuesta] = useState(null);
  const [verificada, setVerificada] = useState(false);

  const verificar = () => respuesta !== null && setVerificada(true);
  const continuar = () => onResponder(respuesta === ejercicio.correcta);
  const esCorrecta = respuesta === ejercicio.correcta;

  return (
    <div className="w-full">
      <div className="rounded-xl bg-neutral-50 border border-black/5 p-4 mb-5">
        <p className="text-xs font-medium text-neutral-500 mb-1">Afirmación</p>
        <p className="text-lg font-semibold leading-snug">{ejercicio.pregunta}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {[true, false].map((valor) => {
          const esSel = respuesta === valor;
          const esCorrOp = valor === ejercicio.correcta;
          return (
            <button
              key={valor.toString()}
              onClick={() => !verificada && setRespuesta(valor)}
              disabled={verificada}
              className={`rounded-xl border px-4 py-5 text-lg font-bold transition-colors ${clasesOpcion({ verificada, esSel, esCorrOp })}`}
            >
              {valor ? '✓ Verdadero' : '✗ Falso'}
            </button>
          );
        })}
      </div>

      <Feedback verificada={verificada} esCorrecta={esCorrecta} explicacion={ejercicio.explicacion} />
      <BotonAccion verificada={verificada} habilitado={respuesta !== null} onVerificar={verificar} onContinuar={continuar} />
    </div>
  );
}

// ─────────────────────────────────────────────
// SUB: Ordenar palabras
// ─────────────────────────────────────────────
function QuizOrdenar({ ejercicio, onResponder }) {
  const [orden, setOrden] = useState([]);
  const [verificada, setVerificada] = useState(false);

  const agregar = (idx) => { if (!verificada) setOrden([...orden, idx]); };
  const quitar = (idx) => { if (!verificada) setOrden(orden.filter((_, i) => i !== idx)); };

  const verificar = () => orden.length === ejercicio.palabras.length && setVerificada(true);
  const continuar = () => onResponder(JSON.stringify(orden) === JSON.stringify(ejercicio.ordenCorrecto));
  const esCorrecta = JSON.stringify(orden) === JSON.stringify(ejercicio.ordenCorrecto);

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold tracking-tight mb-5">{ejercicio.pregunta}</h3>

      <div className="rounded-xl bg-violet-50 border border-violet-100 p-4 mb-4 min-h-20 flex flex-wrap gap-2">
        {orden.length === 0 && (
          <p className="text-sm text-neutral-400 italic">Toca las palabras abajo para ordenarlas aquí</p>
        )}
        {orden.map((palabraIdx, posicion) => (
          <button
            key={posicion}
            onClick={() => quitar(posicion)}
            disabled={verificada}
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-neutral-50 transition-colors"
          >
            {ejercicio.palabras[palabraIdx]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {ejercicio.palabras.map((palabra, idx) => {
          if (orden.includes(idx)) return null;
          return (
            <button
              key={idx}
              onClick={() => agregar(idx)}
              disabled={verificada}
              className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
            >
              {palabra}
            </button>
          );
        })}
      </div>

      <Feedback verificada={verificada} esCorrecta={esCorrecta} explicacion={ejercicio.explicacion} />
      <BotonAccion verificada={verificada} habilitado={orden.length === ejercicio.palabras.length} onVerificar={verificar} onContinuar={continuar} />
    </div>
  );
}

function MatchImagen({ src }) {
  const [error, setError] = useState(false);
  if (error) return <span className="text-2xl">🖼️</span>;
  return (
    <div className="w-full h-16 relative">
      <Image src={src} alt="" fill className="object-cover" unoptimized onError={() => setError(true)} />
    </div>
  );
}

// ─────────────────────────────────────────────
// SUB: Match (relacionar parejas)
// ─────────────────────────────────────────────
function QuizMatch({ ejercicio, onResponder }) {
  const [seleccionIzq, setSeleccionIzq] = useState(null);
  const [emparejados, setEmparejados] = useState({});
  const [verificada, setVerificada] = useState(false);
  const [derechaMezclada] = useState(() => [...ejercicio.parejas].sort(() => Math.random() - 0.5));

  const seleccionarIzq = (idx) => {
    if (verificada || emparejados[idx]) return;
    setSeleccionIzq(idx);
  };
  const seleccionarDer = (derItem) => {
    if (verificada || seleccionIzq === null) return;
    if (Object.values(emparejados).includes(derItem.derecha)) return;
    setEmparejados({ ...emparejados, [seleccionIzq]: derItem.derecha });
    setSeleccionIzq(null);
  };

  const todoEmparejado = Object.keys(emparejados).length === ejercicio.parejas.length;
  const verificar = () => todoEmparejado && setVerificada(true);
  const continuar = () => onResponder(ejercicio.parejas.every((p, i) => emparejados[i] === p.derecha));
  const esCorrecta = ejercicio.parejas.every((p, i) => emparejados[i] === p.derecha);

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold tracking-tight mb-5">{ejercicio.pregunta}</h3>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex flex-col gap-2">
          {ejercicio.parejas.map((p, idx) => {
            const emparejado = !!emparejados[idx];
            const seleccionado = seleccionIzq === idx;
            const clase = emparejado
              ? 'border-emerald-300 bg-emerald-50'
              : seleccionado
                ? 'border-violet-300 bg-violet-50'
                : 'border-black/10 bg-white hover:bg-neutral-50';
            return (
              <button
                key={idx}
                onClick={() => seleccionarIzq(idx)}
                disabled={verificada || emparejado}
                className={`w-full rounded-xl border p-3 text-center font-semibold transition-colors ${clase}`}
              >
                {p.tipo_izquierda === 'imagen' ? <MatchImagen src={p.izquierda} /> : <span className="text-2xl">{p.izquierda}</span>}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {derechaMezclada.map((p, idx) => {
            const yaUsado = Object.values(emparejados).includes(p.derecha);
            const clase = yaUsado ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-black/10 bg-white text-neutral-800 hover:bg-neutral-50';
            return (
              <button
                key={idx}
                onClick={() => seleccionarDer(p)}
                disabled={verificada || yaUsado || seleccionIzq === null}
                className={`w-full rounded-xl border p-3 text-sm font-semibold transition-colors ${clase} ${seleccionIzq === null ? 'opacity-50' : ''}`}
              >
                {p.derecha}
              </button>
            );
          })}
        </div>
      </div>

      <Feedback verificada={verificada} esCorrecta={esCorrecta} explicacion={ejercicio.explicacion} />
      <BotonAccion verificada={verificada} habilitado={todoEmparejado} onVerificar={verificar} onContinuar={continuar} />
    </div>
  );
}

// ─────────────────────────────────────────────
// SUB: Quiz con video
// ─────────────────────────────────────────────
function QuizVideo({ ejercicio, onResponder }) {
  return (
    <div className="w-full">
      <div className="mb-6 rounded-xl overflow-hidden border border-black/5 bg-neutral-900">
        <video src={ejercicio.videoUrl} controls className="w-full aspect-video" />
      </div>
      <QuizMultiple ejercicio={ejercicio} onResponder={onResponder} />
    </div>
  );
}

// ─────────────────────────────────────────────
// HELPERS COMPARTIDOS
// ─────────────────────────────────────────────
function Feedback({ verificada, esCorrecta, explicacion }) {
  if (!verificada) return null;
  return (
    <div className={`rounded-xl border p-4 mb-5 ${esCorrecta ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
      <p className="font-semibold mb-1">{esCorrecta ? '¡Excelente!' : 'Casi…'}</p>
      <p className="text-sm text-neutral-600">{explicacion}</p>
    </div>
  );
}

function BotonAccion({ verificada, habilitado, onVerificar, onContinuar }) {
  if (verificada) {
    return (
      <button
        onClick={onContinuar}
        className="inline-flex w-full items-center justify-center gap-1 rounded-xl bg-violet-600 px-4 py-3.5 text-base font-semibold text-white hover:bg-violet-700 transition-colors"
      >
        Continuar
        <ChevronRight size={20} />
      </button>
    );
  }
  return (
    <button
      onClick={onVerificar}
      disabled={!habilitado}
      className="inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-3.5 text-base font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      Verificar
    </button>
  );
}
