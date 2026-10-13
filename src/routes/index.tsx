import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { categories, featuredProjects } from "@/data/projects";
import { fadeUp, maskReveal, stagger } from "@/lib/motion";
import { LineHeading, Reveal } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProjectImage } from "@/components/site/ProjectImage";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zenkai Labs — AI product visuals, films & campaigns" },
      { name: "description", content: site.hero.supporting },
      { property: "og:title", content: "Zenkai Labs — Made to make you look twice." },
      { property: "og:description", content: site.hero.supporting },
    ],
  }),
  component: Home,
});

function Home() {
  const reduce = useReducedMotion();
  const [lead, ...rest] = featuredProjects;
  const mid = rest.slice(0, 2);
  const row = rest.slice(2);
  const { hero } = site;

  return (
    <>
      {/* Hero */}
      <section className="container-studio grid gap-10 pt-28 md:grid-cols-12 md:gap-6 md:pt-36">
        <div className="md:col-span-7 md:flex md:flex-col md:justify-end">
          <motion.p className="text-label text-muted-foreground" initial={reduce ? false : "hidden"} animate="show" variants={fadeUp}>
            {hero.eyebrow}
          </motion.p>
          <LineHeading lines={hero.headline} className="mt-6 text-display" delay={0.1} />
          <motion.div initial={reduce ? false : "hidden"} animate="show" variants={stagger(0.08, 0.55)}>
            <motion.p variants={fadeUp} className="mt-8 max-w-md text-lede text-muted-foreground">
              {hero.supporting}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/work"
                className="group inline-flex min-h-12 items-center justify-between gap-6 bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {hero.primaryCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
              <Link to="/contact" className="inline-flex min-h-12 items-center border border-border px-6 text-sm transition-colors hover:bg-secondary">
                {hero.secondaryCta}
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="relative aspect-[4/5] overflow-hidden bg-secondary md:col-span-5 md:aspect-[4/5.4]"
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={maskReveal}
          transition={{ delay: 0.25 }}
        >
          {hero.previewVideo ? (
            <video src={hero.previewVideo} poster={hero.image} muted loop autoPlay playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <ProjectImage src={hero.image} alt={hero.imageAlt} label={site.brandName} eager />
          )}
          <span className="text-label absolute bottom-3 left-3 bg-background/80 px-2 py-1.5 text-muted-foreground">
            Studio still — 2025
          </span>
        </motion.div>
      </section>

      {/* Category ticker */}
      <section className="mt-20 overflow-hidden border-y border-border py-5 md:mt-28" aria-label="Disciplines">
        <div className="container-studio flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          {categories.map((c, i) => (
            <span key={c}>
              <span className="text-label mr-2">0{i + 1}</span>
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="container-studio mt-24 md:mt-36">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-label text-muted-foreground">Selected work — {String(featuredProjects.length).padStart(2, "0")}</p>
            <LineHeading as="h2" inView lines={["Recent", "frames."]} className="mt-4 text-headline" />
          </div>
          <Link to="/work" className="link-underline hidden text-sm md:inline">
            All projects
          </Link>
        </div>

        <div className="mt-14 grid gap-16 md:grid-cols-12 md:gap-x-6 md:gap-y-24">
          {lead && (
            <div className="md:col-span-7">
              <ProjectCard project={lead} index={0} size="lg" frameClass="aspect-[4/5] md:aspect-[5/6]" />
            </div>
          )}
          <div className="flex flex-col gap-16 md:col-span-4 md:col-start-9 md:pt-40">
            {mid.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 1} frameClass="aspect-[4/5]" />
            ))}
          </div>
          {row.map((p, i) => (
            <div key={p.id} className={i === 0 ? "md:col-span-5 md:col-start-2" : "md:col-span-4 md:col-start-8 md:mt-32"}>
              <ProjectCard project={p} index={i + 3} />
            </div>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="container-studio mt-32 grid gap-8 md:mt-48 md:grid-cols-12">
        <p className="text-label text-muted-foreground md:col-span-3">Approach</p>
        <Reveal className="md:col-span-8">
          <p className="text-title text-balance">
            We treat every product like a lead actor — lighting, framing and pacing decided before a single frame is generated.
            The tools are new. The standards aren't.
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
