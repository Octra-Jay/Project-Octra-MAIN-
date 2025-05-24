document.addEventListener('DOMContentLoaded', () => {
  const cookieModal = document.getElementById('cookie-consent-modal');
  const acceptAllButton = document.getElementById('accept-all-cookies');
  const acceptNecessaryButton = document.getElementById('accept-necessary-cookies');
  const customizeButton = document.getElementById('customize-cookies');
  const saveSettingsButton = document.getElementById('save-cookie-settings');
  const cookieButtons = document.getElementById('cookie-buttons');
  const cookieSettings = document.getElementById('cookie-settings');
  const analyticsCheckbox = document.getElementById('analytics-cookies');
  const marketingCheckbox = document.getElementById('marketing-cookies');
  
  // Prüfen, ob Cookie-Präferenzen bereits gespeichert sind
  const savedPreferences = localStorage.getItem('cookiePreferences');
  if (!savedPreferences) {
    // Modal anzeigen, wenn keine Präferenzen gespeichert
    cookieModal.classList.remove('hidden');
    cookieModal.classList.remove('pointer-events-none');
  } else {
    // Optional: Checkboxen basierend auf gespeicherten Präferenzen setzen
    const preferences = JSON.parse(savedPreferences);
    if (analyticsCheckbox) analyticsCheckbox.checked = preferences.analytics;
    if (marketingCheckbox) marketingCheckbox.checked = preferences.marketing;
  }
  
  // Helper-Funktion zum Speichern der Präferenzen
  const savePreferences = (analytics, marketing) => {
    const preferences = {
      necessary: true, // Immer aktiv
      analytics,
      marketing,
    };
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    cookieModal.classList.add('hidden');
    cookieModal.classList.add('pointer-events-none');
  };
  
  // Event-Listener für "Alle akzeptieren"
  if (acceptAllButton) {
    acceptAllButton.addEventListener('click', () => {
      savePreferences(true, true);
    });
  }
  
  // Event-Listener für "Nur notwendige akzeptieren"
  if (acceptNecessaryButton) {
    acceptNecessaryButton.addEventListener('click', () => {
      savePreferences(false, false);
    });
  }
  
  // Event-Listener für "Einstellungen anpassen"
  if (customizeButton) {
    customizeButton.addEventListener('click', () => {
      cookieButtons.classList.add('hidden');
      cookieSettings.classList.remove('hidden');
    });
  }
  
  // Event-Listener für "Einstellungen speichern"
  if (saveSettingsButton) {
    saveSettingsButton.addEventListener('click', () => {
      const analytics = analyticsCheckbox ? analyticsCheckbox.checked : false;
      const marketing = marketingCheckbox ? marketingCheckbox.checked : false;
      savePreferences(analytics, marketing);
    });
  }
  
  // Optional: Funktion zum Widerrufen der Zustimmung (z. B. in settings.html)
  const revokeConsentButton = document.getElementById('revoke-consent');
  if (revokeConsentButton) {
    revokeConsentButton.addEventListener('click', () => {
      localStorage.removeItem('cookiePreferences');
      cookieModal.classList.remove('hidden');
      cookieModal.classList.remove('pointer-events-none');
      cookieButtons.classList.remove('hidden');
      cookieSettings.classList.add('hidden');
      if (analyticsCheckbox) analyticsCheckbox.checked = false;
      if (marketingCheckbox) marketingCheckbox.checked = false;
    });
  }
});