// ============================================================
// Cuncuna Triste - cejas caídas, boca al revés, lagrimita
// Para feedback de quiz fallado. Empática, no dramática.
// ============================================================

export default function CuncunaTriste({ size = 80, className = '', animado = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Cuncuna triste"
    >
      <style>
        {`
          ${animado ? `
            .lagrima { animation: caer 1.8s ease-in infinite; }
            @keyframes caer {
              0% { transform: translateY(0); opacity: 0; }
              30% { opacity: 1; }
              100% { transform: translateY(15px); opacity: 0; }
            }
          ` : ''}
        `}
      </style>

      {/* Antenas caídas */}
      <line x1="40" y1="22" x2="36" y2="12" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="22" x2="64" y2="12" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="12" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />
      <circle cx="64" cy="12" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />

      {/* Cabeza */}
      <circle cx="50" cy="55" r="35" fill="#FFFFFF" stroke="#000" strokeWidth="4" />

      {/* Cejitas tristes (caídas hacia adentro) */}
      <line x1="30" y1="42" x2="44" y2="46" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <line x1="56" y1="46" x2="70" y2="42" stroke="#000" strokeWidth="3" strokeLinecap="round" />

      {/* Ojos */}
      <circle cx="38" cy="52" r="7" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
      <circle cx="62" cy="52" r="7" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
      <circle cx="38" cy="54" r="3.5" fill="#000" />
      <circle cx="62" cy="54" r="3.5" fill="#000" />

      {/* Boca al revés (triste) */}
      <path d="M 40 73 Q 50 67 60 73" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Cachetes apagados */}
      <circle cx="28" cy="65" r="3" fill="#FF6B9D" opacity="0.5" />
      <circle cx="72" cy="68" r="3" fill="#FF6B9D" opacity="0.5" />

      {/* Lagrimita azul */}
      <g className="lagrima">
        <path d="M 65 56 Q 68 64 64 70 Q 60 64 64 56 Z" fill="#4ECDC4" stroke="#000" strokeWidth="2" />
      </g>
    </svg>
  );
}
