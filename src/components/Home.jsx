import { useEffect, useState } from "react";
import { Camera, Code, Users, Award } from "lucide-react";

import Hero1 from "../assets/pc-users-group.jpg";
import Hero2 from "../assets/camera.jpg";
import Hero3 from "../assets/programmer.jpg";
import Hero4 from "../assets/camera-male.jpg";
import Hero5 from "../assets/camera-female.jpg";
import Hero9 from "../assets/graphics-designer.jpg";
import Hero10 from "../assets/camera-men.jpg";


const images = [Hero1, Hero9,Hero10, Hero2, Hero3, Hero4, Hero5,];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  // Change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center ml-5 overflow-hidden">

      {/* Background images slideshow */}
      <div className="absolute inset-0 z-0 ">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Hero ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(17,34,64,0.8)_0%,_rgba(10,25,47,0.95)_70%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl px-5 md:text-left w-full text-center mt-[-10px] mx-auto">
        <h1 className="font-bold leading-tight my-2 text-4xl md:text-5xl lg:text-6xl p-2 mx-auto  text-center">
          Welcome to Marota Cinematography
          <span className="text-[var(--accent-blue)]">
            {" "}
            and Software Institute
          </span>
        </h1>

        <p className="md:text-2xl mb-2 max-w-3xl text-gray-200 leading-relaxed mx-auto px-4 py-2 ">
          Join our comprehensive programs in cinematography and software
          development. Learn from experts and launch your creative career.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-2 py-2">
          <a
            href="#services"
            className="px-6 py-3 border border-[var(--accent-blue)] text-[var(--accent-blue)] md:rounded-lg rounded-3xl hover:bg-[rgba(100,255,218,0.1)] hover:translate-y-[-3px] hover:shadow-lg transition w-full sm:w-auto  text-center "
          >
            Our Services
          </a>

          <a
            href="#portfolio"
            className="px-6 py-3 bg-[var(--accent-blue)] text-[var(--primary-dark)] md:rounded-lg rounded-3xl hover:bg-[rgba(100,255,218,0.9)] hover:shadow-lg transition w-full sm:w-auto text-center hover:translate-y-[-3px] transition"
          >
            View Portfolio
          </a>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-50 left-10 opacity-20">
        <Code className="h-12 w-12 animate-pulse text-cyan-500" />
      </div>
      <div className="absolute top-20 left-10 opacity-20">
        <Camera className="h-12 w-12 animate-pulse" />
      </div>
      <div className="absolute top-50 right-10 opacity-20">
        <Camera className="h-12 w-12 animate-pulse text-cyan-500 " />
      </div>
      <div className="absolute top-20 right-10 opacity-20">
        <Code className="h-12 w-12 animate-pulse" />
      </div>


      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10  my-2 p-4 ">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Users className="h-8 w-8 text-[var(--accent-blue)]" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
            <p className="text-gray-300">Graduated Students</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Camera className="h-8 w-8 text-[var(--accent-blue)]" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">12</h3>
            <p className="text-gray-300">Specialized Courses</p>
          </div>
          <div className="text-center pt-2 ">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Award className="h-8 w-8 text-[var(--accent-blue)]" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2 ">95%</h3>
            <p className="text-gray-300">Job Placement Rate</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Code className="h-8 w-8 text-[var(--accent-blue)]" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">8</h3>
            <p className="text-gray-300">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}
