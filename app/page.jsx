'use client';

import { useState } from 'react';
import { useProgreso } from './hooks/useProgreso';
import { useLogros } from './hooks/useLogros';
import Mapa from './components/Mapa';
import VistaLeccion from './components/VistaLeccion';
import ModalLogroNuevo from './components/ModalLogroNuevo';

// ============================================================
// PAGE: con verificación retroactiva de logros
// ⚠️ REEMPLAZA el page.jsx anterior.
//
// CAMBIO: useLogros ahora recibe `progreso` para poder verificar
// logros automáticamente al cargar (no solo al completar lección).
// ============================================================

export default function Page() {
  const {
    progreso,
    completarLeccion,
    registrarVideoVisto,
    registrarQuizAcertado,
    reiniciar,
  } = useProgreso();

  // ⚠️ Pasamos `progreso` al hook para que pueda verificar retroactivamente
  const { logrosObtenidos, logrosNuevos, verificarLogros, limpiarLogrosNuevos } =
    useLogros(progreso);

  const [vista, setVista] = useState({ tipo: 'mapa' });

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

      <ModalLogroNuevo
        logrosNuevos={logrosNuevos}
        onCerrar={limpiarLogrosNuevos}
      />
    </>
  );
}
