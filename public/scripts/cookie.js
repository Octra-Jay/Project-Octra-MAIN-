// public/scripts/cookie.js
console.log('cookie.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('cookie-consent-modal');
    const acceptAll = document.getElementById('accept-all-cookies');
    const acceptNecessary = document.getElementById('accept-necessary-cookies');
    const customize = document.getElementById('customize-cookies');
    const saveSettings = document.getElementById('save-cookie-settings');
    const cookieSettings = document.getElementById('cookie-settings');
    const cookieButtons = document.getElementById('cookie-buttons');

    if (!modal || !acceptAll || !acceptNecessary || !customize || !saveSettings || !cookieSettings || !cookieButtons) {
        console.error('Cookie-Elemente nicht gefunden');
        return;
    }

    // Zeige Modal, falls keine Cookie-Einstellungen
    if (!localStorage.getItem('cookieConsent')) {
        modal.classList.remove('hidden');
        modal.classList.add('pointer-events-auto');
    }

    acceptAll.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'all');
        modal.classList.add('hidden');
        console.log('Alle Cookies akzeptiert');
    });

    acceptNecessary.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'necessary');
        modal.classList.add('hidden');
        console.log('Nur notwendige Cookies akzeptiert');
    });

    customize.addEventListener('click', () => {
        cookieButtons.classList.add('hidden');
        cookieSettings.classList.remove('hidden');
        console.log('Cookie-Einstellungen geöffnet');
    });

    saveSettings.addEventListener('click', () => {
        const analytics = document.getElementById('analytics-cookies').checked;
        const marketing = document.getElementById('marketing-cookies').checked;
        localStorage.setItem('cookieConsent', JSON.stringify({ necessary: true, analytics, marketing }));
        modal.classList.add('hidden');
        console.log('Cookie-Einstellungen gespeichert:', { analytics, marketing });
    });
});