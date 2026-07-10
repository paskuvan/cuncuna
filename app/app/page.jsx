'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProgreso } from '../hooks/useProgreso';
import { useLogros } from '../hooks/useLogros';
import Mapa from '../components/Mapa';
import VistaLeccion from '../components/VistaLeccion';
import ModalLogroNuevo from '../components/ModalLogroNuevo';
import { obtenerOnboarding } from '../lib/onboarding-local';

// ============================================================
// PAGE: /app  (ruta protegida, requiere login)
// ⚠️ Este es el page.jsx que ANTES estaba en /
// Ahora vive en /app porque / es la landing pública.
//
// Los imports cambian de './hooks/...' a '../hooks/...'
// porque subimos un nivel de carpeta.
// ============================================================

export default function AppPage() {
  const router = useRouter();
  const {
    progreso,
    completarLeccion,
    registrarVideoVisto,
    registrarQuizAcertado,
    reiniciar,
  } = useProgreso();

  const { logrosObtenidos, logrosNuevos, verificarLogros, limpiarLogrosNuevos } =
    useLogros(progreso);

  const [vista, setVista] = useState({ tipo: 'mapa' });

  useEffect(() => {
    const onboarding = obtenerOnboarding();
    if (!onboarding.completado) {
      router.replace('/app/onboarding');
    }
  }, [router]);

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
