import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import { getClassMapPosition, getMapPreviewImage, TF2_MAPS } from "@/data/mapPositions";

interface Props {
  classId: string;
  className: string;
}

const MODES = ["All", ...Array.from(new Set(TF2_MAPS.map((map) => map.mode)))];

export const MapPositionPlanner = ({ classId, className }: Props) => {
  const [activeMode, setActiveMode] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const groupedMaps = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const visibleMaps = (activeMode === "All" ? TF2_MAPS : TF2_MAPS.filter((map) => map.mode === activeMode)).filter(
      (map) => !query || map.name.toLowerCase().includes(query) || map.id.toLowerCase().includes(query) || map.mode.toLowerCase().includes(query),
    );

    return visibleMaps.reduce<Record<string, typeof TF2_MAPS>>((groups, map) => {
      groups[map.mode] = [...(groups[map.mode] ?? []), map];
      return groups;
    }, {});
  }, [activeMode, searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{className}</div>
        <h1 className="font-display text-4xl sm:text-5xl tf-headline mb-4">Positioning Maps</h1>
        <p className="font-slab text-sm text-muted-foreground max-w-3xl">
          Maps are grouped by mode. Open a map to see the large tactical view, then add custom
          images, pins, routes, and class-specific notes in `src/data/mapPositions.ts`.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-3 items-start">
        <div className="flex flex-wrap gap-2">
          {MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setActiveMode(mode)}
              className={`border px-3 py-2 text-xs uppercase tracking-widest font-bold transition-colors ${
                activeMode === mode
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <label className="relative block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search map by name..."
            className="w-full border-2 border-border bg-card py-3 pl-10 pr-4 font-slab text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
        </label>
      </div>

      <div className="space-y-9">
        {Object.entries(groupedMaps).length === 0 ? (
          <div className="tf-paper border-2 border-border shadow-card p-6">
            <h2 className="font-display text-3xl mb-2">No maps found</h2>
            <p className="font-slab text-sm text-muted-foreground">
              Try another name, mode, or map id. Example: Process, Badwater, 2Fort, KOTH.
            </p>
          </div>
        ) : Object.entries(groupedMaps).map(([mode, maps]) => (
          <section key={mode}>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-6 w-1 bg-primary" />
              <h2 className="font-display text-3xl tf-headline">{mode}</h2>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{maps.length} maps</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {maps.map((map) => {
                const plan = getClassMapPosition(classId, map.id);
                const image = getMapPreviewImage(classId, map.id);

                return (
                  <Link
                    key={map.id}
                    to={`/class/${classId}/section/positioning/map/${map.id}`}
                    className="tf-paper border-2 border-border shadow-card overflow-hidden transition-transform hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[4/3] bg-surface-dark text-surface-dark-foreground">
                      {image ? (
                        <img src={image} alt={`${map.name} map plan`} className="absolute inset-0 h-full w-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center bg-gradient-dark">
                          <div className="text-center px-3">
                            <MapPin className="mx-auto mb-2 text-primary" size={22} />
                            <div className="text-[9px] uppercase tracking-[0.2em] text-white/45">add image</div>
                          </div>
                        </div>
                      )}

                      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" aria-hidden>
                        {plan.routes?.map((route) => (
                          <polyline
                            key={route.label}
                            points={route.points}
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ))}
                        {plan.pins?.map((pin) => (
                          <circle key={pin.label} cx={pin.x} cy={pin.y} r="2.4" fill="hsl(var(--primary))" />
                        ))}
                      </svg>
                    </div>
                    <div className="p-3">
                      <div className="text-[9px] uppercase tracking-[0.2em] text-primary font-bold">{map.mode}</div>
                      <h3 className="font-display text-xl mt-1 leading-none">{map.name}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
