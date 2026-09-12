'use client';

import { Moon, Sun } from 'lucide-react';

// Botón para alternar claro/oscuro. Los iconos se muestran/ocultan por CSS
// según la clase .dark del <html> (sin estado), evitando parpadeos e
// inconsistencias de hidratación.
export default function ThemeToggle({ className = '' }) {
  const alternar = () => {
    const siguiente = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', siguiente);
    try {
      localStorage.setItem('cuncuna:tema', siguiente ? 'oscuro' : 'claro');
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label="Cambiar modo claro u oscuro"
      title="Cambiar tema"
      className={
        className ||
        'grid place-items-center w-10 h-10 rounded-xl border border-black/10 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors'
      }
    >
      <Moon size={18} className="icono-tema-claro" />
      <Sun size={18} className="icono-tema-oscuro" />
    </button>
  );
}
