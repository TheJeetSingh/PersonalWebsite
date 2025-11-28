import StarryBackground from "@/components/StarryBackground";
import "./projects.css";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Project Example 1",
      description: "A brief description of your amazing project. This could include technologies used, problems solved, and impact.",
      type: "Project",
      tags: ["React", "Next.js", "TypeScript"],
      link: "#",
    },
    {
      id: 2,
      title: "Hackathon Winner",
      description: "Won first place at a hackathon with this innovative solution. Built in 24 hours with a team.",
      type: "Hackathon",
      tags: ["Python", "FastAPI", "ML"],
      link: "#",
    },
    {
      id: 3,
      title: "Open Source Contribution",
      description: "Contributed to a popular open source project, adding new features and fixing bugs.",
      type: "Open Source",
      tags: ["JavaScript", "Node.js"],
      link: "#",
    },
  ];

  const experiences = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Company Name",
      period: "2023 - Present",
      description: "Working on building scalable web applications and leading technical initiatives.",
      achievements: [
        "Led development of key features",
        "Improved performance by 40%",
        "Mentored junior developers",
      ],
    },
    {
      id: 2,
      title: "Intern",
      company: "Previous Company",
      period: "2022 - 2023",
      description: "Gained experience in full-stack development and agile methodologies.",
      achievements: [
        "Built multiple features from scratch",
        "Collaborated with cross-functional teams",
      ],
    },
  ];

  return (
    <div className="min-h-screen relative">
      <StarryBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        {/* Comic Setting Box */}
        <div className="mb-8">
          <div className="comic-setting-box">
            <p className="font-sans text-black font-bold uppercase tracking-wider text-sm sm:text-base">
              On a website far far away...
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 drop-shadow-[4px_4px_0_#000] stroke-black">
            Projects & Experiences
          </h1>
          <p className="text-xl text-white font-medium max-w-2xl mx-auto drop-shadow-md">
            A collection of my work, hackathons, and professional journey
          </p>
        </div>

        {/* Projects Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-white mb-8 drop-shadow-[3px_3px_0_#000]">
            Projects & Hackathons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="comic-panel p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="comic-badge px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 uppercase">
                    {project.type}
                  </span>
                </div>
                <h3 className="text-xl font-black text-black mb-2 tracking-wide">
                  {project.title}
                </h3>
                <p className="text-gray-800 text-sm mb-4 leading-relaxed font-medium">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-bold rounded border-2 border-black bg-gray-100 text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link !== "#" && (
                  <a
                    href={project.link}
                    className="inline-block text-black font-bold hover:text-blue-600 hover:underline decoration-2 underline-offset-2"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Experiences Section */}
        <section>
          <h2 className="text-3xl font-black text-white mb-8 drop-shadow-[3px_3px_0_#000]">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="comic-panel p-6 rounded-xl bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-black tracking-wide">
                      {exp.title}
                    </h3>
                    <p className="text-lg font-bold text-gray-700">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-500 mt-2 sm:mt-0 border-2 border-black px-2 py-1 rounded bg-gray-50">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-800 font-medium mb-4">
                  {exp.description}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {exp.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="text-gray-700 text-sm font-medium"
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

