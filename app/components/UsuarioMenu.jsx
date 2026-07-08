'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, LogOut, User } from 'lucide-react';
import { useUsuario } from '../hooks/useUsuario';
import { createClient } from '../lib/supabase-client';

// ============================================================
// COMPONENTE: UsuarioMenu
// Avatar circular con dropdown para cerrar sesión.
// Va en el header del Mapa.
// ============================================================

export default function UsuarioMenu() {
  const { usuario, cerrarSesion } = useUsuario();
  const [abierto, setAbierto] = useState(false);
  const [esAdmin, setEsAdmin] = useState(false);

  useEffect(() => {
    if (!usuario) return;
    const supabase = createClient();
    supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', usuario.id)
      .maybeSingle()
      .then(({ data }) => setEsAdmin(Boolean(data)));
  }, [usuario]);

  if (!usuario) return null;

  const nombre = usuario.user_metadata?.full_name || usuario.email;
  const avatar = usuario.user_metadata?.avatar_url;
  const inicial = nombre?.[0]?.toUpperCase() || 'U';

  return (
    <div className="relative">
      <button
        onClick={() => setAbierto(!abierto)}
        className="bg-white border-[3px] border-white w-10 h-10 flex items-center justify-center overflow-hidden hover:-translate-y-0.5 transition-transform"
        style={{ boxShadow: '3px 3px 0 #FFD23F' }}
        aria-label="Menú de usuario"
      >
        {avatar ? (
          <Image src={avatar} alt={nombre} width={40} height={40} className="w-full h-full object-cover" unoptimized />
        ) : (
          <span className="font-black text-black text-lg">{inicial}</span>
        )}
      </button>

      {abierto && (
        <>
          {/* Backdrop para cerrar al hacer click fuera */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setAbierto(false)}
          />

          {/* Dropdown */}
          <div
            className="absolute right-0 top-full mt-3 bg-white border-[3px] border-black w-64 z-50"
            style={{ boxShadow: '6px 6px 0 #000' }}
          >
            {/* Info del usuario */}
            <div className="p-4 border-b-[3px] border-black bg-[#FFD23F]">
              <div className="flex items-center gap-2 mb-1">
                <User size={16} strokeWidth={3} className="text-black" />
                <span className="font-black uppercase text-xs tracking-wider text-black">
                  Tu cuenta
                </span>
              </div>
              <p className="font-black text-black text-sm wrap-break-word">{nombre}</p>
              <p className="font-bold text-black/70 text-xs wrap-break-word mt-0.5">
                {usuario.email}
              </p>
            </div>

            {esAdmin && (
              <Link
                href="/app/admin"
                className="w-full p-4 border-b-[3px] border-black bg-white text-black font-black uppercase text-sm flex items-center gap-3 hover:bg-[#7FFF6B] transition-colors"
              >
                <LayoutDashboard size={18} strokeWidth={3} />
                Panel de contenido
              </Link>
            )}

            <button
              onClick={cerrarSesion}
              className="w-full p-4 bg-white text-black font-black uppercase text-sm flex items-center gap-3 hover:bg-[#FF6B6B] hover:text-white transition-colors"
            >
              <LogOut size={18} strokeWidth={3} />
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}
