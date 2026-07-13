'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function FormularioListaEspera({
  origen = 'landing',
  variante = 'compacta',
}) {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState('idle');
  const [mensajeError, setMensajeError] = useState('');

  const enviar = async (event) => {
    event.preventDefault();
    if (!email) return;

    setEstado('enviando');
    setMensajeError('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, origen }),
      });

      const data = await res.json();

      if (data.duplicado) {
        setEstado('duplicado');
        return;
      }

      if (data.ok) {
        setEstado('exito');
        setEmail('');
        return;
      }

      setEstado('error');
      setMensajeError(data.error || 'No pudimos registrarte.');
    } catch {
      setEstado('error');
      setMensajeError('Error de conexión. Intenta nuevamente.');
    }
  };

  if (estado === 'exito') {
    return (
      <div
        className="bg-black text-[#7FFF6B] border-[3px] border-black p-6 inline-block"
        style={{ boxShadow: '6px 6px 0 #FF6B9D' }}
      >
        <p className="font-black uppercase text-base tracking-wider mb-1">
          Listo
        </p>
        <p className="text-white font-bold text-sm">
          Te avisaremos cuando Cuncuna esté lista.
        </p>
      </div>
    );
  }

  const esGrande = variante === 'grande';

  return (
    <form onSubmit={enviar} className={esGrande ? 'w-full' : 'max-w-md mx-auto'}>
      <div className={esGrande ? 'grid sm:grid-cols-[1fr_auto] gap-3' : 'flex flex-col sm:flex-row gap-3'}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.cl"
          required
          disabled={estado === 'enviando'}
          className="flex-1 bg-white border-[3px] border-black px-4 py-3 font-black text-black placeholder-black/40 focus:outline-none focus:translate-y-[-2px] transition-transform disabled:opacity-50"
          style={{ boxShadow: '4px 4px 0 #000' }}
        />
        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="bg-black text-[#FFD23F] border-[3px] border-black px-6 py-3 font-black uppercase tracking-wider hover:translate-y-[-2px] active:translate-y-0 transition-transform disabled:opacity-50 disabled:cursor-wait whitespace-nowrap inline-flex items-center justify-center gap-2"
          style={{ boxShadow: '4px 4px 0 #FF6B9D' }}
        >
          {estado === 'enviando' ? 'Enviando...' : 'Unirme'}
          {estado !== 'enviando' && <ArrowRight size={18} strokeWidth={4} />}
        </button>
      </div>

      {estado === 'duplicado' && (
        <p className="mt-4 font-black uppercase text-sm text-black/70">
          Ya estás en la lista. Gracias.
        </p>
      )}

      {estado === 'error' && (
        <div
          className="mt-4 bg-[#FF6B6B] text-white border-[3px] border-black p-3 font-black uppercase text-sm"
          style={{ boxShadow: '3px 3px 0 #000' }}
        >
          {mensajeError}
        </div>
      )}
    </form>
  );
}
