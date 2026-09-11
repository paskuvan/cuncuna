import './globals.css';
import VolverArriba from './components/VolverArriba';
import SelectorTema from './components/SelectorTema';
import RegistrarSW from './components/RegistrarSW';

// URL pública del sitio. Definir NEXT_PUBLIC_SITE_URL en producción
// (ej: https://cuncuna.cl) para que las OG cards y el sitemap usen el
// dominio real en vez de localhost.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const TITULO = 'Cuncuna · Aprende Lengua de Señas Chilena';
const DESCRIPCION =
  'Plataforma educativa para aprender Lengua de Señas Chilena (LSCh): lecciones interactivas, gamificadas y visuales. De seña en seña.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITULO,
    template: '%s · Cuncuna',
  },
  description: DESCRIPCION,
  applicationName: 'Cuncuna',
  keywords: [
    'LSCh',
    'lengua de señas chilena',
    'aprender señas',
    'lengua de señas',
    'Chile',
    'accesibilidad',
    'sordos',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Cuncuna',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'Cuncuna',
    title: TITULO,
    description: DESCRIPCION,
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Cuncuna · Aprende Lengua de Señas Chilena',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITULO,
    description: DESCRIPCION,
    images: ['/android-chrome-512x512.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const tema = localStorage.getItem('cuncuna:tema');
                const oscuro = tema === 'oscuro' ||
                  (!tema && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.classList.toggle('dark', oscuro);
              } catch {}
            `,
          }}
        />
      </head>
      <body className="font-sans">
        {children}
        <SelectorTema />
        <VolverArriba />
        <RegistrarSW />
      </body>
    </html>
  );
}
