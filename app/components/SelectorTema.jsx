'use client';

import { Moon, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SelectorTema() {
  const pathname = usePathname();

  const alternarTema = () => {
    const siguiente = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', siguiente);
    try {
      window.localStorage.setItem('cuncuna:tema', siguiente ? 'oscuro' : 'claro');
    } catch {}
  };

  // La landing y la zona /app tienen su propio toggle inline; ocultamos el flotante ahí.
  if (pathname === '/' || pathname?.startsWith('/app')) return null;

  return (
    <button
      type="button"
      onClick={alternarTema}
      className="selector-tema fixed bottom-5 left-5 z-40 grid place-items-center w-11 h-11 rounded-xl border border-black/10 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50 transition-colors"
      aria-label="Cambiar modo claro u oscuro"
      title="Cambiar tema"
    >
      <Moon size={20} className="icono-tema-claro" />
      <Sun size={20} className="icono-tema-oscuro" />
    </button>
  );
}
