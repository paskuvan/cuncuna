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
      className="fixed bottom-5 right-5 z-40 grid place-items-center w-11 h-11 rounded-xl bg-violet-600 text-white shadow-lg hover:bg-violet-700 transition-colors"
      aria-label="Volver arriba"
      title="Volver arriba"
    >
      <ArrowUp size={20} />
    </button>
  );
}
