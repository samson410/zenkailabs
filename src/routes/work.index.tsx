import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories, sortedProjects, type ProjectCategory } from "@/data/projects";
import { LineHeading } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ease } from "@/lib/motion";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Zenkai Labs" },
      { name: "description", content: "Product films, commercials, UGC and social creatives by Zenkai Labs." },
      { property: "og:title", content: "Work — Zenkai Labs" },
      { property: "og:description", content: "Product films, commercials, UGC and social creatives by Zenkai Labs." },
    ],
  }),
  component: WorkPage,
});

type Filter = "All" | ProjectCategory;

function WorkPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...categories];
  const list = filter === "All" ? sortedProjects : sortedProjects.filter((p) => p.category === filter);

  return (
    <section className="container-studio pt-28 md:pt-40">
      <p className="text-label text-muted-foreground">Index — {String(sortedProjects.length).padStart(2, "0")} projects</p>
      <LineHeading lines={["All the", "work."]} className="mt-6 text-display" />

      <div
        role="group"
        aria-label="Filter by category"
        className="-mx-5 mt-14 flex gap-1 overflow-x-auto border-y border-border px-5 py-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
      >
        {filters.map((f) => {
          const count = f === "All" ? sortedProjects.length : sortedProjects.filter((p) => p.category === f).length;
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 px-3 text-sm transition-colors ${
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
              <span className="text-label opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
        >
          {list.length === 0 ? (
            <div className="placeholder-grain mt-14 flex min-h-[40svh] flex-col justify-end p-6">
              <p className="text-label text-muted-foreground">Nothing here yet</p>
              <p className="mt-3 text-title">New {filter.toLowerCase()} work is on the way.</p>
            </div>
          ) : (
            <div className="mt-14 grid gap-16 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-24">
              {list.map((p, i) => (
                <div key={p.id} className={i % 3 === 1 ? "lg:mt-24" : ""}>
                  <ProjectCard project={p} index={i} />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
