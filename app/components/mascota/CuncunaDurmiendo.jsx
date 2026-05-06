// ============================================================
// Cuncuna Durmiendo - ojos cerrados, antenas caídas, Z's flotando
// Para empty states (sin progreso, sin lecciones nuevas)
// ============================================================

export default function CuncunaDurmiendo({ size = 80, className = '', animado = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 110 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Cuncuna durmiendo"
    >
      <style>
        {`
          ${animado ? `
            .z-1 { animation: subir-z 2.4s ease-in-out infinite; }
            .z-2 { animation: subir-z 2.4s ease-in-out infinite 0.8s; }
            .z-3 { animation: subir-z 2.4s ease-in-out infinite 1.6s; }
            @keyframes subir-z {
              0% { transform: translate(0, 0); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: translate(8px, -18px); opacity: 0; }
            }
          ` : ''}
        `}
      </style>

      {/* Antenas caídas hacia los lados */}
      <line x1="40" y1="32" x2="28" y2="38" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="32" x2="72" y2="38" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <circle cx="28" cy="38" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />
      <circle cx="72" cy="38" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />

      {/* Cabeza */}
      <circle cx="50" cy="60" r="35" fill="#FFFFFF" stroke="#000" strokeWidth="4" />

      {/* Ojos cerrados (curva hacia abajo) */}
      <path d="M 30 54 Q 38 60 46 54" stroke="#000" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 54 54 Q 62 60 70 54" stroke="#000" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Boquita relajada */}
      <ellipse cx="50" cy="74" rx="5" ry="3.5" fill="#000" />

      {/* Cachetes */}
      <circle cx="28" cy="70" r="3.5" fill="#FF6B9D" />
      <circle cx="72" cy="70" r="3.5" fill="#FF6B9D" />

      {/* Z's animadas */}
      <g className="z-1">
        <text x="78" y="32" fontFamily="Archivo Black, sans-serif" fontSize="18" fill="#FFD23F" stroke="#000" strokeWidth="1.2" fontWeight="900">Z</text>
      </g>
      <g className="z-2">
        <text x="86" y="22" fontFamily="Archivo Black, sans-serif" fontSize="14" fill="#FFD23F" stroke="#000" strokeWidth="1" fontWeight="900">z</text>
      </g>
      <g className="z-3">
        <text x="92" y="14" fontFamily="Archivo Black, sans-serif" fontSize="11" fill="#FFD23F" stroke="#000" strokeWidth="0.8" fontWeight="900">z</text>
      </g>
    </svg>
  );
}
