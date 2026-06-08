import { AlertTriangle, Shield } from "lucide-react";
import { getClassMatchups } from "@/data/matchupsData";

interface MatchupsOverviewProps {
  classId: string;
  className: string;
}

export function MatchupsOverview({ classId, className }: MatchupsOverviewProps) {
  const guide = getClassMatchups(classId);

  return (
    <div className="space-y-7">
      <section className="tf-paper border-2 border-border shadow-card overflow-hidden">
        <div className="bg-[#ead8bb] border-b-2 border-border px-4 py-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl uppercase text-foreground">Combat Flow</h2>
          <span className="text-[10px] uppercase tracking-[0.24em] text-primary font-bold">{className} targets</span>
        </div>

        <div className="px-5 py-5 sm:px-8">
          <div className="max-w-4xl mx-auto text-center mb-6">
            <h3 className="font-body text-2xl sm:text-3xl text-foreground mb-3">{guide.introTitle}</h3>
            <p className="font-body text-lg sm:text-2xl leading-snug text-foreground">{guide.intro}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-end">
            {guide.targets.map((target) => (
              <article
                key={target.classId}
                className="group relative min-h-[430px] overflow-hidden rounded bg-transparent px-4 pt-4 pb-5 transition-transform duration-200 hover:-translate-y-1 focus-within:-translate-y-1"
                tabIndex={0}
              >
                <div className="absolute inset-x-3 bottom-4 top-12 rounded bg-red-900/0 opacity-0 blur-xl transition-all duration-200 group-hover:bg-red-800/35 group-hover:opacity-100 group-focus-within:bg-red-800/35 group-focus-within:opacity-100" />
                <div className="absolute inset-x-8 bottom-8 h-24 bg-red-700/0 blur-2xl transition-colors duration-200 group-hover:bg-red-700/35 group-focus-within:bg-red-700/35" />

                <div className="relative h-[300px] flex items-end justify-center">
                  <img
                    src={target.image}
                    alt={target.name}
                    className="max-h-[300px] w-full object-contain drop-shadow-[0_14px_14px_rgba(38,25,13,0.28)] transition duration-200 group-hover:grayscale group-hover:sepia group-hover:saturate-[2.4] group-hover:hue-rotate-[-35deg] group-hover:brightness-75 group-focus-within:grayscale group-focus-within:sepia group-focus-within:saturate-[2.4] group-focus-within:hue-rotate-[-35deg] group-focus-within:brightness-75"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                    <div className="h-28 w-28 rotate-45 border-4 border-red-600/90" />
                    <div className="absolute h-1.5 w-36 rotate-45 bg-red-600 shadow-[0_0_18px_rgba(220,38,38,0.7)]" />
                    <div className="absolute h-1.5 w-36 -rotate-45 bg-red-600 shadow-[0_0_18px_rgba(220,38,38,0.7)]" />
                  </div>
                </div>

                <div className="relative mt-4 border-2 border-border bg-card/90 p-4 shadow-card transition-colors duration-200 group-hover:border-red-700 group-hover:bg-red-950 group-hover:text-white group-focus-within:border-red-700 group-focus-within:bg-red-950 group-focus-within:text-white">
                  <h4 className="font-display text-3xl uppercase leading-none">{target.name}</h4>
                  <p className="font-slab text-sm mt-2 text-muted-foreground transition-colors group-hover:text-white/80 group-focus-within:text-white/80">
                    {target.reason}
                  </p>
                  <p className="font-body text-sm mt-3 font-bold">{target.approach}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tf-paper border-2 border-border shadow-card overflow-hidden">
        <div className="bg-[#ead8bb] border-b-2 border-border px-4 py-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl uppercase text-foreground">Also Remember</h2>
          <span className="text-[10px] uppercase tracking-[0.24em] text-blu-team font-bold">who counters us</span>
        </div>

        <div className="px-5 py-6 sm:px-8">
          <p className="max-w-3xl font-slab text-sm sm:text-base text-muted-foreground leading-7 mb-5">
            These classes are the biggest danger for {className}. Respect their strongest range first, then look for the
            moment when they reload, turn away, or lose cover.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {guide.counters.map((counter) => (
              <article
                key={counter.classId}
                className="group relative overflow-hidden border-2 border-border bg-card p-4 shadow-card transition duration-200 hover:-translate-y-1 hover:border-blu-team hover:bg-[#12263a] hover:text-white focus-within:-translate-y-1 focus-within:border-blu-team focus-within:bg-[#12263a] focus-within:text-white"
                tabIndex={0}
              >
                <div className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-blu-team/40 bg-blu-team/10 text-blu-team opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-110 group-focus-within:opacity-100 group-focus-within:scale-110">
                  <AlertTriangle size={26} />
                </div>
                <div className="grid grid-cols-[104px_1fr] gap-4 items-center">
                  <div className="relative h-32 overflow-hidden rounded bg-muted/40">
                    <img
                      src={counter.image}
                      alt={counter.name}
                      className="h-full w-full object-contain transition duration-200 group-hover:brightness-75 group-hover:saturate-[1.8] group-hover:hue-rotate-[160deg] group-focus-within:brightness-75 group-focus-within:saturate-[1.8] group-focus-within:hue-rotate-[160deg]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-blu-team/0 transition-colors duration-200 group-hover:bg-blu-team/25 group-focus-within:bg-blu-team/25" />
                  </div>
                  <div>
                    <h4 className="font-display text-3xl uppercase leading-none">{counter.name}</h4>
                    <p className="font-slab text-sm mt-2 text-muted-foreground transition-colors group-hover:text-white/80 group-focus-within:text-white/80">
                      {counter.reason}
                    </p>
                  </div>
                </div>
                <p className="mt-4 border-t border-border/40 pt-3 font-body text-sm font-bold">{counter.approach}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[1.45fr_0.55fr] gap-5">
        <article className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card">
          <div className="h-1 bg-primary" />
          <div className="p-5">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Shield size={18} />
              <span className="text-xs uppercase tracking-[0.25em] font-bold">{guide.combo.style}</span>
            </div>
            <h3 className="font-display text-4xl text-white mb-3">{guide.combo.title}</h3>
            <p className="font-slab text-sm text-surface-dark-foreground/70 mb-4">{guide.combo.description}</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {guide.combo.loadouts.map((loadout) => (
                <div key={loadout} className="border border-white/10 bg-white/[0.04] p-3 text-sm">
                  {loadout}
                </div>
              ))}
            </div>
            <ul className="space-y-1 text-sm">
              {guide.combo.tips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rotate-45 bg-primary shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="tf-paper border-2 border-border shadow-card p-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Personal tip</div>
          <h3 className="font-display text-3xl uppercase mb-3">{className}</h3>
          <p className="font-slab text-sm text-muted-foreground leading-7">{guide.personalTip}</p>
        </aside>
      </section>
    </div>
  );
}
