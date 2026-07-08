const STORAGE_KEY = 'cuncuna:favoritos-senas';

function leerFavoritos() {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function guardarFavoritos(ids) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set(ids)]));
}

export function obtenerFavoritosLocales() {
  return leerFavoritos();
}

export function esFavoritaLocal(senaId) {
  return leerFavoritos().includes(senaId);
}

export function alternarFavoritoLocal(senaId) {
  const favoritos = leerFavoritos();
  const siguientes = favoritos.includes(senaId)
    ? favoritos.filter((id) => id !== senaId)
    : [...favoritos, senaId];

  guardarFavoritos(siguientes);
  return siguientes;
}

export function limpiarFavoritosLocales() {
  guardarFavoritos([]);
  return [];
}

export function obtenerSenasFavoritas(senas, favoritos = leerFavoritos()) {
  return senas.filter((sena) => favoritos.includes(sena.id));
}
