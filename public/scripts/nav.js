// public/scripts/nav.js
console.log('nav.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    const profileIconMobile = document.getElementById('profile-icon-mobile');
    const profilePopup = document.getElementById('profile-popup');
    
    if (!profileIconMobile || !profilePopup) {
        console.error('Nav-Elemente nicht gefunden:', {
            profileIconMobile: !!profileIconMobile,
            profilePopup: !!profilePopup
        });
        return;
    }
    
    // Toggle Profil-Popup
    const togglePopup = () => {
        profilePopup.classList.toggle('hidden');
        console.log('Profil-Popup toggled:', !profilePopup.classList.contains('hidden'));
    };
    
    // Entferne bestehende Listener, um Mehrfachbindungen zu vermeiden
    const newProfileIconMobile = profileIconMobile.cloneNode(true);
    profileIconMobile.parentNode.replaceChild(newProfileIconMobile, profileIconMobile);
    newProfileIconMobile.addEventListener('click', togglePopup);
    
    // Schließe Popup bei Klick außerhalb
    document.addEventListener('click', (e) => {
        if (!profilePopup.contains(e.target) && !newProfileIconMobile.contains(e.target)) {
            profilePopup.classList.add('hidden');
            console.log('Mobil-Profil-Popup geschlossen');
        }
    });
});