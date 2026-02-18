
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Register from "./Register";
import Modal from "./Modal";
import Login from "./Login";
import logo from "../assets/logo1.png";
import { FaBars, FaTimes, FaSearch, FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useSearch } from "../context/SearchContext";
import { diplomaLevels, shortCourses } from "../data/courses";
import { useAuth } from "../context/AuthContext";

 const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileProfileMenuOpen, setMobileProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const { searchQuery, setSearchQuery } = useSearch();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [activeSection, setActiveSection] = useState("home");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const navSections = useMemo(
    () => [
      "home",
      "about",
      "services",
      "portfolio",
      "gallery",
      "instructors",
      "contact",
    ],
    []
  );

  const courseResults = useMemo(() => {
    if (!normalizedQuery) return [];
    const diplomaCourses = diplomaLevels.flatMap((level) =>
    level.courses.map((course) => ({
      ...course,
      group: level.level,
      type: "Diploma",
    }))
    );
    const shortCourseResults = shortCourses.map((course) => ({
    ...course,
    group: "Short Course",
    type: "Short",
    }));

    const allCourses = [...diplomaCourses, ...shortCourseResults];
    return allCourses
    .filter((course) => {
      const haystack = [
      course.title,
      course.description,
      ...(course.tools || []),
      ]
      .join(" ")
      .toLowerCase();
      return haystack.includes(normalizedQuery);
    })
    .slice(0, 6);
  }, [normalizedQuery]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    const target = document.getElementById("services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCourseSelect = (title) => {
    setSearchQuery(title);
    const target = document.getElementById("services");
    if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goToProtectedPage = (path) => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
    setMobileProfileMenuOpen(false);
    navigate(path);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      window.alert(error.message || "Unable to sign out right now.");
      return;
    }
    window.location.href = "/";
  };

  const handleSignOutFromMenu = async () => {
    setProfileMenuOpen(false);
    setMobileProfileMenuOpen(false);
    setMenuOpen(false);
    await handleSignOut();
  };

  const profileLabel =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const handleSectionClick = (event, sectionId) => {
    if (!isHome) return;
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    if (!isHome) return;

    let frameId = null;
    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 140;
        let currentSection = "home";

        navSections.forEach((section) => {
          const element = document.getElementById(section);
          if (!element) return;
          if (element.offsetTop <= scrollPosition) {
            currentSection = section;
          }
        });

        setActiveSection(currentSection);
        frameId = null;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome, navSections]);

  useEffect(() => {
    if (!isHome) return;
    const hash = location.hash?.replace("#", "").trim();
    if (!hash) return;

    const timer = window.setTimeout(() => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(hash);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isHome, location.hash]);

  useEffect(() => {
    setProfileMenuOpen(false);
    setMobileProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!profileMenuRef.current) return;
      if (!profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#081325]/85 text-white shadow-[0_10px_30px_rgba(2,8,23,0.35)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-3 py-3 lg:px-5">

        {/* Logo */}
        <div className="logo flex min-w-0 shrink-0 cursor-pointer items-center gap-2">
          <img src={logo} alt="Marota Logo" className="h-10 rounded-full ring-2 ring-cyan-300/30 sm:h-11 lg:h-12"/>
          <p className="hidden text-lg font-bold uppercase leading-none text-yellow-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.28)] sm:block lg:text-2xl font-serif">Marota</p>
        </div>
        
        {/* Desktop Nav */}
        <nav className="mx-6 hidden items-center gap-3 rounded-full border border-white/10 bg-[#112240]/70 px-4 py-2 xl:flex 2xl:gap-4">
          {["Home", "About", "Services", "Portfolio", "Gallery", "Instructors", "Contact"].map(
            (item) => {
              const sectionId = item.toLowerCase();
              const isActive = isHome && activeSection === sectionId;
              return isHome ? (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(event) => handleSectionClick(event, sectionId)}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors hover:text-[var(--accent-blue)] ${
                    isActive ? "bg-cyan-400/15 text-[var(--accent-blue)]" : ""
                  }`}
                >
                  {item}
                </a>
              ) : (
                <Link
                  key={item}
                  to={
                    item === "Portfolio" || item === "Contact"
                      ? `/#${sectionId}`
                      : "/"
                  }
                  className="rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-cyan-400/10 hover:text-[var(--accent-blue)]"
                >
                  {item === "Portfolio" ? "Portifolio" : item}
                </Link>
              );
            }
          )}
        </nav>

        {/* Search + Auth */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          {/* Search Bar */}
          <div className="hidden 2xl:block relative">
            <form
              className="flex items-center rounded-full border border-slate-600 bg-[#0f2240] px-2 py-2 transition hover:border-cyan-300/50"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="no-focus-ring w-44 bg-transparent px-2 py-1 text-gray-100 outline-none placeholder:text-gray-400"
                aria-label="Search courses"
              />
              <button
                type="submit"
                className="text-gray-200 mr-2"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </form>

            {normalizedQuery && (
              <div className="absolute left-0 right-0 mt-2 rounded-xl bg-gray-800 border border-gray-700 shadow-xl overflow-hidden z-50">
                {courseResults.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-300">
                    No matching courses.
                  </div>
                ) : (
                  <ul className="max-h-72 overflow-auto">
                    {courseResults.map((course) => (
                      <li key={`${course.type}-${course.title}-${course.group}`}>
                        <button
                          type="button"
                          onMouseDown={() => handleCourseSelect(course.title)}
                          className="btn-dropdown w-full text-left px-4 py-3 hover:bg-gray-700 transition flex flex-col"
                        >
                          <span className="text-sm font-semibold text-white">
                            {course.title}
                          </span>
                          <span className="text-xs text-gray-400">
                            {course.group} • {course.type}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          {user ? (
            <div className="hidden xl:flex items-center gap-2">
              {!isAdmin && (
                <button
                  type="button"
                  onClick={() => goToProtectedPage("/my-courses")}
                  className="px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 whitespace-nowrap text-sm"
                >
                  My Courses
                </button>
              )}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => goToProtectedPage("/admin")}
                  className="px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 whitespace-nowrap text-sm"
                >
                  Admin
                </button>
              )}
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-slate-600 bg-[#13294a] px-3 py-2 text-sm text-gray-100 hover:border-cyan-300/45 hover:bg-[#17345d]"
                  title={user?.email || profileLabel}
                  aria-label="Open profile menu"
                >
                  <FaUserCircle />
                  <span className="hidden 2xl:inline">{profileLabel}</span>
                  <FaChevronDown className={`text-xs transition-transform ${profileMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-700 bg-[#0f2240] p-2 shadow-2xl z-[60]">
                    <div className="px-3 py-2 border-b border-slate-700/70 mb-1">
                      <p className="text-sm font-semibold text-white truncate">{profileLabel}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToProtectedPage("/profile")}
                      className="btn-dropdown w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-100 hover:bg-[#17345d]"
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      onClick={handleSignOutFromMenu}
                      className="btn-danger w-full text-left px-3 py-2.5 rounded-lg text-sm"
                    >
                      <span className="inline-flex items-center gap-2">
                        <FaSignOutAlt className="text-xs" />
                        Sign Out
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden xl:flex items-center gap-2">
              <button
                onClick={() => setShowLogin(true)}
                className="bg-cyan-400 px-3 py-2 rounded-lg hover:bg-cyan-500 text-sm whitespace-nowrap"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="btn-signup bg-yellow-400 px-3 py-2 rounded-lg hover:bg-yellow-500 text-sm whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-2xl h-10 w-10 inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes className="text-red-500" /> : <FaBars className="text-yellow-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="xl:hidden flex flex-col items-stretch gap-4 border-t border-white/10 bg-[#0d1f3c]/95 px-4 py-4 backdrop-blur-md">
          {["Home", "About", "Services", "Portfolio", "Gallery", "Instructors", "Contact"].map(
            (item) => {
              const sectionId = item.toLowerCase();
              const isActive = isHome && activeSection === sectionId;
              return isHome ? (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(event) => {
                    handleSectionClick(event, sectionId);
                    setMenuOpen(false);
                  }}
                  className={`rounded-lg px-3 py-2 text-center transition-colors hover:bg-cyan-400/10 hover:text-[var(--accent-blue)] ${
                    isActive ? "bg-cyan-400/15 text-[var(--accent-blue)]" : ""
                  }`}
                >
                  {item}
                </a>
              ) : (
                <Link
                  key={item}
                  to={
                    item === "Portfolio" || item === "Contact"
                      ? `/#${sectionId}`
                      : "/"
                  }
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-center transition-colors hover:bg-cyan-400/10 hover:text-[var(--accent-blue)]"
                >
                  {item === "Portfolio" ? "Portifolio" : item}
                </Link>
              );
            }
          )}
        <form
          className="flex w-full items-center rounded-full border border-slate-600 bg-[#0f2240] px-3 py-2"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="no-focus-ring bg-transparent outline-none px-2 py-1 text-gray-100 w-full"
            aria-label="Search courses"
          />
          <button
            type="submit"
            className="text-gray-200 mr-2"
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </form>
        {normalizedQuery && (
          <div className="w-full rounded-xl bg-gray-800 border border-gray-700 shadow-xl overflow-hidden">
            {courseResults.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-300">
                No matching courses.
              </div>
            ) : (
              <ul className="max-h-64 overflow-auto">
                {courseResults.map((course) => (
                  <li key={`mobile-${course.type}-${course.title}-${course.group}`}>
                    <button
                      type="button"
                      onMouseDown={() => handleCourseSelect(course.title)}
                      className="btn-dropdown w-full text-left px-4 py-3 hover:bg-gray-700 transition flex flex-col"
                    >
                      <span className="text-sm font-semibold text-white">
                        {course.title}
                      </span>
                      <span className="text-xs text-gray-400">
                        {course.group} • {course.type}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {user ? (
          <div className="flex flex-col items-center gap-3 w-full">
            {!isAdmin && (
              <button
                type="button"
                onClick={() => goToProtectedPage("/my-courses")}
                className="px-3 py-2 rounded-lg w-full bg-cyan-600 text-white inline-flex items-center justify-center hover:bg-cyan-500"
              >
                My Courses
              </button>
            )}
            {isAdmin && (
              <button
                type="button"
                onClick={() => goToProtectedPage("/admin")}
                className="px-3 py-2 rounded-lg w-full bg-cyan-600 text-white inline-flex items-center justify-center hover:bg-cyan-500"
              >
                Admin
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileProfileMenuOpen((prev) => !prev)}
              className="px-3 py-2 rounded-lg w-full bg-gray-700 text-gray-100 inline-flex items-center justify-center gap-2 hover:bg-gray-600"
              title={user?.email || profileLabel}
            >
              <FaUserCircle />
              <span>{profileLabel}</span>
              <FaChevronDown className={`text-xs transition-transform ${mobileProfileMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {mobileProfileMenuOpen && (
              <div className="w-full rounded-xl border border-slate-700 bg-[#0f2240] p-2">
                <div className="px-3 py-2 border-b border-slate-700/70 mb-1">
                  <p className="text-sm font-semibold text-white truncate">{profileLabel}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
                </div>
                <button
                  type="button"
                  onClick={() => goToProtectedPage("/profile")}
                  className="btn-dropdown w-full rounded-lg px-3 py-2.5 text-left text-sm text-gray-100 hover:bg-[#17345d]"
                >
                  Profile
                </button>
                <button
                  type="button"
                  onClick={handleSignOutFromMenu}
                  className="btn-danger w-full rounded-lg px-3 py-2.5 text-left text-sm"
                >
                  <span className="inline-flex items-center gap-2">
                    <FaSignOutAlt className="text-xs" />
                    Sign Out
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full">
            <button
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
              className="bg-cyan-400 px-3 py-2 rounded-lg hover:bg-cyan-500 w-full"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setShowRegister(true);
                setMenuOpen(false);
              }}
              className="btn-signup bg-yellow-400 px-3 py-2 rounded-lg hover:bg-yellow-500 w-full"
            >
              Sign Up
            </button>
          </div>
        )}
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <Login
            onLoginSuccess={() => {
              setShowLogin(false);
              navigate("/dashboard");
            }}
            onSwitchToRegister={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          />
        </Modal>
      )}

      {/* Register Modal */}
      {showRegister && (
        <Modal onClose={() => setShowRegister(false)}>
          <Register
            onRegisterSuccess={(user) => console.log("Registered", user)}
            onSwitchToLogin={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        </Modal>
      )}
    </header>
  );
}
export default Header;