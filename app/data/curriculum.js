import { videoUrl, posterUrl, imagenUrl } from '../lib/storage';

// ============================================================
// CURRÍCULUM COMPLETO DE CUNCUNA
//
// 4 niveles, ~30 lecciones, ~85 videos a grabar
//
// NIVEL 0 · Introducción (sin video, mucho texto)  → 3 lecciones
// NIVEL 1 · Fundamentos                            → 8 lecciones
// NIVEL 2 · Vida cotidiana                         → 10 lecciones
// NIVEL 3 · Conversación                           → 9 lecciones
//
// TIPOS DE EJERCICIOS DISPONIBLES:
//   - 'video'           → muestra video de la seña
//   - 'texto'           → solo texto educativo (sin video)
//   - 'quiz'            → opción múltiple
//   - 'quiz-imagen'     → opción múltiple con imagen
//   - 'quiz-video'      → mira video y elige opción
//   - 'verdadero-falso' → afirmación V/F
//   - 'ordenar'         → ordenar palabras para formar frase
//   - 'match'           → relacionar parejas (imagen ↔ palabra)
//   - 'completar'       → completar frase con palabra correcta
// ============================================================

export const CURRICULUM = [
  // ═══════════════════════════════════════════════════════════
  // NIVEL 0 · INTRODUCCIÓN A LA LSCH (sin grabación pesada)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'nivel-0',
    titulo: 'Introducción',
    descripcion: 'Conoce la LSCh y la cultura sorda chilena',
    color: '#A78BFA',
    icono: '👁️',
    lecciones: [
      {
        id: 'l0-1',
        titulo: '¿Qué es la LSCh?',
        descripcion: 'La lengua de señas chilena',
        xp: 15,
        ejercicios: [
          {
            tipo: 'texto',
            titulo: 'La LSCh es una lengua',
            descripcion: 'La Lengua de Señas Chilena (LSCh) NO es "español con manos". Es una lengua independiente con su propia gramática, sintaxis y reglas. En 2021 fue reconocida oficialmente en Chile como una lengua del Estado, junto al español, mapudungun, aymara y rapa nui.',
          },
          {
            tipo: 'verdadero-falso',
            pregunta: 'La LSCh tiene la misma gramática que el español hablado',
            correcta: false,
            explicacion: 'Falso. La LSCh tiene gramática propia. Por ejemplo, el orden de las palabras es diferente y el tiempo verbal se marca con la dirección del cuerpo, no con conjugación.',
          },
          {
            tipo: 'quiz',
            pregunta: '¿En qué año se reconoció oficialmente la LSCh en Chile?',
            opciones: ['2010', '2015', '2021', '2023'],
            correcta: 2,
            explicacion: 'La Ley 21.303 reconoció a la LSCh como lengua oficial de la comunidad sorda chilena en 2021.',
          },
        ],
      },
      {
        id: 'l0-2',
        titulo: 'La cara también habla',
        descripcion: 'La importancia de la expresión facial',
        xp: 15,
        ejercicios: [
          {
            tipo: 'texto',
            titulo: 'Las manos NO son suficientes',
            descripcion: 'En LSCh, la expresión facial NO es un acompañante — es parte del lenguaje. Cejas levantadas pueden convertir una afirmación en pregunta. La intensidad de la mirada cambia el significado. Sin expresión facial, la seña queda incompleta o incluso significa otra cosa.',
          },
          {
            tipo: 'verdadero-falso',
            pregunta: 'Puedo aprender LSCh solo memorizando los movimientos de las manos',
            correcta: false,
            explicacion: 'Falso. La cara, las cejas, la mirada y la postura son tan importantes como las manos. Una misma seña con cara distinta puede significar cosas diferentes.',
          },
          {
            tipo: 'quiz-imagen',
            pregunta: '¿Qué función cumplen las cejas levantadas en LSCh?',
            imagenUrl: imagenUrl('l0-2-cejas.jpg'),
            opciones: [
              'Indican que la frase es una pregunta',
              'No tienen función',
              'Significan enojo siempre',
              'Solo decoran la cara',
            ],
            correcta: 0,
            explicacion: 'Las cejas levantadas suelen marcar preguntas en LSCh, similar a cómo el tono sube al final de una pregunta hablada.',
          },
        ],
      },
      {
        id: 'l0-3',
        titulo: 'Cultura sorda chilena',
        descripcion: 'Aprende con respeto',
        xp: 15,
        ejercicios: [
          {
            tipo: 'texto',
            titulo: 'Persona Sorda con S mayúscula',
            descripcion: 'En la cultura sorda, ser sordo NO es una discapacidad: es una identidad cultural y lingüística. Por eso muchas personas escriben "Sordo" con S mayúscula, como cuando uno dice "Chileno" o "Mapuche". Aprender LSCh es entrar en una cultura, no solo aprender un código.',
          },
          {
            tipo: 'quiz',
            pregunta: '¿Cuál de estas expresiones se considera respetuosa?',
            opciones: [
              'Sordomudo',
              'Persona sorda',
              'Discapacitado auditivo',
              'Mudito',
            ],
            correcta: 1,
            explicacion: '"Persona sorda" es la forma respetuosa. "Sordomudo" es incorrecto porque las personas sordas SÍ tienen voz, simplemente comunican en otra lengua. "Mudito" es despectivo.',
          },
          {
            tipo: 'verdadero-falso',
            pregunta: 'La LSCh es la misma en todos los países hispanohablantes',
            correcta: false,
            explicacion: 'Falso. Cada país tiene su propia lengua de señas. La LSCh es chilena, distinta a la LSE (España), LSM (México) o LSA (Argentina), incluso aunque compartamos el idioma español.',
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // NIVEL 1 · FUNDAMENTOS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'nivel-1',
    titulo: 'Fundamentos',
    descripcion: 'Saludos, cortesía y presentación',
    color: '#FFD23F',
    icono: '👋',
    lecciones: [
      {
        id: 'l1-1',
        titulo: 'Saludos básicos',
        descripcion: 'Hola, chao, buenos días',
        xp: 20,
        ejercicios: [
          { tipo: 'video', titulo: 'Mira la seña: HOLA', descripcion: 'Saludo universal en LSCh.', videoUrl: videoUrl('l1-1-hola.mp4'), posterUrl: posterUrl('l1-1-hola.jpg') },
          { tipo: 'video', titulo: 'Mira la seña: CHAO', descripcion: 'La despedida más común.', videoUrl: videoUrl('l1-1-chao.mp4'), posterUrl: posterUrl('l1-1-chao.jpg') },
          {
            tipo: 'quiz-video',
            pregunta: '¿Qué seña ves?',
            videoUrl: videoUrl('l1-1-hola.mp4'),
            opciones: ['Hola', 'Chao', 'Gracias', 'Por favor'],
            correcta: 0,
            explicacion: '¡Bien! La seña de HOLA tiene la mano abierta moviéndose lateralmente.',
          },
          { tipo: 'video', titulo: 'BUENOS DÍAS', descripcion: 'Saludo formal de la mañana.', videoUrl: videoUrl('l1-1-buenos-dias.mp4'), posterUrl: posterUrl('l1-1-buenos-dias.jpg') },
          {
            tipo: 'match',
            pregunta: 'Relaciona cada seña con su significado',
            parejas: [
              { izquierda: imagenUrl('l1-1-hola-still.jpg'), derecha: 'Hola', tipo_izquierda: 'imagen' },
              { izquierda: imagenUrl('l1-1-chao-still.jpg'), derecha: 'Chao', tipo_izquierda: 'imagen' },
              { izquierda: imagenUrl('l1-1-buenos-dias-still.jpg'), derecha: 'Buenos días', tipo_izquierda: 'imagen' },
            ],
            explicacion: 'Las tres señas más usadas para empezar una conversación.',
          },
        ],
      },
      {
        id: 'l1-2',
        titulo: 'Cortesía',
        descripcion: 'Gracias, por favor, perdón',
        xp: 20,
        ejercicios: [
          { tipo: 'video', titulo: 'GRACIAS', descripcion: 'La seña más usada del mundo.', videoUrl: videoUrl('l1-2-gracias.mp4'), posterUrl: posterUrl('l1-2-gracias.jpg') },
          { tipo: 'video', titulo: 'POR FAVOR', descripcion: 'Cortesía esencial.', videoUrl: videoUrl('l1-2-por-favor.mp4'), posterUrl: posterUrl('l1-2-por-favor.jpg') },
          { tipo: 'video', titulo: 'PERDÓN / DISCULPA', descripcion: 'Para pedir disculpas.', videoUrl: videoUrl('l1-2-perdon.mp4'), posterUrl: posterUrl('l1-2-perdon.jpg') },
          {
            tipo: 'quiz-video',
            pregunta: '¿Qué seña acabas de ver?',
            videoUrl: videoUrl('l1-2-gracias.mp4'),
            opciones: ['Gracias', 'Por favor', 'Perdón', 'De nada'],
            correcta: 0,
            explicacion: 'GRACIAS se hace llevando la mano desde el mentón hacia adelante.',
          },
        ],
      },
      {
        id: 'l1-3',
        titulo: 'Sí, no y entender',
        descripcion: 'Respuestas y comprensión',
        xp: 20,
        ejercicios: [
          { tipo: 'video', titulo: 'SÍ', descripcion: 'Afirmación.', videoUrl: videoUrl('l1-3-si.mp4'), posterUrl: posterUrl('l1-3-si.jpg') },
          { tipo: 'video', titulo: 'NO', descripcion: 'Negación.', videoUrl: videoUrl('l1-3-no.mp4'), posterUrl: posterUrl('l1-3-no.jpg') },
          { tipo: 'video', titulo: 'ENTIENDO', descripcion: 'Para confirmar comprensión.', videoUrl: videoUrl('l1-3-entiendo.mp4'), posterUrl: posterUrl('l1-3-entiendo.jpg') },
          { tipo: 'video', titulo: 'NO ENTIENDO', descripcion: 'Crítica para pedir que repitan.', videoUrl: videoUrl('l1-3-no-entiendo.mp4'), posterUrl: posterUrl('l1-3-no-entiendo.jpg') },
          {
            tipo: 'quiz',
            pregunta: 'Estás en una clase de LSCh y no comprendiste algo. ¿Qué seña usas?',
            opciones: ['NO', 'NO ENTIENDO', 'ADIÓS', 'PERDÓN'],
            correcta: 1,
            explicacion: 'Esta es una de las señas más útiles para alguien que recién aprende.',
          },
        ],
      },
      {
        id: 'l1-4',
        titulo: 'Pronombres',
        descripcion: 'Yo, tú, él, ella, nosotros',
        xp: 25,
        ejercicios: [
          { tipo: 'video', titulo: 'YO', descripcion: 'Apuntando al pecho.', videoUrl: videoUrl('l1-4-yo.mp4'), posterUrl: posterUrl('l1-4-yo.jpg') },
          { tipo: 'video', titulo: 'TÚ', descripcion: 'Apuntando hacia la otra persona.', videoUrl: videoUrl('l1-4-tu.mp4'), posterUrl: posterUrl('l1-4-tu.jpg') },
          { tipo: 'video', titulo: 'ÉL / ELLA', descripcion: 'Apuntando a un lado.', videoUrl: videoUrl('l1-4-el-ella.mp4'), posterUrl: posterUrl('l1-4-el-ella.jpg') },
          { tipo: 'video', titulo: 'NOSOTROS', descripcion: 'Movimiento circular incluyendo al grupo.', videoUrl: videoUrl('l1-4-nosotros.mp4'), posterUrl: posterUrl('l1-4-nosotros.jpg') },
          {
            tipo: 'quiz-video',
            pregunta: '¿Qué pronombre es?',
            videoUrl: videoUrl('l1-4-yo.mp4'),
            opciones: ['Yo', 'Tú', 'Él', 'Nosotros'],
            correcta: 0,
            explicacion: 'YO se hace siempre apuntando al propio pecho.',
          },
        ],
      },
      {
        id: 'l1-5',
        titulo: 'Mi nombre es...',
        descripcion: 'Presentarse formalmente',
        xp: 25,
        ejercicios: [
          { tipo: 'video', titulo: 'MI NOMBRE', descripcion: 'Para introducir tu nombre.', videoUrl: videoUrl('l1-5-mi-nombre.mp4'), posterUrl: posterUrl('l1-5-mi-nombre.jpg') },
          { tipo: 'video', titulo: 'MUCHO GUSTO', descripcion: 'Cierre formal de presentación.', videoUrl: videoUrl('l1-5-mucho-gusto.mp4'), posterUrl: posterUrl('l1-5-mucho-gusto.jpg') },
          {
            tipo: 'ordenar',
            pregunta: 'Ordena las señas para presentarte correctamente',
            palabras: ['HOLA', 'MI NOMBRE', '[tu nombre]', 'MUCHO GUSTO'],
            ordenCorrecto: [0, 1, 2, 3],
            explicacion: 'Esta es la estructura típica de presentación en LSCh.',
          },
        ],
      },
      {
        id: 'l1-6',
        titulo: 'Alfabeto manual A-G',
        descripcion: 'Las primeras letras del alfabeto LSCh',
        xp: 30,
        ejercicios: [
          { tipo: 'video', titulo: 'Letras A, B, C', descripcion: 'Primeras tres letras.', videoUrl: videoUrl('l1-6-abc.mp4'), posterUrl: posterUrl('l1-6-abc.jpg') },
          { tipo: 'video', titulo: 'Letras D, E, F, G', descripcion: 'Continuando el alfabeto.', videoUrl: videoUrl('l1-6-defg.mp4'), posterUrl: posterUrl('l1-6-defg.jpg') },
          {
            tipo: 'quiz',
            pregunta: '¿Cuántas configuraciones tiene el alfabeto manual chileno?',
            opciones: ['24', '26', '27', '29'],
            correcta: 2,
            explicacion: '27 configuraciones, incluyendo la Ñ (que el inglés no tiene).',
          },
        ],
      },
      {
        id: 'l1-7',
        titulo: 'Alfabeto manual H-O',
        descripcion: 'Continuando con el alfabeto',
        xp: 30,
        ejercicios: [
          { tipo: 'video', titulo: 'Letras H-K', descripcion: '', videoUrl: videoUrl('l1-7-hk.mp4'), posterUrl: posterUrl('l1-7-hk.jpg') },
          { tipo: 'video', titulo: 'Letras L-O', descripcion: '', videoUrl: videoUrl('l1-7-lo.mp4'), posterUrl: posterUrl('l1-7-lo.jpg') },
          {
            tipo: 'completar',
            pregunta: 'El alfabeto manual chileno se llama también:',
            opciones: ['Alfabeto LSE', 'Dactilológico', 'Quirología', 'Manografía'],
            correcta: 1,
            explicacion: 'Alfabeto dactilológico: del griego "daktylos" (dedo) + "logos" (palabra/discurso).',
          },
        ],
      },
      {
        id: 'l1-8',
        titulo: 'Alfabeto manual P-Z',
        descripcion: 'Completando el alfabeto',
        xp: 30,
        ejercicios: [
          { tipo: 'video', titulo: 'Letras P-T', descripcion: '', videoUrl: videoUrl('l1-8-pt.mp4'), posterUrl: posterUrl('l1-8-pt.jpg') },
          { tipo: 'video', titulo: 'Letras U-Z + Ñ', descripcion: 'Las últimas letras.', videoUrl: videoUrl('l1-8-uz.mp4'), posterUrl: posterUrl('l1-8-uz.jpg') },
          {
            tipo: 'verdadero-falso',
            pregunta: 'El dactilológico se usa principalmente para deletrear nombres propios y palabras nuevas',
            correcta: true,
            explicacion: 'Verdadero. Las palabras comunes tienen su propia seña. El dactilológico se usa para nombres, marcas, conceptos específicos sin seña propia.',
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // NIVEL 2 · VIDA COTIDIANA
  // ═══════════════════════════════════════════════════════════
  {
    id: 'nivel-2',
    titulo: 'Vida cotidiana',
    descripcion: 'Familia, comida, casa y rutinas',
    color: '#FF6B9D',
    icono: '🏠',
    lecciones: [
      {
        id: 'l2-1',
        titulo: 'Familia nuclear',
        descripcion: 'Mamá, papá, hermanos',
        xp: 25,
        ejercicios: [
          { tipo: 'video', titulo: 'MAMÁ', descripcion: 'Asociada a la mejilla.', videoUrl: videoUrl('l2-1-mama.mp4'), posterUrl: posterUrl('l2-1-mama.jpg') },
          { tipo: 'video', titulo: 'PAPÁ', descripcion: 'Asociada a la frente.', videoUrl: videoUrl('l2-1-papa.mp4'), posterUrl: posterUrl('l2-1-papa.jpg') },
          { tipo: 'video', titulo: 'HERMANO / HERMANA', descripcion: '', videoUrl: videoUrl('l2-1-hermano.mp4'), posterUrl: posterUrl('l2-1-hermano.jpg') },
          { tipo: 'video', titulo: 'HIJO / HIJA', descripcion: '', videoUrl: videoUrl('l2-1-hijo.mp4'), posterUrl: posterUrl('l2-1-hijo.jpg') },
          {
            tipo: 'match',
            pregunta: 'Relaciona la seña con la persona',
            parejas: [
              { izquierda: imagenUrl('l2-1-mama-still.jpg'), derecha: 'Mamá', tipo_izquierda: 'imagen' },
              { izquierda: imagenUrl('l2-1-papa-still.jpg'), derecha: 'Papá', tipo_izquierda: 'imagen' },
              { izquierda: imagenUrl('l2-1-hermano-still.jpg'), derecha: 'Hermano', tipo_izquierda: 'imagen' },
            ],
            explicacion: 'Las señas familiares en LSCh suelen estar relacionadas con áreas específicas del rostro.',
          },
        ],
      },
      {
        id: 'l2-2',
        titulo: 'Familia extendida',
        descripcion: 'Abuelos, tíos, primos',
        xp: 25,
        ejercicios: [
          { tipo: 'video', titulo: 'ABUELA / ABUELO', descripcion: '', videoUrl: videoUrl('l2-2-abuelos.mp4'), posterUrl: posterUrl('l2-2-abuelos.jpg') },
          { tipo: 'video', titulo: 'TÍO / TÍA', descripcion: '', videoUrl: videoUrl('l2-2-tios.mp4'), posterUrl: posterUrl('l2-2-tios.jpg') },
          { tipo: 'video', titulo: 'PRIMO / PRIMA', descripcion: '', videoUrl: videoUrl('l2-2-primos.mp4'), posterUrl: posterUrl('l2-2-primos.jpg') },
        ],
      },
      {
        id: 'l2-3',
        titulo: 'Comidas del día',
        descripcion: 'Desayuno, almuerzo, once, cena',
        xp: 25,
        ejercicios: [
          { tipo: 'video', titulo: 'DESAYUNO', descripcion: '', videoUrl: videoUrl('l2-3-desayuno.mp4'), posterUrl: posterUrl('l2-3-desayuno.jpg') },
          { tipo: 'video', titulo: 'ALMUERZO', descripcion: '', videoUrl: videoUrl('l2-3-almuerzo.mp4'), posterUrl: posterUrl('l2-3-almuerzo.jpg') },
          { tipo: 'video', titulo: 'ONCE', descripcion: 'La once chilena, infaltable.', videoUrl: videoUrl('l2-3-once.mp4'), posterUrl: posterUrl('l2-3-once.jpg') },
          { tipo: 'video', titulo: 'CENA', descripcion: '', videoUrl: videoUrl('l2-3-cena.mp4'), posterUrl: posterUrl('l2-3-cena.jpg') },
          {
            tipo: 'ordenar',
            pregunta: 'Ordena las comidas según el día (de la mañana a la noche)',
            palabras: ['CENA', 'DESAYUNO', 'ONCE', 'ALMUERZO'],
            ordenCorrecto: [1, 3, 2, 0],
            explicacion: 'Desayuno (mañana), Almuerzo (mediodía), Once (tarde), Cena (noche).',
          },
        ],
      },
      {
        id: 'l2-4',
        titulo: 'Bebidas comunes',
        descripcion: 'Agua, café, té, leche',
        xp: 25,
        ejercicios: [
          { tipo: 'video', titulo: 'AGUA', descripcion: '', videoUrl: videoUrl('l2-4-agua.mp4'), posterUrl: posterUrl('l2-4-agua.jpg') },
          { tipo: 'video', titulo: 'CAFÉ', descripcion: '', videoUrl: videoUrl('l2-4-cafe.mp4'), posterUrl: posterUrl('l2-4-cafe.jpg') },
          { tipo: 'video', titulo: 'TÉ', descripcion: '', videoUrl: videoUrl('l2-4-te.mp4'), posterUrl: posterUrl('l2-4-te.jpg') },
          { tipo: 'video', titulo: 'LECHE', descripcion: '', videoUrl: videoUrl('l2-4-leche.mp4'), posterUrl: posterUrl('l2-4-leche.jpg') },
        ],
      },
      {
        id: 'l2-5',
        titulo: 'En la casa',
        descripcion: 'Habitaciones de la casa',
        xp: 30,
        ejercicios: [
          { tipo: 'video', titulo: 'CASA', descripcion: '', videoUrl: videoUrl('l2-5-casa.mp4'), posterUrl: posterUrl('l2-5-casa.jpg') },
          { tipo: 'video', titulo: 'COCINA', descripcion: '', videoUrl: videoUrl('l2-5-cocina.mp4'), posterUrl: posterUrl('l2-5-cocina.jpg') },
          { tipo: 'video', titulo: 'BAÑO', descripcion: 'Crítica saber esta seña.', videoUrl: videoUrl('l2-5-bano.mp4'), posterUrl: posterUrl('l2-5-bano.jpg') },
          { tipo: 'video', titulo: 'DORMITORIO', descripcion: '', videoUrl: videoUrl('l2-5-dormitorio.mp4'), posterUrl: posterUrl('l2-5-dormitorio.jpg') },
        ],
      },
      {
        id: 'l2-6',
        titulo: 'Días de la semana',
        descripcion: 'Lunes a domingo',
        xp: 30,
        ejercicios: [
          { tipo: 'video', titulo: 'LUNES, MARTES, MIÉRCOLES', descripcion: '', videoUrl: videoUrl('l2-6-lun-mie.mp4'), posterUrl: posterUrl('l2-6-lun-mie.jpg') },
          { tipo: 'video', titulo: 'JUEVES, VIERNES', descripcion: '', videoUrl: videoUrl('l2-6-jue-vie.mp4'), posterUrl: posterUrl('l2-6-jue-vie.jpg') },
          { tipo: 'video', titulo: 'SÁBADO, DOMINGO', descripcion: 'El finde.', videoUrl: videoUrl('l2-6-sab-dom.mp4'), posterUrl: posterUrl('l2-6-sab-dom.jpg') },
          {
            tipo: 'completar',
            pregunta: 'El día después del miércoles es:',
            opciones: ['Lunes', 'Jueves', 'Sábado', 'Domingo'],
            correcta: 1,
            explicacion: 'Lunes, martes, miércoles, JUEVES, viernes...',
          },
        ],
      },
      {
        id: 'l2-7',
        titulo: 'Números 1-10',
        descripcion: 'Contar del uno al diez',
        xp: 25,
        ejercicios: [
          { tipo: 'video', titulo: 'Números 1, 2, 3', descripcion: '', videoUrl: videoUrl('l2-7-123.mp4'), posterUrl: posterUrl('l2-7-123.jpg') },
          { tipo: 'video', titulo: 'Números 4, 5, 6', descripcion: '', videoUrl: videoUrl('l2-7-456.mp4'), posterUrl: posterUrl('l2-7-456.jpg') },
          { tipo: 'video', titulo: 'Números 7, 8, 9, 10', descripcion: '', videoUrl: videoUrl('l2-7-78910.mp4'), posterUrl: posterUrl('l2-7-78910.jpg') },
          {
            tipo: 'quiz-video',
            pregunta: '¿Qué número ves?',
            videoUrl: videoUrl('l2-7-numero-mistery.mp4'),
            opciones: ['3', '5', '7', '9'],
            correcta: 1,
            explicacion: 'El 5 se forma con la mano abierta y los cinco dedos extendidos.',
          },
        ],
      },
      {
        id: 'l2-8',
        titulo: 'Colores básicos',
        descripcion: 'Rojo, azul, verde, amarillo',
        xp: 25,
        ejercicios: [
          { tipo: 'video', titulo: 'ROJO', descripcion: '', videoUrl: videoUrl('l2-8-rojo.mp4'), posterUrl: posterUrl('l2-8-rojo.jpg') },
          { tipo: 'video', titulo: 'AZUL', descripcion: '', videoUrl: videoUrl('l2-8-azul.mp4'), posterUrl: posterUrl('l2-8-azul.jpg') },
          { tipo: 'video', titulo: 'VERDE', descripcion: '', videoUrl: videoUrl('l2-8-verde.mp4'), posterUrl: posterUrl('l2-8-verde.jpg') },
          { tipo: 'video', titulo: 'AMARILLO', descripcion: '', videoUrl: videoUrl('l2-8-amarillo.mp4'), posterUrl: posterUrl('l2-8-amarillo.jpg') },
          {
            tipo: 'match',
            pregunta: 'Asocia color con objeto típico',
            parejas: [
              { izquierda: '🍎', derecha: 'Rojo', tipo_izquierda: 'emoji' },
              { izquierda: '🌊', derecha: 'Azul', tipo_izquierda: 'emoji' },
              { izquierda: '🌳', derecha: 'Verde', tipo_izquierda: 'emoji' },
              { izquierda: '☀️', derecha: 'Amarillo', tipo_izquierda: 'emoji' },
            ],
          },
        ],
      },
      {
        id: 'l2-9',
        titulo: 'Sentimientos básicos',
        descripcion: 'Feliz, triste, enojado, cansado',
        xp: 30,
        ejercicios: [
          { tipo: 'video', titulo: 'FELIZ / CONTENTO', descripcion: 'La expresión facial es clave.', videoUrl: videoUrl('l2-9-feliz.mp4'), posterUrl: posterUrl('l2-9-feliz.jpg') },
          { tipo: 'video', titulo: 'TRISTE', descripcion: '', videoUrl: videoUrl('l2-9-triste.mp4'), posterUrl: posterUrl('l2-9-triste.jpg') },
          { tipo: 'video', titulo: 'ENOJADO', descripcion: '', videoUrl: videoUrl('l2-9-enojado.mp4'), posterUrl: posterUrl('l2-9-enojado.jpg') },
          { tipo: 'video', titulo: 'CANSADO', descripcion: '', videoUrl: videoUrl('l2-9-cansado.mp4'), posterUrl: posterUrl('l2-9-cansado.jpg') },
          {
            tipo: 'verdadero-falso',
            pregunta: 'En LSCh puedo decir "estoy feliz" sin sonreír',
            correcta: false,
            explicacion: 'Falso. La expresión facial es parte integral de la seña. Sin sonrisa, FELIZ pierde su significado o se ve incongruente.',
          },
        ],
      },
      {
        id: 'l2-10',
        titulo: 'Verbos cotidianos',
        descripcion: 'Querer, tener, ir, comer',
        xp: 35,
        ejercicios: [
          { tipo: 'video', titulo: 'QUERER', descripcion: '', videoUrl: videoUrl('l2-10-querer.mp4'), posterUrl: posterUrl('l2-10-querer.jpg') },
          { tipo: 'video', titulo: 'TENER', descripcion: '', videoUrl: videoUrl('l2-10-tener.mp4'), posterUrl: posterUrl('l2-10-tener.jpg') },
          { tipo: 'video', titulo: 'IR', descripcion: '', videoUrl: videoUrl('l2-10-ir.mp4'), posterUrl: posterUrl('l2-10-ir.jpg') },
          { tipo: 'video', titulo: 'COMER', descripcion: '', videoUrl: videoUrl('l2-10-comer.mp4'), posterUrl: posterUrl('l2-10-comer.jpg') },
          {
            tipo: 'ordenar',
            pregunta: 'Forma la frase: "Yo quiero comer"',
            palabras: ['COMER', 'YO', 'QUERER'],
            ordenCorrecto: [1, 2, 0],
            explicacion: 'En LSCh: Sujeto + Verbo principal + Objeto. "YO QUERER COMER".',
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // NIVEL 3 · CONVERSACIÓN
  // ═══════════════════════════════════════════════════════════
  {
    id: 'nivel-3',
    titulo: 'Conversación',
    descripcion: 'Preguntas, tiempo y diálogos',
    color: '#4ECDC4',
    icono: '💬',
    lecciones: [
      {
        id: 'l3-1',
        titulo: 'Pronombres interrogativos',
        descripcion: 'Qué, cómo, dónde, cuándo',
        xp: 35,
        ejercicios: [
          { tipo: 'video', titulo: 'QUÉ', descripcion: 'Cejas levantadas, esencial.', videoUrl: videoUrl('l3-1-que.mp4'), posterUrl: posterUrl('l3-1-que.jpg') },
          { tipo: 'video', titulo: 'CÓMO', descripcion: '', videoUrl: videoUrl('l3-1-como.mp4'), posterUrl: posterUrl('l3-1-como.jpg') },
          { tipo: 'video', titulo: 'DÓNDE', descripcion: '', videoUrl: videoUrl('l3-1-donde.mp4'), posterUrl: posterUrl('l3-1-donde.jpg') },
          { tipo: 'video', titulo: 'CUÁNDO', descripcion: '', videoUrl: videoUrl('l3-1-cuando.mp4'), posterUrl: posterUrl('l3-1-cuando.jpg') },
          {
            tipo: 'verdadero-falso',
            pregunta: 'En las preguntas en LSCh, las cejas se mantienen neutras',
            correcta: false,
            explicacion: 'Falso. Las cejas levantadas marcan que es una pregunta, similar al tono de voz que sube en español hablado.',
          },
        ],
      },
      {
        id: 'l3-2',
        titulo: 'Preguntar el nombre',
        descripcion: '¿Cómo te llamas?',
        xp: 30,
        ejercicios: [
          { tipo: 'video', titulo: 'TU NOMBRE QUÉ', descripcion: 'Estructura típica para preguntar.', videoUrl: videoUrl('l3-2-tu-nombre-que.mp4'), posterUrl: posterUrl('l3-2-tu-nombre-que.jpg') },
          {
            tipo: 'ordenar',
            pregunta: 'Forma la pregunta: "¿Cómo te llamas?"',
            palabras: ['QUÉ', 'TU', 'NOMBRE'],
            ordenCorrecto: [1, 2, 0],
            explicacion: 'En LSCh: "TÚ NOMBRE QUÉ" — la palabra interrogativa va al final con cejas levantadas.',
          },
        ],
      },
      {
        id: 'l3-3',
        titulo: 'Preguntar la edad',
        descripcion: '¿Cuántos años tienes?',
        xp: 30,
        ejercicios: [
          { tipo: 'video', titulo: 'EDAD / AÑOS', descripcion: '', videoUrl: videoUrl('l3-3-edad.mp4'), posterUrl: posterUrl('l3-3-edad.jpg') },
          { tipo: 'video', titulo: 'TÚ EDAD CUÁNTOS', descripcion: 'Pregunta completa.', videoUrl: videoUrl('l3-3-tu-edad-cuantos.mp4'), posterUrl: posterUrl('l3-3-tu-edad-cuantos.jpg') },
        ],
      },
      {
        id: 'l3-4',
        titulo: 'Tiempo: hoy, ayer, mañana',
        descripcion: 'Marcar el tiempo en LSCh',
        xp: 35,
        ejercicios: [
          { tipo: 'video', titulo: 'HOY', descripcion: '', videoUrl: videoUrl('l3-4-hoy.mp4'), posterUrl: posterUrl('l3-4-hoy.jpg') },
          { tipo: 'video', titulo: 'AYER', descripcion: '', videoUrl: videoUrl('l3-4-ayer.mp4'), posterUrl: posterUrl('l3-4-ayer.jpg') },
          { tipo: 'video', titulo: 'MAÑANA', descripcion: 'Tiempo futuro.', videoUrl: videoUrl('l3-4-manana.mp4'), posterUrl: posterUrl('l3-4-manana.jpg') },
          {
            tipo: 'texto',
            titulo: 'Cómo funciona el tiempo en LSCh',
            descripcion: 'A diferencia del español, en LSCh los verbos NO se conjugan. El tiempo se indica al inicio de la frase con palabras como AYER, HOY, MAÑANA. "Yo comí" se dice "AYER YO COMER". El verbo no cambia, solo se agrega la marca temporal.',
          },
          {
            tipo: 'ordenar',
            pregunta: 'Forma: "Mañana voy a casa"',
            palabras: ['CASA', 'MAÑANA', 'IR', 'YO'],
            ordenCorrecto: [1, 3, 2, 0],
            explicacion: 'Tiempo + Sujeto + Verbo + Objeto: "MAÑANA YO IR CASA".',
          },
        ],
      },
      {
        id: 'l3-5',
        titulo: 'Lugares de la ciudad',
        descripcion: 'Trabajo, escuela, hospital',
        xp: 30,
        ejercicios: [
          { tipo: 'video', titulo: 'TRABAJO', descripcion: '', videoUrl: videoUrl('l3-5-trabajo.mp4'), posterUrl: posterUrl('l3-5-trabajo.jpg') },
          { tipo: 'video', titulo: 'ESCUELA / COLEGIO', descripcion: '', videoUrl: videoUrl('l3-5-escuela.mp4'), posterUrl: posterUrl('l3-5-escuela.jpg') },
          { tipo: 'video', titulo: 'HOSPITAL', descripcion: '', videoUrl: videoUrl('l3-5-hospital.mp4'), posterUrl: posterUrl('l3-5-hospital.jpg') },
          { tipo: 'video', titulo: 'SUPERMERCADO', descripcion: '', videoUrl: videoUrl('l3-5-supermercado.mp4'), posterUrl: posterUrl('l3-5-supermercado.jpg') },
        ],
      },
      {
        id: 'l3-6',
        titulo: 'Profesiones',
        descripcion: 'Profesor, médico, ingeniero',
        xp: 35,
        ejercicios: [
          { tipo: 'video', titulo: 'PROFESOR / PROFESORA', descripcion: '', videoUrl: videoUrl('l3-6-profesor.mp4'), posterUrl: posterUrl('l3-6-profesor.jpg') },
          { tipo: 'video', titulo: 'MÉDICO / DOCTORA', descripcion: '', videoUrl: videoUrl('l3-6-medico.mp4'), posterUrl: posterUrl('l3-6-medico.jpg') },
          { tipo: 'video', titulo: 'INGENIERO / INGENIERA', descripcion: '', videoUrl: videoUrl('l3-6-ingeniero.mp4'), posterUrl: posterUrl('l3-6-ingeniero.jpg') },
          { tipo: 'video', titulo: 'ESTUDIANTE', descripcion: '', videoUrl: videoUrl('l3-6-estudiante.mp4'), posterUrl: posterUrl('l3-6-estudiante.jpg') },
        ],
      },
      {
        id: 'l3-7',
        titulo: 'Necesidad y ayuda',
        descripcion: 'Necesito, ayuda, urgente',
        xp: 30,
        ejercicios: [
          { tipo: 'video', titulo: 'NECESITAR', descripcion: '', videoUrl: videoUrl('l3-7-necesitar.mp4'), posterUrl: posterUrl('l3-7-necesitar.jpg') },
          { tipo: 'video', titulo: 'AYUDA', descripcion: 'Crítica saber.', videoUrl: videoUrl('l3-7-ayuda.mp4'), posterUrl: posterUrl('l3-7-ayuda.jpg') },
          { tipo: 'video', titulo: 'URGENTE', descripcion: '', videoUrl: videoUrl('l3-7-urgente.mp4'), posterUrl: posterUrl('l3-7-urgente.jpg') },
          {
            tipo: 'completar',
            pregunta: 'Si necesitas asistencia, la seña principal es:',
            opciones: ['HOLA', 'AYUDA', 'CASA', 'NOMBRE'],
            correcta: 1,
            explicacion: 'AYUDA es una de las señas más críticas para situaciones de emergencia.',
          },
        ],
      },
      {
        id: 'l3-8',
        titulo: 'Emociones complejas',
        descripcion: 'Nervioso, emocionado, preocupado',
        xp: 35,
        ejercicios: [
          { tipo: 'video', titulo: 'NERVIOSO', descripcion: '', videoUrl: videoUrl('l3-8-nervioso.mp4'), posterUrl: posterUrl('l3-8-nervioso.jpg') },
          { tipo: 'video', titulo: 'EMOCIONADO', descripcion: '', videoUrl: videoUrl('l3-8-emocionado.mp4'), posterUrl: posterUrl('l3-8-emocionado.jpg') },
          { tipo: 'video', titulo: 'PREOCUPADO', descripcion: '', videoUrl: videoUrl('l3-8-preocupado.mp4'), posterUrl: posterUrl('l3-8-preocupado.jpg') },
        ],
      },
      {
        id: 'l3-9',
        titulo: 'Diálogo final',
        descripcion: 'Conversación completa',
        xp: 50,
        ejercicios: [
          { tipo: 'video', titulo: 'Diálogo: dos personas se conocen', descripcion: 'Aplicación de todo lo aprendido.', videoUrl: videoUrl('l3-9-dialogo.mp4'), posterUrl: posterUrl('l3-9-dialogo.jpg') },
          {
            tipo: 'ordenar',
            pregunta: 'Reconstruye el diálogo en orden lógico',
            palabras: ['HOLA', 'TÚ NOMBRE QUÉ', 'MI NOMBRE [X]', 'MUCHO GUSTO', 'CHAO'],
            ordenCorrecto: [0, 1, 2, 3, 4],
            explicacion: '¡Felicitaciones! Acabas de simular tu primera conversación en LSCh.',
          },
          {
            tipo: 'texto',
            titulo: '¡Lo lograste!',
            descripcion: 'Has completado los fundamentos de la LSCh. Esto es solo el principio: la lengua de señas es vasta, viva y cambia. Te invitamos a seguir aprendiendo con personas sordas reales — la única forma de dominar una lengua es usándola.',
          },
        ],
      },
    ],
  },
];
