'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function VolverArriba() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const actualizar = () => setVisible(window.scrollY > 500);
    actualizar();
    window.addEventListener('scroll', actualizar, { passive: true });
    return () => window.removeEventListener('scroll', actualizar);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 z-40 w-12 h-12 bg-[#FFD23F] border-[3px] border-black flex items-center justify-center hover:-translate-y-1 active:translate-y-0 transition-transform"
      style={{ boxShadow: '5px 5px 0 #000' }}
      aria-label="Volver arriba"
      title="Volver arriba"
    >
      <ArrowUp size={24} strokeWidth={4} className="text-black" />
    </button>
  );
}
