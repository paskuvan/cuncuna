// ============================================================
// Cuncuna Mariposa - transformación final del curso
// Alas grandes en colores de la paleta neobrutalista
// Para celebrar completar TODO el contenido (logro Mariposa)
// ============================================================

export default function CuncunaMariposa({ size = 100, className = '', animado = true }) {
  return (
    <svg
      width={size * 1.4}
      height={size}
      viewBox="0 0 140 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Cuncuna transformada en mariposa"
    >
      <style>
        {`
          ${animado ? `
            .ala-izq { transform-origin: 70px 50px; animation: aletear-izq 1.2s ease-in-out infinite; }
            .ala-der { transform-origin: 70px 50px; animation: aletear-der 1.2s ease-in-out infinite; }
            @keyframes aletear-izq {
              0%, 100% { transform: scaleX(1); }
              50% { transform: scaleX(0.85); }
            }
            @keyframes aletear-der {
              0%, 100% { transform: scaleX(1); }
              50% { transform: scaleX(0.85); }
            }
          ` : ''}
        `}
      </style>

      {/* Ala izquierda */}
      <g className="ala-izq">
        {/* Ala superior izquierda (grande) */}
        <path
          d="M 60 32 Q 30 22 18 38 Q 16 52 32 58 Q 50 60 60 50 Z"
          fill="#FF6B9D"
          stroke="#000"
          strokeWidth="3.5"
        />
        <circle cx="32" cy="42" r="4" fill="#FFD23F" stroke="#000" strokeWidth="2" />
        <circle cx="42" cy="50" r="2.5" fill="#FFD23F" stroke="#000" strokeWidth="1.5" />

        {/* Ala inferior izquierda (más pequeña) */}
        <path
          d="M 58 56 Q 38 64 36 78 Q 42 86 56 82 Q 62 74 62 62 Z"
          fill="#4ECDC4"
          stroke="#000"
          strokeWidth="3.5"
        />
        <circle cx="48" cy="74" r="3" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
      </g>

      {/* Ala derecha */}
      <g className="ala-der">
        {/* Ala superior derecha (grande) */}
        <path
          d="M 80 32 Q 110 22 122 38 Q 124 52 108 58 Q 90 60 80 50 Z"
          fill="#FF6B9D"
          stroke="#000"
          strokeWidth="3.5"
        />
        <circle cx="108" cy="42" r="4" fill="#FFD23F" stroke="#000" strokeWidth="2" />
        <circle cx="98" cy="50" r="2.5" fill="#FFD23F" stroke="#000" strokeWidth="1.5" />

        {/* Ala inferior derecha (más pequeña) */}
        <path
          d="M 82 56 Q 102 64 104 78 Q 98 86 84 82 Q 78 74 78 62 Z"
          fill="#4ECDC4"
          stroke="#000"
          strokeWidth="3.5"
        />
        <circle cx="92" cy="74" r="3" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
      </g>

      {/* Antenas rizadas (más sofisticadas que cuncuna) */}
      <path d="M 64 28 Q 60 18 54 16" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 76 28 Q 80 18 86 16" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="54" cy="16" r="3.5" fill="#FFD23F" stroke="#000" strokeWidth="2" />
      <circle cx="86" cy="16" r="3.5" fill="#FFD23F" stroke="#000" strokeWidth="2" />

      {/* Cabeza/cuerpo */}
      <ellipse cx="70" cy="50" rx="11" ry="22" fill="#FFFFFF" stroke="#000" strokeWidth="4" />

      {/* Ojos cerrados de felicidad ^_^ */}
      <path d="M 62 44 Q 65 40 68 44" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 72 44 Q 75 40 78 44" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Sonrisa grande */}
      <ellipse cx="70" cy="55" rx="6" ry="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />

      {/* Cachetes */}
      <circle cx="63" cy="52" r="2" fill="#FF6B9D" />
      <circle cx="77" cy="52" r="2" fill="#FF6B9D" />
    </svg>
  );
}
