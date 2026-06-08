import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Map, Search, Activity } from "lucide-react";
import { CLASS_IMAGES } from "@/lib/classImages";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

// Data

interface Guide {
  id: number;
  title: string;
  content: string;
  tf2_class: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
  username: string;
  avatar: string | null;
  avg_rating: number;
  rating_count: number;
}

const ALL_CATEGORIES = ["All", "Movement", "Positioning", "Strategy", "Mechanics", "Aim", "Building", "Rollout"];
const ALL_CLASSES = ["All Classes", "Scout", "Soldier", "Pyro", "Demoman", "Heavy", "Engineer", "Medic", "Sniper", "Spy"];
const CLASS_ORDER = ["Scout", "Soldier", "Pyro", "Demoman", "Heavy", "Engineer", "Medic", "Sniper", "Spy", "All Classes"];
const GUIDES_PER_PAGE = 20;

const CLASS_COLORS: Record<string, string> = {
  Scout: "#5c8cff",
  Soldier: "#4b69ff",
  Pyro: "#f56800",
  Demoman: "#de3b00",
  Heavy: "#7d4071",
  Engineer: "#8c6e1f",
  Medic: "#47a29a",
  Sniper: "#5c8cff",
  Spy: "#5c8cff",
};

// Component

export default function GuidesPage() {
  const { user } = useAuth();
  const canCreateGuide = !!user;
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeClass, setActiveClass] = useState("All Classes");
  const [page, setPage] = useState(1);
  const [hovered, setHovered] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchGuides();
  }, [activeClass, search]);

  const fetchGuides = async () => {
    setLoading(true);
    try {
      const data = await api.getGuides({
        class: activeClass === "All Classes" ? undefined : activeClass,
        search: search || undefined,
        limit: 100,
      });
      setGuides(data);
    } catch (error) {
      console.error('Error fetching guides:', error);
      setGuides([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = guides;
  const featured = filtered.slice(0, 3);
  const totalPages = Math.max(1, Math.ceil(filtered.length / GUIDES_PER_PAGE));
  const pagedGuides = filtered.slice((page - 1) * GUIDES_PER_PAGE, page * GUIDES_PER_PAGE);
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div style={styles.page}>
      <Header />

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.badge}>STRATEGY & MECHANICS</div>
          <h1 style={styles.pageTitle}>ALL GUIDES</h1>
          <p style={styles.subtitle}>
            From rocket jumping to Uber timing - master every mechanic
          </p>

          {/* Search */}
          <input
            type="text"
            placeholder="Search guides by title or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.content}>

        {/* Filters */}
        <section style={styles.section}>
          <div style={styles.filtersBlock}>
            {/* Class */}
            <div style={styles.filterGroup}>
              <span style={styles.filterLabel}>CLASS</span>
              <div style={styles.filterRow}>
                {ALL_CLASSES.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setActiveClass(cls)}
                    style={{
                      ...styles.filterBtn,
                      ...(activeClass === cls ? styles.filterBtnActive : {}),
                    }}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionDot} />
            <h2 style={styles.sectionTitle}>
              {loading ? (
                <Activity className="animate-spin" size={16} />
              ) : (
                `${filtered.length} GUIDE${filtered.length !== 1 ? "S" : ""}`
              )}
            </h2>
          </div>

          {loading ? (
            <div style={styles.empty}>
              <Activity className="animate-spin" size={40} color="#6a5030" />
              <p style={{ color: "#6a5030", fontFamily: "sans-serif", marginTop: 12 }}>
                Loading guides...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={styles.empty}>
              <Search size={40} color="#6a5030" />
              <p style={{ color: "#6a5030", fontFamily: "sans-serif", marginTop: 12 }}>
                No guides found. Try different filters.
              </p>
            </div>
          ) : (
            <>
              <div style={styles.guidesGrid}>
                {pagedGuides.map((g) => (
                  <GuideCard
                    key={g.id}
                    guide={g}
                    isHovered={hovered === g.id}
                    onHover={() => setHovered(g.id)}
                    onLeave={() => setHovered(null)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div style={styles.pagination}>
                  {visiblePages.map((item, index) =>
                    item === "dots" ? (
                      <span key={`dots-${index}`} style={styles.paginationDots}>...</span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setPage(item)}
                        style={{
                          ...styles.pageButton,
                          ...(page === item ? styles.pageButtonActive : {}),
                        }}
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>
              )}
            </>
          )}
        </section>

        <section style={styles.section}>
          <div style={styles.submitGuideBlock}>
            <div>
              <div style={styles.badge}>COMMUNITY GUIDE</div>
              <h2 style={{ ...styles.pageTitle, fontSize: "clamp(30px, 4vw, 48px)", marginBottom: 8 }}>
                ADD YOUR OWN GUIDE
              </h2>
              <p style={styles.subtitle}>
                Write a title, content, add tags, and select a TF2 class.
              </p>
            </div>
            <Link to={canCreateGuide ? "/guides/new" : "/profile"} style={styles.submitGuideButton}>
              CREATE GUIDE
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

function getVisiblePages(current: number, total: number): Array<number | "dots"> {
  if (total <= 8) return Array.from({ length: total }, (_, index) => index + 1);

  const pages = new Set<number>([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((item) => item >= 1 && item <= total).sort((a, b) => a - b);

  return sorted.flatMap((item, index) => {
    const previous = sorted[index - 1];
    if (index > 0 && previous && item - previous > 1) return ["dots" as const, item];
    return [item];
  });
}

// Sub-components

function GuideCard({
  guide,
  isHovered,
  onHover,
  onLeave,
}: {
  guide: Guide;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const classColor = guide.tf2_class ? CLASS_COLORS[guide.tf2_class] || "#e8520a" : "#e8520a";
  const previewText = guide.content.substring(0, 100) + (guide.content.length > 100 ? "..." : "");

  return (
    <Link
      to={`/guides/${guide.id}`}
      style={{
        ...styles.guideCard,
        borderColor: isHovered ? classColor + "80" : "#3d2c1a",
        transform: isHovered ? "translateY(-2px)" : "none",
        boxShadow: isHovered ? `0 8px 24px rgba(0,0,0,0.35)` : "none",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div style={{ ...styles.guideAccent, background: classColor }} />
      <div style={styles.guideBody}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {guide.avatar && (
              <img
                src={guide.avatar}
                alt={guide.username}
                style={{ ...styles.guideIconImage, width: 36, height: 36 }}
              />
            )}
            <h3 style={{ ...styles.guideTitle, color: isHovered ? classColor : "#e8d8b8" }}>
              {guide.title}
            </h3>
          </div>
          {guide.avg_rating > 0 && (
            <span
              style={{
                ...styles.smallBadge,
                flexShrink: 0,
                background: "#2d2010",
                color: "#f5a623",
                border: "1px solid #4d3820",
              }}
            >
              ★ {guide.avg_rating.toFixed(1)}
            </span>
          )}
        </div>

        <p style={styles.guideDesc}>{previewText}</p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 10 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {guide.tf2_class && (
              <span style={{ ...styles.smallBadge, background: classColor + "20", color: classColor, border: `1px solid ${classColor}40` }}>
                {guide.tf2_class}
              </span>
            )}
            {guide.tags.slice(0, 2).map((tag) => (
              <span key={tag} style={{ ...styles.smallBadge, background: "#2d2010", color: "#7a6040", border: "1px solid #4d3820" }}>
                {tag}
              </span>
            ))}
          </div>
          <span style={styles.readTime}>
            <Clock size={13} />
            {guide.username}
          </span>
        </div>
      </div>
    </Link>
  );
}

// Styles

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#1a1209",
    backgroundImage:
      "radial-gradient(ellipse at 80% 0%, rgba(232,82,10,0.07) 0%, transparent 55%)",
    color: "#f0e8d8",
    fontFamily: "'Georgia', serif",
  },
  header: {
    background: "#231a0e",
    borderBottom: "2px solid #3d2c1a",
    padding: "60px 24px 40px",
    textAlign: "center",
  },
  headerInner: { maxWidth: 700, margin: "0 auto" },
  badge: {
    display: "inline-block",
    background: "#e8520a",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.15em",
    padding: "4px 16px",
    fontFamily: "sans-serif",
    marginBottom: 16,
  },
  pageTitle: {
    fontFamily: "'Impact', 'Georgia', sans-serif",
    fontSize: "clamp(36px, 6vw, 64px)",
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 10px",
    letterSpacing: "0.04em",
    textShadow: "0 2px 20px rgba(232,82,10,0.3)",
  },
  subtitle: {
    fontSize: 15,
    color: "#a08060",
    margin: "0 0 24px",
    fontStyle: "italic",
    fontFamily: "sans-serif",
  },
  searchInput: {
    width: "100%",
    maxWidth: 500,
    background: "#2d2010",
    border: "1px solid #4d3820",
    borderRadius: 3,
    padding: "10px 16px",
    fontSize: 14,
    color: "#e8d8b8",
    outline: "none",
    fontFamily: "sans-serif",
  },
  content: { maxWidth: 1280, margin: "0 auto", padding: "40px 24px 80px" },
  section: { marginBottom: 48 },
  sectionHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20 },
  sectionDot: {
    width: 4,
    height: 20,
    background: "#e8520a",
    borderRadius: 2,
    flexShrink: 0,
  },
  sectionTitle: {
    fontFamily: "sans-serif",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.15em",
    color: "#8a6840",
    margin: 0,
  },
  featuredGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 16,
  },
  featCard: {
    background: "#231a0e",
    border: "1px solid #3d2c1a",
    borderRadius: 4,
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "block",
    color: "inherit",
    textDecoration: "none",
  },
  featAccent: { height: 3 },
  featTitle: {
    fontFamily: "'Impact', sans-serif",
    fontSize: 18,
    letterSpacing: "0.04em",
    margin: 0,
    transition: "color 0.2s",
  },
  featDesc: { fontSize: 13, color: "#a08060", lineHeight: 1.6, margin: 0, fontFamily: "sans-serif" },
  featImg: { width: 56, height: 56, borderRadius: 4, objectFit: "cover" },
  guideIconImage: {
    objectFit: "cover",
    borderRadius: "50%",
    border: "1px solid #4d3820",
    background: "#1a1209",
    flexShrink: 0,
  },
  genericGuideIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "1px solid #4d3820",
    background: "#1a1209",
    flexShrink: 0,
  },
  filtersBlock: {
    background: "#231a0e",
    border: "1px solid #3d2c1a",
    borderRadius: 4,
    padding: "20px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  filterGroup: { display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" },
  filterLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.15em",
    color: "#6a5030",
    fontFamily: "sans-serif",
    paddingTop: 7,
    minWidth: 70,
    flexShrink: 0,
  },
  filterRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  filterBtn: {
    background: "transparent",
    border: "1px solid #3d2c1a",
    color: "#7a6040",
    padding: "5px 12px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    cursor: "pointer",
    fontFamily: "sans-serif",
    transition: "all 0.15s",
    borderRadius: 2,
  },
  filterBtnActive: {
    background: "rgba(232,82,10,0.15)",
    borderColor: "#e8520a",
    color: "#e8520a",
  },
  guidesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 16,
  },
  guideCard: {
    background: "#231a0e",
    border: "1px solid #3d2c1a",
    borderRadius: 4,
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    flexDirection: "column",
    color: "inherit",
    textDecoration: "none",
  },
  guideAccent: { height: 2, flexShrink: 0 },
  guideBody: {
    padding: "14px 16px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  guideTitle: {
    fontFamily: "'Impact', sans-serif",
    fontSize: 16,
    letterSpacing: "0.04em",
    margin: 0,
    transition: "color 0.2s",
    lineHeight: 1.2,
  },
  guideDesc: {
    fontSize: 12,
    color: "#8a7060",
    lineHeight: 1.6,
    margin: 0,
    fontFamily: "sans-serif",
  },
  smallBadge: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.08em",
    padding: "2px 7px",
    borderRadius: 2,
    fontFamily: "sans-serif",
  },
  readTime: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    color: "#6a5030",
    fontFamily: "sans-serif",
  },
  readBtn: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 2,
    padding: "4px 12px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    cursor: "pointer",
    fontFamily: "sans-serif",
    transition: "background 0.15s",
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
  },
  submitGuideBlock: {
    background: "#231a0e",
    border: "2px solid #3d2c1a",
    borderTop: "4px solid #e8520a",
    padding: "28px 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
  },
  submitGuideButton: {
    background: "#e8520a",
    color: "#fff",
    padding: "12px 22px",
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.1em",
    textDecoration: "none",
    fontFamily: "sans-serif",
    boxShadow: "4px 4px 0 #120b06",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 28,
    flexWrap: "wrap",
  },
  pageButton: {
    background: "#231a0e",
    border: "1px solid #4d3820",
    color: "#a08060",
    minWidth: 36,
    height: 34,
    padding: "0 10px",
    cursor: "pointer",
    fontFamily: "'Impact', sans-serif",
    fontSize: 16,
    letterSpacing: "0.06em",
  },
  pageButtonActive: {
    background: "#e8520a",
    borderColor: "#e8520a",
    color: "#fff",
    boxShadow: "3px 3px 0 #120b06",
  },
  paginationDots: {
    color: "#8a6840",
    fontFamily: "sans-serif",
    fontWeight: 700,
    padding: "0 4px",
  },
};
