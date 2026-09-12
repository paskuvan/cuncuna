import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { createClient } from '../../lib/supabase-server';
import PanelContenido from './panel-contenido';

export default async function PaginaAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: admin } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!admin) {
    return (
      <div className="min-h-screen bg-[#F6F1EC] text-neutral-900 flex items-center justify-center p-4">
        <main className="rounded-3xl border border-black/5 bg-white p-8 max-w-lg w-full text-center shadow-sm">
          <span className="grid place-items-center w-16 h-16 mx-auto rounded-2xl bg-rose-100 text-rose-600 mb-4">
            <ShieldAlert size={28} />
          </span>
          <h1 className="text-2xl font-bold tracking-tight">Acceso restringido</h1>
          <p className="text-neutral-500 mt-3 mb-6">
            Esta cuenta no tiene permisos para administrar contenido.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Volver al dashboard
          </Link>
        </main>
      </div>
    );
  }

  return <PanelContenido usuarioId={user.id} />;
}
