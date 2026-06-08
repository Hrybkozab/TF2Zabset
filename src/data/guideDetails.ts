export type GuideDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface GuideAuthor {
  nickname: string;
  steamId: string;
  hoursInTf2: number;
  avatarSeed: string;
}

export interface GuideDetail {
  id: number;
  title: string;
  class: string;
  classId: string;
  category: string;
  difficulty: GuideDifficulty;
  readTime: number;
  description: string;
  body: string[];
  tags: string[];
  color: string;
  videoId?: string;
  author: GuideAuthor;
  featured?: boolean;
  reads?: number;
  comments?: GuideComment[];
}

export interface GuideComment {
  id: number;
  author: string;
  hoursInTf2: number;
  text: string;
  createdAt: string;
}

const AUTHORS: Record<string, GuideAuthor> = {
  rocket: { nickname: "RocketYard", steamId: "76561198000010001", hoursInTf2: 3420, avatarSeed: "RY" },
  flank: { nickname: "FlankRoute", steamId: "76561198000010002", hoursInTf2: 2180, avatarSeed: "FR" },
  stickies: { nickname: "StickyLogic", steamId: "76561198000010003", hoursInTf2: 4015, avatarSeed: "SL" },
  medic: { nickname: "UberClock", steamId: "76561198000010004", hoursInTf2: 5290, avatarSeed: "UC" },
  wrench: { nickname: "WrenchKing", steamId: "76561198000010005", hoursInTf2: 2760, avatarSeed: "WK" },
  spy: { nickname: "ShadowDance", steamId: "76561198000010006", hoursInTf2: 3610, avatarSeed: "SD" },
};

export const GUIDE_DETAILS: GuideDetail[] = [
  {
    id: 1,
    title: "Rocket Jump Fundamentals",
    class: "Soldier",
    classId: "soldier",
    category: "Movement",
    difficulty: "Intermediate",
    readTime: 8,
    description: "Learn the core mechanics of rocket jumping - how to crouch, time your shot, and launch yourself to unexpected heights and angles.",
    body: [
      "Rocket jumping is about timing, angle, and landing discipline. Start by aiming behind your feet, crouching, jumping, and firing at the same moment.",
      "Once the launch feels consistent, practice landing near cover instead of landing in open space. Good jumps create pressure without giving the enemy a free trade.",
      "The next step is route knowledge: learn which jumps are worth the health cost on common maps and which jumps only look flashy.",
    ],
    tags: ["rocket jump", "mobility", "soldier"],
    color: "#c0392b",
    videoId: "MXVNz4fm2Xk",
    author: AUTHORS.rocket,
    featured: true,
    reads: 12480,
  },
  {
    id: 2,
    title: "Scout Guide for Teapots",
    class: "Scout",
    classId: "scout",
    category: "Basics",
    difficulty: "Beginner",
    readTime: 6,
    description: "Master the art of Scout positioning - when to engage, when to retreat, and how to use your speed to stay one step ahead.",
    body: [
      "Scout wins by choosing when the fight starts. Use side angles, health packs, and short rotations to force enemies to turn away from your team.",
      "Avoid repeating the same entrance after being spotted. Once the enemy knows your route, your speed stops being a surprise.",
      "Your strongest positions are close enough to punish mistakes but safe enough to leave before Soldiers, Heavies, or Sentries lock you down.",
    ],
    tags: ["positioning", "flanking", "scout"],
    color: "#e8a020",
    videoId: "ou94lfr7dr8",
    author: AUTHORS.flank,
    featured: true,
    reads: 8210,
    comments: [
      {
        id: 1,
        author: "b4nny_fan",
        hoursInTf2: 1280,
        text: "For Scout this helped a lot: taking side angles near health packs makes fights feel way safer than just running straight at mid.",
        createdAt: "2026-05-19",
      },
    ],
  },
  {
    id: 3,
    title: "Sticky Bomb Traps 101",
    class: "Demoman",
    classId: "demoman",
    category: "Strategy",
    difficulty: "Advanced",
    readTime: 10,
    description: "Deep dive into sticky trap placement - chokepoints, spawn control, and the psychology of making enemies walk into your bombs.",
    body: [
      "A good sticky trap punishes movement the enemy already wants to make. Put traps where enemies look at the fight, not where they look at the floor.",
      "Rotate traps after a kill or after the enemy calls your position. Reusing the same trap works only when the enemy is under heavy pressure.",
      "Use visible spam and hidden traps together: visible damage slows the push, hidden stickies punish the panic route.",
    ],
    tags: ["stickies", "traps", "area denial"],
    color: "#8e44ad",
    videoId: "XafIgzEZYdQ",
    author: AUTHORS.stickies,
    reads: 9120,
  },
  {
    id: 4,
    title: "Medic: Uber Timing",
    class: "Medic",
    classId: "medic",
    category: "Strategy",
    difficulty: "Advanced",
    readTime: 12,
    description: "When to pop Uber, when to hold it, and how to avoid getting killed before deploying it.",
    body: [
      "Uber timing starts before the fight. Track enemy damage classes, your team's health, and whether your pocket can actually cross the space you want to take.",
      "Holding too long is usually worse than popping slightly early. A living Medic with used Uber is better than a dead Medic with perfect timing in theory.",
      "After Uber fades, immediately plan your retreat or next healing target. Many teams win the invulnerability fight and lose the cleanup.",
    ],
    tags: ["uber", "teamplay", "medic"],
    color: "#27ae60",
    videoId: "vHntb0kp2K0",
    author: AUTHORS.medic,
    featured: true,
    reads: 7340,
  },
  {
    id: 5,
    title: "Engineer Sentry Placement",
    class: "Engineer",
    classId: "engineer",
    category: "Building",
    difficulty: "Beginner",
    readTime: 7,
    description: "The fundamentals of Sentry placement - cover chokepoints, protect your nest, and know when to relocate.",
    body: [
      "A Sentry should cover a useful path without being easy to spam from safety. If enemies can shoot it without entering danger, move it.",
      "Your Dispenser and Teleporter are not decoration. Place them where teammates can use them without exposing your entire nest.",
      "Relocation is part of Engineer skill. A setup that worked once can become a trap if the enemy team has already adapted.",
    ],
    tags: ["sentry", "building", "defense"],
    color: "#f39c12",
    author: AUTHORS.wrench,
    reads: 4980,
  },
  {
    id: 6,
    title: "Spy: The Art of Disguise",
    class: "Spy",
    classId: "spy",
    category: "Strategy",
    difficulty: "Advanced",
    readTime: 15,
    description: "Pick the right disguise, maintain cover under pressure, and identify the perfect moment to backstab a Medic.",
    body: [
      "Disguise is not invisibility. It buys a moment of hesitation, and your job is to spend that moment on information, position, or a high-value pick.",
      "Watch enemy movement before decloaking. A distracted target is safer than a target who is isolated but already suspicious.",
      "After a stab, leave through a planned route. The best Spy plays are not only the kill, but the escape that lets you threaten the next one.",
    ],
    tags: ["disguise", "backstab", "spy"],
    color: "#2980b9",
    videoId: "40tzHnCeZh8",
    author: AUTHORS.spy,
    reads: 5430,
  },
  {
    id: 7,
    title: "Pyro Airblast Mechanics",
    class: "Pyro",
    classId: "pyro",
    category: "Mechanics",
    difficulty: "Intermediate",
    readTime: 9,
    description: "Master Pyro's airblast - reflect projectiles, push enemies off ledges, and extinguish teammates at the right moment.",
    body: [
      "Airblast is strongest when you read rhythm instead of reacting late. Soldiers and Demos often fire at predictable timings around corners.",
      "Use airblast to protect teammates as much as yourself. Denying one rocket during a push can save your Medic or stop a bomb.",
      "Displacement matters too: push enemies away from doors, health packs, and Uber targets to break their fight plan.",
    ],
    tags: ["airblast", "reflect", "pyro"],
    color: "#e67e22",
    videoId: "7U2F2tULA7o",
    author: AUTHORS.flank,
    reads: 6380,
  },
  {
    id: 8,
    title: "Heavy: Minigun Accuracy",
    class: "Heavy",
    classId: "heavy",
    category: "Mechanics",
    difficulty: "Beginner",
    readTime: 5,
    description: "Maximize your minigun output with spin-up timing, movement while firing, and smart positions.",
    body: [
      "Heavy accuracy is about pre-aiming likely entrances and committing to ranges where tracking is realistic.",
      "Spin up before the danger appears, but do not stay spun up so long that you cannot rotate with your team.",
      "The best Heavy positions have cover nearby. You should be able to break Sniper sightlines and reset reload pressure quickly.",
    ],
    tags: ["minigun", "suppression", "heavy"],
    color: "#e74c3c",
    author: AUTHORS.rocket,
    reads: 4120,
  },
  {
    id: 9,
    title: "Sniper: Headshot Consistency",
    class: "Sniper",
    classId: "sniper",
    category: "Aim",
    difficulty: "Advanced",
    readTime: 11,
    description: "Improve scoped accuracy and unscoped flick shots while learning bodyshot vs headshot trade-offs.",
    body: [
      "Consistency starts with crosshair placement. Hold angles where enemies naturally walk into your scope instead of forcing every shot into a flick.",
      "Change position after important picks. Even a great sightline becomes dangerous once the enemy knows you are holding it.",
      "Bodyshots are not shameful when they win timing. A quick 150 can matter more than waiting too long for a perfect headshot.",
    ],
    tags: ["aim", "headshot", "sniper"],
    color: "#16a085",
    videoId: "H-vO61s5S_k",
    author: AUTHORS.stickies,
    reads: 5690,
  },
  {
    id: 10,
    title: "General: Map Awareness",
    class: "All Classes",
    classId: "scout",
    category: "Strategy",
    difficulty: "Beginner",
    readTime: 7,
    description: "Understand flank routes, health pack positions, and how to read enemy pushes from spawn timings and audio cues.",
    body: [
      "Map awareness is the habit of knowing where danger can arrive before it arrives. Health packs, flank doors, and high ground should become landmarks.",
      "Listen for jumps, decloaks, sentries, and reloads. TF2 gives a lot of information before enemies are visible.",
      "When you die, ask which route or timing you forgot. This turns random deaths into map knowledge.",
    ],
    tags: ["map", "awareness", "general"],
    color: "#7f8c8d",
    author: AUTHORS.medic,
    reads: 3880,
  },
  {
    id: 11,
    title: "Soldier Rollout: cp_process",
    class: "Soldier",
    classId: "soldier",
    category: "Rollout",
    difficulty: "Intermediate",
    readTime: 6,
    description: "Step-by-step rollout from spawn to mid on cp_process - the jumps, timing, and how to arrive ready to fight.",
    body: [
      "A rollout is not just speed. Arrive with enough health, ammo, and angle control to influence the first fight.",
      "Practice each jump separately before chaining the full route. Bad first jumps usually ruin the whole mid.",
      "Once the route is stable, learn variations for when your Medic needs protection or when your team wants a slower dry push.",
    ],
    tags: ["rollout", "process", "soldier"],
    color: "#c0392b",
    author: AUTHORS.rocket,
    reads: 6670,
  },
  {
    id: 12,
    title: "Demo Rollout: cp_badlands",
    class: "Demoman",
    classId: "demoman",
    category: "Rollout",
    difficulty: "Advanced",
    readTime: 8,
    description: "The classic Demoman mid rollout on cp_badlands with sticky jump routes and opening pressure ideas.",
    body: [
      "Demo rollout timing decides how early you can threaten mid. Your goal is to arrive ready to place damage, not simply arrive first at low health.",
      "Use sticky jumps that leave you with enough HP to survive spam. A clean rollout should still respect enemy Soldiers and Scouts.",
      "Practice your first sticky placement after landing, because that first trap or spam angle often controls the whole opening fight.",
    ],
    tags: ["rollout", "badlands", "demoman"],
    color: "#8e44ad",
    author: AUTHORS.stickies,
    reads: 7140,
  },
];

const CLASS_GUIDE_BLUEPRINTS = [
  { class: "Scout", classId: "scout", color: "#e8a020", topics: ["Double Jump Routes", "Scattergun Duels", "Flank Timing", "Mad Milk Support", "Midfight Cleanup", "Health Pack Control", "Anti-Soldier Dodging", "Objective Pressure", "Pistol Finishes", "2v1 Survival"] },
  { class: "Soldier", classId: "soldier", color: "#c0392b", topics: ["Rocket Jump Routes", "Splash Damage", "Bomb Timing", "Banner Pushes", "Gunboats Roaming", "High Ground Holds", "Airshot Practice", "Market Gardener Setup", "Choke Spam", "Defensive Peeks"] },
  { class: "Pyro", classId: "pyro", color: "#e67e22", topics: ["Airblast Reads", "Flare Combos", "Spy Checking", "Uber Denial", "Corner Ambushes", "Team Protection", "Projectile Reflection", "Thermal Thruster Routes", "Payload Defense", "Anti-Scout Control"] },
  { class: "Demoman", classId: "demoman", color: "#8e44ad", topics: ["Sticky Trap Logic", "Pipe Aim", "Choke Control", "Mid Rollouts", "Area Denial", "Sticky Jump Routes", "Trap Rotations", "Anti-Scout Spacing", "Payload Spam", "Last Hold Setups"] },
  { class: "Heavy", classId: "heavy", color: "#e74c3c", topics: ["Minigun Tracking", "Medic Pairing", "Corner Rev Timing", "Payload Cart Pressure", "Sniper Avoidance", "Sandvich Support", "Target Priority", "Defensive Anchors", "Tomislav Ambushes", "Push Timing"] },
  { class: "Engineer", classId: "engineer", color: "#f39c12", topics: ["Sentry Angles", "Teleporter Value", "Dispenser Placement", "Mini-Sentry Pressure", "Wrangler Defense", "Rescue Ranger Saves", "Metal Routes", "Anti-Spy Habits", "Payload Nests", "Last Point Holds"] },
  { class: "Medic", classId: "medic", color: "#27ae60", topics: ["Uber Tracking", "Heal Priority", "Surfing Damage", "Crossbow Saves", "Kritz Timing", "Escape Routes", "Pocket Selection", "Anti-Spy Movement", "Advantage Calls", "Teamfight Reset"] },
  { class: "Sniper", classId: "sniper", color: "#16a085", topics: ["Sightline Control", "Counter-Sniping", "Headshot Rhythm", "Jarate Timing", "Safe Rotations", "Close Defense", "High Ground Peeks", "Payload Picks", "Bodyshot Decisions", "Spy Awareness"] },
  { class: "Spy", classId: "spy", color: "#2980b9", topics: ["Disguise Choices", "Decloak Spots", "Medic Picks", "Sapper Timing", "Escape Routes", "Revolver Pressure", "Chain Stabs", "Engineer Nests", "Information Plays", "Patience Windows"] },
] as const;

const GENERATED_GUIDES: GuideDetail[] = CLASS_GUIDE_BLUEPRINTS.flatMap((blueprint, classIndex) =>
  blueprint.topics.map((topic, topicIndex) => {
    const id = 13 + classIndex * 10 + topicIndex;
    const difficulty: GuideDifficulty = topicIndex < 3 ? "Beginner" : topicIndex < 7 ? "Intermediate" : "Advanced";
    const authorKeys = Object.keys(AUTHORS);
    const author = AUTHORS[authorKeys[(classIndex + topicIndex) % authorKeys.length]];

    return {
      id,
      title: `${blueprint.class}: ${topic}`,
      class: blueprint.class,
      classId: blueprint.classId,
      category: topic.includes("Route") || topic.includes("Jump") || topic.includes("Movement") ? "Movement" : topic.includes("Timing") ? "Strategy" : "Mechanics",
      difficulty,
      readTime: 5 + ((classIndex + topicIndex) % 9),
      description: `A practical ${blueprint.class} guide about ${topic.toLowerCase()} with simple habits you can apply in real matches.`,
      body: [
        `${topic} matters because it changes how ${blueprint.class} enters fights, survives pressure, and creates value for the team.`,
        `Start with one repeatable habit, then add map-specific decisions after the basic timing feels natural.`,
        `Review deaths by asking whether the problem was position, timing, target choice, or missing information.`,
      ],
      tags: [blueprint.class.toLowerCase(), topic.toLowerCase(), difficulty.toLowerCase()],
      color: blueprint.color,
      author,
      reads: 1200 + id * 137,
    };
  }),
);

export const ALL_GUIDE_DETAILS: GuideDetail[] = [...GUIDE_DETAILS, ...GENERATED_GUIDES];

export const getGuideById = (id: number): GuideDetail | undefined => {
  return ALL_GUIDE_DETAILS.find((guide) => guide.id === id);
};
