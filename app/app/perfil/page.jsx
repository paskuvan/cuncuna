'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Crown,
  Flame,
  LogOut,
  Route,
  Star,
  Target,
  User,
} from 'lucide-react';
import { CURRICULUM } from '../../data/curriculum';
import { useProgreso } from '../../hooks/useProgreso';
import { useUsuario } from '../../hooks/useUsuario';
import { obtenerPlanActual } from '../../lib/acceso-plan';
import { obtenerOnboarding } from '../../lib/onboarding-local';
import { obtenerRecordatorios } from '../../lib/recordatorios-locales';

const etiquetasMotivo = {
  familia: 'Familia o amistades',
  trabajo: 'Trabajo o atención',
  curiosidad: 'Aprendizaje personal',
  aprendizaje: 'Aprendizaje personal',
};

const etiquetasNivel = {
  cero: 'Desde cero',
  basico: 'Básico',
  practica: 'Con práctica',
};

const etiquetasTipoRecordatorio = {
  repaso: 'Repaso diario',
  mision: 'Misiones',
  leccion: 'Nueva lección',
};

export default function PaginaPerfil() {
  const { usuario, cerrarSesion } = useUsuario();
  const { progreso } = useProgreso();
  const plan = obtenerPlanActual();
  const onboarding = obtenerOnboarding();
  const recordatorios = obtenerRecordatorios();

  const totalLecciones = CURRICULUM.reduce(
    (total, nivel) => total + nivel.lecciones.length,
    0,
  );
  const completadas = progreso.leccionesCompletadas.length;
  const porcentaje = totalLecciones
    ? Math.round((completadas / totalLecciones) * 100)
    : 0;

  const nombre = usuario?.user_metadata?.full_name || usuario?.email || 'Cuenta Cuncuna';
  const avatar = usuario?.user_metadata?.avatar_url;
  const inicial = nombre?.[0]?.toUpperCase() || 'C';

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
              Mi perfil
            </h1>
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider hidden sm:block">
              Cuenta, plan y ruta de aprendizaje
            </p>
          </div>
          <div
            className="bg-[#FFD23F] border-[3px] border-white px-3 py-1.5 font-black text-black text-sm"
            style={{ boxShadow: '3px 3px 0 #FF6B9D' }}
          >
            {plan.nombre}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6">
        <section
          className="bg-[#FFD23F] border-[4px] border-black p-5 md:p-7 mb-6"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div
              className="w-24 h-24 bg-white border-[4px] border-black flex items-center justify-center overflow-hidden shrink-0"
              style={{ boxShadow: '7px 7px 0 #FF6B9D' }}
            >
              {avatar ? (
                <Image
                  src={avatar}
                  alt={nombre}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="font-black text-black text-4xl">{inicial}</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-black uppercase text-xs tracking-[0.2em] text-black/60 mb-2">
                Tu cuenta
              </p>
              <h2 className="font-black uppercase text-4xl md:text-5xl text-black leading-none wrap-break-word">
                {nombre}
              </h2>
              {usuario?.email && (
                <p className="font-bold text-black/70 mt-2 wrap-break-word">
                  {usuario.email}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4 mb-6">
          <StatCard icono={Star} color="#FFD23F" titulo="XP" valor={progreso.xpTotal} />
          <StatCard icono={Flame} color="#FF6B9D" titulo="Racha" valor={progreso.racha} />
          <StatCard icono={Target} color="#7FFF6B" titulo="Avance" valor={`${porcentaje}%`} />
        </section>

        <section className="grid lg:grid-cols-[1fr_1fr] gap-5">
          <Panel titulo="Plan actual" icono={Crown}>
            <div
              className="border-[3px] border-black p-4 mb-4"
              style={{ backgroundColor: plan.color, boxShadow: '5px 5px 0 #000' }}
            >
              <p className="font-black uppercase text-2xl text-black leading-none">
                {plan.nombre}
              </p>
              <p className="font-bold text-black/70 text-sm mt-2">{plan.descripcion}</p>
            </div>
            <p className="font-bold text-black/70 text-sm mb-4">
              {completadas}/{totalLecciones} lecciones completadas.
            </p>
            <Link
              href="/suscripcion"
              className="bg-black text-[#FFD23F] border-[3px] border-black px-4 py-3 font-black uppercase text-sm inline-flex"
              style={{ boxShadow: '5px 5px 0 #FF6B9D' }}
            >
              Cambiar plan
            </Link>
          </Panel>

          <Panel titulo="Mi ruta" icono={Route}>
            <InfoLine
              etiqueta="Objetivo"
              valor={etiquetasMotivo[onboarding.motivo] || 'Sin definir'}
            />
            <InfoLine
              etiqueta="Nivel"
              valor={etiquetasNivel[onboarding.nivel] || 'Sin definir'}
            />
            <InfoLine
              etiqueta="Meta"
              valor={`${onboarding.metaSemanal} días por semana · ${onboarding.ritmo} min`}
            />
            <InfoLine
              etiqueta="Temas"
              valor={onboarding.intereses.length ? onboarding.intereses.join(', ') : 'Sin definir'}
            />
            <Link
              href="/app/onboarding"
              className="mt-4 bg-white text-black border-[3px] border-black px-4 py-3 font-black uppercase text-sm inline-flex items-center gap-2"
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              <ClipboardList size={18} strokeWidth={4} />
              Editar ruta
            </Link>
          </Panel>

          <Panel titulo="Recordatorios" icono={Bell}>
            <InfoLine etiqueta="Estado" valor={recordatorios.activo ? 'Activo' : 'Pausado'} />
            <InfoLine etiqueta="Hora" valor={recordatorios.hora} />
            <InfoLine
              etiqueta="Tipo"
              valor={etiquetasTipoRecordatorio[recordatorios.tipo] || 'Repaso diario'}
            />
            <InfoLine etiqueta="Días" valor={`${recordatorios.dias.length} días activos`} />
            <Link
              href="/app/recordatorios"
              className="mt-4 bg-[#FF6B9D] text-white border-[3px] border-black px-4 py-3 font-black uppercase text-sm inline-flex items-center gap-2"
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              <Bell size={18} strokeWidth={4} />
              Ajustar
            </Link>
          </Panel>

          <Panel titulo="Accesos rápidos" icono={BookOpen}>
            <div className="grid sm:grid-cols-2 gap-3">
              <QuickLink href="/app/diccionario" texto="Diccionario" />
              <QuickLink href="/app/repaso" texto="Repaso" />
              <QuickLink href="/app/estadisticas" texto="Estadísticas" />
              <QuickLink href="/app/favoritos" texto="Favoritos" />
            </div>
            <button
              onClick={cerrarSesion}
              className="mt-4 w-full bg-[#FF6B6B] text-white border-[3px] border-black px-4 py-3 font-black uppercase text-sm flex items-center justify-center gap-2"
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              <LogOut size={18} strokeWidth={4} />
              Cerrar sesión
            </button>
          </Panel>
        </section>
      </main>
    </div>
  );
}

function StatCard({ icono: Icono, color, titulo, valor }) {
  return (
    <article
      className="bg-white border-[4px] border-black p-4"
      style={{ boxShadow: '7px 7px 0 #000' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="border-[3px] border-black w-12 h-12 flex items-center justify-center"
          style={{ backgroundColor: color, boxShadow: '3px 3px 0 #000' }}
        >
          <Icono size={24} strokeWidth={4} className="text-black" />
        </div>
        <div>
          <p className="font-black uppercase text-xs tracking-[0.15em] text-black/50">
            {titulo}
          </p>
          <p className="font-black uppercase text-3xl text-black leading-none">{valor}</p>
        </div>
      </div>
    </article>
  );
}

function Panel({ titulo, icono: Icono, children }) {
  return (
    <section
      className="bg-white border-[4px] border-black p-5"
      style={{ boxShadow: '8px 8px 0 #000' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icono size={22} strokeWidth={4} className="text-black" />
        <h3 className="font-black uppercase text-2xl text-black leading-none">{titulo}</h3>
      </div>
      {children}
    </section>
  );
}

function InfoLine({ etiqueta, valor }) {
  return (
    <div className="border-b-[3px] border-black py-3 first:pt-0">
      <p className="font-black uppercase text-[10px] tracking-[0.15em] text-black/50">
        {etiqueta}
      </p>
      <p className="font-bold text-black wrap-break-word">{valor}</p>
    </div>
  );
}

function QuickLink({ href, texto }) {
  return (
    <Link
      href={href}
      className="bg-white text-black border-[3px] border-black px-3 py-3 font-black uppercase text-xs text-center hover:translate-y-[-2px] transition-transform"
      style={{ boxShadow: '4px 4px 0 #000' }}
    >
      {texto}
    </Link>
  );
}
