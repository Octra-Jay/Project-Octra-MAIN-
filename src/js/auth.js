document.addEventListener('DOMContentLoaded', () => {
  console.log('auth.js geladen', new Date().toISOString());

  // Supabase-Client initialisieren
  const supabase = window.supabase?.createClient(
    'https://bvnjypdwndtiguwmnrmm.supabase.co', // Ersetze mit deiner Supabase URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bmp5cGR3bmR0aWd1d21ucm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzUyNDUsImV4cCI6MjA2MzYxMTI0NX0.e1Zu_yf3ojHn9Vgq0stAKzBCZ69pWFt3fY0IHgVY748'      // Ersetze mit deinem Anon Key
  );

  if (!window.supabase) {
    console.error('Supabase-Bibliothek nicht geladen');
    return;
  }
  console.log('Supabase initialisiert');

  // DOM-Elemente
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('success-message');
  const confirmationModal = document.getElementById('confirmation-modal');
  const confirmationForm = document.getElementById('confirmation-form');
  const changeEmailButton = document.getElementById('change-email');
  const loginPasswordToggle = document.getElementById('login-password-toggle');
  const registerPasswordToggle = document.getElementById('register-password-toggle');
  const registerPasswordConfirmToggle = document.getElementById('register-password-confirm-toggle');
  const discordOAuthButton = document.getElementById('discord-oauth');
  const githubOAuthButton = document.getElementById('github-oauth');
  const profileIcon = document.getElementById('profile-icon');
  const profileIconMobile = document.getElementById('profile-icon-mobile');
  const profilePopup = document.getElementById('profile-popup');
  const logoutButton = document.getElementById('logout-button');
  const profileForm = document.getElementById('profile-form');
  const profileUsername = document.getElementById('profile-username');
  const profileEmail = document.getElementById('profile-email');
  const passwordForm = document.getElementById('password-form');
  const newPasswordToggle = document.getElementById('new-password-toggle');
  const confirmPasswordToggle = document.getElementById('confirm-password-toggle');
  const cookieSettingsForm = document.getElementById('cookie-settings-form');
  const revokeConsentButton = document.getElementById('revoke-consent');

  // Auth-Status
  let isAuthenticated = false;
  let currentUser = null;
  supabase.auth.getSession().then(({ data: { session } }) => {
    isAuthenticated = !!session;
    currentUser = session?.user || null;
    console.log('Initialer Auth-Status:', isAuthenticated, currentUser);
    if (profileUsername && profileEmail) {
      loadProfile();
    }
    if (cookieSettingsForm) {
      loadCookieSettings();
    }
  });

  // Profil laden
  async function loadProfile() {
    if (!currentUser) {
      console.log('Kein Benutzer, redirect zu auth.html');
      window.location.href = '/auth.html';
      return;
    }
    try {
      profileUsername.textContent = currentUser.user_metadata?.username || currentUser.email.split('@')[0];
      profileEmail.textContent = currentUser.email;
      console.log('Profil geladen:', { username: profileUsername.textContent, email: profileEmail.textContent });
    } catch (err) {
      console.error('Fehler beim Laden des Profils:', err);
      if (errorMessage) {
        errorMessage.textContent = 'Fehler beim Laden des Profils.';
        errorMessage.classList.remove('hidden');
      }
    }
  }

  // Cookie-Einstellungen laden
  function loadCookieSettings() {
    const consent = window.getCookieConsent?.();
    if (consent) {
      document.getElementById('settings-analytics-cookies').checked = consent.analytics;
      document.getElementById('settings-marketing-cookies').checked = consent.marketing;
      console.log('Cookie-Einstellungen geladen:', consent);
    }
  }

  // Profil-Popup togglen
  const toggleProfilePopup = () => {
    if (isAuthenticated) {
      profilePopup.classList.toggle('show');
      console.log('Profil-Popup:', profilePopup.classList.contains('show') ? 'geöffnet' : 'geschlossen');
    } else {
      console.log('Nicht angemeldet, redirect zu auth.html');
      window.location.href = '/auth.html';
    }
  };

  if (profileIcon) profileIcon.addEventListener('click', toggleProfilePopup);
  if (profileIconMobile) profileIconMobile.addEventListener('click', toggleProfilePopup);

  // Popup schließen, wenn außerhalb geklickt wird
  document.addEventListener('click', (e) => {
    if (profilePopup && !profilePopup.contains(e.target) && !profileIcon?.contains(e.target) && (!profileIconMobile || !profileIconMobile.contains(e.target))) {
      profilePopup.classList.remove('show');
      console.log('Profil-Popup geschlossen (Außenklick)');
    }
  });

  // Logout
  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Logout-Fehler:', error.message);
          if (errorMessage) {
            errorMessage.textContent = 'Fehler beim Abmelden: ' + error.message;
            errorMessage.classList.remove('hidden');
          }
        } else {
          console.log('Logout erfolgreich');
          isAuthenticated = false;
          currentUser = null;
          profilePopup.classList.remove('show');
          window.location.href = '/auth.html';
        }
      } catch (err) {
        console.error('Unerwarteter Logout-Fehler:', err);
        if (errorMessage) {
          errorMessage.textContent = 'Unerwarteter Fehler beim Abmelden.';
          errorMessage.classList.remove('hidden');
        }
      }
    });
  }

  // Profil bearbeiten
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newUsername = document.getElementById('edit-username')?.value;
      if (!newUsername) {
        console.error('Validierungsfehler: Benutzername leer');
        if (errorMessage) {
          errorMessage.textContent = 'Bitte gib einen Benutzernamen ein.';
          errorMessage.classList.remove('hidden');
        }
        return;
      }
      if (newUsername.length < 3) {
        console.error('Validierungsfehler: Benutzername zu kurz');
        if (errorMessage) {
          errorMessage.textContent = 'Benutzername muss mindestens 3 Zeichen lang sein.';
          errorMessage.classList.remove('hidden');
        }
        return;
      }
      console.log('Profil-Update-Versuch:', { newUsername });
      try {
        const { error } = await supabase.auth.updateUser({
          data: { username: newUsername }
        });
        if (error) {
          console.error('Profil-Update-Fehler:', error.message);
          if (errorMessage) {
            errorMessage.textContent = 'Fehler beim Aktualisieren: ' + error.message;
            errorMessage.classList.remove('hidden');
          }
        } else {
          console.log('Profil erfolgreich aktualisiert');
          profileUsername.textContent = newUsername;
          if (successMessage) {
            successMessage.textContent = 'Benutzername erfolgreich aktualisiert!';
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
          }
          document.getElementById('edit-username').value = '';
        }
      } catch (err) {
        console.error('Unerwarteter Profil-Update-Fehler:', err);
        if (errorMessage) {
          errorMessage.textContent = 'Unerwarteter Fehler beim Aktualisieren.';
          errorMessage.classList.remove('hidden');
        }
      }
    });
  }

  // Passwort ändern
  if (passwordForm) {
    newPasswordToggle?.addEventListener('click', (e) => {
      e.preventDefault();
      const input = document.getElementById('new-password');
      input.type = input.type === 'password' ? 'text' : 'password';
      console.log('Neues Passwort Sichtbarkeit:', input.type);
    });

    confirmPasswordToggle?.addEventListener('click', (e) => {
      e.preventDefault();
      const input = document.getElementById('confirm-password');
      input.type = input.type === 'password' ? 'text' : 'password';
      console.log('Passwort-Bestätigung Sichtbarkeit:', input.type);
    });

    passwordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newPassword = document.getElementById('new-password')?.value;
      const confirmPassword = document.getElementById('confirm-password')?.value;

      if (!newPassword || !confirmPassword) {
        console.error('Validierungsfehler: Felder leer');
        if (errorMessage) {
          errorMessage.textContent = 'Bitte alle Felder ausfüllen.';
          errorMessage.classList.remove('hidden');
        }
        return;
      }
      if (newPassword.length < 6) {
        console.error('Validierungsfehler: Passwort zu kurz');
        if (errorMessage) {
          errorMessage.textContent = 'Passwort muss mindestens 6 Zeichen lang sein.';
          errorMessage.classList.remove('hidden');
        }
        return;
      }
      if (newPassword !== confirmPassword) {
        console.error('Validierungsfehler: Passwörter stimmen nicht überein');
        if (errorMessage) {
          errorMessage.textContent = 'Passwörter stimmen nicht überein.';
          errorMessage.classList.remove('hidden');
        }
        return;
      }

      console.log('Passwort-Update-Versuch');
      try {
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        });
        if (error) {
          console.error('Passwort-Update-Fehler:', error.message);
          if (errorMessage) {
            errorMessage.textContent = 'Fehler beim Ändern des Passworts: ' + error.message;
            errorMessage.classList.remove('hidden');
          }
        } else {
          console.log('Passwort erfolgreich geändert');
          if (successMessage) {
            successMessage.textContent = 'Passwort erfolgreich geändert!';
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
          }
          document.getElementById('new-password').value = '';
          document.getElementById('confirm-password').value = '';
        }
      } catch (err) {
        console.error('Unerwarteter Passwort-Update-Fehler:', err);
        if (errorMessage) {
          errorMessage.textContent = 'Unerwarteter Fehler beim Ändern des Passworts.';
          errorMessage.classList.remove('hidden');
        }
      }
    });
  }

  // Cookie-Einstellungen speichern
  if (cookieSettingsForm) {
    cookieSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const consent = {
        necessary: true,
        analytics: document.getElementById('settings-analytics-cookies')?.checked || false,
        marketing: document.getElementById('settings-marketing-cookies')?.checked || false,
      };
      window.setCookieConsent?.(consent);
      if (successMessage) {
        successMessage.textContent = 'Datenschutz-Einstellungen gespeichert!';
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
      }
      console.log('Datenschutz-Einstellungen gespeichert:', consent);
    });

    revokeConsentButton.addEventListener('click', () => {
      localStorage.removeItem('octra_cookie_consent');
      loadCookieSettings();
      if (successMessage) {
        successMessage.textContent = 'Zustimmung widerrufen!';
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
      }
      console.log('Cookie-Zustimmung widerrufen');
      showCookieModal();
    });
  }

  // Tabs
  if (loginTab && registerTab && loginForm && registerForm) {
    loginTab.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Login-Tab geklickt');
      loginTab.classList.add('border-b-2', 'border-purple-500');
      registerTab.classList.remove('border-b-2', 'border-purple-500');
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
      errorMessage?.classList.add('hidden');
      confirmationModal?.classList.add('hidden');
    });

    registerTab.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Register-Tab geklickt');
      registerTab.classList.add('border-b-2', 'border-purple-500');
      loginTab.classList.remove('border-b-2', 'border-purple-500');
      registerForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      errorMessage?.classList.add('hidden');
      confirmationModal?.classList.add('hidden');
    });
  }

  // Show Password
  if (loginPasswordToggle) {
    loginPasswordToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const input = document.getElementById('login-password');
      input.type = input.type === 'password' ? 'text' : 'password';
      console.log('Login-Passwort Sichtbarkeit:', input.type);
    });
  }

  if (registerPasswordToggle) {
    registerPasswordToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const input = document.getElementById('register-password');
      input.type = input.type === 'password' ? 'text' : 'password';
      console.log('Register-Passwort Sichtbarkeit:', input.type);
    });
  }

  if (registerPasswordConfirmToggle) {
    registerPasswordConfirmToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const input = document.getElementById('register-password-confirm');
      input.type = input.type === 'password' ? 'text' : 'password';
      console.log('Register-Passwort-Bestätigung Sichtbarkeit:', input.type);
    });
  }

  // Login-Formular
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value;
      const password = document.getElementById('login-password')?.value;

      if (!email || !password) {
        errorMessage.textContent = 'Bitte alle Felder ausfüllen.';
        errorMessage.classList.remove('hidden');
        return;
      }

      console.log('Login-Versuch:', { email });
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          console.error('Login-Fehler:', error.message);
          errorMessage.textContent = 'Fehler beim Einloggen: ' + error.message;
          errorMessage.classList.remove('hidden');
        } else {
          console.log('Login erfolgreich');
          isAuthenticated = true;
          window.location.href = '/dashboard';
        }
      } catch (err) {
        console.error('Unerwarteter Login-Fehler:', err);
        errorMessage.textContent = 'Unerwarteter Fehler.';
        errorMessage.classList.remove('hidden');
      }
    });
  }

  // Registrierungs-Formular
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Register-Submit ausgelöst');
      const username = document.getElementById('register-username')?.value;
      const email = document.getElementById('register-email')?.value;
      const password = document.getElementById('register-password')?.value;
      const passwordConfirm = document.getElementById('register-password-confirm')?.value;

      if (!username || !email || !password || !passwordConfirm) {
        console.error('Validierungsfehler: Felder leer');
        errorMessage.textContent = 'Bitte alle Felder ausfüllen.';
        errorMessage.classList.remove('hidden');
        return;
      }

      if (username.length < 3) {
        console.error('Validierungsfehler: Benutzername zu kurz');
        errorMessage.textContent = 'Benutzername muss mindestens 3 Zeichen lang sein.';
        errorMessage.classList.remove('hidden');
        return;
      }
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        console.error('Validierungsfehler: Ungültige E-Mail');
        errorMessage.textContent = 'Bitte gib eine gültige E-Mail ein.';
        errorMessage.classList.remove('hidden');
        return;
      }
      if (password.length < 6) {
        console.error('Validierungsfehler: Passwort zu kurz');
        errorMessage.textContent = 'Passwort muss mindestens 6 Zeichen lang sein.';
        errorMessage.classList.remove('hidden');
        return;
      }
      if (password !== passwordConfirm) {
        console.error('Validierungsfehler: Passwörter stimmen nicht überein');
        errorMessage.textContent = 'Passwörter stimmen nicht überein.';
        errorMessage.classList.remove('hidden');
        return;
      }

      console.log('Registrierung-Versuch:', { username, email });
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } }
        });

        if (error) {
          console.error('Registrierungs-Fehler:', error.message);
          errorMessage.textContent = 'Fehler bei der Registrierung: ' + error.message;
          errorMessage.classList.remove('hidden');
          return;
        }

        if (data.user) {
          console.log('Registrierung erfolgreich:', data.user);
          document.getElementById('register-username').disabled = true;
          document.getElementById('register-email').disabled = true;
          document.getElementById('register-password').disabled = true;
          document.getElementById('register-password-confirm').disabled = true;
          document.querySelector('#register-form button[type="submit"]').disabled = true;
          confirmationModal.classList.remove('hidden');
          console.log('Modal geöffnet:', !confirmationModal.classList.contains('hidden'));
        }
      } catch (err) {
        console.error('Unerwarteter Registrierungs-Fehler:', err);
        errorMessage.textContent = 'Unerwarteter Fehler bei der Registrierung.';
        errorMessage.classList.remove('hidden');
      }
    });
  }

  // Bestätigungsformular
  if (confirmationForm) {
    confirmationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = document.getElementById('confirmation-code')?.value;

      if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
        errorMessage.textContent = 'Bitte gib einen gültigen 6-stelligen Code ein.';
        errorMessage.classList.remove('hidden');
        return;
      }

      console.log('Code-Bestätigung:', { code });
      try {
        console.log('Code-Bestätigung erfolgreich (Demo)');
        confirmationModal.classList.add('hidden');
        errorMessage.textContent = 'E-Mail erfolgreich bestätigt!';
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('text-green-500');
        isAuthenticated = true;
      } catch (err) {
        console.error('Code-Bestätigungs-Fehler:', err);
        errorMessage.textContent = 'Fehler bei der Code-Bestätigung.';
        errorMessage.classList.remove('hidden');
      }
    });
  }

  // E-Mail ändern
  if (changeEmailButton) {
    changeEmailButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('E-Mail ändern geklickt');
      document.getElementById('register-username').disabled = false;
      document.getElementById('register-email').disabled = false;
      document.getElementById('register-password').disabled = false;
      document.getElementById('register-password-confirm').disabled = false;
      document.querySelector('#register-form button[type="submit"]').disabled = false;
      confirmationModal.classList.add('hidden');
    });
  }

  // OAuth: Discord
  if (discordOAuthButton) {
    discordOAuthButton.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('Discord OAuth gestartet');
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'discord',
          options: { redirectTo: 'http://localhost:7700/auth.html' }
        });
        if (error) {
          console.error('Discord OAuth-Fehler:', error.message);
          errorMessage.textContent = 'Fehler bei Discord-Anmeldung: ' + error.message;
          errorMessage.classList.remove('hidden');
        } else {
          isAuthenticated = true;
        }
      } catch (err) {
        console.error('Unerwarteter Discord OAuth-Fehler:', err);
        errorMessage.textContent = 'Unerwarteter Fehler bei Discord-Anmeldung.';
        errorMessage.classList.remove('hidden');
      }
    });
  }

  // OAuth: GitHub
  if (githubOAuthButton) {
    githubOAuthButton.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('GitHub OAuth gestartet');
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: { redirectTo: 'http://localhost:7700/auth.html' }
        });
        if (error) {
          console.error('GitHub OAuth-Fehler:', error.message);
          errorMessage.textContent = 'Fehler bei GitHub-Anmeldung: ' + error.message;
          errorMessage.classList.remove('hidden');
        } else {
          isAuthenticated = true;
        }
      } catch (err) {
        console.error('Unerwarteter GitHub OAuth-Fehler:', err);
        errorMessage.textContent = 'Unerwarteter Fehler bei GitHub-Anmeldung.';
        errorMessage.classList.remove('hidden');
      }
    });
  }

  // Auth-Status
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth-Event:', event, session);
    if (event === 'SIGNED_IN') {
      const user = session.user;
      console.log('Benutzer eingeloggt:', user.id);
      isAuthenticated = true;
      currentUser = user;
      const username = user.user_metadata?.username || user.email.split('@')[0];
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            username: username,
            online_status: true,
            is_admin: false
          });
        console.log('Profil aktualisiert:', { id: user.id, username });
        if (profileUsername && profileEmail) {
          loadProfile();
        }
        if (cookieSettingsForm) {
          loadCookieSettings();
        }
        if (window.location.pathname.includes('auth.html')) {
          window.location.href = '/dashboard';
        }
      } catch (err) {
        console.error('Fehler bei Profilaktualisierung:', err);
        if (errorMessage) {
          errorMessage.textContent = 'Fehler bei Profilaktualisierung.';
          errorMessage.classList.remove('hidden');
        }
      }
    } else if (event === 'SIGNED_OUT') {
      isAuthenticated = false;
      currentUser = null;
      console.log('Benutzer abgemeldet');
      if (window.location.pathname.includes('profile.html') || window.location.pathname.includes('settings.html')) {
        window.location.href = '/auth.html';
      }
    }
  });
});