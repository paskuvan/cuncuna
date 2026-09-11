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
            background: '#F5F0E8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <div
            style={{
              background: '#fff',
              border: '4px solid #000',
              padding: 32,
              maxWidth: 420,
              width: '100%',
              textAlign: 'center',
              boxShadow: '12px 12px 0 #000',
            }}
          >
            <div style={{ fontSize: 56, marginBottom: 12 }}>🐛</div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 900,
                textTransform: 'uppercase',
                margin: '0 0 12px',
              }}
            >
              Error inesperado
            </h1>
            <p style={{ color: '#00000099', fontWeight: 700, margin: '0 0 24px' }}>
              La aplicación tuvo un problema grave. Intenta recargar.
            </p>
            <button
              onClick={() => reset()}
              style={{
                background: '#FFD23F',
                border: '3px solid #000',
                padding: '12px 24px',
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: 14,
                letterSpacing: '0.05em',
                boxShadow: '6px 6px 0 #FF6B9D',
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
