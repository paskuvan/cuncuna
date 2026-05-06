'use client';

import { useState } from 'react';
import { useProgreso } from './hooks/useProgreso';
import { useLogros } from './hooks/useLogros';
import Mapa from './components/Mapa';
import VistaLeccion from './components/VistaLeccion';
import ModalLogroNuevo from './components/ModalLogroNuevo';

// ============================================================
// PAGE: Punto de entrada
// ⚠️ REEMPLAZA el page.jsx anterior.
//
// Cambios:
//   - Conecta useProgreso con useLogros
//   - Verifica logros al completar lección
//   - Muestra modal celebratorio si hay logros nuevos
// ============================================================

export default function Page() {
  const {
    progreso,
    completarLeccion,
    registrarVideoVisto,
    registrarQuizAcertado,
    reiniciar,
  } = useProgreso();

  const { logrosObtenidos, logrosNuevos, verificarLogros, limpiarLogrosNuevos } =
    useLogros();

  const [vista, setVista] = useState({ tipo: 'mapa' });

  // Wrapper que completa lección Y verifica logros
  const handleCompletarLeccion = async (leccionId, xp) => {
    const nuevosStats = await completarLeccion(leccionId, xp);
    if (nuevosStats) {
      await verificarLogros(nuevosStats);
    }
  };

  return (
    <>
      {vista.tipo === 'mapa' && (
        <Mapa
          progreso={progreso}
          logrosObtenidos={logrosObtenidos}
          onSeleccionarLeccion={(leccion, nivel) =>
            setVista({ tipo: 'leccion', leccion, nivel })
          }
          onReiniciar={reiniciar}
        />
      )}

      {vista.tipo === 'leccion' && (
        <VistaLeccion
          leccion={vista.leccion}
          nivel={vista.nivel}
          onCompletar={handleCompletarLeccion}
          onVolver={() => setVista({ tipo: 'mapa' })}
          registrarVideoVisto={registrarVideoVisto}
          registrarQuizAcertado={registrarQuizAcertado}
        />
      )}

      {/* Modal celebratorio de logros nuevos */}
      <ModalLogroNuevo
        logrosNuevos={logrosNuevos}
        onCerrar={limpiarLogrosNuevos}
      />
    </>
  );
}
