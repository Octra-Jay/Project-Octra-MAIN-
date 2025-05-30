// public/scripts/auth.js
import { supabase } from './supabase.js';
import { Analytics } from "@vercel/analytics/next"
console.log('auth.js loaded');

// Referral-Code aus URL übernehmen
const urlParams = new URLSearchParams(window.location.search);
const referralFromUrl = urlParams.get('ref');
if (referralFromUrl) {
  const referralInput = document.getElementById('register-referral');
  if (referralInput) referralInput.value = referralFromUrl;
}

// Tab-Switch Login/Registrierung
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
});
registerTab.addEventListener('click', () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
});

// Passwort-Show/Hide
function setupPasswordToggle(inputId, toggleId) {
  const input = document.getElementById(inputId);
  const toggle = document.getElementById(toggleId);
  if (input && toggle) {
    toggle.addEventListener('click', () => {
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  }
}
setupPasswordToggle('login-password', 'login-password-toggle');
setupPasswordToggle('register-password', 'register-password-toggle');
setupPasswordToggle('register-password-confirm', 'register-password-confirm-toggle');

// Fehleranzeige
function showError(msg) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = msg;
  errorDiv.classList.remove('hidden');
}
function hideError() {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = '';
  errorDiv.classList.add('hidden');
}

// Registrierung mit Referral-Code
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError();
  const username = document.getElementById('register-username').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const passwordConfirm = document.getElementById('register-password-confirm').value;
  const referral = document.getElementById('register-referral').value.trim();
  if (password !== passwordConfirm) {
    showError('Passwörter stimmen nicht überein!');
    return;
  }
  // TODO: Supabase-Registrierung + Referral speichern
  // Beispiel:
  // const { user, error } = await supabase.auth.signUp({ email, password, options: { data: { username, referral } } });
  // if (error) { showError(error.message); return; }
  // Zeige Bestätigungs-Modal
  document.getElementById('confirmation-modal').classList.remove('hidden');
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  // TODO: Supabase-Login
  // Beispiel:
  // const { user, error } = await supabase.auth.signInWithPassword({ email, password });
  // if (error) { showError(error.message); return; }
  // window.location.href = 'profile.html';
});

// OAuth-Buttons (Discord, GitHub)
document.getElementById('discord-oauth').addEventListener('click', () => {
  // TODO: Supabase Discord OAuth
  // supabase.auth.signInWithOAuth({ provider: 'discord', options: { redirectTo: window.location.origin + '/profile.html' } });
});
document.getElementById('github-oauth').addEventListener('click', () => {
  // TODO: Supabase GitHub OAuth
  // supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: window.location.origin + '/profile.html' } });
});

// Bestätigungs-Modal schließen/ändern
const closeModalButtons = document.querySelectorAll('[id^="close-modal"]');
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.id.replace('close-modal-', '');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      console.log(`${modalId} geschlossen`);
    }
  });
});

// Auth-Status überwachen
supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth Event:', event, session);
    const profileIcon = document.getElementById('profile-icon-mobile');
    if (profileIcon) {
        profileIcon.style.display = event === 'SIGNED_IN' ? 'block' : 'none';
    }
});