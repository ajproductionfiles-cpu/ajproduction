export interface EditableLink {
  label: string;
  href: string;
}

export interface HomeServiceCard {
  title: string;
  description: string;
  image: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export interface HomeFeaturedWallItem {
  title: string;
  subtitle: string;
  badge: string;
  ctaLabel: string;
  ctaHref: string;
  mediaType: "image" | "video";
  mediaUrl: string;
}

export interface ServiceCategory {
  title: string;
  items: string[];
}

export interface ServiceDetailMetric {
  label: string;
  value: string;
}

export interface ServiceDetailFeature {
  title: string;
  body: string;
}

export interface ServiceDetailPage {
  slug: string;
  navLabel: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  heroImage: string;
  overviewTitle: string;
  overviewBody: string;
  metrics: ServiceDetailMetric[];
  featureTitle: string;
  features: ServiceDetailFeature[];
  ctaTitle: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  accent: string;
}

export interface StudioStat {
  label: string;
  value: string;
}

export interface ProjectMediaItem {
  type: "image" | "video";
  url: string;
}

export interface FooterGroup {
  title: string;
  links: EditableLink[];
}

export interface ManagedPageVisibility {
  key: string;
  label: string;
  href: string;
  showInHeader: boolean;
  showInFooter: boolean;
  includeInSitemap: boolean;
}

export interface SiteSettings {
  brandName: string;
  brandLogoUrl: string;
  siteTitle: string;
  siteDescription: string;
  metadataBase: string;
  contactEmail: string;
  contactPhone: string;
  locationLabel: string;
  copyrightText: string;
  notificationEmail: string;
  showCustomCursor: boolean;
  showSearchIcon: boolean;
  enableSmoothScroll: boolean;
  pageDirectory: ManagedPageVisibility[];
  header: {
    logoLabel: string;
    navItems: EditableLink[];
  };
  footer: {
    groups: FooterGroup[];
    legalLinks: EditableLink[];
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    heroImage: string;
    servicesCards: HomeServiceCard[];
    workIntroText: string;
    workCtaLabel: string;
    workCtaHref: string;
    featuredWall: {
      title: string;
      subtitle: string;
      items: HomeFeaturedWallItem[];
    };
  };
  servicesPage: {
    title: string;
    subtitle: string;
    categories: ServiceCategory[];
    detailPages: ServiceDetailPage[];
    ctaTitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
  workPage: {
    title: string;
    subtitle: string;
    heroImage: string;
    ctaTitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
  processPage: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
    ctaTitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
  studioPage: {
    title: string;
    subtitle: string;
    image: string;
    visionTitle: string;
    visionBody: string;
    cultureTitle: string;
    cultureBody: string;
    stats: StudioStat[];
    ctaTitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
  journalPage: {
    title: string;
    subtitle: string;
    heroImage: string;
    emptyTitle: string;
    emptyBody: string;
    seoTitle: string;
    seoDescription: string;
    seoImage: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    serviceOptions: string[];
    budgetOptions: string[];
    successTitle: string;
    successBody: string;
    submitLabel: string;
  };
}

export interface PublicProject {
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
  gallery: ProjectMediaItem[];
  tags: string[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface PublicJournalPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  authorName: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonicalUrl: string;
  ogImage: string;
  published: boolean;
  createdAt: string;
}

export interface PublicInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}
