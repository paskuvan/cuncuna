// ============================================================
// HELPERS DE STORAGE
// Funciones para construir URLs de videos/posters/imágenes
// que viven en Supabase Storage.
//
// En vez de escribir la URL completa cada vez, llamas:
//   videoUrl(`l1-1-hola.mp4`)
// y devuelve la URL completa pública.
// ============================================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public`;

/**
 * Construye URL pública de un video en el bucket "videos"
 * @param {string} nombre - Nombre del archivo (ej: "l1-1-hola.mp4")
 */
export const videoUrl = (nombre) => `${STORAGE_BASE}/videos/${nombre}`;

/**
 * Construye URL pública de un poster en el bucket "posters"
 * @param {string} nombre - Nombre del archivo (ej: "l1-1-hola.jpg")
 */
export const posterUrl = (nombre) => `${STORAGE_BASE}/posters/${nombre}`;

/**
 * Construye URL pública de una imagen genérica
 * (para quizzes con imagen). Necesitas crear un bucket "imagenes".
 * @param {string} nombre - Nombre del archivo (ej: "saludo-manana.jpg")
 */
export const imagenUrl = (nombre) => `${STORAGE_BASE}/imagenes/${nombre}`;
