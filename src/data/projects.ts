// Central portfolio data. Every card, filter, detail page and prev/next link reads from here.
//
// TO ADD A VIDEO PROJECT: copy an entry, then change only the link and the details.
//   videoUrl: paste a Cloudflare Stream link (…cloudflarestream.com/<ID>/iframe) or a direct .mp4 link.
//   thumbnail: leave it out for video projects and a frame from the video is used automatically.
//              (Image-only projects still need a thumbnail.)
//   previewVideoUrl (optional): short looping .mp4 that plays on card hover.
// Leave videoUrl out and the project is shown as a normal image project.

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
  thumbnail?: string; // optional for video projects: a frame from the video is used instead
  altText: string;
  videoUrl?: string; // simple option: paste a Cloudflare Stream or .mp4 link here
  thumbnailTime?: number; // seconds into the video to use as the cover frame (default 1)
  videoSource?: VideoSource; // advanced override; takes priority over videoUrl
  previewVideoUrl?: string; // optional short loop for card hover
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
    thumbnail: "https://res.cloudinary.com/dxydu2ubk/image/upload/v1794926370/f14unnb36edpdmega5sb.webp",
    altText: "Coffee jar and steaming cup on a stone counter in warm morning light",
    // videoUrl: "https://customer-xxx.cloudflarestream.com/<VIDEO_ID>/iframe",
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
    thumbnail: "https://res.cloudinary.com/dxydu2ubk/image/upload/v1794927012/gp5xjo0jk3fpb76imfhw.webp",
    altText: "Red energy drink can bursting through splashing liquid and ice",
    // videoUrl: "https://example.com/fearless-extra-push.mp4",
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
    thumbnail: "https://res.cloudinary.com/dxydu2ubk/image/upload/v1794926637/gem0uxyez5isspdcyoe4.webp",
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
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794928093/c0gev6e82loncufaeuvi.mp4",
    thumbnailTime: 1.7,
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
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794928051/byyo1m6mhjozvehftktk.mp4",
    thumbnailTime: 1,
    altText: "Three body oil bottles in amber, rose and green glass on plaster plinths",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 9:16 film", "3 × product stills"],
    order: 5,
  },
    {
    id: "p6",
    slug: "nescafe-3-in-1-morning-pour",
    title: "Morning Splash",
    brand: "Nescafé",
    category: "Product Films",
    description: "Rich coffee droplets, swirling milk ribbons, and warm steam bringing a 3-in-1 brew to life.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794928110/c5ixrqfse9ov48lsxvg6.mp4",
    thumbnailTime: 1,
    altText: "Nescafe Original 3 in 1 sachet splashing into rich coffee beside a steaming red mug",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 9:16 film", "3 × product stills"],
    order: 6,
  },
  {
    id: "p7",
    slug: "novatech-one-elevate-every-moment",
    title: "Elevate Every Moment",
    brand: "NovaTech",
    category: "Commercials",
    description: "Sleek metallic curves and glowing biometric displays showcased in a high-contrast tech spot.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794927966/gbgayrvhaj4ho0vphfbw.mp4",
    thumbnailTime: 1,
    altText: "NovaTech One smartwatch with a black Milanese loop band glowing against a dark studio backdrop",
    aspectRatio: "1:1",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 1:1 film", "3 × product stills"],
    order: 7,
  },
  {
    id: "p8",
    slug: "anoran-neon-stride",
    title: "Neon Stride",
    brand: "Anoran",
    category: "Social Creatives",
    description: "Rain-slicked city streets and mid-air motion highlighting luminous cyber-blue sneaker soles.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794927902/vxyf5m8gegkovfki5vhl.mp4",
    thumbnailTime: 1,
    altText: "Black, neon blue, and violet athletic sneakers with glowing translucent soles on a dark reflective surface",
    aspectRatio: "16:9",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 16:9 film", "3 × product stills"],
    order: 8,
  },
  {
    id: "p9",
    slug: "fearless-energy-more-fire",
    title: "More Fire",
    brand: "Fearless Energy Drink",
    category: "Commercials",
    description: "A gritty locker-room tunnel anthem built around pre-fight focus, sweat, and relentless drive.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794926987/b6elgortr47wk6hmhijm.mp4",
    thumbnailTime: 1,
    altText: "Boxer in hand wraps drinking a chilled bottle of Fearless Energy Drink in a dimly lit gym corridor",
    aspectRatio: "16:9",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 16:9 film", "3 × product stills"],
    order: 9,
  },
  {
    id: "p10",
    slug: "maryruths-morning-ritual",
    title: "Morning Ritual",
    brand: "MaryRuth's",
    category: "UGC & Lifestyle",
    description: "An authentic, sun-lit kitchen routine swapping daily pills for a raspberry liquid multivitamin.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794926972/mjovmqbukhexzt9csofn.mp4",
    thumbnailTime: 1,
    altText: "Creator pouring MaryRuth's raspberry liquid morning multivitamin into a glass in a bright kitchen",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 9:16 film", "3 × product stills"],
    order: 10,
  },
  {
    id: "p11",
    slug: "nescafe-velvet-crema-cut",
    title: "Velvet Crema",
    brand: "Nescafé",
    category: "Product Photography",
    description: "Macro liquid motion capturing roasted coffee beans and silky foam in golden bokeh light.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794926964/ivr7g3yfushs1cz0epxp.mp4",
    thumbnailTime: 1,
    altText: "Close-up of frothy crema inside a red Nescafe mug surrounded by floating roasted coffee beans",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 9:16 film", "3 × product stills"],
    order: 11,
  },
  {
    id: "p12",
    slug: "veltrion-motors-creative-reel",
    title: "Motion & Story Reel",
    brand: "Veltrion Motors",
    category: "Social Creatives",
    description: "A dynamic showcase blending 3D character animation, luxury automotive CGI, and product spots.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794926964/kby6wwi5w5tx3iladxh6.mp4",
    thumbnailTime: 1,
    altText: "Luxury electric concept cars and 3D animated character scenes from a creative production reel",
    aspectRatio: "16:9",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 16:9 film", "3 × product stills"],
    order: 12,
  },
  {
    id: "p13",
    slug: "avenrox-ocean-breeze",
    title: "The Ocean, Bottled",
    brand: "Avenrox",
    category: "Product Films",
    description: "Submerged in deep marine light, a golden extrait de parfum meets swirling underwater currents.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794926959/ezqpdwdfdq6rtk2olosc.mp4",
    thumbnailTime: 1,
    altText: "Avenrox Ocean Breeze glass perfume bottle resting on dark underwater rock surrounded by swirling water",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 9:16 film", "3 × product stills"],
    order: 13,
  },
  {
    id: "p14",
    slug: "blendgo-pro-smooth-mornings",
    title: "Smooth Mornings",
    brand: "BlendGo Pro",
    category: "UGC & Lifestyle",
    description: "Fresh strawberries, bananas, and a one-touch blend captured in a clean, everyday kitchen demo.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794926942/inby2tttqafphpewihoc.mp4",
    thumbnailTime: 1,
    altText: "Woman holding a white BlendGo Pro portable blender filled with fresh strawberry banana smoothie",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 9:16 film", "3 × product stills"],
    order: 14,
  },
  {
    id: "p15",
    slug: "bloomy-sooth-botanical-toner",
    title: "Botanical Calm",
    brand: "Bloomy",
    category: "Product Photography",
    description: "Floating hibiscus petals, fresh aloe slices, and crystal water droplets framing a soothing toner.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794926942/q2huqp6emg55gunaglpo.mp4",
    thumbnailTime: 1,
    altText: "Bloomy Sooth Calming and Soothing Facial Toner bottle surrounded by pink roses, hibiscus, and water splashes",
    aspectRatio: "9:16",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 9:16 film", "3 × product stills"],
    order: 15,
  },
  {
    id: "p16",
    slug: "solis-studio-golden-hour-edit",
    title: "Golden Hour Edit",
    brand: "Solis Studio",
    category: "Product Films",
    description: "Warm architectural shadows and sculptural glass vessels captured in slow, tactile motion.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794926913/qefbdkdn9av91umk2igx.mp4",
    thumbnailTime: 1,
    altText: "Minimalist amber glass skincare vessels arranged on warm travertine stone in natural sunlight",
    aspectRatio: "4:5",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 4:5 film", "3 × product stills"],
    order: 16,
  },
  {
    id: "p17",
    slug: "kora-botanics-pure-hydration",
    title: "Pure Hydration",
    brand: "Kora Botanics",
    category: "Social Creatives",
    description: "Crisp botanical textures and macro water ripples designed for high-converting social storytelling.",
    videoUrl: "https://res.cloudinary.com/dxydu2ubk/video/upload/v1794926884/ueb9esaqsexeqc1yle3l.mp4",
    thumbnailTime: 1,
    altText: "Frosted serum dropper bottle suspended over crystal clear water ripples with fresh green leaves",
    aspectRatio: "4:5",
    featured: true,
    conceptProject: true,
    year: "2025",
    services: ["Concept", "AI commercial", "Still life"],
    deliverables: ["1 × 4:5 film", "3 × product stills"],
    order: 17,
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

// Works out the video type from a pasted link, so you never set the type by hand.
export function getVideo(p: Project): VideoSource | undefined {
  if (p.videoSource) return p.videoSource;
  if (!p.videoUrl) return undefined;
  return p.videoUrl.includes("cloudflarestream.com")
    ? { type: "cloudflare-stream", playbackUrl: p.videoUrl }
    : { type: "mp4", url: p.videoUrl };
}

export const hasVideo = (p: Project) => Boolean(getVideo(p));

// Image shown on cards and as the poster. Uses your thumbnail if you set one,
// otherwise grabs a frame from the Cloudflare video (change time=1s to pick another moment).
// Cloudinary .mp4 links get a frame automatically too. Other plain .mp4 links return undefined
// here, and the component shows a frame of the video itself instead.
export function getThumbnail(p: Project): string | undefined {
  if (p.thumbnail) return p.thumbnail;
  const t = p.thumbnailTime ?? 1;
  const v = getVideo(p);
  if (v?.type === "cloudflare-stream") {
    return v.playbackUrl.replace(/\/iframe.*$/, "") + `/thumbnails/thumbnail.jpg?time=${t}s`;
  }
  if (v?.type === "mp4" && v.url.includes("res.cloudinary.com") && v.url.includes("/video/upload/")) {
    const offset = p.thumbnailTime && p.thumbnailTime !== 1 ? `so_${p.thumbnailTime}` : "so_auto";
    return v.url
      .replace("/video/upload/", `/video/upload/${offset},q_auto:best,f_webp/`)
      .replace(/\.\w+$/, ".webp");
  }
  return undefined;
}


export const aspectClass: Record<ProjectAspectRatio, string> = {
  "9:16": "aspect-[9/16]",
  "16:9": "aspect-video",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
};