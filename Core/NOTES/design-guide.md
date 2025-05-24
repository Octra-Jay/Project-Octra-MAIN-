# OCTRA Website Design-Guide

## Ziel
Ein modernes, futuristisches Webdesign mit flüssiger Benutzererfahrung, inspiriert von der STARTIT-BOT-Website, erweitert mit lila Neon-Ästhetik, responsiven Animationen und modularem Aufbau.

## 1. Farbpalette & Atmosphäre
### Primärfarben
- #a259ff (Lila) – Hauptakzente, Buttons, Überschriften
- #0e0e0e (Schwarz) – Hintergrund (Dark Mode)
- #1a1a1a (Dunkelgrau) – Karten, Sektionen
- #ffffff (Weiß) – Textfarbe
### Sekundärfarben
- #00c6ff (Neonblau), #ff4ecd (Neonrosa) – Highlights, Hover-Effekte
- Transparente Lila-Töne – Glas-/Blur-Effekte

## 2. Schrift & Typografie
- **Font-Familien**: Poppins, Urbanist, alternativ Inter
- **Größen**: 
  - Headline: text-5xl, text-3xl, text-xl
  - Standardtext: text-base, text-sm für Hinweise
- **Farbe**: Weiß oder leicht transparent (text-white/90)

## 3. Layout & Struktur
### Header
- Fixiert mit Scroll-Animation
- Links: Animiertes Octra-Logo (Zerfall/Zusammensetzung)
- Rechts: Navigation (Projekte, Stats, etc.)
- Mobil: Hamburger-Icon mit Slide-Out-Menü
### Landing-Bereich
- Vollbild mit Partikeleffekt oder 3D-Hintergrund
- Zentrales Logo (animiert beim Laden)
- CTA-Button: „Mehr erfahren“ / „Bot einladen“
- Smooth-Scroll-Pfeil

## 4. Animationen
- **Tools**: Tailwind-Transitions, AOS-ähnliche Effekte
- **Buttons**: rounded-xl, Glow, Hover: scale-105, animierter Gradient
- **Karten**: Hover: Elevation + Glow, Scroll-In: Fade
- **Logo**: Zerfall & Aufbau, Hover: pulsierender Glow

## 5. Seiten & Module
- **Projekte**: Rasterlayout, animierte Cards, Plattformfarben (Lila für Discord, Blau für Guilded)
- **Releases**: Timeline-Layout, ausklappbare Panels, Status-Badges
- **Stats**: Live-Daten (Supabase), Kreisdiagramme (chart.js), countUp.js
- **Wiki**: Accordion-Layout, Setup, Befehle, Module
- **Credits**: Galerie-Ansicht, Rollentitel, Kontaktbuttons

## 6. Benutzerbereich / Accountsystem
- **Registrierung**: E-Mail & Passwort, Plattform-Verknüpfung (Discord, GitHub, Guilded)
- **Dashboard / Plugin-Manager**: Kachelansicht, Toggle-Switches, Tabs (Server-Settings, User Management, Statistik, Logs)

## 7. Footer & Rechtliches
- 3 Spalten: Socials, Navigation, Rechtliches
- Lila Linie als Trenner
- Scroll-to-Top-Button
- Cookie-Consent: Transparent, lila CTA-Buttons
- Impressum/Datenschutz: Accordion-Style

## 8. Optimierung & Technik
- **Responsive**: Mobile-First, Breakpoints für Tablet/Desktop
- **Performance**: Lazy Loading, begrenzte Animationen
- **SEO & Meta**: Open Graph, Favicon, strukturierte Daten

## 9. Technologische Umsetzung
- **Frameworks**: Next.js + Tailwind CSS
- **Animationen**: Framer Motion
- **Backend**: Supabase für API/Auth/Live-Stats
- **Stats**: Chart.js