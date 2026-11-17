import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ease } from "@/lib/motion";

export function NotFoundView({ title = "This page isn't here." }: { title?: string }) {
  return (
    <section className="container-studio flex min-h-[80svh] flex-col justify-end pb-16 pt-32">
      <p className="text-label text-muted-foreground">404 — Not found</p>
      <h1 className="mt-6 text-display">{title}</h1>
      <p className="mt-6 max-w-md text-lede text-muted-foreground">
        The link may be old, or the project may have moved.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link to="/work" className="inline-flex min-h-12 items-center bg-primary px-6 text-sm font-medium text-primary-foreground">
          Browse the work
        </Link>
        <Link to="/" className="inline-flex min-h-12 items-center border border-border px-6 text-sm">
          Go home
        </Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="container-studio flex min-h-screen flex-col justify-center">
      <h1 className="text-headline">This page didn't load.</h1>
      <p className="mt-4 text-muted-foreground">Something went wrong. Try again or head home.</p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex min-h-12 items-center bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
        <a href="/" className="inline-flex min-h-12 items-center border border-border px-6 text-sm">
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0D0D0D" },
      { title: "Zenkai Labs — Ideas Into Visual Impact" },
      { name: "description", content: "Independent AI creative studio making product visuals, films and campaigns." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "https://res.cloudinary.com/dxydu2ubk/image/upload/v1794926622/gu5sd8z0piud1lsvqtp7.webp", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <Shell>
      <NotFoundView />
    </Shell>
  ),
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();

  return (
    <QueryClientProvider client={queryClient}>
      <Shell>
        <motion.div
          key={pathname}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <Outlet />
        </motion.div>
      </Shell>
    </QueryClientProvider>
  );
}
