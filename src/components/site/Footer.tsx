import { Link } from "@tanstack/react-router";
import { navLinks, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="container-studio py-14 md:py-20">
        <p className="text-label text-muted-foreground">{site.tagline}</p>
        <a
          href={`mailto:${site.contactEmail}`}
          className="mt-6 block break-words text-headline transition-opacity hover:opacity-70"
        >
          {site.contactEmail}
        </a>
        <div className="mt-14 grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
          <nav aria-label="Footer" className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="py-1.5 text-muted-foreground hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-1">
            {site.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="py-1.5 text-muted-foreground hover:text-foreground">
                {s.label}
              </a>
            ))}
          </div>
          <p className="col-span-2 self-end text-muted-foreground md:text-right">
            © {new Date().getFullYear()} {site.brandName}
          </p>
        </div>
      </div>
    </footer>
  );
}
