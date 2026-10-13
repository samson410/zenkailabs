import { createFileRoute } from "@tanstack/react-router";
import { LineHeading, Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { ProjectImage } from "@/components/site/ProjectImage";

// Editable About content
const about = {
  headline: ["Creative thinking.", "New ways to", "make it real."],
  intro:
    "Zenkai Labs is an independent creative studio exploring new ways to produce compelling visual content for brands. We combine visual storytelling, art direction and AI production to make work that earns attention.",
  philosophy: [
    "Taste before tools. Every frame starts with a decision, not a prompt.",
    "Products deserve a point of view — light, mood and pacing chosen with intent.",
    "Speed is useful only when the standard holds.",
  ],
  services: [
    ["AI Product Photography", "Studio-grade stills, set in worlds that suit the product."],
    ["Product Films", "Short cinematic pieces built for launch and social."],
    ["Commercials", "Concept-led advertising spots with real pacing and tension."],
    ["UGC & Lifestyle", "Natural, lived-in content that still looks considered."],
    ["Social Creatives", "Platform-ready formats and cutdowns for every placement."],
  ],
  process: [
    ["01", "Discover", "Understand the product, audience, and creative objective."],
    ["02", "Develop", "Define the concept and visual direction."],
    ["03", "Create", "Produce and refine the selected visuals."],
    ["04", "Deliver", "Prepare the approved assets for their intended platforms."],
  ],
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Zenkai Labs" },
      { name: "description", content: about.intro },
      { property: "og:title", content: "About — Zenkai Labs" },
      { property: "og:description", content: about.intro },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="container-studio pt-28 md:pt-40">
        <p className="text-label text-muted-foreground">About the studio</p>
        <LineHeading lines={about.headline} className="mt-6 text-headline md:text-display" />
        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary md:col-span-5">
            <ProjectImage src="/images/projects/avenrox-fragrance-film.jpg" alt="Amber fragrance bottle on dark rock" label="Zenkai Labs" />
          </div>
          <Reveal className="md:col-span-6 md:col-start-7 md:self-end">
            <p className="text-title text-balance">{about.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-studio mt-32 grid gap-10 md:mt-48 md:grid-cols-12 md:gap-6">
        <h2 className="text-label text-muted-foreground md:col-span-3">Philosophy</h2>
        <ol className="space-y-10 md:col-span-9">
          {about.philosophy.map((line, i) => (
            <Reveal key={i}>
              <li className="flex gap-6 text-title">
                <span className="text-label pt-2 text-muted-foreground">0{i + 1}</span>
                {line}
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-studio mt-32 md:mt-48">
        <h2 className="text-label text-muted-foreground">Services</h2>
        <ul className="mt-8">
          {about.services.map(([name, desc]) => (
            <Reveal key={name}>
              <li className="grid gap-2 border-t border-border py-7 md:grid-cols-12 md:gap-6">
                <span className="text-2xl font-medium tracking-[-0.03em] md:col-span-6 md:text-4xl">{name}</span>
                <span className="text-muted-foreground md:col-span-5 md:col-start-8 md:self-center">{desc}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-studio mt-32 md:mt-48">
        <h2 className="text-label text-muted-foreground">Process</h2>
        <ol className="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {about.process.map(([n, title, desc], i) => (
            <Reveal key={n} delay={i * 0.06}>
              <li className="border-t border-foreground pt-5">
                <span className="text-label text-muted-foreground">{n}</span>
                <h3 className="mt-6 text-title">{title}</h3>
                <p className="mt-3 text-muted-foreground">{desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaBand lines={["Let's make", "it real."]} />
    </>
  );
}
