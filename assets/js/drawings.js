/* Technical line drawings for each project, used until real photos exist.
   Each drawing is SVG markup on a 400 x 225 canvas plus "anchors": the
   points where numbered callouts sit. The callout TEXT lives in content.js
   (each project's "callouts" list), matched to anchors in order.

   Classes used in the markup:
     ln   = line that draws itself in when the card scrolls into view
     acc  = red accent (the part Nicholas designed or the key detail)
     fillr = solid red, solid = filled with the card background (hides lines behind)
     cl   = thin dashed construction / center line
     lbl  = small mono label */
(function () {
  "use strict";

  function waves(y, from, to) {
    var d = "M" + from + " " + y;
    for (var x = from; x < to; x += 20) d += " q5 -5 10 0 t10 0";
    return d;
  }

  window.DRAWINGS = {

    /* BlueROV2 side view with the acoustic modem housing on top */
    rov: {
      box: "28 14 352 190",
      svg:
        '<path class="ln wave" d="' + waves(26, 30, 380) + '"/>' +
        // frame side plate
        '<rect class="ln" x="78" y="96" width="236" height="92" rx="14"/>' +
        '<rect class="ln" x="96" y="160" width="40" height="16" rx="8"/>' +
        '<rect class="ln" x="256" y="160" width="40" height="16" rx="8"/>' +
        // vertical thrusters on top
        '<rect class="ln solid" x="104" y="82" width="34" height="14" rx="3"/>' +
        '<rect class="ln solid" x="254" y="82" width="34" height="14" rx="3"/>' +
        '<path class="ln" d="M110 89 H132 M260 89 H282"/>' +
        // electronics tube with clear dome and camera
        '<rect class="ln solid" x="112" y="112" width="182" height="34" rx="4"/>' +
        '<path class="ln" d="M294 112 a17 17 0 0 1 0 34"/>' +
        '<circle class="ln" cx="302" cy="129" r="5"/>' +
        '<path class="ln" d="M140 112 V146 M266 112 V146"/>' +
        // battery tube
        '<rect class="ln solid" x="152" y="150" width="104" height="20" rx="4"/>' +
        // vectored thrusters, front and back
        '<g transform="translate(330 176) rotate(-28)"><rect class="ln solid" x="-17" y="-10" width="34" height="20" rx="5"/><path class="ln" d="M-9 0 H9"/></g>' +
        '<g transform="translate(62 176) rotate(28)"><rect class="ln solid" x="-17" y="-10" width="34" height="20" rx="5"/><path class="ln" d="M-9 0 H9"/></g>' +
        // bubbles
        '<circle class="ln" cx="352" cy="150" r="3"/><circle class="ln" cx="362" cy="136" r="2"/><circle class="ln" cx="368" cy="124" r="1.5"/>' +
        // modem housing + mount (red, his design)
        '<rect class="ln acc solid" x="166" y="88" width="64" height="8" rx="2"/>' +
        '<path class="ln acc" d="M176 88 L184 78 M220 88 L212 78"/>' +
        '<rect class="ln acc solid" x="180" y="44" width="36" height="36" rx="6"/>' +
        '<path class="ln acc" d="M180 56 H216 M180 68 H216"/>' +
        '<path class="ln acc" d="M188 44 a10 8 0 0 1 20 0"/>' +
        // cable with quick-disconnect
        '<path class="ln acc" d="M216 62 C 248 62, 262 82, 262 112"/>' +
        '<rect class="fillr" x="243" y="68" width="10" height="7" rx="1.5" transform="rotate(35 248 71.5)"/>',
      anchors: [[198, 52], [198, 92], [250, 74]],
    },

    /* 5-DOF arm doing a mock weld */
    arm: {
      box: "14 38 372 166",
      svg:
        '<path class="ln" d="M24 192 H376"/>' +
        // workpiece and weld bead
        '<rect class="ln" x="228" y="172" width="120" height="20" rx="2"/>' +
        '<path class="ln acc" style="stroke-width:3.5" d="M236 172 H284"/>' +
        // sparks
        '<path class="ln acc" d="M292 168 l10 -8 M294 172 l14 -2 M289 166 l2 -12 M286 168 l-8 -8"/>' +
        // Arduino board + wire
        '<rect class="ln" x="28" y="116" width="44" height="30" rx="3"/>' +
        '<path class="ln" d="M34 122 h4 m4 0 h4 m4 0 h4 m4 0 h4 M34 140 h14"/>' +
        '<path class="ln cl" d="M72 140 C 82 140, 84 168, 92 172"/>' +
        // base and turntable
        '<rect class="ln" x="76" y="172" width="64" height="20" rx="3"/>' +
        '<rect class="ln solid" x="86" y="160" width="44" height="12" rx="3"/>' +
        '<path class="ln" d="M96 160 L101 146 M120 160 L115 146"/>' +
        // links drawn as outlined bars
        '<path class="ln link" d="M108 140 L180 72"/><path class="link-in" d="M108 140 L180 72"/>' +
        '<path class="ln link" d="M180 72 L268 98"/><path class="link-in" d="M180 72 L268 98"/>' +
        '<path class="ln link thin" d="M268 98 L284 128"/><path class="link-in thin" d="M268 98 L284 128"/>' +
        // joints
        '<circle class="ln solid" cx="108" cy="140" r="12"/><circle class="ln" cx="108" cy="140" r="3"/>' +
        '<circle class="ln solid" cx="180" cy="72" r="11"/><circle class="ln" cx="180" cy="72" r="3"/>' +
        '<circle class="ln solid" cx="268" cy="98" r="8"/>' +
        // limit switches (red squares at the joints)
        '<rect class="fillr" x="118" y="122" width="7" height="7" rx="1"/>' +
        '<rect class="fillr" x="188" y="56" width="7" height="7" rx="1"/>' +
        // end effector: torch
        '<path class="ln acc solid" d="M278 126 L292 124 L296 156 L284 158 Z"/>' +
        '<path class="ln acc" d="M287 158 L290 166 L293 157"/>',
      anchors: [[290, 140], [121, 125], [50, 131]],
    },

    /* Maze: built from a grid, the solution path draws in and the robot follows it */
    maze: {
      grid: [
        "#######################",
        "#S....#.........#.....#",
        "#.###.#.#######.#.###.#",
        "#.#...#.#.....#...#...#",
        "#.#.###.#.###.#####.###",
        "#.#.....#.#...#.....#.#",
        "#.#######.#.###.###.#.#",
        "#.........#.....#....E#",
        "#######################",
      ],
      anchors: "robot",   // set by the maze builder in render.js
    },

    /* Three parts, three machines */
    lathe: {
      box: "4 50 392 170",
      svg:
        // lathe pin drawing
        '<path class="ln cl" d="M14 110 H128"/>' +
        '<path class="ln" d="M24 90 H62 V96 H112 L118 102 V118 L112 124 H62 V130 H24 Z"/>' +
        '<path class="ln" d="M24 90 V130 M62 96 V124"/>' +
        '<path class="ln acc" d="M62 74 H118 M62 70 V80 M118 70 V80"/>' +
        '<text class="lbl acc-t" x="90" y="66" text-anchor="middle">±.005</text>' +
        // stool
        '<path class="ln" style="stroke-width:3" d="M162 84 H238"/>' +
        '<path class="ln" d="M170 86 L156 182 M230 86 L244 182 M190 86 L184 182 M210 86 L216 182"/>' +
        '<path class="ln" d="M164 140 H236"/>' +
        '<circle class="fillr" cx="170" cy="86" r="3"/><circle class="fillr" cx="230" cy="86" r="3"/>' +
        '<circle class="fillr" cx="164" cy="140" r="3"/><circle class="fillr" cx="236" cy="140" r="3"/>' +
        // heat exchanger plate with CNC toolpath
        '<rect class="ln" x="276" y="72" width="108" height="108" rx="6"/>' +
        '<circle class="ln" cx="288" cy="84" r="3"/><circle class="ln" cx="372" cy="84" r="3"/>' +
        '<circle class="ln" cx="288" cy="168" r="3"/><circle class="ln" cx="372" cy="168" r="3"/>' +
        '<path class="ln acc" d="M296 92 H364 V108 H296 V124 H364 V140 H296 V156 H364"/>' +
        '<text class="lbl" x="71" y="208" text-anchor="middle">LATHE</text>' +
        '<text class="lbl" x="200" y="208" text-anchor="middle">MIG WELDER</text>' +
        '<text class="lbl" x="330" y="208" text-anchor="middle">CNC ROUTER</text>',
      anchors: [],
    },

    /* Playground with an ADA ramp, tower, slide and swings */
    playground: {
      box: "6 54 388 148",
      svg:
        '<path class="ln" d="M12 192 H388"/>' +
        // ramp (red: the accessibility feature)
        '<path class="ln acc" style="stroke-width:3" d="M28 190 L112 132"/>' +
        '<path class="ln acc" d="M28 168 L112 110 M40 182 V160 M70 161 V139 M100 140 V118"/>' +
        // tower
        '<path class="ln" d="M112 190 V100 M172 190 V100"/>' +
        '<rect class="ln" x="108" y="128" width="68" height="6" rx="1"/>' +
        '<path class="ln" d="M100 100 L142 66 L184 100 Z"/>' +
        '<path class="ln" d="M112 116 H172 M112 128 V116 M128 128 V116 M144 128 V116 M160 128 V116"/>' +
        // slide
        '<path class="ln" d="M176 132 C 210 136, 222 186, 262 188"/>' +
        '<path class="ln" d="M176 122 C 214 126, 228 178, 264 178"/>' +
        // swings
        '<path class="ln" d="M296 70 H372 M300 70 L284 190 M300 70 L316 190 M368 70 L352 190 M368 70 L384 190"/>' +
        '<path class="ln cl" d="M318 72 V150 M332 72 V150 M342 72 V150 M356 72 V150"/>' +
        '<rect class="fillr" x="315" y="150" width="20" height="5" rx="1"/>' +
        '<rect class="fillr" x="339" y="150" width="20" height="5" rx="1"/>',
      anchors: [[70, 150], [172, 160], [222, 160]],
    },

    /* FIRST competition robot: drivetrain, bumpers, elevator, claw holding a game piece */
    frc: {
      box: "40 16 300 194",
      svg:
        '<path class="ln" d="M44 198 H336"/>' +
        // elevator tower
        '<path class="ln" d="M150 128 V30 M172 128 V30 M146 30 H176 M150 80 L172 56"/>' +
        '<circle class="ln" cx="161" cy="120" r="6"/>' +
        // carriage (red) and arm with claw
        '<rect class="ln acc solid" x="140" y="48" width="42" height="24" rx="3"/>' +
        '<path class="ln" d="M182 60 H236"/>' +
        '<path class="ln acc" d="M234 50 H258 L266 58 M234 82 H258 L266 74"/>' +
        '<rect class="ln solid" x="240" y="56" width="22" height="22" rx="2"/>' +
        // electronics and battery
        '<rect class="ln" x="94" y="110" width="44" height="18" rx="2"/>' +
        '<path class="ln" d="M100 116 h8 m4 0 h8 m4 0 h8"/>' +
        '<rect class="ln" x="196" y="110" width="38" height="18" rx="2"/>' +
        // chassis and wheels
        '<rect class="ln" x="78" y="128" width="204" height="22" rx="2"/>' +
        '<circle class="ln" cx="104" cy="184" r="13"/><circle class="ln" cx="180" cy="184" r="13"/><circle class="ln" cx="256" cy="184" r="13"/>' +
        // bumpers with the team name
        '<rect class="ln acc bumper" x="68" y="148" width="224" height="26" rx="11"/>' +
        '<text class="lbl bump-t" x="180" y="165" text-anchor="middle">WILDSTANG</text>',
      anchors: [[161, 38], [161, 60], [86, 139]],
    },
  };
})();
