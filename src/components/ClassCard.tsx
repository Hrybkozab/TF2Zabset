import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { TFClass } from "@/data/classes";
import { WIKI_CLASS_ICONS } from "@/lib/wikiClassIcons";

interface Props {
  cls: TFClass;
  index: number;
}

const roleStripeClasses: Record<TFClass["role"], string> = {
  Offense: "bg-red-team",
  Defense: "bg-blu-team",
  Support: "bg-skill-beginner",
};

const difficultyDots = (n: number) =>
  Array.from({ length: 5 }).map((_, i) => (
    <span
      key={i}
      className={`h-2 w-2 rounded-full ${i < n ? "bg-destructive" : "bg-muted"}`}
    />
  ));

export const ClassCard = ({ cls, index }: Props) => {
  const classImage = WIKI_CLASS_ICONS[cls.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/class/${cls.id}`}
        className="group block tf-paper border-2 border-border shadow-card relative overflow-hidden h-full"
      >
        {/* Role color stripe */}
        <div className={`h-1.5 w-full ${roleStripeClasses[cls.role]}`} />

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl text-foreground leading-none">
                {cls.name}
              </h3>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                {cls.role}
              </p>
            </div>
            {classImage && (
              <img
                src={classImage}
                alt={`${cls.name} icon`}
                className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-full border border-border select-none transition-transform group-hover:rotate-12 group-hover:scale-110"
              />
            )}
          </div>

          <p className="font-slab italic text-sm text-secondary mb-4 line-clamp-2">
            "{cls.tagline}"
          </p>

          <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
            {cls.description}
          </p>

          <div className="flex items-center justify-between text-xs uppercase tracking-wider border-t-2 border-dashed border-border pt-3">
            <div>
              <div className="text-muted-foreground">HP</div>
              <div className="font-display text-lg text-destructive leading-none">{cls.hp}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Speed</div>
              <div className="font-display text-lg text-foreground leading-none">{cls.speed}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Diff</div>
              <div className="flex gap-1">{difficultyDots(cls.difficulty)}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
