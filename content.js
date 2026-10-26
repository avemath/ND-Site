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
  discipline: "Mechanical Engineering",
  minor: "Robotics",
  school: "Louisiana State University",
  schoolShort: "LSU",
  graduation: "May 2027",
  // NOTE: resume says Mount Prospect, IL (hometown). Change to "Baton Rouge, LA" if he prefers.
  location: "Mount Prospect, IL",
  lastUpdated: "October 2026",             // Change this whenever the site is updated
  // The live address. Update this if the site moves to his own GitHub account.
  siteUrl: "https://avemath.github.io/ND-Site/",

  // Under his name at the top. DRAFT: have him approve the wording.
  tagline:
    "I design and build robots, from the CAD model to the finished part. " +
    "This year I built a modem housing for an underwater robot, and now I'm working on path planning for unmanned boats.",

  // The line with the blinking red dot. Set to "" to hide it.
  status: "Now: path planning for unmanned surface vessels at the LSU iCORE Lab",

  /* ---------- Links ----------
     Leave a link as "" to hide it. */
  links: {
    email: "nmdomke2004@gmail.com",
    linkedin: "https://www.linkedin.com/in/nicholas-domke/",
    github: "",                            // Add if he wants his GitHub shown
    // The "Resume" button. resume.html is a printable resume page built from
    // this file, with no phone number. You can also point this at a PDF in the
    // assets folder (e.g. "assets/resume.pdf"), but his current PDF lists his
    // phone number and this repo is public.
    resume: "resume.html",
  },

  // Shown under Education on the printable resume page.
  gradIntent: "Applying to M.S. programs in controls and mechanical systems",   // QUESTION: which entry term? (Fall 2027?)

  /* ---------- Numbers strip (big dot-matrix numbers under the hero) ----------
     "pre" is small text above the number, "unit" is small red text after it.
     Only real numbers from his resume. */
  numbers: [
    { pre: "",      value: "8",     unit: "yrs", label: "using SolidWorks" },   // NOTE: bump this each year (started 2018)
    { pre: "",      value: "5",     unit: "",    label: "competition robots built with WildStang" },
    // 5 thou = 0.005 in. Written this way because the dot font has no "±" and its decimal point reads poorly.
    { pre: "±",     value: "5",     unit: "thou", label: "tolerance held on a manual lathe (0.005 in.)" },
    { pre: "up to", value: "100",   unit: "",    label: "students tutored in the LSU Math Lab" },
  ],

  /* ---------- About ----------
     Each string is one paragraph. DRAFT: have him rewrite in his own voice. */
  about: [
    "I started using SolidWorks eight years ago on my high school FIRST team, WildStang. " +
      "Over four years I led design and CAD on five competition robots, each one built in eight weeks. " +
      "The part I still like best is taking a design from the model to a part I can wire up and test.",
    "Now I'm a mechanical engineering senior at LSU with a minor in robotics, graduating in May 2027. " +
      "In the iCORE Lab I work on hazard avoidance and path planning for unmanned surface vessels. " +
      "In summer 2026 at Integer Technologies, I designed the housing that put an acoustic modem on a BlueROV2. " +
      "After graduation, I plan to pursue an M.S. in controls and mechanical systems.",
  ],

  /* ---------- Featured project (big dark panel) ----------
     MEDIA, in order of priority (the first one that's filled in is shown):
       video:  a short muted loop, e.g. "assets/video/rov-test.mp4" (keep it under ~8 MB)
       image:  a photo, e.g. "assets/img/rov.jpg" (also fill in imageAlt)
       art:    a line drawing from assets/js/drawings.js: rov, arm, maze, lathe, playground, frc
     The drawings are ILLUSTRATIONS (labeled that way on the page), not his actual
     CAD. Replace them with his photos or SolidWorks renders when we get them.
     "callouts" are the numbered labels on the drawing, in order. */
  featured: {
    title: "Acoustic Modem Housing for a BlueROV2",
    org: "Integer Technologies",
    dates: "May 2026 to Aug 2026",
    hook: "A BlueROV2 needed to carry an acoustic modem for in-water testing. I designed the housing and mount that carry it.",
    points: [
      "Designed the housing and mount in Fusion 360",
      "3D printed test and final parts in PLA and PETG",
      "Selected cables and connectors that connect and disconnect quickly while the vehicle is in the water",
    ],
    result: "",                            // QUESTION: what happened in water testing? One sentence.
    tools: ["Fusion 360", "PLA", "PETG", "BlueROV2"],
    art: "rov",
    callouts: ["Acoustic modem housing", "3D-printed mount", "Quick-disconnect cable"],
    video: "",
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
      hook: "A 3D-printed 5-DOF arm that calibrates itself using limit switches.",
      points: [
        "Designed the end effector for a DIY 5-DOF robot arm",
        "3D printed the arm and end effector",
        "Mounted and wired the electronics around an Arduino Uno R4",
        "Used limit switches so the arm calibrates itself",
        "Measured and analyzed the arm's performance",   // QUESTION: what was measured?
      ],
      result: "",                          // QUESTION: one sentence on what the analysis found
      tools: ["3D printing", "Arduino Uno R4", "Limit switches"],
      art: "arm",
      callouts: ["End effector", "Limit switches", "Arduino Uno R4"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Robot Maze Navigation",
      role: "Intro to Robotics",
      dates: "Oct 2025 to Dec 2025",
      hook: "An autonomous robot that finds its own way through a maze.",
      points: [
        "Designed the mobile base and camera mount in SolidWorks, then 3D printed them",
        "Worked with a second mechanical engineering student and a team of computer science students",
        "Helped debug the autonomous navigation and object detection code",
      ],
      result: "",                          // QUESTION: did it finish the maze?
      tools: ["SolidWorks", "3D printing"],
      art: "maze",
      callouts: ["Printed base and camera mount", "Autonomous route"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Manufacturing Lab Projects",
      role: "Manufacturing Processes",
      dates: "Jan 2025 to Apr 2025",
      hook: "Shop work on a manual lathe, a MIG welder, and a Haas CNC router.",
      points: [
        "Turned a clutch alignment pin on a manual lathe to ±0.005 in.",
        "MIG welded a metal stool",                       // QUESTION: steel?
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
      role: "Team of six",                     // QUESTION: which course was this for?
      dates: "Sep 2023 to Dec 2023",
      hook: "A playground designed to ADA guidelines for kids with disabilities.",
      points: [
        "Studied existing playground designs against ADA guidelines",
        "Built the SolidWorks model and merged the team's parts into one assembly",
        "Selected aluminum and polyethylene to keep the structure light and easy to build",
      ],
      tools: ["SolidWorks", "ADA guidelines"],
      art: "playground",                   // NOTE: drawing is illustrative; swap in a SolidWorks render if he has one
      callouts: ["Designed to ADA guidelines", "Light aluminum and polyethylene"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "WildStang Robotics",
      role: "Design lead, FIRST Robotics Competition",
      dates: "Aug 2018 to May 2022",
      hook: "Where I started using SolidWorks, in 2018.",
      points: [
        "Led design, manufacturing, and assembly of 5 competition robots in 4 years",
        "Led CAD in SolidWorks and Onshape and trained younger members on CAD and power tools",
        "Kept sub-teams on schedule so every robot ran within the 8-week build season",
        "Ran the team's CNC router using VCarve and printed Onyx parts on Markforged printers",
        "Designed a movable workshop storage system for use at competitions",
      ],
      result: "",                          // QUESTION: any awards or event results 2018 to 2022?
      tools: ["SolidWorks", "Onshape", "VCarve", "Markforged"],
      art: "frc",                          // NOTE: generic robot drawing; a photo of one of his robots would be much better
      callouts: ["CAD in SolidWorks and Onshape", "Onyx parts on Markforged printers", "Built in 8-week seasons"],
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
        "Research proximity hazard avoidance and path planning for unmanned surface vessels",
        "Designed a mount for a laser camera and an RGB camera on a UR5e robotic arm to detect surface defects on wind turbine blades (ROS, Python)",
        "Built a 3D-printed 5-DOF robotic arm for mock welding (see Projects)",
      ],
      // Used on the printable resume page (resume.html) instead of "points".
      resumePoints: [
        "Research proximity hazard avoidance and path planning for unmanned surface vessels",
        "Designed a mount for a laser camera and an RGB camera on a UR5e robotic arm to detect surface defects on wind turbine blades (ROS, Python)",
        "Built a 3D-printed 5-DOF robotic arm that performs mock welding, using an Arduino Uno R4 and limit switches for autonomous calibration",
      ],
    },
    {
      role: "Mechanical Engineering Intern",
      org: "Integer Technologies",
      place: "Baton Rouge, LA",
      dates: "May 2026 to Aug 2026",
      points: [
        "Designed and 3D printed the housing that mounts an acoustic modem on a BlueROV2 for in-water testing (see Featured)",
      ],
      resumePoints: [
        "Designed a housing and mount in Fusion 360 to integrate an acoustic modem with a BlueROV2 for in-water testing",
        "3D printed parts in PLA and PETG for testing and final assembly",
        "Selected cables and connectors for quick connection and removal while the vehicle is in the water",
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

  /* ---------- Timeline ----------
     Drawn automatically from the dates on projects and jobs. "next" adds a
     dashed bar after graduation. */
  timeline: {
    from: 2018,
    to: 2028,
    cut: 2023,          // years before this are squeezed into a narrow strip
    share: 0.2,         // how much of the width that strip gets
    next: "M.S. (planned)",
  },

  /* ---------- Coursework (scrolls across a red band) ---------- */
  coursework: [
    "System Dynamics", "Kinematics", "Industrial Robotics", "Instrumentation and Measurements",
    "Machine Design", "Intro to Robotics", "Simulation Methods", "Thermodynamics", "Heat Transfer",
    "Fluid Dynamics", "Manufacturing Processes", "Statics", "Strength of Materials",
    "Circuits", "Electronics", "Welding Engineering",
  ],

  /* ---------- What I can do (four cards above the skills list) ----------
     Each one is backed by real work from the resume. */
  capabilities: [
    {
      title: "Design",
      proof: [
        "SolidWorks since 2018, plus Onshape, Fusion 360, and Inventor",
        "Led CAD for 5 WildStang competition robots",
        "Designed the BlueROV2 modem housing at Integer",
      ],
    },
    {
      title: "Build",
      proof: [
        "Held \u00B10.005 in. on a manual lathe",
        "MIG welded a stool and wrote G-code for a Haas CNC router",
        "3D printed parts in PLA, PETG, and Onyx",
      ],
    },
    {
      title: "Program",
      proof: [
        "Worked with ROS and Python on a UR5e inspection setup at the iCORE Lab",
        "Used an Arduino Uno R4 and limit switches for self-calibration on a 5-DOF arm",
        "Helped debug autonomous navigation and object detection code",
      ],
    },
    {
      title: "Lead and teach",
      proof: [
        "Coordinated sub-teams through 8-week robot builds",
        "Trained younger WildStang members on CAD and power tools",
        "Tutored up to 100 students in the LSU Math Lab",
      ],
    },
  ],

  /* ---------- Skills (spec sheet rows) ---------- */
  skills: [
    { group: "CAD", items: ["SolidWorks (since 2018)", "Onshape", "Fusion 360", "Inventor"] },
    { group: "Code and controls", items: ["Python", "ROS 2", "MATLAB", "Arduino"] },
    { group: "Fabrication", items: ["3D printing", "Markforged", "MIG welding", "Manual lathe", "Haas CNC", "G-code", "CNC router", "VCarve", "Drill press", "Band saw", "Miter saw"] },
    { group: "Office", items: ["Excel", "Word"] },
  ],

  /* ---------- Off the clock (hobbies) ----------
     Nicholas said yes to this being public (Oct 2026). Shows on a red panel
     above "Let's talk", with its own menu link. Delete an item to remove it.
     DRAFT wording: have him check it reads like him. */
  hobbies: {
    title: "Off the clock",
    menuLabel: "Off the clock",
    intro:
      "Outside the lab and the shop, I'm usually at a keyboard of a different kind " +
      "or flying a drone somewhere with a good view.",
    items: [
      {
        name: "Piano",
        // TODO: add a line on what he likes to play or is learning
        text: "My favorite instrument right now.",
        keys: true,                        // shows the playable keyboard
      },
      {
        name: "Guitar",
        text: "I own three electrics, an acoustic, and a ukulele. I also played clarinet in my high school band.",
      },
      {
        name: "Drone photography",
        // TODO: add where he likes to fly and what he likes to shoot
        text: "I fly a drone for aerial photography.",
        // Add his photos here and a grid appears. Put files in assets/img/, e.g.
        // { image: "assets/img/drone-1.jpg", alt: "Aerial view of ...", caption: "Baton Rouge, LA" },
        photos: [],
      },
      {
        name: "Pickleball and chess",
        text: "The two games I play whenever I get the chance.",
        wide: false,                       // NOTE: set to true once drone photos are added, so this card fills its row
      },
    ],
  },

  /* ---------- Contact ---------- */
  contactLine:
    "I'm applying to M.S. programs in controls and mechanical systems and am open to research " +
    "and internship roles in robotics and mechanical design. Email is the fastest way to reach me.",
};
