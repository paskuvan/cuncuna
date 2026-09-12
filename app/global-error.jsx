'use client';

// global-error reemplaza el layout raíz cuando el error ocurre en él,
// por eso debe incluir sus propias etiquetas <html> y <body>.
export default function GlobalError({ error, reset }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            background: '#F6F1EC',
            color: '#171717',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: 16,
              padding: 32,
              maxWidth: 420,
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 12 }}>🐛</div>
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>
              Error inesperado
            </h1>
            <p style={{ color: '#737373', margin: '0 0 24px' }}>
              La aplicación tuvo un problema grave. Intenta recargar.
            </p>
            <button
              onClick={() => reset()}
              style={{
                background: '#7c3aed',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '12px 24px',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Reintentar
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
