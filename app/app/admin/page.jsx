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
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
        <main
          className="bg-white border-[4px] border-black p-7 max-w-lg w-full text-center"
          style={{ boxShadow: '12px 12px 0 #000' }}
        >
          <ShieldAlert size={52} strokeWidth={3} className="mx-auto mb-4" />
          <h1 className="font-black uppercase text-3xl text-black">Acceso restringido</h1>
          <p className="font-bold text-black/70 mt-3 mb-6">
            Esta cuenta no tiene permisos para administrar contenido.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 bg-black text-[#FFD23F] border-[3px] border-black px-5 py-3 font-black uppercase text-sm"
            style={{ boxShadow: '5px 5px 0 #FF6B9D' }}
          >
            <ArrowLeft size={18} strokeWidth={3} />
            Volver al mapa
          </Link>
        </main>
      </div>
    );
  }

  return <PanelContenido usuarioId={user.id} />;
}
