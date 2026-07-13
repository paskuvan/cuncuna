<div align="center">

# Cuncuna

### Aprende Lengua de Señas Chilena, de seña en seña

**Plataforma gamificada para personas oyentes que quieren aprender LSCh**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

[![Status](https://img.shields.io/badge/status-MVP%20en%20desarrollo-FF6B9D?style=flat-square)]()
[![Made in Chile](https://img.shields.io/badge/made%20in-Chile-4ECDC4?style=flat-square)]()
[![Audience](https://img.shields.io/badge/audiencia-personas%20oyentes-7FFF6B?style=flat-square)]()

</div>

---

## Sobre el proyecto

**Cuncuna** es una app educativa tipo Duolingo para aprender **Lengua de Señas Chilena (LSCh)**. Está pensada para personas oyentes que quieren iniciar una ruta de aprendizaje visual, progresiva y respetuosa.

El contenido debe ser creado o validado junto a personas sordas, docentes de LSCh o usuarios nativos de la lengua.

> "De seña en seña"

---

## Stack

| Categoria | Tecnologia |
|-----------|------------|
| Framework | Next.js 16 App Router |
| UI | React 19 + Tailwind CSS 4 |
| Auth | Supabase Auth con Google OAuth |
| Base de datos | Supabase PostgreSQL + RLS |
| Storage | Supabase Storage para videos y posters |
| Iconos | Lucide React |
| Tipografia | Fuentes del sistema, sin dependencia de Google Fonts |

---

## Funcionalidades implementadas

- Autenticacion con Google mediante Supabase.
- Landing publica con planes Gratis, Plus y Familia.
- Flujo de seleccion de suscripcion en `/suscripcion`.
- Control de acceso por plan:
  - Gratis: introduccion y primeras lecciones.
  - Plus/Familia: curso completo.
- Mapa de aprendizaje con niveles, XP y racha.
- Lecciones con video, texto, quiz, verdadero/falso, ordenar, match y completar.
- Diccionario visual filtrado por plan.
- Repaso inteligente con repeticion espaciada.
- Mis errores.
- Misiones diarias.
- Estadisticas.
- Conversaciones guiadas.
- Favoritos.
- Practica con camara local, sin grabar ni subir video.
- Onboarding personalizado en `/app/onboarding`.
- Perfil de usuario en `/app/perfil`.
- Recordatorios locales en `/app/recordatorios`.
- Modo oscuro.
- Boton global para volver arriba.
- Panel admin de contenido en `/app/admin`.
- Carga de videos/posters a Supabase Storage desde admin.
- Flujo de borrador, vista previa y publicacion de contenido.
- Paginas legales:
  - Terminos y condiciones.
  - Politica de privacidad.
  - Politica de cancelacion y reembolsos.
  - Soporte.
- PWA/service worker preparado para cache y push futuro.

---

## Estado del MVP

La app ya tiene la mayoria de la experiencia funcional. Antes de produccion faltan principalmente:

- Integrar pagos reales con Mercado Pago.
- Guardar el estado real de suscripcion en Supabase.
- Cambiar el acceso por plan desde localStorage a Supabase/Mercado Pago.
- Sincronizar datos locales: favoritos, errores, misiones, recordatorios, onboarding y repaso.
- Subir videos reales de LSCh.
- Revisar textos legales con un abogado en Chile antes de cobrar.
- Probar exhaustivamente en mobile, modo oscuro y navegadores principales.

---

## Instalacion

### Requisitos

- Node.js 18 o superior.
- npm.
- Proyecto en Supabase.
- Google OAuth configurado en Supabase Auth.

### Pasos

```bash
git clone https://github.com/paskuvan/cuncuna.git
cd cuncuna
npm install
cp .env.local.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

# Opcional: notificar al correo admin por cada registro en lista de espera.
RESEND_API_KEY=re_xxxxxxxxx
WAITLIST_NOTIFY_TO=tu-correo@gmail.com
WAITLIST_NOTIFY_FROM=Cuncuna <onboarding@resend.dev>
```

---

## Lista de espera por correo

La pagina publica esta en:

```txt
/lista-espera
```

El formulario guarda cada email en la tabla `waitlist` de Supabase mediante:

```txt
/api/waitlist
```

Si quieres recibir un aviso en tu correo por cada nuevo registro:

1. Crea una cuenta en Resend.
2. Obtén una API key.
3. Agrega estas variables a `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxx
WAITLIST_NOTIFY_TO=tu-correo@gmail.com
WAITLIST_NOTIFY_FROM=Cuncuna <onboarding@resend.dev>
```

4. Reinicia el servidor con `npm run dev`.

Si esas variables no existen, la lista de espera igual seguirá guardando emails en Supabase, pero no enviará aviso por correo.

---

## Supabase

El proyecto usa:

- Supabase Auth para login con Google.
- PostgreSQL con RLS para datos de usuario.
- Supabase Storage para buckets `videos` y `posters`.
- Tabla `admin_users` para controlar acceso al panel admin.
- Tabla `contenido_senas` para contenido subido desde el panel.

Migraciones actuales:

```txt
supabase/migrations/20260708_panel_contenido.sql
supabase/migrations/20260708_lectura_contenido_publicado.sql
```

Para dar acceso admin:

```sql
insert into public.admin_users (user_id)
select id
from auth.users
where email = 'TU_CORREO@gmail.com'
on conflict (user_id) do nothing;
```

---

## Estructura

```txt
cuncuna/
├── app/
│   ├── app/
│   │   ├── admin/
│   │   ├── conversaciones/
│   │   ├── diccionario/
│   │   ├── errores/
│   │   ├── estadisticas/
│   │   ├── favoritos/
│   │   ├── logros/
│   │   ├── misiones/
│   │   ├── onboarding/
│   │   ├── perfil/
│   │   ├── practica/
│   │   ├── recordatorios/
│   │   ├── repaso/
│   │   └── page.jsx
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── legal/
│   ├── lib/
│   ├── login/
│   ├── soporte/
│   ├── suscripcion/
│   ├── layout.jsx
│   └── page.jsx
├── public/
├── supabase/migrations/
└── package.json
```

---

## Currículum

El contenido vive en `app/data/curriculum.js`.

Estructura actual:

- Nivel 0: Introduccion a la LSCh.
- Nivel 1: Fundamentos.
- Nivel 2: Vida cotidiana.
- Nivel 3: Conversacion.

El curso completo referencia cerca de **85 videos**. Para un MVP de produccion conviene partir con **15 a 20 videos reales** del Nivel 1, bien grabados y validados.

---

## Planes

El control de acceso actual esta centralizado en:

```txt
app/lib/acceso-plan.js
```

Por ahora usa la seleccion local de:

```txt
app/lib/seleccion-plan-local.js
```

Cuando Mercado Pago este conectado, este helper debe leer el estado real de suscripcion desde Supabase.

---

## Comandos

```bash
npm run dev
npm run lint
npm run build
```

---

## Privacidad y camara

La practica con camara es local:

- No graba video.
- No sube imagenes.
- No analiza con IA.
- La camara se activa solo cuando el usuario lo solicita.

Esto es importante para mantener confianza y privacidad, especialmente durante practica de expresiones faciales y señas.

---

## Contribuir

Cuncuna debe crecer con respeto por la LSCh y por las personas sordas. Aportes utiles:

- Validacion linguistica y cultural.
- Videos reales de señas.
- Mejoras de accesibilidad.
- Pruebas en dispositivos moviles.
- Integracion de pagos y sincronizacion en Supabase.

---

## Creditos

- Diseño y desarrollo: Majo Paskuvan.
- Marca: Códiseñas.
- Inspiracion: Duolingo, con identidad chilena propia.
- Audiencia: personas oyentes que quieren aprender LSCh.

---

<div align="center">

### Hecho en Santiago, Chile

**Cuncuna** es parte de **Códiseñas**.

[codisenas.com](https://codisenas.com) · [Contacto](mailto:hola@codisenas.cl)

</div>
