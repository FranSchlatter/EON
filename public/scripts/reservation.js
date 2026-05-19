/**
 * EON · Reservation form
 *
 * Capa de envío encapsulada. Si querés cambiar el backend (de Web3Forms a
 * EmailJS / Formspree / endpoint propio), tocá SOLO la función `sendReservation`.
 * Toda la UI / validación / feedback ya funciona.
 *
 * Cómo configurar Web3Forms:
 *   1) Crear cuenta gratis en https://web3forms.com → obtener access key
 *   2) Pegar la key en el atributo `data-access-key` del <form> en Reservations.astro
 *      (o definir window.__EON_WEB3FORMS_KEY antes de cargar este script).
 */

const DEFAULT_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * sendReservation · cambiá esta función para usar otro servicio.
 * @param {FormData} formData
 * @param {string} accessKey
 * @returns {Promise<{ok: boolean, message?: string}>}
 */
async function sendReservation(formData, accessKey) {
  formData.set("access_key", accessKey);
  // Subject mostrado en el inbox
  if (!formData.get("subject")) {
    formData.set("subject", "Nueva reserva EON · " + (formData.get("event_type") || ""));
  }
  formData.set("from_name", "EON Web");

  try {
    const res = await fetch(DEFAULT_ENDPOINT, {
      method: "POST",
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.success !== false) {
      return { ok: true };
    }
    return { ok: false, message: data?.message || "No pudimos enviar tu reserva." };
  } catch (err) {
    return { ok: false, message: "Error de red. Probá de nuevo." };
  }
}

(() => {
  const form = document.querySelector('[data-form="reservation"]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const accessKey =
      form.dataset.accessKey || window.__EON_WEB3FORMS_KEY || "";

    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      setStatus(
        status,
        "El formulario aún no está configurado. Pegá tu access key de Web3Forms en data-access-key.",
        "error"
      );
      return;
    }

    submitBtn.disabled = true;
    submitBtn.dataset.originalLabel ||= submitBtn.textContent;
    submitBtn.textContent = "Enviando…";
    setStatus(status, "", "");

    const formData = new FormData(form);
    const result = await sendReservation(formData, accessKey);

    submitBtn.disabled = false;
    submitBtn.textContent = submitBtn.dataset.originalLabel;

    if (result.ok) {
      form.reset();
      setStatus(status, "¡Recibimos tu reserva! Te contactamos en breve.", "success");
    } else {
      setStatus(status, result.message || "Algo falló. Intentá de nuevo.", "error");
    }
  });
})();

function setStatus(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.dataset.type = type || "";
}
