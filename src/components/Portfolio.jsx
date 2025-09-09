// src/components/Portfolio.jsx
import Portfolio1 from "../assets/portfolio/school-life-portfolio.jpg";
import Portfolio2 from "../assets/portfolio/hotel-web.jpg";
import Portfolio3 from "../assets/portfolio/portfolio-logo.jpg";

export default function Portfolio() {
  const projects = [
    {
      title: "School Life - መንታ ትውልድ",
      img: Portfolio1,
      description: "Film project showcasing school life.",
    },
    {
      title: "Hotel Website",
      img: Portfolio2,
      description: "Modern web application built with React.",
    },
    {
      title: "Urban Health Organization Logo ",
      img: Portfolio3,
      description: "Logo designed for Urban Health Organization.",
    },
  ];

  return (
    <section id="portfolio" className="py-24 bg-[#0a192f] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl font-bold text-[var(--accent-blue)]">
          Our Portfolio
        </h2>
        <p className="text-gray-400 mt-2">Some of our highlighted projects</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto px-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-[#112240] rounded-lg shadow-lg overflow-hidden hover:scale-105 transition"
          >
            <div className="w-full aspect-video">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-400 text-sm mt-2">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
