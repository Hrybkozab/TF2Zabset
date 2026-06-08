import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowLeft, Brain, MapPin, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TF_CLASSES } from "@/data/classes";
import { getClassMapPosition, getMapImage, TF2_MAPS, type PositionSpot, type PositionType } from "@/data/mapPositions";

const POSITION_FILTERS: Array<"ALL" | PositionType> = ["ALL", "SAFE", "AGGRESSIVE", "FLANK", "LAST HOLD"];

const typeClasses: Record<PositionType, string> = {
  SAFE: "bg-skill-beginner text-primary-foreground",
  AGGRESSIVE: "bg-primary text-primary-foreground",
  FLANK: "bg-blu-team text-blu-team-foreground",
  "LAST HOLD": "bg-secondary text-secondary-foreground",
};

const metricLabel: Record<keyof PositionSpot["metrics"], string> = {
  cover: "Cover",
  escape: "Escape",
  healthpack: "Healthpack",
  sightlines: "Sightlines",
};

function Stars({ value }: { value: number }) {
  return (
    <span className="font-display text-lg tracking-[0.08em]">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < value ? "text-primary" : "text-muted"}>
          *
        </span>
      ))}
    </span>
  );
}

export default function MapPositionPage() {
  const { id, mapId } = useParams();
  const navigate = useNavigate();
  const cls = TF_CLASSES.find((item) => item.id === id);
  const map = TF2_MAPS.find((item) => item.id === mapId);
  const safeClassId = cls?.id ?? "scout";
  const safeMapId = mapId ?? "cp_process_final";
  const plan = useMemo(() => getClassMapPosition(safeClassId, safeMapId), [safeClassId, safeMapId]);
  const image = useMemo(() => getMapImage(safeClassId, safeMapId), [safeClassId, safeMapId]);
  const spots = useMemo(() => plan.spots ?? [], [plan.spots]);
  const [activeFilter, setActiveFilter] = useState<"ALL" | PositionType>("ALL");
  const [zoom, setZoom] = useState(1);
  const filteredSpots = useMemo(
    () => (activeFilter === "ALL" ? spots : spots.filter((spot) => spot.type === activeFilter)),
    [activeFilter, spots],
  );
  const [activeSpotId, setActiveSpotId] = useState(spots[0]?.id ?? "");
  const selectedSpot = spots.find((spot) => spot.id === activeSpotId) ?? filteredSpots[0] ?? spots[0];

  if (!cls || !map || !mapId) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-10 sm:py-14 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:underline"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <Link
            to={`/class/${cls.id}/section/positioning`}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
          >
            All {cls.name} maps
          </Link>
        </div>

        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
            {cls.name} / {map.mode}
          </div>
          <h1 className="font-display text-4xl sm:text-6xl tf-headline">{map.name}</h1>
          <p className="font-slab text-sm text-muted-foreground max-w-3xl mt-3">
            Click a real in-game map point to open a position card with ratings, mistakes, and a coach note.
            Keep it simple: 5-8 remembered spots beat a noisy map full of icons.
          </p>
        </div>

        <section className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {POSITION_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`border px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors ${
                  activeFilter === filter
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid xl:grid-cols-[1fr_360px] gap-5">
            <div className="tf-paper border-2 border-border shadow-card p-3">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Map zoom {Math.round(zoom * 100)}%
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setZoom((value) => Math.max(1, Number((value - 0.25).toFixed(2))))}
                    className="grid h-9 w-9 place-items-center border border-border bg-card text-primary transition-colors hover:border-primary"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom(1)}
                    className="grid h-9 w-9 place-items-center border border-border bg-card text-primary transition-colors hover:border-primary"
                    aria-label="Reset zoom"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom((value) => Math.min(2.5, Number((value + 0.25).toFixed(2))))}
                    className="grid h-9 w-9 place-items-center border border-border bg-card text-primary transition-colors hover:border-primary"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={17} />
                  </button>
                </div>
              </div>

              <div className="relative aspect-[16/9] bg-surface-dark text-surface-dark-foreground overflow-auto border border-border">
                <div className="relative min-h-full min-w-full" style={{ width: `${zoom * 100}%`, aspectRatio: "16 / 9" }}>
                  {image ? (
                    <img src={image} alt={`${map.name} mini-map overview`} className="absolute inset-0 h-full w-full object-contain bg-surface-dark" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-gradient-dark">
                      <div className="text-center px-6">
                        <MapPin className="mx-auto mb-4 text-primary" size={54} />
                        <div className="font-display text-5xl text-white">{map.name}</div>
                        <p className="font-slab text-sm text-white/55 mt-3 max-w-md">
                          Add a map image path in `src/data/mapPositions.ts` to use this page like a CS2-style tactical mini-map.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />

                  {filteredSpots.map((spot) => {
                    const isActive = selectedSpot?.id === spot.id;

                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => setActiveSpotId(spot.id)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      >
                        <span
                          className={`grid h-9 w-9 place-items-center rounded-full border-2 text-xs font-bold shadow-[0_0_18px_rgba(232,82,10,0.65)] transition-transform group-hover:scale-110 ${
                            isActive ? "border-white bg-primary text-white" : "border-primary bg-surface-dark/90 text-primary"
                          }`}
                        >
                          P
                        </span>
                        <span
                          className={`absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap bg-surface-dark/90 px-2 py-1 font-display text-lg text-white shadow-card transition-opacity ${
                            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          {spot.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="tf-paper border-2 border-border shadow-card p-5 self-start">
              <div className="tf-stamp inline-block bg-primary text-primary-foreground px-3 py-1 text-xs mb-4">
                Position Types
              </div>
              <h2 className="font-display text-3xl mb-3">{cls.name} on {map.name}</h2>
              <p className="font-slab text-sm text-muted-foreground leading-relaxed mb-4">
                {plan.notes ?? "No notes yet. Add class-specific instructions, pins, and routes in the map position data file."}
              </p>
              <div className="flex flex-wrap gap-2">
                {spots.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => {
                      setActiveFilter("ALL");
                      setActiveSpotId(spot.id);
                    }}
                    className={`border px-3 py-2 text-xs uppercase tracking-widest font-bold ${
                      selectedSpot?.id === spot.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground"
                    }`}
                  >
                    {spot.label}
                  </button>
                ))}
              </div>
            </aside>
          </div>

          {selectedSpot && (
            <PositionCard spot={selectedSpot} mapName={map.name} className={cls.name} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PositionCard({ spot, mapName, className }: { spot: PositionSpot; mapName: string; className: string }) {
  return (
    <article className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card overflow-hidden">
      <div className="h-1 bg-primary" />
      <div className="grid xl:grid-cols-[1.05fr_0.95fr] gap-0">
        <div className="relative min-h-[360px] bg-black">
          <img
            src={spot.screenshot}
            alt={`${spot.label} position on ${mapName}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
          <div className="absolute left-5 bottom-5 right-5">
            <span className={`inline-block px-3 py-1 text-xs uppercase tracking-widest font-bold ${typeClasses[spot.type]}`}>
              {spot.type}
            </span>
            <h2 className="font-display text-5xl text-white mt-3">{spot.label}</h2>
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">{className} / {mapName}</div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <section>
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Position tags</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {(Object.keys(spot.metrics) as Array<keyof PositionSpot["metrics"]>).map((key) => (
                <div key={key} className="border border-white/10 bg-white/[0.04] px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50">{metricLabel[key]}</span>
                    <Stars value={spot.metrics[key]} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-display text-3xl text-white mb-2">Why It Works</h3>
            <p className="font-slab text-sm leading-7 text-surface-dark-foreground/75">{spot.why}</p>
          </section>

          <div className="grid sm:grid-cols-2 gap-4">
            <InfoList title="Plus" items={spot.plus} />
            <InfoList title="Minus" items={spot.minus} />
          </div>

          <section className="border-2 border-destructive bg-destructive/15 p-4">
            <div className="flex items-center gap-2 text-destructive mb-2">
              <X size={18} />
              <h3 className="font-display text-3xl text-white">Common Mistakes</h3>
            </div>
            <ul className="space-y-2 text-sm">
              {spot.mistakes.map((mistake) => (
                <li key={mistake} className="flex gap-2">
                  <span className="font-bold text-destructive">X</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="tf-paper border-2 border-primary p-4 text-foreground">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Brain size={20} />
              <h3 className="font-display text-3xl">Coach Note</h3>
            </div>
            <p className="font-slab text-sm leading-7 text-muted-foreground">{spot.coachNote}</p>
          </section>
        </div>
      </div>
    </article>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border border-white/10 bg-white/[0.04] p-4">
      <h3 className="font-display text-3xl text-white mb-2">{title}</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rotate-45 bg-primary shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
