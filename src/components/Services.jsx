// src/components/Services.jsx
import {
  FaCode,
  FaVideo,
  FaLaptop,
  FaPaintBrush,
  FaPenNib,
  FaMobileAlt,
  FaCheck,
} from "react-icons/fa";

const services = [
  {
    title: "Film Production",
    description:
      "Professional filming, editing, and production services for movies, short films, and promos.",
    tools: [
      "Cinematography",
      "Video Editing",
      "Lighting Techniques",
      "Sound Design",
      "Directing",
      "Screenwriting",
      "Color Grading",
      "Drone Filming",
      "Post Production",
      "Visual Effects",
    ],
    icon: <FaVideo className="text-4xl text-[#ff6b6b]" />,
  },
  {
    title: "Web Development",
    description:
      "Build responsive, modern, and scalable websites covering frontend, backend, API integration, and databases.",
    tools: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Bootstrap",
      "APIs",
      "Node.js",
      "Express",
      "Databases",
    ],
    icon: <FaCode className="text-4xl text-[#64ffda]" />,
  },
  {
    title: "Mobile App Development",
    description:
      "Develop functional and user-friendly mobile applications for Android and iOS platforms.",
    tools: [
      "React Native",
      "Flutter",
      "Java",
      "Kotlin",
      "Swift",
      "Firebase",
      "API Integration",
      "UI/UX Design",
      "Testing & Debugging",
      "Deployment",
    ],
    icon: <FaMobileAlt className="text-4xl text-[#00b4d8]" />,
  },
  {
    title: "Basic Computer Skills",
    description:
      "Teach essential computer skills like Microsoft Office, typing, and basic software usage.",
    tools: [
      "Microsoft Word",
      "Excel",
      "PowerPoint",
      "Email",
      "Internet Browsing",
      "Typing Skills",
      "File Management",
      "Basic Troubleshooting",
      "Windows OS",
      "Cybersecurity Basics",
    ],
    icon: <FaLaptop className="text-4xl text-[#4a90e2]" />,
  },
  {
    title: "Graphics Design",
    description:
      "Create visually stunning designs for social media, advertisements, and digital content.",
    tools: [
      "Adobe Photoshop",
      "Illustrator",
      "Canva",
      "Figma",
      "CorelDRAW",
      "InDesign",
      "Typography",
      "Color Theory",
      "Brand Identity",
      "UI Design",
    ],
    icon: <FaPaintBrush className="text-4xl text-[#ff9f1c]" />,
  },
  {
    title: "Logo Design",
    description:
      "Design creative and unique logos that represent your brand identity perfectly.",
    tools: [
      "Illustrator",
      "CorelDRAW",
      "Canva",
      "Figma",
      "Photoshop",
      "Sketching Concepts",
      "Vector Design",
      "Color Psychology",
      "Typography",
      "Brand Guidelines",
    ],
    icon: <FaPenNib className="text-4xl text-[#f72585]" />,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-[#0a192f] text-white">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Our Courses and Services
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore the wide range of courses we offer to help you grow, learn,
          and achieve your goals.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#112240] rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition hover:shadow-2xl hover:bg-[#111237] border border-cyan-300 hover:border hover:border-[var(--accent-blue)] hover:border-2"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-400 mb-4">{service.description}</p>

            {/* Tools in grid layout */}
            <div className="grid grid-cols-2 gap-2 text-left w-full">
              {service.tools.map((tool, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FaCheck className="text-cyan-400 shrink-0" />
                  <span className="text-gray-300 text-sm">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
