// sendReleaseMail.js
// Node.js Beispiel für automatischen E-Mail-Versand im Octra-Design
// Benötigt: npm install nodemailer

const nodemailer = require('nodemailer');

// Empfänger
const recipients = [
  'jayden_octra@yahoo.com',
  'stavro_octra@yahoo.com',
  'benedikt_octra@yahoo.com'
];

// Transporter (hier Beispiel mit Gmail, für Produktivbetrieb SMTP/Service anpassen!)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dein-octra-mail@gmail.com', // Absender-Adresse
    pass: 'dein-app-passwort' // App-Passwort oder OAuth2
  }
});

// HTML-Template im Octra-Design
const htmlContent = `
  <div style="background:linear-gradient(135deg,#1a002b,#3a0066);color:#fff;font-family:'Poppins',Arial,sans-serif;padding:32px 16px;max-width:600px;margin:auto;border-radius:18px;box-shadow:0 0 32px #a259ff55;">
    <img src="https://octra.dev/assets/logo/logo-anim.gif" alt="OCTRA Logo" style="height:48px;display:block;margin:0 auto 16px auto;">
    <h1 style="color:#a259ff;text-align:center;font-size:2.2em;margin-bottom:0.5em;">OCTRA Release-Update 1.1.0 🎉</h1>
    <p style="text-align:center;font-size:1.1em;">Hallo liebes Dev-Team,<br>heute wurde <b>OCTRA v1.1.0</b> offiziell veröffentlicht!</p>
    <hr style="border:0;border-top:1px solid #a259ff33;margin:24px 0;">
    <h2 style="color:#a259ff;font-size:1.3em;">Was ist neu?</h2>
    <ul style="font-size:1.05em;line-height:1.7;">
      <li>Clansystem (inkl. Leaderboards, Clanverwaltung, Einladungen)</li>
      <li>Performance- und Sicherheitsverbesserungen</li>
      <li>Modernisierte Mobile-Navbar auf allen Seiten</li>
      <li>Cookie-Consent-Modal & Datenschutz-Features</li>
      <li>Bugfixes und UI-Polishing</li>
    </ul>
    <h2 style="color:#a259ff;font-size:1.3em;margin-top:1.5em;">Aktueller Stand</h2>
    <p>OCTRA ist jetzt als All-in-One-System für Discord, Guilded & Web stabil nutzbar. Die wichtigsten Module sind live, das Design ist konsistent und mobil optimiert.</p>
    <h2 style="color:#a259ff;font-size:1.3em;margin-top:1.5em;">Nächste Schritte</h2>
    <ul style="font-size:1.05em;line-height:1.7;">
      <li>Plugin-System & API für externe Erweiterungen</li>
      <li>Mehr Statistik- und Analysefunktionen</li>
      <li>Onboarding-Flow für neue User</li>
      <li>Weitere Community-Features</li>
    </ul>
    <hr style="border:0;border-top:1px solid #a259ff33;margin:24px 0;">
    <p style="text-align:center;font-size:0.95em;color:#c7aaff;">Bleibt dran – gemeinsam machen wir OCTRA noch besser!<br>Viele Grüße,<br>das OCTRA Team</p>
    <div style="text-align:center;margin-top:24px;">
      <img src="https://octra.dev/assets/logo/logo-anim.gif" alt="OCTRA Logo" style="height:32px;">
      <div style="color:#a259ff;font-weight:bold;margin-top:8px;">octra.dev</div>
    </div>
  </div>
`;

// Mail-Optionen
const mailOptions = {
  from: 'OCTRA <dein-octra-mail@gmail.com>',
  to: recipients.join(','),
  subject: 'OCTRA Release 1.1.0 – Alle Neuerungen & Roadmap',
  html: htmlContent
};

// Senden
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Fehler beim Senden:', error);
  }
  console.log('Release-Mail gesendet:', info.response);
});
