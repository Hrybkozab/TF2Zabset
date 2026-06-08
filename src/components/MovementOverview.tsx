import { useState } from "react";
import { AlertTriangle, Brain, Footprints, Map, Play, Target } from "lucide-react";
import { getMovementGuide, type MovementTechnique } from "@/data/movementData";

interface MovementOverviewProps {
  classId: string;
  className: string;
}

function Stars({ value }: { value: number }) {
  return (
    <span className="font-display text-xl tracking-[0.08em]" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < value ? "text-primary" : "text-muted"}>
          *
        </span>
      ))}
    </span>
  );
}

export function MovementOverview({ classId, className }: MovementOverviewProps) {
  const guide = getMovementGuide(classId);
  const [activeTechniqueId, setActiveTechniqueId] = useState(guide.techniques[0]?.id ?? "");
  const activeTechnique = guide.techniques.find((technique) => technique.id === activeTechniqueId) ?? guide.techniques[0];

  return (
    <div className="space-y-7">
      <section className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card overflow-hidden">
        <div className="h-1 bg-primary" />
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <Footprints className="text-primary" size={28} />
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Movement</div>
              <h2 className="font-display text-4xl text-white">{className} Core Movement</h2>
            </div>
          </div>
          <p className="font-slab text-sm text-surface-dark-foreground/70 max-w-3xl">{guide.intro}</p>

          <div className="mt-6 grid lg:grid-cols-[0.95fr_1.05fr] gap-5 items-start">
            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {guide.techniques.map((technique) => {
                const isActive = activeTechnique?.id === technique.id;

                return (
                  <button
                    key={technique.id}
                    type="button"
                    onClick={() => setActiveTechniqueId(technique.id)}
                    className={`text-left border-2 p-4 min-h-[132px] transition-transform hover:-translate-y-0.5 ${
                      isActive ? "border-primary bg-primary/15" : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-3xl text-white leading-none">{technique.title}</h3>
                        <div className="text-[10px] uppercase tracking-[0.24em] text-primary font-bold mt-2">{technique.tag}</div>
                      </div>
                      <Stars value={technique.rating} />
                    </div>
                    <p className="text-xs text-surface-dark-foreground/60 mt-3 line-clamp-2">{technique.purpose}</p>
                  </button>
                );
              })}
            </div>

            {activeTechnique && <TechniqueDetails technique={activeTechnique} />}
          </div>
        </div>
      </section>

      <section className="tf-paper border-2 border-border shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <Target className="text-primary" size={26} />
          <h2 className="font-display text-4xl tf-headline">Movement Drills</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {guide.drills.map((drill, index) => (
            <article key={drill.id} className="border-2 border-border bg-card p-5 shadow-card">
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold mb-2">Drill #{index + 1}</div>
              <h3 className="font-display text-3xl">{drill.title}</h3>
              <InfoRow label="Goal" value={drill.goal} />
              <InfoRow label="Focus" value={drill.focus} />
            </article>
          ))}
        </div>
      </section>

      <section className="tf-paper border-2 border-border shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <Map className="text-primary" size={26} />
          <h2 className="font-display text-4xl tf-headline">Routes</h2>
        </div>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-5 items-start">
          <div className="relative aspect-[4/3] overflow-hidden border-2 border-border bg-surface-dark shadow-card">
            <img
              src="https://image.gametracker.com/images/maps/160x120/tf2/cp_process_final.jpg"
              alt="Process route preview"
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/20 to-surface-dark/70" />
            <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" aria-hidden>
              {guide.routes.map((route, index) => (
                <polyline
                  key={route.id}
                  points={route.points}
                  fill="none"
                  stroke={index === 0 ? "hsl(var(--primary))" : index === 1 ? "hsl(143 55% 52%)" : "hsl(204 76% 58%)"}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {guide.routes.map((route, index) => {
                const [firstPoint] = route.points.split(" ");
                const [x, y] = firstPoint.split(",");

                return <circle key={`${route.id}-start`} cx={x} cy={y} r="2.5" fill={index === 0 ? "hsl(var(--primary))" : index === 1 ? "hsl(143 55% 52%)" : "hsl(204 76% 58%)"} />;
              })}
            </svg>
            <div className="absolute left-4 top-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold">Process</div>
              <div className="font-display text-4xl text-white">Route Map</div>
            </div>
          </div>

          <div className="grid gap-3">
            {guide.routes.map((route) => (
              <article key={route.id} className="border-2 border-border bg-card p-4 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-3xl">{route.title}</h3>
                  <Stars value={route.difficulty} />
                </div>
                <InfoRow label="Purpose" value={route.purpose} />
                <InfoRow label="Risk" value={route.risk} danger={route.risk.toLowerCase().includes("high")} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tf-paper border-2 border-border shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <AlertTriangle className="text-destructive" size={26} />
          <h2 className="font-display text-4xl tf-headline">Common Mistakes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {guide.mistakes.map((mistake) => (
            <article key={mistake.title} className="bg-surface-dark text-surface-dark-foreground border-2 border-destructive/70 p-5 shadow-card">
              <div className="text-[10px] uppercase tracking-[0.25em] text-destructive font-bold mb-2">Mistake</div>
              <h3 className="font-display text-3xl text-white">{mistake.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {mistake.flags.map((flag) => (
                  <li key={flag} className="flex gap-2">
                    <span className="font-bold text-destructive">X</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-white/10 pt-3">
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold">Result</div>
                <p className="font-slab text-sm text-surface-dark-foreground/70 mt-1">{mistake.result}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="tf-paper border-2 border-primary shadow-card p-5">
        <div className="flex items-center gap-2 text-primary mb-3">
          <Brain size={22} />
          <h2 className="font-display text-3xl">Movement Mindset</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {guide.coachNotes.map((note) => (
            <p key={note} className="border border-border bg-card p-4 font-slab text-sm text-muted-foreground leading-7">
              {note}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

function movementYoutubeEmbedUrl(technique: MovementTechnique): string | null {
  if (!technique.videoYoutubeId) return null;

  const params = new URLSearchParams();
  if (technique.videoStart != null) params.set("start", String(technique.videoStart));
  if (technique.videoEnd != null) params.set("end", String(technique.videoEnd));

  const query = params.toString();
  return `https://www.youtube.com/embed/${technique.videoYoutubeId}${query ? `?${query}` : ""}`;
}

function TechniqueDetails({ technique }: { technique: MovementTechnique }) {
  const youtubeEmbedUrl = movementYoutubeEmbedUrl(technique);

  return (
    <article className="border-2 border-primary bg-white/[0.05] p-5">
      <div className="grid xl:grid-cols-[1fr_1.05fr] gap-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Selected technique</div>
          <h3 className="font-display text-5xl text-white mb-2">{technique.title}</h3>
          <div className="mb-4">
            <Stars value={technique.rating} />
          </div>
          <InfoRow label="Purpose" value={technique.purpose} dark />
          <InfoRow label="Use" value={technique.use} dark />
          <InfoRow label="Avoid" value={technique.avoid} dark danger />
        </div>

        <div className="border-2 border-white/10 bg-black/35 min-h-[240px]">
          {technique.videoNote && (
            <p className="border-b border-white/10 px-3 py-2 font-slab text-[11px] text-primary/90 leading-snug">
              {technique.videoNote}
            </p>
          )}
          {technique.videoSrc ? (
            <video
              key={technique.videoSrc}
              src={technique.videoSrc}
              className="h-full min-h-[240px] w-full object-cover"
              controls
              muted
              playsInline
            />
          ) : youtubeEmbedUrl ? (
            <iframe
              key={`${technique.id}-${technique.videoStart ?? 0}-${technique.videoEnd ?? 0}`}
              src={youtubeEmbedUrl}
              title={`${technique.title} movement example`}
              className="h-full min-h-[240px] w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="grid min-h-[240px] place-items-center p-5 text-center">
              <div>
                <Play className="mx-auto text-primary mb-3" size={32} />
                <div className="font-display text-3xl text-white">Video Slot</div>
                <p className="font-slab text-xs text-surface-dark-foreground/60 mt-2">
                  Add a short clip here when the movement example is ready.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function InfoRow({ label, value, danger = false, dark = false }: { label: string; value: string; danger?: boolean; dark?: boolean }) {
  return (
    <div className={`border-t ${dark ? "border-white/10" : "border-border/50"} py-3`}>
      <div className={`text-[10px] uppercase tracking-[0.24em] font-bold ${danger ? "text-destructive" : "text-primary"}`}>{label}</div>
      <p className={`font-slab text-sm leading-6 mt-1 ${dark ? "text-surface-dark-foreground/75" : "text-muted-foreground"}`}>{value}</p>
    </div>
  );
}
