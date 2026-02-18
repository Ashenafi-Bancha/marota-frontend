alter table public.enrollments
add column if not exists approval_status text not null default 'pending';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'enrollments_approval_status_check'
  ) then
    alter table public.enrollments
      add constraint enrollments_approval_status_check
      check (approval_status in ('pending', 'approved', 'rejected'));
  end if;
end $$;

update public.enrollments
set approval_status = 'approved'
where approval_status is null;

drop policy if exists "Enrollments insert own" on public.enrollments;
create policy "Enrollments insert own" on public.enrollments
for insert
with check (
  auth.uid() = user_id
  and approval_status = 'pending'
);

drop policy if exists "Enrollments update own" on public.enrollments;
create policy "Enrollments update own" on public.enrollments
for update
using (
  auth.uid() = user_id
  and approval_status = 'approved'
)
with check (
  auth.uid() = user_id
  and approval_status = 'approved'
);

drop policy if exists "Enrollments admin select" on public.enrollments;
create policy "Enrollments admin select" on public.enrollments
for select
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and lower(coalesce(p.role, 'student')) = 'admin'
  )
);

drop policy if exists "Enrollments admin update" on public.enrollments;
create policy "Enrollments admin update" on public.enrollments
for update
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and lower(coalesce(p.role, 'student')) = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and lower(coalesce(p.role, 'student')) = 'admin'
  )
);
