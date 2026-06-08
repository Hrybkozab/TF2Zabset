import heroBackground from "@/assets/hero-mercs.png";
import scoutBg from "@/assets/class-bg-scout.jpg";
import soldierBg from "@/assets/class-bg-soldier.jpg";
import pyroBg from "@/assets/class-bg-pyro.jpg";
import demomanBg from "@/assets/class-bg-demoman.jpg";
import heavyBg from "@/assets/class-bg-heavy.jpg";
import engineerBg from "@/assets/class-bg-engineer.jpg";
import medicBg from "@/assets/class-bg-medic.jpg";
import sniperBg from "@/assets/class-bg-sniper.jpg";
import spyBg from "@/assets/class-bg-spy.jpg";
import { CLASS_IMAGES } from "@/lib/classImages";

export interface ClassPageMedia {
  avatar: string;
  background: string;
}

const defaultMedia = (classId: string): ClassPageMedia => ({
  avatar: CLASS_IMAGES[classId] ?? "",
  background: heroBackground,
});

// Edit this object when you want custom class page visuals.
// You can use imported assets or public paths like "/class-pages/scout-avatar.png".
export const CLASS_PAGE_MEDIA: Record<string, ClassPageMedia> = {
  scout: { ...defaultMedia("scout"), background: scoutBg },
  soldier: { ...defaultMedia("soldier"), background: soldierBg },
  pyro: { ...defaultMedia("pyro"), background: pyroBg },
  demoman: { ...defaultMedia("demoman"), background: demomanBg },
  heavy: { ...defaultMedia("heavy"), background: heavyBg },
  engineer: { ...defaultMedia("engineer"), background: engineerBg },
  medic: { ...defaultMedia("medic"), background: medicBg },
  sniper: { ...defaultMedia("sniper"), background: sniperBg },
  spy: { ...defaultMedia("spy"), background: spyBg },
};

export const getClassPageMedia = (classId: string): ClassPageMedia => {
  return CLASS_PAGE_MEDIA[classId] ?? defaultMedia(classId);
};
