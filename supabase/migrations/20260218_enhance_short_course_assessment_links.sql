begin;

alter table public.short_course_quizzes
  add column if not exists quiz_url text,
  add column if not exists review_url text;

alter table public.short_course_projects
  add column if not exists project_brief_url text,
  add column if not exists review_url text;

alter table public.short_course_tests
  add column if not exists test_guide_url text,
  add column if not exists review_url text;

update public.short_course_lessons
set
  video_url = case title
    when 'Lesson 1: Understanding Computer Hardware' then 'https://www.youtube.com/results?search_query=computer+hardware+basics'
    when 'Lesson 2: Operating System Basics' then 'https://www.youtube.com/results?search_query=operating+system+basics+for+beginners'
    when 'Lesson 3: Microsoft Word Essentials' then 'https://www.youtube.com/results?search_query=microsoft+word+basics+tutorial'
    when 'Lesson 4: Excel Basics' then 'https://www.youtube.com/results?search_query=microsoft+excel+basics+tutorial'
    when 'Lesson 5: Internet Search and Research' then 'https://www.youtube.com/results?search_query=internet+search+skills+for+beginners'
    when 'Lesson 6: Email and Online Safety' then 'https://www.youtube.com/results?search_query=email+security+and+internet+safety+basics'
    else video_url
  end,
  documentation_url = case title
    when 'Lesson 1: Understanding Computer Hardware' then 'https://edu.gcfglobal.org/en/computerbasics/inside-a-computer/1/'
    when 'Lesson 2: Operating System Basics' then 'https://edu.gcfglobal.org/en/windowsbasics/about-this-tutorial/1/'
    when 'Lesson 3: Microsoft Word Essentials' then 'https://support.microsoft.com/word'
    when 'Lesson 4: Excel Basics' then 'https://support.microsoft.com/excel'
    when 'Lesson 5: Internet Search and Research' then 'https://edu.gcfglobal.org/en/internetbasics/search-better/1/'
    when 'Lesson 6: Email and Online Safety' then 'https://edu.gcfglobal.org/en/internetbasics/internet-safety/1/'
    else documentation_url
  end,
  external_review_url = case title
    when 'Lesson 1: Understanding Computer Hardware' then 'https://www.ibm.com/topics/computer-hardware'
    when 'Lesson 2: Operating System Basics' then 'https://learn.microsoft.com/windows/'
    when 'Lesson 3: Microsoft Word Essentials' then 'https://www.guru99.com/ms-word-tutorial.html'
    when 'Lesson 4: Excel Basics' then 'https://www.excel-easy.com/'
    when 'Lesson 5: Internet Search and Research' then 'https://support.google.com/websearch/'
    when 'Lesson 6: Email and Online Safety' then 'https://staysafeonline.org/'
    else external_review_url
  end
where module_id in (
  select id
  from public.short_course_modules
  where course_key = 'Short Course::Basic Computer Skills'
);

insert into public.short_course_quizzes (
  course_key,
  title,
  description,
  question_count,
  pass_score,
  sort_order,
  quiz_url,
  review_url
)
values
  (
    'Short Course::Basic Computer Skills',
    'Module 1 Quiz: Computer Fundamentals',
    'Quiz focused on hardware components, operating systems, and file management.',
    12,
    70,
    1,
    'https://quizizz.com/?lng=en',
    'https://edu.gcfglobal.org/en/computerbasics/'
  ),
  (
    'Short Course::Basic Computer Skills',
    'Module 2 Quiz: Office Productivity',
    'Quiz focused on Word, Excel, and presentation basics.',
    15,
    70,
    2,
    'https://kahoot.com/schools-u/',
    'https://support.microsoft.com/microsoft-365'
  ),
  (
    'Short Course::Basic Computer Skills',
    'Final Review Quiz',
    'Comprehensive quiz covering all modules before final assessment.',
    20,
    75,
    3,
    'https://www.proprofs.com/quiz-school/',
    'https://edu.gcfglobal.org/en/topics/computers/'
  )
on conflict (course_key, title) do update
set
  description = excluded.description,
  question_count = excluded.question_count,
  pass_score = excluded.pass_score,
  sort_order = excluded.sort_order,
  quiz_url = excluded.quiz_url,
  review_url = excluded.review_url;

insert into public.short_course_projects (
  course_key,
  title,
  description,
  submission_instruction,
  sort_order,
  project_brief_url,
  review_url
)
values
  (
    'Short Course::Basic Computer Skills',
    'Project 1: Office Starter Pack',
    'Create one Word document, one Excel budget sheet, and one 5-slide presentation.',
    'Submit a single cloud folder link containing all three files.',
    1,
    'https://support.microsoft.com/microsoft-365',
    'https://edu.gcfglobal.org/en/topics/office/'
  ),
  (
    'Short Course::Basic Computer Skills',
    'Project 2: Internet Research and Communication',
    'Research a topic, summarize findings in a document, and draft a professional email.',
    'Submit your summary document and email draft as PDF files.',
    2,
    'https://edu.gcfglobal.org/en/internetbasics/',
    'https://staysafeonline.org/'
  )
on conflict (course_key, title) do update
set
  description = excluded.description,
  submission_instruction = excluded.submission_instruction,
  sort_order = excluded.sort_order,
  project_brief_url = excluded.project_brief_url,
  review_url = excluded.review_url;

insert into public.short_course_tests (
  course_key,
  title,
  description,
  duration_minutes,
  pass_score,
  sort_order,
  test_guide_url,
  review_url
)
values
  (
    'Short Course::Basic Computer Skills',
    'Midterm Competency Test',
    'Timed assessment of foundational computer and office productivity skills.',
    45,
    70,
    1,
    'https://www.classmarker.com/online-testing/',
    'https://edu.gcfglobal.org/en/computerbasics/'
  ),
  (
    'Short Course::Basic Computer Skills',
    'Final Competency Test',
    'Final timed test that evaluates practical and theoretical understanding.',
    60,
    75,
    2,
    'https://www.testportal.net/',
    'https://edu.gcfglobal.org/en/topics/computers/'
  )
on conflict (course_key, title) do update
set
  description = excluded.description,
  duration_minutes = excluded.duration_minutes,
  pass_score = excluded.pass_score,
  sort_order = excluded.sort_order,
  test_guide_url = excluded.test_guide_url,
  review_url = excluded.review_url;

commit;
