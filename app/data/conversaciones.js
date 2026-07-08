export const CONVERSACIONES = [
  {
    id: 'saludo-basico',
    titulo: 'Saludo básico',
    contexto: 'Te encuentras con una persona sorda al comenzar una clase de LSCh.',
    color: '#FFD23F',
    pasos: [
      {
        escena: 'La otra persona te mira y levanta la mano para iniciar la interacción.',
        pregunta: '¿Qué respuesta abre mejor la conversación?',
        opciones: ['HOLA', 'NO ENTIENDO', 'PERDÓN', 'CHAO'],
        correcta: 0,
        explicacion: 'HOLA es la forma natural de abrir una interacción.',
      },
      {
        escena: 'Después del saludo, quieres presentarte.',
        pregunta: '¿Qué estructura usarías?',
        opciones: ['MI NOMBRE + [tu nombre]', 'GRACIAS + CHAO', 'NO + PERDÓN', 'SÍ + NO'],
        correcta: 0,
        explicacion: 'Para presentarte, MI NOMBRE + tu nombre es la base.',
      },
      {
        escena: 'La otra persona se presenta también.',
        pregunta: '¿Cómo cierras de forma amable?',
        opciones: ['MUCHO GUSTO', 'NO', 'BUENOS DÍAS', 'YO'],
        correcta: 0,
        explicacion: 'MUCHO GUSTO cierra bien una presentación inicial.',
      },
    ],
  },
  {
    id: 'pedir-repeticion',
    titulo: 'Pedir que repitan',
    contexto: 'Estás aprendiendo y alguien hace una seña demasiado rápido.',
    color: '#4ECDC4',
    pasos: [
      {
        escena: 'No alcanzaste a entender la seña.',
        pregunta: '¿Qué seña comunica mejor la situación?',
        opciones: ['NO ENTIENDO', 'GRACIAS', 'HOLA', 'NOSOTROS'],
        correcta: 0,
        explicacion: 'NO ENTIENDO es clara y respetuosa cuando necesitas apoyo.',
      },
      {
        escena: 'La persona repite más lento y ahora sí comprendes.',
        pregunta: '¿Qué respuesta corresponde?',
        opciones: ['ENTIENDO', 'CHAO', 'PERDÓN', 'ÉL / ELLA'],
        correcta: 0,
        explicacion: 'ENTIENDO confirma que ya pudiste seguir la conversación.',
      },
      {
        escena: 'Quieres agradecer la ayuda.',
        pregunta: '¿Qué seña usarías?',
        opciones: ['GRACIAS', 'NO', 'YO', 'BUENOS DÍAS'],
        correcta: 0,
        explicacion: 'GRACIAS reconoce la ayuda de la otra persona.',
      },
    ],
  },
  {
    id: 'despedida-cordial',
    titulo: 'Despedida cordial',
    contexto: 'Terminó una breve práctica y quieres cerrar con respeto.',
    color: '#FF6B9D',
    pasos: [
      {
        escena: 'La práctica termina bien.',
        pregunta: '¿Qué seña expresa cortesía antes de irte?',
        opciones: ['GRACIAS', 'NO ENTIENDO', 'TÚ', 'SÍ'],
        correcta: 0,
        explicacion: 'GRACIAS es una buena señal de cierre respetuoso.',
      },
      {
        escena: 'Quieres despedirte.',
        pregunta: '¿Qué seña corresponde?',
        opciones: ['CHAO', 'YO', 'POR FAVOR', 'NO'],
        correcta: 0,
        explicacion: 'CHAO cierra la interacción de forma simple.',
      },
      {
        escena: 'La otra persona responde con una despedida.',
        pregunta: '¿Qué actitud comunicativa conviene mantener?',
        opciones: [
          'Mirada atenta y expresión facial clara',
          'Mirar el suelo',
          'Taparse las manos',
          'Darse vuelta de inmediato',
        ],
        correcta: 0,
        explicacion: 'La atención visual y la expresión facial son parte de la comunicación en LSCh.',
      },
    ],
  },
];
