// public/scripts/auth.js
import { supabase } from './supabase.js';
import { Analytics } from "@vercel/analytics/next"
console.log('auth.js loaded');

// DOM-Elemente
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');
const confirmationModal = document.getElementById('confirmation-modal');

// Prüfe DOM-Elemente
if (!loginTab || !registerTab || !loginForm || !registerForm || !errorMessage || !confirmationModal) {
    console.error('DOM-Elemente fehlen:', {
        loginTab: !!loginTab,
        registerTab: !!registerTab,
        loginForm: !!loginForm,
        registerForm: !!registerForm,
        errorMessage: !!errorMessage,
        confirmationModal: !!confirmationModal
    });
    throw new Error('Initialisierung fehlgeschlagen: DOM-Elemente fehlen');
}

// Tab-Wechsel-Logik
const activateTab = (activeTab, inactiveTab, showForm, hideForm) => {
    activeTab.classList.add('active');
    inactiveTab.classList.remove('active');
    showForm.classList.remove('hidden');
    hideForm.classList.add('hidden');
    console.log(`${activeTab.id} aktiviert`);
};

loginTab.addEventListener('click', () => activateTab(loginTab, registerTab, loginForm, registerForm));
registerTab.addEventListener('click', () => activateTab(registerTab, loginTab, registerForm, loginForm));

// Passwort-Sichtbarkeit togglen
const togglePassword = (inputId, toggleId) => {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    if (!input || !toggle) {
        console.error(`Toggle-Elemente fehlen: input=${inputId}, toggle=${toggleId}`);
        return;
    }
    const icon = toggle.querySelector('.toggle-icon');
    toggle.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        icon.src = isPassword ? './assets/icons/eye-off.svg' : './assets/icons/eye.svg';
        console.log(`Passwort-Sichtbarkeit für ${inputId} geändert: ${input.type}`);
    });
};

togglePassword('login-password', 'login-password-toggle');
togglePassword('register-password', 'register-password-toggle');
togglePassword('register-password-confirm', 'register-password-confirm-toggle');

// Login-Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessage.classList.add('hidden');
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        console.log('Login erfolgreich:', data.user);
        window.location.href = '/'; // Vercel-freundlicher Redirect
    } catch (error) {
        console.error('Login Fehler:', error.message);
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
});

// Registrierungs-Handler
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessage.classList.add('hidden');
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;

    if (password !== passwordConfirm) {
        errorMessage.textContent = 'Passwörter stimmen nicht überein';
        errorMessage.classList.remove('hidden');
        return;
    }

    if (!username.match(/^[a-zA-Z0-9_-]{3,20}$/)) {
        errorMessage.textContent = 'Username ungültig (3-20 Zeichen, nur a-z, A-Z, 0-9, _, -)';
        errorMessage.classList.remove('hidden');
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username, first_name: username }
            }
        });
        if (error) throw error;
        console.log('Registrierung erfolgreich:', data.user);

        // Warte auf Profil-Erstellung (Trigger)
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id, username')
            .eq('id', data.user.id)
            .single();
        if (profileError) throw profileError;

        console.log('Profil erstellt:', profile);
        confirmationModal.classList.remove('hidden');
    } catch (error) {
        console.error('Registrierung Fehler:', error.message);
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
});

// Auth-Status überwachen
supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth Event:', event, session);
    const profileIcon = document.getElementById('profile-icon-mobile');
    if (profileIcon) {
        profileIcon.style.display = event === 'SIGNED_IN' ? 'block' : 'none';
    }
});