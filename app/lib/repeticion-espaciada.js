const STORAGE_KEY = 'cuncuna:repeticion-espaciada';
const INTERVALOS = [1, 3, 7, 14, 30, 60];

function leerEstado() {
  if (typeof window === 'undefined') return {};

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function guardarEstado(estado) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
}

function sumarDias(fecha, dias) {
  const siguiente = new Date(fecha);
  siguiente.setDate(siguiente.getDate() + dias);
  return siguiente.toISOString();
}

function fechaSemilla(fecha) {
  return fecha.toLocaleDateString('en-CA');
}

function puntajeTexto(texto) {
  return [...texto].reduce((total, caracter) => total + caracter.charCodeAt(0), 0);
}

export function obtenerRepasoInteligente(senas, cantidad = 5, fecha = new Date()) {
  const estado = leerEstado();
  const ahora = fecha.getTime();
  const pendientes = [];
  const nuevas = [];

  senas.forEach((sena) => {
    const progreso = estado[sena.id];
    if (!progreso) {
      nuevas.push(sena);
      return;
    }

    if (new Date(progreso.proximoRepaso).getTime() <= ahora) {
      pendientes.push({ ...sena, progresoEspaciado: progreso });
    }
  });

  pendientes.sort((a, b) => {
    const diferenciaNivel =
      (a.progresoEspaciado.nivel ?? 0) - (b.progresoEspaciado.nivel ?? 0);
    if (diferenciaNivel !== 0) return diferenciaNivel;
    return a.progresoEspaciado.proximoRepaso.localeCompare(
      b.progresoEspaciado.proximoRepaso
    );
  });

  const semilla = fechaSemilla(fecha);
  nuevas.sort(
    (a, b) =>
      puntajeTexto(`${a.id}-${semilla}`) - puntajeTexto(`${b.id}-${semilla}`)
  );

  return [...pendientes, ...nuevas].slice(0, cantidad);
}

export function registrarRepasoEspaciado(senaId, calidad, fecha = new Date()) {
  const estado = leerEstado();
  const anterior = estado[senaId] ?? {
    nivel: 0,
    intentos: 0,
    aciertos: 0,
  };

  let nivel = anterior.nivel;
  let dias = 1;

  if (calidad === 'incorrecta') {
    nivel = 0;
    dias = 0;
  } else if (calidad === 'dificil') {
    nivel = Math.max(0, nivel);
    dias = 1;
  } else if (calidad === 'bien') {
    nivel = Math.min(nivel + 1, INTERVALOS.length - 1);
    dias = INTERVALOS[nivel];
  } else if (calidad === 'facil') {
    nivel = Math.min(nivel + 2, INTERVALOS.length - 1);
    dias = INTERVALOS[nivel];
  }

  estado[senaId] = {
    nivel,
    intentos: anterior.intentos + 1,
    aciertos: anterior.aciertos + (calidad === 'incorrecta' ? 0 : 1),
    ultimoRepaso: fecha.toISOString(),
    proximoRepaso: sumarDias(fecha, dias),
  };

  guardarEstado(estado);
  return estado[senaId];
}

export function describirProximoRepaso(calidad) {
  if (calidad === 'incorrecta') return 'Volverá en tu próxima sesión';
  if (calidad === 'dificil') return 'Volverá mañana';
  if (calidad === 'bien') return 'Aumentará su intervalo';
  return 'Volverá más adelante';
}
