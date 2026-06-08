export interface CombatFlowStep {
  id: string;
  title: string;
  goal: string;
  tips: string[];
}

export interface DuelScenario {
  enemy: string;
  difficulty: number;
  goal: string;
  winCondition: string;
  avoid: string;
}

export interface CombatRules {
  takeFight: string[];
  avoidFight: string[];
  beforeFight: string[];
  afterFight: string[];
}

export interface CombatMistake {
  title: string;
  short: string;
  fix: string;
}

export interface CombatGuide {
  intro: string;
  flow: CombatFlowStep[];
  duels: DuelScenario[];
  rules: CombatRules;
  mistakes: CombatMistake[];
  coachNote: string;
}

const baseRules: CombatRules = {
  takeFight: ["Enemy is isolated", "You have ammo loaded", "You have cover or an escape route"],
  avoidFight: ["You are outnumbered", "You are reloading in the open", "The enemy controls the strongest range"],
  beforeFight: ["Loaded", "Escape route", "Enough HP", "Target priority"],
  afterFight: ["Reload", "Reposition", "Check flank", "Reset near cover"],
};

export const COMBAT_GUIDES: Record<string, CombatGuide> = {
  scout: {
    intro: "Scout combat is about choosing unfair fights: arrive fast, hit hard, move again, and leave before the enemy team can trade.",
    flow: [
      { id: "spot", title: "Spot Target", goal: "Find a weak, distracted, or isolated enemy.", tips: ["Look for players reloading.", "Prefer targets away from their Medic.", "Do not start with a Sentry watching you."] },
      { id: "close", title: "Close Distance", goal: "Enter Scattergun range without taking free damage.", tips: ["Use cover before speed.", "Double jump after danger appears.", "Approach from a side angle."] },
      { id: "meatshot", title: "Meatshot", goal: "Deal maximum close-range burst.", tips: ["Aim center mass.", "Shoot before panic jumping.", "Do not waste both shots at bad range."] },
      { id: "move", title: "Reposition", goal: "Break enemy aim after your first shot.", tips: ["Change height or side.", "Reload during movement.", "Do not stand where you were spotted."] },
      { id: "finish", title: "Finish", goal: "Secure the kill only if the trade is safe.", tips: ["Use pistol for runners.", "Leave if teammates turn on you.", "Health pack route matters more than style."] },
    ],
    duels: [
      { enemy: "Soldier", difficulty: 4, goal: "Force rocket misses.", winCondition: "Stay close enough to make splash awkward, then punish reloads.", avoid: "Long straight jumps and predictable landings." },
      { enemy: "Pyro", difficulty: 2, goal: "Maintain medium range.", winCondition: "Bait airblast/flame range, then shoot from outside corners.", avoid: "Following Pyro into tight rooms." },
      { enemy: "Heavy", difficulty: 5, goal: "Attack from flank only.", winCondition: "Shoot while Heavy is distracted or not spun up.", avoid: "Face-to-face duels." },
    ],
    rules: { ...baseRules, beforeFight: ["Loaded Scattergun", "Escape route", "HP above 90", "Target isolated"] },
    mistakes: [
      { title: "Overchasing", short: "You got damage. Now leave.", fix: "Only chase if your route still has cover or a pack." },
      { title: "Bad Double Jump", short: "Jumping early makes you readable.", fix: "Use the second jump as a reaction, not a habit." },
      { title: "Empty Clip Duel", short: "Scout without ammo is not pressure.", fix: "Reload during every reposition." },
    ],
    coachNote: "Scout wins combat because of exits, not because he can run in first.",
  },
  soldier: {
    intro: "Soldier combat is splash pressure plus timing. Good Soldiers make enemies move first, then punish where they land.",
    flow: [
      { id: "load", title: "Load Rockets", goal: "Enter fights with enough rockets to finish.", tips: ["Reload before peeking.", "Do not bomb with one rocket.", "Use corners to reload safely."] },
      { id: "take-height", title: "Take Height", goal: "Make your splash harder to dodge.", tips: ["Jump before the fight starts.", "Land near cover.", "Keep Medic beam range in mind."] },
      { id: "splash", title: "Splash Feet", goal: "Deal reliable damage and control movement.", tips: ["Aim at feet.", "Shoot exits, not only bodies.", "Juggle enemies into bad space."] },
      { id: "track", title: "Track Reloads", goal: "Know when you can keep pressure or must reset.", tips: ["Count rockets.", "Use shotgun if equipped.", "Do not dry peek empty."] },
      { id: "escape", title: "Exit", goal: "Survive after pressure so the damage matters.", tips: ["Save health for the jump out.", "Escape Plan only after cover.", "Do not land in Pyro range."] },
    ],
    duels: [
      { enemy: "Scout", difficulty: 4, goal: "Control landing spots.", winCondition: "Keep mid range and splash where Scout must land.", avoid: "Panic shooting direct rockets." },
      { enemy: "Pyro", difficulty: 4, goal: "Break airblast rhythm.", winCondition: "Delay shots or use shotgun.", avoid: "Obvious corner rockets." },
      { enemy: "Sniper", difficulty: 3, goal: "Cross safely or bomb quickly.", winCondition: "Use cover and unexpected jump timing.", avoid: "Slow repeated peeks." },
    ],
    rules: baseRules,
    mistakes: [
      { title: "Bombing Empty", short: "One rocket is not a plan.", fix: "Reload before jumping unless it is a sacrifice call." },
      { title: "Ignoring Pyro", short: "Airblast changes the duel.", fix: "Mix timing, shotgun, or different angles." },
      { title: "No Exit", short: "Damage without survival feeds.", fix: "Choose your landing and escape before jumping." },
    ],
    coachNote: "Soldier fights are won by forcing movement, not by praying for directs.",
  },
  pyro: {
    intro: "Pyro combat is control: deny projectiles, punish close entries, and make enemy pushes lose shape.",
    flow: [
      { id: "hold-corner", title: "Hold Corner", goal: "Fight where enemies must enter your range.", tips: ["Use doors and turns.", "Avoid long lanes.", "Listen before swinging."] },
      { id: "deny", title: "Deny Projectile", goal: "Stop rockets, pipes, and bombs from creating space.", tips: ["Read rhythm.", "Airblast early enough.", "Do not waste all ammo."] },
      { id: "ignite", title: "Ignite", goal: "Start damage and panic movement.", tips: ["Track escapes.", "Use flare/shotgun for runners.", "Do not chase too deep."] },
      { id: "push", title: "Displace", goal: "Move dangerous enemies away from teammates.", tips: ["Airblast Uber targets.", "Push bombers off height.", "Separate enemies from Medic."] },
      { id: "return", title: "Return To Team", goal: "Protect the space you are responsible for.", tips: ["Spy-check again.", "Watch Engineer/Medic.", "Reset after every chase."] },
    ],
    duels: [
      { enemy: "Soldier", difficulty: 2, goal: "Reflect or deny rockets.", winCondition: "Fight around corners and read reload timing.", avoid: "Open-range rocket spam." },
      { enemy: "Demoman", difficulty: 3, goal: "Clear stickies without feeding.", winCondition: "Airblast/pressure from safe range.", avoid: "Chasing through traps." },
      { enemy: "Heavy", difficulty: 5, goal: "Do not direct duel.", winCondition: "Ambush, airblast away, or wait for team damage.", avoid: "Walking into spun-up Minigun." },
    ],
    rules: baseRules,
    mistakes: [
      { title: "Overchasing", short: "Pyro leaves team, team loses protection.", fix: "Stop chase once the enemy exits your zone." },
      { title: "Airblast Spam", short: "No ammo means no control.", fix: "Reflect with purpose, then reset ammo." },
      { title: "Open-Lane Fighting", short: "Pyro is not a Sniper.", fix: "Rotate through cover before engaging." },
    ],
    coachNote: "Pyro's strongest combat value is making enemy plans fail.",
  },
  demoman: {
    intro: "Demoman combat is area ownership. The enemy should take damage before they are allowed to fight you.",
    flow: [
      { id: "trap", title: "Set Threat", goal: "Make a door or route dangerous.", tips: ["Trap exits.", "Hide stickies off obvious sight.", "Tell teammates what is trapped."] },
      { id: "spam", title: "Spam Choke", goal: "Drain HP before commitment.", tips: ["Use arcs.", "Alternate pipes and stickies.", "Keep reload rhythm."] },
      { id: "det", title: "Detonate Timing", goal: "Punish crossing, not empty space.", tips: ["Wait for commitment.", "Hit groups.", "Force Medic movement."] },
      { id: "pipe", title: "Pipe Duel", goal: "Defend yourself when enemies close distance.", tips: ["Aim where they land.", "Back up while firing.", "Use corners."] },
      { id: "rotate", title: "Rotate Trap", goal: "Stay unpredictable after enemies learn the first setup.", tips: ["Move after one kill.", "Trap the counter-route.", "Reload before holding again."] },
    ],
    duels: [
      { enemy: "Scout", difficulty: 5, goal: "Force narrow movement.", winCondition: "Use traps near your feet and pipe landing spots.", avoid: "Open flat duels." },
      { enemy: "Soldier", difficulty: 3, goal: "Win spam rhythm.", winCondition: "Deny his landing and stagger reloads.", avoid: "Standing still during rocket pressure." },
      { enemy: "Pyro", difficulty: 3, goal: "Keep range.", winCondition: "Punish Pyro before he clears stickies.", avoid: "Letting him walk into airblast range for free." },
    ],
    rules: baseRules,
    mistakes: [
      { title: "Sticky Tunnel Vision", short: "You forgot pipes exist.", fix: "Use pipes when enemies cross trap space." },
      { title: "Predictable Trap", short: "One good trap becomes one known trap.", fix: "Move it after it works." },
      { title: "Reload Panic", short: "Demo with no loaded damage loses space.", fix: "Reload behind cover before re-peeking." },
    ],
    coachNote: "Demoman wins fights before the enemy sees the full fight.",
  },
  heavy: {
    intro: "Heavy combat is commitment. You are slow, so the fight must happen where your Minigun already controls the space.",
    flow: [
      { id: "pre-spin", title: "Pre-Spin", goal: "Be ready before the enemy appears.", tips: ["Listen for footsteps.", "Spin near corners.", "Do not spin in Sniper lanes."] },
      { id: "anchor", title: "Anchor Cover", goal: "Fight from a place you can leave.", tips: ["Use short sightlines.", "Keep cover beside you.", "Stay near Medic if possible."] },
      { id: "track", title: "Track Target", goal: "Delete enemies who cannot escape.", tips: ["Focus one target.", "Do not flick randomly.", "Prioritize threats to Medic."] },
      { id: "tank", title: "Tank Pressure", goal: "Absorb damage only when it wins space.", tips: ["Use Sandvich after spam.", "Do not tank Sniper.", "Back out before overheal is gone."] },
      { id: "rotate", title: "Rotate Early", goal: "Move before the fight leaves you behind.", tips: ["Unspin to reposition.", "Use gloves if equipped.", "Leave before being surrounded."] },
    ],
    duels: [
      { enemy: "Scout", difficulty: 2, goal: "Track through dodges.", winCondition: "Stay spun and keep medium-short range.", avoid: "Letting Scout peek you from multiple angles." },
      { enemy: "Sniper", difficulty: 5, goal: "Avoid the duel.", winCondition: "Cross with cover or Uber.", avoid: "Standing in long sightlines." },
      { enemy: "Spy", difficulty: 4, goal: "Deny backstab timing.", winCondition: "Back to cover and listen for decloak.", avoid: "Tunnel vision while spun up." },
    ],
    rules: baseRules,
    mistakes: [
      { title: "Open Sightline", short: "Sniper decides the fight.", fix: "Use corners and short lanes." },
      { title: "Late Rotate", short: "Heavy arrives after the fight.", fix: "Move before your team fully leaves." },
      { title: "Selfish Sandvich", short: "Medic dies, push dies.", fix: "Drop Sandvich for Medic when needed." },
    ],
    coachNote: "Heavy is powerful when the enemy must enter his range, not when he must chase them.",
  },
  engineer: {
    intro: "Engineer combat is layered pressure: buildings create the fight, then your shotgun or Wrangler finishes it.",
    flow: [
      { id: "build", title: "Build Value", goal: "Make one area expensive to enter.", tips: ["Cover useful routes.", "Keep Dispenser reachable.", "Do not stack buildings too tightly."] },
      { id: "bait", title: "Bait Into Gun", goal: "Let enemies walk into Sentry pressure.", tips: ["Use yourself as soft bait.", "Do not stand in front of gun.", "Repair from cover."] },
      { id: "shotgun", title: "Shotgun Finish", goal: "Clean targets distracted by buildings.", tips: ["Peek with Sentry pressure.", "Reload safely.", "Do not chase far from nest."] },
      { id: "deny-sap", title: "Deny Sap", goal: "Keep the nest alive during Spy pressure.", tips: ["Spy-check between waves.", "Hit sappers fast.", "Call Spy route."] },
      { id: "relocate", title: "Relocate", goal: "Move before enemies solve the angle.", tips: ["Rescue early.", "Rotate after Uber pressure.", "Rebuild around team space."] },
    ],
    duels: [
      { enemy: "Spy", difficulty: 4, goal: "Deny sap timing.", winCondition: "Spy-check and keep buildings visible to teammates.", avoid: "Repair tunnel vision." },
      { enemy: "Demoman", difficulty: 5, goal: "Survive spam.", winCondition: "Wrangler/Rescue and relocate before collapse.", avoid: "Static obvious nests." },
      { enemy: "Scout", difficulty: 2, goal: "Force Scout into Sentry tracking.", winCondition: "Cover flank and use shotgun when he baits gun.", avoid: "Leaving the nest alone." },
    ],
    rules: baseRules,
    mistakes: [
      { title: "Static Nest", short: "Enemies solve it once.", fix: "Move after they organize spam." },
      { title: "No Dispenser Value", short: "Your team cannot use the hold.", fix: "Place Dispenser for teammates, not only yourself." },
      { title: "Chasing Spy", short: "Nest dies behind you.", fix: "Clear sap first, chase second." },
    ],
    coachNote: "Engineer combat is strongest when the enemy fights your buildings and you at the same time.",
  },
  medic: {
    intro: "Medic combat is survival under pressure. You win fights by keeping the right teammate alive and using Uber before danger becomes death.",
    flow: [
      { id: "read", title: "Read Threat", goal: "Know what can kill you before it appears.", tips: ["Track Spy/Sniper.", "Watch bomb routes.", "Listen to calls."] },
      { id: "beam", title: "Beam Priority", goal: "Heal the player who keeps you alive or wins the fight.", tips: ["Do not heal randomly.", "Overheal before contact.", "Crossbow distant saves."] },
      { id: "kite", title: "Kite Damage", goal: "Move backward without dropping beam value.", tips: ["Use corners.", "Surf explosions.", "Do not back into dead ends."] },
      { id: "pop", title: "Pop Uber", goal: "Use Uber before you die or lose the fight.", tips: ["Early Uber beats dropped Uber.", "Call target focus.", "Leave after value ends."] },
      { id: "reset", title: "Reset", goal: "Survive after the push.", tips: ["Reload crossbow.", "Check flank.", "Rebuild safely."] },
    ],
    duels: [
      { enemy: "Spy", difficulty: 5, goal: "Never give free backstab timing.", winCondition: "Stand near teammates and vary routes.", avoid: "Healing while isolated." },
      { enemy: "Sniper", difficulty: 5, goal: "Deny sightline value.", winCondition: "Cross late with overheal and cover.", avoid: "Slow repeated peeks." },
      { enemy: "Scout", difficulty: 4, goal: "Live until teammate trades.", winCondition: "Surf damage and call early.", avoid: "Running alone through flanks." },
    ],
    rules: { ...baseRules, takeFight: ["Teammate can trade for you", "Uber timing is ready", "Enemy commit is punishable"], avoidFight: ["You are isolated", "No teammate can see you", "Sniper/Spy route is unchecked"] },
    mistakes: [
      { title: "Greedy Heal", short: "One heal costs your life.", fix: "Let doomed teammates go if saving them kills Medic." },
      { title: "Dropped Uber", short: "Perfect Uber on the floor is useless.", fix: "Pop slightly early under lethal pressure." },
      { title: "Static Pathing", short: "Spy learns your route.", fix: "Vary exits and stand near trades." },
    ],
    coachNote: "Medic combat is not about winning duels; it is about refusing to be the enemy's win condition.",
  },
  sniper: {
    intro: "Sniper combat is pick timing. You create fear with sightlines, then rotate before enemies collapse on the angle.",
    flow: [
      { id: "angle", title: "Choose Angle", goal: "See key targets while keeping cover.", tips: ["Hold one useful lane.", "Keep fallback close.", "Avoid obvious repeat spots."] },
      { id: "charge", title: "Charge With Intent", goal: "Charge only when the shot matters.", tips: ["Medic and Heavy are priority.", "Bodyshot if it secures value.", "Do not tunnel vision."] },
      { id: "pick", title: "Take Pick", goal: "Remove a target that changes the fight.", tips: ["Shoot timing windows.", "Call the pick.", "Expect counter-peek."] },
      { id: "unscope", title: "Unscope Check", goal: "Avoid Spy and flank deaths.", tips: ["Check behind.", "Listen for decloak.", "Stay near team support."] },
      { id: "rotate", title: "Rotate", goal: "Leave before enemies pre-aim you.", tips: ["Change height.", "Change timing.", "Do not ego repeat."] },
    ],
    duels: [
      { enemy: "Sniper", difficulty: 5, goal: "Win timing and angle.", winCondition: "Change peek rhythm and height.", avoid: "Repeeking the same head position." },
      { enemy: "Scout", difficulty: 4, goal: "Survive close pressure.", winCondition: "Back toward team and use SMG/Jarate.", avoid: "Staying scoped too long." },
      { enemy: "Spy", difficulty: 4, goal: "Deny tunnel vision.", winCondition: "Unscope checks and stand near support.", avoid: "Isolated long holds." },
    ],
    rules: baseRules,
    mistakes: [
      { title: "Repeek Ego", short: "Enemy already knows.", fix: "Rotate after a pick or missed duel." },
      { title: "Scoped Forever", short: "Spy loves this.", fix: "Unscope between shots and check audio." },
      { title: "Low-Value Picks", short: "Not every kill wins space.", fix: "Prioritize Medic, Demo, Heavy, Engineer, Sniper." },
    ],
    coachNote: "Sniper's best combat skill is making the enemy respect a sightline you may already be leaving.",
  },
  spy: {
    intro: "Spy combat is timing and value. The goal is not constant dueling; it is breaking the enemy's plan at the right second.",
    flow: [
      { id: "info", title: "Gather Info", goal: "Know Uber, sentry, and backline positions.", tips: ["Call what you see.", "Do not rush first target.", "Track Pyro patrol."] },
      { id: "route", title: "Choose Route", goal: "Enter through blind zones.", tips: ["Avoid common spy-check paths.", "Use noise to mask decloak.", "Plan escape before stab."] },
      { id: "wait", title: "Wait Timing", goal: "Attack when enemies look forward.", tips: ["Use team pressure.", "Wait for spam/fight noise.", "Avoid bored backlines."] },
      { id: "pick", title: "Pick Value", goal: "Stab or shoot the target that changes the fight.", tips: ["Medic, Sniper, Engineer matter.", "Sap with team spam.", "Gun low targets."] },
      { id: "escape", title: "Escape Or Chain", goal: "Live after value or punish panic.", tips: ["Cloak instantly.", "Do not run through Pyro.", "Chain only if enemies are distracted."] },
    ],
    duels: [
      { enemy: "Pyro", difficulty: 5, goal: "Avoid direct combat.", winCondition: "Wait until Pyro leaves patrol or is distracted.", avoid: "Decloaking near flames." },
      { enemy: "Engineer", difficulty: 4, goal: "Break nest timing.", winCondition: "Coordinate sap with team pressure.", avoid: "Solo-sapping watched buildings." },
      { enemy: "Sniper", difficulty: 2, goal: "Punish scoped isolation.", winCondition: "Decloak outside audio range and leave after stab.", avoid: "Running through predictable sniper routes." },
    ],
    rules: { ...baseRules, takeFight: ["Enemy is distracted", "Escape route is planned", "Target is high value"], avoidFight: ["Pyro is watching", "No team pressure", "Decloak route is obvious"] },
    mistakes: [
      { title: "Forcing Stabs", short: "Bad timing reveals you.", fix: "Wait for team pressure or gather info instead." },
      { title: "No Escape", short: "One stab, one death.", fix: "Plan cloak path before the pick." },
      { title: "Low-Value Tunnel", short: "A random kill can waste timing.", fix: "Prioritize Medic, Sniper, Engineer, and calls." },
    ],
    coachNote: "Spy combat is strongest when the enemy is already busy fighting someone else.",
  },
};

export const getCombatGuide = (classId: string): CombatGuide => COMBAT_GUIDES[classId] ?? COMBAT_GUIDES.scout;
