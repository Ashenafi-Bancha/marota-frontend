// src/components/Footer.jsx
import { FaFacebookF, FaTelegramPlane, FaTiktok, FaLinkedinIn, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo1.png";

function Footer() {
  return (
    <footer className="bg-[#081325] text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-2 lg:grid-cols-4 sm:text-center">

        {/* About */}
        <div className="sm:flex sm:flex-col sm:items-center">
          <h4 className="text-xl font-semibold text-white mb-4 relative ">
            Marota Studio
          </h4>
          <p className="text-sm leading-relaxed text-left">
           Where cinematic artistry and digital innovation converge to create extraordinary experiences, Marota is dedicated to empowering Ethiopia’s digital transformation. We focus on building creative and technical capacity across the nation — with a special commitment to Southern Ethiopia, particularly Wolaita by training the next generation in film, web development, graphics, and emerging technologies.
          </p>
        </div>

        {/* Quick Links */}
        <div className="sm:flex sm:flex-col sm:items-center">
          <h4 className="text-xl font-semibold text-white mb-4 relative ">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-left">
            <li><a href="#home" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="#about" className="hover:text-yellow-200 transition">About</a></li>
            <li><a href="#services" className="hover:text-yellow-200 transition">Services</a></li>
            <li><a href="#instructors" className="hover:text-yellow-200 transition">Instructors</a></li>
            <li><a href="#showcase" className="hover:text-yellow-200 transition">Portfolio</a></li>
            <li><a href="#gallery" className="hover:text-yellow-200 transition">Gallery</a></li>
            <li><a href="#testimonials" className="hover:text-yellow-200 transition" >Testimonials</a></li>
            <li><a href="#contact" className="hover:text-yellow-200 transition">Contact</a></li>
          </ul>
        </div>

        {/* Academy Programs */}
        <div className="sm:flex sm:flex-col sm:items-center">
          <h4 className="text-xl font-semibold text-white mb-4 relative ">
            Academy Programs
          </h4>
          <ul className="space-y-2 text-sm text-left">
            <li><a href="#services" className="hover:text-yellow-200 transition">Cinematography Mastery</a></li>
            <li><a href="#services" className="hover:text-yellow-200 transition">Film Direction Workshop</a></li>
            <li><a href="#services" className="hover:text-yellow-200 transition">Full-Stack Development</a></li>
            <li><a href="#services" className="hover:text-yellow-200 transition">Mobile App Development</a></li>
            <li><a href="#services" className="hover:text-yellow-200 transition">Basick Computer Skills</a></li>
            <li><a href="#services" className="hover:text-yellow-200 transition">Graphics Design</a></li>
            <li><a href="#services" className="hover:text-yellow-200 transition">IT Support and Networking</a></li>
            <li><a href="#services" className="hover:text-yellow-200 transition">Logo Design</a></li>

          </ul>
        </div>

        {/* Follow Us / Social Links */}
        <div className="sm:flex sm:flex-col sm:items-center">
          <h4 className="text-xl font-semibold text-white mb-4 relative ">
            Follow Us
          </h4>
          <div className="flex space-x-3 mt-2 sm:justify-center">
            <a href="https://www.facebook.com/profile.php?id=100087120218376" target="_blank" title="Follow us on Facebook" className="transition transform hover:-translate-y-1 rounded-full p-2 bg-blue-600">
              <FaFacebookF className="text-white" size={22} />
            </a>
            <a href="#" title="Join us on Telegram" className="transition transform hover:-translate-y-1 rounded-full p-2 bg-sky-500">
              <FaTelegramPlane className="text-white" size={22} />
            </a>
            <a href="https://www.tiktok.com/@marota.acadamy?_t=ZN-8xuxFw8tk2Q&_r=1" target="_blank" title="Follow us on TikTok" className="transition transform hover:-translate-y-1 rounded-full p-2 bg-black">
              <FaTiktok className="text-white" size={22} />
            </a>
            <a href="#" title="Follow us on LinkedIn" className="transition transform hover:-translate-y-1 rounded-full p-2 bg-blue-700">
              <FaLinkedinIn className="text-white" size={22} />
            </a>
            <a href="#" title="Follow us on Twitter" className="transition transform hover:-translate-y-1 rounded-full p-2 bg-sky-400">
              <FaTwitter className="text-white" size={22} />
            </a>
            <a href="#" title="Follow us on Instagram" className="transition transform hover:-translate-y-1 rounded-full p-2 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400">
              <FaInstagram className="text-white" size={22} />
            </a>
            <a href="#" title="Visit our YouTube channel" className="transition transform hover:-translate-y-1 rounded-full p-2 bg-red-600">
              <FaYoutube className="text-white" size={22} />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 mt-10 pt-4 text-gray-300">
        <div className="flex items-center justify-center gap-2 flex-nowrap">
          <img
            src={logo}
            alt="Marota Logo"
            className="w-5 h-5 md:w-6 md:h-6 rounded-full object-contain"
          />
          <span className="text-xs sm:text-sm md:text-base text-center whitespace-nowrap">
            &copy; {new Date().getFullYear()} Marota Cinematography & Software Academy. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
