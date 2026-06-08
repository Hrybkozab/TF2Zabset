import { useParams, Link, Navigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TF_CLASSES, type SkillLevel } from "@/data/classes";
import { ALL_GUIDE_DETAILS } from "@/data/guideDetails";
import { useEffect } from "react";
import { getClassPageMedia } from "@/lib/classPageMedia";
import { SECTION_ORDER, getClassSectionTileImage, getClassSkillTree } from "@/data/classSections";

const skillBg: Record<SkillLevel, string> = {
  beginner: "bg-skill-beginner",
  intermediate: "bg-skill-intermediate",
  advanced: "bg-skill-advanced",
};

const skillLabel: Record<SkillLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const roleTheme: Record<"Offense" | "Defense" | "Support", { bg: string; text: string }> = {
  Offense: { bg: "bg-red-team", text: "text-red-team" },
  Defense: { bg: "bg-blu-team", text: "text-blu-team" },
  Support: { bg: "bg-skill-beginner", text: "text-skill-beginner" },
};

const ClassPage = () => {
  const { id } = useParams();
  const cls = TF_CLASSES.find((c) => c.id === id);

  useEffect(() => {
    if (cls) document.title = `${cls.name} Guide - TF2 Guides ZabsEt`;
  }, [cls]);

  if (!cls) return <Navigate to="/" replace />;

  const guides = ALL_GUIDE_DETAILS.filter((guide) => guide.classId === cls.id).slice(0, 6);
  const classMedia = getClassPageMedia(cls.id);
  const roleColors = roleTheme[cls.role];
  const skillTree = getClassSkillTree(cls.id);
  const heroBackgroundStyle = {
    backgroundImage: [
      "linear-gradient(90deg, hsl(var(--surface-dark)) 0%, hsl(var(--surface-dark) / 0.84) 7%, transparent 22%, transparent 78%, hsl(var(--surface-dark) / 0.84) 93%, hsl(var(--surface-dark)) 100%)",
      "linear-gradient(180deg, hsl(var(--surface-dark) / 0.38) 0%, hsl(var(--surface-dark) / 0.16) 42%, hsl(var(--surface-dark) / 0.72) 100%)",
      `url(${classMedia.background})`,
    ].join(", "),
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* hero */}
      <section className="relative bg-surface-dark text-surface-dark-foreground overflow-hidden">
        <div className="absolute inset-0" style={heroBackgroundStyle} aria-hidden />
        <div className={`absolute inset-0 opacity-35 mix-blend-multiply ${roleColors.bg}`} aria-hidden />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface-dark to-transparent" aria-hidden />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface-dark to-transparent" aria-hidden />
        <div className="container mx-auto px-4 py-14 sm:py-20 relative">
          <Link to="/" className="text-xs uppercase tracking-widest text-primary hover:underline">
            All Classes
          </Link>
          <div className="flex items-center gap-6 mt-4 flex-wrap">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="text-7xl sm:text-9xl"
            >
              {classMedia.avatar && (
                <img
                  src={classMedia.avatar}
                  alt={`${cls.name} avatar`}
                  className="h-28 w-28 sm:h-36 sm:w-36 object-cover rounded-full border-2 border-primary/70 bg-surface-dark shadow-card"
                />
              )}
            </motion.div>
            <div>
              <h1 className="font-display text-5xl sm:text-7xl tf-headline">{cls.name}</h1>
              <p className={`font-slab italic text-lg sm:text-xl mt-1 ${roleColors.text}`}>"{cls.tagline}"</p>
              <div className="flex gap-3 mt-3 flex-wrap">
                <span className={`tf-stamp ${roleColors.bg} text-primary-foreground px-3 py-1 text-xs`}>{cls.role}</span>
                <span className="tf-stamp bg-card text-foreground px-3 py-1 text-xs">HP {cls.hp}</span>
                <span className="tf-stamp bg-card text-foreground px-3 py-1 text-xs">Speed {cls.speed}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* sections nav */}
      <section className="bg-surface-dark/95 text-surface-dark-foreground border-b-2 border-primary sticky top-[68px] z-40">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-2 min-w-max">
            {SECTION_ORDER.map((s) => (
              <NavLink
                key={s.key}
                to={`/class/${cls.id}/section/${s.key}`}
                className="font-display tracking-wider uppercase px-4 py-2 hover:text-primary transition-colors"
              >
                {s.label}
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* skill tree */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-3xl sm:text-4xl mb-6 tf-headline">Skill Tree</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {skillTree.map((s, i) => (
            <motion.div
              key={s.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="tf-paper border-2 border-border shadow-card p-5"
            >
              <div className={`${skillBg[s.level]} text-primary-foreground tf-stamp inline-block px-3 py-1 text-xs uppercase mb-4`}>
                {s.label}
              </div>
              <ul className="space-y-2">
                {s.topics.map((t) => (
                  <li key={t} className="flex items-center gap-2 font-slab text-sm">
                    <span className="text-primary"></span>
                    <span className="capitalize">{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* sections */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTION_ORDER.map((section) => {
            const image = getClassSectionTileImage(cls.id, section.key);

            return (
              <Link
                key={section.key}
                id={section.key}
                to={`/class/${cls.id}/section/${section.key}`}
                className="group relative block overflow-hidden border-2 border-border bg-surface-dark shadow-card min-h-[132px] sm:min-h-[150px] hover:-translate-y-0.5 transition-transform"
              >
                {image ? (
                  <img
                    src={image}
                    alt={`${cls.name} ${section.label}`}
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 ${roleColors.bg} opacity-25`}
                    aria-hidden
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/20 via-surface-dark/45 to-surface-dark/75" />
                <div className="relative z-10 flex min-h-[132px] sm:min-h-[150px] flex-col items-center justify-center gap-3 p-4 text-center">
                  <span className={`${skillBg[section.level]} tf-stamp px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary-foreground shadow-card`}>
                    {skillLabel[section.level]}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wider drop-shadow-[3px_3px_0_rgba(0,0,0,0.7)]">
                    {section.label}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* class guides */}
      {guides.length > 0 && (
        <section className="container mx-auto px-4 pb-20">
          <h2 className="font-display text-3xl sm:text-4xl mb-6 tf-headline">Guides for {cls.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guides.map((g) => (
              <Link
                key={g.id}
                to={`/guides/${g.id}`}
                className="tf-paper group block border-2 border-border shadow-card p-5 text-inherit no-underline transition-transform hover:-translate-y-0.5 hover:shadow-glow"
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs uppercase tracking-widest text-primary">{g.category}</span>
                  <span className="text-[10px] uppercase tracking-widest border border-border px-2 py-0.5 text-foreground">
                    {g.difficulty}
                  </span>
                </div>
                <h3 className="font-display text-2xl mb-2 group-hover:text-primary">{g.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{g.description}</p>
                <div className="mt-4 border-t border-dashed border-border pt-3 text-xs text-muted-foreground">
                  {g.readTime} min read
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ClassPage;
