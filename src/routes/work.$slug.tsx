import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentProjects, getProjectBySlug, getRelatedProjects } from "@/data/projects";
import { LineHeading, Reveal } from "@/components/site/Reveal";
import { ProjectVideoPlayer } from "@/components/site/ProjectVideoPlayer";
import { ProjectCard } from "@/components/site/ProjectCard";
import { NotFoundView } from "./__root";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project not found — Zenkai Labs" }, { name: "robots", content: "noindex" }] };
    const { project: p } = loaderData;
    const t = `${p.brand} — ${p.title} | Zenkai Labs`;
    return {
      meta: [
        { title: t },
        { name: "description", content: p.description },
        { property: "og:title", content: t },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => <NotFoundView title="No project by that name." />,
  component: ProjectPage,
});

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-border py-10 md:grid-cols-12 md:gap-6">
      <h2 className="text-label text-muted-foreground md:col-span-4">{label}</h2>
      <div className="text-lede md:col-span-8">{children}</div>
    </Reveal>
  );
}

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const { prev, next } = getAdjacentProjects(p.slug);
  const related = getRelatedProjects(p.slug);
  const sections = [
    ["Creative brief", p.creativeBrief],
    ["Visual direction", p.visualDirection],
    ["Creative approach", p.creativeApproach],
    ["Process notes", p.processNotes],
  ].filter(([, v]) => !!v) as [string, string][];

  return (
    <article className="container-studio pt-24 md:pt-32">
      <Link to="/work" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" strokeWidth={1.5} /> All work
      </Link>

      <header className="mt-8 grid gap-8 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-8">
          <p className="text-label flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground">
            <span>{p.brand}</span>
            <span>{p.category}</span>
            {p.year && <span>{p.year}</span>}
            {p.conceptProject && <span className="text-foreground">Concept project</span>}
          </p>
          <LineHeading key={p.slug} lines={[p.title]} className="mt-6 text-display" />
        </div>
        <div className="md:col-span-4 md:self-end">
          <p className="text-lede text-muted-foreground">{p.description}</p>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {p.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </header>

      <div className={`mx-auto mt-14 md:mt-20 ${p.aspectRatio === "9:16" ? "max-w-md" : p.aspectRatio === "16:9" ? "" : "max-w-2xl"}`}>
        <ProjectVideoPlayer key={p.slug} project={p} />
      </div>

      {(sections.length > 0 || p.deliverables?.length) && (
        <div className="mt-20 md:mt-32">
          {sections.map(([label, text]) => (
            <Section key={label} label={label}>
              <p>{text}</p>
            </Section>
          ))}
          {p.deliverables && p.deliverables.length > 0 && (
            <Section label="Deliverables">
              <ul className="space-y-2">
                {p.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      )}

      <nav aria-label="Project navigation" className="mt-20 grid grid-cols-2 border-y border-border">
        <div className="border-r border-border">
          {prev ? (
            <Link to="/work/$slug" params={{ slug: prev.slug }} className="group flex min-h-28 flex-col justify-between gap-4 py-6 pr-4">
              <span className="text-label flex items-center gap-2 text-muted-foreground">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" /> Previous
              </span>
              <span className="text-lg font-medium tracking-[-0.02em] md:text-2xl">{prev.title}</span>
            </Link>
          ) : (
            <span className="text-label flex min-h-28 items-end py-6 text-muted-foreground">First project</span>
          )}
        </div>
        <div>
          {next ? (
            <Link to="/work/$slug" params={{ slug: next.slug }} className="group flex min-h-28 flex-col items-end justify-between gap-4 py-6 pl-4 text-right">
              <span className="text-label flex items-center gap-2 text-muted-foreground">
                Next <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-lg font-medium tracking-[-0.02em] md:text-2xl">{next.title}</span>
            </Link>
          ) : (
            <span className="text-label flex min-h-28 items-end justify-end py-6 text-muted-foreground">Last project</span>
          )}
        </div>
      </nav>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-label text-muted-foreground">Related work</h2>
          <div className="mt-8 grid gap-14 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6">
            {related.map((r) => (
              <ProjectCard key={r.id} project={r} frameClass="aspect-[4/5]" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
