'use client';

import { Moon, Sun } from 'lucide-react';

export default function SelectorTema() {
  const alternarTema = () => {
    const oscuro = document.documentElement.classList.toggle('dark');
    window.localStorage.setItem('cuncuna:tema', oscuro ? 'oscuro' : 'claro');
  };

  return (
    <button
      type="button"
      onClick={alternarTema}
      className="selector-tema fixed bottom-5 left-5 z-40 w-12 h-12 bg-white border-[3px] border-black flex items-center justify-center hover:-translate-y-1 active:translate-y-0 transition-transform"
      style={{ boxShadow: '5px 5px 0 #000' }}
      aria-label="Cambiar modo claro u oscuro"
      title="Cambiar tema"
    >
      <Moon size={23} strokeWidth={3} className="icono-tema-claro text-black" />
      <Sun size={23} strokeWidth={3} className="icono-tema-oscuro text-black" />
    </button>
  );
}
