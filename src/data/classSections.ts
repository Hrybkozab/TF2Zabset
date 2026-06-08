export const SECTION_ORDER = [
  { key: "basics", label: "Basics", level: "beginner" },
  { key: "movement", label: "Movement", level: "beginner" },
  { key: "loadouts", label: "Loadouts", level: "intermediate" },
  { key: "combat", label: "Combat", level: "intermediate" },
  { key: "positioning", label: "Positioning", level: "advanced" },
  { key: "matchups", label: "Matchups", level: "advanced" },
] as const;

export type SectionKey = (typeof SECTION_ORDER)[number]["key"];

type SectionTexts = Record<SectionKey, string>;
type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface ClassSkillTreeItem {
  level: SkillLevel;
  label: string;
  topics: string[];
}

export interface ClassSectionBlock {
  id: number;
  title: string;
  skill: SkillLevel;
  text: string;
  tips: string[];
  ytId: string;
}

export const CLASS_BASICS_VIDEO_IDS: Record<string, string> = {
  scout: "ou94lfr7dr8",
  soldier: "MXVNz4fm2Xk",
  pyro: "7U2F2tULA7o",
  demoman: "XafIgzEZYdQ",
  heavy: "YiH5rxEFBwY",
  engineer: "EQN1Qdmwhvc",
  medic: "vHntb0kp2K0",
  sniper: "H-vO61s5S_k",
  spy: "40tzHnCeZh8",
};

// Edit this object to customize text for each class/section.
export const CLASS_SECTION_TEXTS: Record<string, SectionTexts> = {
  scout: {
    basics: "The main thing every player should understand when playing Scout is movement. It's considered the fastest in the game, so running is its main feature, which every player who wants to learn how to play it should be familiar with.",
    movement: "Scout's double jump is what separates good players from great ones. Use it to change direction mid-air and dodge projectiles. Strafe unpredictably - left-right-left patterns are easy to read. Mix in short hops to break enemy tracking.",
    positioning: "A Scout's positioning depends on the game itself. If your medic is struggling in a particular position-for example, if a sniper is trying to shoot them-you should eliminate and draw the enemy's attention to yourself to buy time or HP for your teammate. Try to eliminate targets that don't move very much and won't anticipate your attack.",
    combat: "Use close-range meatshots, then instantly reposition after each shot.",
    loadouts: "Pick weapons by map objective: mobility for 5CP, survivability for payload.",
    matchups: "Against Heavy and Engineer, attack from off-angles; against Soldier, stay unpredictable in the air.",
  },
  soldier: {
    basics: "Soldier fundamentals: control fight tempo with splash damage and rocket-jump threat.",
    movement: "Drill core rocket jumps, speedshots, and clean landings with minimal self-damage.",
    positioning: "Play from height and corners where enemies cannot line up easy shots.",
    combat: "Mix direct hits with splash and finish close fights with shotgun pressure.",
    loadouts: "Swap launchers and banners based on objective: push, hold, or team utility.",
    matchups: "Against Scout, keep mid-range spacing; against Pyro, always account for airblast.",
  },
  pyro: {
    basics: "Pyro fundamentals: dominate close range, control space, and protect teammates.",
    movement: "Practice approach paths through cover and timing your entry into fights.",
    positioning: "Hold areas where enemies must walk into flamethrower range.",
    combat: "Use airblast for reflects, displacement, and stopping enemy pushes.",
    loadouts: "Choose weapons by role: aggression, anti-Spy, or projectile denial.",
    matchups: "Against Soldier and Demo, track projectiles; against Heavy, attack from flanks.",
  },
  demoman: {
    basics: "Demoman fundamentals: area damage and choke control with stickies.",
    movement: "Learn sticky jumps for fast engages and rapid repositioning.",
    positioning: "Set traps on high-traffic routes and anchor around key chokes.",
    combat: "Alternate pipes and stickies to deny enemy movement options.",
    loadouts: "Prioritize mobility on attack and stable area control on defense.",
    matchups: "Against Scout, keep distance; against Sniper, avoid long repeated peeks.",
  },
  heavy: {
    basics: "Heavy fundamentals: front-line pressure, angle control, and team protection.",
    movement: "Rotate early because Heavy repositions slower than most classes.",
    positioning: "Play near cover so you can hide quickly for reloads and heals.",
    combat: "Pre-spin before peeking and focus priority targets during pushes.",
    loadouts: "Pick miniguns based on role: sustained damage, mobility, or survivability.",
    matchups: "Against Sniper, vary your angles; against Spy, constantly spy-check your backline.",
  },
  engineer: {
    basics: "Engineer fundamentals: every building should create value at all times.",
    movement: "Relocate between waves and avoid staying in one setup for too long.",
    positioning: "Place sentries to cover entrances while staying hard to spam out.",
    combat: "Layer turret pressure with shotgun damage to finish close fights.",
    loadouts: "Use mini-sentry setups for aggression, classic loadouts for anchor defense.",
    matchups: "Against Demo, rotate building angles; against Spy, check often for sappers.",
  },
  medic: {
    basics: "Medic fundamentals: survival comes first so your team never loses healing.",
    movement: "Match your team's tempo and pre-plan safe escape routes.",
    positioning: "Stay behind the frontline while keeping beam uptime on priority targets.",
    combat: "Do not force direct fights; use melee only as a last resort.",
    loadouts: "Choose Medigun by objective: push timing, saves, anti-splash, or mobility.",
    matchups: "Against Spy, vary routes and check corners; against Sniper, avoid static peeks.",
  },
  sniper: {
    basics: "Sniper fundamentals: every pick should influence a fight or stop a push.",
    movement: "Reposition after kills so enemies cannot pre-aim your sightline.",
    positioning: "Take sightlines with cover and an immediate fallback path.",
    combat: "Charge with intent, but do not overhold if a clean bodyshot is enough.",
    loadouts: "Build per map: long-range control, anti-Spy utility, or Sniper dueling.",
    matchups: "Against enemy Sniper, change height and peek timing; against Scout, stay closer to your team.",
  },
  spy: {
    basics: "Spy fundamentals: information and high-value picks matter more than constant fighting.",
    movement: "Use cloak for route planning, not only emergency escapes.",
    positioning: "Enter through blind zones and listen for timing windows.",
    combat: "Prioritize backstabs on Medic, Sniper, Engineer, and Heavy.",
    loadouts: "Choose watches and revolvers by style: aggression, safety, or mobility.",
    matchups: "Against Pyro and Engineer, be patient and avoid low-percentage stabs.",
  },
};

export const getClassSectionText = (classId: string, section: SectionKey): string => {
  return CLASS_SECTION_TEXTS[classId]?.[section] ?? "Add section text for this class.";
};

// Edit these paths when you have images for the small section cards.
// Example: scout: { basics: "/section-cards/scout-basics.png", ... }
export const CLASS_SECTION_TILE_IMAGES: Partial<Record<string, Partial<Record<SectionKey, string>>>> = {
  scout: {},
  soldier: {},
  pyro: {},
  demoman: {},
  heavy: {},
  engineer: {},
  medic: {},
  sniper: {},
  spy: {},
};

export const getClassSectionTileImage = (classId: string, section: SectionKey): string => {
  return CLASS_SECTION_TILE_IMAGES[classId]?.[section] ?? "";
};

export const CLASS_SKILL_TREES: Record<string, ClassSkillTreeItem[]> = {
  scout: [
    { level: "beginner", label: "Beginner", topics: ["movement", "weapons", "positioning"] },
    { level: "intermediate", label: "Intermediate", topics: ["prediction", "game sense", "combos"] },
    { level: "advanced", label: "Advanced", topics: ["advanced jumps", "mind games", "map control"] },
  ],
  soldier: [
    { level: "beginner", label: "Beginner", topics: ["splash damage", "reload rhythm", "high ground"] },
    { level: "intermediate", label: "Intermediate", topics: ["rocket jumps", "juggling", "banner timing"] },
    { level: "advanced", label: "Advanced", topics: ["sync jumps", "airshots", "sac timing"] },
  ],
  pyro: [
    { level: "beginner", label: "Beginner", topics: ["ambush routes", "spy-checking", "team protection"] },
    { level: "intermediate", label: "Intermediate", topics: ["airblast", "flare combos", "space denial"] },
    { level: "advanced", label: "Advanced", topics: ["uber denial", "reflect reads", "combo timing"] },
  ],
  demoman: [
    { level: "beginner", label: "Beginner", topics: ["sticky traps", "pipe aim", "choke control"] },
    { level: "intermediate", label: "Intermediate", topics: ["sticky jumps", "trap rotation", "spam angles"] },
    { level: "advanced", label: "Advanced", topics: ["mid control", "det timing", "area layering"] },
  ],
  heavy: [
    { level: "beginner", label: "Beginner", topics: ["tracking", "cover use", "medic spacing"] },
    { level: "intermediate", label: "Intermediate", topics: ["rev timing", "target priority", "corner holds"] },
    { level: "advanced", label: "Advanced", topics: ["push anchors", "crossfire", "sniper avoidance"] },
  ],
  engineer: [
    { level: "beginner", label: "Beginner", topics: ["building order", "metal routes", "teleporters"] },
    { level: "intermediate", label: "Intermediate", topics: ["sentry angles", "rotations", "rescue timing"] },
    { level: "advanced", label: "Advanced", topics: ["mini pressure", "nest baiting", "spy control"] },
  ],
  medic: [
    { level: "beginner", label: "Beginner", topics: ["heal priority", "beam uptime", "escape routes"] },
    { level: "intermediate", label: "Intermediate", topics: ["uber tracking", "surfing", "crossbow use"] },
    { level: "advanced", label: "Advanced", topics: ["force calls", "advantage play", "drop prevention"] },
  ],
  sniper: [
    { level: "beginner", label: "Beginner", topics: ["sightlines", "target priority", "safe peeks"] },
    { level: "intermediate", label: "Intermediate", topics: ["repositioning", "duels", "charge timing"] },
    { level: "advanced", label: "Advanced", topics: ["counter-sniping", "pressure reads", "pick timing"] },
  ],
  spy: [
    { level: "beginner", label: "Beginner", topics: ["disguises", "cloak routes", "sap basics"] },
    { level: "intermediate", label: "Intermediate", topics: ["timing windows", "revolver pressure", "escape plans"] },
    { level: "advanced", label: "Advanced", topics: ["chain stabs", "decloak spots", "team disruption"] },
  ],
};

export const getClassSkillTree = (classId: string): ClassSkillTreeItem[] => {
  return CLASS_SKILL_TREES[classId] ?? CLASS_SKILL_TREES.scout;
};

const SECTION_DETAILS: Record<
  SectionKey,
  {
    title: string;
    skill: SkillLevel;
    focus: string;
    practice: string;
    mistakes: string;
    tips: string[];
  }
> = {
  basics: {
    title: "CORE IDEA",
    skill: "beginner",
    focus:
      "Start with the job of the class: what space it controls, who it wants to fight, and what it should avoid. Good basics make every later mechanic easier because you stop taking random fights.",
    practice:
      "Play one round where you only track three things: where your team is, where the nearest health pack is, and which enemy can punish you fastest. This creates simple awareness habits.",
    mistakes:
      "Most basic mistakes come from copying advanced plays without the setup. If your team is not ready, if you have no escape, or if your weapon is not loaded, the play is usually too expensive.",
    tips: [
      "Learn your class role before learning flashy mechanics.",
      "Keep your crosshair near the angle enemies are likely to enter.",
      "Reset after each death by asking what information you ignored.",
    ],
  },
  movement: {
    title: "MOVEMENT PLAN",
    skill: "beginner",
    focus:
      "Movement is not only speed. It is how you enter fights, dodge damage, protect your reloads, and leave before enemies can trade you. Each movement choice should either gain space or reduce risk.",
    practice:
      "Load a familiar map and move between health packs, high ground, and cover without fighting. Then repeat the same route while imagining where Soldiers, Snipers, and Scouts could punish you.",
    mistakes:
      "The biggest movement mistake is becoming readable. Jumping at the same timing, crossing the same sightline, or retreating through the same doorway lets enemies pre-aim you.",
    tips: [
      "Change speed and direction before enemies fire, not after.",
      "Use corners to reload and break tracking.",
      "Practice routes that end near cover instead of open ground.",
    ],
  },
  positioning: {
    title: "POSITIONING",
    skill: "advanced",
    focus:
      "Positioning decides whether your aim even gets a fair chance. Good positions create pressure while keeping an exit open. Bad positions force you to win aim duels just to survive.",
    practice:
      "Before each fight, name your escape route. If you cannot name one, rotate to a safer angle. This small habit prevents many deaths that feel like aim problems but are really positioning problems.",
    mistakes:
      "Do not stand where several enemies can see you at once. Even strong players lose when they allow the whole enemy team to shoot them for free.",
    tips: [
      "Favor off-angles that support your team's timing.",
      "Avoid repeating the same peek after enemies notice you.",
      "Use high ground, cover, and health packs as anchors.",
    ],
  },
  combat: {
    title: "COMBAT FLOW",
    skill: "intermediate",
    focus:
      "Combat is a cycle of pressure, reload, reposition, and finish. Winning one duel is useful, but winning a fight without losing your position or resources is much stronger.",
    practice:
      "Practice entering a fight with a clear first shot, then immediately moving to a new angle. This teaches you to avoid standing still after dealing damage.",
    mistakes:
      "Chasing weak targets too far is one of the fastest ways to throw advantage. If the chase pulls you away from the objective or your team, the kill may not matter.",
    tips: [
      "Shoot from ranges where your weapon is reliable.",
      "Track enemy reloads and cooldowns before committing.",
      "Leave fights when your health no longer supports the angle.",
    ],
  },
  loadouts: {
    title: "LOADOUT LOGIC",
    skill: "intermediate",
    focus:
      "A loadout should answer the map and the enemy team. Pick weapons because they solve a specific problem, not because they are popular in a different situation.",
    practice:
      "Change one weapon at a time and play a few fights before judging it. This makes it easier to understand what actually improved and what became weaker.",
    mistakes:
      "Avoid switching weapons after every death. Sometimes the real issue is timing, position, or target choice, not the item itself.",
    tips: [
      "Keep one reliable default loadout for unfamiliar maps.",
      "Use utility weapons when your team needs support more than damage.",
      "Swap only when you can explain the problem you are solving.",
    ],
  },
  matchups: {
    title: "MATCHUP RULES",
    skill: "advanced",
    focus:
      "Matchups are about knowing which enemy tools are dangerous and forcing the fight into a range where your class has the better answer.",
    practice:
      "Pick one difficult enemy class per session and write down what killed you: range, cooldown, angle, or surprise. Patterns appear quickly when you track them.",
    mistakes:
      "Do not treat every enemy the same. A fight that is correct against Heavy may be terrible against Sniper, and an angle that beats Soldier may feed into Pyro.",
    tips: [
      "Respect the enemy's strongest range.",
      "Bait important cooldowns before fully committing.",
      "Rotate away from matchups your class cannot force cleanly.",
    ],
  },
};

export const getClassSectionBlocks = (classId: string, section: SectionKey): ClassSectionBlock[] => {
  const baseText = getClassSectionText(classId, section);
  const details = SECTION_DETAILS[section];
  const basicsVideoId = section === "basics" ? CLASS_BASICS_VIDEO_IDS[classId] ?? "" : "";

  return [
    {
      id: 1,
      title: section === "basics" ? "BASICS VIDEO" : details.title,
      skill: details.skill,
      text: `${baseText}\n\n${details.focus}`,
      tips: details.tips,
      ytId: basicsVideoId,
    },
    {
      id: 2,
      title: "PRACTICE",
      skill: "beginner",
      text: details.practice,
      tips: [
        "Keep the drill short so it is easy to repeat.",
        "Focus on one habit at a time instead of fixing everything at once.",
        "Review deaths by position first, then aim.",
      ],
      ytId: "",
    },
    {
      id: 3,
      title: "COMMON MISTAKES",
      skill: "advanced",
      text: details.mistakes,
      tips: [
        "If the same death happens twice, change the route or timing.",
        "Do not force a fight while reloading or isolated.",
        "Use the edit button to add your own notes for each map.",
      ],
      ytId: "",
    },
  ];
};

