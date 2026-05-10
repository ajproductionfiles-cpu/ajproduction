// Central data store using localStorage

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  year: string;
  services: string[];
  description: string;
  fullDescription: string;
  heroImage: string;
  images: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

// --- Seed Data ---
const seedProjects: Project[] = [
  {
    id: "1",
    title: "Vanguard",
    slug: "vanguard",
    category: "Branding / Web",
    client: "Vanguard Group",
    year: "2024",
    services: ["Brand Strategy", "Identity Design", "Web Experience"],
    description: "A complete brand overhaul for a leading financial technology firm, focusing on precision and trust.",
    fullDescription: "We approached this project with a focus on cinematic storytelling and technical precision. Every element was crafted to evoke a sense of quality and innovation, ensuring the brand stands out in a crowded digital landscape. The new identity system is built on a foundation of geometric clarity and typographic authority.",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2570&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fe4c?q=80&w=2570&auto=format&fit=crop"
    ],
    tags: ["Branding", "Web"],
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Lumina AI",
    slug: "lumina-ai",
    category: "AI Production",
    client: "Lumina Labs",
    year: "2024",
    services: ["AI Visuals", "Motion Graphics", "Art Direction"],
    description: "Creating a cinematic visual language for the next generation of artificial intelligence.",
    fullDescription: "Lumina AI needed a visual identity that felt both cutting-edge and accessible. We created a system of generative visuals, fluid motion graphics, and a color palette that speaks to the future of intelligence — without feeling cold or sterile.",
    heroImage: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2532&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
    ],
    tags: ["AI", "Motion"],
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Aether",
    slug: "aether",
    category: "Digital Experience",
    client: "Aether Corp",
    year: "2024",
    services: ["UX Design", "3D Web", "Motion"],
    description: "An immersive 3D digital experience for a luxury property developer.",
    fullDescription: "Aether Corp needed a digital presence that matched the ambition of their architectural projects. We designed an immersive web experience using Three.js and WebGL, letting users explore spaces before they exist.",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563fe4c?q=80&w=2570&auto=format&fit=crop",
    ],
    tags: ["Digital", "3D"],
    featured: false,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Nova",
    slug: "nova",
    category: "Packaging",
    client: "Nova Consumer",
    year: "2023",
    services: ["Packaging Design", "Brand Identity", "Photography"],
    description: "Premium packaging design for a next-generation consumer wellness brand.",
    fullDescription: "Nova's packaging needed to communicate purity, innovation, and premium quality. We designed a system that works across 40+ SKUs, using a refined color palette and typographic hierarchy that sets them apart on shelf.",
    heroImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2670&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2670&auto=format&fit=crop",
    ],
    tags: ["Packaging", "Branding"],
    featured: false,
    published: true,
    createdAt: new Date().toISOString(),
  }
];

// --- Store API ---
const PROJECTS_KEY = "studio_projects";
const JOURNAL_KEY = "studio_journal";
const INQUIRIES_KEY = "studio_inquiries";

function isClient() {
  return typeof window !== "undefined";
}

// Projects
export function getPublishedProjects(): Project[] {
  if (!isClient()) return seedProjects;
  const raw = localStorage.getItem(PROJECTS_KEY);
  if (!raw) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(seedProjects));
    return seedProjects;
  }
  return (JSON.parse(raw) as Project[]).filter((project) => project.published);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find(p => p.slug === slug);
}

export function saveProject(project: Project): void {
  if (!isClient()) return;
  const projects = isClient() && localStorage.getItem(PROJECTS_KEY)
    ? (JSON.parse(localStorage.getItem(PROJECTS_KEY) as string) as Project[])
    : seedProjects;
  const idx = projects.findIndex(p => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.unshift(project);
  }
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function deleteProject(id: string): void {
  if (!isClient()) return;
  const projects = isClient() && localStorage.getItem(PROJECTS_KEY)
    ? (JSON.parse(localStorage.getItem(PROJECTS_KEY) as string) as Project[]).filter((p) => p.id !== id)
    : seedProjects.filter((p) => p.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export const getProjects = getPublishedProjects;

// Journal
export function getJournalPosts(): JournalPost[] {
  if (!isClient()) return [];
  const raw = localStorage.getItem(JOURNAL_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveJournalPost(post: JournalPost): void {
  if (!isClient()) return;
  const posts = getJournalPosts();
  const idx = posts.findIndex(p => p.id === post.id);
  if (idx >= 0) {
    posts[idx] = post;
  } else {
    posts.unshift(post);
  }
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(posts));
}

export function deleteJournalPost(id: string): void {
  if (!isClient()) return;
  const posts = getJournalPosts().filter(p => p.id !== id);
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(posts));
}

// Inquiries
export function getInquiries(): Inquiry[] {
  if (!isClient()) return [];
  const raw = localStorage.getItem(INQUIRIES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveInquiry(inquiry: Inquiry): void {
  if (!isClient()) return;
  const inquiries = getInquiries();
  inquiries.unshift(inquiry);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
}

export function updateInquiryStatus(id: string, status: Inquiry["status"]): void {
  if (!isClient()) return;
  const inquiries = getInquiries().map(i => i.id === id ? { ...i, status } : i);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function generateSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
