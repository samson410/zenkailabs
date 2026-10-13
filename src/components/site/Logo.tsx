import { Link } from "@tanstack/react-router";
import { site } from "@/config/site";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} aria-label={`${site.brandName} — home`} className="inline-flex min-h-11 items-center">
      {site.logo.src ? (
        <img src={site.logo.src} alt={site.logo.alt} className="h-6 w-auto" />
      ) : (
        <span className="text-lg font-semibold tracking-[-0.04em] lowercase">{site.wordmark}</span>
      )}
    </Link>
  );
}
