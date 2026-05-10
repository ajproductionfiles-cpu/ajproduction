import type { PublicJournalPost, PublicProject, SiteSettings } from "@/lib/site/types";
import { defaultManagedPages } from "@/lib/site/visibility";

export const defaultSiteSettings: SiteSettings = {
  brandName: "Creative Studio",
  brandLogoUrl: "",
  siteTitle: "Creative Studio | Designing the Future",
  siteDescription:
    "Luxury branding, AI content, digital experiences, and cinematic visual storytelling.",
  metadataBase: "https://luxury-studio.com",
  contactEmail: "hello@studio.com",
  contactPhone: "+1 (555) 010-2040",
  locationLabel: "United States",
  copyrightText: "Copyright © 2026 Studio Inc. All rights reserved.",
  notificationEmail: "admin@studio.com",
  showCustomCursor: true,
  showSearchIcon: true,
  enableSmoothScroll: true,
  pageDirectory: defaultManagedPages,
  header: {
    logoLabel: "Studio",
    navItems: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "Studio", href: "/studio" },
      { label: "Process", href: "/process" },
      { label: "Contact", href: "/contact" },
    ],
  },
  footer: {
    groups: [
      {
        title: "Studio",
        links: [
          { label: "About", href: "/studio" },
          { label: "Process", href: "/process" },
          { label: "Work", href: "/work" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Branding", href: "/services/branding" },
          { label: "Digital", href: "/services/digital" },
          { label: "AI Studio", href: "/services/ai-studio" },
          { label: "Website Development", href: "/services/website-development" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "Instagram", href: "https://instagram.com" },
          { label: "Twitter", href: "https://x.com" },
          { label: "LinkedIn", href: "https://linkedin.com" },
          { label: "Behance", href: "https://behance.net" },
        ],
      },
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
  home: {
    heroTitle: "Creative Studio.",
    heroSubtitle: "Designing the future of luxury brands through digital perfection.",
    primaryCtaLabel: "Our work",
    primaryCtaHref: "/work",
    secondaryCtaLabel: "Start project",
    secondaryCtaHref: "/contact",
    heroImage:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop",
    servicesCards: [
      {
        title: "Branding",
        description: "Brand Identity, Logo Design, Guidelines, and Packaging.",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        primaryLabel: "Explore branding",
        primaryHref: "/services/branding",
        secondaryLabel: "Book discovery",
        secondaryHref: "/contact",
      },
      {
        title: "Digital",
        description: "Product reels, launch campaigns, paid creatives, and social-first visuals.",
        image:
          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2570&auto=format&fit=crop",
        primaryLabel: "Explore digital",
        primaryHref: "/services/digital",
        secondaryLabel: "Plan campaign",
        secondaryHref: "/contact",
      },
      {
        title: "AI Studio",
        description: "AI Commercial Ads, Product Videos, and Generative Content.",
        image:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        primaryLabel: "Explore AI Studio",
        primaryHref: "/services/ai-studio",
        secondaryLabel: "Start prototype",
        secondaryHref: "/contact",
      },
      {
        title: "Website Development",
        description: "High-performance websites, custom builds, motion systems, and premium UX.",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        primaryLabel: "Explore web dev",
        primaryHref: "/services/website-development",
        secondaryLabel: "Build with us",
        secondaryHref: "/contact",
      },
    ],
    workIntroText: "Explore our full portfolio",
    workCtaLabel: "View all work",
    workCtaHref: "/work",
    featuredWall: {
      title: "Featured stories, endlessly in motion.",
      subtitle: "A scrolling wall for campaigns, launches, films, and standout portfolio covers.",
      items: [
        {
          title: "Vanguard",
          subtitle: "Brand system and web launch for a precision-led fintech identity.",
          badge: "Branding / Web",
          ctaLabel: "View project",
          ctaHref: "/work/vanguard",
          mediaType: "image",
          mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        },
        {
          title: "Lumina AI",
          subtitle: "Cinematic AI campaign visuals with motion-first storytelling.",
          badge: "AI Production",
          ctaLabel: "View project",
          ctaHref: "/work/lumina-ai",
          mediaType: "image",
          mediaUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2532&auto=format&fit=crop",
        },
        {
          title: "Aether",
          subtitle: "Immersive digital experience built for luxury real-estate launch.",
          badge: "Digital Experience",
          ctaLabel: "View project",
          ctaHref: "/work/aether",
          mediaType: "image",
          mediaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        },
        {
          title: "Journal Spotlight",
          subtitle: "Fresh thinking on how AI is reshaping premium brand expression.",
          badge: "Journal",
          ctaLabel: "Read article",
          ctaHref: "/blog/future-of-ai-in-luxury-branding",
          mediaType: "image",
          mediaUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2664&auto=format&fit=crop",
        },
        {
          title: "Digital Product Reels",
          subtitle: "Short-form campaigns engineered for motion, detail, and retention.",
          badge: "Digital",
          ctaLabel: "Start project",
          ctaHref: "/contact",
          mediaType: "image",
          mediaUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2570&auto=format&fit=crop",
        },
        {
          title: "Studio Motion Lab",
          subtitle: "High-energy experimental visuals, launches, and product worlds.",
          badge: "Studio",
          ctaLabel: "Meet the studio",
          ctaHref: "/studio",
          mediaType: "image",
          mediaUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        },
      ],
    },
  },
  servicesPage: {
    title: "Services.",
    subtitle:
      "We offer a comprehensive suite of creative and technological services designed to elevate your brand.",
    categories: [
      {
        title: "Branding",
        items: [
          "Brand Identity",
          "Logo Design",
          "Brand Guidelines",
          "Packaging Design",
          "Print Design",
          "Brand Consulting",
        ],
      },
      {
        title: "Digital",
        items: [
          "Social Media Management",
          "Product Reels",
          "Ad Shoots",
          "Product Videos",
          "Campaign Art Direction",
          "Performance Creatives",
        ],
      },
      {
        title: "AI Studio",
        items: [
          "AI Commercial Ads",
          "AI Product Photography",
          "AI Reels",
          "AI Product Videos",
          "AI UGC Content",
        ],
      },
      {
        title: "Website Development",
        items: [
          "Website Strategy",
          "UX and Information Architecture",
          "Custom Frontend Development",
          "CMS Integrations",
          "Motion and Interaction Systems",
          "Performance Optimization",
        ],
      },
    ],
    detailPages: [
      {
        slug: "branding",
        navLabel: "Branding",
        title: "Branding that feels inevitable.",
        eyebrow: "Brand Strategy",
        subtitle: "Identity systems, packaging, and positioning built to make premium brands unmistakable.",
        heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        overviewTitle: "What we build",
        overviewBody: "We shape brands from the inside out, aligning visual identity, messaging, packaging, and launch assets into one cohesive system that scales elegantly across digital and physical touchpoints.",
        metrics: [
          { label: "Identity Systems", value: "50+" },
          { label: "Avg. Launch Window", value: "4-8 wks" },
          { label: "Touchpoints Unified", value: "12+" },
        ],
        featureTitle: "A sharper brand stack",
        features: [
          { title: "Positioning", body: "Audience framing, tone of voice, offer clarity, and category distinction." },
          { title: "Identity Design", body: "Logos, visual systems, typography, color logic, and brand governance." },
          { title: "Packaging & Launch", body: "Boxes, labels, launch graphics, social kits, and campaign continuity." },
        ],
        ctaTitle: "Build a brand people remember.",
        ctaLabel: "Start branding project",
        ctaHref: "/contact",
      },
      {
        slug: "digital",
        navLabel: "Digital",
        title: "Digital campaigns that move culture.",
        eyebrow: "Campaign Systems",
        subtitle: "Launch creatives, reels, ad systems, and social storytelling engineered for reach and recall.",
        heroImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2570&auto=format&fit=crop",
        overviewTitle: "What we build",
        overviewBody: "We create digital campaign systems designed to convert attention into action, spanning product reels, ad concepts, launch bursts, and high-frequency social visuals that stay premium under pressure.",
        metrics: [
          { label: "Creative Variants", value: "100+" },
          { label: "Reels Delivered", value: "300+" },
          { label: "Turnaround Rhythm", value: "Weekly" },
        ],
        featureTitle: "Built for launch velocity",
        features: [
          { title: "Reels & Motion", body: "Product-first video direction for ads, launches, and always-on content." },
          { title: "Ad Creative", body: "Paid social assets tuned for testing, iteration, and performance feedback." },
          { title: "Campaign Art Direction", body: "A unified visual world across posts, stories, landing assets, and promos." },
        ],
        ctaTitle: "Launch your next campaign with speed and style.",
        ctaLabel: "Plan digital campaign",
        ctaHref: "/contact",
      },
      {
        slug: "ai-studio",
        navLabel: "AI Studio",
        title: "AI content with a creative director’s eye.",
        eyebrow: "Generative Production",
        subtitle: "AI visuals, synthetic product worlds, concept films, and rapid campaign prototyping without losing taste.",
        heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        overviewTitle: "What we build",
        overviewBody: "Our AI studio helps brands move faster without feeling generic. We blend prompting, retouching, compositing, and human art direction to deliver imagery that feels intentional, premium, and campaign-ready.",
        metrics: [
          { label: "Concept Rounds", value: "10x faster" },
          { label: "Prompt Systems", value: "Custom" },
          { label: "Hybrid Outputs", value: "Photo + AI" },
        ],
        featureTitle: "AI, directed properly",
        features: [
          { title: "Concept Worlds", body: "Create visual territories before production budgets are locked." },
          { title: "Synthetic Campaign Assets", body: "Generate stills and motion concepts for launches, ads, and testing." },
          { title: "Human Finish", body: "Retouch, typography, color treatment, and story polish applied by the studio." },
        ],
        ctaTitle: "Prototype your next campaign in days, not weeks.",
        ctaLabel: "Start AI concept sprint",
        ctaHref: "/contact",
      },
      {
        slug: "website-development",
        navLabel: "Website Development",
        title: "Websites that feel premium before they even load.",
        eyebrow: "Web Experience",
        subtitle: "Custom websites with motion, performance, storytelling, and CMS flexibility built into the system.",
        heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        overviewTitle: "What we build",
        overviewBody: "We design and develop websites as flagship experiences, combining conversion-focused UX, technical performance, motion design, and editable CMS workflows so your team can scale without compromising polish.",
        metrics: [
          { label: "Core Web Vitals", value: "Optimized" },
          { label: "CMS Ready", value: "Yes" },
          { label: "Animation Layers", value: "Custom" },
        ],
        featureTitle: "Engineered for brand presence",
        features: [
          { title: "Custom Frontends", body: "Editorial landing pages, launches, and immersive storytelling experiences." },
          { title: "Admin-Controlled CMS", body: "Content editing flows your team can manage without touching code." },
          { title: "Performance & Motion", body: "Fast loading, polished transitions, and device-aware interactive systems." },
        ],
        ctaTitle: "Build a website that actually feels like your brand.",
        ctaLabel: "Start website project",
        ctaHref: "/contact",
      },
    ],
    ctaTitle: "Ready to transform your brand?",
    ctaLabel: "Start Project",
    ctaHref: "/contact",
  },
  workPage: {
    title: "Work.",
    subtitle: "A showcase of our latest digital experiences, branding systems, and creative technology work.",
    heroImage:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2664&auto=format&fit=crop",
    ctaTitle: "Have a project in mind?",
    ctaLabel: "Start a conversation",
    ctaHref: "/contact",
  },
  processPage: {
    title: "The Process.",
    subtitle: "A rigorous, methodical approach to creating digital excellence.",
    steps: [
      {
        id: "01",
        title: "Discovery",
        description:
          "We dive deep into your brand, audience, and market to find the unique story waiting to be told.",
        accent: "blue",
      },
      {
        id: "02",
        title: "Strategy",
        description:
          "Architecting a roadmap that aligns creative vision with business objectives for maximum impact.",
        accent: "purple",
      },
      {
        id: "03",
        title: "Identity",
        description:
          "Crafting the visual and verbal soul of your brand. Minimal, premium, and timeless.",
        accent: "pink",
      },
      {
        id: "04",
        title: "Production",
        description:
          "Bringing the vision to life through cinematic production, high-end web development, and AI technology.",
        accent: "orange",
      },
      {
        id: "05",
        title: "Launch",
        description:
          "Ensuring a flawless transition from creation to reality while scaling your presence globally.",
        accent: "green",
      },
    ],
    ctaTitle: "Ready to Start?",
    ctaLabel: "Get in Touch",
    ctaHref: "/contact",
  },
  studioPage: {
    title: "Studio.",
    subtitle:
      "A collective of designers, developers, and creative technologists dedicated to the craft of digital perfection.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    visionTitle: "Our Vision.",
    visionBody:
      "We believe that design should be as functional as it is beautiful. Every pixel is an opportunity to create a meaningful connection between a brand and its audience.",
    cultureTitle: "Our Culture.",
    cultureBody:
      "We operate at the intersection of luxury design and creative technology. Our team is a blend of artistic vision and technical precision.",
    stats: [
      { label: "Founded", value: "2018" },
      { label: "Clients", value: "50+" },
      { label: "Awards", value: "12" },
      { label: "Coffee", value: "∞" },
    ],
    ctaTitle: "Driven by Excellence.",
    ctaLabel: "Contact Us",
    ctaHref: "/contact",
  },
  journalPage: {
    title: "Journal.",
    subtitle: "Latest insights, news and thinking from the studio.",
    heroImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2670&auto=format&fit=crop",
    emptyTitle: "Fresh thinking is coming soon.",
    emptyBody: "Publish your first journal post from the admin panel to bring this page to life.",
    seoTitle: "Studio Blog | Insights, Strategy, Design, and Digital Thinking",
    seoDescription: "Read editorial insights on branding, web experiences, AI production, creative direction, and launch strategy from the studio.",
    seoImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2670&auto=format&fit=crop",
  },
  contactPage: {
    title: "Let's Connect.",
    subtitle: "We're ready to transform your ideas into world-class digital experiences.",
    serviceOptions: ["Branding", "Digital", "AI Studio", "Other"],
    budgetOptions: ["Under $5k", "$5k - $15k", "$15k - $50k", "$50k+"],
    successTitle: "Message Sent!",
    successBody: "We'll get back to you within 24 hours.",
    submitLabel: "Send Inquiry",
  },
};

export const defaultProjects: PublicProject[] = [
  {
    id: "seed-vanguard",
    title: "Vanguard",
    slug: "vanguard",
    category: "Branding / Web",
    client: "Vanguard Group",
    year: "2024",
    services: ["Brand Strategy", "Identity Design", "Web Experience"],
    description:
      "A complete brand overhaul for a leading financial technology firm, focusing on precision and trust.",
    fullDescription:
      "We approached this project with a focus on cinematic storytelling and technical precision. Every element was crafted to evoke a sense of quality and innovation, ensuring the brand stands out in a crowded digital landscape. The new identity system is built on a foundation of geometric clarity and typographic authority.",
    heroImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    gallery: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2570&auto=format&fit=crop",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
      },
    ],
    tags: ["Branding", "Web"],
    featured: true,
    published: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-lumina",
    title: "Lumina AI",
    slug: "lumina-ai",
    category: "AI Production",
    client: "Lumina Labs",
    year: "2024",
    services: ["AI Visuals", "Motion Graphics", "Art Direction"],
    description:
      "Creating a cinematic visual language for the next generation of artificial intelligence.",
    fullDescription:
      "Lumina AI needed a visual identity that felt both cutting-edge and accessible. We created a system of generative visuals, fluid motion graphics, and a color palette that speaks to the future of intelligence without feeling cold or sterile.",
    heroImage:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2532&auto=format&fit=crop",
    gallery: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
      },
    ],
    tags: ["AI", "Motion"],
    featured: true,
    published: true,
    sortOrder: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-aether",
    title: "Aether",
    slug: "aether",
    category: "Digital Experience",
    client: "Aether Corp",
    year: "2024",
    services: ["UX Design", "3D Web", "Motion"],
    description: "An immersive 3D digital experience for a luxury property developer.",
    fullDescription:
      "Aether Corp needed a digital presence that matched the ambition of their architectural projects. We designed an immersive web experience using Three.js and WebGL, letting users explore spaces before they exist.",
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    gallery: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      },
    ],
    tags: ["Digital", "3D"],
    featured: false,
    published: true,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
  },
];

export const defaultJournalPosts: PublicJournalPost[] = [
  {
    id: "seed-journal-ai",
    title: "The Future of AI in Luxury Branding",
    slug: "future-of-ai-in-luxury-branding",
    category: "Insights",
    authorName: "Studio Editorial",
    excerpt: "How premium brands are using AI without losing their human voice.",
    content:
      "AI is no longer a novelty for luxury brands. The strongest studios are using it to accelerate ideation, storyboarding, and campaign iteration while protecting tone, curation, and craft.",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2664&auto=format&fit=crop",
    tags: ["AI", "Branding", "Strategy"],
    seoTitle: "The Future of AI in Luxury Branding | Studio Blog",
    seoDescription: "Explore how premium brands are using AI for faster iteration, sharper campaigns, and stronger storytelling without losing their point of view.",
    seoKeywords: "AI branding, luxury branding, creative AI, premium campaigns",
    canonicalUrl: "",
    ogImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2664&auto=format&fit=crop",
    published: true,
    createdAt: new Date().toISOString(),
  },
];
