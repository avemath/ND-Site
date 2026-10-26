/* ==========================================================================
   CONTENT FOR NICHOLAS'S SITE
   This is the only file that needs editing to change what the site says.

   HOW TO EDIT
   - Anything in [square brackets] is a placeholder. On the site it shows
     with a red dashed underline so it's easy to spot. Replace it with the
     real info and delete the brackets.
   - To hide a single field, set it to "" (empty quotes).
   - To remove a whole item (a job, a project, a photo), delete everything
     from its opening { to its closing }, plus the comma after it.
   - To add an item, copy an existing one (from { to },) and paste it right
     below, then change the text.
   - Keep the quotes and commas. If the page goes blank after an edit, a
     missing quote or comma is almost always the cause.

   PRIVACY NOTE
   The repo is public, so everything in this file is public too, even the
   comments. Only put things here that Nicholas is fine with anyone seeing.
   ========================================================================== */

window.SITE = {

  /* ---------- Basics ---------- */
  name: "Nicholas [Last name]",            // He prefers "Nicholas", not "Nick"
  discipline: "Mechanical engineering",
  // One or two sentences shown under his name. DRAFT: have him approve the wording.
  tagline:
    "Mechanical engineering senior. I lead my senior design team and I'm building " +
    "path-planning software for ship collision avoidance.",

  // Shown in the title block at the top of the page.
  school: "[University name]",
  graduation: "[May 2027]",                // NOTE: confirm his expected graduation date
  location: "[City, State]",
  lastUpdated: "October 2026",             // Change this whenever the site is updated

  /* ---------- Links ----------
     Leave a link as "" to hide it. */
  links: {
    email: "[his.email@example.com]",
    linkedin: "",                          // e.g. "https://www.linkedin.com/in/his-name"
    github: "",                            // e.g. "https://github.com/his-username"
    // Put his resume PDF in the assets folder with this exact name,
    // or change this path to match. Leave "" to hide the button.
    resume: "assets/resume.pdf",
  },

  /* ---------- About ----------
     Each string is one paragraph. DRAFT: have him rewrite in his own voice. */
  about: [
    "I'm a mechanical engineering student at [University name], graduating in " +
      "[May 2027]. [One sentence on what kind of engineering he likes most, " +
      "e.g. design, controls, manufacturing, robotics.]",
    "This year I'm the team lead on my senior design project, and I'm teaching " +
      "myself Python by building a ship collision avoidance planner from a published " +
      "paper. [One sentence on what kind of role he's looking for after graduation.]",
  ],

  /* ---------- Experience ----------
     Most recent first. "points" are short bullet points. */
  experience: [
    {
      role: "[Job title, e.g. Engineering Intern]",
      org: "Integer Technologies",
      place: "Baton Rouge, LA",
      dates: "[Summer 2026]",               // NOTE: confirm his start and end dates
      points: [
        "[What he worked on]",
        "[A result or skill he got out of it]",
      ],
    },
    // Copy the block above to add another job.
  ],

  /* ---------- Projects ----------
     "image" is optional. Put image files in assets/img/ and use a path like
     "assets/img/capstone.jpg". Leave "" for no picture.
     "link" is optional too (a GitHub repo, a report PDF, a video). */
  projects: [
    {
      title: "Senior design: [project name]",
      role: "Team lead",
      dates: "2026 to 2027",
      summary:
        "[Two or three sentences: what the team is building, who it's for, and " +
        "what he is responsible for as team lead.]",
      tools: "[e.g. SolidWorks, ANSYS, 3D printing]",
      image: "",
      imageAlt: "",
      link: "",
    },
    {
      title: "Ship collision avoidance path planning",
      role: "Personal project",
      dates: "2026",
      summary:
        "A Python implementation of artificial potential field (APF) path planning " +
        "for ship collision avoidance, based on Li et al. (2023), “Optimized " +
        "APF-ACO Algorithm for Ship Collision Avoidance and Path Planning.” " +
        "[One sentence on where it stands now or what it can do.]",
      tools: "Python",
      image: "",
      imageAlt: "",
      // The repo (avemath/apf-ship-collision-avoidance) is private right now.
      // Only add a link once it's public or moved to his own GitHub.
      link: "",
    },
    {
      title: "[Another project: class project, design competition, or build]",
      role: "[His role]",
      dates: "[Year]",
      summary: "[Two or three sentences on what it was and what he did.]",
      tools: "[Tools or methods used]",
      image: "",
      imageAlt: "",
      link: "",
    },
  ],

  /* ---------- Skills ----------
     Each group is a heading with a list. Rename, add, or delete groups freely. */
  skills: [
    { group: "Design and CAD", items: "[e.g. SolidWorks, AutoCAD, GD&T]" },
    { group: "Analysis", items: "[e.g. FEA, MATLAB, thermal analysis]" },
    { group: "Programming", items: "Python (learning)" },
    { group: "Fabrication", items: "[e.g. 3D printing, machining, welding]" },
  ],

  /* ---------- Outside of engineering ----------
     NOTE: check with him that he's comfortable sharing these publicly. */
  outside:
    "I play piano and guitar, fly a drone for aerial photography, and play " +
    "pickleball and chess.",

  /* ---------- Drone photos ----------
     Put photos in assets/img/ and list them here. Leave the list empty, like
     photos: [], to hide this section. */
  photos: [
    { image: "", caption: "[Add a drone photo and a short caption]" },
    { image: "", caption: "[Add a drone photo and a short caption]" },
    { image: "", caption: "[Add a drone photo and a short caption]" },
  ],
};
