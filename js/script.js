(() => {
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = document.querySelectorAll('.nav-link, .nav-cta');
  const form = document.getElementById('consultForm');
  const feedback = document.getElementById('formFeedback');

  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 35);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    navLinks.classList.toggle('open', !isOpen);
  });

  navAnchors.forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  }));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const sections = document.querySelectorAll('main section[id]');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => sectionObserver.observe(section));

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name')).trim();
    const subject = String(data.get('subject')).trim();
    const comment = String(data.get('comment')).trim();
    const message = [
      'Hola, PRAXEA. Me gustaría solicitar una asesoría.',
      '',
      `Nombre: ${name}`,
      `Asunto: ${subject}`,
      `Comentario: ${comment}`,
      '',
      'Quedo atento(a) a su respuesta. Gracias.'
    ].join('\n');
    const whatsappUrl = `https://wa.me/529373783896?text=${encodeURIComponent(message)}`;
    feedback.textContent = 'Abriendo WhatsApp para enviar tu solicitud…';
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
