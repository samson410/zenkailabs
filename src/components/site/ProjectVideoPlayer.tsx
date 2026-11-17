import type { Project } from "@/data/projects";
import { aspectClass, getVideo, getThumbnail } from "@/data/projects";
import { ProjectImage } from "./ProjectImage";

/**
 * Plays a project's main media.
 * - cloudflare-stream: pass the Stream iframe playback URL
 *   (https://customer-<code>.cloudflarestream.com/<VIDEO_ID>/iframe). No tokens in frontend.
 * - mp4: native <video> with controls, playsInline, metadata preload.
 * - none: thumbnail with a "Project video placeholder" note, or a designed placeholder.
 */
export function ProjectVideoPlayer({ project }: { project: Project }) {
  const frame = `relative w-full overflow-hidden bg-secondary ${aspectClass[project.aspectRatio]}`;
  const src = getVideo(project);
  const thumb = getThumbnail(project);

  if (src?.type === "cloudflare-stream" && src.playbackUrl) {
    const url = new URL(src.playbackUrl);
    if (project.thumbnail && !url.searchParams.has("poster")) {
      url.searchParams.set("poster", new URL(project.thumbnail, typeof window !== "undefined" ? window.location.origin : "https://example.com").href);
    }
    return (
      <div className={frame}>
        <iframe
          src={url.toString()}
          title={`${project.brand} — ${project.title}`}
          loading="lazy"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  if (src?.type === "mp4" && src.url) {
    return (
      <div className={frame}>
        <video
          src={src.url}
          poster={thumb || undefined}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full bg-background object-contain"
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      <ProjectImage src={thumb} alt={project.altText} label={`${project.brand} — ${project.title}`} eager />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/85 px-4 py-3">
        <span className="text-label">Project video placeholder</span>
        <span className="text-label text-muted-foreground">{project.aspectRatio}</span>
      </div>
    </div>
  );
}
