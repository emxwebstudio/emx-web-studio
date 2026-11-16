(() => {
  'use strict';

  const WA_NUMBER = '527713545923';
  const EMAIL = 'emxwebstudio@gmail.com';
  const menuButton = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const form = document.getElementById('quote-form');
  const formStatus = document.getElementById('form-status');
  const submitButton = document.getElementById('submit-btn');
  const defaultSubmitHTML = submitButton?.innerHTML || '';
  const serviceSelect = document.getElementById('servicio');
  const dialog = document.getElementById('privacy-dialog');
  const emailEndpoint = `https://formsubmit.co/ajax/${EMAIL}`;

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const setMenu = (open) => {
    if (!menuButton || !mainNav) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    mainNav.classList.toggle('open', open);
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
  document.addEventListener('click', (event) => {
    if (mainNav?.classList.contains('open') && !mainNav.contains(event.target) && !menuButton?.contains(event.target)) setMenu(false);
  });

  document.querySelectorAll('[data-preselect]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-preselect');
      if (serviceSelect && Array.from(serviceSelect.options).some((option) => option.value === target)) {
        serviceSelect.value = target;
      }
    });
  });

  function showStatus(message, type = 'info') {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.dataset.type = type;
    formStatus.hidden = false;
  }

  const openPrivacy = () => {
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };
  const closePrivacy = () => dialog?.close?.();
  document.getElementById('privacy-open')?.addEventListener('click', openPrivacy);
  document.getElementById('footer-privacy')?.addEventListener('click', openPrivacy);
  document.getElementById('privacy-close')?.addEventListener('click', closePrivacy);
  document.getElementById('privacy-done')?.addEventListener('click', closePrivacy);
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) closePrivacy(); });

  // Optional WhatsApp alternative: a personalized message without transmitting until the visitor opens WhatsApp.
  function whatsappDraft() {
    const name = document.getElementById('nombre')?.value.trim() || '';
    const business = document.getElementById('negocio')?.value.trim() || '';
    const selectedService = serviceSelect?.value || 'una página web';
    const message = document.getElementById('mensaje')?.value.trim() || '';
    let content = `Hola, quiero solicitar información sobre ${selectedService} con EMX Web Studio.`;
    if (name) content += `\nMi nombre es ${name}.`;
    if (business) content += `\nMi negocio es ${business}.`;
    if (message) content += `\nMi proyecto: ${message.slice(0, 600)}`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(content)}`;
  }
  const whatsappAlternative = document.getElementById('form-whatsapp');
  whatsappAlternative?.addEventListener('click', () => {
    whatsappAlternative.href = whatsappDraft();
  });

  // Provide custom validation without claiming a message was delivered when it wasn't.
  function validateForm() {
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    for (const field of fields) {
      field.removeAttribute('aria-invalid');
      if (!field.checkValidity()) {
        field.setAttribute('aria-invalid', 'true');
        field.focus();
        if (field.type === 'checkbox') showStatus('Para continuar, acepta el aviso de privacidad.', 'error');
        else if (field.validity.typeMismatch) showStatus('Revisa el formato de tu correo electrónico.', 'error');
        else if (field.validity.tooShort) showStatus('Completa los campos con un poco más de información.', 'error');
        else showStatus('Completa todos los campos obligatorios para enviar tu solicitud.', 'error');
        return false;
      }
    }
    const phone = document.getElementById('telefono');
    if (phone && phone.value.replace(/\D/g, '').length < 10) {
      phone.setAttribute('aria-invalid', 'true'); phone.focus();
      showStatus('Escribe un número de WhatsApp válido, con al menos 10 dígitos.', 'error');
      return false;
    }
    return true;
  }

  form?.addEventListener('input', (event) => {
    if (event.target.matches('input, textarea, select')) event.target.removeAttribute('aria-invalid');
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.busy === 'true') return;
    if (!validateForm()) return;

    const honey = form.querySelector('[name="_honey"]');
    if (honey?.value.trim()) {
      showStatus('No se pudo procesar el envío. Puedes escribirnos por WhatsApp.', 'error');
      return;
    }

    form.dataset.busy = 'true';
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando solicitud…';
    showStatus('Procesando tu solicitud de cotización…', 'info');

    const formData = new FormData(form);
    const body = {};
    for (const [key, value] of formData.entries()) body[key] = String(value);
    body.origen = window.location.href.slice(0, 500);
    body.fecha_envio = new Date().toISOString();

    try {
      const response = await fetch(emailEndpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(body),
      });
      let result;
      try { result = await response.json(); } catch (_) { throw new Error('La respuesta no fue válida.'); }
      const succeeded = result?.success === true || result?.success === 'true';
      if (!response.ok || !succeeded) {
        throw new Error(typeof result?.message === 'string' ? result.message : 'El proveedor no confirmó el envío.');
      }
      const providerMessage = String(result?.message || '').toLowerCase();
      if (/activat|confirm|verific/.test(providerMessage)) {
        showStatus('El servicio de formularios solicitó una verificación del correo receptor. Estamos habilitando este canal; por ahora, contáctanos por WhatsApp.', 'info');
      } else {
        showStatus('Tu solicitud fue aceptada por el servicio de contacto. Gracias por escribirnos; te responderemos por correo o WhatsApp.', 'success');
        form.reset();
      }
    } catch (error) {
      console.error('No fue posible procesar el formulario:', error);
      showStatus('No se pudo confirmar el envío. Por favor, contáctanos directamente por WhatsApp o correo; no se ha registrado tu solicitud desde este formulario.', 'error');
    } finally {
      form.dataset.busy = 'false';
      submitButton.disabled = false;
      submitButton.innerHTML = defaultSubmitHTML;
    }
  });
})();
