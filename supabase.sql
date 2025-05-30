-- OCTRA Supabase SQL Setup (Reset & Neuaufbau)
-- Führt zuerst ein vollständiges Löschen aller relevanten Tabellen und Indexe durch, dann wird alles neu angelegt.

-- Bestehende Tabellen und Indexe löschen (Reihenfolge beachten wegen Foreign Keys)
drop index if exists idx_rewards_user_id;
drop index if exists idx_referrals_referred_user_id;
drop index if exists idx_referrals_user_id;
drop index if exists idx_users_email;
drop index if exists idx_users_referral_code;

drop table if exists rewards cascade;
drop table if exists referrals cascade;
drop table if exists users cascade;

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
