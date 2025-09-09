
import { useState } from "react";
import Register from "./Register";
import Modal from "./Modal";
import Login from "./Login";
import logo from "../assets/logo1.png";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";

 const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <header className="bg-gray-900 text-white fixed w-full top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <div className="flex items-center gap-2 hover:cursor-pointer logo">
          <img src={logo} alt="Marota Logo" className="h-12 rounded-full"/>
          <p className="text-yellow-400 font-bold text-2xl font-serif uppercase">Marota</p>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {["Home", "About", "Services", "Portfolio", "Gallery", "Instructors", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-cyan-300 hover:underline hover:underline-offset-6 transition-colors"
              >
                {item}
              </a>
            )
          )}
        </nav>

        {/* Search + Auth */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="hidden sm:flex items-center bg-gray-700 rounded-full px-2 py-2 hover:bg-gray-600 transition hover:border border-gray-500">
    
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-transparent outline-none px-2 py-1  text-gray-100"
            />
            <FaSearch className="text-gray-200 mr-2" />
          </div>

          {/* Auth Buttons */}
          <button
            onClick={() => setShowLogin(true)}
            className="bg-cyan-400 px-3 py-2 rounded-lg hover:bg-cyan-500"
          >
            Sign In
          </button>
          <button
            onClick={() => setShowRegister(true)}
            className="bg-yellow-400 px-3 py-2 rounded-lg hover:bg-yellow-500"
          >
            Sign Up
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes className="text-red-500" /> : <FaBars className="text-yellow-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 flex flex-col items-center gap-4 py-4">
          {["Home", "About", "Courses", "Portfolio", "Gallery", "Instructors", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-400 transition-colors hover:underline hover:underline-offset-6"
              >
                {item}
              </a>
            )
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <Login
            onLoginSuccess={(user) => console.log("Logged in", user)}
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