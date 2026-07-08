'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Camera,
  CameraOff,
  Check,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import { obtenerSenasDiccionario } from '../../lib/diccionario';
import {
  obtenerPracticaCamaraLocal,
  registrarSenaPracticada,
} from '../../lib/practica-camara-local';
import { registrarPracticaCamaraEstadisticas } from '../../lib/estadisticas-locales';
import { registrarEventoMision } from '../../lib/misiones-locales';

export default function PaginaPracticaCamara() {
  const senas = useMemo(() => obtenerSenasDiccionario(), []);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [indice, setIndice] = useState(0);
  const [camaraActiva, setCamaraActiva] = useState(false);
  const [iniciando, setIniciando] = useState(false);
  const [errorCamara, setErrorCamara] = useState('');
  const [orientacion, setOrientacion] = useState('user');
  const [estado, setEstado] = useState(() => obtenerPracticaCamaraLocal());
  const sena = senas[indice];
  const practicada = estado.senas.includes(sena?.id);

  const detenerCamara = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCamaraActiva(false);
  };

  const iniciarCamara = async (facingMode = orientacion) => {
    detenerCamara();
    setIniciando(true);
    setErrorCamara('');

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Tu navegador no permite usar la cámara aquí.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamaraActiva(true);
    } catch (error) {
      const denegada =
        error?.name === 'NotAllowedError' || error?.name === 'PermissionDeniedError';
      setErrorCamara(
        denegada
          ? 'Permiso denegado. Habilita la cámara en tu navegador para practicar.'
          : error?.message || 'No pudimos iniciar la cámara.'
      );
    } finally {
      setIniciando(false);
    }
  };

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  const cambiarOrientacion = async () => {
    const siguiente = orientacion === 'user' ? 'environment' : 'user';
    setOrientacion(siguiente);
    await iniciarCamara(siguiente);
  };

  const marcarPracticada = () => {
    const actualizado = registrarSenaPracticada(sena.id);
    setEstado(actualizado);
    registrarPracticaCamaraEstadisticas(sena.id);
    registrarEventoMision('practica_camara');
  };

  const mover = (direccion) => {
    setIndice((actual) => (actual + direccion + senas.length) % senas.length);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <header className="bg-black border-b-[4px] border-black sticky top-0 z-20">
        <div className="max-w-6xl mx-auto p-4 flex items-center gap-3">
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
              Práctica con cámara
            </h1>
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider hidden sm:block">
              Imita la seña a tu ritmo
            </p>
          </div>
          <div
            className="bg-[#7FFF6B] border-[3px] border-white px-3 py-1.5 font-black text-black text-sm"
            style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
          >
            {estado.senas.length}/{senas.length}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <section
          className="bg-[#4ECDC4] border-[4px] border-black p-5 md:p-7 mb-6"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <p className="font-black uppercase text-xs tracking-[0.2em] text-black/70 mb-2">
            Seña {indice + 1} de {senas.length}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-black uppercase text-4xl md:text-5xl text-black leading-none">
                {sena?.palabra}
              </h2>
              <p className="font-bold text-black/70 mt-2">{sena?.descripcion}</p>
            </div>
            {practicada && (
              <span className="bg-[#7FFF6B] border-[3px] border-black px-3 py-2 font-black uppercase text-xs flex items-center gap-2">
                <Check size={18} strokeWidth={4} />
                Practicada
              </span>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <article>
            <p className="font-black uppercase text-xs tracking-[0.2em] text-black/60 mb-3">
              1. Mira el ejemplo
            </p>
            <VideoPlayer
              key={sena?.id}
              src={sena?.videoUrl}
              poster={sena?.posterUrl}
              titulo={sena?.palabra}
            />
          </article>

          <article>
            <p className="font-black uppercase text-xs tracking-[0.2em] text-black/60 mb-3">
              2. Ahora tú
            </p>
            <div
              className="relative bg-black border-[4px] border-black aspect-video overflow-hidden"
              style={{ boxShadow: '8px 8px 0 #000' }}
            >
              <video
                ref={videoRef}
                muted
                playsInline
                className={`w-full h-full object-cover ${orientacion === 'user' ? '-scale-x-100' : ''}`}
              />

              {!camaraActiva && (
                <div className="absolute inset-0 bg-[#FFD23F] flex flex-col items-center justify-center p-6 text-center">
                  <Camera size={52} strokeWidth={2.5} className="text-black mb-3" />
                  <p className="font-black uppercase text-xl text-black">
                    Tu cámara está apagada
                  </p>
                  <p className="font-bold text-sm text-black/70 mt-2 max-w-sm">
                    La imagen permanece en tu dispositivo. No se graba ni se envía.
                  </p>
                </div>
              )}
            </div>

            {errorCamara && (
              <div className="bg-[#FF6B9D] border-[3px] border-black p-3 mt-4 font-bold text-sm text-black">
                {errorCamara}
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-4">
              {!camaraActiva ? (
                <button
                  onClick={() => iniciarCamara()}
                  disabled={iniciando}
                  className="bg-black text-[#FFD23F] border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2 disabled:opacity-60"
                  style={{ boxShadow: '5px 5px 0 #FF6B9D' }}
                >
                  <Camera size={19} strokeWidth={3} />
                  {iniciando ? 'Iniciando...' : 'Activar cámara'}
                </button>
              ) : (
                <>
                  <button
                    onClick={detenerCamara}
                    className="bg-white text-black border-[3px] border-black p-3"
                    style={{ boxShadow: '5px 5px 0 #000' }}
                    aria-label="Apagar cámara"
                    title="Apagar cámara"
                  >
                    <CameraOff size={20} strokeWidth={3} />
                  </button>
                  <button
                    onClick={cambiarOrientacion}
                    className="bg-white text-black border-[3px] border-black p-3"
                    style={{ boxShadow: '5px 5px 0 #000' }}
                    aria-label="Cambiar cámara"
                    title="Cambiar cámara"
                  >
                    <RefreshCw size={20} strokeWidth={3} />
                  </button>
                </>
              )}

              <button
                onClick={marcarPracticada}
                className="bg-[#7FFF6B] text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center gap-2"
                style={{ boxShadow: '5px 5px 0 #000' }}
              >
                <Check size={20} strokeWidth={4} />
                La practiqué
              </button>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => mover(-1)}
                className="bg-white border-[3px] border-black p-3"
                style={{ boxShadow: '4px 4px 0 #000' }}
                aria-label="Seña anterior"
              >
                <ChevronLeft size={22} strokeWidth={4} />
              </button>
              <div className="flex-1 h-5 bg-white border-[3px] border-black overflow-hidden">
                <div
                  className="h-full bg-[#7FFF6B]"
                  style={{ width: `${(estado.senas.length / senas.length) * 100}%` }}
                />
              </div>
              <button
                onClick={() => mover(1)}
                className="bg-white border-[3px] border-black p-3"
                style={{ boxShadow: '4px 4px 0 #000' }}
                aria-label="Siguiente seña"
              >
                <ChevronRight size={22} strokeWidth={4} />
              </button>
            </div>
          </article>
        </section>

        <div className="mt-7 flex items-center gap-2 font-bold text-sm text-black/60">
          <ShieldCheck size={20} strokeWidth={3} />
          La cámara se apaga automáticamente al salir de esta pantalla.
        </div>
      </main>
    </div>
  );
}
