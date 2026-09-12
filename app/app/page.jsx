'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProgreso } from '../hooks/useProgreso';
import { useLogros } from '../hooks/useLogros';
import { CURRICULUM } from '../data/curriculum';
import { LOGROS } from '../data/logros';
import AppShell from '../components/dashboard/AppShell';
import DashboardContenido from '../components/dashboard/DashboardContenido';
import VistaLeccion from '../components/VistaLeccion';
import ModalLogroNuevo from '../components/ModalLogroNuevo';
import { obtenerOnboarding } from '../lib/onboarding-local';
import { obtenerPlanActual, puedeAccederLeccion } from '../lib/acceso-plan';
import { obtenerRecordatorios, debeRecordarHoy } from '../lib/recordatorios-locales';

// ============================================================
// PAGE: /app  (dashboard, estilo suave)
// Ruta protegida. Muestra un resumen de aprendizaje LSCh y
// permite abrir lecciones (VistaLeccion en modo enfoque).
// ============================================================

export default function AppPage() {
  const router = useRouter();
  const {
    progreso,
    completarLeccion,
    registrarVideoVisto,
    registrarQuizAcertado,
  } = useProgreso();

  const { logrosObtenidos, logrosNuevos, verificarLogros, limpiarLogrosNuevos } =
    useLogros(progreso);

  const [vista, setVista] = useState({ tipo: 'dashboard' });

  useEffect(() => {
    const onboarding = obtenerOnboarding();
    if (!onboarding.completado) {
      router.replace('/app/onboarding');
    }
  }, [router]);

  const completadasSet = useMemo(
    () => new Set(progreso.leccionesCompletadas),
    [progreso.leccionesCompletadas]
  );

  // Datos derivados para el dashboard
  const { niveles, continuar, proxima, stats } = useMemo(() => {
    const nivelesData = CURRICULUM.map((nivel) => {
      const total = nivel.lecciones.length;
      const completadas = nivel.lecciones.filter((l) =>
        completadasSet.has(l.id)
      ).length;
      return {
        id: nivel.id,
        titulo: nivel.titulo,
        icono: nivel.icono,
        color: nivel.color,
        total,
        completadas,
        pct: total ? Math.round((completadas / total) * 100) : 0,
        _nivel: nivel,
      };
    });

    // Lecciones en orden de currículo, con estado
    const planes = CURRICULUM.flatMap((nivel) =>
      nivel.lecciones.map((leccion) => ({ leccion, nivel }))
    );

    // Índice de la primera lección no completada = "en progreso"
    const idxFrontera = planes.findIndex(
      ({ leccion }) => !completadasSet.has(leccion.id)
    );
    const items = planes.map(({ leccion, nivel }, idx) => {
      const completada = completadasSet.has(leccion.id);
      const estado = completada
        ? 'completada'
        : idx === idxFrontera
          ? 'en-progreso'
          : 'pendiente';
      const totalEj = leccion.ejercicios?.length ?? 0;
      return {
        id: leccion.id,
        titulo: leccion.titulo,
        nivelTitulo: nivel.titulo,
        estado,
        total: totalEj,
        hechos: completada ? totalEj : 0,
        pct: completada ? 100 : 0,
        _leccion: leccion,
        _nivel: nivel,
      };
    });

    const pendientes = items.filter((i) => i.estado !== 'completada');
    const proximaItem = pendientes[0] ?? null;

    // "Continuar aprendiendo": la lección en curso + próximas pendientes
    const continuarItems = pendientes.slice(0, 5);

    const totalLecciones = planes.length;
    return {
      niveles: nivelesData,
      continuar: continuarItems,
      proxima: proximaItem,
      stats: {
        xp: progreso.xpTotal,
        racha: progreso.racha,
        leccionesCompletadas: completadasSet.size,
        totalLecciones,
        logros: logrosObtenidos.length,
      },
    };
  }, [completadasSet, progreso.xpTotal, progreso.racha, logrosObtenidos.length]);

  const logrosRecientes = useMemo(() => {
    return logrosObtenidos
      .map((id) => LOGROS.find((l) => l.id === id))
      .filter(Boolean)
      .slice(-4)
      .reverse();
  }, [logrosObtenidos]);

  const recordatorio = useMemo(() => {
    const rec = obtenerRecordatorios();
    return { activo: debeRecordarHoy(rec), hora: rec.hora };
  }, []);

  // ─── Abrir una lección ───
  const abrirLeccion = (item) => {
    if (!item?._leccion) return;
    const plan = obtenerPlanActual();
    if (!puedeAccederLeccion(item._leccion.id, plan)) {
      router.push('/suscripcion?plan=plus');
      return;
    }
    setVista({ tipo: 'leccion', leccion: item._leccion, nivel: item._nivel });
  };

  const abrirNivel = (nivel) => {
    const primera =
      nivel._nivel.lecciones.find((l) => !completadasSet.has(l.id)) ??
      nivel._nivel.lecciones[0];
    if (primera) abrirLeccion({ _leccion: primera, _nivel: nivel._nivel });
  };

  const handleCompletarLeccion = async (leccionId, xp) => {
    const nuevosStats = await completarLeccion(leccionId, xp);
    if (nuevosStats) {
      await verificarLogros(nuevosStats);
    }
  };

  // ─── Lección en modo enfoque (sin shell) ───
  if (vista.tipo === 'leccion') {
    return (
      <>
        <VistaLeccion
          leccion={vista.leccion}
          nivel={vista.nivel}
          onCompletar={handleCompletarLeccion}
          onVolver={() => setVista({ tipo: 'dashboard' })}
          registrarVideoVisto={registrarVideoVisto}
          registrarQuizAcertado={registrarQuizAcertado}
        />
        <ModalLogroNuevo logrosNuevos={logrosNuevos} onCerrar={limpiarLogrosNuevos} />
      </>
    );
  }

  return (
    <AppShell title="Dashboard" onContinuar={() => proxima && abrirLeccion(proxima)}>
      <DashboardContenido
        stats={stats}
        niveles={niveles}
        continuar={continuar}
        proxima={proxima}
        recordatorio={recordatorio}
        logrosRecientes={logrosRecientes}
        onSeleccionarLeccion={abrirLeccion}
        onSeleccionarNivel={abrirNivel}
      />
      <ModalLogroNuevo logrosNuevos={logrosNuevos} onCerrar={limpiarLogrosNuevos} />
    </AppShell>
  );
}
