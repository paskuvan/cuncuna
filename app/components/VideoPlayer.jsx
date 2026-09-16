'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

// ============================================================
// COMPONENTE: VideoPlayer  (estilo suave)
// Reproductor con play/pausa, reiniciar, mute y barra de progreso.
// ============================================================

export default function VideoPlayer({ src, poster, titulo }) {
  const videoRef = useRef(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [silenciado, setSilenciado] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [error, setError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (reproduciendo) videoRef.current.pause();
    else videoRef.current.play().catch(() => setError(true));
    setReproduciendo(!reproduciendo);
  };

  const reiniciar = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setReproduciendo(true);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !silenciado;
    setSilenciado(!silenciado);
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgreso(pct || 0);
  };

  const btn =
    'grid place-items-center w-9 h-9 rounded-lg bg-white/15 text-white hover:bg-white/25 transition-colors';

  return (
    <div className="relative rounded-xl overflow-hidden bg-neutral-900">
      {!error ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          title={titulo}
          className="w-full aspect-video object-contain block bg-neutral-900"
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setReproduciendo(false)}
          onError={() => setError(true)}
          playsInline
        />
      ) : (
        <div className="w-full aspect-video bg-neutral-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="text-5xl mb-3">📹</div>
          <p className="font-semibold text-neutral-700">Video no disponible</p>
          <p className="text-xs text-neutral-400 mt-1 font-mono break-all">{src}</p>
        </div>
      )}

      {/* Barra de progreso */}
      <div className="absolute bottom-[52px] left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-violet-500 transition-all duration-100"
          style={{ width: `${progreso}%` }}
        />
      </div>

      {/* Controles */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur px-3 py-2.5 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="grid place-items-center w-9 h-9 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          aria-label={reproduciendo ? 'Pausar' : 'Reproducir'}
        >
          {reproduciendo ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button onClick={reiniciar} className={btn} aria-label="Reiniciar">
          <RotateCcw size={18} />
        </button>
        <button onClick={toggleMute} className={`${btn} ml-auto`} aria-label={silenciado ? 'Activar audio' : 'Silenciar'}>
          {silenciado ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <span className="text-white/80 text-xs font-semibold w-9 text-right">
          {Math.round(progreso)}%
        </span>
      </div>
    </div>
  );
}
