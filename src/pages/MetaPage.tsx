import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, CalendarDays, Shield, Star, Swords, Target, TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WeaponImage } from "@/components/WeaponImage";
import { TF_CLASSES } from "@/data/classes";
import {
  META_CLASS_IDS,
  META_COMBOS,
  META_PATCH_LABEL,
  META_TIER_IMAGES,
  META_WEAPONS,
} from "@/data/metaData";
import type { Weapon, WeaponSlot } from "@/types/weapons";

type GameFormat = "6v6" | "Highlander" | "Casual" | "MGE";
type MetaTier = "META" | "VIABLE" | "AVERAGE" | "WEAK";

const GAME_FORMATS: GameFormat[] = ["6v6", "Highlander", "Casual", "MGE"];
const SLOT_ORDER: WeaponSlot[] = ["primary", "secondary", "melee"];

const FORMAT_NOTES: Record<GameFormat, string> = {
  "6v6": "Fast rotations, midfight value, and low-risk consistency matter most.",
  Highlander: "Specialist utility rises because every class is present and picks are expensive.",
  Casual: "Chaos, sentries, and mixed skill levels make sustain and simple value stronger.",
  MGE: "Pure dueling rewards burst, reload discipline, and clean movement.",
};

const TIER_INFO: Record<MetaTier, { badge: string; strip: string; text: string; description: string }> = {
  META: {
    badge: "border-red-500 bg-red-500 text-white",
    strip: "bg-red-500",
    text: "text-red-500",
    description: "Best current choice. High value with low setup cost.",
  },
  VIABLE: {
    badge: "border-orange-500 bg-orange-500 text-white",
    strip: "bg-orange-500",
    text: "text-orange-500",
    description: "Strong and reliable, but more map or matchup dependent.",
  },
  AVERAGE: {
    badge: "border-yellow-500 bg-yellow-500 text-black",
    strip: "bg-yellow-500",
    text: "text-yellow-500",
    description: "Playable, but usually outclassed by stronger options.",
  },
  WEAK: {
    badge: "border-zinc-500 bg-zinc-600 text-white",
    strip: "bg-zinc-500",
    text: "text-zinc-400",
    description: "Niche, risky, or mostly style-driven in this format.",
  },
};

const CLASS_META_SUMMARY: Record<string, { tier: string; winrate: string; score: number; loadout: string; trend: string }> = {
  scout: { tier: "S Tier", winrate: "52%", score: 95, loadout: "Scattergun + Mad Milk + Atomizer", trend: "+12%" },
  soldier: { tier: "S Tier", winrate: "51%", score: 94, loadout: "Rocket Launcher + Gunboats + Escape Plan", trend: "+7%" },
  pyro: { tier: "A Tier", winrate: "49%", score: 86, loadout: "Degreaser + Scorch Shot + Powerjack", trend: "+4%" },
  demoman: { tier: "S Tier", winrate: "53%", score: 96, loadout: "Grenade Launcher + Stickybomb Launcher + Bottle", trend: "+6%" },
  heavy: { tier: "B Tier", winrate: "48%", score: 78, loadout: "Tomislav + Sandvich + Fists of Steel", trend: "-2%" },
  engineer: { tier: "A Tier", winrate: "50%", score: 84, loadout: "Rescue Ranger + Wrangler + Jag", trend: "+5%" },
  medic: { tier: "S Tier", winrate: "54%", score: 98, loadout: "Crusader's Crossbow + Medi Gun + Ubersaw", trend: "+3%" },
  sniper: { tier: "A Tier", winrate: "50%", score: 88, loadout: "Sniper Rifle + Jarate + Kukri", trend: "+2%" },
  spy: { tier: "B Tier", winrate: "47%", score: 76, loadout: "Revolver + Knife + Invis Watch", trend: "-1%" },
};

const SCOUT_LOADOUTS = [
  {
    title: "Aggressive Scout",
    weapons: ["Scattergun", "Mad Milk", "Atomizer"],
    plus: ["best fight entry", "strong sustain", "safe route mobility"],
  },
  {
    title: "Flanker Scout",
    weapons: ["Force-A-Nature", "Pistol", "Wrap Assassin"],
    plus: ["high pick potential", "annoying off-angles", "good escape pressure"],
  },
  {
    title: "Utility Scout",
    weapons: ["Shortstop", "Mad Milk", "Atomizer"],
    plus: ["clean mid-range chip", "team healing value", "easy rotations"],
  },
];

const MATCHUPS = [
  { id: "sniper", name: "Sniper", difficulty: "Easy", tips: ["close distance through cover", "double jump after the shot", "do not cross long lanes twice"] },
  { id: "medic", name: "Medic", difficulty: "Easy", tips: ["force beam panic", "track surf routes", "leave after the pick"] },
  { id: "soldier", name: "Soldier", difficulty: "Medium", tips: ["fight after he fires", "jump unpredictably", "avoid tiny doorways"] },
  { id: "pyro", name: "Pyro", difficulty: "Hard", tips: ["bait airblast first", "stay outside flame range", "do not chase around corners"] },
  { id: "heavy", name: "Heavy", difficulty: "Hard", tips: ["chip before committing", "attack from two angles", "never wide peek spun-up Heavy"] },
];

const PATCH_IMPACTS = [
  { weapon: "Mad Milk", change: "Recharge reduced", result: "Moved from A to S Tier", direction: "up" },
  { weapon: "Atomizer", change: "Jump routes valued higher this patch", result: "More flank potential", direction: "up" },
  { weapon: "Bonk! Atomic Punch", change: "Format value split", result: "Better in Casual than 6v6", direction: "split" },
];

const getWeaponTier = (weapon: Weapon, format: GameFormat): MetaTier => {
  const name = weapon.name.toLowerCase();
  if (["scattergun", "rocket launcher", "grenade launcher", "stickybomb launcher", "crusader's crossbow", "medi gun", "sniper rifle"].some((key) => name.includes(key))) return "META";
  if (["mad milk", "gunboats", "escape plan", "tomislav", "sandvich", "rescue ranger", "wrangler", "jarate", "ubersaw", "atomizer"].some((key) => name.includes(key))) return "META";
  if (format === "Casual" && ["bonk", "phlogistinator", "brass beast", "razorback"].some((key) => name.includes(key))) return "VIABLE";
  if (format === "MGE" && ["scattergun", "pistol", "rocket launcher", "shotgun"].some((key) => name.includes(key))) return "META";
  if (weapon.tips.length >= 2 && weapon.stats.utility) return "VIABLE";
  if (weapon.slot === "melee" && !weapon.stats.utility) return "WEAK";
  return "AVERAGE";
};

const getMetaScore = (weapon: Weapon, format: GameFormat) => {
  const tier = getWeaponTier(weapon, format);
  const base = tier === "META" ? 94 : tier === "VIABLE" ? 84 : tier === "AVERAGE" ? 70 : 52;
  const formatBonus = format === "Casual" && weapon.stats.utility ? 4 : format === "MGE" && weapon.slot === "primary" ? 5 : 0;
  return Math.min(99, base + formatBonus);
};

const getPopularity = (weapon: Weapon, format: GameFormat) => {
  const score = getMetaScore(weapon, format);
  return Math.max(18, Math.min(88, score - (weapon.slot === "melee" ? 18 : 8)));
};

const getReasons = (weapon: Weapon, format: GameFormat) => {
  const reasons = [
    weapon.description,
    weapon.stats.utility ? `Utility: ${weapon.stats.utility}.` : "Stable damage profile without special setup.",
    FORMAT_NOTES[format],
  ];
  return reasons.slice(0, 3);
};

export default function MetaPage() {
  const [activeClass, setActiveClass] = useState("scout");
  const [activeFormat, setActiveFormat] = useState<GameFormat>("6v6");
  const [activeMatchup, setActiveMatchup] = useState(MATCHUPS[2].id);

  const cls = TF_CLASSES.find((item) => item.id === activeClass);
  const weapons = useMemo(() => META_WEAPONS.filter((weapon) => weapon.classId === activeClass), [activeClass]);
  const classCombos = useMemo(
    () => META_COMBOS.filter((combo) => combo.classes.some((name) => name.toLowerCase() === activeClass)),
    [activeClass],
  );
  const tierImage = META_TIER_IMAGES[activeClass];
  const summary = CLASS_META_SUMMARY[activeClass] ?? CLASS_META_SUMMARY.scout;
  const topWeapons = useMemo(
    () => [...weapons].sort((a, b) => getMetaScore(b, activeFormat) - getMetaScore(a, activeFormat)).slice(0, 5),
    [activeFormat, weapons],
  );
  const selectedMatchup = MATCHUPS.find((matchup) => matchup.id === activeMatchup) ?? MATCHUPS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#e8e0d0]">
      <Header />

      <main className="flex-1">
        <section className="bg-surface-dark text-surface-dark-foreground border-b-4 border-primary">
          <div className="container mx-auto px-4 py-12 sm:py-16">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-stretch">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="tf-stamp inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1 text-xs">
                    <TrendingUp size={14} /> Current Competitive Meta
                  </span>
                  <span className="tf-stamp inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1 text-xs">
                    <CalendarDays size={14} /> Updated 2 days ago
                  </span>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-primary mb-3">Meta Page / Patch: May 2026</div>
                  <h1 className="font-display text-5xl sm:text-7xl tf-headline text-white mb-4">META</h1>
                  <p className="font-slab text-base text-surface-dark-foreground/75 max-w-xl">
                    Format-aware weapon ratings, loadout recommendations, matchup notes, and patch impact for quick competitive decisions.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <MetaStat label={`${cls?.name ?? activeClass} Meta Score`} value={summary.tier} />
                  <MetaStat label="Winrate in PUGs" value={summary.winrate} />
                  <MetaStat label="Meta Score" value={`${summary.score}/100`} />
                  <MetaStat label="Community Rating" value="★★★★☆" />
                </div>

                <div className="border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Most Used Loadout</div>
                  <div className="font-display text-3xl text-white">{summary.loadout}</div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a href="#weapon-stats" className="border border-primary bg-primary px-4 py-3 text-xs uppercase tracking-widest font-bold text-primary-foreground">
                    View Weapon Stats
                  </a>
                  <Link to={`/class/${activeClass}/guides`} className="border border-white/20 bg-white/5 px-4 py-3 text-xs uppercase tracking-widest font-bold text-white hover:border-primary">
                    Watch {cls?.name ?? activeClass} Guide
                  </Link>
                </div>
              </div>

              <div className="tf-paper border-2 border-primary shadow-card overflow-hidden bg-[#161815]">
                <div className="flex items-center justify-between gap-3 bg-surface-dark px-5 py-4 border-b-4 border-primary">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-1">Patch Meta Board</div>
                    <h2 className="font-display text-3xl text-white">{tierImage?.title ?? `${cls?.name ?? activeClass} meta board`}</h2>
                  </div>
                  <div className="text-right text-xs uppercase tracking-[0.2em] text-white/55">
                    Editor<br /><span className="text-primary">Zabset</span>
                  </div>
                </div>
                <img src={tierImage.image} alt={tierImage.title} className="w-full max-h-[520px] object-contain" />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 sm:py-14">
          <section className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card p-5 mb-8">
            <div className="grid xl:grid-cols-[1fr_420px] gap-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Class and format filters</div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {META_CLASS_IDS.map((classId) => {
                    const item = TF_CLASSES.find((tfClass) => tfClass.id === classId);
                    return (
                      <button
                        key={classId}
                        type="button"
                        onClick={() => setActiveClass(classId)}
                        className={`border px-4 py-2 font-display text-lg uppercase transition-colors ${
                          activeClass === classId
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-white/10 bg-white/[0.04] text-white hover:border-primary hover:text-primary"
                        }`}
                      >
                        {item?.name ?? classId}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2">
                  {GAME_FORMATS.map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => setActiveFormat(format)}
                      className={`border px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors ${
                        activeFormat === format
                          ? "border-white bg-white text-surface-dark"
                          : "border-white/10 bg-white/[0.04] text-white/65 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              <TierLegend />
            </div>
          </section>

          <section className="grid lg:grid-cols-[1fr_320px] gap-5 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <BarChart3 className="text-primary" size={28} />
                <h2 className="font-display text-4xl tf-headline">Top {activeFormat} Weapons</h2>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {topWeapons.map((weapon) => (
                  <WeaponMetaCard key={weapon.id} weapon={weapon} format={activeFormat} compact />
                ))}
              </div>
            </div>

            <aside className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card p-5 self-start">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Live Resource Feel</div>
              <h3 className="font-display text-3xl text-white mb-3">Current Competitive Meta</h3>
              <div className="space-y-3 text-sm">
                <InfoLine label="Patch" value="May 2026" />
                <InfoLine label="Updated" value="2 days ago" />
                <InfoLine label="Editor" value="Zabset" />
                <InfoLine label="Usage Trend" value={`↗ ${summary.trend} this patch`} />
              </div>
              <p className="font-slab text-sm text-white/60 mt-4">{FORMAT_NOTES[activeFormat]}</p>
            </aside>
          </section>

          <section id="weapon-stats" className="space-y-8 scroll-mt-24">
            {SLOT_ORDER.map((slot) => {
              const slotWeapons = weapons.filter((weapon) => weapon.slot === slot);
              if (slotWeapons.length === 0) return null;

              return (
                <section key={slot}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-6 w-1 bg-primary" />
                    <h2 className="font-display text-4xl tf-headline uppercase">{slot} Meta Cards</h2>
                  </div>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {slotWeapons.map((weapon) => (
                      <WeaponMetaCard key={weapon.id} weapon={weapon} format={activeFormat} />
                    ))}
                  </div>
                </section>
              );
            })}
          </section>

          {activeClass === "scout" && (
            <>
              <section className="mt-12">
                <div className="flex items-center gap-3 mb-5">
                  <Target className="text-primary" size={28} />
                  <h2 className="font-display text-4xl tf-headline">Recommended Loadouts</h2>
                </div>
                <div className="grid lg:grid-cols-3 gap-4">
                  {SCOUT_LOADOUTS.map((loadout) => (
                    <article key={loadout.title} className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card p-5">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Recommended</div>
                      <h3 className="font-display text-3xl text-white mb-4">{loadout.title}</h3>
                      <div className="grid gap-2 mb-4">
                        {loadout.weapons.map((weapon) => (
                          <div key={weapon} className="border border-white/10 bg-white/[0.04] px-3 py-2 text-sm">{weapon}</div>
                        ))}
                      </div>
                      <ul className="space-y-2 text-sm">
                        {loadout.plus.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rotate-45 bg-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <section className="mt-12 grid lg:grid-cols-[340px_1fr] gap-5">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <Swords className="text-primary" size={28} />
                    <h2 className="font-display text-4xl tf-headline">Scout Matchups</h2>
                  </div>
                  <div className="tf-paper border-2 border-border shadow-card overflow-hidden">
                    {MATCHUPS.map((matchup) => (
                      <button
                        key={matchup.id}
                        type="button"
                        onClick={() => setActiveMatchup(matchup.id)}
                        className={`grid w-full grid-cols-[1fr_auto] gap-3 border-b border-border px-4 py-3 text-left transition-colors ${
                          activeMatchup === matchup.id ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
                        }`}
                      >
                        <span className="font-display text-2xl">{matchup.name}</span>
                        <span className="text-xs uppercase tracking-widest font-bold">{matchup.difficulty}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <article className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Scout vs {selectedMatchup.name}</div>
                  <h3 className="font-display text-5xl text-white mb-4">Difficulty: {selectedMatchup.difficulty}</h3>
                  <ul className="space-y-3 text-sm">
                    {selectedMatchup.tips.map((tip, index) => (
                      <li key={tip} className="flex gap-3">
                        <span className={`font-bold ${index === 2 ? "text-destructive" : "text-primary"}`}>{index === 2 ? "X" : "✓"}</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </section>
            </>
          )}

          <section className="mt-12">
            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="text-primary" size={28} />
              <h2 className="font-display text-4xl tf-headline">Patch Notes Impact</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-4">
              {PATCH_IMPACTS.map((impact) => (
                <article key={impact.weapon} className="tf-paper border-2 border-border shadow-card p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Patch 12 May 2026</div>
                  <h3 className="font-display text-3xl mb-2">{impact.direction === "up" ? "↑" : "↔"} {impact.weapon}</h3>
                  <p className="font-slab text-sm text-muted-foreground mb-3">{impact.change}</p>
                  <div className="border border-primary bg-primary/10 px-3 py-2 text-sm font-bold">Result: {impact.result}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="flex items-center gap-3 mb-5">
              <Swords className="text-primary" size={28} />
              <h2 className="font-display text-4xl tf-headline">{cls?.name ?? activeClass} Class Pairings</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
              {classCombos.map((combo) => (
                <article key={combo.id} className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card">
                  <div className="h-1 bg-primary" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Shield size={18} />
                      <span className="text-xs uppercase tracking-[0.25em] font-bold">{combo.style}</span>
                    </div>
                    <h3 className="font-display text-4xl text-white mb-3">{combo.title}</h3>
                    <p className="font-slab text-sm text-surface-dark-foreground/70 mb-4">{combo.movement}</p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                      {combo.loadouts.map((loadout) => (
                        <div key={loadout} className="border border-white/10 bg-white/[0.04] p-3 text-sm">
                          {loadout}
                        </div>
                      ))}
                    </div>
                    <ul className="space-y-1 text-sm">
                      {combo.proTips.map((tip) => (
                        <li key={tip} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rotate-45 bg-primary shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.04] p-4">
      <div className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-1">{label}</div>
      <div className="font-display text-3xl text-white">{value}</div>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
      <span className="text-white/45 uppercase tracking-widest text-xs">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}

function TierLegend() {
  return (
    <div className="border border-white/10 bg-white/[0.04] p-4">
      <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Tier colors</div>
      <div className="grid sm:grid-cols-2 gap-2">
        {(Object.keys(TIER_INFO) as MetaTier[]).map((tier) => (
          <div key={tier} className="grid grid-cols-[86px_1fr] items-stretch overflow-hidden border border-white/10 bg-black/20">
            <div className={`${TIER_INFO[tier].strip} grid place-items-center px-2 py-3 font-display text-xl text-white`}>
              {tier}
            </div>
            <div className="px-3 py-2 text-xs leading-5 text-white/65">
              {TIER_INFO[tier].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeaponMetaCard({ weapon, format, compact = false }: { weapon: Weapon; format: GameFormat; compact?: boolean }) {
  const tier = getWeaponTier(weapon, format);
  const score = getMetaScore(weapon, format);
  const popularity = getPopularity(weapon, format);
  const reasons = getReasons(weapon, format);

  return (
    <article className="bg-[#171512] text-surface-dark-foreground border-2 border-[#2f261d] shadow-card overflow-hidden">
      <div className={`h-2 ${TIER_INFO[tier].strip}`} />
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="grid h-20 w-20 place-items-center bg-[#f3ead8] rounded-sm shrink-0">
            <WeaponImage weapon={weapon} className="h-16 w-16 object-contain" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-3xl text-white leading-none">{weapon.name}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className={`border px-2 py-1 text-xs uppercase tracking-widest font-bold ${TIER_INFO[tier].badge}`}>
                <Star size={12} className="inline mr-1" /> {tier}
              </span>
              <span className="border border-white/10 bg-white/[0.04] px-2 py-1 text-xs uppercase tracking-widest">
                {weapon.slot}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 my-4">
          <Metric label="Popularity" value={`${popularity}%`} />
          <Metric label="Meta Score" value={`${score}/100`} />
        </div>

        {!compact && (
          <>
            <div className={`text-[10px] uppercase tracking-[0.3em] ${TIER_INFO[tier].text} mb-2`}>Why {tier}</div>
            <ul className="space-y-2 text-sm text-white/75 mb-4">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rotate-45 bg-primary shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>

            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="border border-white/10 bg-white/[0.04] p-3">
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2">Stronger Against</div>
                <div>Medic, Sniper, weak flankers</div>
              </div>
              <div className="border border-white/10 bg-white/[0.04] p-3">
                <div className="text-[10px] uppercase tracking-[0.25em] text-destructive mb-2">Weaker Against</div>
                <div>Sentry Nest, tight spam, hard focus</div>
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.04] px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</div>
      <div className="font-display text-2xl text-white">{value}</div>
    </div>
  );
}
