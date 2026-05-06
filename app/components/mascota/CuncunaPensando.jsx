// ============================================================
// Cuncuna Pensando - mira hacia arriba, burbuja de pensamiento
// con signo de pregunta. Ideal para loading o quiz.
// ============================================================

export default function CuncunaPensando({ size = 80, className = '', animado = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 110"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Cuncuna pensando"
    >
      <style>
        {`
          ${animado ? `
            .burbuja-pensar { animation: flotar 2s ease-in-out infinite; transform-origin: 95px 35px; }
            @keyframes flotar {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-3px) scale(1.05); }
            }
            .pregunta-rota {
              transform-origin: 95px 35px;
              animation: rotar-pregunta 3s ease-in-out infinite;
            }
            @keyframes rotar-pregunta {
              0%, 100% { transform: rotate(-5deg); }
              50% { transform: rotate(5deg); }
            }
          ` : ''}
        `}
      </style>

      {/* Antenas */}
      <line x1="40" y1="32" x2="36" y2="16" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="32" x2="64" y2="16" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="16" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />
      <circle cx="64" cy="16" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />

      {/* Cabeza amarilla (modo curioso) */}
      <circle cx="50" cy="65" r="35" fill="#FFD23F" stroke="#000" strokeWidth="4" />

      {/* Ojos mirando hacia arriba (curiosos) */}
      <circle cx="38" cy="58" r="8" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
      <circle cx="62" cy="58" r="8" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
      <circle cx="38" cy="55" r="4" fill="#000" />
      <circle cx="62" cy="55" r="4" fill="#000" />
      <circle cx="40" cy="53" r="1.5" fill="#FFFFFF" />
      <circle cx="64" cy="53" r="1.5" fill="#FFFFFF" />

      {/* Boca neutra ondulada (pensativa) */}
      <path d="M 40 75 Q 45 71 50 75 Q 55 79 60 75" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Cachetes */}
      <circle cx="28" cy="72" r="3.5" fill="#FF6B9D" />
      <circle cx="72" cy="72" r="3.5" fill="#FF6B9D" />

      {/* Burbujas de pensamiento */}
      <g className="burbuja-pensar">
        <circle cx="80" cy="50" r="3" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
        <circle cx="86" cy="44" r="4" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
        <circle cx="95" cy="35" r="11" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
        <text className="pregunta-rota" x="95" y="40" fontFamily="Archivo Black, sans-serif" fontSize="16" fill="#000" textAnchor="middle" fontWeight="900">?</text>
      </g>
    </svg>
  );
}
