import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClassCard } from "@/components/ClassCard";
import { GuideCard } from "@/components/GuideCard";
import { TF_CLASSES, RECENT_GUIDES, getRandomTip } from "@/data/classes";
import heroImg from "@/assets/hero-mercs.png";
import { Lightbulb } from "lucide-react";

const ROLE_SECTIONS = [
  { role: "Offense", title: "OFFENSE", subtitle: "Classes for aggression and opening fights" },
  { role: "Defense", title: "DEFENSE", subtitle: "Classes for control and area denial" },
  { role: "Support", title: "SUPPORT", subtitle: "Classes for utility and team support" },
] as const;

const Index = () => {
  const location = useLocation();
  const [tip, setTip] = useState(() => getRandomTip());

  useEffect(() => {
    setTip(getRandomTip());
  }, [location.key]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/60 via-surface-dark/40 to-surface-dark" aria-hidden />
        <div className="absolute inset-0 bg-gradient-team opacity-20" aria-hidden />

        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block tf-stamp bg-primary text-primary-foreground px-4 py-1 mb-6 text-xs sm:text-sm"
          >
            Mann Co. Approved Combat Manual
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl md:text-8xl tracking-wider mb-4 tf-headline"
          >
            TF2 GUIDES
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-slab italic text-lg sm:text-2xl text-primary mb-8"
          >
            Tips, rollouts, and Steam analytics for all 9 classes
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#classes"
              className="tf-stamp bg-primary text-primary-foreground px-6 py-3 text-sm sm:text-base"
            >
              Choose a Class
            </a>
            <Link
              to="/profile"
              className="tf-stamp bg-card text-foreground px-6 py-3 text-sm sm:text-base"
            >
              Analyze Steam Profile
            </Link>
          </motion.div>

          {/* stats */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { v: "9", l: "Classes" },
              { v: "120+", l: "Guides" },
              { v: "999+", l: "Rollouts" },
            ].map((s) => (
              <div key={s.l} className="border-y-2 border-primary py-3">
                <div className="font-display text-3xl sm:text-5xl text-primary">{s.v}</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-surface-dark-foreground/70">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIP OF THE DAY */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-accent text-accent-foreground border-2 border-border shadow-stamp px-5 py-4 max-w-3xl mx-auto flex items-start gap-4"
        >
          <Lightbulb className="mt-0.5 h-8 w-8 shrink-0" />
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1">Tip of the day</div>
            <p className="font-slab text-sm sm:text-base">{tip}</p>
          </div>
        </motion.div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="container mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl sm:text-6xl tf-headline">9 CLASSES - 9 PLAYSTYLES</h2>
          <p className="font-slab italic text-muted-foreground mt-2">
            Pick a class to open guides
          </p>
        </div>

        <div className="space-y-10">
          {ROLE_SECTIONS.map((section, sectionIndex) => {
            const classesByRole = TF_CLASSES.filter((c) => c.role === section.role);

            return (
              <div key={section.role}>
                <div className="mb-5 text-center">
                  <h3 className="font-display text-3xl sm:text-4xl tf-headline">{section.title}</h3>
                  <p className="font-slab italic text-sm text-muted-foreground mt-1">{section.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {classesByRole.map((c, i) => (
                    <ClassCard key={c.id} cls={c} index={sectionIndex * 3 + i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RECENT GUIDES */}
      <section className="bg-surface-dark text-surface-dark-foreground py-16 sm:py-20 border-y-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary mb-1">Fresh Content</div>
              <h2 className="font-display text-4xl sm:text-5xl">Latest Guides</h2>
            </div>
            <Link
              to="/guides"
              className="tf-stamp bg-primary text-primary-foreground px-5 py-2 text-sm"
            >
              All Guides
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RECENT_GUIDES.map((g, i) => (
              <GuideCard key={g.id} guide={g} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* STEAM CTA */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="tf-paper border-2 border-border shadow-card p-8 sm:p-12 text-center max-w-3xl mx-auto relative">
          <div className="inline-block tf-stamp bg-destructive text-destructive-foreground px-3 py-1 text-xs mb-4">
            Steam Setup
          </div>
          <h2 className="font-display text-3xl sm:text-5xl mb-3">Analyze Your Steam Profile</h2>
          <p className="font-slab text-muted-foreground mb-6 max-w-xl mx-auto">
            Enter your Steam ID and we will show your main class, K/D, playtime, and favorite weapons,
            then recommend guides for your weak spots.
          </p>
          <Link
            to="/profile"
            className="tf-stamp inline-block bg-primary text-primary-foreground px-6 py-3"
          >
            Analyze Profile
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
