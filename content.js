/* ==========================================================================
   CONTENT FOR NICHOLAS'S SITE
   This is the only file that needs editing to change what the site says.
   Source: Nicholas_Domke_Resume.pdf (Oct 2026). Update both together.

   HOW TO EDIT
   - Anything in [square brackets] is a placeholder. It shows in red with a
     dashed underline so it's easy to spot. Replace it and delete the brackets.
   - draft: true hides a whole item from the live site. Use it while an
     item still has placeholders, then delete the line when it's ready.
   - To hide a single field, set it to "" (empty quotes).
   - To remove an item, delete everything from its { to its }, plus the comma.
   - To add an item, copy an existing one (from { to },) and paste it below.
   - Keep the quotes and commas. If the page goes blank after an edit, a
     missing quote or comma is almost always the cause.

   PRIVACY NOTE
   The repo is public, so everything in this file is public too, even the
   comments. His phone number is intentionally NOT on the site.

   QUESTIONS FOR NICHOLAS (answers would make the site stronger)
   1. Photos: BlueROV2 with the housing, welding arm, maze robot, lathe pin,
      stool, WildStang robots. Any of these can replace a dot drawing.
   2. Integer: did the housing go in the water? Did the quick-disconnects work?
   3. Welding arm: what did the quantitative analysis measure and find?
   4. Maze robot: did it finish the maze?
   5. WildStang: any awards or event results 2018 to 2022?
   6. Senior design: project name, his role, sponsor.
   7. Location: Baton Rouge or Mount Prospect? Open to relocating?
   8. A GitHub with ROS or Python code he'd like linked?
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

  // Under his name at the top. DRAFT: have him approve the wording.
  tagline:
    "I design and build robots, from the CAD model to the part on the bench. " +
    "Lately that means path planning for unmanned boats and a modem housing for an underwater robot.",

  // The line with the blinking red dot. Set to "" to hide it.
  status: "Now: Path planning for unmanned surface vessels, LSU iCORE Lab",

  /* ---------- Links ----------
     Leave a link as "" to hide it. */
  links: {
    email: "nmdomke2004@gmail.com",
    linkedin: "https://www.linkedin.com/in/nicholas-domke/",
    github: "",                            // Add if he wants his GitHub shown
    // To show a "Resume" button, put a PDF in the assets folder and set this
    // to "assets/resume.pdf". NOTE: his current resume has his phone number
    // on it, and this repo is public. Use a version without it.
    resume: "",
  },

  /* ---------- Numbers strip (big dot-matrix numbers under the hero) ----------
     "pre" is small text above the number, "unit" is small red text after it.
     Only real numbers from his resume. */
  numbers: [
    { pre: "",      value: "8",     unit: "yrs", label: "using SolidWorks" },
    { pre: "",      value: "5",     unit: "",    label: "competition robots built on WildStang" },
    // 5 thou = 0.005 in. Written this way because the dot font has no "±" and its decimal point reads poorly.
    { pre: "±",     value: "5",     unit: "thou", label: "tolerance held on a manual lathe (0.005 in.)" },
    { pre: "up to", value: "100",   unit: "",    label: "students tutored in the LSU Math Lab" },
  ],

  /* ---------- About ----------
     Each string is one paragraph. DRAFT: have him rewrite in his own voice. */
  about: [
    "I started using SolidWorks eight years ago on my high school FIRST team, WildStang. " +
      "Over four years I led design and CAD on five competition robots, each one built in eight weeks. " +
      "I still like the full loop best: model it, print or machine it, wire it, test it.",
    "Now I'm a mechanical engineering senior at LSU with a minor in robotics, graduating in May 2027. " +
      "In the iCORE Lab I work on hazard avoidance and path planning for unmanned surface vessels. " +
      "Last summer at Integer Technologies I designed the housing that put an acoustic modem on a BlueROV2. " +
      "Next, I'm planning an M.S. in controls and mechanical systems.",
  ],

  /* ---------- Featured project (big dark panel) ----------
     "art" picks the dot drawing: rov, arm, maze, lathe, playground, frc.
     Set "image" to a photo path (e.g. "assets/img/rov.jpg") to use a photo instead. */
  featured: {
    title: "Modem housing for a BlueROV2",
    org: "Integer Technologies",
    dates: "Summer 2026",
    hook: "An underwater robot needed to carry an acoustic modem. I designed the housing that got it there.",
    points: [
      "Designed the housing and mount in Fusion 360",
      "Printed test and final parts in PLA and PETG",
      "Chose cables and connectors that can be swapped while the vehicle is still in the water",
    ],
    result: "",                            // QUESTION: what happened in water testing? One sentence.
    tools: ["Fusion 360", "PLA", "PETG", "BlueROV2"],
    art: "rov",
    image: "",
    imageAlt: "",
  },

  /* ---------- Projects ----------
     Most recent first. "hook" is the one-line intro under the title. */
  projects: [
    {
      draft: true,                         // Hidden until filled in. Delete this line to show it.
      title: "Senior Design: [Project name]",
      role: "Team lead",
      dates: "2026 to 2027",
      hook: "[One line: what it does and who it's for]",
      points: [
        "[What the team is building]",
        "[What he's responsible for as team lead]",
      ],
      tools: ["[Tools used]"],
      art: "",
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Mock Welding Robotic Arm",
      role: "iCORE Lab",
      dates: "Mar 2026 to May 2026",
      hook: "A 5-DOF arm I printed myself that calibrates itself with limit switches.",
      points: [
        "Designed the end effector for a 5 degree of freedom DIY robot arm",
        "3D printed the arm and end effector",
        "Mounted and wired the electronics around an Arduino Uno R4",
        "Used limit switches so the arm calibrates itself",
        "Ran quantitative analysis of how the arm behaved",   // QUESTION: what was measured?
      ],
      tools: ["3D printing", "Arduino Uno R4", "Limit switches"],
      art: "arm",
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Robot Maze Navigation",
      role: "Intro to Robotics",
      dates: "Oct 2025 to Dec 2025",
      hook: "A robot that finds its own way through a maze.",
      points: [
        "Designed the mobile base and camera mount in SolidWorks, then 3D printed them",
        "Worked with another mechanical engineer and a team of computer science students",
        "Helped debug the autonomous navigation and object detection code",
      ],
      tools: ["SolidWorks", "3D printing"],
      art: "maze",
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Manufacturing Lab Projects",
      role: "Manufacturing Processes",
      dates: "Jan 2025 to Apr 2025",
      hook: "Three machines, three parts: lathe, welder, CNC.",
      points: [
        "Turned a clutch alignment pin on a manual lathe to ±0.005 in.",
        "MIG welded a metal stool",
        "Wrote G-code and ran a Haas CNC router to cut an aluminum heat exchanger",
      ],
      tools: ["Manual lathe", "MIG welding", "Haas CNC", "G-code"],
      art: "lathe",
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Inclusive Playground",
      role: "Team of 6",
      dates: "Sep 2023 to Dec 2023",
      hook: "A playground designed so kids with any disability can use it.",
      points: [
        "Studied existing playground designs against ADA guidelines",
        "Built the SolidWorks model and merged all six teammates' parts",
        "Picked aluminum and polyethylene to keep it light and simple to build",
      ],
      tools: ["SolidWorks", "ADA guidelines"],
      art: "playground",
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "WildStang Robotics",
      role: "FIRST Robotics, design lead",
      dates: "Aug 2018 to May 2022",
      hook: "Where the eight years of SolidWorks started.",
      points: [
        "Led design, manufacturing, and assembly of 5 competition robots in 4 years",
        "Led CAD in SolidWorks and Onshape, and taught younger members CAD and power tools",
        "Kept sub-teams on schedule so each robot was running within the 8-week build",
        "Ran the CNC router (VCarve) and printed Onyx parts on Markforged printers",
        "Designed a movable workshop storage system for competitions",
      ],
      tools: ["SolidWorks", "Onshape", "VCarve", "Markforged"],
      art: "frc",
      image: "",
      imageAlt: "",
      link: "",
    },
  ],

  /* ---------- Experience ----------
     Most recent first. compact: true shows a job as one short line. */
  experience: [
    {
      role: "Student Researcher",
      org: "LSU iCORE Lab",
      place: "Baton Rouge, LA",
      dates: "Mar 2026 to now",
      points: [
        "Researching proximity hazard avoidance and path planning for unmanned surface vessels",
        "Designed a mount for a laser camera and RGB camera on a UR5e robotic arm to find surface defects on wind turbine blades, using ROS and Python",
        "Built a 5-DOF mock welding robotic arm (see Projects)",
      ],
    },
    {
      role: "Mechanical Engineering Intern",
      org: "Integer Technologies",
      place: "Baton Rouge, LA",
      dates: "May 2026 to Aug 2026",
      points: [
        "Designed and printed the housing that mounts an acoustic modem on a BlueROV2 for in-water testing (see Featured)",
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
      org: "ENTERRIUM and Texas Roadhouse",
      place: "Chicago area",
      dates: "May 2023 to Jan 2026",
      compact: true,
    },
  ],

  /* ---------- Coursework (scrolls across a red band) ---------- */
  coursework: [
    "Thermodynamics", "Heat Transfer", "Fluid Dynamics", "Manufacturing Processes",
    "System Dynamics", "Simulation Methods", "Statics", "Strength of Materials",
    "Circuits", "Electronics", "Kinematics", "Intro to Robotics", "Welding Engineering",
    "Industrial Robotics", "Instrumentation and Measurements", "Machine Design",
  ],

  /* ---------- Skills (spec sheet rows) ---------- */
  skills: [
    { group: "CAD", items: ["SolidWorks (8 yrs)", "Onshape", "Fusion 360", "Inventor"] },
    { group: "Code and controls", items: ["Python", "ROS 2", "MATLAB", "Arduino"] },
    { group: "Fabrication", items: ["3D printing", "MIG welding", "Manual lathe", "CNC router", "VCarve", "Drill press", "Band saw", "Miter saw"] },
    { group: "Office", items: ["Excel", "Word"] },
  ],

  /* ---------- Contact ---------- */
  contactLine:
    "Looking for internships, research positions, and grad programs in robotics, " +
    "mechanical design, and controls. Email is the fastest way to reach me.",
};
