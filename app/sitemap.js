const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Genera /sitemap.xml solo con las rutas públicas (no /app/*).
export default function sitemap() {
  const rutas = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/lista-espera', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/suscripcion', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/login', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/soporte', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/legal/terminos', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/privacidad', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/reembolsos', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const lastModified = new Date();

  return rutas.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
