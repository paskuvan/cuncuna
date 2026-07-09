import PaginaLegal, { SeccionLegal } from '../../components/PaginaLegal';
import { EMAIL_SOPORTE } from '../../lib/contacto';

export const metadata = { title: 'Cancelaciones y reembolsos · Cuncuna' };

export default function ReembolsosPage() {
  return (
    <PaginaLegal
      etiqueta="Suscripciones"
      titulo="Cancelaciones y reembolsos"
      introduccion="Queremos que las condiciones de cobro sean simples, visibles y fáciles de gestionar."
    >
      <SeccionLegal titulo="1. Cancelación">
        <p>Podrás cancelar una suscripción en cualquier momento desde tu cuenta o solicitándolo a soporte. La cancelación evita cobros futuros y mantendrá el acceso pagado hasta terminar el período ya abonado, salvo que se informe algo distinto antes de contratar.</p>
      </SeccionLegal>
      <SeccionLegal titulo="2. Renovación">
        <p>Los planes mensuales o anuales se renovarán automáticamente cuando así se indique al contratar. Mercado Pago procesará cada cobro y notificará su resultado.</p>
      </SeccionLegal>
      <SeccionLegal titulo="3. Reembolsos">
        <p>Revisaremos solicitudes por cobros duplicados, errores técnicos que impidan usar el servicio u otras situaciones justificadas. La aprobación y los plazos dependerán del caso, el medio de pago y las reglas de Mercado Pago.</p>
      </SeccionLegal>
      <SeccionLegal titulo="4. Derecho a retracto">
        <p>Se respetarán los derechos irrenunciables establecidos por la normativa chilena de protección al consumidor. Cuando corresponda, el retracto podrá solicitarse dentro del plazo legal y antes de utilizar el servicio.</p>
      </SeccionLegal>
      <SeccionLegal titulo="5. Cómo solicitar ayuda">
        <p>Escribe a <a href={`mailto:${EMAIL_SOPORTE}`}>{EMAIL_SOPORTE}</a> indicando el correo de tu cuenta, fecha del cobro y motivo. No envíes números completos de tarjeta ni claves.</p>
      </SeccionLegal>
    </PaginaLegal>
  );
}
