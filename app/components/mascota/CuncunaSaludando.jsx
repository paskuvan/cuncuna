// ============================================================
// Cuncuna Saludando - antena hacia arriba + manita levantada
// Animación opcional: la manita se mueve cuando hover/animado
// ============================================================

export default function CuncunaSaludando({ size = 80, className = '', animado = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 110"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Cuncuna saludando"
    >
      <style>
        {`
          ${animado ? `
            .manita-saluda {
              transform-origin: 92px 35px;
              animation: saludar 1.4s ease-in-out infinite;
            }
            @keyframes saludar {
              0%, 100% { transform: rotate(-12deg); }
              50% { transform: rotate(12deg); }
            }
          ` : ''}
        `}
      </style>

      {/* Antena izq normal */}
      <line x1="40" y1="32" x2="32" y2="20" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="20" r="4" fill="#FFD23F" stroke="#000" strokeWidth="2" />

      {/* Antena der estirada hacia arriba (saludando con antena) */}
      <line x1="60" y1="32" x2="72" y2="14" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <circle cx="72" cy="14" r="4" fill="#FFD23F" stroke="#000" strokeWidth="2" />

      {/* Cabeza amarilla (más alegre) */}
      <circle cx="50" cy="60" r="35" fill="#FFD23F" stroke="#000" strokeWidth="4" />

      {/* Ojos felices */}
      <circle cx="38" cy="53" r="8" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
      <circle cx="62" cy="53" r="8" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
      <circle cx="38" cy="53" r="4" fill="#000" />
      <circle cx="62" cy="53" r="4" fill="#000" />
      <circle cx="40" cy="51" r="1.5" fill="#FFFFFF" />
      <circle cx="64" cy="51" r="1.5" fill="#FFFFFF" />

      {/* Sonrisa grande */}
      <path d="M 35 70 Q 50 82 65 70" stroke="#000" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Cachetes */}
      <circle cx="28" cy="68" r="3.5" fill="#FF6B9D" />
      <circle cx="72" cy="68" r="3.5" fill="#FF6B9D" />

      {/* Manita saludando */}
      <g className="manita-saluda">
        <ellipse cx="92" cy="48" rx="10" ry="13" fill="#FFD23F" stroke="#000" strokeWidth="3" />
        {/* Dedos */}
        <line x1="98" y1="32" x2="102" y2="22" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="92" y1="30" x2="94" y2="18" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="86" y1="32" x2="86" y2="22" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
