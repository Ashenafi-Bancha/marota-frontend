drop policy if exists "Course ratings read all users" on public.course_ratings;

create policy "Course ratings read all users" on public.course_ratings
for select
using (true);
