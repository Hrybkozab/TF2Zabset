import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WIKI_CLASS_ICONS } from "@/lib/wikiClassIcons";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getWeaponImageUrl } from "@/data/weaponImageUrls";

// Data

const TF2_CLASSES = [
  {
    id: "scout",
    name: "Scout",
    role: "Offense",
    hp: 125,
    speed: "400%",
    color: "#e8a020",
    difficulty: "Hard",
    tagline: "Fastest class in the game",
    description:
      "The Scout is a fast-running scrapper from Boston who specializes in quick hit-and-run attacks. He can double jump and captures objectives twice as fast.",
    weapons: ["Scattergun", "Pistol", "Bat"],
    tips: 14,
  },
  {
    id: "soldier",
    name: "Soldier",
    role: "Offense",
    hp: 200,
    speed: "240%",
    color: "#c0392b",
    difficulty: "Very Hard",
    tagline: "Rocket-jumping powerhouse",
    description:
      "The Soldier is a versatile, heavy-hitting grunt who excels at rocket jumping, dealing burst damage, and supporting teammates with banners.",
    weapons: ["Rocket Launcher", "Shotgun", "Shovel"],
    tips: 21,
  },
  {
    id: "pyro",
    name: "Pyro",
    role: "Offense",
    hp: 175,
    speed: "300%",
    color: "#e67e22",
    difficulty: "Easy",
    tagline: "Close-range fire & ambush",
    description:
      "The Pyro is a mysterious pyromaniac who specializes in ambushing enemies at close range with fire and reflecting projectiles with airblast.",
    weapons: ["Flamethrower", "Shotgun", "Fire Axe"],
    tips: 12,
  },
  {
    id: "demoman",
    name: "Demoman",
    role: "Defense",
    hp: 175,
    speed: "280%",
    color: "#8e44ad",
    difficulty: "Hard",
    tagline: "Explosive area denial",
    description:
      "The Demoman is a self-described drunk explosives expert who uses sticky bombs and grenades to control areas and deal massive burst damage.",
    weapons: ["Grenade Launcher", "Sticky Launcher", "Bottle"],
    tips: 18,
  },
  {
    id: "heavy",
    name: "Heavy",
    role: "Defense",
    hp: 300,
    speed: "230%",
    color: "#c0392b",
    difficulty: "Easy",
    tagline: "Tanky suppression machine",
    description:
      "The Heavy is a towering Soviet bruiser with the most health in the game. He deals incredible sustained damage but moves slowly while firing.",
    weapons: ["Minigun", "Shotgun", "Fists"],
    tips: 10,
  },
  {
    id: "engineer",
    name: "Engineer",
    role: "Defense",
    hp: 125,
    speed: "300%",
    color: "#f39c12",
    difficulty: "Medium",
    tagline: "Builder & support specialist",
    description:
      "The Engineer is a laid-back Texas inventor who deploys Sentries, Dispensers, and Teleporters to support his team and lock down areas.",
    weapons: ["Shotgun", "Pistol", "Wrench"],
    tips: 16,
  },
  {
    id: "medic",
    name: "Medic",
    role: "Support",
    hp: 150,
    speed: "320%",
    color: "#27ae60",
    difficulty: "Hard",
    tagline: "Healer & Uber strategist",
    description:
      "The Medic is a German doctor who heals teammates and builds UberCharge to grant temporary invulnerability or other powerful effects.",
    weapons: ["Syringe Gun", "Medi Gun", "Bonesaw"],
    tips: 19,
  },
  {
    id: "sniper",
    name: "Sniper",
    role: "Support",
    hp: 125,
    speed: "300%",
    color: "#16a085",
    difficulty: "Hard",
    tagline: "Long-range precision killer",
    description:
      "The Sniper is an Australian marksman who excels at long-range combat with his rifle, picking off key targets like Medics and Heavies.",
    weapons: ["Sniper Rifle", "SMG", "Kukri"],
    tips: 15,
  },
  {
    id: "spy",
    name: "Spy",
    role: "Support",
    hp: 125,
    speed: "300%",
    color: "#2980b9",
    difficulty: "Very Hard",
    tagline: "Deception & backstab assassin",
    description:
      "The Spy is a suave French secret agent who can disguise as enemy team members, cloak, and instantly kill enemies with a well-placed backstab.",
    weapons: ["Revolver", "Sapper", "Knife"],
    tips: 22,
  },
];

const ROLE_COLORS: Record<string, string> = {
  Offense: "#e8520a",
  Defense: "#4a90d9",
  Support: "#2ecc71",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  "Easy": "#2ecc71",
  "Medium": "#f39c12",
  "Hard": "#e74c3c",
  "Very Hard": "#8e44ad",
};

const WEAPON_NAME_TO_ID: Record<string, string> = {
  Bat: "bat",
  Bonesaw: "bonesaw",
  Bottle: "bottle",
  "Fire Axe": "fire-axe",
  Fists: "fists",
  Flamethrower: "flame-thrower",
  "Grenade Launcher": "grenade-launcher",
  Knife: "knife",
  Kukri: "kukri",
  "Medi Gun": "medi-gun",
  Minigun: "minigun",
  Pistol: "pistol",
  Revolver: "revolver",
  "Rocket Launcher": "rocket-launcher",
  Sapper: "sapper",
  Scattergun: "scattergun",
  Shotgun: "shotgun",
  Shovel: "shovel",
  SMG: "smg",
  "Sniper Rifle": "sniper-rifle",
  "Sticky Launcher": "stickybomb-launcher",
  "Syringe Gun": "syringe-gun",
  Wrench: "wrench",
};

const getClassWeaponImage = (name: string) => getWeaponImageUrl({ id: WEAPON_NAME_TO_ID[name] ?? name.toLowerCase().replace(/\s+/g, "-") });

// Component

export default function ClassesPage() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<string>("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const roles = ["All", "Offense", "Defense", "Support"];
  const filtered =
    activeRole === "All"
      ? TF2_CLASSES
      : TF2_CLASSES.filter((c) => c.role === activeRole);

  return (
    <div style={styles.page}>
      <Header />
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.badge}>ALL 9 CLASSES</div>
          <h1 style={styles.pageTitle}>CHOOSE YOUR CLASS</h1>
          <p style={styles.subtitle}>
            Select a mercenary to view detailed guides, tips, and loadout recommendations
          </p>

          {/* Role filter */}
          <div style={styles.filterRow}>
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                style={{
                  ...styles.filterBtn,
                  ...(activeRole === role ? styles.filterBtnActive : {}),
                  ...(activeRole === role && role !== "All"
                    ? { borderColor: ROLE_COLORS[role], color: ROLE_COLORS[role] }
                    : {}),
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main style={styles.grid}>
        {filtered.map((cls) => {
          const isHov = hovered === cls.id;
          return (
            <div
              key={cls.id}
              style={{
                ...styles.card,
                ...(isHov
                  ? {
                      transform: "translateY(-4px)",
                      boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px ${cls.color}60`,
                      borderColor: cls.color + "80",
                    }
                  : {}),
              }}
              onMouseEnter={() => setHovered(cls.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(`/class/${cls.id}`)}
            >
              {/* Card top accent */}
              <div style={{ ...styles.cardAccent, background: cls.color }} />

              {/* Class icon area */}
              <div style={{ ...styles.classIcon, background: cls.color + "20" }}>
                <img
                  src={WIKI_CLASS_ICONS[cls.id]}
                  alt={`${cls.name} icon`}
                  style={styles.classIconImage}
                />
              </div>

              {/* Info */}
              <div style={styles.cardBody}>
                <div style={styles.cardTop}>
                  <h2 style={{ ...styles.className, color: isHov ? cls.color : "#fff" }}>
                    {cls.name}
                  </h2>
                  <span
                    style={{
                      ...styles.roleBadge,
                      background: ROLE_COLORS[cls.role] + "25",
                      color: ROLE_COLORS[cls.role],
                      border: `1px solid ${ROLE_COLORS[cls.role]}60`,
                    }}
                  >
                    {cls.role}
                  </span>
                </div>

                <p style={styles.tagline}>{cls.tagline}</p>
                <p style={styles.description}>{cls.description}</p>

                {/* Stats row */}
                <div style={styles.statsRow}>
                  <div style={styles.stat}>
                    <span style={styles.statLabel}>HP</span>
                    <span style={{ ...styles.statValue, color: cls.color }}>{cls.hp}</span>
                  </div>
                  <div style={styles.statDivider} />
                  <div style={styles.stat}>
                    <span style={styles.statLabel}>DIFFICULTY</span>
                    <span
                      style={{
                        ...styles.statValue,
                        color: DIFFICULTY_COLORS[cls.difficulty],
                        fontSize: 12,
                      }}
                    >
                      {cls.difficulty}
                    </span>
                  </div>
                  <div style={styles.statDivider} />
                  <div style={styles.stat}>
                    <span style={styles.statLabel}>GUIDES</span>
                    <span style={{ ...styles.statValue, color: cls.color }}>{cls.tips}</span>
                  </div>
                </div>

                {/* Weapons */}
                <div style={styles.weaponsList}>
                  {cls.weapons.map((w) => (
                    <span key={w} style={styles.weaponTag} title={w}>
                      <span style={styles.weaponImageBox}>
                        <img src={getClassWeaponImage(w)} alt={w} style={styles.weaponImage} loading="lazy" />
                      </span>
                      <span style={styles.weaponName}>{w}</span>
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  style={{
                    ...styles.ctaBtn,
                    background: isHov ? cls.color : "transparent",
                    borderColor: cls.color,
                    color: isHov ? "#1a1209" : cls.color,
                  }}
                >
                  VIEW GUIDES
                </button>
              </div>
            </div>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}

// Styles

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#1a1209",
    backgroundImage:
      "radial-gradient(ellipse at 20% 0%, rgba(232,82,10,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(74,144,217,0.06) 0%, transparent 60%)",
    color: "#f0e8d8",
    fontFamily: "'Georgia', serif",
  },
  header: {
    background: "linear-gradient(180deg, rgba(26,18,9,0) 0%, #1a1209 100%), #231a0e",
    borderBottom: "2px solid #3d2c1a",
    padding: "60px 24px 40px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  headerInner: {
    maxWidth: 800,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
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
    fontSize: "clamp(36px, 6vw, 72px)",
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 12px",
    letterSpacing: "0.04em",
    textShadow: "0 2px 20px rgba(232,82,10,0.3)",
  },
  subtitle: {
    fontSize: 16,
    color: "#a08060",
    margin: "0 0 28px",
    fontStyle: "italic",
    fontFamily: "sans-serif",
  },
  filterRow: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  filterBtn: {
    background: "transparent",
    border: "1px solid #4d3820",
    color: "#9a7850",
    padding: "7px 20px",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.1em",
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
  grid: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "40px 24px 80px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#231a0e",
    border: "1px solid #3d2c1a",
    borderRadius: 4,
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
    display: "flex",
    flexDirection: "column",
  },
  cardAccent: {
    height: 3,
    flexShrink: 0,
  },
  classIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    flexShrink: 0,
  },
  classIconImage: {
    width: 72,
    height: 72,
    objectFit: "cover",
    borderRadius: "50%",
    border: "2px solid #3d2c1a",
    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
  },
  cardBody: {
    padding: "16px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  className: {
    fontFamily: "'Impact', sans-serif",
    fontSize: 26,
    letterSpacing: "0.06em",
    margin: 0,
    transition: "color 0.2s",
  },
  roleBadge: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.1em",
    padding: "3px 8px",
    borderRadius: 2,
    fontFamily: "sans-serif",
    flexShrink: 0,
  },
  tagline: {
    fontSize: 12,
    color: "#8a6840",
    fontStyle: "italic",
    margin: 0,
    fontFamily: "sans-serif",
  },
  description: {
    fontSize: 13,
    color: "#c0a880",
    lineHeight: 1.6,
    margin: 0,
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    background: "#1a1209",
    border: "1px solid #3d2c1a",
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 4,
  },
  stat: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 4px",
    gap: 2,
  },
  statLabel: {
    fontSize: 9,
    color: "#6a5030",
    letterSpacing: "0.1em",
    fontFamily: "sans-serif",
    fontWeight: 700,
  },
  statValue: {
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "sans-serif",
  },
  statDivider: {
    width: 1,
    height: 30,
    background: "#3d2c1a",
    flexShrink: 0,
  },
  weaponsList: {
    display: "flex",
    gap: 8,
    flexWrap: "nowrap",
    marginTop: 2,
  },
  weaponTag: {
    minWidth: 0,
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 10,
    color: "#8a7060",
    background: "#2d2010",
    border: "1px solid #4d3820",
    padding: "4px 6px",
    borderRadius: 2,
    fontFamily: "sans-serif",
  },
  weaponImageBox: {
    width: 28,
    height: 22,
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    background: "#f3ead8",
    borderRadius: 2,
    overflow: "hidden",
  },
  weaponImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },
  weaponName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ctaBtn: {
    width: "100%",
    padding: "10px",
    border: "1px solid",
    borderRadius: 2,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.12em",
    cursor: "pointer",
    fontFamily: "sans-serif",
    transition: "background 0.15s, color 0.15s",
    marginTop: 6,
  },
};
