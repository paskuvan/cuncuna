import PaginaLegal, { SeccionLegal } from '../../components/PaginaLegal';
import { EMAIL_SOPORTE } from '../../lib/contacto';

export const metadata = { title: 'Términos y condiciones · Cuncuna' };

export default function TerminosPage() {
  return (
    <PaginaLegal
      etiqueta="Condiciones de uso"
      titulo="Términos y condiciones"
      introduccion="Estas condiciones regulan el uso de Cuncuna, una plataforma educativa para personas que quieren aprender Lengua de Señas Chilena."
    >
      <SeccionLegal titulo="1. Aceptación">
        <p>Al crear una cuenta o utilizar Cuncuna, aceptas estas condiciones y nuestra Política de privacidad. Si no estás de acuerdo, no debes utilizar el servicio.</p>
      </SeccionLegal>
      <SeccionLegal titulo="2. Servicio educativo">
        <p>Cuncuna ofrece lecciones, videos, ejercicios y herramientas de práctica de LSCh. No entrega certificaciones oficiales ni reemplaza la enseñanza directa con personas sordas, docentes o instituciones especializadas.</p>
      </SeccionLegal>
      <SeccionLegal titulo="3. Cuenta">
        <p>Debes entregar información correcta, proteger el acceso a tu cuenta y avisarnos si detectas un uso no autorizado. No puedes utilizar la cuenta de otra persona.</p>
      </SeccionLegal>
      <SeccionLegal titulo="4. Uso permitido">
        <p>No puedes copiar, revender, distribuir, automatizar la extracción ni utilizar el contenido para entrenar modelos sin autorización. Tampoco puedes interferir con el servicio o vulnerar sus medidas de seguridad.</p>
      </SeccionLegal>
      <SeccionLegal titulo="5. Contenido y propiedad intelectual">
        <p>La plataforma, sus diseños, textos, videos y materiales están protegidos por sus respectivos derechos. Las personas colaboradoras conservan los derechos y créditos acordados sobre sus aportes.</p>
      </SeccionLegal>
      <SeccionLegal titulo="6. Suscripciones">
        <p>Antes de contratar se informarán precio, periodicidad, beneficios y condiciones. Las funciones pagadas solo se activarán cuando el proveedor de pagos confirme el cobro.</p>
      </SeccionLegal>
      <SeccionLegal titulo="7. Disponibilidad">
        <p>Podemos realizar mantenimiento, corregir contenidos o modificar funciones. Procuraremos mantener el servicio disponible, pero no garantizamos funcionamiento ininterrumpido.</p>
      </SeccionLegal>
      <SeccionLegal titulo="8. Contacto">
        <p>Para consultas sobre estas condiciones, escribe a <a href={`mailto:${EMAIL_SOPORTE}`}>{EMAIL_SOPORTE}</a>.</p>
      </SeccionLegal>
    </PaginaLegal>
  );
}
