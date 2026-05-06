// ============================================================
// Cuncuna Celebrando - ojos cerrados ^_^ con estrellas alrededor
// Animación opcional: estrellas pulsan, mascota rebota
// ============================================================

export default function CuncunaCelebrando({ size = 80, className = '', animado = true }) {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 110 130"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Cuncuna celebrando"
    >
      <style>
        {`
          ${animado ? `
            .star-1 { animation: star-pulse 1s ease-in-out infinite; transform-origin: 18px 28px; }
            .star-2 { animation: star-pulse 1s ease-in-out infinite 0.3s; transform-origin: 88px 35px; }
            .star-3 { animation: star-pulse 1s ease-in-out infinite 0.6s; transform-origin: 95px 80px; }
            @keyframes star-pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.3); opacity: 0.7; }
            }
            .mascota-rebote {
              transform-origin: 55px 75px;
              animation: rebote 0.8s ease-in-out infinite;
            }
            @keyframes rebote {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-3px); }
            }
          ` : ''}
        `}
      </style>

      {/* Estrellas alrededor */}
      <g className="star-1">
        <text x="18" y="32" fontFamily="Archivo Black, sans-serif" fontSize="18" fill="#FFD23F" stroke="#000" strokeWidth="1.2" fontWeight="900" textAnchor="middle">★</text>
      </g>
      <g className="star-2">
        <text x="88" y="38" fontFamily="Archivo Black, sans-serif" fontSize="14" fill="#FFD23F" stroke="#000" strokeWidth="1.2" fontWeight="900" textAnchor="middle">★</text>
      </g>
      <g className="star-3">
        <text x="95" y="83" fontFamily="Archivo Black, sans-serif" fontSize="12" fill="#FF6B9D" stroke="#000" strokeWidth="1" fontWeight="900" textAnchor="middle">★</text>
      </g>

      <g className="mascota-rebote">
        {/* Antenas */}
        <line x1="45" y1="42" x2="40" y2="26" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <line x1="65" y1="42" x2="70" y2="26" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <circle cx="40" cy="26" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />
        <circle cx="70" cy="26" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />

        {/* Cabeza */}
        <circle cx="55" cy="75" r="35" fill="#FFFFFF" stroke="#000" strokeWidth="4" />

        {/* Ojos cerrados de felicidad ^_^ */}
        <path d="M 38 68 Q 45 60 52 68" stroke="#000" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 58 68 Q 65 60 72 68" stroke="#000" strokeWidth="3.5" fill="none" strokeLinecap="round" />

        {/* Boca abierta sonriendo */}
        <ellipse cx="55" cy="85" rx="11" ry="8" fill="#FF6B9D" stroke="#000" strokeWidth="3" />
        <path d="M 47 85 Q 55 80 63 85" stroke="#FF6B9D" strokeWidth="2" fill="none" />

        {/* Cachetes más grandes */}
        <circle cx="32" cy="82" r="4.5" fill="#FF6B9D" />
        <circle cx="78" cy="82" r="4.5" fill="#FF6B9D" />
      </g>
    </svg>
  );
}
