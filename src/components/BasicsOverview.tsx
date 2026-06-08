import { Activity, Gauge, HeartPulse, Shield } from "lucide-react";
import type { ReactNode } from "react";
import { CLASS_BASICS_VIDEO_IDS } from "@/data/classSections";
import type { TFClass } from "@/data/classes";
import { CLASS_MODEL_IMAGES } from "@/data/matchupsData";
import { CLASS_IMAGES } from "@/lib/classImages";

interface BasicsOverviewProps {
  cls: TFClass;
}

const MEET_SPLASH_IMAGES: Record<string, string> = {
  scout: "https://wiki.teamfortress.com/w/images/thumb/a/aa/ScoutVidSplash.png/1920px-ScoutVidSplash.png",
  soldier: "https://wiki.teamfortress.com/w/images/c/c9/SoldierVidSplash.png",
  pyro: "https://wiki.teamfortress.com/w/images/7/75/PyroVidSplash.png",
  demoman: "https://wiki.teamfortress.com/w/images/0/06/DemomanVidSplash.png",
  heavy: "https://wiki.teamfortress.com/w/images/6/6c/HeavyVidSplash.png",
  engineer: "https://wiki.teamfortress.com/w/images/2/21/EngineerVidSplash.png",
  medic: "https://wiki.teamfortress.com/w/images/9/93/MedicVidSplash.png",
  sniper: "https://wiki.teamfortress.com/w/images/e/ea/SniperVidSplash.png",
  spy: "https://wiki.teamfortress.com/w/images/9/9a/SpyVidSplash.png",
};

const BASICS_DEMO_CLIPS: Partial<Record<string, { src: string; title: string; text: string; tips: string[] }>> = {
  scout: {
    src: "/videos/basics-scout-double-jump.mp4",
    title: "Double Jump Control",
    text:
      "Double jump is one of Scout's main mechanics. It lets you change direction in the air, dodge rockets and pipes, reach small height advantages, and make your movement harder to predict.",
    tips: [
      "Use the second jump after the enemy shoots, not automatically right after the first jump.",
      "Change direction with the second jump to break aim tracking.",
      "Land near cover or a health pack so the movement gives you a real escape route.",
    ],
  },
};

const BASICS_COPY: Record<
  string,
  {
    type: string;
    overheal: string;
    range: string;
    teamJob: string;
    power: string;
    danger: string;
    speedNote: string;
    job: string;
    strengths: string[];
    remember: string[];
  }
> = {
  scout: {
    type: "Offensive pick and flank class",
    overheal: "185",
    range: "Close range, fast off-angles, health-pack routes",
    teamJob: "Create flank pressure, clean weak targets, and protect your backline from enemy flankers.",
    power: "Fastest class, double jump, two-times capture rate.",
    danger: "Sentries, splash damage, and spun-up Heavy stop Scout from taking free duels.",
    speedNote: "133% speed means Scout chooses many fights, but only if he keeps an exit route.",
    job: "Scout is the fastest class and captures objectives twice as fast. His job is to win side fights, punish weak targets, deny flankers, and force enemies to look away from the main push.",
    strengths: ["Double jump changes direction mid-air.", "Best damage is close-range Scattergun meatshots.", "Speed lets Scout choose when fights start and end."],
    remember: ["Avoid sentry arcs and spun-up Heavies.", "Use health packs as part of your route.", "Do not outrun your Medic before a fight."],
  },
  soldier: {
    type: "Offensive explosive pressure class",
    overheal: "300",
    range: "Mid range splash, high ground, controlled choke pressure",
    teamJob: "Open fights with rockets, take height, force enemy movement, and protect Medic when needed.",
    power: "Rocket jumping gives Soldier fast engages, escapes, and surprise high-ground control.",
    danger: "Empty clips, airblast Pyros, and Sniper sightlines punish predictable Soldier play.",
    speedNote: "80% ground speed is slow, so Soldier uses rocket jumps and corners to control tempo.",
    job: "Soldier is a flexible damage dealer who controls space with rocket splash. Rocket jumping lets him take height, start fights, force key targets, or escape after pressure.",
    strengths: ["Splash damage punishes grouped enemies.", "Rocket jumps create fast high-ground access.", "Banners or Shotgun change him between team utility and self-defense."],
    remember: ["Reload before every push.", "Pyro airblast changes rocket timing.", "Bombs need an exit route, not only an entry."],
  },
  pyro: {
    type: "Offensive close-range denial class",
    overheal: "260",
    range: "Close range corners, ambush doors, defensive patrol zones",
    teamJob: "Protect teammates from projectiles and Spy, deny Uber movement, and punish enemies in tight space.",
    power: "Airblast can reflect projectiles, push enemies, save teammates, and ruin enemy pushes.",
    danger: "Long sightlines, Heavy tracking, and Sentries prevent Pyro from reaching flame range.",
    speedNote: "100% speed is standard, so Pyro needs cover and timing more than raw chase speed.",
    job: "Pyro protects teammates and controls close space. Airblast reflects projectiles, pushes Uber targets, denies bombs, and keeps Spy from freely attacking the backline.",
    strengths: ["Flames reveal cloaked or disguised Spies.", "Airblast can stop rockets, pipes, and Uber momentum.", "Corners and tight rooms make Pyro much stronger."],
    remember: ["Do not cross long Sniper lanes for free.", "Heavy beats Pyro in a direct sustained duel.", "Protect first, chase second."],
  },
  demoman: {
    type: "Defensive explosive area-control class",
    overheal: "260",
    range: "Mid range chokes, sticky traps, indirect spam arcs",
    teamJob: "Lock doors and objectives, punish grouped enemies, and make pushes expensive before they start.",
    power: "Stickybombs let Demoman control space even when he is not directly looking at it.",
    danger: "Scouts during reloads, Pyro clearing stickies, and Sniper repeat peeks are the main risks.",
    speedNote: "93% speed is slightly slow, so Demo wins by preparing space before enemies arrive.",
    job: "Demoman locks down chokes with stickies and punishes enemies who group up. He controls where teams can walk before the fight even starts.",
    strengths: ["Sticky traps deny doors, carts, and retreat routes.", "Grenade pipes punish predictable movement.", "Sticky jumps give fast rotations and surprise pressure."],
    remember: ["Scout is dangerous during reloads.", "Move traps after enemies discover them.", "Avoid slow repeated Sniper peeks."],
  },
  heavy: {
    type: "Defensive frontline anchor class",
    overheal: "450",
    range: "Short to mid range, corners, narrow doors, Medic-held space",
    teamJob: "Hold ground, absorb pressure, deny doors, and protect Medic during slow pushes.",
    power: "Highest health and sustained Minigun damage make Heavy deadly when enemies cannot escape.",
    danger: "Sniper, Spy, sticky traps, and long rotations punish Heavy harder than most classes.",
    speedNote: "77% speed is very slow, so Heavy must rotate early and avoid late open crossings.",
    job: "Heavy is the highest-health class and anchors short sightlines with sustained Minigun damage. He is strongest when he plays near cover, a Medic, or a safe retreat.",
    strengths: ["Huge health pool wins close sustained fights.", "Minigun deletes enemies that cannot escape.", "Sandvich can save Medic or stabilize after spam."],
    remember: ["Sniper and Spy are constant threats.", "Rotate early because Heavy is slow.", "Pre-spin before danger, then unspin to move."],
  },
  engineer: {
    type: "Defensive builder and map-control class",
    overheal: "185",
    range: "Defensive zones, flank doors, sentry sightlines, metal routes",
    teamJob: "Build Teleporters, keep Dispenser value, and use Sentry pressure to make space expensive.",
    power: "Buildings create permanent pressure, healing, ammo, and faster team rotations.",
    danger: "Demoman spam, Soldier spam, and Spy sap timing can break nests quickly.",
    speedNote: "100% speed is normal, but Engineer's real tempo comes from building placement and setup timing.",
    job: "Engineer turns map space into team value with Sentries, Dispensers, and Teleporters. Good buildings protect routes, speed rotations, and force enemies to spend resources.",
    strengths: ["Sentry denies Scouts, bombs, and careless pushes.", "Dispenser gives ammo, health, and a stable hold point.", "Teleporter wins time for the whole team."],
    remember: ["Spy-check between repairs.", "Move buildings before spam becomes organized.", "Do not stack every building where one explosive can hit all of them."],
  },
  medic: {
    type: "Support healing and Uber class",
    overheal: "225",
    range: "Behind frontline, safe corners, beam range, escape routes",
    teamJob: "Keep teammates alive, build Uber, track advantages, and survive as the team's most valuable target.",
    power: "UberCharge can save losing fights, start winning pushes, and decide entire rounds.",
    danger: "Spy, Sniper, bombs, and overchasing teammates are the biggest Medic killers.",
    speedNote: "107% speed lets Medic keep up with most teammates, but he still needs cover before crossing.",
    job: "Medic is the team's sustain and push timer. He keeps teammates alive, builds UberCharge, tracks enemy advantages, and survives so the team never loses healing.",
    strengths: ["Medi Gun healing creates constant pressure.", "UberCharge decides pushes and saves.", "Crusader's Crossbow gives long-range burst healing."],
    remember: ["Your life is more important than one risky heal.", "Pop before you die, not after.", "Spy and Sniper decide many Medic deaths."],
  },
  sniper: {
    type: "Support long-range pick class",
    overheal: "185",
    range: "Long sightlines, off-angles, protected backline positions",
    teamJob: "Remove key targets, scare enemies away from lanes, and create openings before pushes.",
    power: "Headshots instantly remove most classes and force enemies to respect every sightline.",
    danger: "Spy, Scout, Soldier bombs, and staying scoped too long make Sniper vulnerable.",
    speedNote: "100% speed is normal, so Sniper survives by rotating early after being seen.",
    job: "Sniper creates space by threatening key targets from long range. A single Medic, Engineer, Heavy, or enemy Sniper pick can change an entire push.",
    strengths: ["Headshots instantly remove most classes.", "Sightlines force enemies to rotate or slow down.", "Jarate/SMG helps survive close threats."],
    remember: ["Rotate after picks.", "Do not scope so long that Spy gets a free route.", "Stay close enough to your team to survive flank pressure."],
  },
  spy: {
    type: "Support infiltration and disruption class",
    overheal: "185",
    range: "Enemy backline, blind zones, decloak corners, distraction windows",
    teamJob: "Gather information, sap buildings, remove high-value targets, and force enemies to turn around.",
    power: "Backstab instantly kills from behind, while cloak and disguise create hidden routes.",
    danger: "Pyro, Scout, random spy-checking, and attacking before team pressure expose Spy quickly.",
    speedNote: "100% speed is normal, so Spy relies on timing, disguise, and cloak routes instead of speed.",
    job: "Spy gathers information, breaks nests, and removes high-value targets. His strongest plays happen when the enemy is distracted by your team's pressure.",
    strengths: ["Backstabs instantly kill from behind.", "Disguise and cloak create backline routes.", "Sappers disable Engineer buildings for team pushes."],
    remember: ["Information can be as valuable as a stab.", "Pyro and Scout make routes unsafe.", "Attack with team pressure, not into bored enemies."],
  },
};

export function BasicsOverview({ cls }: BasicsOverviewProps) {
  const profile = BASICS_COPY[cls.id] ?? BASICS_COPY.scout;
  const videoId = CLASS_BASICS_VIDEO_IDS[cls.id];
  const model = CLASS_MODEL_IMAGES[cls.id];
  const icon = CLASS_IMAGES[cls.id];
  const meetSplash = MEET_SPLASH_IMAGES[cls.id];
  const demoClip = BASICS_DEMO_CLIPS[cls.id];

  return (
    <div className="space-y-6">
      <section className="tf-paper border-2 border-border shadow-card overflow-hidden">
        <div className="bg-[#ead8bb] border-b-2 border-border px-4 py-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl uppercase text-foreground">Basic Understanding</h2>
          <span className="text-[10px] uppercase tracking-[0.24em] text-primary font-bold">{cls.name} basic information</span>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 p-5 sm:p-7">
          <div className="border-2 border-border bg-card overflow-hidden">
            <div className="bg-[#f5aa49] px-4 py-2 text-center font-body text-xl font-bold">{cls.name}</div>
            <div className="relative h-[390px] bg-white flex items-end justify-center overflow-hidden">
              <img
                src={model}
                alt={`${cls.name} model`}
                className="max-h-[370px] max-w-[86%] object-contain drop-shadow-[0_18px_18px_rgba(38,25,13,0.28)]"
              />
            </div>
            <div className="bg-[#eee8dd] border-t-2 border-border">
              <div className="bg-[#f4d27a] px-3 py-1 text-center font-body text-lg font-bold italic text-[#254edb]">
                Meet the {cls.name}
              </div>
              <img
                src={meetSplash}
                alt={`Meet the ${cls.name}`}
                className="block h-48 w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="border-2 border-border bg-card">
              <div className="bg-[#f4d27a] px-4 py-3 text-center font-body text-3xl font-bold">Basic Information</div>
              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid sm:grid-cols-[120px_1fr] gap-3 items-center text-lg">
                  <div className="font-bold flex items-center gap-2"><Shield size={20} /> Icon:</div>
                  <img src={icon} alt={`${cls.name} icon`} className="h-16 w-16 rounded-full border border-primary/70 bg-surface-dark object-cover" />
                </div>
                <InfoRow icon={<Activity size={20} />} label="Type:" value={profile.type} detail={profile.teamJob} />
                <InfoRow
                  icon={<HeartPulse size={20} />}
                  label="Health:"
                  value={`${cls.hp} / ${profile.overheal} overheal`}
                  detail={`Base health is ${cls.hp}. With full Medic overheal this class can temporarily reach ${profile.overheal} HP.`}
                />
                <InfoRow icon={<Gauge size={20} />} label="Speed:" value={cls.speed} detail={profile.speedNote} />
                <InfoRow label="Range:" value={profile.range} />
                <InfoRow label="Power:" value={profile.power} />
                <InfoRow label="Watch out:" value={profile.danger} />
              </div>
            </div>

            <article className="tf-paper border-2 border-border p-5">
              <h3 className="font-display text-3xl uppercase mb-2">What this class must do</h3>
              <p className="font-slab text-sm text-muted-foreground leading-7">{profile.job}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <article className="tf-paper border-2 border-border shadow-card p-5">
          <h3 className="font-display text-3xl uppercase mb-3">Core Strengths</h3>
          <BulletList items={profile.strengths} />
        </article>
        <article className="tf-paper border-2 border-border shadow-card p-5">
          <h3 className="font-display text-3xl uppercase mb-3">Must Remember</h3>
          <BulletList items={profile.remember} />
        </article>
      </section>

      {demoClip && (
        <section className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card overflow-hidden">
          <div className="h-1 bg-primary" />
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5 p-5 sm:p-6 items-center">
            <div className="overflow-hidden border-2 border-primary/70 bg-black shadow-card">
              <video
                src={demoClip.src}
                className="block aspect-video w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Scout core mechanic</div>
              <h3 className="font-display text-4xl text-white mb-3">{demoClip.title}</h3>
              <p className="font-slab text-sm text-surface-dark-foreground/75 leading-7 mb-4">{demoClip.text}</p>
              <ul className="space-y-2 text-sm">
                {demoClip.tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rotate-45 bg-primary shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {videoId && (
        <section className="grid lg:grid-cols-2 gap-5 items-start">
          <div className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card p-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Guide video</div>
            <h3 className="font-display text-4xl text-white mb-3">{cls.name} Basics</h3>
            <p className="font-slab text-sm text-surface-dark-foreground/70">
              A compact basic video stays here for quick learning, while the information cards explain what to focus on in real matches.
            </p>
          </div>
          <div className="aspect-video border-2 border-border bg-surface-dark overflow-hidden shadow-card">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`${cls.name} basics video`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value, detail }: { icon?: ReactNode; label: string; value: string; detail?: string }) {
  return (
    <div className="grid sm:grid-cols-[120px_1fr] gap-3 text-lg">
      <div className="font-bold flex items-center gap-2">{icon} {label}</div>
      <div>
        <div className="text-[#2f4ea2]">{value}</div>
        {detail && <p className="mt-1 font-slab text-xs leading-5 text-muted-foreground">{detail}</p>}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rotate-45 bg-primary shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
