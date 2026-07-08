'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ChevronRight, RotateCcw, Sparkles, X } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import {
  crearOpcionesRepaso,
  obtenerRepasoDiario,
  obtenerSenasDiccionario,
} from '../../lib/diccionario';
import { registrarResultadoSena } from '../../lib/errores-locales';
import { registrarRepasoEstadisticas } from '../../lib/estadisticas-locales';
import { registrarEventoMision } from '../../lib/misiones-locales';

export default function PaginaRepaso() {
  const todasLasSenas = useMemo(() => obtenerSenasDiccionario(), []);
  const ejercicios = useMemo(() => obtenerRepasoDiario(new Date(), 5), []);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [verificado, setVerificado] = useState(false);
  const [resultados, setResultados] = useState([]);

  const ejercicio = ejercicios[indice];
  const opciones = useMemo(
    () => (ejercicio ? crearOpcionesRepaso(ejercicio, todasLasSenas, 4) : []),
    [ejercicio, todasLasSenas]
  );
  const aciertos = resultados.filter(Boolean).length;
  const completado = indice >= ejercicios.length;
  const progreso = completado ? 100 : ((indice + 1) / ejercicios.length) * 100;

  const verificar = () => {
    if (!seleccion) return;
    setVerificado(true);
  };

  const siguiente = () => {
    const acerto = seleccion?.id === ejercicio.id;
    const siguientesResultados = [...resultados, acerto];

    registrarResultadoSena(ejercicio.id, acerto);
    if (indice === ejercicios.length - 1) {
      registrarRepasoEstadisticas({
        correctas: siguientesResultados.filter(Boolean).length,
        total: ejercicios.length,
        senasVistas: ejercicios.length,
      });
      registrarEventoMision('repaso_diario');
      if (siguientesResultados.filter(Boolean).length >= 4) {
        registrarEventoMision('precision_repaso');
      }
    }
    setResultados(siguientesResultados);
    setSeleccion(null);
    setVerificado(false);
    setIndice(indice + 1);
  };

  const reiniciar = () => {
    setIndice(0);
    setSeleccion(null);
    setVerificado(false);
    setResultados([]);
  };

  if (completado) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
        <div
          className="bg-[#7FFF6B] border-[4px] border-black p-6 md:p-8 max-w-md w-full text-center"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <div className="text-6xl mb-4">✨</div>
          <p className="font-black uppercase text-xs tracking-[0.2em] text-black/70 mb-2">
            Repaso terminado
          </p>
          <h1 className="font-black uppercase text-4xl text-black leading-none mb-4">
            {aciertos}/{ejercicios.length}
            <span className="block text-lg mt-2 text-black/70">respuestas correctas</span>
          </h1>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={reiniciar}
              className="bg-white border-[3px] border-black p-3 font-black uppercase text-sm text-black hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              Repetir
            </button>
            <Link
              href="/app"
              className="bg-black border-[3px] border-black p-3 font-black uppercase text-sm text-[#FFD23F] hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '5px 5px 0 #fff' }}
            >
              Mapa
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!ejercicio) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
        <p className="font-black uppercase text-black">No hay señas para repasar todavía.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <header className="bg-black border-b-[4px] border-black sticky top-0 z-20">
        <div className="max-w-3xl mx-auto p-4 flex items-center gap-4">
          <Link
            href="/app"
            className="bg-white border-[3px] border-white p-2 hover:translate-x-[-2px] transition-transform"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            aria-label="Volver"
          >
            <ArrowLeft size={20} strokeWidth={3} className="text-black" />
          </Link>
          <div className="flex-1">
            <div
              className="h-5 bg-white border-[3px] border-white overflow-hidden"
              style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            >
              <div
                className="h-full bg-[#7FFF6B] transition-all duration-300"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </div>
          <span className="font-black text-white text-sm uppercase shrink-0">
            {indice + 1}/{ejercicios.length}
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-6">
        <section
          className="bg-[#FFD23F] border-[4px] border-black p-5 md:p-6 mb-6"
          style={{ boxShadow: '10px 10px 0 #000' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={22} strokeWidth={3} className="text-black" />
            <p className="font-black uppercase text-xs tracking-[0.2em] text-black/70">
              Repaso diario
            </p>
          </div>
          <h1 className="font-black uppercase text-3xl md:text-5xl text-black leading-none">
            ¿Qué seña ves?
          </h1>
          <p className="font-bold text-black/70 mt-2">
            Mira el video y elige la respuesta correcta.
          </p>
        </section>

        <section
          className="bg-white border-[4px] border-black p-5 md:p-6"
          style={{ boxShadow: '10px 10px 0 #000' }}
        >
          <VideoPlayer
            src={ejercicio.videoUrl}
            poster={ejercicio.posterUrl}
            titulo={ejercicio.palabra}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {opciones.map((opcion) => {
              const estaSeleccionada = seleccion?.id === opcion.id;
              const esCorrecta = opcion.id === ejercicio.id;
              let fondo = 'bg-white';
              let texto = 'text-black';

              if (verificado && esCorrecta) {
                fondo = 'bg-[#7FFF6B]';
              } else if (verificado && estaSeleccionada) {
                fondo = 'bg-[#FF6B6B]';
                texto = 'text-white';
              } else if (estaSeleccionada) {
                fondo = 'bg-[#FFD23F]';
              }

              return (
                <button
                  key={opcion.id}
                  onClick={() => !verificado && setSeleccion(opcion)}
                  disabled={verificado}
                  className={`${fondo} ${texto} border-[3px] border-black p-4 font-black uppercase text-left flex items-center justify-between gap-3 transition-all ${
                    !verificado ? 'hover:translate-x-[-2px] hover:translate-y-[-2px]' : ''
                  }`}
                  style={{ boxShadow: estaSeleccionada || esCorrecta ? '6px 6px 0 #000' : '4px 4px 0 #000' }}
                >
                  <span>{opcion.palabra}</span>
                  {verificado && esCorrecta && <Check size={22} strokeWidth={4} />}
                  {verificado && estaSeleccionada && !esCorrecta && <X size={22} strokeWidth={4} />}
                </button>
              );
            })}
          </div>

          {verificado && (
            <div
              className={`mt-6 border-[3px] border-black p-4 ${
                seleccion?.id === ejercicio.id ? 'bg-[#7FFF6B]' : 'bg-[#FF6B6B] text-white'
              }`}
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              <p className="font-black uppercase">
                {seleccion?.id === ejercicio.id ? '¡Correcto!' : `Era: ${ejercicio.palabra}`}
              </p>
              <p className="font-bold text-sm mt-1">{ejercicio.descripcion}</p>
            </div>
          )}

          <button
            onClick={verificado ? siguiente : verificar}
            disabled={!seleccion}
            className="w-full mt-6 bg-black text-[#FFD23F] border-[3px] border-black p-4 font-black uppercase text-lg tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:translate-y-[-2px] transition-transform"
            style={{ boxShadow: '6px 6px 0 #FF6B9D' }}
          >
            {verificado ? 'Siguiente' : 'Verificar'}
            {verificado ? (
              <ChevronRight className="inline ml-1" size={22} strokeWidth={4} />
            ) : (
              <RotateCcw className="inline ml-2" size={20} strokeWidth={4} />
            )}
          </button>
        </section>
      </main>
    </div>
  );
}
