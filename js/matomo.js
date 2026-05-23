/* Matomo Analytics — remplacez les deux valeurs ci-dessous */
(function () {
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  var u = '//VOTRE_URL_MATOMO/'; /* ex: //stats.mondomaine.com/ */
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  _paq.push(['setSiteId', 'VOTRE_SITE_ID']); /* ex: '1' */
  var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
  g.async = true;
  g.src = u + 'matomo.js';
  s.parentNode.insertBefore(g, s);
})();
