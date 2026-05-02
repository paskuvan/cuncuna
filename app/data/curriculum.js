// ============================================================
// CURRÍCULUM DE CUNCUNA
// Aquí defines toda la estructura educativa de la app.
// Para agregar lecciones nuevas, solo edita este archivo.
//
// Estructura:
//   Niveles → Lecciones → Ejercicios
//
// Tipos de ejercicio disponibles:
//   - 'video'        → muestra un video con descripción
//   - 'quiz'         → pregunta de opción múltiple
//   - 'quiz-imagen'  → pregunta con imagen de referencia
// ============================================================

export const CURRICULUM = [
  {
    id: 'nivel-1',
    titulo: 'Fundamentos',
    descripcion: 'Saludos, alfabeto y expresiones básicas',
    color: '#FFD23F',
    icono: '👋',
    lecciones: [
      {
        id: 'l1-1',
        titulo: 'Saludos básicos',
        descripcion: 'Hola, buenos días, buenas tardes',
        xp: 20,
        ejercicios: [
          {
            tipo: 'video',
            titulo: 'Mira la seña: HOLA',
            descripcion: 'Observa con atención cómo se realiza la seña de "Hola" en LSCh.',
            videoUrl: '/videos/hola.mp4',
            posterUrl: '/posters/hola.jpg',
          },
          {
            tipo: 'quiz',
            pregunta: '¿Qué seña acabas de aprender?',
            opciones: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
            correcta: 0,
            explicacion: '¡Correcto! La seña de "Hola" se realiza con la mano abierta moviéndose lateralmente.',
          },
          {
            tipo: 'video',
            titulo: 'Mira la seña: BUENOS DÍAS',
            descripcion: 'Esta seña combina el saludo con el tiempo del día.',
            videoUrl: '/videos/buenos-dias.mp4',
            posterUrl: '/posters/buenos-dias.jpg',
          },
          {
            tipo: 'quiz-imagen',
            pregunta: '¿Qué muestra esta imagen?',
            imagenUrl: '/imagenes/saludo-mañana.jpg',
            opciones: ['Buenos días', 'Buenas noches', 'Hola', 'Gracias'],
            correcta: 0,
            explicacion: 'La seña de "Buenos días" combina el sol naciente con el saludo.',
          },
        ],
      },
      {
        id: 'l1-2',
        titulo: 'Alfabeto manual',
        descripcion: 'Las letras A-E del alfabeto LSCh',
        xp: 25,
        ejercicios: [
          {
            tipo: 'video',
            titulo: 'Letras A-E',
            descripcion: 'Aprende las primeras cinco letras del alfabeto manual chileno.',
            videoUrl: '/videos/alfabeto-a-e.mp4',
            posterUrl: '/posters/alfabeto.jpg',
          },
          {
            tipo: 'quiz',
            pregunta: '¿Cuántas letras tiene el alfabeto manual de LSCh?',
            opciones: ['24', '26', '27', '29'],
            correcta: 2,
            explicacion: 'El alfabeto manual chileno tiene 27 configuraciones, incluyendo la Ñ.',
          },
        ],
      },
      {
        id: 'l1-3',
        titulo: 'Despedidas',
        descripcion: 'Adiós, hasta luego, nos vemos',
        xp: 20,
        ejercicios: [
          {
            tipo: 'video',
            titulo: 'Diferentes despedidas',
            descripcion: 'Existen varias formas de despedirse en LSCh.',
            videoUrl: '/videos/despedidas.mp4',
            posterUrl: '/posters/despedidas.jpg',
          },
          {
            tipo: 'quiz',
            pregunta: '¿Cuál es la seña más común para "adiós"?',
            opciones: [
              'Mano abierta moviéndose de lado a lado',
              'Puño cerrado golpeando el pecho',
              'Dedo índice apuntando hacia arriba',
              'Mano formando una L',
            ],
            correcta: 0,
            explicacion: 'La despedida más común es similar al gesto universal de saludo.',
          },
        ],
      },
    ],
  },
  {
    id: 'nivel-2',
    titulo: 'Vida cotidiana',
    descripcion: 'Familia, comida y rutinas',
    color: '#FF6B9D',
    icono: '🏠',
    lecciones: [
      {
        id: 'l2-1',
        titulo: 'La familia',
        descripcion: 'Mamá, papá, hermanos',
        xp: 30,
        ejercicios: [
          {
            tipo: 'video',
            titulo: 'Familia nuclear',
            descripcion: 'Aprende las señas de los miembros principales de la familia.',
            videoUrl: '/videos/familia.mp4',
            posterUrl: '/posters/familia.jpg',
          },
          {
            tipo: 'quiz',
            pregunta: '¿Cómo se diferencian las señas de "mamá" y "papá" en LSCh?',
            opciones: [
              'Por la posición de la mano en el rostro',
              'Por el número de dedos',
              'Por la velocidad del movimiento',
              'No hay diferencia',
            ],
            correcta: 0,
            explicacion: 'En LSCh, "mamá" se relaciona con la mejilla y "papá" con la frente o sien.',
          },
        ],
      },
      {
        id: 'l2-2',
        titulo: 'Comidas',
        descripcion: 'Desayuno, almuerzo, cena',
        xp: 25,
        ejercicios: [
          {
            tipo: 'video',
            titulo: 'Comidas del día',
            descripcion: 'Las tres comidas principales en LSCh.',
            videoUrl: '/videos/comidas.mp4',
            posterUrl: '/posters/comidas.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'nivel-3',
    titulo: 'Conversación',
    descripcion: 'Preguntas y diálogos',
    color: '#4ECDC4',
    icono: '💬',
    lecciones: [
      {
        id: 'l3-1',
        titulo: 'Preguntas básicas',
        descripcion: 'Qué, cómo, dónde, cuándo',
        xp: 35,
        ejercicios: [
          {
            tipo: 'video',
            titulo: 'Pronombres interrogativos',
            descripcion: 'Las expresiones faciales son clave en las preguntas.',
            videoUrl: '/videos/preguntas.mp4',
            posterUrl: '/posters/preguntas.jpg',
          },
        ],
      },
    ],
  },
];
