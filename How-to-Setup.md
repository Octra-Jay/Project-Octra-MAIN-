9ä# OCTRA – How-to-Setup (Datenbank & Backend)

## 1. Supabase-Datenbank anlegen

1. Gehe auf [https://supabase.com/](https://supabase.com/) und erstelle einen kostenlosen Account.
2. Klicke auf **New Project**.
3. Wähle einen Namen, ein Passwort und eine Region.
4. Warte, bis das Projekt erstellt ist.

## 2. Verbindungseinstellungen kopieren

1. Im Supabase-Dashboard findest du unter **Project Settings > API** die **Project URL** und den **anon public key**.
2. Kopiere beide Werte.

## 3. .env-Datei anlegen (lokal oder im Codespace)

1. Erstelle im Projektordner eine Datei namens `.env`.
2. Füge Folgendes ein:

```
SUPABASE_URL=deine_project_url
SUPABASE_ANON_KEY=dein_anon_key
```

## 4. Supabase-Tabellen & Auth konfigurieren

1. Gehe im Supabase-Dashboard zu **Table Editor**.
2. Lege folgende Tabellen an:
   - `users` (id, username, email, referral_code, referred_by, created_at)
   - `referrals` (id, user_id, referred_user_id, created_at)
   - `rewards` (id, user_id, type, amount, created_at)
3. Aktiviere unter **Authentication > Settings** die gewünschten Auth-Provider (z.B. E-Mail, Discord, GitHub).

## 5. Supabase JS SDK installieren (optional für Node.js Backend)

```
npm install @supabase/supabase-js
```

## 6. Supabase im Frontend/Backend einbinden

- Im Frontend ist das Supabase-SDK bereits per CDN eingebunden (`public/scripts/supabase.js`).
- Im Backend (Node.js):

```js
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
```

## 7. Referral-Logik (Beispiel)

- Beim Registrieren kann ein Referral-Code mitgegeben werden (siehe `auth.js`).
- Nach erfolgreicher Registrierung:
  - Trage den Referral-Code in `users.referred_by` ein.
  - Erstelle einen Eintrag in der Tabelle `referrals`.
  - Belohne den Werber über die Tabelle `rewards`.

## 8. Testen

- Registriere dich mit und ohne Referral-Code.
- Prüfe im Supabase-Dashboard, ob die Einträge korrekt angelegt werden.

## 9. SQL-Setup für Supabase (Copy & Paste)

Füge dieses SQL-Skript im Supabase SQL Editor ein, um alle Tabellen und Relationen automatisch anzulegen:

```sql
-- Tabelle: users
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  email text not null unique,
  referral_code text unique,
  referred_by text references users(referral_code),
  created_at timestamp with time zone default timezone('utc', now())
);

-- Tabelle: referrals
create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  referred_user_id uuid references users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Tabelle: rewards
create table if not exists rewards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  type text not null, -- z.B. 'coins', 'badge', 'feature'
  amount integer default 0,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Indexe für Performance
create index if not exists idx_users_referral_code on users(referral_code);
create index if not exists idx_users_email on users(email);
create index if not exists idx_referrals_user_id on referrals(user_id);
create index if not exists idx_referrals_referred_user_id on referrals(referred_user_id);
create index if not exists idx_rewards_user_id on rewards(user_id);
```

Damit ist die komplette Datenbankstruktur für das Referral-Programm und die Userverwaltung in Supabase angelegt.

---

**Tipp:**
- Für produktive Nutzung: Supabase-Keys niemals öffentlich machen!
- Für Discord/Guilded-Login: OAuth-Redirect-URLs in Supabase eintragen.

Fertig! Dein Octra-System ist jetzt mit Supabase-Datenbank und Referral-Programm einsatzbereit.
