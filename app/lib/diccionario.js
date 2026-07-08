import { CURRICULUM } from '../data/curriculum';

const PREFIJOS_TITULO = [
  'Mira la seña:',
  'Mira la seña',
  'Seña:',
  'Seña',
];

function limpiarTitulo(titulo) {
  const limpio = PREFIJOS_TITULO.reduce(
    (texto, prefijo) => texto.replace(new RegExp(`^${prefijo}\\s*`, 'i'), ''),
    titulo
  );

  return limpio.trim();
}

export function obtenerSenasDiccionario() {
  return CURRICULUM.flatMap((nivel, indiceNivel) =>
    nivel.lecciones.flatMap((leccion) =>
      leccion.ejercicios
        .map((ejercicio, indiceEjercicio) => ({ ejercicio, indiceEjercicio }))
        .filter(({ ejercicio }) => ejercicio.tipo === 'video' && ejercicio.videoUrl)
        .map(({ ejercicio, indiceEjercicio }) => ({
          id: `${leccion.id}-${indiceEjercicio}`,
          palabra: limpiarTitulo(ejercicio.titulo),
          descripcion: ejercicio.descripcion,
          videoUrl: ejercicio.videoUrl,
          posterUrl: ejercicio.posterUrl,
          nivelId: nivel.id,
          nivelNumero: indiceNivel + 1,
          nivelTitulo: nivel.titulo,
          nivelColor: nivel.color,
          nivelIcono: nivel.icono,
          leccionId: leccion.id,
          leccionTitulo: leccion.titulo,
          xp: leccion.xp,
        }))
    )
  );
}

export function obtenerNivelesDiccionario() {
  return CURRICULUM.map((nivel, indiceNivel) => ({
    id: nivel.id,
    titulo: nivel.titulo,
    color: nivel.color,
    icono: nivel.icono,
    numero: indiceNivel + 1,
  }));
}

function hashTexto(texto) {
  return [...texto].reduce((hash, char) => {
    const siguiente = (hash << 5) - hash + char.charCodeAt(0);
    return siguiente | 0;
  }, 0);
}

function mezclarConSemilla(items, semilla) {
  const mezclados = [...items];
  let estado = Math.abs(hashTexto(semilla)) || 1;

  for (let i = mezclados.length - 1; i > 0; i -= 1) {
    estado = (estado * 1664525 + 1013904223) % 4294967296;
    const j = estado % (i + 1);
    [mezclados[i], mezclados[j]] = [mezclados[j], mezclados[i]];
  }

  return mezclados;
}

export function obtenerRepasoDiario(fecha = new Date(), cantidad = 5) {
  const senas = obtenerSenasDiccionario();
  const fechaLocal = fecha.toISOString().slice(0, 10);

  return mezclarConSemilla(senas, fechaLocal).slice(0, cantidad);
}

export function crearOpcionesRepaso(senaCorrecta, senas, cantidad = 4) {
  const distractores = mezclarConSemilla(
    senas.filter((sena) => sena.id !== senaCorrecta.id),
    senaCorrecta.id
  ).slice(0, cantidad - 1);

  return mezclarConSemilla([senaCorrecta, ...distractores], `${senaCorrecta.id}-opciones`);
}
