'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Camera,
  RotateCcw,
  Flag,
  MessageCircle,
  BarChart3,
  Star,
  Trophy,
  Bell,
  Search,
  Plus,
} from 'lucide-react';
import Cuncuna from '../mascota/Cuncuna';

// ============================================================
// AppShell — chrome de la zona /app (estilo SaaS suave).
// Sidebar oscuro + topbar claro. Envuelve el contenido de cada
// página. Presentacional: recibe título y children.
// ============================================================

const NAV = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/diccionario', label: 'Diccionario', icon: BookOpen },
  { href: '/app/practica', label: 'Práctica', icon: Camera },
  { href: '/app/repaso', label: 'Repaso', icon: RotateCcw },
  { href: '/app/misiones', label: 'Misiones', icon: Flag },
  { href: '/app/conversaciones', label: 'Conversaciones', icon: MessageCircle },
  { href: '/app/estadisticas', label: 'Estadísticas', icon: BarChart3 },
  { href: '/app/favoritos', label: 'Favoritos', icon: Star },
  { href: '/app/logros', label: 'Logros', icon: Trophy },
  { href: '/app/recordatorios', label: 'Recordatorios', icon: Bell },
];

export default function AppShell({
  title = 'Dashboard',
  onContinuar,
  usuario = { nombre: 'Aprendiz', email: '' },
  children,
}) {
  const pathname = usePathname();

  // El dashboard usa estilo claro; nos aseguramos de no heredar el .dark global.
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F1EC] text-neutral-900 flex">
      {/* ─── SIDEBAR ─── */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-[#0E0E10] text-neutral-300 p-4 gap-6 sticky top-0 h-screen">
        <Link href="/app" className="flex items-center gap-2 px-2 pt-2">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-violet-600">
            <Cuncuna estado="idle" size={20} animado={false} />
          </span>
          <span className="text-white font-bold text-lg tracking-tight">
            Cuncuna
          </span>
        </Link>

        <nav className="flex flex-col gap-1">
          <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            Navegación
          </p>
          {NAV.map(({ href, label, icon: Icon }) => {
            const activo =
              href === '/app' ? pathname === '/app' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={activo ? 'page' : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  activo
                    ? 'bg-violet-600 text-white'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-violet-600 text-white text-sm font-semibold">
            {usuario.nombre?.[0]?.toUpperCase() ?? 'A'}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {usuario.nombre}
            </p>
            <Link
              href="/app/perfil"
              className="text-xs text-neutral-400 hover:text-white"
            >
              Ver perfil
            </Link>
          </div>
        </div>
      </aside>

      {/* ─── CONTENIDO ─── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-black/5 bg-[#F6F1EC]/80 px-5 md:px-8 py-4 backdrop-blur">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2">
              <Search size={16} className="text-neutral-400" />
              <input
                type="search"
                aria-label="Buscar"
                placeholder="Buscar…"
                className="w-32 bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
            </div>
            <button
              type="button"
              aria-label="Notificaciones"
              className="grid place-items-center w-10 h-10 rounded-xl border border-black/10 bg-white text-neutral-600 hover:bg-neutral-50"
            >
              <Bell size={18} />
            </button>
            <button
              type="button"
              onClick={onContinuar}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition-colors"
            >
              <Plus size={18} />
              Continuar
            </button>
          </div>
        </header>

        <main className="flex-1 px-5 md:px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
