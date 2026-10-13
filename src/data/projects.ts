// Central portfolio data. Every card, filter, detail page and prev/next link reads from here.

export type ProjectCategory =
  | "Product Photography"
  | "Product Films"
  | "Commercials"
  | "UGC & Lifestyle"
  | "Social Creatives";

export type ProjectAspectRatio = "9:16" | "16:9" | "4:5" | "1:1";

export type VideoSource =
  | { type: "cloudflare-stream"; playbackUrl: string } // e.g. https://customer-xxx.cloudflarestream.com/<VIDEO_ID>/iframe
  | { type: "mp4"; url: string };

export interface Project {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: ProjectCategory;
  description: string;
  thumbnail: string;
  altText: string;
  videoSource?: VideoSource;
  previewVideoUrl?: string;
  aspectRatio: ProjectAspectRatio;
  featured: boolean;
  conceptProject: boolean;
  year?: string;
  services: string[];
  creativeBrief?: string;
  visualDirection?: string;
  creativeApproach?: string;
  deliverables?: string[];
  processNotes?: string;
  order: number;
}

export const categories: ProjectCategory[] = [
  "Product Photography",
  "Product Films",
  "Commercials",
  "UGC & Lifestyle",
  "Social Creatives",
];

export const projects: Project[] = [
  {
    id: "p1",
    slug: "nescafe-morning-ritual",
    title: "Morning Ritual",
    brand: "Nescafé",
    category: "Product Films",
    description: "A slow, sunlit product film built around the first cup of the day.",
    thumbnail: "/images/projects/nescafe-morning-ritual.jpg",
    altText: "Coffee jar and steaming cup on a stone counter in warm morning light",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Art direction", "AI product film", "Colour grade"],
    creativeBrief: "Capture the quiet comfort of a morning coffee without leaning on cliché.",
    visualDirection: "Warm low-angle sunlight, steam, natural stone and soft grain.",
    deliverables: ["1 × 9:16 hero film", "3 × social cutdowns"],
    order: 1,
  },
  {
    id: "p2",
    slug: "fearless-extra-push",
    title: "Extra Push",
    brand: "Fearless",
    category: "Commercials",
    description: "High-energy beverage spot with impact-driven pacing and liquid motion.",
    thumbnail: "/images/projects/fearless-extra-push.jpg",
    altText: "Red energy drink can bursting through splashing liquid and ice",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Edit"],
    visualDirection: "Hard light, frozen splashes, black backdrop and fast cuts.",
    order: 2,
  },
  {
    id: "p3",
    slug: "avenrox-fragrance-film",
    title: "Unforgettable Persona",
    brand: "Avenrox",
    category: "Product Films",
    description: "A cinematic fragrance film shaped by smoke, stone and shadow.",
    thumbnail: "/images/projects/avenrox-fragrance-film.jpg",
    altText: "Faceted amber perfume bottle on dark volcanic rock with smoke",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Art direction", "AI product film"],
    visualDirection: "Low-key rim lighting, drifting smoke, mineral textures.",
    order: 3,
  },
  {
    id: "p4",
    slug: "esteem-royale-skincare",
    title: "The Everyday Ritual",
    brand: "Esteem Royale",
    category: "UGC & Lifestyle",
    description: "Lifestyle and UGC-style skincare content that feels lived-in and premium.",
    thumbnail: "/images/projects/esteem-royale-skincare.jpg",
    altText: "Hand holding a skincare cream jar in a sunlit bathroom",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["AI UGC", "Lifestyle imagery"],
    order: 4,
  },
  {
    id: "p5",
    slug: "hyciine-pick-your-mood",
    title: "Pick Your Mood",
    brand: "Hyciine",
    category: "Commercials",
    description: "Three body oils, three moods — presented like a fragrance campaign.",
    thumbnail: "/images/projects/hyciine-pick-your-mood.jpg",
    altText: "Three body oil bottles in amber, rose and green glass on plaster plinths",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 9:16 film", "3 × product stills"],
    order: 5,
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
export const featuredProjects = sortedProjects.filter((p) => p.featured);

export function getProjectBySlug(slug: string) {
  return sortedProjects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = sortedProjects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? sortedProjects[i - 1] : undefined,
    next: i >= 0 && i < sortedProjects.length - 1 ? sortedProjects[i + 1] : undefined,
  };
}

export function getRelatedProjects(slug: string, limit = 3) {
  const current = getProjectBySlug(slug);
  if (!current) return [];
  const same = sortedProjects.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = sortedProjects.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export const aspectClass: Record<ProjectAspectRatio, string> = {
  "9:16": "aspect-[9/16]",
  "16:9": "aspect-video",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
};
