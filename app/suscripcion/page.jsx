import { Suspense } from 'react';
import SelectorSuscripcion from './selector-suscripcion';

export default function PaginaSuscripcion() {
  return (
    <Suspense fallback={<CargandoSuscripcion />}>
      <SelectorSuscripcion />
    </Suspense>
  );
}

function CargandoSuscripcion() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
      <p className="bg-[#FFD23F] border-[4px] border-black p-5 font-black uppercase text-black">
        Preparando planes...
      </p>
    </div>
  );
}
