// ============================================================
// CUNCUNA · Componente unificado de mascota
//
// Uso:
//   <Cuncuna estado="idle" size={64} />
//   <Cuncuna estado="celebrando" size={120} animado={false} />
//
// Estados disponibles:
//   - idle (default)
//   - saludando
//   - celebrando
//   - pensando
//   - triste
//   - durmiendo
//   - estudiando
//   - mariposa
//
// Props:
//   - estado: string (qué estado mostrar)
//   - size: number (tamaño en px, default 80)
//   - animado: boolean (animaciones ON/OFF, default true)
//   - className: string (clases extra de Tailwind/CSS)
// ============================================================

import CuncunaIdle from './CuncunaIdle';
import CuncunaSaludando from './CuncunaSaludando';
import CuncunaCelebrando from './CuncunaCelebrando';
import CuncunaPensando from './CuncunaPensando';
import CuncunaTriste from './CuncunaTriste';
import CuncunaDurmiendo from './CuncunaDurmiendo';
import CuncunaEstudiando from './CuncunaEstudiando';
import CuncunaMariposa from './CuncunaMariposa';

const ESTADOS = {
  idle: CuncunaIdle,
  saludando: CuncunaSaludando,
  celebrando: CuncunaCelebrando,
  pensando: CuncunaPensando,
  triste: CuncunaTriste,
  durmiendo: CuncunaDurmiendo,
  estudiando: CuncunaEstudiando,
  mariposa: CuncunaMariposa,
};

export default function Cuncuna({
  estado = 'idle',
  size = 80,
  animado = true,
  className = '',
}) {
  const Componente = ESTADOS[estado] || CuncunaIdle;
  return <Componente size={size} animado={animado} className={className} />;
}
