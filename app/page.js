'use client';

import { useState } from 'react';
import { useProgreso } from './hooks/useProgreso';
import Mapa from './components/Mapa';
import VistaLeccion from './components/VistaLeccion';

// ============================================================
// PAGE: Punto de entrada de la app
// Solo orquesta entre las dos vistas principales:
//   - Mapa (selección de lección)
//   - VistaLeccion (lección activa)
// ============================================================

export default function Page() {
  const { progreso, completarLeccion, reiniciar } = useProgreso();
  const [vista, setVista] = useState({ tipo: 'mapa' });

  return (
    <>
      {vista.tipo === 'mapa' && (
        <Mapa
          progreso={progreso}
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
          onCompletar={completarLeccion}
          onVolver={() => setVista({ tipo: 'mapa' })}
        />
      )}
    </>
  );
}
