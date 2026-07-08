create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.contenido_senas (
  id uuid primary key default gen_random_uuid(),
  palabra text not null,
  descripcion text not null,
  region text not null default 'Chile',
  nivel text not null,
  video_path text not null,
  poster_path text,
  credito text,
  consentimiento boolean not null default false,
  estado text not null default 'borrador'
    check (estado in ('borrador', 'publicada')),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.contenido_senas enable row level security;

create policy "Administradores consultan su rol"
on public.admin_users for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Administradores consultan contenido"
on public.contenido_senas for select
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

create policy "Administradores crean contenido"
on public.contenido_senas for insert
to authenticated
with check (
  created_by = (select auth.uid())
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

create policy "Administradores actualizan contenido"
on public.contenido_senas for update
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

create policy "Administradores suben videos"
on storage.objects for insert
to authenticated
with check (
  bucket_id in ('videos', 'posters')
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

-- Después de ejecutar esta migración, agrega tu cuenta como administradora:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'TU_EMAIL';
