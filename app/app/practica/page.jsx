'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Camera,
  CameraOff,
  Check,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import AppShell from '../../components/dashboard/AppShell';
import { obtenerSenasDiccionario } from '../../lib/diccionario';
import {
  obtenerPracticaCamaraLocal,
  registrarSenaPracticada,
} from '../../lib/practica-camara-local';
import { registrarPracticaCamaraEstadisticas } from '../../lib/estadisticas-locales';
import { registrarEventoMision } from '../../lib/misiones-locales';

// ============================================================
// PÁGINA: /app/practica  (estilo suave)
// La imagen de la cámara nunca sale del dispositivo.
// ============================================================

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

  useEffect(
    () => () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    },
    []
  );

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

  const btnSecundario =
    'grid place-items-center w-11 h-11 rounded-xl border border-black/10 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors';

  return (
    <AppShell title="Práctica con cámara">
      <div className="flex flex-col gap-6 max-w-5xl">
        {/* Seña actual */}
        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium text-neutral-500">
            Seña {indice + 1} de {senas.length}
          </p>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{sena?.palabra}</h2>
              <p className="mt-1 text-sm text-neutral-500">{sena?.descripcion}</p>
            </div>
            {practicada && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                <Check size={16} />
                Practicada
              </span>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Ejemplo */}
          <article>
            <p className="mb-2 text-sm font-semibold text-neutral-600">1. Mira el ejemplo</p>
            <div className="overflow-hidden rounded-2xl border border-black/5 shadow-sm">
              <VideoPlayer
                key={sena?.id}
                src={sena?.videoUrl}
                poster={sena?.posterUrl}
                titulo={sena?.palabra}
              />
            </div>
          </article>

          {/* Tu cámara */}
          <article>
            <p className="mb-2 text-sm font-semibold text-neutral-600">2. Ahora tú</p>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-black/5 bg-neutral-900 shadow-sm">
              <video
                ref={videoRef}
                muted
                playsInline
                className={`w-full h-full object-cover ${orientacion === 'user' ? '-scale-x-100' : ''}`}
              />
              {!camaraActiva && (
                <div className="absolute inset-0 grid place-items-center bg-neutral-50 p-6 text-center">
                  <div>
                    <Camera size={44} className="mx-auto text-neutral-300 mb-3" />
                    <p className="font-semibold">Tu cámara está apagada</p>
                    <p className="mt-1 text-sm text-neutral-500 max-w-xs mx-auto">
                      La imagen permanece en tu dispositivo. No se graba ni se envía.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {errorCamara && (
              <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                {errorCamara}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {!camaraActiva ? (
                <button
                  onClick={() => iniciarCamara()}
                  disabled={iniciando}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60 transition-colors"
                >
                  <Camera size={18} />
                  {iniciando ? 'Iniciando…' : 'Activar cámara'}
                </button>
              ) : (
                <>
                  <button onClick={detenerCamara} className={btnSecundario} aria-label="Apagar cámara" title="Apagar cámara">
                    <CameraOff size={18} />
                  </button>
                  <button onClick={cambiarOrientacion} className={btnSecundario} aria-label="Cambiar cámara" title="Cambiar cámara">
                    <RefreshCw size={18} />
                  </button>
                </>
              )}
              <button
                onClick={marcarPracticada}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                <Check size={18} />
                La practiqué
              </button>
            </div>

            {/* Navegación */}
            <div className="mt-5 flex items-center gap-3">
              <button onClick={() => mover(-1)} className={btnSecundario} aria-label="Seña anterior">
                <ChevronLeft size={20} />
              </button>
              <div className="flex-1 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${(estado.senas.length / senas.length) * 100}%` }}
                />
              </div>
              <button onClick={() => mover(1)} className={btnSecundario} aria-label="Siguiente seña">
                <ChevronRight size={20} />
              </button>
            </div>
          </article>
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <ShieldCheck size={18} />
          La cámara se apaga automáticamente al salir de esta pantalla.
        </div>
      </div>
    </AppShell>
  );
}
