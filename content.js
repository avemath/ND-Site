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
   1. BlueROV2: is it the BlueROV2 Heavy configuration?
   2. Integer: are they okay with photos of the BlueROV2 and the mount being public?
   3. Mount: he called it a "rifle scope" style mount. Should the site say that?
   4. "Pi mount": is that a Raspberry Pi, and was it part of the same project?
   5. Buoyancy: it held buoyancy in the pool but not the lake. Should that be mentioned?
   6. ROS 2: what did he use it for?
   7. Senior design: is the competition ASNE's Promoting Electric Propulsion (PEP)?
   8. Senior design: what does the radio frequency controller do?
   9. WildStang: were the 40 to 50 hours a week during build season?
   10. Welding arm: does a Sharpie stand in for the welding torch?
   11. Open to relocating?
   Also new from this round:
   12. Wind turbine mount: when did he work on it? (no dates yet, so it's not on the timeline)
   14. UR5e mount: his resume says "a laser camera and an RGB camera"; his answers say
       "a laser and a depth sensor". The site uses his answers. Which is right?
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
  siteUrl: "https://avemath.github.io/ND-Site/",

  // Under his name at the top. DRAFT: have him approve the wording.
  tagline:
    "I like building things that move, and I've been at it since my first FIRST robot in 2018.",

  // The line with the blinking blue dot. Set to "" to hide it.
  status: "Now: path planning for unmanned surface vessels at the LSU iCORE Lab",
  // A second small line under it, saying what he's looking for. Set to "" to hide it.
  seeking: "Applying to M.S. programs for Fall 2027. Open to research and internship roles.",

  /* ---------- Links ----------
     Leave a link as "" to hide it. */
  links: {
    email: "nmdomke2004@gmail.com",
    linkedin: "https://www.linkedin.com/in/nicholas-domke/",
    github: "",                            // His GitHub (github.com/nmdomke) is empty for now. Add the link once he has projects on it
    // The "Resume" button. resume.html is a printable resume page built from
    // this file, with no phone number. You can also point this at a PDF in the
    // assets folder (e.g. "assets/resume.pdf"), but his current PDF lists his
    // phone number and this repo is public.
    resume: "resume.html",
  },

  // Shown under Education on the printable resume page.
  gradIntent: "Applying to M.S. programs in controls and mechanical systems for Fall 2027",

  /* ---------- Numbers strip (big dot-matrix numbers under the hero) ----------
     "pre" is small text above the number, "unit" is small blue text after it.
     "since" counts the years since then on its own, so it never goes out of date.
     Only real numbers from his resume. */
  numbers: [
    { pre: "",      since: 2018,    unit: "yrs", label: "using SolidWorks" },   // he started in 2018
    { pre: "",      value: "5",     unit: "",    label: "competition robots built with WildStang" },
    // 5 thou = 0.005 in. Written this way because the dot font has no "±" and its decimal point reads poorly.
    { pre: "±",     value: "5",     unit: "thou", label: "tolerance held on a manual lathe (0.005 in.)" },
    { pre: "up to", value: "100",   unit: "",    label: "students tutored in the LSU Math Lab" },
  ],

  /* ---------- About ----------
     Each string is one paragraph. DRAFT: have him rewrite in his own voice. */
  about: [
    "I started using SolidWorks in 2018 on my high school FIRST Robotics Competition team, WildStang. " +
      "Over four years I helped build five robots, drove every season, and was the team's primary lead my junior and senior years. " +
      "What I still like best is taking a design off the screen and into something I can wire up and test.",
    "Now I'm a mechanical engineering senior at LSU with a minor in robotics, graduating in May 2027. " +
      "In the iCORE Lab I work on hazard avoidance and path planning for unmanned surface vessels. " +
      "In summer 2026 at Integer Technologies, I designed the 3D-printed mount that holds an acoustic modem on a BlueROV2. " +
      "After graduation, I'm applying to M.S. programs in controls and mechanical systems for Fall 2027.",
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
    org: "Integer Technologies",
    dates: "May 2026 to Aug 2026",
    hook: "A BlueROV2 needed an acoustic modem for in-water testing. The modem sits in a watertight enclosure from Blue Robotics. I designed the mount that holds it on the vehicle, and picked connectors that disconnect quickly while the vehicle is in the water.",
    points: [
      "Designed the mount in Fusion 360",
      // QUESTION: he called it a "rifle scope" style mount. Should the site say that?
      "Designed 4 versions of the mount and printed 5 to 6 iterations of the final design",
      "Printed the final mount in PETG at 100% infill",
      "Selected cables and connectors that connect and disconnect quickly while the vehicle is in the water",
      // QUESTION: does "Pi" mean Raspberry Pi, and was this part of the same project?
      "Also designed a Raspberry Pi mount through 6 versions, printed in PLA with 3 walls and honeycomb infill",
    ],
    // QUESTION: he said it held buoyancy in the pool but not the lake. Should that be mentioned?
    result: "Tested in a pool and a lake on the BlueROV2. The quick-connect bulkheads worked in and out of the water.",
    tools: ["Fusion 360", "PLA", "PETG", "BlueROV2"],
    // Spec table on the card, like the parts list on a drawing. When filled in,
    // it shows instead of the tool pills. Delete a row to drop it.
    specs: [
      { label: "Role", value: "Mechanical Engineering Intern" },
      { label: "CAD", value: "Fusion 360" },
      { label: "Materials", value: "PLA, PETG" },
      { label: "Vehicle", value: "BlueROV2" },   // QUESTION: is this the BlueROV2 Heavy configuration?
    ],
    art: "rov",
    callouts: ["3D-printed mount", "Acoustic modem in a watertight enclosure", "Cable into the vehicle"],
    video: "",
    image: "",
    imageAlt: "",
    // Optional second photo, shown under the bullets with a small caption.
    // Leave image2 as "" to hide it. Example:
    //   image2: "assets/img/rov-housing-prototypes.jpg",
    //   image2Alt: "3D-printed prototype mounts and clamps in red, blue, and white on a desk",
    //   image2Caption: "Prototype versions of the mount.",
    image2: "",
    image2Alt: "",
    image2Caption: "",
  },

  /* ---------- Projects ----------
     Most recent first. "hook" is the one-line intro under the title. */
  projects: [
    {
      title: "Senior Design: Electric Boat",
      timelineLabel: "Senior design",
      role: "Team lead, team of 8 (4 mechanical, 3 electrical, 1 computer engineer)",
      dates: "Aug 2026 to May 2027",       // a two-semester course
      // QUESTION: confirm the competition name (he said "Mike Briscoe ASNE ONR national competition")
      hook: "An electric boat with a custom hull inspired by a jet ski, for ASNE's Promoting Electric Propulsion (PEP) competition, a national student competition sponsored by ONR.",
      points: [
        "Designing the hull in SolidWorks",
        "Leading the team on a $7,000 budget as a first-year team",
        "Includes a radio frequency controller for communications",   // QUESTION: what does the radio system do?
      ],
      resumePoints: [
        "Leading a first-year team of 8 on a $7,000 budget, building an electric boat for ASNE's PEP competition",
        "Designing a custom hull inspired by a jet ski in SolidWorks",
      ],
      tools: ["SolidWorks"],
      art: "boat",
      callouts: ["Custom hull inspired by a jet ski", "Electric drive", "Radio frequency controller"],
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "USV Path Planning",
      timelineLabel: "USV path planning",
      role: "iCORE Lab",
      dates: "Mar 2026 to now",
      hook: "I'm building a path planner for unmanned surface vessels, in simulation.",
      points: [
        "Tuning an artificial potential field model and an ant colony optimization model so each one works accurately on its own",
        "Next, combining them into one planner that uses a perception system to avoid static and dynamic obstacles that weren't in the simulation, while still reaching the goal by the best path",
      ],
      tools: ["Python", "Matplotlib"],
      // His Matplotlib animation of the potential field model. "image" is the still
      // frame shown before it plays (and with reduced motion). "mediaTag" labels it.
      video: "assets/video/usv-apf.mp4",
      videoWebm: "assets/video/usv-apf.webm",
      image: "assets/video/usv-apf-poster.jpg",
      imageAlt: "Simulation of the artificial potential field model: the agent, a blue dot, moves across an X/Y grid toward the goal, a red star.",
      mediaTag: "Simulation",
      resume: false,                       // already covered under the iCORE Lab job on the resume
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
        "Built toward an eventual belt sanding system for the blades",
      ],
      tools: ["SolidWorks", "UR5e"],
      art: "turbine",
      callouts: ["Mount", "Laser projecting a grid pattern", "Depth sensor"],
      image: "",
      imageAlt: "",
      resume: false,                       // already covered under the iCORE Lab job on the resume
      link: "",
    },
    {
      title: "Mock Welding Robotic Arm",
      timelineLabel: "Welding arm",        // shorter name used on the timeline
      role: "iCORE Lab",
      dates: "Mar 2026 to May 2026",
      hook: "A 3D-printed 5-DOF arm built for mock welding. I designed the end effector and worked on most of the build except the code.",
      points: [
        "Designed the end effector",
        "3D printed the arm and end effector",
        "Soldered wires to the servos' potentiometers to read joint positions",
        "Wired the electronics around an Arduino Uno R4",
        "Put the CAD model into simulation software to check it, then measured the real arm against it",
      ],
      result: "Measured 0.83% position error over 5 straight-line runs, comparing where the end effector ended up with where it should have been.",
      resumePoints: [
        "Designed the end effector, 3D printed the arm, and soldered wires to the servos' potentiometers to read joint positions",
        "Wired the electronics around an Arduino Uno R4 and checked the CAD model in simulation software",
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
      link: "",
    },
    {
      title: "Robot Maze Navigation",
      timelineLabel: "Maze robot",
      role: "Intro to Robotics",
      dates: "Oct 2025 to Dec 2025",
      hook: "An autonomous robot built to navigate a maze using a camera.",
      points: [
        "Designed the base and camera system in SolidWorks, then 3D printed them",
        "Team of 3: two mechanical engineers and one computer science student",
      ],
      result: "Finished the maze.",
      resumePoints: [
        "Designed and 3D printed the base and camera system on a team of 3; the robot finished the maze",
      ],
      tools: ["SolidWorks", "3D printing"],
      art: "maze",
      callouts: ["Printed base and camera system", "Autonomous route"],
      image: "",
      imageAlt: "",
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
      timelineLabel: "WildStang",
      role: "Team lead and driver, FIRST Robotics Competition",
      dates: "Aug 2018 to May 2022",
      hook: "Where I learned to design and build a robot on an 8-week deadline, starting in 2018.",
      points: [
        "Built 5 competition robots in 4 years on a team of about 80",
        "One of the team's two drivers all four years",
        "Co-lead sophomore year, then primary team lead junior and senior years",
        "Spent 40 to 50 hours a week in the shop during build season",   // QUESTION: confirm "during build season"
        "Led CAD in SolidWorks and Onshape and trained younger members on CAD and power tools",
        "Kept sub-teams on schedule so each robot was working within the 8-week build season",
        "Ran the team's CNC router using VCarve and printed Onyx parts on Markforged printers",
        "Designed a movable workshop storage system for use at competitions",
      ],
      // "Robot by robot": a small table inside the card's "+ more" section.
      robots: [
        { season: "2019", year: "Freshman", text: "Manufacturing and assembly. Learned to run the CNC router, and was one of the drivers as a freshman." },
        { season: "2020", year: "Sophomore", text: "Designed the drive base and gearbox and led their manufacturing and assembly. 95% of the robot was made in house; only the flywheel was machined outside. Driver." },
        { season: "2021", year: "Junior, COVID season", text: "Team lead and driver. Designed the drive base and led manufacturing and assembly for the whole robot." },
        { season: "2021", year: "Junior, second robot", text: "Team lead and driver on a team of 20. Designed the drive base, led design, machining, and assembly, and took on more project management to teach the team before I left." },
        { season: "2022", year: "Senior", text: "Driver. Led design decisions and mentored younger members, stepping in on the hard parts. Ran practices when the mentors were away." },
      ],
      result: "Won 4 of the 5 regional competitions we attended, plus an at-home challenge during COVID.",
      // Used on the printable resume page instead of "points" and "result".
      resumePoints: [
        "Primary team lead junior and senior years and one of two drivers all four years, on a team of about 80",
        "Designed the drive base for 3 robots and led their manufacturing and assembly",
        "Won 4 of the 5 regional competitions attended, plus an at-home challenge during COVID",
      ],
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
      // QUESTION: his resume says "a laser camera and an RGB camera", but his answers say
      // "a laser and a depth sensor". The site uses his answers. Which is right?
      points: [
        "Research proximity hazard avoidance and path planning for unmanned surface vessels (see Projects)",
        "Designed a mount for a laser and a depth sensor on a UR5e robotic arm to find surface imperfections on wind turbine blades (see Projects)",
        "Built a 3D-printed 5-DOF robotic arm for mock welding (see Projects)",
      ],
      // Used on the printable resume page (resume.html) instead of "points".
      resumePoints: [
        "Building a USV path planner in Python, tuning potential field and ant colony optimization models",
        "Designed a SolidWorks mount for a laser and depth sensor on a UR5e arm to inspect wind turbine blades",
        // The mock welding arm is left out here: it has its own entry under Projects on the resume.
      ],
    },
    {
      role: "Mechanical Engineering Intern",
      org: "Integer Technologies",
      timelineLabel: "Integer",
      place: "Baton Rouge, LA",
      dates: "May 2026 to Aug 2026",
      points: [
        "Designed and 3D printed the mount that holds an acoustic modem on a BlueROV2 for in-water testing (see Featured)",
      ],
      resumePoints: [
        "Designed a mount in Fusion 360 to integrate an acoustic modem with a BlueROV2 for in-water testing",
        "Designed 4 versions and printed 5 to 6 iterations of the final design; printed the final mount in PETG at 100% infill",
        "Selected quick-connect bulkheads that worked in and out of the water during pool and lake tests",
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
      note: "Refereed competitions and gave teams tips on improving before their next run.",
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

  /* ---------- What I can do (four cards above the skills list) ----------
     Each one is backed by real work from the resume. */
  capabilities: [
    {
      title: "Design",
      proof: [
        "SolidWorks since 2018, plus Onshape, Fusion 360, and Inventor",
        "Led CAD for 5 WildStang competition robots",
        "Designed the BlueROV2 modem mount at Integer",
      ],
    },
    {
      title: "Build",
      proof: [
        "Held \u00B10.005 in. on a manual lathe",
        "MIG welded a steel stool and wrote G-code for a Haas CNC router",
        "3D printed parts in PLA, PETG, and Onyx",
      ],
    },
    {
      title: "Code and controls",
      proof: [
        "Building a path planner for unmanned surface vessels in Python",
        "Tuning artificial potential field and ant colony optimization models in simulation",
        "Wired a 5-DOF arm around an Arduino Uno R4 and measured its position error",
      ],
    },
    {
      title: "Lead and teach",
      proof: [
        "Primary team lead of WildStang, a team of about 80, junior and senior years",
        "Trained younger WildStang members on CAD and power tools",
        "Tutored up to 100 students in the LSU Math Lab",
      ],
    },
  ],

  /* ---------- Skills (spec sheet rows) ---------- */
  skills: [
    { group: "CAD", items: ["SolidWorks (since 2018)", "Onshape", "Fusion 360", "Inventor"] },
    // QUESTION: what did he use ROS 2 for? (He used ROS 2, but not on the UR5e mount.)
    { group: "Code and controls", items: ["Python", "Matplotlib", "ROS 2", "MATLAB", "Arduino"] },
    { group: "Fabrication", items: ["3D printing", "Markforged", "MIG welding", "Manual lathe", "Haas CNC", "G-code", "CNC router", "VCarve", "Drill press", "Band saw", "Miter saw"] },
  ],

  /* ---------- Off the clock (hobbies) ----------
     Nicholas said yes to this being public (Oct 2026). Shows on a blue panel
     above "Let's talk", with its own menu link. Delete an item to remove it.
     DRAFT wording: have him check it reads like him. */
  hobbies: {
    title: "Off the clock",
    menuLabel: "Off the clock",
    intro:
      "I like learning new things. During COVID in 2020, I taught myself piano, guitar, " +
      "and how to fly a drone.",
    items: [
      {
        name: "Piano",
        text: "My favorite instrument right now. I've taught myself since 2020, with no lessons, and Bach is my favorite composer.",
        keys: true,                        // shows the playable keyboard
        keysHint: "Tap a key, or use A to L",   // small line under the keyboard
      },
      {
        name: "Guitar",
        text: "I own three electrics, an acoustic, and a ukulele, and I've taught myself since 2020. I also played clarinet in my high school band.",
      },
      {
        name: "Drone photography",
        text: "I bought my first drone in 2020 and taught myself to fly. I like flying near water in quiet, low-population areas, " +
          "and taking pictures of the sky, nature, and friends around a fire.",
        // Add his photos here and a grid appears. Put files in assets/img/, e.g.
        // { image: "assets/img/drone-1.jpg", alt: "Aerial view of ...", caption: "Baton Rouge, LA" },
        photos: [],
      },
    ],
  },

  /* ---------- Contact ---------- */
  contactLine:
    "I'm applying to M.S. programs in controls and mechanical systems for Fall 2027 and am open to research " +
    "and internship roles in robotics and mechanical design. Email is the fastest way to reach me.",
};
