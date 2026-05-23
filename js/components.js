class SiteHeader extends HTMLElement {
  connectedCallback() {
    const service = this.getAttribute('service');
    const devisHref = service
      ? `contact.html?service=${service}&devis=1`
      : 'contact.html?devis=1';

    this.outerHTML = `
<header>
  <nav class="container">
    <a href="index.html" class="nav-logo" aria-label="MD Clean Services – Accueil">
      <img src="images/logo.png" alt="MD Clean Services" width="160" height="69">
    </a>
    <ul class="nav-links" id="nav-links">
      <li><a href="index.html">Accueil</a></li>
      <li><a href="nettoyage-bureaux.html">Bureaux</a></li>
      <li><a href="nettoyage-vitres.html">Vitres</a></li>
      <li><a href="moquettes.html">Moquettes</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="${devisHref}" class="btn btn-outline" style="padding:8px 20px">Devis gratuit</a></li>
    </ul>
    <button class="nav-burger" aria-label="Ouvrir le menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>
</header>`;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.outerHTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="images/logo.png" alt="MD Clean Services">
        <p>Solutions de ménage sur mesure à Lyon et alentours.</p>
      </div>
      <div class="footer-col">
        <h4>Nos services</h4>
        <ul class="footer-links">
          <li><a href="nettoyage-bureaux.html">Nettoyage de bureaux</a></li>
          <li><a href="nettoyage-vitres.html">Nettoyage de vitres</a></li>
          <li><a href="moquettes.html">Décapage moquettes</a></li>
          <li><a href="contact.html">Devis gratuit</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <div class="footer-contact-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 012 1.18 2 2 0 013.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
          <a href="tel:0632269134">06 32 26 91 34</a>
        </div>
        <div class="footer-contact-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <a href="mailto:mdcleanserviceslyon@gmail.com">mdcleanserviceslyon@gmail.com</a>
        </div>
      </div>
    </div>
    <hr class="footer-divider">
    <div class="footer-bottom">
      <span>© 2026 MD Clean Services — Tous droits réservés</span>
      <span><a href="mentions-legales.html" style="color:inherit;text-decoration:underline">Mentions légales</a> · Vénissieux · Lyon · Rhône</span>
    </div>
  </div>
</footer>`;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
