create policy "Usuarios consultan contenido publicado"
on public.contenido_senas for select
to authenticated
using (estado = 'publicada');
