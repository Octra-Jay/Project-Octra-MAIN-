// public/scripts/auth.js
console.log('auth.js loaded');

// Supabase-Initialisierung
const supabaseUrl = 'https://bvnjypdwndtiguwmnrmm.supabase.co'; // Ersetze durch deine Supabase-URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bmp5cGR3bmR0aWd1d21ucm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzUyNDUsImV4cCI6MjA2MzYxMTI0NX0.e1Zu_yf3ojHn9Vgq0stAKzBCZ69pWFt3fY0IHgVY748'; // Ersetze durch deinen Anon-Key
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Tab-Wechsel-Logik
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing tabs');
  
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  if (!loginTab || !registerTab || !loginForm || !registerForm) {
    console.error('Tabs oder Formulare nicht gefunden:', {
      loginTab: !!loginTab,
      registerTab: !!registerTab,
      loginForm: !!loginForm,
      registerForm: !!registerForm
    });
    return;
  }
  
  // Standard: Login-Tab aktiv
  loginTab.classList.add('active');
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
  
  // Entferne bestehende Event-Listener, um Mehrfachbindungen zu vermeiden
  const removeListeners = (element) => {
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);
    return newElement;
  };
  
  const newLoginTab = removeListeners(loginTab);
  const newRegisterTab = removeListeners(registerTab);
  
  newLoginTab.addEventListener('click', () => {
    newLoginTab.classList.add('active');
    newRegisterTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    console.log('Login-Tab aktiviert');
  });
  
  newRegisterTab.addEventListener('click', () => {
    newRegisterTab.classList.add('active');
    newLoginTab.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    console.log('Register-Tab aktiviert');
  });
  
  // Passwort-Sichtbarkeit togglen
  const togglePassword = (inputId, toggleId) => {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    if (!input || !toggle) {
      console.error(`Toggle-Elemente fehlen: input=${inputId}, toggle=${toggleId}`);
      return;
    }
    
    // Entferne bestehende Listener
    const newToggle = removeListeners(toggle);
    const icon = newToggle.querySelector('.toggle-icon');
    
    newToggle.addEventListener('click', () => {
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
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      console.log('Login erfolgreich');
      window.location.href = './index.html';
    } catch (error) {
      document.getElementById('error-message').textContent = error.message;
      document.getElementById('error-message').classList.remove('hidden');
    }
  });
  
  // Registrierungs-Handler
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    
    if (password !== passwordConfirm) {
      document.getElementById('error-message').textContent = 'Passwörter stimmen nicht überein';
      document.getElementById('error-message').classList.remove('hidden');
      return;
    }
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } }
      });
      if (error) throw error;
      console.log('Registrierung erfolgreich, überprüfe deine E-Mail');
      document.getElementById('confirmation-modal').classList.remove('hidden');
    } catch (error) {
      document.getElementById('error-message').textContent = error.message;
      document.getElementById('error-message').classList.remove('hidden');
    }
  });
});