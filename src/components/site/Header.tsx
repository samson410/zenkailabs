import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/config/site";
import { ease } from "@/lib/motion";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? "border-b border-border bg-background" : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container-studio flex h-16 items-center justify-between md:h-20">
        <Logo />
        <div className="hidden items-center gap-10 md:flex">
          <span className="text-label flex items-center gap-2 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-foreground" aria-hidden />
            {site.availability}
          </span>
          <nav aria-label="Primary" className="flex gap-7 text-sm">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="link-underline text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          className="-mr-2 inline-flex size-11 items-center justify-center md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-5" strokeWidth={1.5} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
            style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="container-studio flex h-16 items-center justify-between">
              <Logo onClick={() => setOpen(false)} />
              <button
                ref={closeRef}
                className="-mr-2 inline-flex size-11 items-center justify-center"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-studio mt-10 flex flex-col">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease }}
                  className="border-b border-border"
                >
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 text-[2.75rem] leading-none font-medium tracking-[-0.04em] text-muted-foreground data-[status=active]:text-foreground"
                  >
                    {l.label}
                    <span className="text-label">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-studio mt-auto pb-8">
              <p className="text-label text-muted-foreground">{site.availability}</p>
              <a href={`mailto:${site.contactEmail}`} className="mt-3 block text-lg">
                {site.contactEmail}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
