/* Technical line drawings for each project, used until real photos exist.
   Each drawing is SVG markup on a 400 x 225 canvas plus "anchors": the
   points where numbered callouts sit. The callout TEXT lives in content.js
   (each project's "callouts" list), matched to anchors in order.

   Classes used in the markup:
     ln   = line that draws itself in when the card scrolls into view
     acc  = blue accent (the part Nicholas designed or the key detail)
     fillr = solid accent blue, solid = filled with the card background (hides lines behind)
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

    /* BlueROV2 side view (front is on the right, at the camera dome), with
       Nicholas's 3D-printed mount on top, holding the acoustic modem in its
       watertight Blue Robotics enclosure. Drawn from his photos:
       frame side plate with skids, foam floats with cap plates and lifting eyes,
       ducted thrusters with cone tips, electronics tube, lights, sonar below. */
    rov: {
      box: "26 12 350 202",
      svg:
        '<path class="ln wave" d="' + waves(24, 30, 372) + '"/>' +
        // frame side plate: big cutout, and a bottom rail with bolt holes
        '<path class="ln" d="M66 127 H334 V178 Q334 198 314 198 H86 Q66 198 66 178 Z"/>' +
        '<path class="ln" d="M92 160 Q92 140 112 140 H288 Q308 140 308 160 V166 Q308 184 290 184 H110 Q92 184 92 166 Z"/>' +
        '<path class="ln" d="M84 191 h.1 M108 191 h.1 M132 191 h.1 M156 191 h.1 M180 191 h.1 M204 191 h.1 M228 191 h.1 M252 191 h.1 M276 191 h.1 M300 191 h.1"/>' +
        // bottom skids with windows, and the sonar between them
        '<rect class="ln solid" x="92" y="198" width="100" height="12" rx="2"/>' +
        '<path class="ln" d="M102 202 h20 v4 h-20 z M132 202 h20 v4 h-20 z M162 202 h20 v4 h-20 z"/>' +
        '<rect class="ln solid" x="254" y="198" width="64" height="12" rx="2"/>' +
        '<path class="ln" d="M264 202 h18 v4 h-18 z M292 202 h18 v4 h-18 z"/>' +
        '<rect class="ln solid" x="204" y="192" width="38" height="12" rx="5"/>' +
        // electronics tube with the clear camera dome at the front
        '<rect class="ln solid" x="116" y="153" width="164" height="20" rx="3"/>' +
        '<path class="ln" d="M134 153 V173 M262 153 V173"/>' +
        '<path class="ln" d="M280 153 a12 10 0 0 1 0 20"/>' +
        // thruster shelf running past both ends, with ducted thrusters and cone tips
        '<rect class="ln solid" x="34" y="146" width="332" height="6" rx="2"/>' +
        '<rect class="ln solid" x="38" y="130" width="44" height="16" rx="3"/>' +
        '<path class="ln solid" d="M50 130 L60 113 L70 130 Z"/>' +
        '<rect class="ln solid" x="318" y="130" width="44" height="16" rx="3"/>' +
        '<path class="ln solid" d="M330 130 L340 113 L350 130 Z"/>' +
        // lights at the front corners
        '<circle class="ln solid" cx="326" cy="108" r="4"/>' +
        '<circle class="ln solid" cx="334" cy="186" r="4"/>' +
        // foam float, its black cap plate, and lifting eye bolts
        '<rect class="ln solid" x="84" y="101" width="232" height="26" rx="3"/>' +
        '<rect class="ln solid" x="78" y="96" width="244" height="5" rx="1.5"/>' +
        '<path class="ln" d="M98 96 V91 M302 96 V91"/>' +
        '<circle class="ln" cx="98" cy="86" r="5"/><circle class="ln" cx="302" cy="86" r="5"/>' +
        // bubbles off the front
        '<circle class="ln" cx="368" cy="104" r="3"/><circle class="ln" cx="364" cy="90" r="2"/><circle class="ln" cx="368" cy="79" r="1.5"/>' +
        // cable from the rear end cap down into the vehicle
        '<path class="ln" d="M138 58 C 104 54, 98 82, 120 96"/>' +
        '<path class="ln" d="M138 70 C 116 72, 114 86, 130 96"/>' +
        // acoustic modem in its watertight enclosure: a tube with end caps (not his part)
        '<rect class="ln solid" x="136" y="48" width="12" height="40" rx="3"/>' +
        '<rect class="ln solid" x="146" y="53" width="106" height="30" rx="3"/>' +
        '<path class="ln" d="M146 60 H252 M146 76 H252"/>' +
        '<rect class="ln solid" x="248" y="41" width="22" height="52" rx="4"/>' +
        '<circle class="ln" cx="259" cy="47" r="1.2"/><circle class="ln" cx="259" cy="60" r="1.2"/>' +
        '<circle class="ln" cx="259" cy="74" r="1.2"/><circle class="ln" cx="259" cy="87" r="1.2"/>' +
        // his mount (accent): a base on the float and two clamp rings around the tube
        '<path class="ln acc solid" d="M164 89 L156 96 H244 L236 89 Z"/>' +
        '<rect class="ln acc solid" x="166" y="47" width="16" height="42" rx="4"/>' +
        '<rect class="ln acc solid" x="218" y="47" width="16" height="42" rx="4"/>' +
        '<path class="ln acc" d="M166 53 H182 M166 83 H182 M218 53 H234 M218 83 H234"/>',
      anchors: [[226, 68], [259, 67], [113, 62]],
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
        // limit switches (accent squares at the joints)
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
        // ramp (accent: the accessibility feature)
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
        // carriage (accent) and arm with claw
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
