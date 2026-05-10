'use client';

import { useState } from 'react';
import { Check, X, ChevronRight } from 'lucide-react';

// ============================================================
// COMPONENTE: Quiz (versión expandida)
// ⚠️ REEMPLAZA el Quiz.jsx anterior.
//
// AHORA SOPORTA 6 TIPOS DE EJERCICIOS:
//   - quiz             → opción múltiple (texto)
//   - quiz-imagen      → opción múltiple con imagen
//   - quiz-video       → opción múltiple con video
//   - verdadero-falso  → afirmación V/F
//   - ordenar          → ordenar palabras para formar frase
//   - match            → relacionar parejas
//   - completar        → igual que quiz pero con framing distinto
//
// Cada tipo se renderiza por su sub-componente.
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

// ─────────────────────────────────────────────
// SUB: Opción múltiple clásica (con imagen opcional)
// ─────────────────────────────────────────────
function QuizMultiple({ ejercicio, onResponder }) {
  const [seleccionada, setSeleccionada] = useState(null);
  const [verificada, setVerificada] = useState(false);

  const verificar = () => seleccionada !== null && setVerificada(true);
  const continuar = () => onResponder(seleccionada === ejercicio.correcta);
  const esCorrecta = seleccionada === ejercicio.correcta;

  return (
    <div className="w-full">
      {ejercicio.imagenUrl && (
        <div className="mb-6 bg-white border-[3px] border-black overflow-hidden" style={{ boxShadow: '8px 8px 0 #000' }}>
          <img src={ejercicio.imagenUrl} alt="" className="w-full aspect-video object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
      )}

      <h3 className="text-2xl md:text-3xl font-black text-black uppercase mb-6 leading-tight">{ejercicio.pregunta}</h3>

      <div className="space-y-3 mb-6">
        {ejercicio.opciones.map((opcion, idx) => {
          const esSel = seleccionada === idx;
          const esCorrOp = idx === ejercicio.correcta;
          let bg = 'bg-white', text = 'text-black';
          if (verificada) {
            if (esCorrOp) bg = 'bg-[#7FFF6B]';
            else if (esSel) { bg = 'bg-[#FF6B6B]'; text = 'text-white'; }
            else bg = 'bg-gray-100';
          } else if (esSel) bg = 'bg-[#FFD23F]';

          return (
            <button
              key={idx}
              onClick={() => !verificada && setSeleccionada(idx)}
              disabled={verificada}
              className={`w-full text-left p-4 border-[3px] border-black ${bg} ${text} font-black text-lg uppercase transition-all ${!verificada ? 'hover:translate-x-[-2px] hover:translate-y-[-2px]' : ''} flex items-center justify-between gap-3`}
              style={{ boxShadow: esSel || (verificada && esCorrOp) ? '6px 6px 0 #000' : '4px 4px 0 #000' }}
            >
              <span className="flex-1">{opcion}</span>
              {verificada && esCorrOp && <Check size={24} strokeWidth={4} />}
              {verificada && esSel && !esCorrOp && <X size={24} strokeWidth={4} />}
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
      <div className="bg-[#FFD23F] border-[3px] border-black p-4 mb-6" style={{ boxShadow: '6px 6px 0 #000' }}>
        <p className="font-black uppercase text-xs tracking-[0.2em] text-black mb-2">Afirmación:</p>
        <p className="text-xl md:text-2xl font-black text-black leading-tight">{ejercicio.pregunta}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[true, false].map((valor) => {
          const esSel = respuesta === valor;
          const esCorrOp = valor === ejercicio.correcta;
          let bg = 'bg-white';
          if (verificada) {
            if (esCorrOp) bg = 'bg-[#7FFF6B]';
            else if (esSel) bg = 'bg-[#FF6B6B]';
            else bg = 'bg-gray-100';
          } else if (esSel) bg = 'bg-[#FFD23F]';

          return (
            <button
              key={valor.toString()}
              onClick={() => !verificada && setRespuesta(valor)}
              disabled={verificada}
              className={`p-6 border-[3px] border-black ${bg} font-black uppercase text-2xl tracking-wider transition-all ${!verificada ? 'hover:translate-y-[-2px]' : ''}`}
              style={{ boxShadow: esSel || (verificada && esCorrOp) ? '6px 6px 0 #000' : '4px 4px 0 #000' }}
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

  const palabrasDisponibles = ejercicio.palabras.filter((_, idx) => !orden.includes(idx));

  const agregar = (idx) => {
    if (verificada) return;
    setOrden([...orden, idx]);
  };

  const quitar = (idx) => {
    if (verificada) return;
    setOrden(orden.filter((_, i) => i !== idx));
  };

  const verificar = () => orden.length === ejercicio.palabras.length && setVerificada(true);
  const continuar = () => {
    const correcto = JSON.stringify(orden) === JSON.stringify(ejercicio.ordenCorrecto);
    onResponder(correcto);
  };

  const esCorrecta = JSON.stringify(orden) === JSON.stringify(ejercicio.ordenCorrecto);

  return (
    <div className="w-full">
      <h3 className="text-2xl md:text-3xl font-black text-black uppercase mb-6 leading-tight">{ejercicio.pregunta}</h3>

      {/* Zona de orden */}
      <div className="bg-[#FFD23F] border-[3px] border-black p-4 mb-4 min-h-[80px] flex flex-wrap gap-2" style={{ boxShadow: '6px 6px 0 #000' }}>
        {orden.length === 0 && <p className="font-bold text-black/50 italic">Toca las palabras abajo para ordenarlas aquí</p>}
        {orden.map((palabraIdx, posicion) => (
          <button
            key={posicion}
            onClick={() => quitar(posicion)}
            disabled={verificada}
            className="bg-white border-[3px] border-black px-3 py-2 font-black uppercase text-sm hover:bg-[#FF6B9D] hover:text-white transition-colors"
            style={{ boxShadow: '3px 3px 0 #000' }}
          >
            {ejercicio.palabras[palabraIdx]}
          </button>
        ))}
      </div>

      {/* Palabras disponibles */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ejercicio.palabras.map((palabra, idx) => {
          if (orden.includes(idx)) return null;
          return (
            <button
              key={idx}
              onClick={() => agregar(idx)}
              disabled={verificada}
              className="bg-black text-[#FFD23F] border-[3px] border-black px-3 py-2 font-black uppercase text-sm hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
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

// ─────────────────────────────────────────────
// SUB: Match (relacionar parejas)
// ─────────────────────────────────────────────
function QuizMatch({ ejercicio, onResponder }) {
  const [seleccionIzq, setSeleccionIzq] = useState(null);
  const [emparejados, setEmparejados] = useState({});
  const [verificada, setVerificada] = useState(false);

  // Mezclar la columna derecha aleatoriamente (una sola vez)
  const [derechaMezclada] = useState(() =>
    [...ejercicio.parejas].sort(() => Math.random() - 0.5)
  );

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
  const continuar = () => {
    const todoCorrect = ejercicio.parejas.every((p, i) => emparejados[i] === p.derecha);
    onResponder(todoCorrect);
  };
  const esCorrecta = ejercicio.parejas.every((p, i) => emparejados[i] === p.derecha);

  return (
    <div className="w-full">
      <h3 className="text-2xl md:text-3xl font-black text-black uppercase mb-6 leading-tight">{ejercicio.pregunta}</h3>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Columna izquierda */}
        <div className="space-y-2">
          {ejercicio.parejas.map((p, idx) => {
            const emparejado = !!emparejados[idx];
            const seleccionado = seleccionIzq === idx;
            return (
              <button
                key={idx}
                onClick={() => seleccionarIzq(idx)}
                disabled={verificada || emparejado}
                className={`w-full p-3 border-[3px] border-black font-black text-center transition-all ${
                  emparejado ? 'bg-[#7FFF6B]' : seleccionado ? 'bg-[#FFD23F]' : 'bg-white hover:translate-y-[-2px]'
                }`}
                style={{ boxShadow: '4px 4px 0 #000' }}
              >
                {p.tipo_izquierda === 'imagen' ? (
                  <img src={p.izquierda} alt="" className="w-full h-16 object-cover" onError={(e) => { e.target.replaceWith(document.createTextNode('🖼️')); }} />
                ) : (
                  <span className="text-2xl">{p.izquierda}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Columna derecha */}
        <div className="space-y-2">
          {derechaMezclada.map((p, idx) => {
            const yaUsado = Object.values(emparejados).includes(p.derecha);
            return (
              <button
                key={idx}
                onClick={() => seleccionarDer(p)}
                disabled={verificada || yaUsado || seleccionIzq === null}
                className={`w-full p-3 border-[3px] border-black font-black text-sm uppercase transition-all ${
                  yaUsado ? 'bg-[#7FFF6B]' : 'bg-white hover:translate-y-[-2px]'
                } ${seleccionIzq === null ? 'opacity-50' : ''}`}
                style={{ boxShadow: '4px 4px 0 #000' }}
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
      <div className="mb-6 bg-black border-[3px] border-black overflow-hidden" style={{ boxShadow: '8px 8px 0 #000' }}>
        <video
          src={ejercicio.videoUrl}
          controls
          className="w-full aspect-video"
          onError={(e) => { e.target.parentElement.innerHTML = '<div class="aspect-video bg-yellow-300 flex items-center justify-center font-black uppercase">Video no disponible</div>'; }}
        />
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
    <div className={`p-4 border-[3px] border-black mb-6 ${esCorrecta ? 'bg-[#7FFF6B]' : 'bg-[#FFD23F]'}`} style={{ boxShadow: '6px 6px 0 #000' }}>
      <p className="font-black uppercase text-sm mb-1">{esCorrecta ? '¡Excelente!' : 'Casi...'}</p>
      <p className="font-bold text-black">{explicacion}</p>
    </div>
  );
}

function BotonAccion({ verificada, habilitado, onVerificar, onContinuar }) {
  if (verificada) {
    return (
      <button
        onClick={onContinuar}
        className="w-full p-4 border-[3px] border-black bg-[#7FFF6B] text-black font-black uppercase text-xl tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform"
        style={{ boxShadow: '6px 6px 0 #000' }}
      >
        Continuar <ChevronRight className="inline ml-1" size={24} strokeWidth={4} />
      </button>
    );
  }

  return (
    <button
      onClick={onVerificar}
      disabled={!habilitado}
      className={`w-full p-4 border-[3px] border-black font-black uppercase text-xl tracking-wider transition-all ${
        habilitado ? 'bg-black text-[#FFD23F] hover:translate-y-[-2px]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
      style={{ boxShadow: habilitado ? '6px 6px 0 #FFD23F' : 'none' }}
    >
      Verificar
    </button>
  );
}
