import { MOCK_WEAPONS } from "@/data/mockWeapons";
import { getWeaponImageUrl } from "@/data/weaponImageUrls";
import type { Weapon } from "@/types/weapons";
import scoutMeta from "@/assets/meta-tier/scout.png";
import soldierMeta from "@/assets/meta-tier/soldier.png";
import pyroMeta from "@/assets/meta-tier/pyro.png";
import demomanMeta from "@/assets/meta-tier/demoman.png";
import heavyMeta from "@/assets/meta-tier/heavy.png";
import engineerMeta from "@/assets/meta-tier/engineer.jpg";
import medicMeta from "@/assets/meta-tier/medic.png";
import sniperMeta from "@/assets/meta-tier/sniper.png";
import spyMeta from "@/assets/meta-tier/spy.jpeg";

export interface MetaCombo {
  id: string;
  title: string;
  classes: string[];
  style: string;
  loadouts: string[];
  movement: string;
  proTips: string[];
  videoId?: string;
}

export interface MetaTierImage {
  title: string;
  patchLabel: string;
  image: string;
}

export const META_WEAPONS = Object.values(MOCK_WEAPONS).flatMap((entry) => entry.weapons);

export const META_CLASS_IDS = [
  "scout",
  "soldier",
  "pyro",
  "demoman",
  "heavy",
  "engineer",
  "medic",
  "sniper",
  "spy",
];

export const META_PATCH_LABEL = "Community weapon meta - working patch notes, May 2026";

export const META_TIER_IMAGES: Record<string, MetaTierImage> = {
  scout: {
    title: "Scout current meta board",
    patchLabel: META_PATCH_LABEL,
    image: scoutMeta,
  },
  soldier: {
    title: "Soldier current meta board",
    patchLabel: META_PATCH_LABEL,
    image: soldierMeta,
  },
  pyro: {
    title: "Pyro current meta board",
    patchLabel: META_PATCH_LABEL,
    image: pyroMeta,
  },
  demoman: {
    title: "Demoman current meta board",
    patchLabel: META_PATCH_LABEL,
    image: demomanMeta,
  },
  heavy: {
    title: "Heavy current meta board",
    patchLabel: META_PATCH_LABEL,
    image: heavyMeta,
  },
  engineer: {
    title: "Engineer current meta board",
    patchLabel: META_PATCH_LABEL,
    image: engineerMeta,
  },
  medic: {
    title: "Medic current meta board",
    patchLabel: META_PATCH_LABEL,
    image: medicMeta,
  },
  sniper: {
    title: "Sniper current meta board",
    patchLabel: META_PATCH_LABEL,
    image: sniperMeta,
  },
  spy: {
    title: "Spy current meta board",
    patchLabel: META_PATCH_LABEL,
    image: spyMeta,
  },
};

export const META_COMBOS: MetaCombo[] = [
  {
    id: "scout-medic",
    title: "Scout + Medic",
    classes: ["Scout", "Medic"],
    style: "Fast pick combo",
    loadouts: ["Scout: Scattergun + Mad Milk + Atomizer", "Medic: Crusader's Crossbow + Medi Gun + Ubersaw"],
    movement:
      "Scout scouts safe routes, clears flankers, and calls weak targets. Medic stays one corner behind, uses crossbow saves, and rotates through health packs instead of long open lanes.",
    proTips: [
      "Scout should not outrun beam range before a fight starts.",
      "Medic can use Scout speed to rotate early, not to force every duel.",
      "Mad Milk gives the pair sustain when Uber is not ready.",
    ],
    videoId: "ou94lfr7dr8",
  },
  {
    id: "soldier-medic",
    title: "Soldier + Medic",
    classes: ["Soldier", "Medic"],
    style: "Classic push combo",
    loadouts: ["Soldier: Rocket Launcher + Shotgun/Gunboats + Escape Plan", "Medic: Medi Gun or Kritzkrieg"],
    movement:
      "Soldier takes height and corners first, then Medic crosses when splash pressure is already created. The pair should leave an exit route before committing Uber.",
    proTips: [
      "Soldier reload discipline decides whether the Uber cleanup works.",
      "Kritz is strongest when enemies are grouped near chokes.",
      "Gunboats allow roaming, Shotgun protects the Medic better in close range.",
    ],
    videoId: "MXVNz4fm2Xk",
  },
  {
    id: "heavy-medic",
    title: "Heavy + Medic",
    classes: ["Heavy", "Medic"],
    style: "Frontline anchor",
    loadouts: ["Heavy: Minigun/Tomislav + Sandvich + Fists of Steel", "Medic: Medi Gun + Crusader's Crossbow"],
    movement:
      "Heavy anchors short sightlines and denies doors. Medic plays behind cover, tracks Sniper angles, and uses Sandvich drops to stabilize after spam.",
    proTips: [
      "Avoid long Sniper lanes unless Uber is ready.",
      "Heavy should pre-spin before corners, then unspin to rotate.",
      "Sandvich is often stronger as a Medic save than a self-heal.",
    ],
  },
  {
    id: "demoman-soldier",
    title: "Demoman + Soldier",
    classes: ["Demoman", "Soldier"],
    style: "Explosive space control",
    loadouts: ["Demoman: Grenade Launcher + Stickybomb Launcher", "Soldier: Rocket Launcher + Gunboats or Buff Banner"],
    movement:
      "Demoman locks the choke first, Soldier pressures height and punishes enemies trying to dodge stickies. They should stagger reloads so damage never fully stops.",
    proTips: [
      "Call sticky traps before Soldier bombs.",
      "Soldier should force movement into Demo spam, not away from it.",
      "Buff Banner turns already-good spam into a fight-winning push.",
    ],
  },
  {
    id: "engineer-pyro",
    title: "Engineer + Pyro",
    classes: ["Engineer", "Pyro"],
    style: "Nest protection",
    loadouts: ["Engineer: Rescue Ranger + Wrangler + Wrench/Jag", "Pyro: Flame Thrower + Shotgun/Scorch Shot + Homewrecker"],
    movement:
      "Engineer keeps buildings useful and hard to spam. Pyro patrols the closest blind zones, denies projectiles, removes sappers, and pushes Uber targets away.",
    proTips: [
      "Pyro should not chase too far from the nest.",
      "Wrangler shield buys time for Pyro reflects.",
      "Move the nest before enemies solve the angle.",
    ],
  },
  {
    id: "sniper-engineer",
    title: "Sniper + Engineer",
    classes: ["Sniper", "Engineer"],
    style: "Pick and protect",
    loadouts: ["Sniper: Sniper Rifle + Jarate/SMG + Kukri", "Engineer: Wrangler + Dispenser-first support"],
    movement:
      "Engineer protects Sniper's flank and retreat path while Sniper clears the long angles that make the nest hard to attack. The pair should rotate once enemies start coordinating bombs.",
    proTips: [
      "Sniper should stand close enough to retreat through the nest.",
      "Engineer keeps flank routes expensive, not impossible.",
      "One pick is the cue to rotate or push, not to stare forever.",
    ],
  },
  {
    id: "spy-sniper",
    title: "Spy + Sniper",
    classes: ["Spy", "Sniper"],
    style: "Silent opening",
    loadouts: ["Spy: Revolver + Knife + Invis Watch/Dead Ringer", "Sniper: Sniper Rifle + Jarate or SMG"],
    movement:
      "Spy forces enemies to turn around while Sniper punishes panic peeks. Together they make the enemy backline unsafe from both long sightlines and close decloak timing.",
    proTips: [
      "Spy should call when enemies turn around.",
      "Sniper holds the escape lane after Spy attacks.",
      "Do not both tunnel the same low-value target.",
    ],
  },
];

export const META_PRO_TIPS: Record<string, { title: string; videoId?: string; tip: string }[]> = {
  scout: [
    { title: "Abuse health packs", videoId: "ou94lfr7dr8", tip: "Start fights near health packs so your speed converts into repeat pressure." },
  ],
  soldier: [
    { title: "Reload before jumping", videoId: "MXVNz4fm2Xk", tip: "A strong bomb with one rocket loaded becomes a weak escape." },
  ],
  pyro: [
    { title: "Airblast timing", videoId: "7U2F2tULA7o", tip: "Read projectile rhythm around corners instead of waiting until rockets are already on top of you." },
  ],
  demoman: [
    { title: "Trap rotation", videoId: "XafIgzEZYdQ", tip: "After one trap works, move the next trap to the route enemies use to avoid it." },
  ],
  heavy: [
    { title: "Short sightlines", tip: "Heavy is strongest where enemies must enter Minigun range before they can escape." },
  ],
  engineer: [
    { title: "Buildings as routes", tip: "Teleporters and Dispensers are map control tools, not only support props." },
  ],
  medic: [
    { title: "Pop before death", videoId: "vHntb0kp2K0", tip: "A slightly early Uber is better than a perfect Uber dropped on the floor." },
  ],
  sniper: [
    { title: "Rotate after picks", videoId: "H-vO61s5S_k", tip: "Good enemies pre-aim the sightline that just killed them." },
  ],
  spy: [
    { title: "Information first", videoId: "40tzHnCeZh8", tip: "A call about enemy Uber or sentry position can be more valuable than a low-percentage stab." },
  ],
};
