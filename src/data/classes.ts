export type ClassRole = "Offense" | "Defense" | "Support";

export interface TFClass {
  id: string;
  name: string;
  role: ClassRole;
  team: "red" | "blu";
  tagline: string;
  hp: number;
  speed: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  color: string; // HSL token reference
  description: string;
}

export const TF_CLASSES: TFClass[] = [
  { id: "scout", name: "Scout", role: "Offense", team: "red", tagline: "Too. Much. Caffeine.", hp: 125, speed: "133%", difficulty: 3, color: "skill-intermediate", description: "The fastest class. Scout creates space by forcing enemies to look away from the main fight." },
  { id: "soldier", name: "Soldier", role: "Offense", team: "blu", tagline: "Sir, yes Sir!", hp: 200, speed: "80%", difficulty: 3, color: "primary", description: "A high-impact damage class. Rocket jumping and splash damage define most Soldier play." },
  { id: "pyro", name: "Pyro", role: "Offense", team: "red", tagline: "Mhmph mhmm!", hp: 175, speed: "100%", difficulty: 2, color: "destructive", description: "A close-range control class that ambushes enemies, denies projectiles, and protects teammates." },
  { id: "demoman", name: "Demoman", role: "Defense", team: "blu", tagline: "Kaboom, baby!", hp: 175, speed: "93%", difficulty: 3, color: "secondary", description: "An explosive area-control class that locks down chokes with stickies and punishes grouped enemies." },
  { id: "heavy", name: "Heavy", role: "Defense", team: "red", tagline: "POW! Haha!", hp: 300, speed: "77%", difficulty: 1, color: "destructive", description: "The tankiest class. Heavy anchors space with huge health and steady Minigun pressure." },
  { id: "engineer", name: "Engineer", role: "Defense", team: "blu", tagline: "Pardner, that thing's just sad.", hp: 125, speed: "100%", difficulty: 3, color: "accent", description: "A builder and support class that turns map space into team value with Sentries, Dispensers, and Teleporters." },
  { id: "medic", name: "Medic", role: "Support", team: "red", tagline: "Heaven is a place on Earth.", hp: 150, speed: "107%", difficulty: 4, color: "skill-beginner", description: "The team sustain class. Medic keeps teammates alive and decides pushes with UberCharge." },
  { id: "sniper", name: "Sniper", role: "Support", team: "blu", tagline: "Wave goodbye to yer head, wanker.", hp: 125, speed: "100%", difficulty: 4, color: "skill-beginner", description: "A long-range pick class that creates space by threatening key targets from distance." },
  { id: "spy", name: "Spy", role: "Support", team: "red", tagline: "I never really was on your side.", hp: 125, speed: "100%", difficulty: 5, color: "secondary", description: "A backline disruption class that gathers information, saps buildings, and punishes isolated targets." },
];

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface Guide {
  id: string;
  classId: string;
  title: string;
  level: SkillLevel;
  category: string;
  excerpt: string;
  author: string;
  reads: number;
}

export const RECENT_GUIDES: Guide[] = [
  { id: "g1", classId: "soldier", title: "Mastering the Rocket Jump", level: "intermediate", category: "Movement", excerpt: "From basic jumps to sync jumps and pogo routes on 2Fort.", author: "ZabsEt", reads: 12480 },
  { id: "g2", classId: "scout", title: "Double Jump Positioning", level: "beginner", category: "Positioning", excerpt: "How to use height and angles to avoid easy meatshots.", author: "b4nny_fan", reads: 8210 },
  { id: "g3", classId: "spy", title: "Trickstabs 101", level: "advanced", category: "Mind Games", excerpt: "Matador, stair stab, and face stab timing with practical examples.", author: "ShadowDance", reads: 5430 },
  { id: "g4", classId: "demoman", title: "Sticky Trap Spots on Badwater", level: "intermediate", category: "Map Tricks", excerpt: "Top 10 sticky trap positions for every major choke.", author: "ZabsEt", reads: 9120 },
  { id: "g5", classId: "medic", title: "Uber Advantage Theory", level: "advanced", category: "Game Sense", excerpt: "When to force a push with Uber and when to hold for the next fight.", author: "AsphaltMD", reads: 7340 },
  { id: "g6", classId: "engineer", title: "Mini-Sentry Aggressive Plays", level: "intermediate", category: "Loadouts", excerpt: "Strong mini-sentry spots for pressure and fast tempo holds.", author: "WrenchKing", reads: 4980 },
];

export function getRandomTip() {
  const lastTip = localStorage.getItem("lastTip");

  let newTip;
  do {
    const randomIndex = Math.floor(Math.random() * TIPS_OF_THE_DAY.length);
    newTip = TIPS_OF_THE_DAY[randomIndex];
  } while (newTip === lastTip);

  localStorage.setItem("lastTip", newTip);
  return newTip;
}

export const TIPS_OF_THE_DAY = [
  "Scout: use double jump to bait shots before committing to a fight.",
  "Scout: pistols are reliable for finishing low HP enemies at range.",
  "Scout: strafing unpredictably makes you much harder to hit.",
  "Soldier: rocket jump to high ground before engaging enemies.",
  "Soldier: splash damage is often more reliable than direct hits.",
  "Soldier: reloading all rockets before a push is crucial.",
  "Pyro: airblast can deny Uber pushes if timed well.",
  "Pyro: flames reveal invisible Spies instantly.",
  "Pyro: use corners to ambush enemies at close range.",
  "Demoman: sticky traps are great for controlling chokepoints.",
  "Demoman: detonate stickies manually for better timing.",
  "Demoman: pipes are deadly in tight corridors.",
  "Heavy: spin up before turning corners in dangerous areas.",
  "Heavy: always stay near your Medic when possible.",
  "Heavy: use your large HP pool to tank damage for teammates.",
  "Engineer: place teleporters in safe but accessible locations.",
  "Engineer: upgrading your dispenser helps your whole team.",
  "Engineer: move your sentry when it gets predictable.",
  "Medic: prioritize healing injured teammates over overhealing.",
  "Medic: pop Uber before you're about to die, not after.",
  "Medic: stay behind your team, not in front.",
  "Sniper: change positions after every few shots.",
  "Sniper: charge shots only when safe to do so.",
  "Sniper: watch for Spies while scoped in.",
  "Spy: disguise before entering enemy lines.",
  "Spy: avoid bumping into enemies while cloaked.",
  "Spy: pick isolated targets instead of groups.",
  "General: listen to sound cues like footsteps and decloaks.",
  "General: use cover instead of standing in open areas.",
  "General: high ground gives a big advantage in fights.",
  "General: retreating is better than dying unnecessarily.",
  "General: always check your surroundings for flankers.",
  "Scout: use terrain to break line of sight quickly.",
  "Soldier: rockets can juggle enemies and control movement.",
  "Pyro: reflect projectiles back at enemies for bonus damage.",
  "Demoman: sticky spam can delay enemy pushes effectively.",
  "Heavy: crouch jumping can help you peek over obstacles.",
  "Engineer: don't stack buildings too close together.",
  "Medic: build Uber safely before committing to fights.",
  "Sniper: bodyshots are fine if you need consistent damage.",
  "Spy: sap buildings before going for a stab.",
  "General: teamwork wins more games than aim alone.",
  "General: learn map layouts to predict enemy movement.",
  "General: use health packs wisely, don't waste them.",
  "Scout: speed is your biggest advantage, use it.",
  "Soldier: positioning matters more than aim sometimes.",
  "Pyro: protect your team from projectiles.",
  "Demoman: pre-fire choke points before enemies arrive.",
  "Heavy: avoid long sightlines where Snipers dominate.",
  "Engineer: always upgrade your sentry to level 3.",
  "Medic: overheal key teammates before fights.",
  "Sniper: don't tunnel vision while scoped.",
  "Spy: patience is more important than aggression.",
];
