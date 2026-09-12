'use client';

import Link from 'next/link';
import {
  Bell,
  BookOpen,
  ClipboardList,
  Crown,
  Flame,
  LogOut,
  Route,
  Star,
  Target,
} from 'lucide-react';
import { CURRICULUM } from '../../data/curriculum';
import AvatarUsuario from '../../components/AvatarUsuario';
import AppShell from '../../components/dashboard/AppShell';
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
const etiquetasNivel = { cero: 'Desde cero', basico: 'Básico', practica: 'Con práctica' };
const etiquetasTipoRecordatorio = {
  repaso: 'Repaso diario',
  mision: 'Misiones',
  leccion: 'Nueva lección',
};

// ============================================================
// PÁGINA: /app/perfil  (estilo suave)
// ============================================================

export default function PaginaPerfil() {
  const { usuario, cerrarSesion } = useUsuario();
  const { progreso } = useProgreso();
  const plan = obtenerPlanActual();
  const onboarding = obtenerOnboarding();
  const recordatorios = obtenerRecordatorios();

  const totalLecciones = CURRICULUM.reduce((t, n) => t + n.lecciones.length, 0);
  const completadas = progreso.leccionesCompletadas.length;
  const porcentaje = totalLecciones ? Math.round((completadas / totalLecciones) * 100) : 0;

  const nombre = usuario?.user_metadata?.full_name || usuario?.email || 'Cuenta Cuncuna';
  const avatar = usuario?.user_metadata?.avatar_url || usuario?.user_metadata?.picture;

  return (
    <AppShell title="Mi perfil">
      <div className="flex flex-col gap-6 max-w-5xl">
        {/* Cabecera de cuenta */}
        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <AvatarUsuario nombre={nombre} src={avatar} size={80} textoClassName="text-3xl" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-neutral-500">Tu cuenta</p>
              <h2 className="text-2xl font-bold tracking-tight break-words">{nombre}</h2>
              {usuario?.email && (
                <p className="mt-1 text-sm text-neutral-500 break-words">{usuario.email}</p>
              )}
            </div>
            <span className="sm:ml-auto self-start rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
              Plan {plan.nombre}
            </span>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-3">
          <StatCard icon={Star} tono="bg-violet-100 text-violet-700" titulo="XP" valor={progreso.xpTotal} />
          <StatCard icon={Flame} tono="bg-orange-100 text-orange-600" titulo="Racha" valor={progreso.racha} />
          <StatCard icon={Target} tono="bg-emerald-100 text-emerald-600" titulo="Avance" valor={`${porcentaje}%`} />
        </section>

        {/* Paneles */}
        <section className="grid lg:grid-cols-2 gap-5">
          <Panel titulo="Plan actual" icon={Crown}>
            <div
              className="rounded-xl p-4 mb-4"
              style={{ backgroundColor: `${plan.color}22` }}
            >
              <p className="text-lg font-bold">{plan.nombre}</p>
              <p className="mt-1 text-sm text-neutral-600">{plan.descripcion}</p>
            </div>
            <p className="text-sm text-neutral-500 mb-4">
              {completadas}/{totalLecciones} lecciones completadas.
            </p>
            <Link
              href="/suscripcion"
              className="inline-flex rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
            >
              Cambiar plan
            </Link>
          </Panel>

          <Panel titulo="Mi ruta" icon={Route}>
            <InfoLine etiqueta="Objetivo" valor={etiquetasMotivo[onboarding.motivo] || 'Sin definir'} />
            <InfoLine etiqueta="Nivel" valor={etiquetasNivel[onboarding.nivel] || 'Sin definir'} />
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
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              <ClipboardList size={16} />
              Editar ruta
            </Link>
          </Panel>

          <Panel titulo="Recordatorios" icon={Bell}>
            <InfoLine etiqueta="Estado" valor={recordatorios.activo ? 'Activo' : 'Pausado'} />
            <InfoLine etiqueta="Hora" valor={recordatorios.hora} />
            <InfoLine etiqueta="Tipo" valor={etiquetasTipoRecordatorio[recordatorios.tipo] || 'Repaso diario'} />
            <InfoLine etiqueta="Días" valor={`${recordatorios.dias.length} días activos`} />
            <Link
              href="/app/recordatorios"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              <Bell size={16} />
              Ajustar
            </Link>
          </Panel>

          <Panel titulo="Accesos rápidos" icon={BookOpen}>
            <div className="grid grid-cols-2 gap-2">
              <QuickLink href="/app/diccionario" texto="Diccionario" />
              <QuickLink href="/app/repaso" texto="Repaso" />
              <QuickLink href="/app/estadisticas" texto="Estadísticas" />
              <QuickLink href="/app/favoritos" texto="Favoritos" />
            </div>
            <button
              onClick={cerrarSesion}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition-colors"
            >
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </Panel>
        </section>
      </div>
    </AppShell>
  );
}

function StatCard({ icon: Icon, tono, titulo, valor }) {
  return (
    <article className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={`grid place-items-center w-10 h-10 rounded-xl ${tono}`}>
          <Icon size={20} />
        </span>
        <div>
          <p className="text-xs text-neutral-500">{titulo}</p>
          <p className="text-2xl font-bold leading-none">{valor}</p>
        </div>
      </div>
    </article>
  );
}

function Panel({ titulo, icon: Icon, children }) {
  return (
    <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className="text-neutral-500" />
        <h3 className="font-bold tracking-tight">{titulo}</h3>
      </div>
      {children}
    </section>
  );
}

function InfoLine({ etiqueta, valor }) {
  return (
    <div className="border-b border-black/5 py-3 first:pt-0 last:border-0">
      <p className="text-xs text-neutral-500">{etiqueta}</p>
      <p className="font-medium break-words">{valor}</p>
    </div>
  );
}

function QuickLink({ href, texto }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-black/10 bg-white px-3 py-2.5 text-center text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
    >
      {texto}
    </Link>
  );
}
