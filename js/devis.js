/**
 * Calculateur de devis — MD Clean Services
 *
 * Grille tarifaire (estimation indicative, hors TVA) :
 *
 * Nettoyage bureaux / locaux :
 *   < 100 m²   → 0,28 €/m²/intervention
 *   100-300 m² → 0,22 €/m²/intervention
 *   > 300 m²   → 0,17 €/m²/intervention
 *   Bonus fréquence : 4+/mois → -5 %
 *
 * Nettoyage vitres :
 *   Forfait de déplacement 30 € + 3,50 €/m² de vitrage
 *   (surface vitrée ≈ 30 % de la surface totale)
 *
 * Décapage moquettes :
 *   Prestation ponctuelle (1 à 2×/an)
 *   0 à 100 m² → 2,80 €/m²
 *   > 100 m²   → 2,20 €/m²
 */

const PRICING = {
  bureaux: [
    { max: 100,  rate: 0.28 },
    { max: 300,  rate: 0.22 },
    { max: Infinity, rate: 0.17 },
  ],
  vitres: {
    forfait: 30,
    ratePerM2: 3.50,
    vitreRatio: 0.30,
  },
  moquettes: [
    { max: 100,  rate: 2.80 },
    { max: Infinity, rate: 2.20 },
  ],
};

function getRate(table, surface) {
  return table.find(t => surface <= t.max).rate;
}

function calcMonthly({ service, surface, frequency }) {
  let perSession = 0;

  if (service === 'bureaux') {
    const rate = getRate(PRICING.bureaux, surface);
    perSession = surface * rate;
    if (frequency >= 4) perSession *= 0.95;
  } else if (service === 'vitres') {
    const vitreSurface = surface * PRICING.vitres.vitreRatio;
    perSession = PRICING.vitres.forfait + vitreSurface * PRICING.vitres.ratePerM2;
  } else if (service === 'moquettes') {
    const rate = getRate(PRICING.moquettes, surface);
    perSession = surface * rate;
  }

  return perSession * frequency;
}

// ===== Initialisation du formulaire =====
document.addEventListener('DOMContentLoaded', () => {
  const devisCheckbox = document.getElementById('devis-check');
  const devisSection = document.getElementById('devis-section');

  if (!devisCheckbox || !devisSection) return;

  // Toggle affichage section devis
  devisCheckbox.addEventListener('change', () => {
    devisSection.classList.toggle('visible', devisCheckbox.checked);
    if (devisCheckbox.checked) updateDevis();
  });

  // Slider surface
  const surfaceSlider = document.getElementById('surface-slider');
  const surfaceValue = document.getElementById('surface-value');

  surfaceSlider.addEventListener('input', () => {
    surfaceValue.textContent = surfaceSlider.value + ' m²';
    updateDevis();
  });

  // Select fréquence
  const freqSelect = document.getElementById('freq-select');
  freqSelect.addEventListener('change', updateDevis);

  // Select service
  const serviceSelect = document.getElementById('service-select');
  serviceSelect.addEventListener('change', updateDevis);

  function updateDevis() {
    const surface = parseInt(surfaceSlider.value, 10);
    const frequency = parseInt(freqSelect.value, 10);
    const service = serviceSelect.value;

    const monthly = calcMonthly({ service, surface, frequency });

    const resultEl = document.getElementById('devis-price');
    if (resultEl) {
      resultEl.textContent = monthly.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) + ' / mois';
    }

    // Injecter la valeur dans un champ caché pour l'envoi du formulaire
    const hiddenEl = document.getElementById('devis-hidden');
    if (hiddenEl) {
      hiddenEl.value = `Service: ${serviceSelect.options[serviceSelect.selectedIndex].text} | Surface: ${surface} m² | Fréquence: ${frequency}×/mois | Estimation: ${Math.round(monthly)} €/mois`;
    }
  }

  // Pré-remplissage via paramètres URL (?service=bureaux&devis=1)
  const params = new URLSearchParams(window.location.search);
  if (params.get('devis') === '1') {
    devisCheckbox.checked = true;
    devisSection.classList.add('visible');
  }
  const serviceParam = params.get('service');
  if (serviceParam && serviceSelect) {
    const option = serviceSelect.querySelector(`option[value="${serviceParam}"]`);
    if (option) serviceSelect.value = serviceParam;
  }

  // Init
  updateDevis();

  // ===== Soumission du formulaire =====
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Retire le marquage d'erreur dès que l'utilisateur corrige
  form.querySelectorAll('[required], [pattern]').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('input-error'));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const msg = document.getElementById('form-message');

    // Validation côté client (délègue à la validation native HTML5)
    let valid = true;
    form.querySelectorAll('[required], [pattern]').forEach(field => {
      if (!field.hasAttribute('required') && !field.value.trim()) return;
      if (!field.validity.valid) {
        field.classList.add('input-error');
        valid = false;
      }
    });
    if (!valid) {
      msg.className = 'form-message error';
      msg.textContent = 'Veuillez corriger les champs en rouge avant d\'envoyer.';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        msg.className = 'form-message success';
        msg.textContent = 'Message envoyé ! Nous vous répondrons dans les plus brefs délais.';
        form.reset();
        devisSection.classList.remove('visible');
        devisCheckbox.checked = false;
      } else {
        throw new Error('Erreur serveur');
      }
    } catch {
      msg.className = 'form-message error';
      msg.textContent = 'Une erreur est survenue. Appelez-nous directement au 06 32 26 91 34.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Envoyer le message';
    }
  });
});
