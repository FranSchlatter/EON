/**
 * EON · Envío del formulario de reservas vía Web3Forms (sin backend).
 *
 * El form vive en ReservationForm.astro y aporta:
 *   · [data-form="reservation"]   → el <form>
 *   · data-access-key="…"         → access key de Web3Forms (https://web3forms.com)
 *   · input[name="botcheck"]      → honeypot anti-spam (debe quedar vacío)
 *   · [data-form-status]          → <p> donde mostramos el resultado
 *
 * Hace el POST por fetch (AJAX), valida en el cliente y muestra estado
 * inline sin recargar la página.
 */
(() => {
  const form = document.querySelector('[data-form="reservation"]');
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const submitBtn = form.querySelector('button[type="submit"]');
  const accessKey = form.dataset.accessKey;
  const submitLabel = submitBtn ? submitBtn.textContent : "Enviar";

  const setStatus = (msg, type) => {
    if (!status) return;
    status.textContent = msg;
    if (type) status.setAttribute("data-type", type);
    else status.removeAttribute("data-type");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot: si un bot completó el campo oculto, abortamos en silencio.
    if (form.elements.botcheck && form.elements.botcheck.checked) return;

    // Validación nativa (el form tiene novalidate, la disparamos a mano).
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      setStatus(
        "El formulario aún no está configurado. Escribinos directo a info@eonplaythefuture.com.",
        "error"
      );
      return;
    }

    // Armamos el payload para Web3Forms.
    // Las claves del JSON son las etiquetas que se ven en el mail, así que
    // las mandamos en español. Para el tipo de evento usamos el texto del
    // <option> (ej. "Evento corporativo") en vez del value interno.
    const val = (name) => (form.elements[name]?.value || "").trim();

    const eventSelect = form.elements.event_type;
    const eventLabel =
      eventSelect && eventSelect.selectedIndex >= 0
        ? eventSelect.options[eventSelect.selectedIndex].text
        : val("event_type");

    const nombre = val("name");

    const payload = {
      access_key: accessKey,
      subject: "Nueva solicitud de reserva — EON",
      from_name: nombre ? `EON · ${nombre}` : "EON · Reservas",
      replyto: val("email"),
    };

    // Solo incluimos los campos con valor, con etiquetas en español.
    const campos = {
      Nombre: nombre,
      Email: val("email"),
      Teléfono: val("phone"),
      "Tipo de evento": eventLabel,
      "Fecha tentativa": val("event_date"),
      "Cantidad de asistentes": val("attendees"),
      Mensaje: val("message"),
    };
    for (const [etiqueta, valor] of Object.entries(campos)) {
      if (valor) payload[etiqueta] = valor;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando…";
    }
    setStatus("Enviando tu solicitud…", null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus(
          "¡Gracias! Recibimos tu solicitud y te vamos a contactar a la brevedad.",
          "success"
        );
        form.reset();
      } else {
        setStatus(
          (data && data.message) ||
            "No pudimos enviar tu solicitud. Probá de nuevo o escribinos a info@eonplaythefuture.com.",
          "error"
        );
      }
    } catch (err) {
      setStatus(
        "Hubo un problema de conexión. Probá de nuevo o escribinos a info@eonplaythefuture.com.",
        "error"
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      }
    }
  });
})();
