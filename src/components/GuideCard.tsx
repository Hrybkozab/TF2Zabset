import type { Guide } from "@/data/classes";
import { TF_CLASSES } from "@/data/classes";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CLASS_IMAGES } from "@/lib/classImages";

const levelStyles: Record<Guide["level"], string> = {
  beginner: "bg-skill-beginner text-primary-foreground",
  intermediate: "bg-skill-intermediate text-foreground",
  advanced: "bg-skill-advanced text-primary-foreground",
};

export const GuideCard = ({ guide, index }: { guide: Guide; index: number }) => {
  const cls = TF_CLASSES.find((c) => c.id === guide.classId);
  const classImage = cls ? CLASS_IMAGES[cls.id] : undefined;
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="tf-paper border-2 border-border shadow-card hover:shadow-glow transition-shadow group cursor-pointer"
    >
      <Link to={`/guides/${guide.id.replace(/^g/, "")}`} className="block p-5 text-inherit no-underline">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`tf-stamp text-[10px] px-2 py-0.5 ${levelStyles[guide.level]}`}>
            {guide.level}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5">
            {guide.category}
          </span>
          {cls && classImage && (
            <img
              src={classImage}
              alt={`${cls.name} icon`}
              title={cls.name}
              className="ml-auto h-9 w-9 rounded-full object-cover border border-border"
            />
          )}
        </div>
        <h3 className="font-display text-2xl text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
          {guide.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{guide.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-dashed border-border pt-3">
          <span className="font-bold uppercase tracking-wider">@{guide.author}</span>
          <span>{guide.reads.toLocaleString()} reads</span>
        </div>
      </Link>
    </motion.article>
  );
};
