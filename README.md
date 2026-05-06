<div align="center">

# 🐛 Cuncuna

### Aprende Lengua de Señas Chilena, de seña en seña

**La primera plataforma educativa con identidad neobrutalista para aprender LSCh**

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[![License](https://img.shields.io/badge/license-MIT-FFD23F?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/status-en%20desarrollo-FF6B9D?style=flat-square)]()
[![Made in Chile](https://img.shields.io/badge/made%20in-Chile%20🇨🇱-4ECDC4?style=flat-square)]()
[![Accessibility](https://img.shields.io/badge/a11y-deaf%20first-7FFF6B?style=flat-square)]()

</div>

---

## ✨ Sobre el proyecto

**Cuncuna** es una plataforma de aprendizaje gamificada de **Lengua de Señas Chilena (LSCh)** inspirada en Duolingo, con una identidad visual neobrutalista única y un enfoque centrado en la comunidad sorda chilena.

El nombre viene de la **cuncuna**, oruga característica del paisaje chileno que se transforma en mariposa — metáfora perfecta del aprendizaje paso a paso.

> 🤟 *"De seña en seña"*

### 🎯 ¿Por qué Cuncuna?

- 🇨🇱 **Específica para Chile**: contenido en LSCh, no LSE ni ASL
- 👀 **Visual primero**: diseñada por y para personas sordas
- 🎮 **Gamificada**: sistema de XP, rachas, logros y mascota emocional
- 🎨 **Identidad propia**: estética neobrutalista que destaca entre apps educativas genéricas

---

## 🛠️ Stack tecnológico

| Categoría | Tecnología |
|-----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **UI** | React 19 + Tailwind CSS 4 |
| **Auth** | Supabase Auth (Google OAuth) |
| **Base de datos** | Supabase (PostgreSQL + RLS) |
| **Storage** | Supabase Storage (videos + imágenes) |
| **Iconos** | Lucide React |
| **Tipografía** | Archivo Black + Archivo (Google Fonts) |

---

## 🎨 Identidad visual

Cuncuna usa una estética **neobrutalista** consistente en toda la app:

- 🟨 Bordes negros gruesos (3-4px)
- 🎯 Hard shadows sin desenfoque
- 🌈 Paleta vibrante de alto contraste
- 📐 Tipografía sans-serif geométrica

### Paleta

| Color | Hex | Uso |
|-------|-----|-----|
| 🟡 Amarillo | `#FFD23F` | Principal, CTAs |
| 🩷 Rosa | `#FF6B9D` | Acentos, cachetes |
| 🩵 Turquesa | `#4ECDC4` | Nivel 3, lágrimas |
| 🟢 Verde | `#7FFF6B` | Acierto, confirmación |
| 🔴 Coral | `#FF6B6B` | Error, peligro |
| ⚫ Negro | `#000000` | Bordes, texto |
| 🤍 Crema | `#F5F0E8` | Fondo general |

---

## 🚀 Características

### ✅ Implementado

- [x] 🔐 **Autenticación con Google** (Supabase OAuth)
- [x] 🛡️ **Row Level Security** en todas las tablas
- [x] 📚 **Sistema de lecciones** estructuradas por niveles
- [x] 🎬 **Reproductor de video** neobrutalista con controles
- [x] 🎯 **Cuestionarios interactivos** de opción múltiple
- [x] 📊 **Progreso persistente** sincronizado en la nube
- [x] 🔥 **Sistema de rachas** y XP acumulado
- [x] 🏆 **12 logros desbloqueables** con detección automática
- [x] 🎉 **Modal celebratorio** al desbloquear logros
- [x] 🐛 **Mascota con 8 estados emocionales** animados
- [x] 🔄 **Verificación retroactiva** de logros
- [x] 📱 **Diseño responsive** (móvil + desktop)

### 🚧 En desarrollo

- [ ] 🎥 Contenido de videos LSCh reales
- [ ] 🌐 Landing page pública
- [ ] 📊 Dashboard de estadísticas
- [ ] 📴 Modo offline / PWA
- [ ] 🤝 Integración con redes sociales
- [ ] 🎓 Certificado de finalización

---

## 📦 Instalación

### Pre-requisitos

- Node.js 18+
- npm o yarn
- Cuenta de [Supabase](https://supabase.com)
- Cuenta de Google Cloud (para OAuth)

### Pasos

```bash
# 1. Clonar el repo
git clone https://github.com/paskuvan/cuncuna.git
cd cuncuna

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Edita .env.local con tus credenciales de Supabase

# 4. Ejecutar SQL en Supabase
# Pega el contenido de sql/schema.sql en el SQL Editor

# 5. Levantar el dev server
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

---

## 🗂️ Estructura del proyecto

```
cuncuna/
├── app/
│   ├── components/
│   │   ├── mascota/           # 8 estados de la cuncuna
│   │   ├── Mapa.jsx           # Vista principal
│   │   ├── VistaLeccion.jsx   # Flujo de lección
│   │   ├── Quiz.jsx           # Cuestionarios
│   │   ├── VideoPlayer.jsx    # Reproductor
│   │   ├── ModalLogroNuevo.jsx
│   │   └── UsuarioMenu.jsx
│   │
│   ├── data/
│   │   ├── curriculum.js      # Contenido educativo
│   │   └── logros.js          # Catálogo de badges
│   │
│   ├── hooks/
│   │   ├── useProgreso.js     # Estado del progreso
│   │   ├── useLogros.js       # Sistema de logros
│   │   └── useUsuario.js      # Auth state
│   │
│   ├── lib/
│   │   ├── supabase-client.js
│   │   ├── supabase-server.js
│   │   └── storage.js         # Helper de URLs
│   │
│   ├── login/                 # Pantalla de login
│   ├── auth/callback/         # OAuth callback
│   ├── logros/                # Galería de badges
│   ├── layout.jsx
│   └── page.jsx               # Punto de entrada
│
├── public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── logos/                 # SVGs del logo
│   └── (videos y posters van en Supabase Storage)
│
├── sql/
│   ├── schema.sql             # Schema base
│   └── logros-schema.sql      # Tablas de logros
│
├── middleware.js              # Protección de rutas
└── package.json
```

---

## 🐛 La mascota Cuncuna

Cuncuna tiene **8 estados emocionales** animados que reaccionan a la actividad del usuario:

| Estado | Cuándo aparece |
|--------|----------------|
| 🙂 **Idle** | Header, estado base |
| 👋 **Saludando** | Pantalla de login, bienvenida |
| 🎉 **Celebrando** | Lección completa, logro nuevo |
| 🤔 **Pensando** | Loaders, durante quizzes |
| 😢 **Triste** | Quiz fallado |
| 😴 **Durmiendo** | Empty states, sin actividad |
| 🤓 **Estudiando** | Durante lecciones activas |
| 🦋 **Mariposa** | Curso completado |

```jsx
import Cuncuna from './components/mascota/Cuncuna';

<Cuncuna estado="celebrando" size={120} />
```

---

## 🏆 Sistema de logros

12 badges desbloqueables organizados en categorías:

- 🌱 **Inicio**: Primera Cuncuna
- ⭐ **XP**: 100 XP, 500 XP
- 🎯 **Niveles**: Saludador, Familiar, Conversador
- 🔥 **Constancia**: 3, 7, 30 días seguidos
- 📹 **Actividad**: Observador, Quiz Master
- 🦋 **Final**: Cuncuna Mariposa

---

## 📚 Contenido educativo

El currículum está organizado en niveles progresivos:

### 🌱 Nivel 1 · Fundamentos
Saludos, alfabeto manual, despedidas

### 🏠 Nivel 2 · Vida cotidiana
Familia, comidas, rutinas

### 💬 Nivel 3 · Conversación
Preguntas, diálogos, expresiones

> 💡 El contenido vive en `app/data/curriculum.js` — fácil de extender sin tocar lógica.

---

## 🤝 Contribuir

Cuncuna está construida **por y para la comunidad sorda chilena**. Si quieres aportar:

- 🎥 **Contenido**: si eres usuario/a nativo/a de LSCh, tu feedback sobre las señas es invaluable
- 🎨 **Diseño**: ideas para nuevas mascotas o estados
- 💻 **Código**: revisa los issues abiertos
- ♿ **Accesibilidad**: sugerencias para mejorar la experiencia

Por favor abre un issue antes de mandar un PR grande para discutir el cambio.

---

## 📜 Licencia

[MIT](LICENSE) © 2026 [Majo Paskuvan](https://github.com/paskuvan)

---

## 🌟 Créditos

- **Diseño y desarrollo**: [Majo Paskuvan](https://paskuvan.us) — UX/UI Designer & Frontend Dev
- **Marca**: parte del ecosistema [Códiseñas](https://codisenas.cl)
- **Inspiración**: [Duolingo](https://duolingo.com), pero hecho con cariño chileno
- **Para**: la comunidad sorda chilena 🇨🇱

---

<div align="center">

### 🤟 Hecho con cariño en Santiago, Chile

**Cuncuna** es parte de **Códiseñas** — democratizando el acceso a la tecnología y educación para personas sordas.

[🌐 paskuvan.us](https://paskuvan.us) · [💼 LinkedIn](https://linkedin.com/in/paskuvan) · [📧 Contacto](mailto:hola@codisenas.cl)

</div>
