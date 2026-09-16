'use client';

import { useEffect, useState } from 'react';
import { LoaderCircle, ShieldCheck, Trash2, UserPlus } from 'lucide-react';
import { createClient } from '../../lib/supabase-client';

// ============================================================
// GestionAdmins — agregar/quitar administradores por correo.
// Usa RPCs de Postgres (listar_admins, agregar_admin, quitar_admin)
// porque buscar por correo requiere acceso a auth.users.
// Si las funciones no existen aún, muestra instrucciones.
// ============================================================

export default function GestionAdmins({ usuarioId }) {
  const [admins, setAdmins] = useState([]);
  const [correo, setCorreo] = useState('');
  const [estado, setEstado] = useState('cargando');
  const [mensaje, setMensaje] = useState('');
  const [faltaSql, setFaltaSql] = useState(false);

  const cargar = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.rpc('listar_admins');
    if (error) {
      // 42883 = función no existe
      if (error.code === '42883' || /does not exist|could not find/i.test(error.message)) {
        setFaltaSql(true);
      } else {
        setMensaje(error.message);
      }
      setEstado('idle');
      return;
    }
    setAdmins(data ?? []);
    setEstado('idle');
  };

  useEffect(() => {
    const supabase = createClient();
    supabase.rpc('listar_admins').then(({ data, error }) => {
      if (error) {
        if (error.code === '42883' || /does not exist|could not find/i.test(error.message)) {
          setFaltaSql(true);
        } else {
          setMensaje(error.message);
        }
      } else {
        setAdmins(data ?? []);
      }
      setEstado('idle');
    });
  }, []);

  const agregar = async (event) => {
    event.preventDefault();
    const email = correo.trim();
    if (!email) return;
    setEstado('guardando');
    setMensaje('');
    const supabase = createClient();
    const { error } = await supabase.rpc('agregar_admin', { correo: email });
    if (error) {
      setEstado('error');
      setMensaje(error.message);
      return;
    }
    setCorreo('');
    setEstado('exito');
    setMensaje(`${email} ahora es administrador.`);
    await cargar();
  };

  const quitar = async (uid, email) => {
    if (uid === usuarioId) return;
    setEstado('guardando');
    setMensaje('');
    const supabase = createClient();
    const { error } = await supabase.rpc('quitar_admin', { uid });
    if (error) {
      setEstado('error');
      setMensaje(error.message);
      return;
    }
    setEstado('exito');
    setMensaje(`${email} ya no es administrador.`);
    await cargar();
  };

  return (
    <section className="rounded-2xl border border-black/5 bg-white p-5 md:p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <span className="grid place-items-center w-11 h-11 rounded-xl bg-violet-100 text-violet-700">
          <ShieldCheck size={20} />
        </span>
        <div>
          <p className="text-xs font-medium text-neutral-500">Permisos</p>
          <h2 className="text-xl font-bold tracking-tight">Administradores</h2>
        </div>
      </div>

      {faltaSql ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-semibold mb-1">Falta configurar las funciones en Supabase.</p>
          <p>
            Corre el SQL indicado (funciones <code>listar_admins</code>, <code>agregar_admin</code> y{' '}
            <code>quitar_admin</code>) en el SQL Editor de Supabase para habilitar esta sección.
          </p>
        </div>
      ) : (
        <>
          <form onSubmit={agregar} className="flex flex-col sm:flex-row gap-2 mb-5">
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.cl"
              aria-label="Correo del nuevo administrador"
              required
              className="flex-1 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-violet-300"
            />
            <button
              type="submit"
              disabled={estado === 'guardando'}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
            >
              {estado === 'guardando' ? <LoaderCircle size={16} className="animate-spin" /> : <UserPlus size={16} />}
              Agregar
            </button>
          </form>

          <p className="text-xs text-neutral-400 mb-4">
            La persona debe haber iniciado sesión al menos una vez con ese correo.
          </p>

          {mensaje && (
            <div className={`rounded-xl border p-3 mb-4 text-sm font-medium ${
              estado === 'error'
                ? 'border-rose-200 bg-rose-50 text-rose-700'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}>
              {mensaje}
            </div>
          )}

          <div className="flex flex-col divide-y divide-black/5 rounded-xl border border-black/5 overflow-hidden">
            {estado === 'cargando' ? (
              <p className="px-4 py-6 text-center text-sm text-neutral-400">Cargando…</p>
            ) : admins.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-neutral-400">Sin administradores.</p>
            ) : (
              admins.map((admin) => {
                const esYo = admin.user_id === usuarioId;
                return (
                  <div key={admin.user_id} className="flex items-center gap-3 px-4 py-3">
                    <span className="grid place-items-center w-9 h-9 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold shrink-0">
                      {admin.email?.[0]?.toUpperCase() ?? '?'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{admin.email}</p>
                      {esYo && <p className="text-xs text-neutral-400">Tú</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => quitar(admin.user_id, admin.email)}
                      disabled={esYo || estado === 'guardando'}
                      className="grid place-items-center w-9 h-9 rounded-lg border border-black/10 bg-white text-neutral-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label={`Quitar a ${admin.email}`}
                      title={esYo ? 'No puedes quitarte a ti mismo' : 'Quitar administrador'}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </section>
  );
}
