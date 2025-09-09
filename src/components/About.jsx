
import { useInView } from "react-intersection-observer";
import Image1 from "../assets/about.jpg";
import Image2 from "../assets/camera-men.jpg";
import Image3 from "../assets/pc-users-group.jpg";
export default function About() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 bg-gradient-to-r from-[#112240]/50 via-[#112240]/10 to-[#0a192f]/90 text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

        {/* Text */}
        <div className={`md:w-1/2 space-y-6 transition-all duration-1000 ease-out transform ${inView1 ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`} ref={ref1}>
          <h2 className="text-4xl font-bold text-[var(--accent-blue)] text-center md:text-left">About Marota</h2>
          <p className="text-gray-300 leading-relaxed">
            Marota Cinematography & Software Institute is where <span className="text-[var(--accent-orange)] font-semibold">cinematic artistry and digital innovation converge</span> to create extraordinary experiences. 
            We are committed to building a digitally empowered Ethiopia, with a special focus on <span className="font-semibold">Southern Ethiopia, particularly Wolaita</span>, by equipping students with world-class skills in film, web development, graphics, and emerging technologies.
          </p>

          {/* Mission */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--accent-blue)]">Our Mission</h3>
            <p className="text-gray-300 mt-2">
              To empower individuals with creative and digital skills in filmmaking, software development, and design, enabling them to become globally competitive, lead in Ethiopia’s digital transformation, and drive economic growth in Southern Ethiopia.
            </p>
          </div>

          {/* Vision */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--accent-blue)]">Our Vision</h3>
            <p className="text-gray-300 mt-2">
              To become Ethiopia’s leading center of excellence in film, software, and digital innovation — shaping a future where Wolaita and Ethiopia as a whole stand as global contributors in the creative and tech industries.
            </p>
          </div>

          {/* Core Values */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--accent-blue)]">Our Core Values</h3>
            <ul className="list-disc list-inside  text-gray-300 mt-2 space-y-1">
              <li ><span className="font-bold italic">Creativity & Innovation:</span> merging artistry with technology to inspire extraordinary outcomes.</li>
              <li className=""><span className="font-bold italic">Community Impact:</span> focusing on Wolaita and Southern Ethiopia, while serving the whole nation.</li>
              <li><span className ="font-bold italic">Collaboration:</span>  working with local and global partners to maximize opportunities.</li>
              <li><span className="font-bold italic">Excellence in Training:</span> providing hands-on, industry-relevant education.</li>
              <li><span className="font-bold italic">Empowerment:</span> fostering entrepreneurship, job creation, and self-reliance.</li>
            </ul>
          </div>

          {/* Goals */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--accent-blue)]">Our Goals</h3>
            <ul className="list-decimal list-inside text-gray-300 mt-2 space-y-1">
              <li>Train and graduate highly skilled filmmakers, developers, and digital creators.</li>
              <li>Contribute to Ethiopia’s Digital Ethiopia 2025 agenda through capacity building.</li>
              <li>Establish Wolaita as a hub for digital creativity and innovation.</li>
              <li>Create opportunities for youth employment and entrepreneurship.</li>
              <li>Connect local talent with global markets and collaborations.</li>
            </ul>
          </div>
        </div>

        {/* Images */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <img
            src={Image1}
            alt="About Marota"
            ref={ref2}
            className={`rounded-lg shadow-lg object-cover w-full h-80 md:h-64 transition-all duration-1000 ease-out transform ${inView2 ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
          />
          <img
            src={Image2}
            alt="Marota in Action"
            className={`rounded-lg shadow-lg object-cover w-full h-80 md:h-64 transition-all duration-1000 ease-out transform delay-200 ${inView2 ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
          />
          <img
            src={Image3}
            alt="Students at Marota"
            className={`rounded-lg shadow-lg object-cover w-full h-80 md:h-64 transition-all duration-1000 ease-out transform delay-400 ${inView2 ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
          />
        </div>

      </div>
    </section>
  );
}
