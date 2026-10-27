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
    "I build things that move, and I've been at it since my first FIRST robot in 2018.",

  // The line with the blinking blue dot. Set to "" to hide it.
  status: "Now: building a path planner for unmanned surface vessels at the LSU iCORE Lab",
  // A second small line under it, saying what he's looking for. Set to "" to hide it.
  seeking: "Applying to M.S. programs for Fall 2027. Open to research and internship roles.",

  /* ---------- Links ----------
     Leave a link as "" to hide it. */
  links: {
    email: "nmdomke2004@gmail.com",
    linkedin: "https://www.linkedin.com/in/nicholas-domke/",
    github: "",                            // Add his GitHub (github.com/nmdomke) here once it has projects on it
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
    // Integer approved these photos (Oct 2026). The line drawing above ("art") shows if a photo can't load.
    image: "assets/img/rov-sarbot-mount.jpg",
    imageAlt: "The SARbot, a yellow and black underwater vehicle, on a table outdoors, with Nicholas's white 3D-printed mount holding the modem's watertight enclosure on top",
    // Optional second photo, shown under the bullets with a small caption. Leave image2 as "" to hide it.
    image2: "assets/img/rov-mount-prototypes.jpg",
    image2Alt: "Red, blue, and white 3D-printed prototype mounts spread across a desk",
    image2Caption: "Prototype versions of the mounts.",
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
      hook: "I'm leading a team of 8 building an electric boat with a custom, jet-ski-inspired hull for ASNE's Promoting Electric Propulsion (PEP) competition, a national student competition sponsored by ONR.",
      points: [
        "Designing the custom hull in SolidWorks",
        "Leading a first-year team on a $7,000 budget",
        "Our design uses a radio frequency controller for communications",   // QUESTION: what does the radio system do?
      ],
      resumePoints: [
        "Leading a first-year team of 8 on a $7,000 budget, building an electric boat for ASNE's PEP competition",
        "Designing the boat's custom, jet-ski-inspired hull in SolidWorks",
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
        "A step toward a belt sanding system for the blades",
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
      hook: "A 3D-printed 5-DOF arm built for mock welding. I designed the end effector and helped build and wire the arm.",
      points: [
        "Designed the end effector",
        "3D printed the arm and end effector",
        "Soldered wires to the servos' potentiometers so the arm could read its joint positions",
        // QUESTION: Uno R3 or R4? His wiring schematic says R3. Also: what does the Raspberry Pi
        // in the schematic do, and which motor controller board is it?
        "Wired the electronics around an Arduino Uno R4",
        "Verified the CAD model in simulation software, then measured the real arm against it",
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
      resumePoints: [
        "Designed and 3D printed the base and camera system on a team of 3; the robot finished the maze",
      ],
      tools: ["SolidWorks", "3D printing"],
      art: "maze",
      callouts: ["Printed base and camera system", "Autonomous route"],
      // the line drawing ("art") shows if the photo can't load
      image: "assets/img/maze-robot.jpg",
      imagePosition: "center 58%",         // keeps the whole robot in view when the photo is cropped
      imageAlt: "The maze robot: a blue 3D-printed base with a camera on a raised mount, ultrasonic sensors on the front and side, and wires running to the boards on top",
      // a smaller second picture under the bullets, with a caption (any project card can have one)
      image2: "assets/img/maze-robot-cad.jpg",
      image2Alt: "SolidWorks render of the maze robot: a four-wheeled base with the camera system on a raised deck at the front",
      image2Caption: "SolidWorks model of the robot.",
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
        "Evaluated existing playground designs against ADA guidelines",
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
        "Drove in competition all four years as one of the team's two drivers",
        "Co-led the team sophomore year, then was primary team lead junior and senior years",
        "Put in 40 to 50 hours a week in the shop during build season",   // QUESTION: confirm "during build season"
        "Led CAD in SolidWorks and Onshape and trained younger members on CAD and power tools",
        "Kept sub-teams on schedule so each robot was working within the 8-week build season",
        "Ran the team's CNC router using VCarve and printed Onyx parts on Markforged printers",
        "Designed a movable workshop storage system for use at competitions",
      ],
      // "Robot by robot": a small table inside the card's "+ more" section. Each row can
      // have a photo: "thumb" is the small one in the table, "image" opens larger.
      robots: [
        { season: "2019", year: "Freshman", text: "Built and assembled parts, learned to run the CNC router, and earned a driver spot as a freshman, which almost never happens.",
          image: "assets/img/wildstang-2019.jpg", thumb: "assets/img/wildstang-2019-thumb.jpg",
          alt: "WildStang's 2019 robot: a tall robot with a metal frame tower and blue 111 bumpers, in front of a brick wall" },
        { season: "2020", year: "Sophomore", text: "Designed the drive base and gearbox, led their manufacturing and assembly, and helped manufacture the rest of the robot. We made 95% of it in house, with just the flywheel machined outside. Driver.",
          image: "assets/img/wildstang-2020.jpg", thumb: "assets/img/wildstang-2020-thumb.jpg",
          alt: "WildStang's 2020 robot: a low robot with a long horizontal arm, a colorful WildStang flag, and blue 111 bumpers" },
        { season: "2021", year: "Junior, COVID season", text: "Team lead and the robot's driver. Designed the drive base and led manufacturing and assembly for the whole robot.",
          image: "assets/img/wildstang-2021.jpg", thumb: "assets/img/wildstang-2021-thumb.jpg",
          alt: "WildStang's 2021 robot: a tall net strung between two posts above blue 111 bumpers" },
        { season: "2021", year: "Junior, second robot", text: "Team lead and driver on a team of 20. Designed the drive base, led design, machining, and assembly, and took on more project management so I could teach the team what I knew before I left.",
          image: "assets/img/wildstang-2021-second.jpg", thumb: "assets/img/wildstang-2021-second-thumb.jpg",
          alt: "WildStang's second 2021 robot: clear side panels with pink flags on top, no bumpers, on a gray carpet floor" },
        { season: "2022", year: "Senior", text: "Driver. Led design decisions and mentored younger members, stepping in on the hardest problems. The mentors trusted me to run practices when they were away.",
          image: "assets/img/wildstang-2022.jpg", thumb: "assets/img/wildstang-2022-thumb.jpg",
          alt: "WildStang's 2022 robot: a tall robot with hooks on top, a colorful flag, and blue 111 bumpers" },
      ],
      result: "Won 4 of the 5 regional competitions we attended, plus an at-home challenge during COVID.",
      // Used on the printable resume page instead of "points" and "result".
      resumePoints: [
        "Led a team of about 80 as primary team lead junior and senior years, and drove in competition all four years",
        "Designed the drive base for 3 robots and led their manufacturing and assembly",
        "Won 4 of the 5 regional competitions attended, plus an at-home challenge during COVID",
      ],
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
        "Designed and 3D printed the mount that holds an acoustic modem's watertight enclosure on a BlueROV2-based vehicle, plus a Raspberry Pi mount that fits inside the enclosure (see Featured)",
      ],
      resumePoints: [
        "Designed 3D-printed mounts in Fusion 360 to hold an acoustic modem's watertight enclosure on a BlueROV2-based vehicle, and a Raspberry Pi inside it",
        "Iterated from a modular rail concept through 4 versions to the final design, printed in PETG at 100% infill",
        "Tested in a pool and a lake; the mounts and quick-connect bulkheads worked in and out of the water",
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

  /* ---------- What I can do (four cards above the skills list) ----------
     Each one is backed by real work from the resume. */
  capabilities: [
    {
      title: "Design",
      proof: [
        "SolidWorks since 2018, plus Onshape, Fusion 360, and Inventor",
        "Led CAD for 5 WildStang competition robots",
        "Designed 3D-printed modem mounts for a BlueROV2-based vehicle at Integer",
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
        "Led WildStang, a team of about 80, as primary team lead junior and senior years",
        "Trained younger WildStang members on CAD and power tools",
        "Tutored up to 100 students in the LSU Math Lab",
      ],
    },
  ],

  /* ---------- Skills (spec sheet rows) ---------- */
  skills: [
    { group: "CAD", items: ["SolidWorks (since 2018)", "Onshape", "Fusion 360", "Inventor"] },
    // QUESTION: what did he use ROS 2 for?
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
