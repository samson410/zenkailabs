import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { aspectClass } from "@/data/projects";
import { maskReveal, viewportOnce } from "@/lib/motion";
import { ProjectImage } from "./ProjectImage";

export function ProjectCard({
  project,
  index,
  frameClass,
  size = "md",
}: {
  project: Project;
  index?: number;
  /** Override the media aspect class for art-directed crops. */
  frameClass?: string;
  size?: "lg" | "md";
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);
  const canPreview = !!project.previewVideoUrl;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovering) v.play().catch(() => {});
    else v.pause();
  }, [hovering]);

  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="group block"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <motion.div
        className={`relative overflow-hidden bg-secondary ${frameClass ?? aspectClass[project.aspectRatio]}`}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={viewportOnce}
        variants={maskReveal}
      >
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          <ProjectImage src={project.thumbnail} alt={project.altText} label={`${project.brand} — ${project.title}`} />
          {canPreview && hovering && (
            <video
              ref={videoRef}
              src={project.previewVideoUrl}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
        <div className="absolute inset-x-0 top-0 flex justify-between p-3 md:p-4">
          {project.conceptProject ? (
            <span className="text-label bg-background/80 px-2 py-1.5 text-muted-foreground">Concept project</span>
          ) : (
            <span />
          )}
          <span className="text-label bg-background/80 px-2 py-1.5 text-muted-foreground">{project.aspectRatio}</span>
        </div>
      </motion.div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-label text-muted-foreground">
            {index !== undefined && <span className="mr-3">{String(index + 1).padStart(2, "0")}</span>}
            {project.brand}
          </p>
          <h3 className={`mt-2 ${size === "lg" ? "text-title" : "text-xl font-medium tracking-[-0.02em]"}`}>{project.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{project.category}</p>
        </div>
        <ArrowUpRight
          className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          strokeWidth={1.5}
          aria-hidden
        />
      </div>
    </Link>
  );
}
