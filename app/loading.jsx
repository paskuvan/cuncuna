// Estado de carga global mientras se resuelven las rutas.
export default function Cargando() {
  return (
    <div className="min-h-screen bg-[#F6F1EC] flex items-center justify-center p-4">
      <div className="inline-flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-6 py-4 shadow-sm">
        <span className="w-5 h-5 rounded-full border-2 border-violet-200 border-t-violet-600 animate-spin" />
        <p className="text-sm font-semibold text-neutral-600">Cargando…</p>
      </div>
    </div>
  );
}
