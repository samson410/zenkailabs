// Central site configuration — edit copy, contact details and branding here.
export const site = {
  brandName: "Zenkai Labs",
  wordmark: "zenkai labs",
  tagline: "Ideas Into Visual Impact.",
  /** Set `src` to an image path (e.g. "/images/logo.svg") to replace the text wordmark. */
  logo: { src: "" as string, alt: "Zenkai Labs" },
  colors: {
    primary: "#0D0D0D",
    secondary: "#2B2B2B",
    muted: "#8E8E8E",
    light: "#E6E6E6",
  },
  contactEmail: "hello@zenkailabs.com",
  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "TikTok", url: "https://tiktok.com/" },
    { label: "LinkedIn", url: "https://linkedin.com/" },
  ],
  availability: "Available for select projects",
  hero: {
    eyebrow: "Independent AI creative studio",
    headline: ["Made to make", "you look twice."],
    supporting: "Visuals, films and campaigns for brands with something to say.",
    primaryCta: "Explore selected work",
    secondaryCta: "Start a project",
    image: "/images/hero.jpg",
    imageAlt: "Sculptural amber glass bottle catching a hard beam of light",
    /** Optional muted looping preview video URL (MP4). */
    previewVideo: "",
  },
  /** Set to true once a real form backend is connected. */
  formBackendConnected: false,
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
