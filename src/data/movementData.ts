export interface MovementTechnique {
  id: string;
  title: string;
  rating: number;
  tag: string;
  purpose: string;
  use: string;
  avoid: string;
  videoSrc?: string;
  videoYoutubeId?: string;
  videoStart?: number;
  videoEnd?: number;
  videoNote?: string;
}

export interface MovementDrill {
  id: string;
  title: string;
  goal: string;
  focus: string;
}

export interface MovementRoute {
  id: string;
  title: string;
  difficulty: number;
  purpose: string;
  risk: string;
  points: string;
}

export interface MovementMistake {
  title: string;
  flags: string[];
  result: string;
}

export interface MovementGuide {
  intro: string;
  techniques: MovementTechnique[];
  drills: MovementDrill[];
  routes: MovementRoute[];
  mistakes: MovementMistake[];
  coachNotes: string[];
}

const scout: MovementGuide = {
  intro:
    "Scout movement is built around changing direction before enemies can settle their crosshair. The goal is not only speed, but broken rhythm.",
  techniques: [
    {
      id: "double-jump",
      title: "Double Jump",
      rating: 3,
      tag: "Core Skill",
      purpose: "Break enemy tracking.",
      use: "During close-range fights, mid-air dodges, and fast route changes.",
      avoid: "Repeating the same rhythm.",
      videoSrc: "/videos/basics-scout-double-jump.mp4",
    },
    {
      id: "air-strafing",
      title: "Air Strafing",
      rating: 4,
      tag: "Tracking Break",
      purpose: "Change your landing point after the enemy commits their aim.",
      use: "When dodging rockets, pipes, scattergun shots, and Sniper sightlines.",
      avoid: "Holding one direction for the whole jump.",
      videoYoutubeId: "lUPWuaC9n2w",
      videoStart: 192,
      videoEnd: 200,
    },
    {
      id: "short-hops",
      title: "Short Hops",
      rating: 5,
      tag: "Aim Disruption",
      purpose: "Create small vertical changes without spending your full escape.",
      use: "At close range when you need to dodge while keeping your aim stable.",
      avoid: "Jumping on every shot automatically.",
      videoYoutubeId: "lUPWuaC9n2w",
      videoStart: 126,
      videoEnd: 132,
    },
  ],
  drills: [
    {
      id: "double-jump-control",
      title: "Double Jump Control",
      goal: "Change direction twice before landing.",
      focus: "Unpredictability.",
    },
    {
      id: "health-pack-route",
      title: "Health Pack Route",
      goal: "Move between packs without stopping.",
      focus: "Clean exits after pressure.",
    },
    {
      id: "survival-route",
      title: "Survival Route",
      goal: "Cross choke without taking damage.",
      focus: "Timing, cover, and late double jumps.",
    },
  ],
  routes: [
    {
      id: "mid-flank",
      title: "Mid Flank",
      difficulty: 4,
      purpose: "Fast pressure.",
      risk: "High.",
      points: "12,58 31,42 49,33 67,39 86,25",
    },
    {
      id: "safe-rotation",
      title: "Safe Rotation",
      difficulty: 2,
      purpose: "Stay alive.",
      risk: "Low.",
      points: "14,70 30,64 49,62 66,54 84,55",
    },
    {
      id: "escape-route",
      title: "Scout Escape Route",
      difficulty: 3,
      purpose: "Leave after forcing attention.",
      risk: "Medium.",
      points: "80,30 68,45 52,53 33,61 17,72",
    },
  ],
  mistakes: [
    {
      title: "Predictable Jumping",
      flags: ["Same timing", "Same direction", "Same height"],
      result: "Enemies track you before the jump even starts.",
    },
    {
      title: "Empty Double Jump",
      flags: ["Double jumping without pressure", "Landing in the open"],
      result: "Easy tracking.",
    },
    {
      title: "Panic Movement",
      flags: ["Jumping immediately after taking damage", "Running straight to the same pack"],
      result: "Predictable target.",
    },
  ],
  coachNotes: [
    "Good movement is not about moving faster. It is about being harder to hit.",
    "If enemies can predict your next jump, your movement has already failed.",
    "Every jump should have a purpose.",
  ],
};

const movementGuides: Record<string, MovementGuide> = {
  scout,
  soldier: {
    intro:
      "Soldier movement is about turning health into position without wasting the fight. Good jumps create pressure, exits, or height.",
    techniques: [
      {
        id: "rocket-jump",
        title: "Rocket Jump",
        rating: 3,
        tag: "Core Skill",
        purpose: "Take height or start pressure quickly.",
        use: "Before a team push or when rotating to high ground.",
        avoid: "Jumping in with no loaded rockets.",
        videoYoutubeId: "uphATRHKIoo",
        videoStart: 61,
        videoEnd: 69,
      },
      {
        id: "wall-jump",
        title: "Wall Jump",
        rating: 4,
        tag: "Angle Change",
        purpose: "Redirect speed around corners.",
        use: "To enter from unexpected height or escape after damage.",
        avoid: "Scraping walls until you lose momentum.",
        videoYoutubeId: "uphATRHKIoo",
        videoStart: 235,
        videoEnd: 252,
      },
      {
        id: "surfing",
        title: "Damage Surfing",
        rating: 5,
        tag: "Survival",
        purpose: "Use incoming damage to escape.",
        use: "When caught by spam or juggled in a doorway.",
        avoid: "Holding forward into the damage source.",
        videoYoutubeId: "uphATRHKIoo",
        videoStart: 280,
        videoEnd: 290,
      },
    ],
    drills: [
      { id: "low-damage-jumps", title: "Low Damage Jumps", goal: "Reach height while preserving enough HP to fight.", focus: "Efficiency." },
      { id: "jump-exit", title: "Jump Exit", goal: "Bomb a target, fire twice, and leave through a planned route.", focus: "Commitment control." },
      { id: "height-reset", title: "Height Reset", goal: "Rotate between two height positions without touching main spam.", focus: "Map control." },
    ],
    routes: [
      { id: "high-bomb", title: "High Bomb", difficulty: 4, purpose: "Force attention.", risk: "High.", points: "15,68 34,38 53,23 72,34 86,49" },
      { id: "safe-height", title: "Safe Height Rotation", difficulty: 3, purpose: "Keep pressure from height.", risk: "Medium.", points: "12,55 31,47 52,41 70,35 88,39" },
      { id: "rollout-reset", title: "Rollout Reset", difficulty: 2, purpose: "Arrive with health.", risk: "Low.", points: "13,73 29,62 48,58 67,57 84,52" },
    ],
    mistakes: [
      { title: "Health Waste", flags: ["Jumping for no position", "Landing without cover"], result: "You arrive weak and easy to trade." },
      { title: "No Exit Bomb", flags: ["All-in path", "No reload plan"], result: "One pick costs your life every time." },
      { title: "Flat Soldier", flags: ["Walking main only", "Ignoring height"], result: "Enemies dodge splash more easily." },
    ],
    coachNotes: ["A good jump starts before the rocket is fired.", "Height is only valuable if you can keep it or trade it well.", "Do not spend health unless the position pays you back."],
  },
  pyro: {
    intro:
      "Pyro movement is about approach paths, corners, and timing. You win by entering close range without walking through free damage.",
    techniques: [
      {
        id: "corner-burst",
        title: "Corner Burst",
        rating: 5,
        tag: "Core Skill",
        purpose: "Enter flamethrower range safely.",
        use: "When enemies must cross a door or choke.",
        avoid: "Starting too far away.",
        videoYoutubeId: "_1KKWF_aZ74",
        videoStart: 648,
        videoEnd: 656,
      },
      {
        id: "airblast-step",
        title: "Airblast Step",
        rating: 4,
        tag: "Space Control",
        purpose: "Displace enemies while changing your angle.",
        use: "Against bombs, Ubers, and close-range pressure.",
        avoid: "Airblasting without repositioning.",
        videoYoutubeId: "_1KKWF_aZ74",
        videoStart: 391,
        videoEnd: 396,
      },
      {
        id: "flare-peek",
        title: "Flare Peek",
        rating: 5,
        tag: "Poke Route",
        purpose: "Deal damage without overcommitting.",
        use: "When closing distance is unsafe.",
        avoid: "Repeating the same peek.",
        videoYoutubeId: "_1KKWF_aZ74",
        videoStart: 294,
        videoEnd: 299,
      },
    ],
    drills: [
      { id: "cover-chain", title: "Cover Chain", goal: "Move from cover to cover without entering long sightlines.", focus: "Approach timing." },
      { id: "airblast-retreat", title: "Airblast Retreat", goal: "Push one enemy back and leave through cover.", focus: "Survival." },
      { id: "corner-hold", title: "Corner Hold", goal: "Hold a doorway for 20 seconds without overchasing.", focus: "Patience." },
    ],
    routes: [
      { id: "ambush-corner", title: "Ambush Corner", difficulty: 3, purpose: "Close-range surprise.", risk: "Medium.", points: "18,66 32,57 45,48 59,44 76,38" },
      { id: "team-peel", title: "Team Peel Route", difficulty: 2, purpose: "Protect combo.", risk: "Low.", points: "15,53 33,50 50,50 68,51 86,48" },
      { id: "flare-rotate", title: "Flare Rotation", difficulty: 3, purpose: "Keep poke angles moving.", risk: "Medium.", points: "16,35 33,42 50,35 66,43 84,34" },
    ],
    mistakes: [
      { title: "Long Walk In", flags: ["Crossing open space", "No cover chain"], result: "You die before flamethrower range." },
      { title: "Overchase", flags: ["Leaving team", "Following weak targets too far"], result: "Your protection value disappears." },
      { title: "Static Airblast", flags: ["Reflecting in place", "No sidestep"], result: "Enemies adjust and punish the rhythm." },
    ],
    coachNotes: ["Pyro movement is strongest when enemies have to walk into you.", "Corners are your range extender.", "Protecting space is often stronger than chasing damage."],
  },
  demoman: {
    intro:
      "Demoman movement protects reloads and sets up explosive angles. Your feet decide whether your damage controls space or feeds pressure.",
    techniques: [
      {
        id: "sticky-jump",
        title: "Sticky Jump",
        rating: 5,
        tag: "Core Skill",
        purpose: "Rotate or commit faster than enemies expect.",
        use: "For rollout, fast pressure, or emergency exits.",
        avoid: "Landing without loaded damage.",
        videoYoutubeId: "4UHoybB4n-g",
        videoStart: 94,
        videoEnd: 98,
      },
      {
        id: "pipe-strafe",
        title: "Pipe Strafe",
        rating: 3,
        tag: "Aim Stability",
        purpose: "Dodge while keeping pipe aim lined up.",
        use: "In mid-range duels and retreat fights.",
        avoid: "Jumping so much your aim collapses.",
        videoYoutubeId: "4UHoybB4n-g",
        videoStart: 147,
        videoEnd: 152,
      },
      {
        id: "trap-rotate",
        title: "Trap Rotate",
        rating: 4,
        tag: "Space Reset",
        purpose: "Move your threat before enemies clear it.",
        use: "After a trap is seen or a choke changes.",
        avoid: "Defending a dead trap.",
        videoYoutubeId: "scFSL5GCLKk",
        videoStart: 494,
        videoEnd: 499,
      },
    ],
    drills: [
      { id: "two-sticky-route", title: "Two Sticky Route", goal: "Move across mid with two controlled stickies.", focus: "Health economy." },
      { id: "reload-cover", title: "Reload Cover", goal: "Reload behind cover, then re-peek a new angle.", focus: "Pressure rhythm." },
      { id: "trap-fallback", title: "Trap Fallback", goal: "Set a trap, fire pipes, and leave before being rushed.", focus: "Layered space." },
    ],
    routes: [
      { id: "sticky-entry", title: "Sticky Entry", difficulty: 4, purpose: "Fast mid control.", risk: "High.", points: "12,68 28,45 43,27 60,35 83,42" },
      { id: "reload-loop", title: "Reload Loop", difficulty: 2, purpose: "Keep damage online.", risk: "Low.", points: "16,58 32,55 49,47 66,55 84,58" },
      { id: "trap-fallback", title: "Trap Fallback", difficulty: 3, purpose: "Trade space slowly.", risk: "Medium.", points: "82,35 66,43 50,54 34,61 17,69" },
    ],
    mistakes: [
      { title: "Dry Landing", flags: ["No loaded pipes", "No sticky threat"], result: "Enemies rush your landing for free." },
      { title: "Open Reload", flags: ["Reloading in sightline", "No corner"], result: "You lose tempo and health." },
      { title: "Trap Attachment", flags: ["Staying after trap is seen", "No fallback"], result: "The enemy clears you with spam." },
    ],
    coachNotes: ["Movement buys the reload that wins the next fight.", "A trap is a position, not a home.", "Demo is strongest when enemies move through your plan."],
  },
  heavy: {
    intro:
      "Heavy movement is slower, so planning matters more. Good Heavy movement is early rotation, short exposure, and cover discipline.",
    techniques: [
      {
        id: "cover-step",
        title: "Cover Step",
        rating: 5,
        tag: "Core Skill",
        purpose: "Minimize time in Sniper and spam lanes.",
        use: "Before revving and during slow pushes.",
        avoid: "Standing in the open while deciding.",
        videoYoutubeId: "Euk9ueSh7Kk",
        videoStart: 353,
        videoEnd: 360,
      },
      {
        id: "rev-peek",
        title: "Rev Peek",
        rating: 4,
        tag: "Fight Entry",
        purpose: "Start fights ready to deal damage.",
        use: "Around corners with team support.",
        avoid: "Revving so early enemies rotate away.",
        videoYoutubeId: "Euk9ueSh7Kk",
        videoStart: 772,
        videoEnd: 785,
      },
      {
        id: "sandwich-reset",
        title: "Head Glitches",
        rating: 3,
        tag: "Survival",
        purpose: "Recover health without losing the hold.",
        use: "Behind cover after absorbing pressure.",
        avoid: "Eating where splash can reach you.",
        videoYoutubeId: "Euk9ueSh7Kk",
        videoStart: 641,
        videoEnd: 652,
      },
    ],
    drills: [
      { id: "corner-anchor", title: "Corner Anchor", goal: "Hold a short lane while touching cover every few seconds.", focus: "Exposure control." },
      { id: "early-rotate", title: "Early Rotate", goal: "Move to the next hold before the fight fully collapses.", focus: "Timing." },
      { id: "rev-timing", title: "Rev Timing", goal: "Enter a fight already spun up without warning too early.", focus: "Threat timing." },
    ],
    routes: [
      { id: "cover-lane", title: "Cover Lane", difficulty: 2, purpose: "Short sightline pressure.", risk: "Low.", points: "14,62 30,60 46,55 62,56 82,50" },
      { id: "medic-rotate", title: "Medic Rotation", difficulty: 3, purpose: "Protect healing path.", risk: "Medium.", points: "12,45 30,48 50,50 69,47 87,44" },
      { id: "fallback-hold", title: "Fallback Hold", difficulty: 2, purpose: "Reset safely.", risk: "Low.", points: "84,31 68,41 51,51 34,61 16,70" },
    ],
    mistakes: [
      { title: "Late Rotation", flags: ["Moving after team dies", "Crossing last second"], result: "You are too slow to escape." },
      { title: "Open Rev", flags: ["Revving in long sightline", "No cover nearby"], result: "Snipers and spam punish you." },
      { title: "Tunnel Walk", flags: ["Only holding W", "Ignoring flank sound"], result: "You become easy to surround." },
    ],
    coachNotes: ["Heavy does not need flashy movement. He needs early movement.", "Cover is part of your health bar.", "A slow class must make fast decisions."],
  },
  engineer: {
    intro:
      "Engineer movement is about metal, rebuild paths, and staying alive when buildings are pressured. Your route keeps the nest useful.",
    techniques: [
      {
        id: "metal-loop",
        title: "Metal Loop",
        rating: 5,
        tag: "Core Skill",
        purpose: "Keep buildings repaired and upgraded.",
        use: "Between fights and during spam pressure.",
        avoid: "Leaving the nest with no escape.",
        videoYoutubeId: "c977-5lBJu4",
        videoStart: 884,
        videoEnd: 1208,
        videoNote: "Long clip with full explanation (~5+ min). Covers Metal Loop and Rescue Step.",
      },
      {
        id: "rescue-step",
        title: "Rescue Step",
        rating: 4,
        tag: "Save Timing",
        purpose: "Save a building without standing still too long.",
        use: "When spam or Uber pressure starts.",
        avoid: "Waiting until the building is already lost.",
        videoYoutubeId: "c977-5lBJu4",
        videoStart: 884,
        videoEnd: 1208,
        videoNote: "Long clip with full explanation (~5+ min). Covers Metal Loop and Rescue Step.",
      },
      {
        id: "mini-rotate",
        title: "Full Rollout",
        rating: 3,
        tag: "Aggressive Setup",
        purpose: "Move pressure forward quickly.",
        use: "With Gunslinger pressure and flank control.",
        avoid: "Placing minis in the same obvious spot.",
        videoYoutubeId: "Mmgg8fxETlA",
      },
    ],
    drills: [
      { id: "metal-timer", title: "Metal Timer", goal: "Complete a repair loop before pressure returns.", focus: "Resource rhythm." },
      { id: "rebuild-route", title: "Rebuild Route", goal: "Move sentry, dispenser, and teleporter without losing all value.", focus: "Order." },
      { id: "spy-check-loop", title: "Spy Check Loop", goal: "Check common decloak spots while collecting metal.", focus: "Awareness." },
    ],
    routes: [
      { id: "metal-loop", title: "Metal Loop", difficulty: 2, purpose: "Sustain buildings.", risk: "Low.", points: "16,62 31,50 47,58 62,48 79,57" },
      { id: "rebuild-path", title: "Rebuild Path", difficulty: 3, purpose: "Move the nest.", risk: "Medium.", points: "14,72 32,61 50,49 68,40 85,35" },
      { id: "mini-flank", title: "Mini Flank", difficulty: 3, purpose: "Create side pressure.", risk: "Medium.", points: "18,34 35,39 51,33 68,42 86,31" },
    ],
    mistakes: [
      { title: "Static Nest", flags: ["Never rotating", "Repairing doomed buildings"], result: "The enemy clears everything on their timing." },
      { title: "Metal Blindness", flags: ["No pickup route", "Overbuilding"], result: "You cannot repair when pressure arrives." },
      { title: "Unsafe Haul", flags: ["Carrying through main", "No teammate cover"], result: "You lose the building before it matters." },
    ],
    coachNotes: ["Engineer movement is logistics with a shotgun.", "The best nest has a next nest planned.", "Metal routes are movement routes."],
  },
  medic: {
    intro:
      "Medic movement is survival first. Every route should preserve beam uptime, avoid sightlines, and keep a clean escape.",
    techniques: [
      {
        id: "beam-kite",
        title: "Respect an Aid",
        rating: 5,
        tag: "Core Skill",
        purpose: "Heal while staying hard to hit.",
        use: "During spam, bombs, and retreat fights.",
        avoid: "Standing directly behind one teammate forever.",
        videoYoutubeId: "Pf3cvM43ddQ",
        videoStart: 1044,
        videoEnd: 1049,
      },
      {
        id: "damage-surf",
        title: "Damage Surfing",
        rating: 4,
        tag: "Survival",
        purpose: "Turn incoming damage into an escape.",
        use: "When Soldiers, Demos, or Scouts catch you.",
        avoid: "Holding crouch and killing your speed.",
        videoYoutubeId: "Pf3cvM43ddQ",
        videoStart: 1659,
        videoEnd: 1723,
      },
      {
        id: "corner-reset",
        title: "Corner Reset",
        rating: 4,
        tag: "Uber Safety",
        purpose: "Break line of sight before enemies finish you.",
        use: "When low health or holding Uber.",
        avoid: "Peeking the same corner twice.",
        videoYoutubeId: "Pf3cvM43ddQ",
        videoStart: 678,
        videoEnd: 862,
        videoNote: "Long clip (~3 min).",
      },
    ],
    drills: [
      { id: "beam-range", title: "Beam Range Drill", goal: "Keep healing while never entering the front line.", focus: "Spacing." },
      { id: "surf-exit", title: "Surf Exit", goal: "Escape after taking splash instead of stopping.", focus: "Survival reflex." },
      { id: "no-sightline", title: "No Sightline Route", goal: "Cross a map without giving Sniper a clean angle.", focus: "Route planning." },
    ],
    routes: [
      { id: "combo-safe", title: "Combo Safe Route", difficulty: 2, purpose: "Keep heals alive.", risk: "Low.", points: "12,60 30,56 49,53 68,51 86,48" },
      { id: "uber-escape", title: "Uber Escape Route", difficulty: 4, purpose: "Survive after force.", risk: "Medium.", points: "83,34 67,45 50,55 33,62 15,72" },
      { id: "crossbow-angle", title: "Crossbow Angle", difficulty: 3, purpose: "Heal safely from range.", risk: "Medium.", points: "15,42 32,39 49,36 67,39 85,35" },
    ],
    mistakes: [
      { title: "Beam Tunnel", flags: ["Following one pocket blindly", "No escape check"], result: "You die with the player you were healing." },
      { title: "Sightline Repeat", flags: ["Same peek", "Same timing"], result: "Snipers pre-aim your route." },
      { title: "Panic Backpedal", flags: ["Walking backward in open space", "No surf attempt"], result: "Bombers finish you easily." },
    ],
    coachNotes: ["Medic movement is team movement. Your path decides the team's reset.", "Survival is not passive. It is active routing.", "A beam is useful only while the Medic is alive."],
  },
  sniper: {
    intro:
      "Sniper movement is angle discipline. Reposition after information is revealed, and make enemies clear more than one sightline.",
    techniques: [
      {
        id: "counter-peek",
        title: "Counter Peek",
        rating: 5,
        tag: "Core Skill",
        purpose: "Take a shot without giving a free return shot.",
        use: "Against enemy Snipers and spammed doors.",
        avoid: "Wide peeking slowly.",
        videoYoutubeId: "fmVzS5riwX4",
        videoStart: 608,
        videoEnd: 671,
        videoNote: "Long clip (~1 min).",
      },
      {
        id: "angle-shift",
        title: "High Ground",
        rating: 4,
        tag: "Sightline Reset",
        purpose: "Make enemies pre-aim the wrong place.",
        use: "After kills, misses, or being called out.",
        avoid: "Returning to the same pixel every time.",
        videoYoutubeId: "fmVzS5riwX4",
        videoStart: 236,
        videoEnd: 268,
      },
      {
        id: "fallback-step",
        title: "Sensitivity of Position",
        rating: 3,
        tag: "Anti-Flank",
        purpose: "Keep distance from jumpers and Scouts.",
        use: "When flank pressure appears.",
        avoid: "Scoping while already trapped.",
        videoYoutubeId: "fmVzS5riwX4",
        videoStart: 199,
        videoEnd: 235,
      },
    ],
    drills: [
      { id: "one-shot-move", title: "One Shot Move", goal: "Take one shot, then change your angle.", focus: "Discipline." },
      { id: "peek-width", title: "Peek Width", goal: "Expose only enough body to see the lane.", focus: "Safety." },
      { id: "flank-reset", title: "Flank Reset", goal: "Leave the sightline before the flanker reaches you.", focus: "Awareness." },
    ],
    routes: [
      { id: "sightline-shift", title: "Sightline Shift", difficulty: 3, purpose: "Create a new pick angle.", risk: "Medium.", points: "15,44 31,40 49,35 67,39 85,33" },
      { id: "safe-fallback", title: "Safe Fallback", difficulty: 2, purpose: "Avoid flank pressure.", risk: "Low.", points: "84,39 68,48 51,55 34,61 16,68" },
      { id: "counter-angle", title: "Counter-Sniper Angle", difficulty: 4, purpose: "Duel without repeating.", risk: "High.", points: "13,31 29,37 47,30 66,36 86,28" },
    ],
    mistakes: [
      { title: "Static Scope", flags: ["Same sightline", "Same crouch timing"], result: "Enemies prefire or counter-snipe you." },
      { title: "Greedy Hold", flags: ["Staying after being called", "Ignoring flank"], result: "You get rushed before the next pick." },
      { title: "Wide Peek", flags: ["Too much body exposed", "Slow strafe"], result: "You lose duels you could avoid." },
    ],
    coachNotes: ["Sniper movement is measured in angles, not distance.", "A missed shot is information. Move.", "Make the enemy clear the map, not one doorway."],
  },
  spy: {
    intro:
      "Spy movement is route timing, sound discipline, and exits. The best path makes the enemy look somewhere else before you appear.",
    techniques: [
      {
        id: "cloak-route",
        title: "Redirection",
        rating: 5,
        tag: "Core Skill",
        purpose: "Enter through blind zones.",
        use: "Before a pick, sap, or information play.",
        avoid: "Decloaking where enemies naturally turn.",
        videoYoutubeId: "ZsmZopQMUBg",
        videoStart: 412,
        videoEnd: 509,
        videoNote: "Long clip (~1.5 min).",
      },
      {
        id: "decloak-step",
        title: "Decloak Step",
        rating: 4,
        tag: "Sound Control",
        purpose: "Start the play from a safe pocket.",
        use: "Behind cover, noise, or team pressure.",
        avoid: "Decloaking in empty silence near aware players.",
        videoYoutubeId: "ZsmZopQMUBg",
        videoStart: 56,
        videoEnd: 202,
        videoNote: "Long clip (~2.5 min).",
      },
      {
        id: "escape-chain",
        title: "Escape Chain",
        rating: 4,
        tag: "Reset Route",
        purpose: "Leave after the first pick.",
        use: "After stabbing, sapping, or being spotted.",
        avoid: "Running straight back through the same door.",
        videoYoutubeId: "ZsmZopQMUBg",
        videoStart: 348,
        videoEnd: 410,
      },
    ],
    drills: [
      { id: "silent-entry", title: "Silent Entry", goal: "Reach the backline without bumping players.", focus: "Pathing." },
      { id: "decloak-map", title: "Decloak Map", goal: "Mark three safe decloak spots per map.", focus: "Preparation." },
      { id: "pick-exit", title: "Pick Exit", goal: "Stab, cloak, and exit through a different route.", focus: "Reset discipline." },
    ],
    routes: [
      { id: "backline-entry", title: "Backline Entry", difficulty: 4, purpose: "Reach priority targets.", risk: "High.", points: "14,70 29,57 46,45 65,36 85,27" },
      { id: "safe-decloak", title: "Safe Decloak Route", difficulty: 3, purpose: "Start unseen.", risk: "Medium.", points: "17,54 33,50 50,43 66,45 83,39" },
      { id: "escape-chain", title: "Escape Chain", difficulty: 4, purpose: "Reset after pick.", risk: "Medium.", points: "82,31 70,45 54,54 36,62 17,72" },
    ],
    mistakes: [
      { title: "Loud Decloak", flags: ["No cover", "No fight noise"], result: "The target turns before you act." },
      { title: "Straight Escape", flags: ["Same door out", "No cloak route"], result: "Enemies follow and clean you up." },
      { title: "Route Impatience", flags: ["Entering too early", "Forcing watched stabs"], result: "You feed information instead of pressure." },
    ],
    coachNotes: ["Spy movement is strongest when it follows someone else's distraction.", "The exit matters as much as the stab.", "A good route makes the pick feel inevitable."],
  },
};

export const getMovementGuide = (classId: string): MovementGuide => movementGuides[classId] ?? scout;
