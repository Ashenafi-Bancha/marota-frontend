// src/components/Services.jsx
import {
  FaCode,
  FaVideo,
  FaLaptop,
  FaPaintBrush,
  FaPenNib,
  FaMobileAlt,
  FaDatabase,
  FaCheck,
  FaNetworkWired,
} from "react-icons/fa";

// Diploma Level Courses divided into 4 levels with multiple courses
const diplomaLevels = [
  {
    level: "Level 1",
    courses: [
      {
        title: "Hardware and Network Servicing",
        description: "Basic hardware troubleshooting and network setup.",
        tools: ["Connect Hardware Peripherals", "Operate Personal Computer", "Protect Application or System Software", "Install Software Application", "Develop Computer Keyboard Skill", "Create and Use SpreadSheet","Maintain Equipment and Software Invenitory and Documentation", "Identify and Use Network Handtools", "Access and Use Internet", "Apply 5s Procedures"],
        icon: <FaNetworkWired className="text-4xl text-[#ff6b6b]" />,
      },

      {
        title: "Film Making",
        description: "Learn scripting, storyboarding, and shooting techniques.",
        tools: ["Storyboarding", "Shot Composition", "Lighting Setup"],
        icon: <FaVideo className="text-4xl text-[#ff6b6b]" />,
      },
    
      {
        title: "Web Development and Database Administration",
        description: "Introduction to filming and photo capturing basics.",
        tools: ["Operate Personal computer", "Connect hardware peripherals", "Install software application", "Protect application or system software", "Maintain Inventories of hardware and software and documentation", "Operate word processing applications", "Operate spreadsheet applications", "Operate presentation application", "Access and use database applications", "Apply 5s procedures", "Create a simple markup language document"],
        icon: <FaDatabase className="text-4xl text-[#ff6b6b]" />,
      },
      
    ],
  },
  {
    level: "Level 2",
    courses: [
      {
        title: "Hardware and Network Servicing",
        description: "Intermediate hardware repair and network configuration.",
        tools: ["Operate Database Application", "Install and Optimize OS Software", "Administrate Network and Hardware Peripherals", "Implement Maintenance Procedures", "Maintain Equipment and Consumables", "Connect Internation Hardwre Components", "Apply Problem Solving Techniques to Routine Malfunction", "Care for Network and Computer Hardware", "Update and Document Operational procedures", "Record Client Support Requirements", "Prevent and Eliminate MUDA"],
        icon: <FaNetworkWired className="text-4xl text-[#ff6b6b]" />,
      },
      {
        title: "Film Making",
        description: "Learn scripting, storyboarding, and shooting techniques.",
        tools: ["Storyboarding", "Shot Composition", "Lighting Setup"],
        icon: <FaVideo className="text-4xl text-[#ff6b6b]" />,
      },
      {
        title: "Web Development and Database Administration",
        description: "Learn to create simple responsive websites.",
        tools: ["Operate database application", "build simple website using commericial programs", "Administrate Network and hardware peripherals", "Implement maintenance procedures", "Configure and Use Internet","OPerate Presentation package","Record client support requirements","Update and document operational procedures","Apply problem solving techniques to routine malfunction","Prevent and eliminate MUDA"],
        icon: <FaCode className="text-4xl text-[#64ffda]" />,
      },
      
    ],
  },
  {
    level: "Level 3",
    courses: [
      {
        title: "Hardware and Network Servicing",
        description: "Advanced networking and hardware troubleshooting.",
        tools: ["Determine Best-Fit Topology", "Install and Manage Network Protocols", "Configure and Administrater Server", "Monitor and Administrater System and Network Security", "Identify and Resolve Network Problems","Provide first level Remote Help Desk support", "Create Techinical Documentation"],
        icon: <FaNetworkWired className="text-4xl text-[#ff6b6b]" />,
      },
      {
        title: "Film Making",
        description: "Learn scripting, storyboarding, and shooting techniques.",
        tools: ["Storyboarding", "Shot Composition", "Lighting Setup"],
        icon: <FaVideo className="text-4xl text-[#ff6b6b]" />,
      },
      {
        title: "Web Development and Database Administration",
        description: "Design beautiful and user-friendly web interfaces.",
        tools: ["Website technical Requirement Modeling", "Model data objects", "Develop website information architecture", "Design program logic", "Delelop Cascaded Style sheets", "Write contents for Webpages", "Use Basic SQL", "Integrate Database with a website", "Monitore and support data conversion", "Evalute and select web hosting service" ],
        icon: <FaDatabase className="text-4xl text-[#ff9f1c]" />,
      },
    ],
  },
  {
    level: "Level 4",
    courses: [
      {
        title: "Hardware and Network Servicing",
        description: "Professional certification in networking and hardware repair.",
        tools: ["Provide Network System Administration", "Develop System Infrastrucuture Design Plan", "Build Internet Infrastructure", "Build Small Wireless LAN", "Manage Network Security", "Determine Maintenance Strategy", "Conduct/Facilitate User Training"],
        icon: <FaNetworkWired className="text-4xl text-[#ff6b6b]" />,
      },
      {
        title: "Film Making",
        description: "Master advanced techniques in film production.",
        tools: ["Lighting Techniques", "Sound Design", "Color Grading", "Drone Filming", "Visual Effects"],
        icon: <FaVideo className="text-4xl text-[#ff6b6b]" />,
      },
      {
        title: " Web Development and Database Administration",
        description: "Manage and optimize databases professionally.",
        tools: ["Estimate cost for web and database projects", "Monitor and administer database", "Apply object oriented programming language skill", "Use Advanced SQL", "Determine suitablity of database functionality and scalablity", "perform database system test", "Complete database backup and recovery", "Create techinical documentation ", "Produce basic server side scrip for dynamic web page", "Maintain web site information standards"],
        icon: <FaDatabase className="text-4xl text-[#00ffae]" />,
      },
    ],
  },

  {
    level: "Level 5",
    courses: [
      {
        title: "Hardware and Network Servicing",
        description: "Professional certification in networking and hardware repair.",
        tools: ["Research and Review Hardware Technology Options for Organizations", "Prepare Disaster Recovery and Contingency plan", "Assist with Policy Development for Client Support", "Establish and Maintain Client User Liasion", "Match IT needs with the Strategic Direction of the Enterprise", "Install, Configure and Taste Router", "Install and Manage Conflict ICT Networks", "Plan and MOnitor the System pilot"],
        icon: <FaNetworkWired className="text-4xl text-[#ff6b6b]" />,
      },
      {
        title: "Film Making",
        description: "Master advanced techniques in film production.",
        tools: ["Lighting Techniques", "Sound Design", "Color Grading", "Drone Filming", "Visual Effects"],
        icon: <FaVideo className="text-4xl text-[#ff6b6b]" />,
      },
      {
        title: "Web Development and Database Administration",
        description: "Manage and optimize databases professionally.",
        tools: ["Establish and maintain client user liasion", "Match web and database needs with strategic direction of the Enterprise", "Research and apply emergin web technology trends", "Develop system infrstructure design plan for web and database","Manage web and database projects", "Prepare disaster recovery and contingency plan", ],
        icon: <FaDatabase className="text-4xl text-[#00ffae]" />,
      },
    ],
  },
];

// Short Courses (3 months)
const shortCourses = [
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
    ],
    icon: <FaLaptop className="text-4xl text-[#4a90e2]" />,
  },
  {
    title: "Graphics Design",
    description:
      "Create visually stunning designs for social media, advertisements, and digital content.",
    tools: [
      "Photography",
      "Videography",
      "Camera Operation",
      "Lighting Techniques",
      "Editing Software",
      "Adobe Photoshop",
      "Illustrator",
      "Canva",
      "Figma",
      "CorelDRAW",
      "InDesign",
    ],
    icon: <FaPaintBrush className="text-4xl text-[#ff9f1c]" />,
  },
  {
    title: "Logo Design",
    description:
      "Design creative and unique logos that represent your brand identity perfectly.",
    tools: [
      "Branding Design",
      "Product Design",
      "Publishing Design",
      "Illustrator",
      "CorelDRAW",
      "Canva",
      "Figma",
      "Photoshop",
      "Vector Design",
    ],
    icon: <FaPenNib className="text-4xl text-[#f72585]" />,
  },
];

// Component to render course cards
const CourseCards = ({ courses }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {courses.map((course, index) => (
      <div
        key={index}
        className="bg-[#112240] rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition hover:shadow-2xl hover:bg-[#111237] border border-cyan-300 hover:border hover:border-[var(--accent-blue)] hover:border-2"
      >
        <div className="mb-4">{course.icon}</div>
        <h4 className="text-2xl font-semibold mb-2">{course.title}</h4>
        <p className="text-gray-400 mb-4">{course.description}</p>

        {/* Tools */}
        <div className="grid grid-cols-2 gap-2 text-left w-full">
          {course.tools.map((tool, i) => (
            <div key={i} className="flex items-center gap-2">
              <FaCheck className="text-cyan-400 shrink-0" />
              <span className="text-gray-300 text-sm">{tool}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const Services = () => {
  return (
    <section id="services" className="py-24 bg-[#0a192f] text-white">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Courses and Services
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Explore our Diploma level programs (divided into four levels) and
            short courses designed to help you grow, learn, and achieve your
            goals.
          </p>
        </div>

        {/* Diploma Levels */}
        <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center !text-[var(--accent-blue)]">
          Diploma Level Courses
        </h3>
        {diplomaLevels.map((level, idx) => (
          <div key={idx} className="mb-20">
            <h4 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-pink-400">
              {level.level}
            </h4>
            <CourseCards courses={level.courses} />
          </div>
        ))}

        {/* Short Courses */}
        <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center !text-[var(--accent-blue)]">
         Short Term Courses(3-6 Months)
        </h3>
        <CourseCards courses={shortCourses} />
      </div>
    </section>
  );
};

export default Services