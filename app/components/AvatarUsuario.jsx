'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AvatarUsuario({
  nombre,
  src,
  size = 40,
  className = '',
  textoClassName = 'text-lg',
  style,
}) {
  const [srcConError, setSrcConError] = useState(null);
  const inicial = nombre?.[0]?.toUpperCase() || 'U';
  const mostrarImagen = src && src !== srcConError;

  return (
    <div
      className={`relative bg-white border-[3px] border-black rounded-full flex items-center justify-center overflow-hidden shrink-0 ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      {mostrarImagen ? (
        <Image
          src={src}
          alt={nombre || 'Usuario'}
          fill
          sizes={`${size}px`}
          className="object-cover"
          referrerPolicy="no-referrer"
          unoptimized
          onError={() => setSrcConError(src)}
        />
      ) : (
        <span className={`font-black text-black leading-none ${textoClassName}`}>
          {inicial}
        </span>
      )}
    </div>
  );
}
