import { Archivo, Archivo_Black } from 'next/font/google';
import './globals.css';
import VolverArriba from './components/VolverArriba';

// Fuentes optimizadas con next/font (mejor performance que <link>)
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['400', '500', '700', '900'],
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  variable: '--font-archivo-black',
  weight: ['400'],
});

export const metadata = {
  title: 'Cuncuna · Aprende LSCh',
  description: 'Plataforma de aprendizaje de Lengua de Señas Chilena, de seña en seña.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${archivo.variable} ${archivoBlack.variable}`}>
      <body className="font-sans">
        {children}
        <VolverArriba />
      </body>
    </html>
  );
}
