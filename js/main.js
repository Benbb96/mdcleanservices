// Navigation mobile
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Marquer le lien actif dans la nav (hors bouton CTA)
const filename = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a:not(.btn)').forEach(link => {
  const href = link.getAttribute('href').split('/').pop();
  if (href === filename || (filename === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
