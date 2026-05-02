// ============================================================
// COMPONENTE: CuncunaCabeza
// Solo la cabeza/cara de Cuncuna, ideal para:
//   - El logo del header (donde antes estaba <BookOpen />)
//   - Empty states pequeños
//   - Avatar de la app
//
// Uso:
//   <CuncunaCabeza size={40} />
// ============================================================

export default function CuncunaCabeza({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Cuncuna"
      role="img"
    >
      {/* Antenas */}
      <line x1="40" y1="22" x2="35" y2="6" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="22" x2="65" y2="6" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      <circle cx="35" cy="6" r="4" fill="#FF6B9D" stroke="#000000" strokeWidth="2" />
      <circle cx="65" cy="6" r="4" fill="#FF6B9D" stroke="#000000" strokeWidth="2" />

      {/* Cabeza */}
      <circle cx="50" cy="55" r="35" fill="#FFD23F" stroke="#000000" strokeWidth="4" />

      {/* Ojos */}
      <circle cx="38" cy="48" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
      <circle cx="62" cy="48" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
      <circle cx="38" cy="48" r="4" fill="#000000" />
      <circle cx="62" cy="48" r="4" fill="#000000" />
      <circle cx="40" cy="46" r="1.5" fill="#FFFFFF" />
      <circle cx="64" cy="46" r="1.5" fill="#FFFFFF" />

      {/* Sonrisa */}
      <path d="M 36 65 Q 50 75 64 65" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Cachetes */}
      <circle cx="28" cy="62" r="3.5" fill="#FF6B9D" />
      <circle cx="72" cy="62" r="3.5" fill="#FF6B9D" />
    </svg>
  );
}
