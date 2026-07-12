'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  CloudUpload,
  Edit3,
  Eye,
  FileVideo,
  Filter,
  ImageIcon,
  LoaderCircle,
  Plus,
  RotateCcw,
  Save,
  Search,
  X,
} from 'lucide-react';
import { createClient } from '../../lib/supabase-client';
import VideoPlayer from '../../components/VideoPlayer';

const CAMPOS_CONTENIDO =
  'id,palabra,descripcion,nivel,region,credito,consentimiento,video_path,poster_path,estado,created_at';

const ESTADO_INICIAL = {
  palabra: '',
  descripcion: '',
  region: 'Chile',
  nivel: 'nivel-1',
  credito: '',
  consentimiento: false,
};

export default function PanelContenido({ usuarioId }) {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [video, setVideo] = useState(null);
  const [poster, setPoster] = useState(null);
  const [contenido, setContenido] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroNivel, setFiltroNivel] = useState('todos');
  const [estado, setEstado] = useState('idle');
  const [mensaje, setMensaje] = useState('');
  const [vistaPrevia, setVistaPrevia] = useState(null);

  const contenidoFiltrado = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return contenido.filter((item) => {
      const coincideTexto =
        !texto ||
        item.palabra.toLowerCase().includes(texto) ||
        item.descripcion.toLowerCase().includes(texto) ||
        item.region.toLowerCase().includes(texto) ||
        item.credito?.toLowerCase().includes(texto);
      const coincideEstado = filtroEstado === 'todos' || item.estado === filtroEstado;
      const coincideNivel = filtroNivel === 'todos' || item.nivel === filtroNivel;

      return coincideTexto && coincideEstado && coincideNivel;
    });
  }, [busqueda, contenido, filtroEstado, filtroNivel]);

  const cargarContenido = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('contenido_senas')
      .select(CAMPOS_CONTENIDO)
      .order('created_at', { ascending: false });
    setContenido(data ?? []);
  };

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('contenido_senas')
      .select(CAMPOS_CONTENIDO)
      .order('created_at', { ascending: false })
      .then(({ data }) => setContenido(data ?? []));
  }, []);

  const actualizar = (campo, valor) => {
    setFormulario((actual) => ({ ...actual, [campo]: valor }));
  };

  const limpiarFormulario = () => {
    setFormulario(ESTADO_INICIAL);
    setVideo(null);
    setPoster(null);
    setEditandoId(null);
    setMensaje('');
    setEstado('idle');
  };

  const editarItem = (item) => {
    setFormulario({
      palabra: item.palabra,
      descripcion: item.descripcion,
      region: item.region,
      nivel: item.nivel,
      credito: item.credito ?? '',
      consentimiento: item.consentimiento,
    });
    setVideo(null);
    setPoster(null);
    setEditandoId(item.id);
    setMensaje('Editando ficha existente. Sube archivos solo si quieres reemplazarlos.');
    setEstado('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const subirArchivo = async (supabase, bucket, archivo, prefijo) => {
    if (!archivo) return null;
    const extension = archivo.name.split('.').pop()?.toLowerCase();
    const nombre = `${prefijo}-${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(nombre, archivo, { contentType: archivo.type, upsert: false });

    if (error) throw error;
    return nombre;
  };

  const guardar = async (event) => {
    event.preventDefault();
    if ((!video && !editandoId) || !formulario.consentimiento) return;

    setEstado('guardando');
    setMensaje(editandoId ? 'Actualizando ficha...' : 'Subiendo archivos...');
    const supabase = createClient();

    try {
      const prefijo = formulario.palabra
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const videoPath = await subirArchivo(supabase, 'videos', video, prefijo);
      const posterPath = await subirArchivo(supabase, 'posters', poster, prefijo);

      setMensaje('Guardando ficha...');
      const payload = {
        palabra: formulario.palabra.trim(),
        descripcion: formulario.descripcion.trim(),
        region: formulario.region.trim(),
        nivel: formulario.nivel,
        credito: formulario.credito.trim() || null,
        consentimiento: formulario.consentimiento,
        updated_at: new Date().toISOString(),
      };

      if (videoPath) payload.video_path = videoPath;
      if (posterPath) payload.poster_path = posterPath;

      const { error } = editandoId
        ? await supabase
          .from('contenido_senas')
          .update(payload)
          .eq('id', editandoId)
        : await supabase.from('contenido_senas').insert({
        ...payload,
        video_path: videoPath,
        poster_path: posterPath,
        estado: 'borrador',
        created_by: usuarioId,
      });

      if (error) throw error;
      limpiarFormulario();
      setEstado('exito');
      setMensaje(editandoId ? 'Ficha actualizada.' : 'Borrador guardado. Revísalo antes de publicar.');
      await cargarContenido();
    } catch (error) {
      setEstado('error');
      setMensaje(error.message || 'No se pudo guardar el contenido.');
    }
  };

  const alternarEstado = async (item) => {
    const siguienteEstado = item.estado === 'publicada' ? 'borrador' : 'publicada';
    const supabase = createClient();
    setEstado('guardando');
    setMensaje(`Cambiando a ${siguienteEstado}...`);

    const { error } = await supabase
      .from('contenido_senas')
      .update({
        estado: siguienteEstado,
        updated_at: new Date().toISOString(),
      })
      .eq('id', item.id);

    if (error) {
      setEstado('error');
      setMensaje(error.message);
      return;
    }

    setContenido((actual) =>
      actual.map((contenidoItem) =>
        contenidoItem.id === item.id
          ? { ...contenidoItem, estado: siguienteEstado }
          : contenidoItem
      )
    );
    setVistaPrevia((actual) =>
      actual?.id === item.id ? { ...actual, estado: siguienteEstado } : actual
    );
    setEstado('exito');
    setMensaje(`La seña ahora está en estado ${siguienteEstado}.`);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <header className="bg-black border-b-[4px] border-black sticky top-0 z-20">
        <div className="max-w-6xl mx-auto p-4 flex items-center gap-3">
          <Link
            href="/app"
            className="bg-white border-[3px] border-white p-2"
            style={{ boxShadow: '3px 3px 0 #FFD23F' }}
            aria-label="Volver"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="flex-1">
            <h1 className="text-white font-black uppercase text-xl leading-none">
              Panel de contenido
            </h1>
            <p className="text-white/60 font-bold uppercase text-xs mt-1">
              Videos y señas LSCh
            </p>
          </div>
          <div className="bg-[#7FFF6B] border-[3px] border-white px-3 py-2 font-black text-sm">
            {contenido.length} fichas
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-7 items-start">
          <form
            onSubmit={guardar}
            className="bg-white border-[4px] border-black p-5 md:p-7"
            style={{ boxShadow: '10px 10px 0 #000' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#FFD23F] border-[3px] border-black p-2">
                {editandoId ? <Edit3 size={24} strokeWidth={4} /> : <Plus size={24} strokeWidth={4} />}
              </div>
              <div>
                <p className="font-black uppercase text-xs text-black/50">
                  {editandoId ? 'Modo edición' : 'Nueva ficha'}
                </p>
                <h2 className="font-black uppercase text-2xl text-black">
                  {editandoId ? 'Editar seña' : 'Agregar una seña'}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Campo etiqueta="Nombre de la seña">
                <input required value={formulario.palabra} onChange={(e) => actualizar('palabra', e.target.value)} className="campo-admin" placeholder="Ej: Hola" />
              </Campo>
              <Campo etiqueta="Región o variante">
                <input required value={formulario.region} onChange={(e) => actualizar('region', e.target.value)} className="campo-admin" placeholder="Ej: Santiago" />
              </Campo>
              <Campo etiqueta="Nivel">
                <select value={formulario.nivel} onChange={(e) => actualizar('nivel', e.target.value)} className="campo-admin">
                  <option value="nivel-0">Introducción</option>
                  <option value="nivel-1">Fundamentos</option>
                  <option value="nivel-2">Vida cotidiana</option>
                  <option value="nivel-3">Conversación</option>
                </select>
              </Campo>
              <Campo etiqueta="Crédito público (opcional)">
                <input value={formulario.credito} onChange={(e) => actualizar('credito', e.target.value)} className="campo-admin" placeholder="Nombre o seudónimo" />
              </Campo>
            </div>

            <Campo etiqueta="Descripción">
              <textarea required value={formulario.descripcion} onChange={(e) => actualizar('descripcion', e.target.value)} className="campo-admin min-h-28 resize-y" placeholder="Describe el movimiento y su contexto." />
            </Campo>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Archivo icono={<FileVideo size={24} />} etiqueta={editandoId ? 'Reemplazar video MP4' : 'Video MP4'} archivo={video} aceptar="video/mp4" onChange={setVideo} requerido={!editandoId} />
              <Archivo icono={<ImageIcon size={24} />} etiqueta="Portada" archivo={poster} aceptar="image/jpeg,image/png,image/webp" onChange={setPoster} />
            </div>

            <label className="flex items-start gap-3 mt-5 bg-[#F5F0E8] border-[3px] border-black p-4 cursor-pointer">
              <input type="checkbox" checked={formulario.consentimiento} onChange={(e) => actualizar('consentimiento', e.target.checked)} className="mt-1 w-5 h-5 accent-black" />
              <span>
                <span className="block font-black uppercase text-sm">Consentimiento confirmado</span>
                <span className="block font-bold text-xs text-black/60 mt-1">La persona autoriza este uso o el material protege su identidad según lo acordado.</span>
              </span>
            </label>

            {mensaje && (
              <div className={`border-[3px] border-black p-3 mt-5 font-bold text-sm ${estado === 'error' ? 'bg-[#FF6B6B] text-white' : 'bg-[#FFD23F] text-black'}`}>
                {mensaje}
              </div>
            )}

            <button
              type="submit"
              disabled={estado === 'guardando' || (!video && !editandoId) || !formulario.consentimiento}
              className="w-full mt-5 bg-black text-[#FFD23F] border-[3px] border-black p-4 font-black uppercase flex items-center justify-center gap-2 disabled:opacity-40"
              style={{ boxShadow: '6px 6px 0 #FF6B9D' }}
            >
              {estado === 'guardando' ? <LoaderCircle size={20} className="animate-spin" /> : editandoId ? <Save size={20} strokeWidth={3} /> : <CloudUpload size={20} strokeWidth={3} />}
              {estado === 'guardando' ? 'Guardando...' : editandoId ? 'Actualizar ficha' : 'Guardar borrador'}
            </button>
            {editandoId && (
              <button
                type="button"
                onClick={limpiarFormulario}
                className="w-full mt-3 bg-white text-black border-[3px] border-black p-3 font-black uppercase flex items-center justify-center gap-2"
                style={{ boxShadow: '5px 5px 0 #000' }}
              >
                <RotateCcw size={18} strokeWidth={4} />
                Cancelar edición
              </button>
            )}
          </form>

          <aside className="lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 className="font-black uppercase text-xl text-black">Contenido reciente</h2>
              <span className="font-black uppercase text-xs text-black/50">
                {contenidoFiltrado.length}/{contenido.length}
              </span>
            </div>
            <div
              className="bg-white border-[3px] border-black p-3 mb-4 space-y-3"
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              <label className="bg-[#F5F0E8] border-[3px] border-black flex items-center gap-2 px-3 py-2">
                <Search size={18} strokeWidth={3} className="text-black shrink-0" />
                <input
                  value={busqueda}
                  onChange={(event) => setBusqueda(event.target.value)}
                  placeholder="Buscar seña, región o crédito"
                  className="w-full bg-transparent outline-none font-bold text-black placeholder:text-black/50"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label>
                  <span className="flex items-center gap-1 font-black uppercase text-[10px] text-black/50 mb-1">
                    <Filter size={12} strokeWidth={4} />
                    Estado
                  </span>
                  <select
                    value={filtroEstado}
                    onChange={(event) => setFiltroEstado(event.target.value)}
                    className="campo-admin text-xs p-2"
                  >
                    <option value="todos">Todos</option>
                    <option value="borrador">Borrador</option>
                    <option value="publicada">Publicada</option>
                  </select>
                </label>
                <label>
                  <span className="font-black uppercase text-[10px] text-black/50 mb-1 block">
                    Nivel
                  </span>
                  <select
                    value={filtroNivel}
                    onChange={(event) => setFiltroNivel(event.target.value)}
                    className="campo-admin text-xs p-2"
                  >
                    <option value="todos">Todos</option>
                    <option value="nivel-0">Intro</option>
                    <option value="nivel-1">Fundamentos</option>
                    <option value="nivel-2">Vida cotidiana</option>
                    <option value="nivel-3">Conversación</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="space-y-3">
              {contenidoFiltrado.map((item) => (
                <article key={item.id} className="bg-white border-[3px] border-black p-4" style={{ boxShadow: '5px 5px 0 #000' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black uppercase text-lg text-black">{item.palabra}</h3>
                      <p className="font-bold text-xs text-black/60">{item.region} · {item.nivel}</p>
                    </div>
                    <span className={`border-2 border-black px-2 py-1 font-black uppercase text-[10px] flex items-center gap-1 ${item.estado === 'publicada' ? 'bg-[#7FFF6B]' : 'bg-[#FFD23F]'}`}>
                      {item.estado === 'publicada' ? <Eye size={12} /> : <Check size={12} />}
                      {item.estado}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => setVistaPrevia(item)}
                      className="bg-black text-[#FFD23F] border-2 border-black p-2 font-black uppercase text-xs flex items-center justify-center gap-2"
                    >
                      <Eye size={15} strokeWidth={3} />
                      Revisar
                    </button>
                    <button
                      type="button"
                      onClick={() => editarItem(item)}
                      className="bg-white text-black border-2 border-black p-2 font-black uppercase text-xs flex items-center justify-center gap-2"
                    >
                      <Edit3 size={15} strokeWidth={3} />
                      Editar
                    </button>
                  </div>
                </article>
              ))}
              {contenido.length === 0 && (
                <div className="bg-white border-[3px] border-black p-5 text-center font-bold text-black/60">
                  Aún no hay contenido.
                </div>
              )}
              {contenido.length > 0 && contenidoFiltrado.length === 0 && (
                <div className="bg-white border-[3px] border-black p-5 text-center font-bold text-black/60">
                  No hay resultados con esos filtros.
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      {vistaPrevia && (
        <VistaPrevia
          item={vistaPrevia}
          estadoGuardado={estado}
          onCerrar={() => setVistaPrevia(null)}
          onCambiarEstado={() => alternarEstado(vistaPrevia)}
        />
      )}
    </div>
  );
}

function VistaPrevia({ item, estadoGuardado, onCerrar, onCambiarEstado }) {
  const supabase = createClient();
  const videoUrl = supabase.storage.from('videos').getPublicUrl(item.video_path).data.publicUrl;
  const posterUrl = item.poster_path
    ? supabase.storage.from('posters').getPublicUrl(item.poster_path).data.publicUrl
    : undefined;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-4 overflow-y-auto">
      <div
        className="bg-white border-[4px] border-black p-5 max-w-2xl mx-auto my-6"
        style={{ boxShadow: '12px 12px 0 #FFD23F' }}
        role="dialog"
        aria-modal="true"
        aria-label={`Vista previa de ${item.palabra}`}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="font-black uppercase text-xs tracking-[0.2em] text-black/50">
              Vista previa
            </p>
            <h2 className="font-black uppercase text-3xl text-black leading-none mt-1">
              {item.palabra}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            className="bg-white border-[3px] border-black p-2"
            aria-label="Cerrar vista previa"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <VideoPlayer
          src={videoUrl}
          poster={posterUrl}
          titulo={item.palabra}
        />

        <div className="grid grid-cols-2 gap-3 mt-6">
          <Dato etiqueta="Nivel" valor={item.nivel} />
          <Dato etiqueta="Región" valor={item.region} />
          <Dato etiqueta="Crédito" valor={item.credito || 'Sin crédito público'} />
          <Dato
            etiqueta="Consentimiento"
            valor={item.consentimiento ? 'Confirmado' : 'No confirmado'}
          />
        </div>

        <div className="bg-[#F5F0E8] border-[3px] border-black p-4 mt-4">
          <p className="font-black uppercase text-xs text-black/50 mb-1">Descripción</p>
          <p className="font-bold text-black">{item.descripcion}</p>
        </div>

        <div className="mt-5 border-[3px] border-black bg-[#FFD23F] p-4">
          <p className="font-black uppercase text-sm">
            {item.estado === 'publicada'
              ? 'Esta seña está visible en el diccionario.'
              : 'Revisa el video y los datos antes de aprobar.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onCambiarEstado}
          disabled={estadoGuardado === 'guardando' || !item.consentimiento}
          className={`w-full mt-5 border-[3px] border-black p-4 font-black uppercase flex items-center justify-center gap-2 disabled:opacity-40 ${
            item.estado === 'publicada'
              ? 'bg-white text-black'
              : 'bg-[#7FFF6B] text-black'
          }`}
          style={{ boxShadow: '6px 6px 0 #000' }}
        >
          {item.estado === 'publicada' ? (
            <>
              <X size={20} strokeWidth={3} />
              Volver a borrador
            </>
          ) : (
            <>
              <Check size={20} strokeWidth={4} />
              Aprobar y publicar
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Dato({ etiqueta, valor }) {
  return (
    <div className="border-[3px] border-black p-3">
      <p className="font-black uppercase text-[10px] text-black/50">{etiqueta}</p>
      <p className="font-bold text-sm text-black mt-1">{valor}</p>
    </div>
  );
}

function Campo({ etiqueta, children }) {
  return (
    <label className="block mb-4">
      <span className="block font-black uppercase text-xs text-black/60 mb-2">{etiqueta}</span>
      {children}
    </label>
  );
}

function Archivo({ icono, etiqueta, archivo, aceptar, onChange, requerido = false }) {
  return (
    <label className="border-[3px] border-dashed border-black p-4 min-h-32 flex flex-col items-center justify-center text-center cursor-pointer bg-[#F5F0E8]">
      {icono}
      <span className="font-black uppercase text-sm mt-2">{etiqueta}{requerido ? ' *' : ''}</span>
      <span className="font-bold text-xs text-black/50 mt-1 break-all">{archivo?.name ?? 'Seleccionar archivo'}</span>
      <input type="file" accept={aceptar} required={requerido} onChange={(e) => onChange(e.target.files?.[0] ?? null)} className="sr-only" />
    </label>
  );
}
