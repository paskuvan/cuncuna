const STORAGE_KEY = 'cuncuna:errores-senas';

function leerMapaErrores() {
  if (typeof window === 'undefined') return {};

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function guardarMapaErrores(mapa) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mapa));
}

export function obtenerErroresLocales() {
  return leerMapaErrores();
}

export function registrarResultadoSena(senaId, acerto) {
  const mapa = leerMapaErrores();
  const actual = mapa[senaId] ?? {
    fallos: 0,
    aciertos: 0,
    ultimoIntento: null,
  };

  mapa[senaId] = {
    fallos: actual.fallos + (acerto ? 0 : 1),
    aciertos: actual.aciertos + (acerto ? 1 : 0),
    ultimoIntento: new Date().toISOString(),
  };

  if (mapa[senaId].fallos <= 0 && mapa[senaId].aciertos > 1) {
    delete mapa[senaId];
  }

  guardarMapaErrores(mapa);
  return mapa;
}

export function limpiarErrorLocal(senaId) {
  const mapa = leerMapaErrores();
  delete mapa[senaId];
  guardarMapaErrores(mapa);
  return mapa;
}

export function limpiarTodosLosErroresLocales() {
  guardarMapaErrores({});
  return {};
}

export function enriquecerSenasConErrores(senas, errores) {
  return senas
    .map((sena) => ({
      ...sena,
      fallos: errores[sena.id]?.fallos ?? 0,
      aciertos: errores[sena.id]?.aciertos ?? 0,
      ultimoIntento: errores[sena.id]?.ultimoIntento ?? null,
    }))
    .filter((sena) => sena.fallos > 0)
    .sort((a, b) => {
      if (b.fallos !== a.fallos) return b.fallos - a.fallos;
      return (b.ultimoIntento ?? '').localeCompare(a.ultimoIntento ?? '');
    });
}
