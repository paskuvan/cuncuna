import PaginaLegal, { SeccionLegal } from '../../components/PaginaLegal';
import { EMAIL_SOPORTE } from '../../lib/contacto';

export const metadata = { title: 'Política de privacidad · Cuncuna' };

export default function PrivacidadPage() {
  return (
    <PaginaLegal
      etiqueta="Tus datos"
      titulo="Política de privacidad"
      introduccion="Explicamos qué información utiliza Cuncuna, para qué la necesitamos y cómo puedes ejercer control sobre ella."
    >
      <SeccionLegal titulo="1. Información que tratamos">
        <ul>
          <li>Datos de cuenta entregados mediante Google, como nombre, correo y avatar.</li>
          <li>Progreso educativo: lecciones, respuestas, favoritos, rachas y estadísticas.</li>
          <li>Preferencias de plan y datos técnicos necesarios para operar y proteger el servicio.</li>
          <li>Mensajes que envíes voluntariamente a soporte.</li>
        </ul>
      </SeccionLegal>
      <SeccionLegal titulo="2. Cámara">
        <p>La práctica con cámara funciona localmente en tu dispositivo. Cuncuna no graba, almacena ni transmite esa imagen. La cámara solo se activa cuando lo solicitas y se apaga al salir de la práctica.</p>
      </SeccionLegal>
      <SeccionLegal titulo="3. Finalidades">
        <p>Utilizamos los datos para autenticar tu cuenta, guardar progreso, personalizar repasos, entregar soporte, prevenir abusos y mejorar la experiencia educativa.</p>
      </SeccionLegal>
      <SeccionLegal titulo="4. Proveedores">
        <p>Podemos utilizar Google para autenticación, Supabase para base de datos y almacenamiento, y Mercado Pago para procesar futuras suscripciones. Cada proveedor trata información bajo sus propias condiciones. Cuncuna no almacena números completos de tarjetas.</p>
      </SeccionLegal>
      <SeccionLegal titulo="5. Conservación y seguridad">
        <p>Conservamos la información mientras tu cuenta esté activa o sea necesaria para prestar el servicio y cumplir obligaciones. Aplicamos controles de acceso y políticas por usuario, aunque ningún sistema es completamente infalible.</p>
      </SeccionLegal>
      <SeccionLegal titulo="6. Tus derechos">
        <p>Puedes solicitar acceso, corrección o eliminación de tus datos y retirar consentimientos cuando corresponda. También puedes pedir el cierre de tu cuenta escribiendo al correo de soporte.</p>
      </SeccionLegal>
      <SeccionLegal titulo="7. Contacto">
        <p>Para consultas o solicitudes sobre privacidad, escribe a <a href={`mailto:${EMAIL_SOPORTE}`}>{EMAIL_SOPORTE}</a>.</p>
      </SeccionLegal>
    </PaginaLegal>
  );
}
