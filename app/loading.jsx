// Estado de carga global mientras se resuelven las rutas.
export default function Cargando() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
      <div
        className="bg-[#FFD23F] border-[4px] border-black px-6 py-5 flex items-center gap-3"
        style={{ boxShadow: '8px 8px 0 #000' }}
      >
        <span className="w-5 h-5 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
        <p className="font-black uppercase text-black text-sm tracking-wider">
          Cargando…
        </p>
      </div>
    </div>
  );
}
