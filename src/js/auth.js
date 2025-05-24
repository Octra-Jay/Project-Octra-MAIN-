// Supabase-Client initialisieren
const supabase = Supabase.createClient(
  'https://bvnjypdwndtiguwmnrmm.supabase.co', // Ersetze mit deiner Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bmp5cGR3bmR0aWd1d21ucm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzUyNDUsImV4cCI6MjA2MzYxMTI0NX0.e1Zu_yf3ojHn9Vgq0stAKzBCZ69pWFt3fY0IHgVY748' // Ersetze mit deinem Anon Key
);

// Tab-Umschaltung
const loginTab = document.getElementBy("login-tab");
const registerTab = document.getElementById("register-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const errorMessage = document.getElementById("error-message");

if (!loginTab || !registerTab || !loginForm || !registerForm) {
  console.error('Tab oder Formular nicht gefunden:', { loginTab, registerTab, loginForm, registerForm });
}

loginTab.addEventListener('click', () => {
  console.log('Login-Tab geklickt');
  loginTab.classList.add('border-b-2', 'border-[#a259ff]');
  registerTab.classList.remove('border-b-2', 'border-[#a259ff]');
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
  errorMessage.classList.add('hidden');
});

registerTab.addEventListener('click', () => {
  console.log('Register-Tab geklickt');
  registerTab.classList.add('border-b-2', 'border-[#a259ff]');
  loginTab.classList.remove('border-b-2', 'border-[#a259ff]');
  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  errorMessage.classList.add('hidden');
});

// Login-Formular
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errorMessage.textContent = 'Bitte gib eine gültige E-Mail ein.';
    errorMessage.classList.remove('hidden');
    return;
  }
  if (password.length < 6) {
    errorMessage.textContent = 'Passwort muss mindestens 6 Zeichen lang sein.';
    errorMessage.classList.remove('hidden');
    return;
  }
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    errorMessage.textContent = 'Fehler beim Einloggen: ' + error.message;
    errorMessage.classList.remove('hidden');
  }
});

// Registrierungs-Formular
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const passwordConfirm = document.getElementById('register-password-confirm').value;
  
  if (username.length < 3) {
    errorMessage.textContent = 'Benutzername muss mindestens 3 Zeichen lang sein.';
    errorMessage.classList.remove('hidden');
    return;
  }
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errorMessage.textContent = 'Bitte gib eine gültige E-Mail ein.';
    errorMessage.classList.remove('hidden');
    return;
  }
  if (password.length < 6) {
    errorMessage.textContent = 'Passwort muss mindestens 6 Zeichen lang sein.';
    errorMessage.classList.remove('hidden');
    return;
  }
  if (password !== passwordConfirm) {
    errorMessage.textContent = 'Passwörter stimmen nicht überein.';
    errorMessage.classList.remove('hidden');
    return;
  }
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });
  
  if (error) {
    errorMessage.textContent = 'Fehler bei der Registrierung: ' + error.message;
    errorMessage.classList.remove('hidden');
  } else {
    errorMessage.textContent = 'Registrierung erfolgreich! Bitte überprüfe deine E-Mail.';
    errorMessage.classList.remove('hidden', 'text-red-500');
    errorMessage.classList.add('text-green-500');
  }
});

// OAuth
document.getElementById('discord-oauth').addEventListener('click', async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: { redirectTo: 'http://localhost:3000/auth.html' }
  });
});

document.getElementById('github-oauth').addEventListener('click', async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: 'http://localhost:3000/auth.html' }
  });
});

// Auth-Status überwachen
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN') {
    const user = session.user;
    await supabase
      .from('profiles')
      .update({ online_status: true })
      .eq('id', user.id);
    window.location.href = '/dashboard'; // Platzhalter
  } else if (event === 'SIGNED_OUT') {
    const { data: user } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('profiles')
        .update({ online_status: false })
        .eq('id', user.id);
    }
  }
});