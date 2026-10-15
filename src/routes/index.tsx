import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { categories, featuredProjects } from "@/data/projects";
import { fadeUp, stagger } from "@/lib/motion";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [lead, ...rest] = featuredProjects;
  const mid = rest.slice(0, 2);
  const row = rest.slice(2);
  const { hero } = site;

  return (
    <>
      {/* Hero */}
      <section className="home-hero relative isolate flex h-screen flex-col justify-end overflow-hidden bg-background">
        <div className="absolute inset-0 -z-20">
          <ProjectImage src={hero.image} alt={hero.imageAlt} label={site.brandName} eager />
          {hero.previewVideo && (
            <video
              ref={videoRef}
              src={hero.previewVideo}
              poster={hero.image}
              muted
              loop
              autoPlay={!reduce}
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              aria-label="Zenkai Labs studio film"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="container-studio pb-12 pt-24 md:pb-20">
          <motion.p className="text-label text-muted-foreground" initial={reduce ? false : "hidden"} animate="show" variants={fadeUp}>
            {hero.eyebrow}
          </motion.p>
          <LineHeading lines={[site.brandName]} className="hero-heading mt-6" delay={0.1} />
          <p className="mt-5 text-title">{hero.headline.join(" ")}</p>
          <motion.div initial={reduce ? false : "hidden"} animate="show" variants={stagger(0.08, 0.55)}>
            <motion.p variants={fadeUp} className="mt-8 max-w-md text-lede text-muted-foreground">
              {hero.supporting}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="group h-12 justify-between gap-6 px-6">
                <Link to="/work">
                {hero.primaryCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 bg-background/20 px-6">
                <Link to="/contact">{hero.secondaryCta}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        {hero.previewVideo && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-5 top-24 bg-background/40 md:right-10"
            aria-label={playing ? "Pause background video" : "Play background video"}
            title={playing ? "Pause background video" : "Play background video"}
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              if (video.paused) void video.play().catch(() => setPlaying(false));
              else video.pause();
            }}
          >
            {playing ? <Pause /> : <Play />}
          </Button>
        )}
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
