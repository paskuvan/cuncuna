import { createClient } from './supabase-client';
import { obtenerNivelesDiccionario } from './diccionario';

export async function obtenerSenasPublicadas() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('contenido_senas')
    .select('id,palabra,descripcion,region,nivel,video_path,poster_path,credito')
    .eq('estado', 'publicada')
    .order('created_at', { ascending: false });

  if (error) throw error;

  const niveles = obtenerNivelesDiccionario();

  return (data ?? []).map((item) => {
    const nivel = niveles.find((opcion) => opcion.id === item.nivel) ?? niveles[0];
    const videoUrl = supabase.storage.from('videos').getPublicUrl(item.video_path).data.publicUrl;
    const posterUrl = item.poster_path
      ? supabase.storage.from('posters').getPublicUrl(item.poster_path).data.publicUrl
      : undefined;

    return {
      id: `cms-${item.id}`,
      palabra: item.palabra,
      descripcion: item.descripcion,
      videoUrl,
      posterUrl,
      nivelId: nivel.id,
      nivelNumero: nivel.numero,
      nivelTitulo: nivel.titulo,
      nivelColor: nivel.color,
      nivelIcono: nivel.icono,
      leccionId: 'contenido-comunidad',
      leccionTitulo: 'Contenido publicado',
      xp: 10,
      region: item.region,
      credito: item.credito,
      origen: 'panel',
    };
  });
}
