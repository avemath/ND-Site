/* ==========================================================================
   CONTENT FOR NICHOLAS'S SITE
   This is the only file that needs editing to change what the site says.
   Source: Nicholas_Domke_Resume.pdf (Oct 2026). Update both together.

   HOW TO EDIT
   - Anything in [square brackets] is a placeholder. On the site it shows
     in red with a dashed underline so it's easy to spot. Replace it with
     the real info and delete the brackets.
   - To hide a single field, set it to "" (empty quotes).
   - To remove a whole item (a job, a project), delete everything from its
     opening { to its closing }, plus the comma after it.
   - To add an item, copy an existing one (from { to },), paste it below,
     and change the text.
   - Keep the quotes and commas. If the page goes blank after an edit, a
     missing quote or comma is almost always the cause.

   PRIVACY NOTE
   The repo is public, so everything in this file is public too, even the
   comments. His phone number is intentionally NOT on the site.
   ========================================================================== */

window.SITE = {

  /* ---------- Basics ---------- */
  firstName: "Nicholas",                   // He prefers "Nicholas", not "Nick"
  lastName: "Domke",
  discipline: "Mechanical engineering",
  minor: "Robotics",
  school: "Louisiana State University",
  schoolShort: "LSU",
  graduation: "May 2027",
  // NOTE: resume says Mount Prospect, IL (hometown). Change to "Baton Rouge, LA" if he prefers.
  location: "Mount Prospect, IL",
  lastUpdated: "October 2026",             // Change this whenever the site is updated

  // Short line under his name. DRAFT: have him approve the wording.
  tagline:
    "Mechanical engineering student at LSU with a minor in robotics. " +
    "I design, 3D print, and build robots and the hardware that holds them together.",

  // The line with the blinking red dot. Set to "" to hide it.
  status: "Now: Student researcher, LSU iCORE Lab",

  /* ---------- Links ----------
     Leave a link as "" to hide it. */
  links: {
    email: "nmdomke2004@gmail.com",
    linkedin: "https://www.linkedin.com/in/nicholas-domke/",
    github: "",                            // Add if he wants his GitHub shown
    // To show a "Download resume" button, put a PDF in the assets folder and
    // set this to "assets/resume.pdf". NOTE: his current resume has his phone
    // number on it, and anything in this repo is public. Consider a version
    // without the phone number first.
    resume: "",
  },

  /* ---------- About ----------
     Each string is one paragraph. DRAFT: have him rewrite in his own voice. */
  about: [
    "I'm a mechanical engineering student at Louisiana State University, minoring " +
      "in robotics and graduating in May 2027. I've been using SolidWorks for eight " +
      "years, starting on my high school FIRST robotics team, and I still like the " +
      "full loop best: model it, print or machine it, wire it up, and test it.",
    "Right now I'm a student researcher in LSU's iCORE Lab, working on hazard " +
      "avoidance and path planning for unmanned surface vessels. After my B.S. I " +
      "plan to pursue an M.S. in controls and mechanical systems.",
  ],

  /* ---------- Experience ----------
     Most recent first. Set compact: true for jobs that should show as one
     short line (no bullet points). */
  experience: [
    {
      role: "Student Researcher",
      org: "LSU iCORE Lab",
      place: "Baton Rouge, LA",
      dates: "Mar 2026 to now",
      points: [
        "Researching proximity hazard avoidance and path planning for unmanned surface vessels",
        "Developed a mount for a laser camera and RGB camera on a UR5e robotic arm to detect surface imperfections in wind turbine blades, using ROS and Python",
        "Built a 3D printed robotic arm that performs mock welding operations, using an Arduino Uno R4 and limit switches for autonomous calibration",
      ],
    },
    {
      role: "Mechanical Engineering Intern",
      org: "Integer Technologies",
      place: "Baton Rouge, LA",
      dates: "May 2026 to Aug 2026",
      points: [
        "Designed a housing and mounting solution in Fusion 360 to integrate an acoustic modem with a BlueROV2 for in-water testing",
        "3D printed parts in PLA and PETG for testing and final assembly",
        "Chose cables and connectors that allow quick connection and removal while the vehicle is still in the water",
      ],
    },
    {
      role: "Math Tutor",
      org: "LSU Math Lab",
      place: "Baton Rouge, LA",
      dates: "Aug 2025 to May 2026",
      points: [
        "Tutored up to 100 students in college algebra and trigonometry",
      ],
    },
    {
      role: "Server",
      org: "ENTERRIUM",
      place: "Schaumburg, IL",
      dates: "May 2025 to Jan 2026",
      compact: true,
    },
    {
      role: "Server",
      org: "Texas Roadhouse",
      place: "Mount Prospect, IL",
      dates: "May 2023 to Aug 2024",
      compact: true,
    },
  ],

  /* ---------- Projects ----------
     Most recent first. "image" is optional: put image files in assets/img/
     and use a path like "assets/img/welding-arm.jpg". "link" is optional too. */
  projects: [
    {
      // NOTE: not on his resume yet. Fill in or delete this whole block.
      title: "Senior Design: [Project name]",
      role: "Team lead",
      dates: "2026 to 2027",
      points: [
        "[What the team is building and who it's for]",
        "[What he's responsible for as team lead]",
      ],
      tools: ["[Tools used]"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Mock Welding Robotic Arm",
      role: "iCORE Lab",
      dates: "Mar 2026 to May 2026",
      points: [
        "Designed an end effector for a 5 degree of freedom DIY robot",
        "3D printed the robot and end effector",
        "Integrated and mounted the electrical components",
        "Ran quantitative analysis of the robot's behavior",
      ],
      tools: ["3D printing", "Arduino Uno R4", "Limit switches"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Robot Maze Navigation",
      role: "Intro to Robotics",
      dates: "Oct 2025 to Dec 2025",
      points: [
        "Designed a mobile robot base and camera mount in SolidWorks and 3D printed them",
        "Worked with another mechanical engineer and computer science students",
        "Helped debug software for autonomous maze navigation and object detection",
      ],
      tools: ["SolidWorks", "3D printing"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Manufacturing Lab Projects",
      role: "Manufacturing Processes",
      dates: "Jan 2025 to Apr 2025",
      points: [
        "Machined a clutch alignment pin on a manual lathe to a tolerance of ±0.005 in.",
        "MIG welded a metal stool",
        "Programmed and ran a Haas CNC router to cut a basic aluminum heat exchanger, learning G-code and tool pathing",
      ],
      tools: ["Manual lathe", "MIG welding", "Haas CNC", "G-code"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Inclusive Playground",
      role: "Team of 6",
      dates: "Sep 2023 to Dec 2023",
      points: [
        "Researched current playground designs and designed one more inclusive of all disabilities, following ADA guidelines",
        "Modeled the playground in SolidWorks and combined each team member's parts",
        "Chose aluminum and polyethylene to keep it light and easier to build",
      ],
      tools: ["SolidWorks", "ADA guidelines"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "WildStang Robotics Team",
      role: "Design lead",
      dates: "Aug 2018 to May 2022",
      points: [
        "Led design, manufacturing, and assembly of 5 competition robots over 4 years",
        "Led CAD in SolidWorks and Onshape and taught younger members CAD and power tools",
        "Coordinated sub-teams and timelines so each robot was working within 8 weeks",
        "Ran the CNC router (VCarve) and printed Onyx parts on Markforged printers",
        "Designed a new movable workshop storage system in Onshape for competitions",
      ],
      tools: ["SolidWorks", "Onshape", "VCarve", "Markforged"],
      image: "",
      imageAlt: "",
      link: "",
    },
  ],

  /* ---------- Skills ---------- */
  skills: [
    {
      group: "Software",
      items: ["SolidWorks (8 yrs)", "Onshape", "Fusion 360", "Inventor", "MATLAB",
              "Python", "ROS 2", "VCarve", "Excel", "Word"],
    },
    {
      group: "Shop and hardware",
      items: ["Manual lathe", "Drill press", "CNC router", "Miter saw", "Band saw",
              "3D printing", "MIG welding"],
    },
  ],

  /* ---------- Coursework (scrolls across the page) ---------- */
  coursework: [
    "Thermodynamics", "Heat Transfer", "Fluid Dynamics", "Manufacturing Processes",
    "System Dynamics", "Simulation Methods", "Statics", "Strength of Materials",
    "Circuits", "Electronics", "Kinematics", "Intro to Robotics", "Welding Engineering",
    "Industrial Robotics", "Instrumentation and Measurements", "Machine Design",
  ],
};
