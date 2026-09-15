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
        .replace(/[̀-ͯ]/g, '')
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
        ? await supabase.from('contenido_senas').update(payload).eq('id', editandoId)
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
      .update({ estado: siguienteEstado, updated_at: new Date().toISOString() })
      .eq('id', item.id);

    if (error) {
      setEstado('error');
      setMensaje(error.message);
      return;
    }

    setContenido((actual) =>
      actual.map((c) => (c.id === item.id ? { ...c, estado: siguienteEstado } : c))
    );
    setVistaPrevia((actual) =>
      actual?.id === item.id ? { ...actual, estado: siguienteEstado } : actual
    );
    setEstado('exito');
    setMensaje(`La seña ahora está en estado ${siguienteEstado}.`);
  };

  return (
    <div className="min-h-screen bg-[#F6F1EC] text-neutral-900">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-[#F6F1EC]/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3.5 flex items-center gap-3">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold tracking-tight leading-none">Panel de contenido</h1>
            <p className="text-xs text-neutral-500 mt-0.5">Videos y señas LSCh</p>
          </div>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
            {contenido.length} fichas
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
          {/* Formulario */}
          <form onSubmit={guardar} className="rounded-2xl border border-black/5 bg-white p-5 md:p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-violet-100 text-violet-700">
                {editandoId ? <Edit3 size={20} /> : <Plus size={20} />}
              </span>
              <div>
                <p className="text-xs font-medium text-neutral-500">
                  {editandoId ? 'Modo edición' : 'Nueva ficha'}
                </p>
                <h2 className="text-xl font-bold tracking-tight">
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
              <Archivo icono={<FileVideo size={22} />} etiqueta={editandoId ? 'Reemplazar video MP4' : 'Video MP4'} archivo={video} aceptar="video/mp4" onChange={setVideo} requerido={!editandoId} />
              <Archivo icono={<ImageIcon size={22} />} etiqueta="Portada" archivo={poster} aceptar="image/jpeg,image/png,image/webp" onChange={setPoster} />
            </div>

            <label className="flex items-start gap-3 mt-5 rounded-xl bg-neutral-50 border border-black/5 p-4 cursor-pointer">
              <input type="checkbox" checked={formulario.consentimiento} onChange={(e) => actualizar('consentimiento', e.target.checked)} className="mt-0.5 w-5 h-5 accent-violet-600" />
              <span>
                <span className="block font-semibold text-sm">Consentimiento confirmado</span>
                <span className="block text-xs text-neutral-500 mt-1">La persona autoriza este uso o el material protege su identidad según lo acordado.</span>
              </span>
            </label>

            {mensaje && (
              <div className={`rounded-xl border p-3 mt-5 text-sm font-medium ${
                estado === 'error'
                  ? 'border-rose-200 bg-rose-50 text-rose-700'
                  : estado === 'exito'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-violet-200 bg-violet-50 text-violet-800'
              }`}>
                {mensaje}
              </div>
            )}

            <button
              type="submit"
              disabled={estado === 'guardando' || (!video && !editandoId) || !formulario.consentimiento}
              className="w-full mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {estado === 'guardando' ? <LoaderCircle size={18} className="animate-spin" /> : editandoId ? <Save size={18} /> : <CloudUpload size={18} />}
              {estado === 'guardando' ? 'Guardando…' : editandoId ? 'Actualizar ficha' : 'Guardar borrador'}
            </button>
            {editandoId && (
              <button
                type="button"
                onClick={limpiarFormulario}
                className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <RotateCcw size={16} />
                Cancelar edición
              </button>
            )}
          </form>

          {/* Aside */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-bold tracking-tight">Contenido reciente</h2>
              <span className="text-xs text-neutral-400">
                {contenidoFiltrado.length}/{contenido.length}
              </span>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2">
                <Search size={16} className="text-neutral-400 shrink-0" />
                <input
                  value={busqueda}
                  onChange={(event) => setBusqueda(event.target.value)}
                  placeholder="Buscar seña, región o crédito"
                  aria-label="Buscar contenido"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 mb-1">
                    <Filter size={12} />
                    Estado
                  </span>
                  <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="campo-admin text-xs !py-2">
                    <option value="todos">Todos</option>
                    <option value="borrador">Borrador</option>
                    <option value="publicada">Publicada</option>
                  </select>
                </label>
                <label>
                  <span className="block text-[11px] font-medium text-neutral-500 mb-1">Nivel</span>
                  <select value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)} className="campo-admin text-xs !py-2">
                    <option value="todos">Todos</option>
                    <option value="nivel-0">Intro</option>
                    <option value="nivel-1">Fundamentos</option>
                    <option value="nivel-2">Vida cotidiana</option>
                    <option value="nivel-3">Conversación</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {contenidoFiltrado.map((item) => (
                <article key={item.id} className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold tracking-tight">{item.palabra}</h3>
                      <p className="text-xs text-neutral-500">{item.region} · {item.nivel}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      item.estado === 'publicada' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.estado === 'publicada' ? <Eye size={11} /> : <Check size={11} />}
                      {item.estado}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => setVistaPrevia(item)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-700 transition-colors"
                    >
                      <Eye size={14} />
                      Revisar
                    </button>
                    <button
                      type="button"
                      onClick={() => editarItem(item)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      <Edit3 size={14} />
                      Editar
                    </button>
                  </div>
                </article>
              ))}
              {contenido.length === 0 && (
                <div className="rounded-2xl border border-black/5 bg-white p-6 text-center text-sm text-neutral-500 shadow-sm">
                  Aún no hay contenido.
                </div>
              )}
              {contenido.length > 0 && contenidoFiltrado.length === 0 && (
                <div className="rounded-2xl border border-black/5 bg-white p-6 text-center text-sm text-neutral-500 shadow-sm">
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div
        className="rounded-3xl border border-black/5 bg-white p-5 md:p-6 max-w-2xl mx-auto my-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label={`Vista previa de ${item.palabra}`}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">Vista previa</p>
            <h2 className="text-2xl font-bold tracking-tight mt-1">{item.palabra}</h2>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            className="grid place-items-center w-9 h-9 rounded-xl border border-black/10 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors"
            aria-label="Cerrar vista previa"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-hidden rounded-xl">
          <VideoPlayer src={videoUrl} poster={posterUrl} titulo={item.palabra} />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <Dato etiqueta="Nivel" valor={item.nivel} />
          <Dato etiqueta="Región" valor={item.region} />
          <Dato etiqueta="Crédito" valor={item.credito || 'Sin crédito público'} />
          <Dato etiqueta="Consentimiento" valor={item.consentimiento ? 'Confirmado' : 'No confirmado'} />
        </div>

        <div className="rounded-xl bg-neutral-50 border border-black/5 p-4 mt-4">
          <p className="text-xs text-neutral-500 mb-1">Descripción</p>
          <p className="text-neutral-700">{item.descripcion}</p>
        </div>

        <div className={`mt-4 rounded-xl border p-4 text-sm font-medium ${
          item.estado === 'publicada'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
            : 'border-violet-200 bg-violet-50 text-violet-800'
        }`}>
          {item.estado === 'publicada'
            ? 'Esta seña está visible en el diccionario.'
            : 'Revisa el video y los datos antes de aprobar.'}
        </div>

        <button
          type="button"
          onClick={onCambiarEstado}
          disabled={estadoGuardado === 'guardando' || !item.consentimiento}
          className={`w-full mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            item.estado === 'publicada'
              ? 'border border-black/10 bg-white text-neutral-700 hover:bg-neutral-50'
              : 'bg-violet-600 text-white hover:bg-violet-700'
          }`}
        >
          {item.estado === 'publicada' ? (
            <>
              <X size={18} />
              Volver a borrador
            </>
          ) : (
            <>
              <Check size={18} />
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
    <div className="rounded-xl border border-black/5 bg-neutral-50 p-3">
      <p className="text-[11px] text-neutral-500">{etiqueta}</p>
      <p className="text-sm font-medium mt-0.5">{valor}</p>
    </div>
  );
}

function Campo({ etiqueta, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-neutral-600 mb-1.5">{etiqueta}</span>
      {children}
    </label>
  );
}

function Archivo({ icono, etiqueta, archivo, aceptar, onChange, requerido = false }) {
  return (
    <label className="rounded-xl border border-dashed border-black/15 bg-neutral-50 p-4 min-h-32 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-neutral-100 transition-colors">
      <span className="text-neutral-400">{icono}</span>
      <span className="text-sm font-semibold mt-2">{etiqueta}{requerido ? ' *' : ''}</span>
      <span className="text-xs text-neutral-400 mt-1 break-all">{archivo?.name ?? 'Seleccionar archivo'}</span>
      <input type="file" accept={aceptar} required={requerido} onChange={(e) => onChange(e.target.files?.[0] ?? null)} className="sr-only" />
    </label>
  );
}
