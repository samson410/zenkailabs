import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { aspectClass, getThumbnail } from "@/data/projects";
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

  const videoSrc = project.previewVideoUrl || project.videoUrl;
  const canPreview = !!videoSrc;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !canPreview) return;

    if (hovering) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovering, canPreview]);

  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="group block"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
           <motion.div
        className={`relative overflow-hidden bg-secondary max-h-[75svh] ${frameClass ?? aspectClass[project.aspectRatio]}`}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={viewportOnce}
        variants={maskReveal}
      >

        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          <ProjectImage src={getThumbnail(project)} alt={project.altText} label={`${project.brand} — ${project.title}`} />
          {canPreview && (
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              loop
              playsInline
              preload="none"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                hovering ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        {/* Centered Play Overlay Indicator */}
        {canPreview && (
          <div
            className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              hovering ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex size-12 items-center justify-center rounded-full border border-white/25 bg-background/75 text-foreground backdrop-blur-md shadow-sm">
              <Play className="ml-0.5 size-5 fill-current" aria-hidden />
            </div>
          </div>
        )}

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
