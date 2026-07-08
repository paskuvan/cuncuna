'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ChevronRight, MessageCircle, RotateCcw, X } from 'lucide-react';
import { CONVERSACIONES } from '../../data/conversaciones';
import { registrarConversacionEstadisticas } from '../../lib/estadisticas-locales';
import { registrarEventoMision } from '../../lib/misiones-locales';

export default function PaginaConversaciones() {
  const [conversacion, setConversacion] = useState(null);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [verificada, setVerificada] = useState(false);
  const [resultados, setResultados] = useState([]);

  const paso = conversacion?.pasos[indice];
  const completada = conversacion && indice >= conversacion.pasos.length;
  const aciertos = resultados.filter(Boolean).length;

  const empezar = (item) => {
    setConversacion(item);
    setIndice(0);
    setSeleccion(null);
    setVerificada(false);
    setResultados([]);
  };

  const volverLista = () => {
    setConversacion(null);
    setIndice(0);
    setSeleccion(null);
    setVerificada(false);
    setResultados([]);
  };

  const siguiente = () => {
    const acerto = seleccion === paso.correcta;
    const nuevosResultados = [...resultados, acerto];

    if (indice === conversacion.pasos.length - 1) {
      registrarConversacionEstadisticas({
        correctas: nuevosResultados.filter(Boolean).length,
        total: conversacion.pasos.length,
      });
      registrarEventoMision('conversacion');
    }

    setResultados(nuevosResultados);
    setSeleccion(null);
    setVerificada(false);
    setIndice(indice + 1);
  };

  if (completada) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
        <div
          className="bg-[#A78BFA] border-[4px] border-black p-6 md:p-8 max-w-md w-full text-center"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <div className="text-6xl mb-4">💬</div>
          <p className="font-black uppercase text-xs tracking-[0.2em] text-white/80 mb-2">
            Conversación completada
          </p>
          <h1 className="font-black uppercase text-4xl text-white leading-none mb-4">
            {aciertos}/{conversacion.pasos.length}
            <span className="block text-lg mt-2 text-white/80">decisiones correctas</span>
          </h1>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => empezar(conversacion)}
              className="bg-white border-[3px] border-black p-3 font-black uppercase text-sm text-black hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              Repetir
            </button>
            <button
              onClick={volverLista}
              className="bg-black border-[3px] border-black p-3 font-black uppercase text-sm text-[#FFD23F] hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '5px 5px 0 #fff' }}
            >
              Ver más
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (conversacion && paso) {
    const progreso = ((indice + 1) / conversacion.pasos.length) * 100;

    return (
      <div className="min-h-screen bg-[#F5F0E8]">
        <header className="bg-black border-b-[4px] border-black sticky top-0 z-20">
          <div className="max-w-3xl mx-auto p-4 flex items-center gap-4">
            <button
              onClick={volverLista}
              className="bg-white border-[3px] border-white p-2 hover:translate-x-[-2px] transition-transform"
              style={{ boxShadow: '3px 3px 0 #FFD23F' }}
              aria-label="Volver"
            >
              <ArrowLeft size={20} strokeWidth={3} className="text-black" />
            </button>
            <div className="flex-1">
              <div
                className="h-5 bg-white border-[3px] border-white overflow-hidden"
                style={{ boxShadow: '3px 3px 0 #FFD23F' }}
              >
                <div
                  className="h-full bg-[#A78BFA] transition-all duration-300"
                  style={{ width: `${progreso}%` }}
                />
              </div>
            </div>
            <span className="font-black text-white text-sm uppercase shrink-0">
              {indice + 1}/{conversacion.pasos.length}
            </span>
          </div>
        </header>

        <main className="max-w-3xl mx-auto p-4 md:p-6">
          <section
            className="border-[4px] border-black p-5 md:p-6 mb-6"
            style={{ backgroundColor: conversacion.color, boxShadow: '10px 10px 0 #000' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={22} strokeWidth={3} className="text-black" />
              <p className="font-black uppercase text-xs tracking-[0.2em] text-black/70">
                {conversacion.titulo}
              </p>
            </div>
            <h1 className="font-black uppercase text-3xl md:text-5xl text-black leading-none">
              Decide en contexto
            </h1>
          </section>

          <section
            className="bg-white border-[4px] border-black p-5 md:p-6"
            style={{ boxShadow: '10px 10px 0 #000' }}
          >
            <div
              className="bg-[#F5F0E8] border-[3px] border-black p-4 mb-5"
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              <p className="font-black uppercase text-xs tracking-[0.15em] text-black/50 mb-2">
                Escena
              </p>
              <p className="font-bold text-black text-lg">{paso.escena}</p>
            </div>

            <h2 className="font-black uppercase text-2xl md:text-3xl text-black leading-tight mb-5">
              {paso.pregunta}
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {paso.opciones.map((opcion, idx) => {
                const estaSeleccionada = seleccion === idx;
                const esCorrecta = idx === paso.correcta;
                let fondo = 'bg-white';
                let texto = 'text-black';

                if (verificada && esCorrecta) {
                  fondo = 'bg-[#7FFF6B]';
                } else if (verificada && estaSeleccionada) {
                  fondo = 'bg-[#FF6B6B]';
                  texto = 'text-white';
                } else if (estaSeleccionada) {
                  fondo = 'bg-[#FFD23F]';
                }

                return (
                  <button
                    key={opcion}
                    onClick={() => !verificada && setSeleccion(idx)}
                    disabled={verificada}
                    className={`${fondo} ${texto} border-[3px] border-black p-4 font-black uppercase text-left flex items-center justify-between gap-3 transition-all ${
                      !verificada ? 'hover:translate-x-[-2px] hover:translate-y-[-2px]' : ''
                    }`}
                    style={{ boxShadow: estaSeleccionada || esCorrecta ? '6px 6px 0 #000' : '4px 4px 0 #000' }}
                  >
                    <span>{opcion}</span>
                    {verificada && esCorrecta && <Check size={22} strokeWidth={4} />}
                    {verificada && estaSeleccionada && !esCorrecta && <X size={22} strokeWidth={4} />}
                  </button>
                );
              })}
            </div>

            {verificada && (
              <div
                className={`mt-5 border-[3px] border-black p-4 ${
                  seleccion === paso.correcta ? 'bg-[#7FFF6B]' : 'bg-[#FF6B6B] text-white'
                }`}
                style={{ boxShadow: '5px 5px 0 #000' }}
              >
                <p className="font-black uppercase">
                  {seleccion === paso.correcta ? '¡Buena decisión!' : 'Otra respuesta encaja mejor'}
                </p>
                <p className="font-bold text-sm mt-1">{paso.explicacion}</p>
              </div>
            )}

            <button
              onClick={verificada ? siguiente : () => seleccion !== null && setVerificada(true)}
              disabled={seleccion === null}
              className="w-full mt-6 bg-black text-[#FFD23F] border-[3px] border-black p-4 font-black uppercase text-lg tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '6px 6px 0 #A78BFA' }}
            >
              {verificada ? 'Siguiente' : 'Verificar'}
              {verificada ? (
                <ChevronRight className="inline ml-1" size={22} strokeWidth={4} />
              ) : null}
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <header className="bg-black border-b-[4px] border-black sticky top-0 z-20">
        <div className="max-w-5xl mx-auto p-4 flex items-center gap-3">
          <Link
            href="/app"
            className="bg-white border-[3px] border-white p-2 hover:translate-x-[-2px] transition-transform"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            aria-label="Volver"
          >
            <ArrowLeft size={20} strokeWidth={3} className="text-black" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-black text-xl md:text-2xl uppercase leading-none">
              Conversaciones
            </h1>
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider hidden sm:block">
              Situaciones reales
            </p>
          </div>
          <div
            className="bg-[#A78BFA] border-[3px] border-white px-3 py-1.5 font-black text-white text-sm"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
          >
            {CONVERSACIONES.length}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6">
        <section
          className="bg-[#A78BFA] border-[4px] border-black p-5 md:p-7 mb-6"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle size={24} strokeWidth={3} className="text-white" />
            <p className="font-black uppercase text-xs tracking-[0.2em] text-white/80">
              Práctica contextual
            </p>
          </div>
          <h2 className="font-black uppercase text-4xl md:text-5xl text-white leading-none">
            Mini diálogos
          </h2>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONVERSACIONES.map((item) => (
            <button
              key={item.id}
              onClick={() => empezar(item)}
              className="text-left border-[3px] border-black p-4 bg-white hover:translate-x-[-3px] hover:translate-y-[-3px] transition-transform"
              style={{ boxShadow: '6px 6px 0 #000' }}
            >
              <div
                className="border-[3px] border-black w-12 h-12 flex items-center justify-center mb-4"
                style={{ backgroundColor: item.color, boxShadow: '3px 3px 0 #000' }}
              >
                <MessageCircle size={24} strokeWidth={3} className="text-black" />
              </div>
              <h3 className="font-black uppercase text-2xl text-black leading-none mb-2">
                {item.titulo}
              </h3>
              <p className="font-bold text-black/70 text-sm mb-4">
                {item.contexto}
              </p>
              <div className="bg-black text-[#FFD23F] border-[3px] border-black px-3 py-2 inline-block font-black uppercase text-xs">
                {item.pasos.length} decisiones
              </div>
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}
