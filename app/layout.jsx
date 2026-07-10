import './globals.css';
import VolverArriba from './components/VolverArriba';
import SelectorTema from './components/SelectorTema';

export const metadata = {
  title: 'Cuncuna · Aprende LSCh',
  description: 'Plataforma de aprendizaje de Lengua de Señas Chilena, de seña en seña.',
  manifest: '/manifest.json',
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
      </body>
    </html>
  );
}
