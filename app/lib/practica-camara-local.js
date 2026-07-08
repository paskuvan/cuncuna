const STORAGE_KEY = 'cuncuna:practica-camara';

function leerPractica() {
  if (typeof window === 'undefined') {
    return { total: 0, senas: [], ultimaPractica: null };
  }

  try {
    return {
      total: 0,
      senas: [],
      ultimaPractica: null,
      ...JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}'),
    };
  } catch {
    return { total: 0, senas: [], ultimaPractica: null };
  }
}

export function obtenerPracticaCamaraLocal() {
  return leerPractica();
}

export function registrarSenaPracticada(senaId) {
  const estado = leerPractica();
  const actualizado = {
    total: estado.total + 1,
    senas: [...new Set([...estado.senas, senaId])],
    ultimaPractica: new Date().toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizado));
  return actualizado;
}
