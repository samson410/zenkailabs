import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { LineHeading, Reveal } from "./Reveal";

export function CtaBand({ lines = ["Have something", "worth seeing?"] }: { lines?: string[] }) {
  return (
    <section className="container-studio mt-32 border-t border-border pt-16 md:mt-48 md:pt-24">
      <p className="text-label text-muted-foreground">Next step</p>
      <LineHeading as="h2" inView lines={lines} className="mt-6 text-display" />
      <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/contact"
          className="group inline-flex min-h-12 items-center justify-between gap-6 bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start a project
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
        <Link
          to="/work"
          className="inline-flex min-h-12 items-center border border-border px-6 text-sm transition-colors hover:bg-secondary"
        >
          View all work
        </Link>
      </Reveal>
    </section>
  );
}
