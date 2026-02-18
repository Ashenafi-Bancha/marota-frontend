drop policy if exists "Course ratings read all authenticated" on public.course_ratings;

create policy "Course ratings read all authenticated" on public.course_ratings
for select
using (auth.role() = 'authenticated');
