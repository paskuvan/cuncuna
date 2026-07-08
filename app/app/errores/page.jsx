'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ChevronRight, RotateCcw, Target, Trash2, X } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import { crearOpcionesRepaso, obtenerSenasDiccionario } from '../../lib/diccionario';
import {
  enriquecerSenasConErrores,
  limpiarErrorLocal,
  limpiarTodosLosErroresLocales,
  obtenerErroresLocales,
  registrarResultadoSena,
} from '../../lib/errores-locales';
import { registrarEventoMision } from '../../lib/misiones-locales';

export default function PaginaErrores() {
  const todasLasSenas = useMemo(() => obtenerSenasDiccionario(), []);
  const [errores, setErrores] = useState(() => obtenerErroresLocales());
  const [modoPractica, setModoPractica] = useState(false);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [verificado, setVerificado] = useState(false);
  const [resultados, setResultados] = useState([]);

  const senasDebiles = useMemo(
    () => enriquecerSenasConErrores(todasLasSenas, errores),
    [errores, todasLasSenas]
  );

  const ejercicios = senasDebiles.slice(0, 5);
  const ejercicio = modoPractica ? ejercicios[indice] : null;
  const opciones = useMemo(
    () => (ejercicio ? crearOpcionesRepaso(ejercicio, todasLasSenas, 4) : []),
    [ejercicio, todasLasSenas]
  );
  const practicaCompleta = modoPractica && indice >= ejercicios.length;
  const aciertos = resultados.filter(Boolean).length;

  const empezarPractica = () => {
    setModoPractica(true);
    setIndice(0);
    setSeleccion(null);
    setVerificado(false);
    setResultados([]);
  };

  const salirPractica = () => {
    setModoPractica(false);
    setIndice(0);
    setSeleccion(null);
    setVerificado(false);
    setResultados([]);
  };

  const siguiente = () => {
    const acerto = seleccion?.id === ejercicio.id;
    const nuevosErrores = registrarResultadoSena(ejercicio.id, acerto);

    if (indice === ejercicios.length - 1) {
      registrarEventoMision('practicar_errores');
    }
    setErrores(nuevosErrores);
    setResultados([...resultados, acerto]);
    setSeleccion(null);
    setVerificado(false);
    setIndice(indice + 1);
  };

  const limpiarSena = (senaId) => {
    setErrores(limpiarErrorLocal(senaId));
  };

  const limpiarTodo = () => {
    setErrores(limpiarTodosLosErroresLocales());
  };

  if (practicaCompleta) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
        <div
          className="bg-[#FFD23F] border-[4px] border-black p-6 md:p-8 max-w-md w-full text-center"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <div className="text-6xl mb-4">🎯</div>
          <p className="font-black uppercase text-xs tracking-[0.2em] text-black/70 mb-2">
            Práctica terminada
          </p>
          <h1 className="font-black uppercase text-4xl text-black leading-none mb-4">
            {aciertos}/{ejercicios.length}
            <span className="block text-lg mt-2 text-black/70">señas recuperadas</span>
          </h1>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={empezarPractica}
              className="bg-white border-[3px] border-black p-3 font-black uppercase text-sm text-black hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              Repetir
            </button>
            <button
              onClick={salirPractica}
              className="bg-black border-[3px] border-black p-3 font-black uppercase text-sm text-[#FFD23F] hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '5px 5px 0 #fff' }}
            >
              Ver lista
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (modoPractica && ejercicio) {
    const progreso = ((indice + 1) / ejercicios.length) * 100;

    return (
      <div className="min-h-screen bg-[#F5F0E8]">
        <header className="bg-black border-b-[4px] border-black sticky top-0 z-20">
          <div className="max-w-3xl mx-auto p-4 flex items-center gap-4">
            <button
              onClick={salirPractica}
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
                  className="h-full bg-[#FF6B9D] transition-all duration-300"
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
            className="bg-[#FF6B9D] border-[4px] border-black p-5 md:p-6 mb-6"
            style={{ boxShadow: '10px 10px 0 #000' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Target size={22} strokeWidth={3} className="text-white" />
              <p className="font-black uppercase text-xs tracking-[0.2em] text-white/80">
                Mis errores
              </p>
            </div>
            <h1 className="font-black uppercase text-3xl md:text-5xl text-white leading-none">
              Recupera esta seña
            </h1>
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
                  {seleccion?.id === ejercicio.id ? '¡Recuperada!' : `Era: ${ejercicio.palabra}`}
                </p>
                <p className="font-bold text-sm mt-1">{ejercicio.descripcion}</p>
              </div>
            )}

            <button
              onClick={verificado ? siguiente : () => seleccion && setVerificado(true)}
              disabled={!seleccion}
              className="w-full mt-6 bg-black text-[#FFD23F] border-[3px] border-black p-4 font-black uppercase text-lg tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '6px 6px 0 #FF6B9D' }}
            >
              {verificado ? 'Siguiente' : 'Verificar'}
              <ChevronRight className="inline ml-1" size={22} strokeWidth={4} />
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
              Mis errores
            </h1>
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider hidden sm:block">
              Señas para recuperar
            </p>
          </div>
          <div
            className="bg-[#FF6B9D] border-[3px] border-white px-3 py-1.5 font-black text-white text-sm"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
          >
            {senasDebiles.length}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6">
        <section
          className="bg-[#FF6B9D] border-[4px] border-black p-5 md:p-6 mb-6"
          style={{ boxShadow: '10px 10px 0 #000' }}
        >
          <p className="font-black uppercase text-xs tracking-[0.2em] text-white/80 mb-2">
            Entrenamiento enfocado
          </p>
          <h2 className="font-black uppercase text-3xl md:text-5xl text-white leading-none mb-4">
            Vuelve fuerte
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={empezarPractica}
              disabled={senasDebiles.length === 0}
              className="bg-black text-[#FFD23F] border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '5px 5px 0 #FFD23F' }}
            >
              <RotateCcw size={18} strokeWidth={4} />
              Practicar errores
            </button>
            <button
              onClick={limpiarTodo}
              disabled={senasDebiles.length === 0}
              className="bg-white text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              <Trash2 size={18} strokeWidth={4} />
              Limpiar lista
            </button>
          </div>
        </section>

        {senasDebiles.length === 0 ? (
          <div
            className="bg-white border-[4px] border-black p-8 text-center"
            style={{ boxShadow: '10px 10px 0 #000' }}
          >
            <Target size={46} strokeWidth={3} className="mx-auto text-black mb-3" />
            <p className="font-black uppercase text-black text-xl">Aún no hay errores</p>
            <p className="font-bold text-black/60 mt-2">
              Cuando falles una seña en el repaso diario, aparecerá aquí.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {senasDebiles.map((sena) => (
              <article
                key={sena.id}
                className="bg-white border-[3px] border-black p-4"
                style={{ boxShadow: '6px 6px 0 #000' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black uppercase text-[10px] tracking-[0.15em] text-black/50">
                      {sena.leccionTitulo}
                    </p>
                    <h3 className="font-black uppercase text-2xl text-black leading-none mt-1">
                      {sena.palabra}
                    </h3>
                  </div>
                  <button
                    onClick={() => limpiarSena(sena.id)}
                    className="bg-[#7FFF6B] border-[3px] border-black p-2 hover:translate-y-[-2px] transition-transform"
                    style={{ boxShadow: '3px 3px 0 #000' }}
                    aria-label={`Marcar ${sena.palabra} como recuperada`}
                  >
                    <Check size={18} strokeWidth={4} className="text-black" />
                  </button>
                </div>
                <p className="font-bold text-black/70 text-sm mt-2 line-clamp-2">
                  {sena.descripcion}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-[#FF6B6B] text-white border-[3px] border-black p-2 font-black uppercase text-center">
                    {sena.fallos} fallos
                  </div>
                  <div className="bg-[#7FFF6B] text-black border-[3px] border-black p-2 font-black uppercase text-center">
                    {sena.aciertos} aciertos
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
