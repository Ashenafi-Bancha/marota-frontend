import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaBook, FaCheckCircle, FaClock, FaHome, FaUserCircle } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import {
  isMissingApprovalStatusColumnError,
  withDefaultApprovedStatus,
} from "../utils/enrollmentApproval";

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

  const stats = useMemo(() => {
    const approved = enrollments.filter(
      (item) => (item.approval_status || "approved") === "approved"
    );
    const pending = enrollments.filter(
      (item) => (item.approval_status || "approved") === "pending"
    );
    const rejected = enrollments.filter(
      (item) => (item.approval_status || "approved") === "rejected"
    );

    const completed = approved.filter((item) => (item.progress || 0) >= 100).length;

    return {
      totalApplications: enrollments.length,
      approved: approved.length,
      pending: pending.length,
      rejected: rejected.length,
      completed,
    };
  }, [enrollments]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      setLoading(true);
      setStatusMessage(null);

      const enrollmentsWithStatusRes = await supabase
        .from("enrollments")
        .select("course_title, progress, approval_status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      let enrollmentsRes = enrollmentsWithStatusRes;
      if (isMissingApprovalStatusColumnError(enrollmentsWithStatusRes.error)) {
        const fallbackEnrollmentsRes = await supabase
          .from("enrollments")
          .select("course_title, progress")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        enrollmentsRes = {
          ...fallbackEnrollmentsRes,
          data: withDefaultApprovedStatus(fallbackEnrollmentsRes.data),
        };
      }

      if (enrollmentsRes.error) {
        setStatusMessage({ type: "error", text: enrollmentsRes.error.message });
      } else {
        setEnrollments(enrollmentsRes.data || []);
      }

      setLoading(false);
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-200">
        Loading dashboard...
      </div>
    );
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-white">
      <div className="flex flex-col gap-3 mb-8">
        <nav className="text-sm text-gray-400">
          <Link to="/" className="hover:text-[var(--accent-blue)]">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-gray-200">Dashboard</span>
        </nav>

        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <p className="text-gray-300">
          Track your enrollment approvals and learning progress in one place.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700 text-gray-100 hover:bg-gray-600"
          >
            <FaHome />
            Back to Home
          </Link>
          <Link
            to={isAdmin ? "/admin" : "/my-courses"}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700 text-gray-100 hover:bg-gray-600"
          >
            <FaBook />
            {isAdmin ? "Go to Admin" : "My Courses"}
          </Link>
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700 text-gray-100 hover:bg-gray-600"
          >
            <FaUserCircle />
            Profile
          </Link>
        </div>

        {statusMessage && (
          <p
            className={`text-sm ${
              statusMessage.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {statusMessage.text}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
          <p className="text-sm text-gray-400">Applications</p>
          <p className="text-3xl font-semibold text-white">{stats.totalApplications}</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
          <p className="text-sm text-gray-400">Approved</p>
          <p className="text-3xl font-semibold text-green-300">{stats.approved}</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
          <p className="text-sm text-gray-400">Pending</p>
          <p className="text-3xl font-semibold text-amber-300">{stats.pending}</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
          <p className="text-sm text-gray-400">Rejected</p>
          <p className="text-3xl font-semibold text-red-300">{stats.rejected}</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
          <p className="text-sm text-gray-400">Completed</p>
          <p className="text-3xl font-semibold text-[var(--accent-blue)]">{stats.completed}</p>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-3 text-white">What to do next</h2>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <FaClock className="text-amber-300 mt-0.5" />
            Visit the Courses & Services section on Home to submit new enrollment applications.
          </li>
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-green-300 mt-0.5" />
            Track approved applications and progress in My Courses.
          </li>
          <li className="flex items-start gap-2">
            <FaUserCircle className="text-[var(--accent-blue)] mt-0.5" />
            Keep your profile details up to date for certificates and communication.
          </li>
        </ul>
      </div>
    </section>
  );
}
