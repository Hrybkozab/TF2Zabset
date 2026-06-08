import { Link, Navigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import GuideBlockList from "@/components/GuideBlock";
import { LoadoutBuilder } from "@/components/LoadoutBuilder";
import { MapPositionPlanner } from "@/components/MapPositionPlanner";
import { MatchupsOverview } from "@/components/MatchupsOverview";
import { BasicsOverview } from "@/components/BasicsOverview";
import { CombatOverview } from "@/components/CombatOverview";
import { MovementOverview } from "@/components/MovementOverview";
import { TF_CLASSES } from "@/data/classes";
import { SECTION_ORDER, getClassSectionBlocks, type SectionKey } from "@/data/classSections";

const ClassSectionPage = () => {
  const { id, section } = useParams();
  const cls = TF_CLASSES.find((c) => c.id === id);
  const sectionInfo = SECTION_ORDER.find((s) => s.key === section);

  if (!cls || !sectionInfo) return <Navigate to="/" replace />;

  const isLoadouts = sectionInfo.key === "loadouts";
  const isBasics = sectionInfo.key === "basics";
  const isMovement = sectionInfo.key === "movement";
  const isCombat = sectionInfo.key === "combat";
  const isPositioning = sectionInfo.key === "positioning";
  const isMatchups = sectionInfo.key === "matchups";
  const blocks = getClassSectionBlocks(cls.id, section as SectionKey);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-10 sm:py-14 flex-1">
        <Link to={`/class/${cls.id}`} className="text-xs uppercase tracking-widest text-primary hover:underline">
          Back to {cls.name}
        </Link>

        {isLoadouts ? (
          <div className="mt-5">
            <LoadoutBuilder classId={cls.id} className={cls.name} />
          </div>
        ) : isBasics ? (
          <div className="mt-5">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{cls.name}</div>
            <h1 className="font-display text-4xl sm:text-5xl tf-headline mb-4">{sectionInfo.label}</h1>
            <BasicsOverview cls={cls} />
          </div>
        ) : isMovement ? (
          <div className="mt-5">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{cls.name}</div>
            <h1 className="font-display text-4xl sm:text-5xl tf-headline mb-4">{sectionInfo.label}</h1>
            <MovementOverview classId={cls.id} className={cls.name} />
          </div>
        ) : isCombat ? (
          <div className="mt-5">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{cls.name}</div>
            <h1 className="font-display text-4xl sm:text-5xl tf-headline mb-4">{sectionInfo.label}</h1>
            <CombatOverview classId={cls.id} className={cls.name} />
          </div>
        ) : isPositioning ? (
          <div className="mt-5">
            <MapPositionPlanner classId={cls.id} className={cls.name} />
          </div>
        ) : isMatchups ? (
          <div className="mt-5">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{cls.name}</div>
            <h1 className="font-display text-4xl sm:text-5xl tf-headline mb-4">{sectionInfo.label}</h1>
            <MatchupsOverview classId={cls.id} className={cls.name} />
          </div>
        ) : (
          <div className="mt-5">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{cls.name}</div>
            <h1 className="font-display text-4xl sm:text-5xl tf-headline mb-4">{sectionInfo.label}</h1>
            <GuideBlockList initialBlocks={blocks} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ClassSectionPage;
