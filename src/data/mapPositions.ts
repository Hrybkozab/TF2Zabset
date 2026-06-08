export interface TF2MapInfo {
  id: string;
  name: string;
  mode: string;
  image?: string;
}

export interface PositionPin {
  x: number;
  y: number;
  label: string;
}

export interface PositionRoute {
  points: string;
  label: string;
}

export type PositionType = "SAFE" | "AGGRESSIVE" | "FLANK" | "LAST HOLD";

export interface PositionMetrics {
  cover: number;
  escape: number;
  healthpack: number;
  sightlines: number;
}

export interface PositionSpot {
  id: string;
  label: string;
  type: PositionType;
  x: number;
  y: number;
  screenshot?: string;
  metrics: PositionMetrics;
  why: string;
  plus: string[];
  minus: string[];
  mistakes: string[];
  coachNote: string;
}

export interface ClassMapPosition {
  image?: string;
  notes?: string;
  pins?: PositionPin[];
  routes?: PositionRoute[];
  spots?: PositionSpot[];
}

const CLASS_POSITION_ADVICE: Record<string, string> = {
  scout: "Use speed to pressure flanks, contest health packs, and force enemies to turn away from your main combo. Rotate early instead of taking long spam lanes.",
  soldier: "Use high ground, corners, and jump routes to create pressure before your team commits. Save enough health to rejoin after bombing.",
  pyro: "Play near teammates and choke entrances. Deny projectiles, spy-check rotations, and push enemies away from carts, doors, and Medic paths.",
  demoman: "Control chokes with stickies, punish grouped pushes, and rotate traps after enemies see them. Anchor space before the fight begins.",
  heavy: "Hold short sightlines near cover. Move with Medic, avoid exposed Sniper lanes, and use your health to anchor cart or point pressure.",
  engineer: "Build where your team can actually use the space. Keep Teleporters safe, Dispensers accessible, and Sentries hard to spam for free.",
  medic: "Stay behind the strongest teammate, track escape routes, and avoid repeated Sniper sightlines. Your survival is the team's reset button.",
  sniper: "Pick sightlines with cover and a fallback route. Change angles after kills and prioritize Medic, Heavy, Engineer, and enemy Sniper.",
  spy: "Use blind zones and timing windows. Gather information first, then sap buildings or pick high-value targets when the enemy team is distracted.",
};

const MODE_ADVICE: Record<string, string> = {
  "Control Points": "On Control Points, watch mid timing, forward spawns, and transition fights. Winning the fight after a capture is often more important than the capture itself.",
  "Capture the Flag": "On CTF, value information and safe routes. Overchasing kills can lose intelligence pressure quickly.",
  "King of the Hill": "On KOTH, control the health packs around the point and reset before overtime. Small positional wins become huge over repeated fights.",
  Payload: "On Payload, learn cart corners, high-ground holds, and defensive fallback points. The cart path tells you where both teams must eventually fight.",
  "Payload Race": "On Payload Race, split pressure carefully: one group delays enemy cart while the other keeps your cart moving.",
  "Special Delivery": "On Special Delivery, track the Australium carrier and play around launch-pad timing instead of taking random duels.",
  "Territorial Control": "On Territorial Control, rotations and spawn awareness matter more than memorized holds because the active route changes often.",
};

const mapImageUrl = (mapId: string) => {
  return `https://image.gametracker.com/images/maps/160x120/tf2/${mapId}.jpg`;
};

const WIKI_MAP_OVERVIEW_URLS: Partial<Record<string, string>> = {
  cp_badlands: "https://wiki.teamfortress.com/w/images/6/6f/Badlands_(Control_Point)_overview.png",
  cp_dustbowl: "https://wiki.teamfortress.com/w/images/3/31/Dustbowl_overview.png",
  cp_egypt_final: "https://wiki.teamfortress.com/w/images/1/12/Egypt_overview.png",
  cp_fastlane: "https://wiki.teamfortress.com/w/images/b/b8/Fastlane_overview.png",
  cp_foundry: "https://wiki.teamfortress.com/w/images/6/6b/Foundry_overview.png",
  cp_freight_final1: "https://wiki.teamfortress.com/w/images/9/9b/Freight_overview.png",
  cp_granary: "https://wiki.teamfortress.com/w/images/2/23/Granary_(Control_Point)_overview.png",
  cp_gullywash_final1: "https://wiki.teamfortress.com/w/images/2/27/Gullywash_overview.png",
  cp_junction_final: "https://wiki.teamfortress.com/w/images/1/1f/Junction_overview.png",
  cp_metalworks: "https://wiki.teamfortress.com/w/images/4/4a/Metalworks_overview.png",
  cp_powerhouse: "https://wiki.teamfortress.com/w/images/7/7a/Powerhouse_overview.png",
  cp_process_final: "https://wiki.teamfortress.com/w/images/1/16/Process_overview.png",
  cp_snakewater_final1: "https://wiki.teamfortress.com/w/images/9/9c/Snakewater_overview.png",
  cp_steel: "https://wiki.teamfortress.com/w/images/3/3d/Steel_overview.png",
  cp_sunshine: "https://wiki.teamfortress.com/w/images/e/eb/Sunshine_overview.png",
  cp_vanguard: "https://wiki.teamfortress.com/w/images/e/e2/Vanguard_overview.png",
  ctf_2fort: "https://wiki.teamfortress.com/w/images/0/0c/2Fort_overview.png",
  ctf_doublecross: "https://wiki.teamfortress.com/w/images/7/71/Double_Cross_overview.png",
  ctf_landfall: "https://wiki.teamfortress.com/w/images/5/5e/Landfall_overview.png",
  ctf_sawmill: "https://wiki.teamfortress.com/w/images/4/43/Sawmill_(Capture_the_Flag)_overview.png",
  ctf_turbine: "https://wiki.teamfortress.com/w/images/0/06/Turbine_overview.png",
  koth_badlands: "https://wiki.teamfortress.com/w/images/6/64/Badlands_(King_of_the_Hill)_overview.png",
  koth_harvest_final: "https://wiki.teamfortress.com/w/images/d/dd/Harvest_overview.png",
  koth_king: "https://wiki.teamfortress.com/w/images/f/fb/Kong_King_overview.png",
  koth_lakeside_final: "https://wiki.teamfortress.com/w/images/f/ff/Lakeside_overview.png",
  koth_nucleus: "https://wiki.teamfortress.com/w/images/d/d2/Nucleus_(Arena)_overview.png",
  koth_sawmill: "https://wiki.teamfortress.com/w/images/e/e2/Sawmill_(King_of_the_Hill)_overview.png",
  koth_viaduct: "https://wiki.teamfortress.com/w/images/5/58/Viaduct_overview.png",
  pl_badwater: "https://wiki.teamfortress.com/w/images/9/9d/Badwater_Basin_overview.png",
  pl_barnblitz: "https://wiki.teamfortress.com/w/images/2/22/Barnblitz_overview.png",
  pl_borneo: "https://wiki.teamfortress.com/w/images/f/f1/Borneo_overview_with_lines.png",
  pl_frontier_final: "https://wiki.teamfortress.com/w/images/1/13/Frontier_overview.png",
  pl_goldrush: "https://wiki.teamfortress.com/w/images/f/fb/Gold_Rush_overview.png",
  pl_hoodoo_final: "https://wiki.teamfortress.com/w/images/8/88/Hoodoo_overview.png",
  pl_swiftwater_final1: "https://wiki.teamfortress.com/w/images/c/c5/Swiftwater_overview.png",
  pl_thundermountain: "https://wiki.teamfortress.com/w/images/0/09/Thunder_Mountain_stage_one.png",
  pl_upward: "https://wiki.teamfortress.com/w/images/5/5e/Upward_overview.png",
  plr_hightower: "https://wiki.teamfortress.com/w/images/c/cd/Hightower_overview.png",
  plr_pipeline: "https://wiki.teamfortress.com/w/images/1/13/Pipeline_overview.png",
  plr_nightfall_final: "https://wiki.teamfortress.com/w/images/d/d8/Nightfall_overview.png",
  sd_doomsday: "https://wiki.teamfortress.com/w/images/f/f8/Doomsday_overview.png",
  tc_hydro: "https://wiki.teamfortress.com/w/images/d/d1/Hydro_overview.png",
};

const getDefaultMapImage = (mapId: string) => {
  return WIKI_MAP_OVERVIEW_URLS[mapId] ?? mapImageUrl(mapId);
};

const classPositionTone: Record<string, { strength: string; warning: string; goal: string }> = {
  scout: {
    strength: "fast rotations, off-angles, and escape routes",
    warning: "chasing kills into spam or sentry space",
    goal: "touch the flank, force attention, and leave before the trade arrives",
  },
  soldier: {
    strength: "height, splash pressure, and jump exits",
    warning: "bombing with no loaded rockets or no exit",
    goal: "make enemies move before your team commits",
  },
  pyro: {
    strength: "corners, teammate protection, and projectile denial",
    warning: "overchasing away from the team",
    goal: "deny pushes and make close doors dangerous",
  },
  demoman: {
    strength: "sticky control, doors, and choke timing",
    warning: "standing exposed while reloading",
    goal: "make the enemy spend health before crossing",
  },
  heavy: {
    strength: "short sightlines, cover, and Medic spacing",
    warning: "long Sniper lanes and late rotations",
    goal: "anchor a door and force enemies through Minigun damage",
  },
  engineer: {
    strength: "building value, metal access, and protected sightlines",
    warning: "building where spam can hit everything",
    goal: "turn useful space into a repeatable hold",
  },
  medic: {
    strength: "safe corners, beam range, and escape routes",
    warning: "standing in repeated Sniper or bomb paths",
    goal: "keep healing alive and preserve Uber timing",
  },
  sniper: {
    strength: "long sightlines, cover peeks, and fast fallbacks",
    warning: "staying scoped after being called out",
    goal: "threaten key targets without giving flankers a free route",
  },
  spy: {
    strength: "blind zones, timing windows, and backline exits",
    warning: "decloaking into watched routes",
    goal: "create information or a pick while the enemy is distracted",
  },
};

type AnchorKey = "point" | "main" | "flank" | "safe" | "high" | "last" | "pack" | "spawn" | "intel" | "cart";

interface MapLayout {
  bounds: [number, number, number, number];
  kind: "fivecp" | "attackdefense" | "ctf" | "koth" | "payload" | "race" | "special" | "territorial";
}

interface ClassSpotPlan {
  id: string;
  label: string;
  type: PositionType;
  anchor: AnchorKey;
  dx?: number;
  dy?: number;
  metrics: PositionMetrics;
}

const clamp = (value: number, min = 8, max = 92) => Math.min(max, Math.max(min, value));

const pointInBounds = (bounds: MapLayout["bounds"], x: number, y: number) => ({
  x: clamp(bounds[0] + bounds[2] * x),
  y: clamp(bounds[1] + bounds[3] * y),
});

const MODE_LAYOUT_KIND: Record<string, MapLayout["kind"]> = {
  "Control Points": "fivecp",
  "Capture the Flag": "ctf",
  "King of the Hill": "koth",
  Payload: "payload",
  "Payload Race": "race",
  "Special Delivery": "special",
  "Territorial Control": "territorial",
};

const MAP_LAYOUTS: Record<string, MapLayout> = {
  cp_badlands: { kind: "fivecp", bounds: [19, 15, 62, 66] },
  cp_dustbowl: { kind: "attackdefense", bounds: [16, 14, 68, 67] },
  cp_egypt_final: { kind: "attackdefense", bounds: [27, 18, 58, 57] },
  cp_fastlane: { kind: "fivecp", bounds: [14, 17, 72, 58] },
  cp_foundry: { kind: "fivecp", bounds: [15, 14, 70, 64] },
  cp_freight_final1: { kind: "fivecp", bounds: [16, 15, 68, 65] },
  cp_granary: { kind: "fivecp", bounds: [13, 18, 74, 56] },
  cp_gullywash_final1: { kind: "fivecp", bounds: [18, 14, 64, 68] },
  cp_junction_final: { kind: "attackdefense", bounds: [18, 13, 64, 70] },
  cp_metalworks: { kind: "fivecp", bounds: [14, 15, 72, 66] },
  cp_powerhouse: { kind: "attackdefense", bounds: [18, 13, 64, 71] },
  cp_process_final: { kind: "fivecp", bounds: [16, 13, 68, 69] },
  cp_snakewater_final1: { kind: "fivecp", bounds: [17, 13, 66, 70] },
  cp_steel: { kind: "attackdefense", bounds: [18, 12, 65, 72] },
  cp_sunshine: { kind: "fivecp", bounds: [15, 14, 70, 68] },
  cp_vanguard: { kind: "attackdefense", bounds: [17, 13, 67, 69] },
  ctf_2fort: { kind: "ctf", bounds: [15, 11, 70, 73] },
  ctf_doublecross: { kind: "ctf", bounds: [15, 12, 70, 72] },
  ctf_landfall: { kind: "ctf", bounds: [16, 12, 68, 72] },
  ctf_sawmill: { kind: "ctf", bounds: [16, 13, 68, 69] },
  ctf_turbine: { kind: "ctf", bounds: [18, 14, 64, 66] },
  koth_badlands: { kind: "koth", bounds: [18, 15, 64, 66] },
  koth_harvest_final: { kind: "koth", bounds: [17, 14, 66, 68] },
  koth_king: { kind: "koth", bounds: [18, 13, 64, 70] },
  koth_lakeside_final: { kind: "koth", bounds: [16, 12, 68, 72] },
  koth_nucleus: { kind: "koth", bounds: [20, 12, 60, 72] },
  koth_sawmill: { kind: "koth", bounds: [17, 13, 66, 70] },
  koth_suijin: { kind: "koth", bounds: [16, 12, 68, 72] },
  koth_viaduct: { kind: "koth", bounds: [18, 14, 64, 68] },
  pl_badwater: { kind: "payload", bounds: [14, 12, 72, 72] },
  pl_barnblitz: { kind: "payload", bounds: [16, 12, 68, 72] },
  pl_borneo: { kind: "payload", bounds: [15, 13, 70, 70] },
  pl_frontier_final: { kind: "payload", bounds: [16, 13, 68, 69] },
  pl_goldrush: { kind: "payload", bounds: [14, 12, 72, 72] },
  pl_hoodoo_final: { kind: "payload", bounds: [15, 12, 70, 72] },
  pl_swiftwater_final1: { kind: "payload", bounds: [15, 12, 70, 72] },
  pl_thundermountain: { kind: "payload", bounds: [15, 12, 70, 72] },
  pl_upward: { kind: "payload", bounds: [14, 12, 72, 72] },
  plr_hightower: { kind: "race", bounds: [16, 12, 68, 72] },
  plr_pipeline: { kind: "race", bounds: [15, 12, 70, 72] },
  plr_nightfall_final: { kind: "race", bounds: [15, 12, 70, 72] },
  sd_doomsday: { kind: "special", bounds: [16, 12, 68, 72] },
  tc_hydro: { kind: "territorial", bounds: [14, 12, 72, 72] },
};

const ANCHORS_BY_KIND: Record<MapLayout["kind"], Record<AnchorKey, { x: number; y: number }>> = {
  fivecp: {
    point: { x: 0.5, y: 0.5 },
    main: { x: 0.43, y: 0.48 },
    flank: { x: 0.28, y: 0.63 },
    safe: { x: 0.36, y: 0.34 },
    high: { x: 0.58, y: 0.28 },
    last: { x: 0.76, y: 0.62 },
    pack: { x: 0.33, y: 0.73 },
    spawn: { x: 0.84, y: 0.72 },
    intel: { x: 0.78, y: 0.54 },
    cart: { x: 0.5, y: 0.55 },
  },
  attackdefense: {
    point: { x: 0.58, y: 0.48 },
    main: { x: 0.5, y: 0.43 },
    flank: { x: 0.31, y: 0.57 },
    safe: { x: 0.42, y: 0.34 },
    high: { x: 0.66, y: 0.31 },
    last: { x: 0.81, y: 0.61 },
    pack: { x: 0.45, y: 0.68 },
    spawn: { x: 0.86, y: 0.7 },
    intel: { x: 0.72, y: 0.5 },
    cart: { x: 0.55, y: 0.55 },
  },
  ctf: {
    point: { x: 0.5, y: 0.5 },
    main: { x: 0.46, y: 0.47 },
    flank: { x: 0.28, y: 0.3 },
    safe: { x: 0.35, y: 0.66 },
    high: { x: 0.54, y: 0.28 },
    last: { x: 0.73, y: 0.62 },
    pack: { x: 0.33, y: 0.77 },
    spawn: { x: 0.82, y: 0.73 },
    intel: { x: 0.78, y: 0.5 },
    cart: { x: 0.5, y: 0.55 },
  },
  koth: {
    point: { x: 0.5, y: 0.5 },
    main: { x: 0.42, y: 0.5 },
    flank: { x: 0.26, y: 0.62 },
    safe: { x: 0.35, y: 0.72 },
    high: { x: 0.58, y: 0.32 },
    last: { x: 0.71, y: 0.7 },
    pack: { x: 0.29, y: 0.76 },
    spawn: { x: 0.78, y: 0.78 },
    intel: { x: 0.66, y: 0.48 },
    cart: { x: 0.5, y: 0.55 },
  },
  payload: {
    point: { x: 0.58, y: 0.55 },
    main: { x: 0.46, y: 0.57 },
    flank: { x: 0.28, y: 0.42 },
    safe: { x: 0.39, y: 0.66 },
    high: { x: 0.57, y: 0.32 },
    last: { x: 0.76, y: 0.58 },
    pack: { x: 0.35, y: 0.76 },
    spawn: { x: 0.84, y: 0.72 },
    intel: { x: 0.69, y: 0.46 },
    cart: { x: 0.5, y: 0.61 },
  },
  race: {
    point: { x: 0.5, y: 0.54 },
    main: { x: 0.45, y: 0.58 },
    flank: { x: 0.29, y: 0.42 },
    safe: { x: 0.36, y: 0.68 },
    high: { x: 0.57, y: 0.32 },
    last: { x: 0.72, y: 0.64 },
    pack: { x: 0.33, y: 0.78 },
    spawn: { x: 0.83, y: 0.72 },
    intel: { x: 0.66, y: 0.47 },
    cart: { x: 0.51, y: 0.62 },
  },
  special: {
    point: { x: 0.52, y: 0.5 },
    main: { x: 0.45, y: 0.5 },
    flank: { x: 0.3, y: 0.36 },
    safe: { x: 0.36, y: 0.68 },
    high: { x: 0.58, y: 0.28 },
    last: { x: 0.74, y: 0.65 },
    pack: { x: 0.32, y: 0.76 },
    spawn: { x: 0.82, y: 0.72 },
    intel: { x: 0.55, y: 0.46 },
    cart: { x: 0.52, y: 0.55 },
  },
  territorial: {
    point: { x: 0.5, y: 0.5 },
    main: { x: 0.45, y: 0.48 },
    flank: { x: 0.28, y: 0.58 },
    safe: { x: 0.37, y: 0.35 },
    high: { x: 0.6, y: 0.32 },
    last: { x: 0.75, y: 0.64 },
    pack: { x: 0.34, y: 0.74 },
    spawn: { x: 0.83, y: 0.72 },
    intel: { x: 0.67, y: 0.48 },
    cart: { x: 0.5, y: 0.55 },
  },
};

const CLASS_SPOT_PLANS: Record<string, ClassSpotPlan[]> = {
  scout: [
    { id: "flank-pack", label: "Flank Pack", type: "FLANK", anchor: "flank", dx: -2, dy: 1, metrics: { cover: 4, escape: 5, healthpack: 4, sightlines: 2 } },
    { id: "point-edge", label: "Point Edge", type: "AGGRESSIVE", anchor: "point", dx: -1, dy: 1, metrics: { cover: 3, escape: 4, healthpack: 2, sightlines: 3 } },
    { id: "main-exit", label: "Main Exit", type: "SAFE", anchor: "main", dx: -2, dy: 3, metrics: { cover: 4, escape: 5, healthpack: 3, sightlines: 2 } },
    { id: "high-wrap", label: "High Wrap", type: "FLANK", anchor: "high", dx: 1, dy: 0, metrics: { cover: 3, escape: 4, healthpack: 2, sightlines: 4 } },
    { id: "retake-door", label: "Retake Door", type: "LAST HOLD", anchor: "last", dx: -2, dy: 2, metrics: { cover: 4, escape: 4, healthpack: 3, sightlines: 3 } },
  ],
  soldier: [
    { id: "jump-roof", label: "Jump Roof", type: "AGGRESSIVE", anchor: "high", dx: 0, dy: -2, metrics: { cover: 3, escape: 3, healthpack: 1, sightlines: 5 } },
    { id: "main-spam", label: "Main Spam", type: "AGGRESSIVE", anchor: "main", dx: 1, dy: -1, metrics: { cover: 4, escape: 3, healthpack: 2, sightlines: 4 } },
    { id: "pack-reset", label: "Pack Reset", type: "SAFE", anchor: "pack", metrics: { cover: 4, escape: 5, healthpack: 5, sightlines: 2 } },
    { id: "flank-bomb", label: "Flank Bomb", type: "FLANK", anchor: "flank", dx: 2, dy: -2, metrics: { cover: 3, escape: 4, healthpack: 2, sightlines: 3 } },
    { id: "last-ledge", label: "Last Ledge", type: "LAST HOLD", anchor: "last", dx: 1, dy: -1, metrics: { cover: 4, escape: 3, healthpack: 3, sightlines: 5 } },
  ],
  pyro: [
    { id: "combo-corner", label: "Combo Corner", type: "SAFE", anchor: "safe", dx: 0, dy: 2, metrics: { cover: 5, escape: 4, healthpack: 3, sightlines: 2 } },
    { id: "choke-deny", label: "Choke Deny", type: "AGGRESSIVE", anchor: "main", dx: -1, dy: 1, metrics: { cover: 5, escape: 3, healthpack: 2, sightlines: 2 } },
    { id: "spycheck-route", label: "Spycheck Route", type: "FLANK", anchor: "flank", dx: 1, dy: 2, metrics: { cover: 4, escape: 5, healthpack: 3, sightlines: 2 } },
    { id: "cart-or-point", label: "Point Guard", type: "SAFE", anchor: "point", dx: 1, dy: 2, metrics: { cover: 4, escape: 3, healthpack: 2, sightlines: 3 } },
    { id: "last-airblast", label: "Last Airblast", type: "LAST HOLD", anchor: "last", dx: -1, dy: 1, metrics: { cover: 5, escape: 3, healthpack: 3, sightlines: 2 } },
  ],
  demoman: [
    { id: "sticky-door", label: "Sticky Door", type: "AGGRESSIVE", anchor: "main", dx: 0, dy: -1, metrics: { cover: 4, escape: 3, healthpack: 2, sightlines: 4 } },
    { id: "trap-pack", label: "Trap Pack", type: "SAFE", anchor: "pack", dx: -1, dy: -1, metrics: { cover: 5, escape: 4, healthpack: 5, sightlines: 2 } },
    { id: "high-spam", label: "High Spam", type: "AGGRESSIVE", anchor: "high", dx: -1, dy: 1, metrics: { cover: 3, escape: 3, healthpack: 2, sightlines: 5 } },
    { id: "flank-trap", label: "Flank Trap", type: "FLANK", anchor: "flank", dx: 2, dy: 1, metrics: { cover: 4, escape: 4, healthpack: 3, sightlines: 3 } },
    { id: "last-sticky", label: "Last Sticky", type: "LAST HOLD", anchor: "last", metrics: { cover: 5, escape: 3, healthpack: 3, sightlines: 4 } },
  ],
  heavy: [
    { id: "short-lane", label: "Short Lane", type: "SAFE", anchor: "safe", dx: 1, dy: 2, metrics: { cover: 5, escape: 3, healthpack: 3, sightlines: 2 } },
    { id: "combo-main", label: "Combo Main", type: "AGGRESSIVE", anchor: "main", dx: 2, dy: 2, metrics: { cover: 4, escape: 2, healthpack: 2, sightlines: 3 } },
    { id: "cart-anchor", label: "Point Anchor", type: "SAFE", anchor: "point", dx: 2, dy: 3, metrics: { cover: 4, escape: 3, healthpack: 2, sightlines: 3 } },
    { id: "rotate-cover", label: "Rotate Cover", type: "FLANK", anchor: "flank", dx: 3, dy: 3, metrics: { cover: 4, escape: 3, healthpack: 3, sightlines: 2 } },
    { id: "last-bodyblock", label: "Last Bodyblock", type: "LAST HOLD", anchor: "last", dx: 0, dy: 2, metrics: { cover: 5, escape: 2, healthpack: 3, sightlines: 3 } },
  ],
  engineer: [
    { id: "sentry-angle", label: "Sentry Angle", type: "LAST HOLD", anchor: "last", dx: -1, dy: -1, metrics: { cover: 5, escape: 2, healthpack: 3, sightlines: 5 } },
    { id: "dispenser-safe", label: "Dispenser Safe", type: "SAFE", anchor: "safe", dx: -1, dy: 2, metrics: { cover: 5, escape: 4, healthpack: 4, sightlines: 2 } },
    { id: "tele-exit", label: "Tele Exit", type: "SAFE", anchor: "spawn", dx: -3, dy: -2, metrics: { cover: 5, escape: 5, healthpack: 3, sightlines: 2 } },
    { id: "forward-mini", label: "Forward Mini", type: "AGGRESSIVE", anchor: "point", dx: 2, dy: -2, metrics: { cover: 3, escape: 3, healthpack: 2, sightlines: 4 } },
    { id: "flank-watch", label: "Flank Watch", type: "FLANK", anchor: "flank", dx: 0, dy: 2, metrics: { cover: 4, escape: 4, healthpack: 3, sightlines: 3 } },
  ],
  medic: [
    { id: "beam-corner", label: "Beam Corner", type: "SAFE", anchor: "safe", dx: -1, dy: 1, metrics: { cover: 5, escape: 5, healthpack: 3, sightlines: 1 } },
    { id: "uber-door", label: "Uber Door", type: "AGGRESSIVE", anchor: "main", dx: -2, dy: 2, metrics: { cover: 4, escape: 4, healthpack: 2, sightlines: 2 } },
    { id: "pack-reset", label: "Pack Reset", type: "SAFE", anchor: "pack", dx: 0, dy: 1, metrics: { cover: 5, escape: 5, healthpack: 5, sightlines: 1 } },
    { id: "rotate-call", label: "Rotate Call", type: "FLANK", anchor: "flank", dx: 2, dy: 3, metrics: { cover: 4, escape: 5, healthpack: 3, sightlines: 2 } },
    { id: "last-exit", label: "Last Exit", type: "LAST HOLD", anchor: "last", dx: -3, dy: 3, metrics: { cover: 5, escape: 5, healthpack: 3, sightlines: 1 } },
  ],
  sniper: [
    { id: "long-sight", label: "Long Sight", type: "AGGRESSIVE", anchor: "high", dx: 2, dy: -1, metrics: { cover: 3, escape: 3, healthpack: 1, sightlines: 5 } },
    { id: "safe-peek", label: "Safe Peek", type: "SAFE", anchor: "safe", dx: 2, dy: -2, metrics: { cover: 4, escape: 4, healthpack: 2, sightlines: 5 } },
    { id: "off-angle", label: "Off Angle", type: "FLANK", anchor: "flank", dx: -1, dy: -2, metrics: { cover: 3, escape: 4, healthpack: 3, sightlines: 4 } },
    { id: "point-cross", label: "Point Cross", type: "AGGRESSIVE", anchor: "point", dx: 3, dy: -3, metrics: { cover: 2, escape: 3, healthpack: 1, sightlines: 5 } },
    { id: "last-window", label: "Last Window", type: "LAST HOLD", anchor: "last", dx: 2, dy: -3, metrics: { cover: 4, escape: 3, healthpack: 2, sightlines: 5 } },
  ],
  spy: [
    { id: "decloak-corner", label: "Decloak Corner", type: "FLANK", anchor: "flank", dx: -2, dy: 2, metrics: { cover: 5, escape: 5, healthpack: 3, sightlines: 1 } },
    { id: "backline", label: "Backline", type: "AGGRESSIVE", anchor: "last", dx: -3, dy: -3, metrics: { cover: 4, escape: 4, healthpack: 2, sightlines: 2 } },
    { id: "pack-cloak", label: "Pack Cloak", type: "SAFE", anchor: "pack", dx: 1, dy: 1, metrics: { cover: 5, escape: 5, healthpack: 5, sightlines: 1 } },
    { id: "sapper-route", label: "Sapper Route", type: "FLANK", anchor: "spawn", dx: -5, dy: -3, metrics: { cover: 4, escape: 4, healthpack: 2, sightlines: 2 } },
    { id: "main-info", label: "Main Info", type: "SAFE", anchor: "main", dx: -3, dy: -2, metrics: { cover: 4, escape: 5, healthpack: 2, sightlines: 2 } },
  ],
};

const getSpotCopy = (classId: string, mapName: string, spot: Pick<PositionSpot, "label" | "type">) => {
  const tone = classPositionTone[classId] ?? classPositionTone.scout;
  const typeText: Record<PositionType, string> = {
    SAFE: "safe reset and team support",
    AGGRESSIVE: "early pressure and fight control",
    FLANK: "side pressure and fast timing",
    "LAST HOLD": "defensive survival and retake timing",
  };

  return {
    why: `${spot.label} gives this class ${tone.strength}. Use it for ${typeText[spot.type]} without forgetting your escape route.`,
    plus: [
      `Good for ${tone.goal}.`,
      "Easy to understand visually after one or two rounds.",
      `Works on ${mapName} because it connects to the next fight quickly.`,
    ],
    minus: [
      "Gets weaker if the enemy already pre-aims it.",
      "Needs a clean retreat route before you overcommit.",
      "Can be punished by spam when your team is late.",
    ],
    mistakes: [
      "Standing too long after being spotted.",
      `Forgetting that this spot is about ${typeText[spot.type]}, not random duels.`,
      tone.warning,
    ],
    coachNote: `${spot.label} is strong because it gives a choice: pressure, reset, or rotate. New players should learn the exit first, then the damage angle.`,
  };
};

const getDefaultPositionSpots = (classId: string, map: TF2MapInfo): PositionSpot[] => {
  const layout = MAP_LAYOUTS[map.id] ?? {
    kind: MODE_LAYOUT_KIND[map.mode] ?? "fivecp",
    bounds: [16, 13, 68, 69] as MapLayout["bounds"],
  };
  const anchors = ANCHORS_BY_KIND[layout.kind];
  const plan = CLASS_SPOT_PLANS[classId] ?? CLASS_SPOT_PLANS.scout;
  const screenshot = getDefaultMapImage(map.id);

  return plan.map((spot) => {
    const anchor = anchors[spot.anchor];
    const position = pointInBounds(layout.bounds, anchor.x, anchor.y);
    const copy = getSpotCopy(classId, map.name, spot);

    return {
      ...spot,
      x: clamp(position.x + (spot.dx ?? 0)),
      y: clamp(position.y + (spot.dy ?? 0)),
      screenshot,
      ...copy,
    };
  });
};

export const TF2_MAPS: TF2MapInfo[] = [
  { id: "cp_badlands", name: "Badlands", mode: "Control Points" },
  { id: "cp_dustbowl", name: "Dustbowl", mode: "Control Points" },
  { id: "cp_egypt_final", name: "Egypt", mode: "Control Points" },
  { id: "cp_fastlane", name: "Fastlane", mode: "Control Points" },
  { id: "cp_foundry", name: "Foundry", mode: "Control Points" },
  { id: "cp_freight_final1", name: "Freight", mode: "Control Points" },
  { id: "cp_granary", name: "Granary", mode: "Control Points" },
  { id: "cp_gullywash_final1", name: "Gullywash", mode: "Control Points" },
  { id: "cp_junction_final", name: "Junction", mode: "Control Points" },
  { id: "cp_metalworks", name: "Metalworks", mode: "Control Points" },
  { id: "cp_powerhouse", name: "Powerhouse", mode: "Control Points" },
  { id: "cp_process_final", name: "Process", mode: "Control Points" },
  { id: "cp_snakewater_final1", name: "Snakewater", mode: "Control Points" },
  { id: "cp_steel", name: "Steel", mode: "Control Points" },
  { id: "cp_sunshine", name: "Sunshine", mode: "Control Points" },
  { id: "cp_vanguard", name: "Vanguard", mode: "Control Points" },
  { id: "ctf_2fort", name: "2Fort", mode: "Capture the Flag" },
  { id: "ctf_doublecross", name: "Double Cross", mode: "Capture the Flag" },
  { id: "ctf_landfall", name: "Landfall", mode: "Capture the Flag" },
  { id: "ctf_sawmill", name: "Sawmill", mode: "Capture the Flag" },
  { id: "ctf_turbine", name: "Turbine", mode: "Capture the Flag" },
  { id: "koth_badlands", name: "Badlands KOTH", mode: "King of the Hill" },
  { id: "koth_harvest_final", name: "Harvest", mode: "King of the Hill" },
  { id: "koth_king", name: "Kong King", mode: "King of the Hill" },
  { id: "koth_lakeside_final", name: "Lakeside", mode: "King of the Hill" },
  { id: "koth_nucleus", name: "Nucleus", mode: "King of the Hill" },
  { id: "koth_sawmill", name: "Sawmill KOTH", mode: "King of the Hill" },
  { id: "koth_suijin", name: "Suijin", mode: "King of the Hill" },
  { id: "koth_viaduct", name: "Viaduct", mode: "King of the Hill" },
  { id: "pl_badwater", name: "Badwater Basin", mode: "Payload" },
  { id: "pl_barnblitz", name: "Barnblitz", mode: "Payload" },
  { id: "pl_borneo", name: "Borneo", mode: "Payload" },
  { id: "pl_frontier_final", name: "Frontier", mode: "Payload" },
  { id: "pl_goldrush", name: "Gold Rush", mode: "Payload" },
  { id: "pl_hoodoo_final", name: "Hoodoo", mode: "Payload" },
  { id: "pl_swiftwater_final1", name: "Swiftwater", mode: "Payload" },
  { id: "pl_thundermountain", name: "Thunder Mountain", mode: "Payload" },
  { id: "pl_upward", name: "Upward", mode: "Payload" },
  { id: "plr_hightower", name: "Hightower", mode: "Payload Race" },
  { id: "plr_pipeline", name: "Pipeline", mode: "Payload Race" },
  { id: "plr_nightfall_final", name: "Nightfall", mode: "Payload Race" },
  { id: "sd_doomsday", name: "Doomsday", mode: "Special Delivery" },
  { id: "tc_hydro", name: "Hydro", mode: "Territorial Control" },
];

// Put custom map screenshots in public/map-plans/ and reference them here.
// Example: scout: { cp_process_final: { image: "/map-plans/scout-process.png", pins: [...] } }
export const CLASS_POSITION_MAPS: Record<string, Record<string, ClassMapPosition>> = {
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

export const getClassMapPosition = (classId: string, mapId: string): ClassMapPosition => {
  const custom = CLASS_POSITION_MAPS[classId]?.[mapId];
  const map = TF2_MAPS.find((item) => item.id === mapId);
  if (custom && map) {
    return {
      ...custom,
      image: custom.image ?? getDefaultMapImage(mapId),
      spots: custom.spots ?? getDefaultPositionSpots(classId, map),
    };
  }
  if (custom) return custom;

  const classAdvice = CLASS_POSITION_ADVICE[classId] ?? "Play around your class role, preserve escape routes, and support your team's timing.";
  const modeAdvice = map ? MODE_ADVICE[map.mode] ?? "" : "";

  return {
    image: getDefaultMapImage(mapId),
    notes: `${classAdvice} ${modeAdvice}`.trim(),
    spots: map ? getDefaultPositionSpots(classId, map) : [],
  };
};

export const getMapImage = (classId: string, mapId: string): string => {
  const map = TF2_MAPS.find((item) => item.id === mapId);
  const plan = getClassMapPosition(classId, mapId);

  return plan.image ?? map?.image ?? getDefaultMapImage(mapId);
};

export const getMapPreviewImage = (classId: string, mapId: string): string => {
  const map = TF2_MAPS.find((item) => item.id === mapId);
  const customImage = CLASS_POSITION_MAPS[classId]?.[mapId]?.image;

  return customImage ?? map?.image ?? mapImageUrl(mapId);
};
