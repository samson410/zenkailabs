import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { site } from "@/config/site";
import { LineHeading, Reveal } from "@/components/site/Reveal";

export const projectTypes = [
  "AI Product Photography",
  "Product Video or Commercial",
  "AI UGC / Lifestyle Content",
  "Social Media Creatives",
  "Multiple Deliverables",
  "Other",
] as const;

const budgets = ["Under $1k", "$1k – $3k", "$3k – $7k", "$7k+", "Not sure yet"];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Zenkai Labs" },
      { name: "description", content: "Start a project with Zenkai Labs. Tell us what you're building." },
      { property: "og:title", content: "Contact — Zenkai Labs" },
      { property: "og:description", content: "Start a project with Zenkai Labs." },
    ],
  }),
  component: ContactPage,
});

type Fields = { name: string; email: string; brand: string; type: string; description: string; budget: string; deadline: string };
const empty: Fields = { name: "", email: "", brand: "", type: "", description: "", budget: "", deadline: "" };

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.brand.trim()) e.brand = "Please enter your brand or business name.";
  if (!f.type) e.type = "Please choose a project type.";
  if (f.description.trim().length < 20) e.description = "A short description helps — at least 20 characters.";
  return e;
}

const inputCls =
  "mt-2 block w-full min-h-12 border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none focus-visible:outline-none";

function ContactPage() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [opened, setOpened] = useState(false);
  const set = (k: keyof Fields) => (ev: { target: { value: string } }) => setF({ ...f, [k]: ev.target.value });

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(f);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    const subject = `Project inquiry — ${f.brand} (${f.type})`;
    const body = [
      `Name: ${f.name}`,
      `Email: ${f.email}`,
      `Brand: ${f.brand}`,
      `Project type: ${f.type}`,
      f.budget && `Budget: ${f.budget}`,
      f.deadline && `Deadline: ${f.deadline}`,
      "",
      f.description,
    ]
      .filter((l): l is string => typeof l === "string" && l !== "")
      .join("\n");
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const field = (k: keyof Fields, label: string, el: React.ReactNode, optional = false) => (
    <div>
      <label htmlFor={`f-${k}`} className="text-label text-muted-foreground">
        {label} {optional && <span className="opacity-60">(optional)</span>}
      </label>
      {el}
      {errors[k] && (
        <p id={`e-${k}`} role="alert" className="mt-2 text-sm text-destructive">
          {errors[k]}
        </p>
      )}
    </div>
  );
  const aria = (k: keyof Fields) => ({ id: `f-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <section className="container-studio grid gap-16 pt-28 md:grid-cols-12 md:gap-6 md:pt-40">
      <div className="md:col-span-5">
        <p className="text-label text-muted-foreground">Contact</p>
        <LineHeading lines={["Let's make", "something", "worth seeing."]} className="mt-6 text-headline" />
        <Reveal className="mt-8 max-w-sm">
          <p className="text-lede text-muted-foreground">
            Tell us what you're building, what you're selling, or what you'd like people to notice.
          </p>
          <a href={`mailto:${site.contactEmail}`} className="link-underline mt-8 inline-block text-lg">
            {site.contactEmail}
          </a>
        </Reveal>
      </div>

      <form noValidate onSubmit={onSubmit} className="space-y-9 md:col-span-6 md:col-start-7">
        {!site.formBackendConnected && (
          <p className="border-l border-foreground pl-4 text-sm text-muted-foreground">
            Sending opens your email app with your details filled in, addressed to {site.contactEmail}. Nothing is sent until you press send there.
          </p>
        )}
        <div className="grid gap-9 sm:grid-cols-2 sm:gap-6">
          {field("name", "Name", <input {...aria("name")} autoComplete="name" className={inputCls} value={f.name} onChange={set("name")} />)}
          {field("email", "Email", <input {...aria("email")} type="email" autoComplete="email" inputMode="email" className={inputCls} value={f.email} onChange={set("email")} />)}
        </div>
        {field("brand", "Brand or business", <input {...aria("brand")} autoComplete="organization" className={inputCls} value={f.brand} onChange={set("brand")} />)}
        {field(
          "type",
          "Project type",
          <select {...aria("type")} className={`${inputCls} appearance-none`} value={f.type} onChange={set("type")}>
            <option value="" className="bg-background">Choose one</option>
            {projectTypes.map((t) => (
              <option key={t} className="bg-background">{t}</option>
            ))}
          </select>,
        )}
        {field("description", "Project description", <textarea {...aria("description")} rows={5} className={`${inputCls} resize-y`} value={f.description} onChange={set("description")} placeholder="The product, the goal, where it will live…" />)}
        <div className="grid gap-9 sm:grid-cols-2 sm:gap-6">
          {field(
            "budget",
            "Budget range",
            <select {...aria("budget")} className={`${inputCls} appearance-none`} value={f.budget} onChange={set("budget")}>
              <option value="" className="bg-background">Select</option>
              {budgets.map((b) => (
                <option key={b} className="bg-background">{b}</option>
              ))}
            </select>,
            true,
          )}
          {field("deadline", "Deadline", <input {...aria("deadline")} type="date" className={`${inputCls} [color-scheme:dark]`} value={f.deadline} onChange={set("deadline")} />, true)}
        </div>
        <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto">
          Open email to send
        </button>
        {opened && (
          <p role="status" className="text-sm text-muted-foreground">
            Your email app should now be open with the message ready. If nothing happened, write to {site.contactEmail} directly.
          </p>
        )}
      </form>
    </section>
  );
}
