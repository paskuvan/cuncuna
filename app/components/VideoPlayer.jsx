'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

// ============================================================
// COMPONENTE: VideoPlayer
// Reproductor de video con controles neobrutalistas:
//   - Play / Pause
//   - Reiniciar (para repetir señas)
//   - Mute / Unmute
//   - Barra de progreso amarilla
//   - Fallback elegante si el video no carga
// ============================================================

export default function VideoPlayer({ src, poster, titulo }) {
  const videoRef = useRef(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [silenciado, setSilenciado] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [error, setError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (reproduciendo) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => setError(true));
    }
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

  return (
    <div className="w-full">
      <div
        className="relative bg-black border-[3px] border-black"
        style={{ boxShadow: '8px 8px 0 #000' }}
      >
        {!error ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full aspect-video bg-gray-200 block"
            onTimeUpdate={onTimeUpdate}
            onEnded={() => setReproduciendo(false)}
            onError={() => setError(true)}
            playsInline
          />
        ) : (
          <div className="w-full aspect-video bg-yellow-300 flex flex-col items-center justify-center p-6 text-center">
            <div className="text-6xl mb-3">📹</div>
            <p className="font-black text-lg text-black uppercase">Video no disponible</p>
            <p className="text-sm text-black mt-2 font-bold">Verifica la ruta en curriculum.js</p>
            <p className="text-xs text-black mt-1 font-mono break-all">{src}</p>
          </div>
        )}

        {/* Barra de progreso */}
        <div className="absolute bottom-[60px] left-0 right-0 h-2 bg-white/30">
          <div
            className="h-full bg-[#FFD23F] transition-all duration-100"
            style={{ width: `${progreso}%` }}
          />
        </div>

        {/* Controles */}
        <div className="absolute bottom-0 left-0 right-0 bg-black border-t-[3px] border-black p-3 flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="bg-[#FFD23F] border-[3px] border-white p-2 hover:translate-y-[-2px] transition-transform active:translate-y-0"
            style={{ boxShadow: '3px 3px 0 #fff' }}
            aria-label={reproduciendo ? 'Pausar' : 'Reproducir'}
          >
            {reproduciendo ? (
              <Pause size={20} className="text-black" strokeWidth={3} />
            ) : (
              <Play size={20} className="text-black" strokeWidth={3} />
            )}
          </button>

          <button
            onClick={reiniciar}
            className="bg-white border-[3px] border-white p-2 hover:translate-y-[-2px] transition-transform active:translate-y-0"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            aria-label="Reiniciar"
          >
            <RotateCcw size={20} className="text-black" strokeWidth={3} />
          </button>

          <button
            onClick={toggleMute}
            className="bg-white border-[3px] border-white p-2 hover:translate-y-[-2px] transition-transform active:translate-y-0 ml-auto"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            aria-label={silenciado ? 'Activar audio' : 'Silenciar'}
          >
            {silenciado ? (
              <VolumeX size={20} className="text-black" strokeWidth={3} />
            ) : (
              <Volume2 size={20} className="text-black" strokeWidth={3} />
            )}
          </button>

          <span className="text-white font-black text-sm uppercase tracking-wider">
            {Math.round(progreso)}%
          </span>
        </div>
      </div>
    </div>
  );
}
