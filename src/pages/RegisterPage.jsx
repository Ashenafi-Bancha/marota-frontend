import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../components/Register";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-[#28476b] bg-[var(--primary-light)]/90 p-8 shadow-xl backdrop-blur-sm">
        <Register
          onRegisterSuccess={() => {}}
          onSwitchToLogin={() => navigate("/login")}
        />
      </div>
    </div>
  );
}
