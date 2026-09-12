'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

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
      <div className="inline-flex items-center gap-3 rounded-2xl bg-white/95 border border-black/5 px-5 py-4 text-left shadow-sm">
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
          <Check size={20} />
        </span>
        <div>
          <p className="font-semibold text-neutral-900">¡Listo!</p>
          <p className="text-sm text-neutral-500">
            Te avisaremos cuando Cuncuna esté lista.
          </p>
        </div>
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
          aria-label="Correo electrónico para la lista de espera"
          required
          disabled={estado === 'enviando'}
          className="flex-1 rounded-xl border border-black/10 bg-white px-4 py-3 font-medium text-neutral-900 outline-none placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-violet-300 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-semibold text-white hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-wait whitespace-nowrap"
        >
          {estado === 'enviando' ? 'Enviando…' : 'Unirme'}
          {estado !== 'enviando' && <ArrowRight size={18} />}
        </button>
      </div>

      {estado === 'duplicado' && (
        <div className="mt-4 rounded-xl bg-white/95 border border-black/5 p-3 text-sm font-medium text-neutral-700">
          Ya estás en la lista. ¡Gracias!
        </div>
      )}

      {estado === 'error' && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">
          {mensajeError}
        </div>
      )}
    </form>
  );
}
