create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  origen text not null default 'landing',
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

drop policy if exists "Sistema registra waitlist" on public.waitlist;

create policy "Sistema registra waitlist"
on public.waitlist for insert
to anon, authenticated
with check (
  email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
);
