export interface MatchupTarget {
  classId: string;
  name: string;
  image: string;
  reason: string;
  approach: string;
}

export interface MatchupCombo {
  style: string;
  title: string;
  description: string;
  loadouts: string[];
  tips: string[];
}

export interface MatchupGuide {
  introTitle: string;
  intro: string;
  targets: MatchupTarget[];
  counters: MatchupTarget[];
  combo: MatchupCombo;
  personalTip: string;
}

export const CLASS_MODEL_IMAGES: Record<string, string> = {
  scout: "https://wiki.teamfortress.com/w/images/6/69/Scout.png",
  soldier: "https://wiki.teamfortress.com/w/images/7/7b/Soldier.png",
  pyro: "https://wiki.teamfortress.com/w/images/c/c8/Pyro.png",
  demoman: "https://wiki.teamfortress.com/w/images/thumb/f/fd/Demoman.png/375px-Demoman.png",
  heavy: "https://wiki.teamfortress.com/w/images/0/08/Heavy.png",
  engineer: "https://wiki.teamfortress.com/w/images/thumb/d/d8/Engineer.png/375px-Engineer.png",
  medic: "https://wiki.teamfortress.com/w/images/2/26/Medic.png",
  sniper: "https://wiki.teamfortress.com/w/images/8/8f/Sniper.png",
  spy: "https://wiki.teamfortress.com/w/images/3/36/Spy.png",
};

const target = (classId: string, reason: string, approach: string): MatchupTarget => ({
  classId,
  name: classId[0].toUpperCase() + classId.slice(1),
  image: CLASS_MODEL_IMAGES[classId],
  reason,
  approach,
});

export const CLASS_MATCHUPS: Record<string, MatchupGuide> = {
  scout: {
    introTitle: "The goal of the game and targets:",
    intro: "Scout's job is constant movement: split enemies from their team, punish slow rotations, and make the backline turn around before the main fight starts.",
    targets: [
      target("medic", "Medic loses fights when Scout forces panic movement and breaks beam safety.", "Enter from a side route, force an early pop or surf, then leave before the pocket trades you."),
      target("sniper", "Sniper needs calm sightlines; Scout removes that comfort with speed and short-range pressure.", "Cross with double jumps, avoid straight paths, and finish before Sniper retreats into teammates."),
      target("spy", "Scout's speed makes Spy routes unsafe and catches disguises before they reach the backline.", "Check flank doors and health packs, then chase only while you still have an escape route."),
    ],
    counters: [
      target("heavy", "Heavy tracks Scout through dodges and has enough health to survive a messy ambush.", "Do not duel a spun-up Heavy alone; chip from off-angles or wait until he is distracted."),
      target("soldier", "Soldier splash removes Scout's movement advantage when he holds mid range.", "Bait rockets before committing and never double-jump in a straight arc."),
      target("engineer", "Sentry tracking shuts down Scout's free movement around objectives and flanks.", "Avoid open sentry arcs; call spam, pistol chip, or catch Engineer away from the nest."),
    ],
    combo: {
      style: "Fast pick combo",
      title: "Scout + Medic",
      description: "Scout scouts safe routes, clears flankers, and calls weak targets. Medic stays one corner behind and uses crossbow saves instead of long open lanes.",
      loadouts: ["Scout: Scattergun + Mad Milk + Atomizer", "Medic: Crusader's Crossbow + Medi Gun + Ubersaw"],
      tips: ["Scout should not outrun beam range before a fight starts.", "Medic uses Scout speed to rotate early, not to force every duel.", "Mad Milk gives sustain when Uber is not ready."],
    },
    personalTip: "Do not take fair duels. Scout wins by arriving first, shooting first, and leaving first.",
  },
  soldier: {
    introTitle: "Pressure targets and space control:",
    intro: "Soldier controls where enemies are allowed to stand. Use splash to move fragile targets out of cover, then take high ground before they can reset.",
    targets: [
      target("engineer", "Engineer setups hate repeated splash from height and corners.", "Break Dispenser angles first, reload fully, then spam the Sentry from cover."),
      target("sniper", "A Soldier bomb can force Sniper off the line even without a kill.", "Jump from an unseen route, land close enough for splash, and call the forced retreat."),
      target("medic", "Medic is vulnerable when rockets split him from his pocket.", "Aim splash behind the Medic to cut retreat, then finish only if you can still escape."),
    ],
    counters: [
      target("pyro", "Airblast denies rockets, ruins bombs, and pushes Soldier away from kill range.", "Mix shotgun pressure, delay rockets, and avoid predictable corner shots."),
      target("scout", "Scout dodges rockets and punishes Soldier while he reloads.", "Keep mid-range spacing and aim splash at Scout's landing spots."),
      target("sniper", "Sniper punishes slow peeks before Soldier creates pressure.", "Cross with jumps from cover and do not repeat the same high-ground peek."),
    ],
    combo: {
      style: "Classic push combo",
      title: "Soldier + Medic",
      description: "Soldier takes height and corners first, then Medic crosses when splash pressure is already created. Always leave an exit before committing Uber.",
      loadouts: ["Soldier: Rocket Launcher + Shotgun/Gunboats + Escape Plan", "Medic: Medi Gun or Kritzkrieg"],
      tips: ["Reload discipline decides whether cleanup works.", "Kritz is strongest near grouped chokes.", "Gunboats roam better, Shotgun protects Medic better."],
    },
    personalTip: "Count your rockets in your head; empty Soldier is only scary if the enemy forgot to check.",
  },
  pyro: {
    introTitle: "Ambush and denial targets:",
    intro: "Pyro wins when enemies enter close range or fire predictable projectiles. Protect teammates first, then punish anyone who walks into your corner.",
    targets: [
      target("spy", "Flames reveal cloak and disguises instantly, making Spy's safest routes dangerous.", "Sweep common decloak corners and stay close enough to remove sappers."),
      target("soldier", "Airblast turns Soldier's strongest tool into wasted tempo.", "Hold corners, listen for reload rhythm, and reflect when the rocket path is readable."),
      target("demoman", "Pyro can deny pipes, push Uber targets away, and clear sticky traps.", "Do not chase through sticky zones; clear space, then let your team cross."),
    ],
    counters: [
      target("heavy", "Heavy out-damages Pyro unless Pyro starts from a clean ambush.", "Avoid direct Minigun walks; use corners, teammates, or airblast to escape."),
      target("sniper", "Sniper controls the long lanes Pyro must cross to reach close range.", "Rotate through cover and never dry-cross repeated sightlines."),
      target("engineer", "Sentries stop Pyro from freely walking into the backline or nest.", "Reflect spam and wait for team damage before committing into the gun."),
    ],
    combo: {
      style: "Nest protection",
      title: "Pyro + Engineer",
      description: "Pyro patrols blind zones, denies projectiles, and removes sappers while Engineer keeps the nest useful and hard to spam out.",
      loadouts: ["Pyro: Flame Thrower + Shotgun/Scorch Shot + Homewrecker", "Engineer: Rescue Ranger + Wrangler + Jag"],
      tips: ["Pyro should not chase too far from the nest.", "Airblast buys time for Engineer repairs.", "Move the nest before enemies solve the angle."],
    },
    personalTip: "Your best airblast is often the one that moves an enemy Uber away from your team.",
  },
  demoman: {
    introTitle: "Choke control targets:",
    intro: "Demoman punishes teams that group up, cross doors, or ignore sticky threat. Make the enemy spend health before the real fight begins.",
    targets: [
      target("engineer", "Sticky pressure breaks buildings and forces Engineer to repair instead of fight.", "Place stickies where Engineer must stand, then use pipes to punish repair movement."),
      target("medic", "Medic hates unavoidable splash and sticky traps near retreat routes.", "Trap exits before the push, then detonate when Medic backs away from the frontline."),
      target("sniper", "Spam forces Sniper off repeat peeks and makes sightlines unsafe.", "Use indirect arcs and rotate after the Sniper notices you."),
    ],
    counters: [
      target("scout", "Scout dodges pipes, slips past sticky zones, and punishes reloads.", "Keep traps near your feet and force Scout through narrow paths."),
      target("sniper", "Sniper punishes Demoman when he repeats slow choke peeks.", "Use indirect spam and rotate your trap angle after Sniper sees you."),
      target("pyro", "Pyro reflects pipes, clears stickies, and disrupts setup timing.", "Trap outside airblast range and punish Pyro when he overextends to clear."),
    ],
    combo: {
      style: "Explosive space control",
      title: "Demoman + Soldier",
      description: "Demoman locks the choke first, Soldier pressures height and punishes enemies trying to dodge stickies. Stagger reloads so damage never fully stops.",
      loadouts: ["Demoman: Grenade Launcher + Stickybomb Launcher", "Soldier: Rocket Launcher + Gunboats or Buff Banner"],
      tips: ["Call sticky traps before Soldier bombs.", "Soldier should force movement into Demo spam.", "Buff Banner turns good spam into a fight-winning push."],
    },
    personalTip: "Your stickies are a warning sign. Put them where enemies want to go.",
  },
  heavy: {
    introTitle: "Frontline targets:",
    intro: "Heavy anchors short sightlines and deletes enemies who cannot escape. Pick fights where enemies must walk into Minigun damage.",
    targets: [
      target("pyro", "Heavy out-damages Pyro when already spun up and outside point-blank ambush range.", "Pre-spin before corners, keep distance, and avoid being airblasted into bad sightlines."),
      target("engineer", "Heavy can tank angles long enough to clear exposed buildings with team support.", "Wait for heals or Uber, focus the nest angle, then retreat before spam stacks up."),
      target("soldier", "Soldier struggles to trade through Heavy's health pool when caught without height.", "Hold short corners, track reloads, and punish jump landings with full spin damage."),
    ],
    counters: [
      target("sniper", "Heavy's slow movement makes him one of Sniper's easiest high-value targets.", "Avoid long lanes and cross only with cover, teammates, or Uber."),
      target("spy", "Heavy often tunnel-visions while spun up, giving Spy clean backstab timing.", "Back against safe cover and ask teammates to watch your blind side."),
      target("demoman", "Sticky traps and splash punish Heavy before he can close distance.", "Do not walk into sticky doors; wait for clears, heals, or a better rotation."),
    ],
    combo: {
      style: "Frontline anchor",
      title: "Heavy + Medic",
      description: "Heavy anchors short sightlines and denies doors. Medic plays behind cover, tracks Sniper angles, and uses Sandvich drops to stabilize after spam.",
      loadouts: ["Heavy: Minigun/Tomislav + Sandvich + Fists of Steel", "Medic: Medi Gun + Crusader's Crossbow"],
      tips: ["Avoid long Sniper lanes unless Uber is ready.", "Pre-spin before corners, then unspin to rotate.", "Sandvich is often stronger as a Medic save."],
    },
    personalTip: "Rotate before the fight is urgent; late Heavy rotations feel impossible for a reason.",
  },
  engineer: {
    introTitle: "Area denial targets:",
    intro: "Engineer counters fast or careless pushes by making map space expensive. Buildings should cover routes, protect teammates, and force enemy resources.",
    targets: [
      target("scout", "Sentry tracking removes Scout's freedom to dance around open space.", "Cover flank doors and health packs, then shotgun Scout when he tries to bait the gun."),
      target("soldier", "Wrangler and smart sentry angles punish predictable Soldier bombs.", "Avoid obvious low-ground nests, repair through splash, and relocate when spam is organized."),
      target("pyro", "Buildings stop Pyro from freely walking into your team.", "Keep distance, protect the Dispenser, and do not let Pyro isolate you from the sentry."),
    ],
    counters: [
      target("demoman", "Demoman breaks nests with indirect sticky pressure and repair panic.", "Change building angles before spam becomes organized."),
      target("spy", "Sappers and backstabs erase Engineer value when he stops checking routes.", "Spy-check between repairs and place buildings where teammates can see sappers."),
      target("soldier", "Soldier spams from height and drains metal faster than the nest recovers.", "Wrangle through short pressure, then relocate if he gets a repeat angle."),
    ],
    combo: {
      style: "Defensive machine",
      title: "Engineer + Pyro",
      description: "Engineer creates the hard point; Pyro keeps it alive by checking Spy, reflecting spam, and pushing Uber targets away.",
      loadouts: ["Engineer: Rescue Ranger + Wrangler + Jag", "Pyro: Degreaser/Flame Thrower + Homewrecker"],
      tips: ["The Dispenser angle matters as much as the Sentry angle.", "Pyro patrol should be short and repeatable.", "Rotate buildings when enemies start coordinating."],
    },
    personalTip: "A teleporter that works for two minutes can win more space than one loud sentry kill.",
  },
  medic: {
    introTitle: "Survival and priority targets:",
    intro: "Medic counters by denying enemy value: keep the right player alive, track danger classes, and turn enemy commits into wasted resources.",
    targets: [
      target("spy", "Good positioning and awareness remove Spy's highest-value pick.", "Vary routes, listen for decloaks, and stand where a teammate can instantly trade."),
      target("sniper", "Medic can deny Sniper value by refusing static sightlines and healing safe crosses.", "Cross late, overheal before sightlines, and never repeat a slow peek."),
      target("pyro", "Uber and beam discipline stop Pyro from turning chaos into a dropped Medic.", "Stay outside ambush corners, call airblast threats, and pop before separation."),
    ],
    counters: [
      target("spy", "Spy removes Medic instantly when routes and decloak sounds are ignored.", "Stand where teammates can trade and change route after every suspicious death."),
      target("sniper", "Sniper punishes static Medic peeks and slow open-lane crossings.", "Overheal before crossing and never re-peek the same lane slowly."),
      target("scout", "Scout outruns pockets and forces Medic to surf, pop early, or drop.", "Stay one corner behind your combat class and call Scout early."),
    ],
    combo: {
      style: "Mobile sustain",
      title: "Medic + Scout",
      description: "Medic uses Scout speed for early rotations and crossbow saves. Scout clears flankers and tells Medic when a route is safe.",
      loadouts: ["Medic: Crusader's Crossbow + Medi Gun + Ubersaw", "Scout: Scattergun + Mad Milk + Atomizer"],
      tips: ["Do not follow Scout into every duel.", "Use speed for rotation, not panic chasing.", "Crossbow before beam when Scout leaves range."],
    },
    personalTip: "Your life is the team's timer. A boring safe rotate is often the strongest play.",
  },
  sniper: {
    introTitle: "Pick targets:",
    intro: "Sniper counters important classes by making them respect sightlines. Aim at the target whose death changes the next fight.",
    targets: [
      target("medic", "A Medic pick removes healing, Uber timing, and confidence to push.", "Hold patient off-angles and shoot when Medic commits to a beam or cross."),
      target("engineer", "Killing Engineer opens windows for your team to destroy the nest.", "Watch repair spots and Dispenser peeks, then call the timing for spam."),
      target("soldier", "Sniper punishes Soldier before he can take height or begin a bomb.", "Pre-aim jump routes, bodyshot when needed, and reposition after calls."),
    ],
    counters: [
      target("spy", "Spy punishes scoped tunnel vision and isolated sightlines.", "Unscope often, change positions after shots, and stand near teammates."),
      target("scout", "Scout closes distance fast and makes scoped aiming uncomfortable.", "Hold safer lines near your team and switch to SMG/Jarate before point blank."),
      target("soldier", "Soldier bombs can force Sniper off angles even without killing.", "Watch jump routes, keep an escape path, and rotate after Soldiers pre-aim you."),
    ],
    combo: {
      style: "Pick and protect",
      title: "Sniper + Engineer",
      description: "Engineer protects Sniper's flank and retreat path while Sniper clears the long angles that make the nest hard to attack.",
      loadouts: ["Sniper: Sniper Rifle + Jarate/SMG + Kukri", "Engineer: Wrangler + Dispenser-first support"],
      tips: ["Sniper should stand close enough to retreat through the nest.", "Engineer must keep flank routes covered.", "One pick is the cue to rotate or push."],
    },
    personalTip: "After a kill, assume the next enemy already knows where your head will be.",
  },
  spy: {
    introTitle: "Backline disruption targets:",
    intro: "Spy counters value, not health bars. The best stab breaks a push, removes a sightline, or opens a sentry nest.",
    targets: [
      target("medic", "Medic is the highest-value pick because one stab can erase Uber advantage.", "Wait for noise and forward movement, then stab when Medic watches damage."),
      target("sniper", "Sniper scopes in, isolates himself, and creates clean timing windows.", "Decloak far enough away to avoid sound checks, then leave immediately."),
      target("heavy", "Always pressure and Heavy picks let your team break defensive holds.", "Try to kill the tank of enemy team, it tooks some free time for something important."),
    ],
    counters: [
      target("pyro", "Pyro reveals cloak, checks disguises, removes sappers, and denies escape.", "Avoid Pyro patrol routes and wait until he chases before entering."),
      target("scout", "Scout's speed catches cloaked routes and makes disguises easier to test.", "Decloak farther away and avoid watched health packs or flank doors."),
      target("engineer", "Engineer spy-checks while buildings reveal where Spy wants to attack.", "Coordinate sap timing with team spam instead of solo-sapping a watched nest."),
    ],
    combo: {
      style: "Silent opening",
      title: "Spy + Sniper",
      description: "Spy forces enemies to turn around while Sniper punishes panic peeks. Together they make the backline unsafe from both directions.",
      loadouts: ["Spy: Revolver + Knife + Invis Watch/Dead Ringer", "Sniper: Sniper Rifle + Jarate or SMG"],
      tips: ["Spy should call when enemies turn around.", "Sniper holds the escape lane after Spy attacks.", "Do not both tunnel the same low-value target."],
    },
    personalTip: "Information is a weapon. Calling Uber, sentry position, or Sniper angle can beat a forced stab.",
  },
};

export const getClassMatchups = (classId: string): MatchupGuide => CLASS_MATCHUPS[classId] ?? CLASS_MATCHUPS.scout;
