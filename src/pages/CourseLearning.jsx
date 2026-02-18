import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { parseCourseIdentity } from "../utils/courseIdentity";
import { isMissingApprovalStatusColumnError } from "../utils/enrollmentApproval";

const toPercent = (completed, total) => {
  if (!total) return 0;
  return Math.round((completed / total) * 100);
};

export default function CourseLearning() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { courseKey = "" } = useParams();

  const decodedCourseKey = useMemo(() => decodeURIComponent(courseKey), [courseKey]);
  const parsedCourse = useMemo(
    () => parseCourseIdentity(decodedCourseKey),
    [decodedCourseKey]
  );

  const [loading, setLoading] = useState(true);
  const [accessMessage, setAccessMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [modules, setModules] = useState([]);
  const [lessonsByModule, setLessonsByModule] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tests, setTests] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [savingLessonId, setSavingLessonId] = useState(null);

  const fetchLearningContent = useCallback(async () => {
    if (!user || !decodedCourseKey) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setAccessMessage("");
    setStatusMessage("");

    let enrollmentRes = await supabase
      .from("enrollments")
      .select("course_title, approval_status")
      .eq("user_id", user.id)
      .eq("course_title", decodedCourseKey)
      .maybeSingle();

    if (isMissingApprovalStatusColumnError(enrollmentRes.error)) {
      enrollmentRes = await supabase
        .from("enrollments")
        .select("course_title")
        .eq("user_id", user.id)
        .eq("course_title", decodedCourseKey)
        .maybeSingle();

      if (enrollmentRes.data) {
        enrollmentRes = {
          ...enrollmentRes,
          data: {
            ...enrollmentRes.data,
            approval_status: "approved",
          },
        };
      }
    }

    if (enrollmentRes.error) {
      setAccessMessage(enrollmentRes.error.message);
      setLoading(false);
      return;
    }

    if (!isAdmin) {
      const approvalStatus = enrollmentRes.data?.approval_status || "pending";
      if (!enrollmentRes.data || approvalStatus !== "approved") {
        setAccessMessage(
          "You can access this learning content after your enrollment is approved."
        );
        setLoading(false);
        return;
      }
    }

    const [modulesRes, quizzesRes, projectsRes, testsRes] = await Promise.all([
      supabase
        .from("short_course_modules")
        .select("id, title, description, sort_order")
        .eq("course_key", decodedCourseKey)
        .order("sort_order", { ascending: true }),
      supabase
        .from("short_course_quizzes")
        .select("id, title, description, question_count, pass_score, sort_order, quiz_url, review_url")
        .eq("course_key", decodedCourseKey)
        .order("sort_order", { ascending: true }),
      supabase
        .from("short_course_projects")
        .select("id, title, description, submission_instruction, sort_order, project_brief_url, review_url")
        .eq("course_key", decodedCourseKey)
        .order("sort_order", { ascending: true }),
      supabase
        .from("short_course_tests")
        .select("id, title, description, duration_minutes, pass_score, sort_order, test_guide_url, review_url")
        .eq("course_key", decodedCourseKey)
        .order("sort_order", { ascending: true }),
    ]);

    if (modulesRes.error || quizzesRes.error || projectsRes.error || testsRes.error) {
      setStatusMessage(
        modulesRes.error?.message ||
          quizzesRes.error?.message ||
          projectsRes.error?.message ||
          testsRes.error?.message ||
          "Unable to load course content right now."
      );
      setLoading(false);
      return;
    }

    const moduleRows = modulesRes.data || [];
    const moduleIds = moduleRows.map((module) => module.id);

    const lessonsRes =
      moduleIds.length > 0
        ? await supabase
            .from("short_course_lessons")
            .select(
              "id, module_id, title, summary, video_url, documentation_url, external_review_url, sort_order"
            )
            .in("module_id", moduleIds)
            .order("sort_order", { ascending: true })
        : { data: [], error: null };

    if (lessonsRes.error) {
      setStatusMessage(lessonsRes.error.message);
      setLoading(false);
      return;
    }

    const lessonRows = lessonsRes.data || [];
    const lessonIds = lessonRows.map((lesson) => lesson.id);

    const progressRes =
      lessonIds.length > 0
        ? await supabase
            .from("short_course_user_lesson_progress")
            .select("lesson_id, completed")
            .eq("user_id", user.id)
            .in("lesson_id", lessonIds)
        : { data: [], error: null };

    if (progressRes.error) {
      setStatusMessage(progressRes.error.message);
      setLoading(false);
      return;
    }

    const groupedLessons = lessonRows.reduce((acc, lesson) => {
      if (!acc[lesson.module_id]) {
        acc[lesson.module_id] = [];
      }
      acc[lesson.module_id].push(lesson);
      return acc;
    }, {});

    const nextProgressMap = (progressRes.data || []).reduce((acc, row) => {
      acc[row.lesson_id] = Boolean(row.completed);
      return acc;
    }, {});

    setModules(moduleRows);
    setLessonsByModule(groupedLessons);
    setQuizzes(quizzesRes.data || []);
    setProjects(projectsRes.data || []);
    setTests(testsRes.data || []);
    setProgressMap(nextProgressMap);
    setLoading(false);
  }, [decodedCourseKey, isAdmin, user]);

  useEffect(() => {
    fetchLearningContent();
  }, [fetchLearningContent]);

  const allLessons = useMemo(
    () => Object.values(lessonsByModule).flat(),
    [lessonsByModule]
  );

  const completedLessons = useMemo(
    () => allLessons.filter((lesson) => progressMap[lesson.id]).length,
    [allLessons, progressMap]
  );

  const completionPercent = useMemo(
    () => toPercent(completedLessons, allLessons.length),
    [allLessons.length, completedLessons]
  );

  const hasCurriculum =
    modules.length > 0 || quizzes.length > 0 || projects.length > 0 || tests.length > 0;

  const updateEnrollmentProgress = useCallback(
    async (nextProgress) => {
      if (!user || !decodedCourseKey || isAdmin) return;

      await supabase
        .from("enrollments")
        .update({ progress: nextProgress })
        .eq("user_id", user.id)
        .eq("course_title", decodedCourseKey);
    },
    [decodedCourseKey, isAdmin, user]
  );

  const toggleLessonCompletion = async (lessonId) => {
    if (!user) return;
    setSavingLessonId(lessonId);
    setStatusMessage("");

    const currentlyCompleted = Boolean(progressMap[lessonId]);

    if (currentlyCompleted) {
      const { error } = await supabase
        .from("short_course_user_lesson_progress")
        .delete()
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId);

      if (error) {
        setSavingLessonId(null);
        setStatusMessage(error.message);
        return;
      }
    } else {
      const { error } = await supabase
        .from("short_course_user_lesson_progress")
        .upsert(
          {
            user_id: user.id,
            lesson_id: lessonId,
            completed: true,
            completed_at: new Date().toISOString(),
          },
          { onConflict: "user_id,lesson_id" }
        );

      if (error) {
        setSavingLessonId(null);
        setStatusMessage(error.message);
        return;
      }
    }

    const nextProgressMap = {
      ...progressMap,
      [lessonId]: !currentlyCompleted,
    };

    if (currentlyCompleted) {
      delete nextProgressMap[lessonId];
    }

    const nextCompletedCount = allLessons.filter(
      (lesson) => nextProgressMap[lesson.id]
    ).length;

    const nextProgress = toPercent(nextCompletedCount, allLessons.length);

    setProgressMap(nextProgressMap);
    await updateEnrollmentProgress(nextProgress);
    setSavingLessonId(null);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-200">
        Loading learning content...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-white">
      <nav className="text-sm text-gray-400 mb-4">
        <Link to="/dashboard" className="hover:text-cyan-300">
          Dashboard
        </Link>
        <span className="px-2">/</span>
        <Link to="/my-courses" className="hover:text-cyan-300">
          My Courses
        </Link>
        <span className="px-2">/</span>
        <span className="text-gray-200">{parsedCourse.title || "Learning"}</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{parsedCourse.title || "Course Learning"}</h1>
          <p className="text-gray-300 mt-1">
            {parsedCourse.scope || "Short Course"} • MVP learning workspace
          </p>
        </div>
        <Link
          to="/my-courses"
          className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-700 text-gray-100 hover:bg-gray-600"
        >
          Back to My Courses
        </Link>
      </div>

      {accessMessage ? (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-gray-200">
          {accessMessage}
        </div>
      ) : !hasCurriculum ? (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-gray-200">
          <p className="text-lg font-semibold text-white">Coming Soon</p>
          <p className="text-gray-300 mt-2">
            Curriculum is in progress for this short course. We are working on it.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-gray-800 rounded-2xl p-5 mb-6">
            <p className="text-sm text-gray-400">Course completion</p>
            <p className="text-3xl font-semibold text-white">{completionPercent}%</p>
            <p className="text-sm text-gray-300 mt-1">
              {completedLessons} of {allLessons.length} lessons completed
            </p>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-cyan-400"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          {statusMessage && (
            <p className="text-sm text-red-400 mb-5">{statusMessage}</p>
          )}

          <div className="space-y-5">
            {modules.map((module) => {
              const moduleLessons = lessonsByModule[module.id] || [];

              return (
                <article key={module.id} className="bg-gray-800 rounded-2xl p-5">
                  <h2 className="text-xl font-semibold text-white">{module.title}</h2>
                  <p className="text-sm text-gray-300 mt-1">{module.description}</p>

                  <div className="mt-4 grid gap-3">
                    {moduleLessons.length === 0 ? (
                      <p className="text-sm text-gray-400">No lessons added yet.</p>
                    ) : (
                      moduleLessons.map((lesson) => {
                        const completed = Boolean(progressMap[lesson.id]);
                        return (
                          <div
                            key={lesson.id}
                            className="border border-gray-700 rounded-xl p-4 bg-gray-900"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                              <div>
                                <h3 className="text-base font-semibold text-white">
                                  {lesson.title}
                                </h3>
                                <p className="text-sm text-gray-300 mt-1">{lesson.summary}</p>
                              </div>
                              <button
                                type="button"
                                disabled={savingLessonId === lesson.id}
                                onClick={() => toggleLessonCompletion(lesson.id)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${
                                  completed
                                    ? "bg-green-600 text-white hover:bg-green-500"
                                    : "bg-cyan-500 text-white hover:bg-cyan-400"
                                } disabled:opacity-60 disabled:cursor-not-allowed`}
                              >
                                {savingLessonId === lesson.id
                                  ? "Saving..."
                                  : completed
                                  ? "Completed"
                                  : "Mark Complete"}
                              </button>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-3 text-sm">
                              {lesson.video_url && (
                                <a
                                  href={lesson.video_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-cyan-300 hover:text-cyan-200"
                                >
                                  Watch video
                                </a>
                              )}
                              {lesson.documentation_url && (
                                <a
                                  href={lesson.documentation_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-cyan-300 hover:text-cyan-200"
                                >
                                  Read documentation
                                </a>
                              )}
                              {lesson.external_review_url && (
                                <a
                                  href={lesson.external_review_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-cyan-300 hover:text-cyan-200"
                                >
                                  Review resource
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-7 grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-white">Quiz</h3>
              {quizzes.length === 0 ? (
                <p className="text-sm text-gray-400 mt-2">No quiz published yet.</p>
              ) : (
                quizzes.map((quiz) => (
                  <div key={quiz.id} className="mt-2 text-sm text-gray-200">
                    <p className="font-medium">{quiz.title}</p>
                    <p className="text-gray-400">{quiz.description}</p>
                    <p className="text-gray-400">
                      {quiz.question_count} questions • Pass score {quiz.pass_score}%
                    </p>
                    <div className="mt-1 flex flex-wrap gap-3">
                      {quiz.quiz_url && (
                        <a
                          href={quiz.quiz_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-300 hover:text-cyan-200"
                        >
                          Start quiz
                        </a>
                      )}
                      {quiz.review_url && (
                        <a
                          href={quiz.review_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-300 hover:text-cyan-200"
                        >
                          Review guide
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-gray-800 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-white">Project</h3>
              {projects.length === 0 ? (
                <p className="text-sm text-gray-400 mt-2">No project published yet.</p>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="mt-2 text-sm text-gray-200">
                    <p className="font-medium">{project.title}</p>
                    <p className="text-gray-400">{project.description}</p>
                    <p className="text-gray-400">{project.submission_instruction}</p>
                    <div className="mt-1 flex flex-wrap gap-3">
                      {project.project_brief_url && (
                        <a
                          href={project.project_brief_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-300 hover:text-cyan-200"
                        >
                          Project brief
                        </a>
                      )}
                      {project.review_url && (
                        <a
                          href={project.review_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-300 hover:text-cyan-200"
                        >
                          Review resource
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-gray-800 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-white">Final Test</h3>
              {tests.length === 0 ? (
                <p className="text-sm text-gray-400 mt-2">No final test published yet.</p>
              ) : (
                tests.map((test) => (
                  <div key={test.id} className="mt-2 text-sm text-gray-200">
                    <p className="font-medium">{test.title}</p>
                    <p className="text-gray-400">{test.description}</p>
                    <p className="text-gray-400">
                      {test.duration_minutes ? `${test.duration_minutes} min • ` : ""}
                      Pass score {test.pass_score}%
                    </p>
                    <div className="mt-1 flex flex-wrap gap-3">
                      {test.test_guide_url && (
                        <a
                          href={test.test_guide_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-300 hover:text-cyan-200"
                        >
                          Open test
                        </a>
                      )}
                      {test.review_url && (
                        <a
                          href={test.review_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-300 hover:text-cyan-200"
                        >
                          Review guide
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
