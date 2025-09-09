// src/components/Contact.jsx
import Map from "./Map";
import BuildingSlideshow from "./BuildingSlideshow";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import MarotaBuilding1 from "../assets/marota-location.jpg";
import MarotaBuilding2 from "../assets/marota-building3.jpg";

const images = [MarotaBuilding1, MarotaBuilding2];

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-[#0a192f] text-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12">

        {/* Contact Info */}
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h3>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <FaPhone className="text-blue-400 text-2xl" />
              <span className="text-lg">+251 9 28 97 63 93</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-400 text-2xl" />
              <span className="text-lg">mathsermi50@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-blue-400 text-2xl" />
              <span className="text-lg">Wolaita Sodo, Ethiopia</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaBuilding className="text-blue-400 text-2xl" />
              <span className="text-lg">Tona Complex, 2nd floor</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-2xl font-semibold text-white">Send Us a Message</h4>
          <form className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Name"
              className="p-3 rounded-md bg-[#112240] border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-md bg-[#112240] border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
            />
            <textarea
              placeholder="Message"
              rows="2"
              className="p-3 rounded-md bg-[#112240] border border-gray-700 text-white focus:outline-none focus:border-cyan-400"
            ></textarea>
            <button className="bg-[var(--accent-blue)] text-black px-6 py-3 rounded-md font-semibold hover:bg-teal-300  hover:text-white transition">
              Send Message
            </button>
          </form>
        </div>

        {/* Marota Building Slideshow */}
        <div className="md:col-span-2 mt-8 relative">
          <BuildingSlideshow images={images} interval={3000} />
          {/* Overlay Text */}
          <div className="absolute top-4 left-4 bg-black/50 px-4 py-2 rounded text-yellow-300 text-lg font-bold">
            Visit Our Office
          </div>
        </div>

        {/* Map Section */}
        <div className="md:col-span-2 mt-8 flex flex-col space-y-2">
          <p className="text-center text-yellow-300 font-bold text-lg">
            Use Google Maps to reach our office 
          </p>
          <Map />
        </div>
      </div>
    </section>
  );
};

export default Contact;
