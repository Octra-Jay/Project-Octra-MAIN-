/octra-web/
├── src/                    # Quellcode für die Website
│   ├── pages/              # HTML-Seiten
│   │   ├── index.html      # Landingpage
│   │   ├── projects.html   # Projekte
│   │   ├── releases.html   # Changelog, Patchnotes
│   │   ├── info.html       # Ziele, Roadmap
│   │   ├── stats.html      # Live-Statistiken
│   │   ├── server.html     # Verknüpfte Server
│   │   ├── wiki.html       # Dokumentation
│   │   ├── credits.html    # Entwicklerliste
│   │   ├── impressum.html  # Rechtliches, Datenschutz
│   │   └── easter-eggs.html # Easter Eggs und Tools
│   ├── css/                # Styling
│   │   ├── tailwind.css    # Tailwind CSS (nach npm, zunächst CDN)
│   │   └── custom.css      # Benutzerdefinierte Stile (Neon, Animationen)
│   ├── js/                 # Separate JavaScript-Skripte
│   │   ├── cookie.js       # Cookie-Banner-Logik
│   │   ├── animations.js   # Animationen (Logo, Buttons, Scroll)
│   │   ├── nav.js          # Navigation (Hamburger-Menü, Scroll)
│   │   ├── stats.js        # Live-Statistiken (Platzhalter für API)
│   │   └── plugins.js      # Plugin-Manager-Logik (Frontend)
│   └── components/         # Wiederverwendbare Komponenten
│       ├── header.html     # Fixierter Header mit Logo
│       ├── footer.html     # Footer mit Socials, Navigation
│       └── nav.html        # Mobile-Menü (fixiert unten)
├── assets/                 # Statische Ressourcen
│   ├── logo/               # Logos
│   │   ├── logo.png        # Hauptlogo
│   │   ├── logo-dark.png   # Dark-Mode-Logo
│   │   └── logo-anim.gif   # Animierte Logo-Version
│   ├── icons/              # Icons für Navigation, OAuth
│   │   ├── discord.svg     # Discord-Icon
│   │   ├── guilded.svg     # Guilded-Icon
│   │   ├── github.svg      # GitHub-Icon
│   │   ├── roblox.svg      # Roblox-Icon
│   │   └── home.svg        # Navigation-Icon
│   └── images/             # Bilder
│       ├── hero-bg.jpg     # Hintergrundbild Landingpage
│       └── placeholder.png # Platzhalter
├── .gitignore              # Ignoriert node_modules, .env
├── package.json            # Für npm-Abhängigkeiten (später)
├── design-guide.md         # Deine Designbeschreibung
├── README.md               # Projektbeschreibung
└── .git/                   # Git-Repository