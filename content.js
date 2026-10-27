/* ==========================================================================
   CONTENT FOR NICHOLAS'S SITE
   This is the only file that needs editing to change what the site says.
   Source: Nicholas_Domke_Resume.pdf (Oct 2026). Update both together.

   HOW TO EDIT
   - Anything in [square brackets] is a placeholder. It shows in blue with a
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

   QUESTIONS FOR NICHOLAS (still open; each one is also marked // QUESTION below)
   1. BlueROV2: is the BlueLink SARbot BlueROV2 Heavy based?
   2. ROS 2: what did he use it for?
   3. Senior design: is the competition ASNE's Promoting Electric Propulsion (PEP)?
   4. Senior design: what does the radio frequency controller do?
   5. WildStang: were the 40 to 50 hours a week during build season?
   6. Welding arm: does a Sharpie stand in for the welding torch?
   7. Welding arm: Arduino Uno R3 or R4? (His wiring schematic says R3; the site says R4.)
   8. Welding arm: what does the Raspberry Pi do?
   9. Welding arm: which motor controller board is it?
   10. Wind turbine mount: when did he work on it? (no dates yet, so it's not on the timeline)
   11. UR5e mount: his resume says "a laser camera and an RGB camera"; his answers say
       "a laser and a depth sensor". The site uses his answers. Which is right?
   12. Open to relocating?
   13. Senior design: does "first-year team" mean the team's first year competing?
   14. Where did he use MATLAB and ROS 2? (so those Skills rows can link to projects)
   15. Is there a public repo for the USV path planner he could link?
   16. Who is his iCORE Lab advisor (to name on the site, if he wants)?
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
  // Hometown, from his resume. Shown in the About facts as "Hometown".
  location: "Mount Prospect, IL",
  locationLabel: "Hometown",
  // Where he lives now. Adds a "Currently in" row to the About facts, and the
  // resume page shows "Baton Rouge, LA (hometown: Mount Prospect, IL)". Set to "" to hide.
  currentLocation: "Baton Rouge, LA",
  lastUpdated: "October 2026",             // Change this whenever the site is updated
  // Shown in the drawing title block in the footer. Bump the letter (C, D, E...)
  // whenever the site gets a real update, like a revision on an engineering drawing.
  revision: "D",
  // The live address. Update this if the site moves to his own GitHub account.
  siteUrl: "https://avemath.github.io/nmdomke/",

  // Under his name at the top. DRAFT: have him approve the wording.
  tagline:
    "I design robot parts in CAD, build them in the shop, and test them in the real world.",

  // The line with the blinking blue dot. Set to "" to hide it.
  status: "Now: building a path planner for unmanned surface vessels at the LSU iCORE Lab",
  // A second small line under it, saying what he's looking for. Set to "" to hide it.
  seeking: "Applying to M.S. programs in controls and mechanical systems for Fall 2027. Open to research and internship roles.",

  /* ---------- Links ----------
     Leave a link as "" to hide it. */
  links: {
    email: "nmdomke2004@gmail.com",
    linkedin: "https://www.linkedin.com/in/nicholas-domke/",
    github: "",                            // Add his GitHub (github.com/nmdomke) here once it has projects on it
    // The "Resume" button: resume.html is the resume as a web page, built from the
    // "resume" block below. resumePdf is his PDF, offered as a download next to it.
    // Before replacing the PDF, check it has no phone number (this repo is public).
    resume: "resume.html",
    resumePdf: "assets/Nicholas_Domke_Resume.pdf",
  },

  /* ---------- Resume page (resume.html) ----------
     Line for line from his resume PDF (assets/Nicholas_Domke_Resume.pdf), in the same
     order. When he updates his resume, update this block and the PDF together.
     Dates use the site's format ("May 2026 to Aug 2026", "now"); the page writes them
     the way his PDF does: months in full, joined by an en dash, and "now" as "Present".
     The email, LinkedIn, and site address come from "links" and "siteUrl" above. */
  resume: {
    location: "Baton Rouge, Louisiana (hometown: Mount Prospect, Illinois)",
    education: {
      school: "Louisiana State University (LSU), Baton Rouge, LA",
      dates: "May 2027",
      degree: "Bachelor of Science in Mechanical Engineering",
      minors: "Robotics, Computer Science (in progress)",
      coursework: "Thermodynamics, Heat Transfer, Fluid Dynamics, Manufacturing Processes, System Dynamics, Simulation Methods, Statics, Strength of Materials, Circuits, Electronics, Kinematics, Introduction to Robotics, Welding Engineering 1, Industrial Robotics, Instrumentation and Measurements, Machine Design",
      gradTitle: "Graduate Study Intent",
      gradPlan: "Applying to Master of Science programs in Controls and Mechanical Systems",
      gradNote: "Applications for Fall 2027",
    },
    experience: [
      { title: "Mechanical Engineering Intern", where: "Integer Technologies, Baton Rouge, Louisiana", dates: "May 2026 to Aug 2026", points: [
        "Designed 3D-printed mounts in Fusion 360 to integrate an acoustic modem, housed in a Blue Robotics watertight enclosure, onto a BlueROV2-based vehicle (BlueLink SARbot) for in-water testing",
        "Developed 4 design concepts, starting from a modular rail mount, then printed and refined 5 to 6 iterations of the final mount in PETG at 100% infill",
        "Designed a Raspberry Pi mount that fits inside the watertight enclosure, refined over 6 versions and printed in PLA",
        "Selected quick-connect bulkheads and cables so the modem connects and disconnects while the vehicle is in the water; the mounts performed well in pool and lake tests",
      ] },
      { title: "Student Researcher", where: "LSU iCORE Lab, Baton Rouge, Louisiana", dates: "Mar 2026 to now", points: [
        "Building a path planner for unmanned surface vessels in simulation, combining artificial potential field and ant colony optimization models to avoid static and moving obstacles",
        "Designed a SolidWorks mount that holds a laser and a depth sensor on a UR5e robot arm to detect surface imperfections on wind turbine blades",
        "Designed the end effector for a 3D-printed 5-DOF mock welding arm and measured 0.83% position error over 5 straight-line runs",
      ] },
      { title: "Math Tutor", where: "LSU Math Lab, Baton Rouge, Louisiana", dates: "Aug 2025 to May 2026", points: [
        "Tutored up to 100 students in college algebra and trigonometry to improve critical thinking and comprehension",
      ] },
      { title: "Volunteer Referee", where: "FIRST LEGO League", dates: "2017 to 2022", points: [
        "Refereed competitions and advised teams on how to improve before their next run",
      ] },
      { title: "Server", where: "Enterrium, Schaumburg, Illinois", dates: "May 2025 to Jan 2026", points: [
        "Maintained an enthusiastic attitude while managing multiple tasks for customer service",
      ] },
      { title: "Server", where: "Texas Roadhouse, Mount Prospect, Illinois", dates: "May 2023 to Aug 2024", points: [
        "Maintained an enthusiastic attitude while managing multiple tasks for customer service",
      ] },
    ],
    skills: [
      { label: "Software", text: "SolidWorks (8 years), Onshape, Fusion 360, Inventor, MATLAB, Python, Robotic Operating System 2 (ROS 2), Arduino IDE, VCarve" },
      { label: "Hardware", text: "Manual Lathe, Haas CNC Router, CNC Router, MIG Welding, 3D Printing (PLA, PETG, Markforged Onyx), Soldering, Drill Press, Miter Saw, Band Saw" },
    ],
    projects: [
      { title: "Senior Design: Electric Boat", dates: "Aug 2026 to May 2027", points: [
        "Team lead for a team of 8 (4 mechanical, 3 electrical, 1 computer engineer) building an electric boat for ASNE's Promoting Electric Propulsion (PEP) national student competition, sponsored by ONR",
        "Designing the custom, jet-ski-inspired hull in SolidWorks",
        "Leading a new team in its first year of competition on a $7,000 budget",
      ] },
      { title: "Mock Welding Robotic Arm", dates: "Mar 2026 to May 2026", points: [
        "Designed the end effector in SolidWorks for a 5-DOF DIY robot arm, on a team of 3 (two mechanical engineers, one computer science student)",
        "3D printed the arm and end effector, and soldered wires to the servo potentiometers so the arm could read its joint positions",
        "Verified the CAD model in simulation software, then measured the real arm: 0.83% position error over 5 straight-line runs",
      ] },
      { title: "Robot Maze Navigation Semester Project for Introduction to Robotics", dates: "Oct 2025 to Dec 2025", points: [
        "Designed a mobile robot base and camera system in SolidWorks and 3D printed them, on a team of 3 (two mechanical engineers, one computer science student)",
        "The robot autonomously navigated and finished the maze using its camera",
      ] },
      { title: "Manufacturing Lab Projects", dates: "Jan 2025 to Apr 2025", points: [
        "Operated a manual lathe to machine a clutch alignment pin to a tolerance of \u00B10.005 inches",
        "MIG welded a steel stool",
        "Programmed and operated a Haas CNC router to cut an aluminum heat exchanger, writing the G-code and tool paths",
      ] },
      { title: "Inclusive Playground, Sophomore Design Course", dates: "Sep 2023 to Dec 2023", points: [
        "Researched existing playgrounds with a team of 6 mechanical engineers and designed one more inclusive for all types of disabilities, following ADA guidelines",
        "Designed the playground model in SolidWorks and combined each team member's parts into the final assembly",
        "Chose aluminum and polyethylene to keep the playground lightweight for easier construction",
      ] },
      { title: "WildStang Robotics Team, FIRST Robotics Competition", dates: "Aug 2018 to May 2022", points: [
        "Primary team lead junior and senior years (co-lead sophomore year) and a driver all four years, on a team of about 80",
        "Won 4 of the 5 regional competitions attended, plus an at-home challenge during COVID",
        "Led design, manufacturing, and assembly of 5 robots over 4 years, including designing the drive base and gearbox; 95% of the 2020 robot was manufactured in house",
        "Led CAD design using SolidWorks and Onshape while teaching younger team members CAD and power tools (hand lathes, drills, miter saws, band saws)",
        "Managed project timelines and coordinated with each sub-team so each robot was working within the 8-week build season",
        "Ran the team's CNC router using VCarve and 3D printed Onyx parts on Markforged 3D printers",
        "Designed, modeled, and assembled a new workshop storage system in Onshape so essentials could be moved easily for competitions",
      ] },
    ],
  },

  /* ---------- Numbers strip (big dot-matrix numbers under the hero) ----------
     "pre" is small text above the number, "unit" is small blue text after it.
     "since" counts the years since then on its own, so it never goes out of date.
     "spoken" is what screen readers say instead (so "4/5" isn't read as a date).
     Only real numbers from his resume and his answers. */
  numbers: [
    { pre: "",      since: 2018,    unit: "yrs", label: "using SolidWorks" },   // he started in 2018
    { pre: "",      value: "5",     unit: "",    label: "competition robots built with WildStang" },
    { pre: "",      value: "4/5",   unit: "",    label: "regionals won with WildStang", spoken: "4 of 5" },
    { pre: "",      value: "4",     unit: "yrs", label: "as a FIRST Robotics Competition driver" },
  ],

  /* ---------- About ----------
     Each string is one paragraph. DRAFT: have him rewrite in his own voice. */
  about: [
    "I started using SolidWorks in 2018 on my high school FIRST Robotics Competition team, WildStang. " +
      "Over four years I built five robots with the team, drove every season, and was the team's primary lead my junior and senior years. " +
      "What I like best is taking a design off the screen and into something I can wire up and test.",
    "Now I'm a mechanical engineering senior at LSU with a minor in robotics, graduating in May 2027. " +
      "In the iCORE Lab I'm building a path planner for unmanned surface vessels, focused on avoiding hazards. " +
      "In summer 2026 at Integer Technologies, I designed the 3D-printed mounts that hold an acoustic modem on a BlueROV2-based vehicle, and they worked well in pool and lake tests. " +
      "I'm applying to M.S. programs in controls and mechanical systems for Fall 2027.",
  ],

  /* ---------- Featured project (the big card at the top of Projects) ----------
     MEDIA, in order of priority (the first one that's filled in is shown):
       video:  a short muted loop, e.g. "assets/video/rov-test.mp4" (keep it under ~8 MB).
               Optional with it: videoWebm (the same clip as a WebM), image (a still frame
               shown before it plays), and mediaTag (the label after "Fig. 0N /", e.g. "Simulation").
       image:  a photo, e.g. "assets/img/rov.jpg" (also fill in imageAlt)
       art:    a line drawing from assets/js/drawings.js: rov, arm, maze, lathe, playground, frc, boat, turbine
     The drawings are ILLUSTRATIONS (labeled "Fig. 01 / Illustration" and so on), not his actual
     CAD. Replace them with his photos or SolidWorks renders when we get them.
     "callouts" are the numbered labels on the drawing, in order. */
  featured: {
    title: "Acoustic Modem Mount for a BlueROV2",
    shortLabel: "BlueROV2 mount",            // its name on the Skills tags
    org: "Integer Technologies",
    dates: "May 2026 to Aug 2026",
    hook: "A BlueLink SARbot, an underwater vehicle built on the BlueROV2, needed an acoustic modem for in-water testing. The modem sits in a watertight enclosure from Blue Robotics. I designed both 3D-printed parts: the mount that holds the enclosure on the vehicle, and a Raspberry Pi mount that fits inside it.",
    points: [
      "Designed both mounts in Fusion 360",
      "Started with a modular rail concept, like a rifle scope mount, so different modems could slide on and off, then refined it into the final design",
      "Iterated through 4 design versions, then printed and refined 5 to 6 iterations of the final design",
      "Printed the final mount in PETG at 100% infill",
      "Designed the Raspberry Pi mount that fits inside the watertight enclosure, refining it over 6 versions, each built on the last, and printed it in PLA with 3 walls and honeycomb infill",
      "Chose quick-connect bulkheads and cables so the modem connects and disconnects while the vehicle is in the water",
    ],
    result: "In pool and lake tests, the printed mounts worked well in the water, and the quick-connect bulkheads worked in and out of it.",
    tools: ["Fusion 360", "PLA", "PETG", "BlueROV2"],
    // Spec table on the card, like the parts list on a drawing. When filled in,
    // it shows instead of the tool pills. Delete a row to drop it.
    specs: [
      { label: "Role", value: "Mechanical Engineering Intern" },
      { label: "CAD", value: "Fusion 360" },
      { label: "Materials", value: "PLA, PETG" },
      // QUESTION: confirm the SARbot is BlueROV2 Heavy based (BlueLink says its systems are modified BlueROV2 Heavy vehicles)
      { label: "Vehicle", value: "BlueLink SARbot (BlueROV2 Heavy based)" },
    ],
    art: "rov",
    callouts: ["3D-printed mount", "Acoustic modem in a watertight enclosure", "Cable into the vehicle"],
    video: "",
    image: "",
    imageAlt: "",
    // Tabs above the picture area. The first tab is the usual media (here, the line
    // drawing); each other tab is a set of photos with captions, shown one at a time
    // with arrows. The count, like "Photos (2)", is added on its own.
    // Integer approved these photos (Oct 2026).
    tabs: [
      { label: "Drawing" },
      { label: "Photos", photos: [
        { image: "assets/img/rov-sarbot-mount.jpg", caption: "The mount on the SARbot.",
          alt: "The SARbot, a yellow and black underwater vehicle, on a table outdoors, with Nicholas's white 3D-printed mount holding the modem's watertight enclosure on top" },
        { image: "assets/img/rov-mount-prototypes.jpg", caption: "Prototype versions of the mounts.",
          alt: "Red, blue, and white 3D-printed prototype mounts spread across a desk" },
      ] },
    ],
  },

  /* ---------- Projects ----------
     Strongest first for a controls reader (path planning, the welding arm, senior
     design), then the rest. "hook" is the one-line intro under the title.
     LAYOUT: "spotlight: 1" and "spotlight: 2" make a full-width card under the featured
     one, in that order, with the picture and text side by side (the sides alternate).
     Every other project goes in the grid of smaller cards, in the order listed here. */
  projects: [
    {
      title: "USV Path Planning",
      timelineLabel: "USV path planning",
      role: "iCORE Lab",
      dates: "Mar 2026 to now",
      hook: "I'm building a path planner for unmanned surface vessels, developing and testing it in simulation.",
      points: [
        "Tuning an artificial potential field model and an ant colony optimization model until each one plans accurately on its own",
        "Next: combining them into one planner that uses a perception system to avoid static and moving obstacles it isn't told about ahead of time, and still reaches the goal by the best path",
      ],
      tools: ["Python", "Matplotlib"],
      // His Matplotlib animation of the potential field model. "image" is the still
      // frame shown before it plays (and with reduced motion). "mediaTag" labels it.
      video: "assets/video/usv-apf.mp4",
      videoWebm: "assets/video/usv-apf.webm",
      image: "assets/video/usv-apf-poster.jpg",
      imageAlt: "Simulation of the artificial potential field model: the agent, a blue dot, moves across an X/Y grid toward the goal, a red star.",
      mediaTag: "Simulation",
      spotlight: 2,                        // second full-width card, after the welding arm
      link: "",
    },
    {
      title: "Mock Welding Robotic Arm",
      timelineLabel: "Welding arm",        // shorter name used on the timeline
      spotlight: 1,                        // first full-width card, right under the featured one
      role: "iCORE Lab",
      dates: "Mar 2026 to May 2026",
      hook: "A 3D-printed 5-DOF arm built for mock welding. I designed the end effector and helped build and wire the arm.",
      points: [
        "Designed the end effector",
        "Verified the CAD model in simulation software, then measured the real arm against it",
        "3D printed the arm and end effector",
        "Soldered wires to the servos' potentiometers so the arm could read its joint positions",
        // QUESTION: Uno R3 or R4? His wiring schematic says R3. Also: what does the Raspberry Pi
        // in the schematic do, and which motor controller board is it?
        "Wired the electronics around an Arduino Uno R4",
      ],
      result: "Measured 0.83% position error over 5 straight-line runs, comparing where the end effector ended up with where it should have been.",
      resumePoints: [
        "Designed the end effector, 3D printed the arm, and soldered wires to the servos' potentiometers to read joint positions",
        "Wired the electronics around an Arduino Uno R4 and verified the CAD model in simulation software",
        "Measured 0.83% position error over 5 straight-line runs against where the end effector should have been",
      ],
      tools: ["3D printing", "Arduino Uno R4", "Soldering"],
      art: "arm",                          // QUESTION: is the "torch" in the drawing a Sharpie standing in for a welding torch?
      callouts: ["End effector", "Servo potentiometers", "Arduino Uno R4"],
      // His real CAD as an interactive 3D model. It replaces the drawing once it loads;
      // the drawing stays if it can't. Rebuilt from his STEP files (see the README).
      model: "assets/models/welding-arm.glb",
      modelTag: "CAD model",               // replaces "Illustration" in the figure label
      modelLabel: "3D CAD model of the welding arm. Press Enter to explode the end effector.",
      modelKey: "End effector (my design)",   // the one key under the model, next to a blue square
      modelHint: "Hover to explode",
      modelHintTouch: "Tap to explode",
      image: "",
      imageAlt: "",
      // the 3D model is the first tab; more tabs (like a wiring diagram) can be added here
      tabs: [
        { label: "3D model" },
        // His wiring schematic, redrawn in assets/js/drawings.js ("wiring"). The labels say
        // only what his drawing shows. QUESTION: Uno R3 or R4 (his drawing says r3)?
        { label: "Wiring", schematic: "wiring", tag: "Schematic",   // tag: the label after "Fig. 0N /"
          hint: "Hover or tap a part to see its connections.",
          hintTouch: "Tap a part to see its connections.",
          notes: {
            pi: "Raspberry Pi: wired to the Arduino Uno",
            arduino: "Arduino Uno: SDA, SCL, 5V, GND, and D2 to the motor controller inputs; wired to the Raspberry Pi",
            controller: "Motor controller: inputs from the Arduino Uno (SDA, SCL, 5V, GND, D2); outputs to 3 MG995 and 2 SG90 servos",
            mg995: "MG995 servo (1 of 3): wired to a motor controller output",
            sg90: "SG90 servo (1 of 2): wired to a motor controller output",
          } },
        { label: "Photo", photos: [
          { image: "assets/img/welding-arm-build.jpg", caption: "The built arm on the lab bench.",
            alt: "The 3D-printed arm in pink on a lab bench, wired to a control board, with its end effector reaching over a checkerboard mat" },
        ] },
      ],
      link: "",
    },
    {
      title: "Senior Design: Electric Boat",
      timelineLabel: "Senior design",
      role: "Team lead, team of 8 (4 mechanical, 3 electrical, 1 computer engineer)",
      dates: "Aug 2026 to May 2027",       // a two-semester course
      // QUESTION: confirm the competition name (he said "Mike Briscoe ASNE ONR national competition")
      hook: "I'm leading a team of 8 building an electric boat with a custom, jet-ski-inspired hull for ASNE's Promoting Electric Propulsion (PEP) competition, a national student competition sponsored by ONR.",
      points: [
        "Designing the custom hull in SolidWorks",
        // QUESTION: confirm "first year" means the team's first year competing (not first-year students)
        "Leading a new team in its first year of competition, on a $7,000 budget",
        "Our design uses a radio frequency controller for communications",   // QUESTION: what does the radio system do?
      ],
      tools: ["SolidWorks"],
      art: "boat",
      callouts: ["Custom hull inspired by a jet ski", "Electric drive", "Radio frequency controller"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Wind Turbine Blade Inspection Mount",
      timelineLabel: "Wind turbine mount",
      role: "iCORE Lab",
      dates: "",                           // QUESTION: when did he work on this?
      hook: "I designed the mount that holds a laser and a depth sensor on a UR5e robot arm, to inspect wind turbine blades.",
      points: [
        "Designed the mount in SolidWorks",
        "The laser projects a grid pattern onto the blade, and the depth sensor uses it to find surface imperfections",
        "A step toward a belt sanding system for the blades",
      ],
      tools: ["SolidWorks", "UR5e"],
      art: "turbine",
      callouts: ["Mount", "Laser projecting a grid pattern", "Depth sensor"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Robot Maze Navigation",
      timelineLabel: "Maze robot",
      role: "Intro to Robotics",
      dates: "Oct 2025 to Dec 2025",
      hook: "An autonomous robot that navigates a maze using a camera. I designed its base and camera system.",
      points: [
        "Designed the base and camera system in SolidWorks, then 3D printed them",
        "Team of 3: two mechanical engineers and one computer science student",
      ],
      result: "The robot finished the maze.",
      tools: ["SolidWorks", "3D printing"],
      art: "maze",
      callouts: ["Printed base and camera system", "Autonomous route"],
      // the line drawing ("art") shows if the photo can't load
      image: "assets/img/maze-robot.jpg",
      imagePosition: "center 44%",         // keeps the whole robot in view when the photo is cropped
      imageAlt: "The maze robot: a blue 3D-printed base with a camera on a raised mount, ultrasonic sensors on the front and side, and wires running to the boards on top",
      // the photo is the first tab; his SolidWorks render is the second
      tabs: [
        { label: "Photo" },
        { label: "CAD model", photos: [
          { image: "assets/img/maze-robot-cad.jpg", caption: "SolidWorks model of the robot.",
            alt: "SolidWorks render of the maze robot: a four-wheeled base with the camera system on a raised deck at the front" },
        ] },
      ],
      link: "",
    },
    {
      title: "Manufacturing Lab Projects",
      timelineLabel: "Manufacturing lab",
      role: "Manufacturing Processes",
      dates: "Jan 2025 to Apr 2025",
      hook: "Shop work on a manual lathe, a MIG welder, and a Haas CNC router.",
      points: [
        "Turned a clutch alignment pin on a manual lathe to ±0.005 in.",
        "MIG welded a steel stool",
        "Wrote G-code and ran a Haas CNC router to cut an aluminum heat exchanger",
      ],
      tools: ["Manual lathe", "MIG welding", "Haas CNC", "G-code"],
      art: "lathe",
      callouts: ["Clutch alignment pin", "Steel stool", "Aluminum heat exchanger"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Inclusive Playground",
      timelineLabel: "Playground",
      role: "Sophomore design course, team of 6 mechanical engineers",
      dates: "Sep 2023 to Dec 2023",
      hook: "A playground designed to ADA guidelines for kids with disabilities.",
      points: [
        "Evaluated existing playground designs against ADA guidelines",
        "Built the SolidWorks model and merged the team's parts into one assembly",
        "Selected aluminum and polyethylene to keep the structure light and easy to build",
      ],
      tools: ["SolidWorks", "ADA guidelines"],
      art: "playground",
      callouts: ["Designed to ADA guidelines", "Light aluminum and polyethylene"],
      image: "",
      imageAlt: "",
      // the line drawing is the first tab; his SolidWorks model is the second
      tabs: [
        { label: "Drawing" },
        { label: "CAD model", photos: [
          { image: "assets/img/playground-cad.jpg", caption: "SolidWorks model of the playground.",
            alt: "SolidWorks model of the playground in purple and gold: a fenced lot with a play structure and a small house with a covered porch" },
        ] },
      ],
      link: "",
    },
    {
      title: "WildStang Robotics",
      timelineLabel: "WildStang",
      role: "Team lead and driver, FIRST Robotics Competition",
      dates: "Aug 2018 to May 2022",
      hook: "Where I learned to design and build a robot on an 8-week deadline, starting in 2018.",
      points: [
        "Built 5 competition robots in 4 years on a team of about 80",
        "Drove in competition all four years as one of the team's two drivers",
        "Co-led the team sophomore year, then was primary team lead junior and senior years",
        "Put in 40 to 50 hours a week in the shop during build season",   // QUESTION: confirm "during build season"
        "Led CAD in SolidWorks and Onshape and trained younger members on CAD and power tools",
        "Kept sub-teams on schedule so each robot was working within the 8-week build season",
        "Ran the team's CNC router using VCarve and printed Onyx parts on Markforged printers",
        "Designed a movable workshop storage system for use at competitions",
      ],
      // a link under the card to the "Five robots, four seasons" strip (robots, below)
      moreLink: { label: "See all 5 robots", href: "#robots" },
      result: "Won 4 of the 5 regional competitions we attended, plus an at-home challenge during COVID.",
      tools: ["SolidWorks", "Onshape", "VCarve", "Markforged"],
      art: "frc",
      callouts: ["CAD in SolidWorks and Onshape", "Onyx parts on Markforged printers", "Built in 8-week seasons"],
      // the line drawing ("art") shows if the photo can't load
      image: "assets/img/wildstang-2022.jpg",
      imageAlt: "WildStang's 2022 robot: a tall robot with hooks on top, a colorful flag, and blue 111 bumpers",
      imageFit: "contain",                 // show the whole robot (the photo has a white background)
      link: "",
    },
  ],

  /* ---------- Five robots, four seasons (WildStang) ----------
     A strip right after the project cards, laid out like the revision block on an
     engineering drawing: REV A for the first robot, REV E for the last. Each panel
     shows a photo, role tags, and a one-line summary; selecting it opens the full
     details ("text") below the strip. "thumb" is the photo on the panel and in the
     details; "image" is the full photo that opens when you tap it.
     fit: "contain" shows a white-background photo whole instead of cropping it. */
  robots: {
    title: "Five robots, four seasons",
    kicker: "WildStang / FIRST Robotics Competition",
    hint: "Swipe to see all 5",              // shown on phones, where the panels scroll sideways
    items: [
      { rev: "A", season: "2019", year: "Freshman", roles: ["Driver"],
        summary: "Built and assembled parts and earned a driver spot as a freshman.",
        text: "Built and assembled parts, learned to run the CNC router, and earned a driver spot as a freshman, which almost never happens.",
        image: "assets/img/wildstang-2019.jpg", thumb: "assets/img/wildstang-2019-thumb.jpg", fit: "contain",   // thumb is cropped around the robot
        alt: "WildStang's 2019 robot: a tall robot with a metal frame tower and blue 111 bumpers, in front of a brick wall" },
      { rev: "B", season: "2020", year: "Sophomore", roles: ["Co-lead", "Driver"],
        summary: "Designed the drive base and gearbox; 95% of the robot was made in house.",
        text: "Designed the drive base and gearbox, led their manufacturing and assembly, and helped manufacture the rest of the robot. We made 95% of it in house, with just the flywheel machined outside. Driver.",
        image: "assets/img/wildstang-2020.jpg", thumb: "assets/img/wildstang-2020-thumb.jpg", fit: "contain",
        alt: "WildStang's 2020 robot: a low robot with a long horizontal arm, a colorful WildStang flag, and blue 111 bumpers" },
      { rev: "C", season: "2021", year: "Junior, COVID season", roles: ["Team lead", "Driver"],
        summary: "Designed the drive base and led manufacturing and assembly for the whole robot.",
        text: "Team lead and the robot's driver. Designed the drive base and led manufacturing and assembly for the whole robot.",
        image: "assets/img/wildstang-2021.jpg", thumb: "assets/img/wildstang-2021-thumb.jpg", fit: "contain",
        alt: "WildStang's 2021 robot: a tall net strung between two posts above blue 111 bumpers" },
      { rev: "D", season: "2021", year: "Junior, second robot", roles: ["Team lead", "Driver"],
        summary: "Led design, machining, and assembly on a team of 20.",
        text: "Team lead and driver on a team of 20. Designed the drive base, led design, machining, and assembly, and took on more project management so I could teach the team what I knew before I left.",
        image: "assets/img/wildstang-2021-second.jpg", thumb: "assets/img/wildstang-2021-second-thumb.jpg", fit: "cover",
        alt: "WildStang's second 2021 robot: clear side panels with pink flags on top, no bumpers, on a gray carpet floor" },
      { rev: "E", season: "2022", year: "Senior", roles: ["Team lead", "Driver"],
        summary: "Led design decisions and mentored younger members.",
        text: "Driver. Led design decisions and mentored younger members, stepping in on the hardest problems. The mentors trusted me to run practices when they were away.",
        image: "assets/img/wildstang-2022.jpg", thumb: "assets/img/wildstang-2022-thumb.jpg", fit: "contain",
        alt: "WildStang's 2022 robot: a tall robot with hooks on top, a colorful flag, and blue 111 bumpers" },
    ],
  },

  /* ---------- Experience ----------
     Most recent first. compact: true shows a job as one short line. */
  experience: [
    {
      role: "Student Researcher",
      org: "LSU iCORE Lab",
      place: "Baton Rouge, LA",
      dates: "Mar 2026 to now",
      // QUESTION: his resume says "a laser camera and an RGB camera", but his answers say
      // "a laser and a depth sensor". The site uses his answers. Which is right?
      points: [
        "Building a path planner for unmanned surface vessels, focused on avoiding nearby hazards (see Projects)",
        "Designed a mount for a laser and a depth sensor on a UR5e robotic arm to find surface imperfections on wind turbine blades (see Projects)",
        "Designed the end effector for a 3D-printed 5-DOF mock welding arm, and helped build and wire the arm (see Projects)",
      ],
    },
    {
      role: "Mechanical Engineering Intern",
      org: "Integer Technologies",
      timelineLabel: "Integer",
      place: "Baton Rouge, LA",
      dates: "May 2026 to Aug 2026",
      points: [
        "Designed and 3D printed the mount that holds an acoustic modem's watertight enclosure on a BlueROV2-based vehicle, plus a Raspberry Pi mount that fits inside the enclosure (see Featured)",
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
      org: "Enterrium and Texas Roadhouse",
      place: "Chicago area",
      dates: "May 2023 to Jan 2026",
      compact: true,
    },
    {
      role: "Volunteer",
      org: "FIRST LEGO League",
      timelineLabel: "FIRST LEGO League",
      dates: "2017 to 2022",
      compact: true,
      // A compact entry can have one short "note" line under it.
      note: "Refereed competitions and advised teams on how to improve before their next run.",
    },
  ],

  /* ---------- Timeline ----------
     Drawn automatically from the dates on projects and jobs. "next" adds a
     dashed bar after graduation. */
  timeline: {
    from: 2017,
    to: 2028,
    cut: 2023,          // years before this are squeezed into a narrow strip
    share: 0.2,         // how much of the width that strip gets
    next: "M.S. (planned)",
  },

  /* ---------- Coursework (scrolls across a blue band) ---------- */
  coursework: [
    "System Dynamics", "Kinematics", "Industrial Robotics", "Instrumentation and Measurements",
    "Machine Design", "Intro to Robotics", "Simulation Methods", "Thermodynamics", "Heat Transfer",
    "Fluid Dynamics", "Manufacturing Processes", "Statics", "Strength of Materials",
    "Circuits", "Electronics", "Welding Engineering",
  ],

  /* ---------- Skills: a bill of materials ----------
     Laid out like the parts list on an engineering drawing. Each tool can have:
       note:   a short line under the tool name (only facts from his resume or answers)
       since:  a start year; shows as "N yrs, since YEAR" and keeps itself up to date
       usedOn: the projects it was used on, by their exact title ("featured" means
               the featured project). These become links to the project cards.
     Tools with no usedOn are listed together on an "Also used" line at the bottom,
     unless they have row: true.
     The resume page lists every tool, grouped the same way. */
  skillsTitle: "Tools and skills, with where each was used",
  skills: [
    { group: "CAD", items: [
      { tool: "SolidWorks", since: 2018, usedOn: ["Senior Design: Electric Boat", "Wind Turbine Blade Inspection Mount", "Robot Maze Navigation", "Inclusive Playground", "WildStang Robotics"] },
      { tool: "Onshape", note: "Led CAD at WildStang", usedOn: ["WildStang Robotics"] },
      { tool: "Fusion 360", usedOn: ["featured"] },
      { tool: "Inventor" },
    ] },
    // QUESTION: where did he use MATLAB and ROS 2? Add those projects to usedOn so the rows link to them.
    { group: "Code and controls", items: [
      { tool: "Python", usedOn: ["USV Path Planning"] },
      { tool: "Matplotlib", usedOn: ["USV Path Planning"] },
      { tool: "Arduino", usedOn: ["Mock Welding Robotic Arm"] },
      { tool: "MATLAB", row: true },        // row: true keeps it in the table even without a project link
      { tool: "ROS 2", row: true },
    ] },
    { group: "Fabrication", items: [
      { tool: "3D printing (PLA, PETG)", usedOn: ["featured", "Mock Welding Robotic Arm", "Robot Maze Navigation"] },
      { tool: "Markforged (Onyx)", usedOn: ["WildStang Robotics"] },
      { tool: "CNC router, VCarve", note: "Ran the team's router", usedOn: ["WildStang Robotics"] },
      { tool: "Haas CNC, G-code", note: "Wrote the G-code", usedOn: ["Manufacturing Lab Projects"] },
      { tool: "Manual lathe", note: "Held \u00B10.005 in.", usedOn: ["Manufacturing Lab Projects"] },
      { tool: "MIG welding", usedOn: ["Manufacturing Lab Projects"] },
      { tool: "Soldering", usedOn: ["Mock Welding Robotic Arm"] },
      { tool: "Drill press" }, { tool: "Band saw" }, { tool: "Miter saw" },
    ] },
  ],
  skillsAlsoLabel: "Also used",
  skillsHint: "Hover a row to highlight those projects. Select a project to jump to it.",   // with a mouse
  skillsHintTouch: "Select a project to jump to it.",                                        // on touch screens

  /* ---------- Off the clock (hobbies) ----------
     Nicholas said yes to this being public (Oct 2026). Shows on a blue panel
     above "Let's talk", with its own menu link. Delete an item to remove it.
     DRAFT wording: have him check it reads like him. */
  hobbies: {
    title: "Off the clock",
    menuLabel: "Off the clock",
    intro:
      "I love learning new things. In 2020, during COVID, I taught myself piano, guitar, " +
      "and drone flying.",
    items: [
      {
        name: "Piano",
        text: "My favorite instrument right now. I've been teaching myself since 2020, and Bach is my favorite composer.",
        keys: true,                        // shows the playable keyboard
        keysHint: "Tap a key, or use A to L",   // small line under the keyboard
      },
      {
        name: "Guitar",
        text: "I've taught myself since 2020, and I have three electrics, an acoustic, and a ukulele. I also played clarinet in my high school band.",
        strings: true,                     // shows six playable strings in standard tuning
        stringsHint: "Strum or tap the strings, or press 1 to 6",   // with a mouse
        stringsHintTouch: "Tap a string, or swipe sideways on it",   // on touch screens
        stringsIdle: "Standard tuning: E A D G B E",   // the tuner readout before a string is played
        stringsLabel: "Playable guitar strings, standard tuning",
      },
      {
        name: "Drone photography",
        text: "I bought my first drone in 2020 and taught myself to fly. I like flying near water in quiet, low-population areas, " +
          "and taking pictures of the sky, nature, and friends around a fire.",
        art: "drone",                      // a drone line drawing (drawings.js) until photos are added
        // Add his photos here and they replace the drawing with a grid styled like a drone
        // camera view (3 to 6 look best). Put files in assets/img/, with their location and
        // camera data stripped first (see the README). Example:
        // { image: "assets/img/drone-1.jpg", alt: "Aerial view of ...", caption: "" },
        photos: [],
      },
    ],
  },

  /* ---------- Contact ---------- */
  contactLine:
    "I'm applying to M.S. programs in controls and mechanical systems for Fall 2027 and am open to research " +
    "and internship roles in robotics and mechanical design. Email is the fastest way to reach me.",
};
