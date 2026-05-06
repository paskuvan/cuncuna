// ============================================================
// Cuncuna Estudiando - anteojitos cuadrados + librito rosa
// Para mostrar durante lecciones activas o pantallas de estudio
// ============================================================

export default function CuncunaEstudiando({ size = 80, className = '' }) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 100 110"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Cuncuna estudiando"
    >
      {/* Antenas */}
      <line x1="40" y1="22" x2="36" y2="6" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="22" x2="64" y2="6" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="6" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />
      <circle cx="64" cy="6" r="4" fill="#FF6B9D" stroke="#000" strokeWidth="2" />

      {/* Cabeza */}
      <circle cx="50" cy="50" r="32" fill="#FFFFFF" stroke="#000" strokeWidth="4" />

      {/* Anteojitos cuadrados (estilo nerdie) */}
      <rect x="32" y="42" width="14" height="11" fill="#FFFFFF" stroke="#000" strokeWidth="3" rx="1" />
      <rect x="54" y="42" width="14" height="11" fill="#FFFFFF" stroke="#000" strokeWidth="3" rx="1" />
      <line x1="46" y1="47" x2="54" y2="47" stroke="#000" strokeWidth="2.5" />

      {/* Ojos pequeños dentro de los lentes */}
      <circle cx="39" cy="48" r="2.2" fill="#000" />
      <circle cx="61" cy="48" r="2.2" fill="#000" />

      {/* Sonrisa concentrada */}
      <path d="M 40 65 Q 50 70 60 65" stroke="#000" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      {/* Cachetes */}
      <circle cx="26" cy="60" r="3" fill="#FF6B9D" />
      <circle cx="74" cy="60" r="3" fill="#FF6B9D" />

      {/* Librito */}
      <rect x="32" y="84" width="36" height="22" fill="#FF6B9D" stroke="#000" strokeWidth="3" />
      <line x1="50" y1="84" x2="50" y2="106" stroke="#000" strokeWidth="2" />
      {/* Líneas de texto en el libro */}
      <line x1="36" y1="91" x2="46" y2="91" stroke="#000" strokeWidth="1.2" />
      <line x1="36" y1="96" x2="46" y2="96" stroke="#000" strokeWidth="1.2" />
      <line x1="36" y1="101" x2="44" y2="101" stroke="#000" strokeWidth="1.2" />
      <line x1="54" y1="91" x2="64" y2="91" stroke="#000" strokeWidth="1.2" />
      <line x1="54" y1="96" x2="64" y2="96" stroke="#000" strokeWidth="1.2" />
      <line x1="54" y1="101" x2="62" y2="101" stroke="#000" strokeWidth="1.2" />
    </svg>
  );
}
