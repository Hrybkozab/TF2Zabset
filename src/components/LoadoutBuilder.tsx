import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchClassWeapons } from "@/lib/weaponsApi";
import { CLASS_IMAGES } from "@/lib/classImages";
import { WeaponImage } from "@/components/WeaponImage";
import type { Weapon, WeaponSlot } from "@/types/weapons";

interface Props {
  classId: string;
  className: string;
}

type SelectedLoadout = Record<WeaponSlot, string>;

const SLOT_LABELS: Record<WeaponSlot, string> = {
  primary: "Primary",
  secondary: "Secondary",
  melee: "Melee",
};

const emptyLoadout: SelectedLoadout = {
  primary: "",
  secondary: "",
  melee: "",
};

const RATE_SCORE: Record<string, number> = {
  "very fast": 2.4,
  fast: 1.75,
  medium: 1.15,
  default: 1,
  burst: 1.45,
};

function readAverageDamage(weapon?: Weapon): number {
  if (!weapon?.stats.damage) return weapon?.stats.utility ? 18 : 0;
  const values = weapon.stats.damage.match(/\d+/g)?.map(Number) ?? [];
  if (values.length === 0) return weapon.stats.utility ? 18 : 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function readRate(weapon?: Weapon): number {
  const rate = weapon?.stats.fireRate?.toLowerCase() ?? "";
  return RATE_SCORE[rate] ?? (weapon?.slot === "melee" ? 0.6 : 1);
}

function hasUtility(weapon: Weapon, words: string[]) {
  const text = `${weapon.description} ${weapon.stats.utility ?? ""} ${weapon.tips.join(" ")}`.toLowerCase();
  return words.some((word) => text.includes(word));
}

function getLoadoutAnalytics(loadout: Record<WeaponSlot, Weapon | undefined>, className: string) {
  const weapons = [loadout.primary, loadout.secondary, loadout.melee].filter((weapon): weapon is Weapon => Boolean(weapon));
  const primaryDamage = readAverageDamage(loadout.primary);
  const secondaryDamage = readAverageDamage(loadout.secondary);
  const meleeDamage = readAverageDamage(loadout.melee);
  const averageDamage = Math.round((primaryDamage + secondaryDamage + meleeDamage) / 3);
  const dps = Math.round(primaryDamage * readRate(loadout.primary) + secondaryDamage * readRate(loadout.secondary) * 0.55);
  const burst = Math.round(primaryDamage + secondaryDamage * 0.7);
  const utility = weapons.reduce((score, weapon) => {
    if (weapon.stats.utility) score += 16;
    if (hasUtility(weapon, ["heal", "milk", "jarate", "uber", "resistance", "airblast", "sapper", "wrangler", "banner", "cloak", "speed", "jump"])) score += 12;
    if (hasUtility(weapon, ["mobility", "jump", "speed", "rocket"])) score += 8;
    return score;
  }, 28);
  const sustain = weapons.reduce((score, weapon) => {
    if (hasUtility(weapon, ["heal", "health", "sandvich", "milk", "resistance", "reduced", "cloak"])) return score + 16;
    return score;
  }, 24);
  const risk = weapons.reduce((score, weapon) => {
    if (hasUtility(weapon, ["marked", "self-damage", "lower", "vulnerability", "fragile", "risky", "no airblast"])) return score + 14;
    if (weapon.stats.clipSize === "1" || weapon.stats.clipSize === "2") return score + 8;
    return score;
  }, 18);
  const impact = Math.min(100, Math.round(dps * 0.22 + burst * 0.14 + utility * 0.28 + sustain * 0.12 - risk * 0.1));
  const rating = Math.max(0.65, Math.min(1.65, Number((impact / 75 + dps / 420).toFixed(2))));

  const advice = [
    `${className} should open fights with ${loadout.primary?.name ?? "the primary"}, then use ${loadout.secondary?.name ?? "the secondary"} when the enemy leaves ideal range.`,
    `${loadout.melee?.name ?? "Melee"} is the emergency or utility slot; do not force it unless the combo specifically creates that timing.`,
    impact >= 78
      ? "This combo has high fight impact, so play around your first clean engage and avoid wasting cooldowns before the push."
      : "This combo is more situational, so pick fights carefully and reset when the first burst does not create advantage.",
  ];

  return {
    averageDamage,
    dps,
    burst,
    utility: Math.min(100, utility),
    sustain: Math.min(100, sustain),
    risk: Math.min(100, risk),
    impact,
    rating,
    advice,
  };
}

function MetricBar({ label, value, suffix = "", goodAt = 70 }: { label: string; value: number; suffix?: string; goodAt?: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  const isGood = clamped >= goodAt;

  return (
    <div>
      <div className="flex items-end justify-between gap-3 mb-1">
        <span className="text-xs uppercase tracking-[0.18em] text-surface-dark-foreground/50">{label}</span>
        <span className="font-display text-2xl text-white">
          {value}
          {suffix}
        </span>
      </div>
      <div className="h-2 bg-white/15 overflow-hidden">
        <div
          className={`h-full ${isGood ? "bg-green-500 shadow-[0_0_16px_rgba(34,197,94,0.75)]" : "bg-primary"}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <div className={`mt-1 text-[10px] uppercase tracking-[0.18em] ${isGood ? "text-green-400" : "text-primary"}`}>
        {isGood ? "Good" : "Needs care"}
      </div>
    </div>
  );
}

export const LoadoutBuilder = ({ classId, className }: Props) => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<SelectedLoadout>(emptyLoadout);
  const [activeSlot, setActiveSlot] = useState<WeaponSlot>("primary");

  const storageKey = `tf2-loadout-${classId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setSelected({ ...emptyLoadout, ...(JSON.parse(saved) as Partial<SelectedLoadout>) });
      } catch {
        setSelected(emptyLoadout);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(selected));
  }, [selected, storageKey]);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    fetchClassWeapons(classId)
      .then((payload) => {
        if (!isCancelled) setWeapons(payload.weapons);
      })
      .catch(() => {
        if (!isCancelled) setError("Could not load weapons from API.");
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [classId]);

  const weaponsBySlot = useMemo(() => {
    return {
      primary: weapons.filter((w) => w.slot === "primary"),
      secondary: weapons.filter((w) => w.slot === "secondary"),
      melee: weapons.filter((w) => w.slot === "melee"),
    };
  }, [weapons]);

  const selectedWeapons = useMemo(
    () =>
      (Object.keys(selected) as WeaponSlot[])
        .map((slot) => weapons.find((w) => w.id === selected[slot]))
        .filter((w): w is Weapon => Boolean(w)),
    [selected, weapons],
  );

  const selectedBySlot = useMemo(() => {
    return {
      primary: weapons.find((w) => w.id === selected.primary),
      secondary: weapons.find((w) => w.id === selected.secondary),
      melee: weapons.find((w) => w.id === selected.melee),
    };
  }, [selected, weapons]);

  const isCompleteLoadout = Boolean(selectedBySlot.primary && selectedBySlot.secondary && selectedBySlot.melee);
  const analytics = useMemo(
    () => (isCompleteLoadout ? getLoadoutAnalytics(selectedBySlot, className) : null),
    [className, isCompleteLoadout, selectedBySlot],
  );

  if (isLoading) {
    return <p className="font-slab text-sm text-muted-foreground">Loading loadout data...</p>;
  }

  if (error) {
    return <p className="font-slab text-sm text-destructive">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl sm:text-4xl tf-headline mb-2">{className} Loadout Builder</h2>
        <p className="font-slab text-sm text-muted-foreground">
          Pick your preferred Primary, Secondary, and Melee setup. Choices are saved locally in your browser.
        </p>
      </div>

      <div className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card overflow-hidden">
        <div className="h-1 bg-primary" />
        <div className="p-5 grid lg:grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold mb-2">
              Steam Backpack Import
            </div>
            <h3 className="font-display text-3xl text-white mb-2">Show only weapons from your backpack</h3>
            <p className="font-slab text-sm text-surface-dark-foreground/65">
              This UI is ready for Steam inventory import. After Steam login, the server should call Steam inventory,
              match owned item names to this weapon list, and filter the loadout builder.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <input
              className="min-w-[220px] border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              placeholder="SteamID64"
            />
            <Link to="/profile" className="tf-stamp bg-primary text-primary-foreground px-5 py-3 text-sm">
              Connect Steam
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
        <aside className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card overflow-hidden">
          <div className="h-1 bg-primary" />
          <div className="p-5">
            <div className="min-h-[260px] grid place-items-center bg-gradient-dark border border-white/10 mb-5">
              {CLASS_IMAGES[classId] ? (
                <img
                  src={CLASS_IMAGES[classId]}
                  alt={`${className} preview`}
                  className="h-44 w-44 rounded-full object-cover border-2 border-primary/70 shadow-card"
                />
              ) : (
                <div className="font-display text-6xl text-primary">{className}</div>
              )}
            </div>

            <div className="space-y-3">
              {(Object.keys(SLOT_LABELS) as WeaponSlot[]).map((slot) => {
                const weapon = selectedBySlot[slot];
                const isActive = activeSlot === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setActiveSlot(slot)}
                    className={`w-full text-left border p-3 transition-colors ${
                      isActive
                        ? "border-primary bg-primary/15"
                        : "border-white/10 bg-white/[0.03] hover:border-primary/60"
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold">
                      {SLOT_LABELS[slot]}
                    </div>
                    <div className="font-display text-2xl text-white mt-1">
                      {weapon?.name ?? "Empty slot"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="tf-paper border-2 border-border shadow-card p-5">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1">Choose item</div>
              <h3 className="font-display text-3xl">{SLOT_LABELS[activeSlot]}</h3>
            </div>
            <button
              type="button"
              onClick={() => setSelected((prev) => ({ ...prev, [activeSlot]: "" }))}
              className="tf-stamp bg-card text-foreground px-4 py-2 text-xs"
            >
              Clear Slot
            </button>
          </div>

          {weaponsBySlot[activeSlot].length === 0 ? (
            <p className="font-slab text-sm text-muted-foreground">
              No weapons are added for this class slot yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {weaponsBySlot[activeSlot].map((weapon) => {
                const isSelected = selected[activeSlot] === weapon.id;

                return (
                  <button
                    key={weapon.id}
                    type="button"
                    onClick={() => setSelected((prev) => ({ ...prev, [activeSlot]: weapon.id }))}
                    className={`text-left border-2 p-4 min-h-[120px] transition-transform hover:-translate-y-0.5 ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-stamp-sm"
                        : "border-border bg-card/70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <WeaponImage
                          weapon={weapon}
                          className="h-12 w-12 object-contain"
                        />
                        <h4 className="font-display text-xl leading-none">{weapon.name}</h4>
                      </div>
                      {isSelected && (
                        <span className="tf-stamp bg-primary text-primary-foreground px-2 py-1 text-[10px]">
                          Equipped
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {weapon.description}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {analytics && (
        <section className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card overflow-hidden">
          <div className="h-1 bg-primary" />
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-5 mb-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Loadout impact report</div>
                <h3 className="font-display text-4xl text-white">
                  {selectedBySlot.primary?.name} + {selectedBySlot.secondary?.name} + {selectedBySlot.melee?.name}
                </h3>
              </div>
              <div className="text-center min-w-[160px]">
                <div className="mx-auto grid h-32 w-32 place-items-center rounded-full border-[6px] border-green-500 bg-white/[0.03] shadow-[0_0_28px_rgba(34,197,94,0.45)]">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-green-400">Impact</div>
                    <div className="font-display text-5xl text-white leading-none">{analytics.rating}</div>
                    <div className="text-xs text-surface-dark-foreground/60">rating</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-5 mb-6">
              <MetricBar label="Avg dmg" value={analytics.averageDamage} goodAt={75} />
              <MetricBar label="DPS" value={analytics.dps} goodAt={130} />
              <MetricBar label="Burst" value={analytics.burst} goodAt={145} />
              <MetricBar label="Utility" value={analytics.utility} goodAt={62} />
              <MetricBar label="Sustain" value={analytics.sustain} goodAt={55} />
              <MetricBar label="Risk" value={analytics.risk} goodAt={80} />
            </div>

            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5">
              <div className="border border-white/10 bg-white/[0.04] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-primary font-bold mb-2">Numbers</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-surface-dark-foreground/50">Average damage:</span> <b>{analytics.averageDamage}</b></div>
                  <div><span className="text-surface-dark-foreground/50">Average DPS:</span> <b>{analytics.dps}</b></div>
                  <div><span className="text-surface-dark-foreground/50">Fight impact:</span> <b>{analytics.impact}/100</b></div>
                  <div><span className="text-surface-dark-foreground/50">Burst window:</span> <b>{analytics.burst}</b></div>
                </div>
              </div>
              <div className="border border-white/10 bg-white/[0.04] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-primary font-bold mb-2">Combo advice</div>
                <ul className="space-y-2 text-sm">
                  {analytics.advice.map((tip) => (
                    <li key={tip} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rotate-45 bg-primary shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="space-y-4">
        {selectedWeapons.length === 0 ? (
          <p className="font-slab text-sm text-muted-foreground">
            Choose at least one weapon to see stats and practical usage tips.
          </p>
        ) : (
          selectedWeapons.map((weapon) => (
            <div key={weapon.id} className="tf-paper border-2 border-border shadow-card p-5">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="font-display text-2xl">{weapon.name}</h3>
                <span className="tf-stamp bg-card text-foreground px-3 py-1 text-xs uppercase">{weapon.slot}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{weapon.description}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm mb-4">
                {Object.entries(weapon.stats).map(([key, value]) => (
                  <div key={key} className="border border-border rounded px-2 py-1">
                    <span className="text-muted-foreground mr-1">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
              <ul className="space-y-1 text-sm">
                {weapon.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

