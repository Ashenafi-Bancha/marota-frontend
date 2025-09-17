// src/components/Instructors.jsx
import Mathewos from "../assets/instructors/Ermias.jpg";
import Lidya from "../assets/instructors/Lidya.jpg";
import Eyonadab from "../assets/instructors/eyonadab.jpg";
import Kidist from "../assets/instructors/Kdist.jpg";
import Salah from "../assets/instructors/salah.jpg";
import Wondimagegn from "../assets/instructors/wonde.jpg";

import { FaFacebookF, FaLinkedinIn, FaTelegram } from "react-icons/fa";

const instructors = [
  { name: "Mathewos Ermias", role: "Photograpy and Videography, Cordinator", img: Mathewos },

  { name: "Lidya Abera", role: "Customer Service and Basic Computer Skills", img: Lidya },
  { name: "Eyonadab Malove", role: "Script writer, Directing, acting", img: Eyonadab },
  { name: "Kidist Yonas", role: "Graphic Designer", img: Kidist },
  { name: "Salah Anjoniyo",  role: "Film Instructor", img: Salah },
  { name: "Wondimagegn Desta", role: "Website Design and Database Administrator", img: Wondimagegn },
];

export default function Instructors() {
  return (
    <section id="instructors" className="py-24 bg-[#112240] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl font-bold text-[var(--accent-blue)]">Meet Our Instructors</h2>
        <p className="text-gray-400 mt-2">Learn from professionals with years of experience.</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
        {instructors.map((inst, idx) => (
          <div
            key={idx}
            className="bg-[#00192f] rounded-lg p-6 text-center shadow-lg hover:scale-105 transition hover:shadow-2xl hover:border hover:border-[var(--accent-blue)] hover:border-2"
          >
            <img
              src={inst.img}
              alt={inst.name}
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{inst.name}</h3>
            <p className="text-gray-400">{inst.role}</p>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-4 mt-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:bg-[#0d65d9] transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0088cc] text-white hover:bg-[#0077b3] transition"
              >
                <FaTelegram />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A66C2] text-white hover:bg-[#004182] transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
