import type { Inquiry, JournalPost, Project } from "@prisma/client";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/security";
import { defaultJournalPosts, defaultProjects, defaultSiteSettings } from "@/lib/site/defaults";
import type {
  EditableLink,
  ProjectMediaItem,
  PublicInquiry,
  PublicJournalPost,
  PublicProject,
  SiteSettings,
} from "@/lib/site/types";
import { normalizeManagedPages } from "@/lib/site/visibility";

const SITE_SETTINGS_KEY = "site-settings";
const BROKEN_ASSET_URL =
  "https://images.unsplash.com/photo-1586717791821-3f44a563fe4c?q=80&w=2570&auto=format&fit=crop";
const REPLACEMENT_ASSET_URL =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
const REPLACEMENT_GALLERY_ASSET_URL =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop";

function parseJsonArray(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map((item) => String(item)) : [];
  } catch {
    return [];
  }
}

function serializeJsonArray(value: string[]) {
  return JSON.stringify(value.filter(Boolean));
}

function inferMediaType(url: string): ProjectMediaItem["type"] {
  return /\.(mp4|webm|mov|ogv|ogg|m4v)(\?.*)?$/i.test(url) ? "video" : "image";
}

function normalizeGalleryItem(value: unknown): ProjectMediaItem | null {
  if (typeof value === "string") {
    const url = value.trim();
    return url ? { type: inferMediaType(url), url } : null;
  }

  if (value && typeof value === "object") {
    const item = value as Partial<ProjectMediaItem>;
    const url = String(item.url || "").trim();
    if (!url) {
      return null;
    }

    return {
      type: item.type === "video" ? "video" : inferMediaType(url),
      url,
    };
  }

  return null;
}

function parseProjectGallery(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.map(normalizeGalleryItem).filter((item): item is ProjectMediaItem => Boolean(item))
      : [];
  } catch {
    return [];
  }
}

function serializeProjectGallery(value: ProjectMediaItem[]) {
  return JSON.stringify(
    value
      .map((item) => ({
        type: item.type === "video" ? "video" : "image",
        url: String(item.url || "").trim(),
      }))
      .filter((item) => item.url),
  );
}

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  if (base && typeof base === "object" && override && typeof override === "object") {
    const result = { ...(base as Record<string, unknown>) };
    for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
      result[key] =
        key in result
          ? deepMerge(result[key] as never, value as never)
          : value;
    }
    return result as T;
  }

  return (override ?? base) as T;
}

function mergeByIndex<T>(defaults: T[], overrides: T[] | undefined, transform?: (value: T, index: number) => T) {
  return defaults.map((fallback, index) => {
    const value = overrides?.[index] ? deepMerge(fallback, overrides[index] as Partial<T>) : fallback;
    return transform ? transform(value, index) : value;
  });
}

function isGenericServicePrimaryLabel(value: string) {
  const normalized = value.trim().toLowerCase();
  return normalized === "learn more" || normalized === "learnmore";
}

function isGenericServiceSecondaryLabel(value: string) {
  const normalized = value.trim().toLowerCase();
  return normalized === "buy";
}

function normalizeLegalLinks(links: EditableLink[]): EditableLink[] {
  const withoutSales = links.filter((link) => !/sales\s+and\s+refunds/i.test(link.label.trim()));
  return withoutSales.map((link) => {
    const label = link.label.trim();
    if (/^privacy policy$/i.test(label)) {
      return { ...link, label, href: "/privacy" };
    }
    if (/^terms of use$/i.test(label)) {
      return { ...link, label, href: "/terms" };
    }
    return link;
  });
}

function normalizeSettings(settings: SiteSettings): SiteSettings {
  const footerGroups = mergeByIndex(defaultSiteSettings.footer.groups, settings.footer.groups).map((group, index) => {
    if (index === 0) {
      const links = group.links.some((link) => link.label === "Journal" || link.href === "/journal")
        ? defaultSiteSettings.footer.groups[0].links
        : mergeByIndex(defaultSiteSettings.footer.groups[0].links, group.links);

      return {
        ...group,
        links,
      };
    }

    if (index !== 1) {
      return group;
    }

    const links = group.links.some((link) => link.href === "/services" || link.label === "Consulting")
      ? defaultSiteSettings.footer.groups[1].links
      : mergeByIndex(defaultSiteSettings.footer.groups[1].links, group.links);

    return {
      ...group,
      links,
    };
  });

  return {
    ...settings,
    pageDirectory: normalizeManagedPages(settings.pageDirectory),
    footer: {
      ...settings.footer,
      groups: footerGroups,
      legalLinks: normalizeLegalLinks(
        settings.footer.legalLinks?.length ? settings.footer.legalLinks : defaultSiteSettings.footer.legalLinks,
      ),
    },
    home: {
      ...settings.home,
      servicesCards: mergeByIndex(
        defaultSiteSettings.home.servicesCards,
        settings.home.servicesCards,
        (card, index) => ({
          ...card,
          primaryLabel: !card.primaryLabel || isGenericServicePrimaryLabel(card.primaryLabel)
            ? defaultSiteSettings.home.servicesCards[index].primaryLabel
            : card.primaryLabel,
          primaryHref:
            !card.primaryHref || card.primaryHref === "/services"
              ? defaultSiteSettings.home.servicesCards[index].primaryHref
              : card.primaryHref,
          secondaryLabel: !card.secondaryLabel || isGenericServiceSecondaryLabel(card.secondaryLabel)
            ? defaultSiteSettings.home.servicesCards[index].secondaryLabel
            : card.secondaryLabel,
          secondaryHref:
            !card.secondaryHref || card.secondaryHref === "/services"
              ? defaultSiteSettings.home.servicesCards[index].secondaryHref
              : card.secondaryHref,
        }),
      ),
      featuredWall: {
        ...settings.home.featuredWall,
        items: mergeByIndex(defaultSiteSettings.home.featuredWall.items, settings.home.featuredWall.items),
      },
    },
    servicesPage: {
      ...settings.servicesPage,
      categories: mergeByIndex(defaultSiteSettings.servicesPage.categories, settings.servicesPage.categories),
      detailPages: mergeByIndex(
        defaultSiteSettings.servicesPage.detailPages,
        settings.servicesPage.detailPages,
        (service, index) => ({
          ...service,
          slug: service.slug || defaultSiteSettings.servicesPage.detailPages[index].slug,
          navLabel: service.navLabel || defaultSiteSettings.servicesPage.detailPages[index].navLabel,
        }),
      ),
    },
  };
}

function mapProject(record: Project): PublicProject {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    category: record.category,
    client: record.client,
    year: record.year,
    services: parseJsonArray(record.servicesJson),
    description: record.description,
    fullDescription: record.fullDescription,
    heroImage: record.heroImage,
    gallery: parseProjectGallery(record.galleryJson),
    tags: parseJsonArray(record.tagsJson),
    featured: record.featured,
    published: record.published,
    sortOrder: record.sortOrder,
    createdAt: record.createdAt.toISOString(),
  };
}

function mapJournalPost(record: JournalPost): PublicJournalPost {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    category: record.category,
    authorName: record.authorName || "Studio Editorial",
    excerpt: record.excerpt,
    content: record.content,
    coverImage: record.coverImage,
    tags: parseJsonArray(record.tagsJson),
    seoTitle: record.seoTitle || "",
    seoDescription: record.seoDescription || "",
    seoKeywords: record.seoKeywords || "",
    canonicalUrl: record.canonicalUrl || "",
    ogImage: record.ogImage || record.coverImage,
    published: record.published,
    createdAt: record.createdAt.toISOString(),
  };
}

function mapInquiry(record: Inquiry): PublicInquiry {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    phone: record.phone || "",
    service: record.service,
    budget: record.budget || "",
    message: record.message,
    status: (record.status as PublicInquiry["status"]) || "new",
    createdAt: record.createdAt.toISOString(),
  };
}

export async function ensureSiteSeeded() {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  await prisma.siteContent.upsert({
    where: { key: SITE_SETTINGS_KEY },
    create: {
      key: SITE_SETTINGS_KEY,
      value: JSON.stringify(defaultSiteSettings),
    },
    update: {},
  });

  if ((await prisma.adminUser.count()) === 0) {
    try {
      await prisma.adminUser.create({
        data: {
          name: "Studio Admin",
          email: process.env.ADMIN_EMAIL || "admin@studio.local",
          passwordHash: hashPassword(
            process.env.ADMIN_PASSWORD || "ChangeMe123!"
          ),
        },
      });
    } catch {
      // Another concurrent request seeded the admin first.
    }
  }

  await Promise.all(
    defaultProjects.map((project, index) =>
      prisma.project.upsert({
        where: { slug: project.slug },
        create: {
          title: project.title,
          slug: project.slug,
          category: project.category,
          client: project.client,
          year: project.year,
          servicesJson: serializeJsonArray(project.services),
          description: project.description,
          fullDescription: project.fullDescription,
          heroImage: project.heroImage,
          galleryJson: serializeProjectGallery(project.gallery),
          tagsJson: serializeJsonArray(project.tags),
          featured: project.featured,
          published: project.published,
          sortOrder: project.sortOrder || index + 1,
        },
        update: {},
      }),
    ),
  );

  await Promise.all(
    defaultJournalPosts.map((post) =>
      prisma.journalPost.upsert({
        where: { slug: post.slug },
        create: {
          title: post.title,
          slug: post.slug,
          category: post.category,
          authorName: post.authorName,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          tagsJson: serializeJsonArray(post.tags),
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          seoKeywords: post.seoKeywords,
          canonicalUrl: post.canonicalUrl,
          ogImage: post.ogImage,
          published: post.published,
        },
        update: {},
      }),
    ),
  );

  const settingsRecord = await prisma.siteContent.findUnique({
    where: { key: SITE_SETTINGS_KEY },
  });

  if (settingsRecord?.value.includes(BROKEN_ASSET_URL)) {
    await prisma.siteContent.update({
      where: { key: SITE_SETTINGS_KEY },
      data: {
        value: settingsRecord.value.replaceAll(
          BROKEN_ASSET_URL,
          REPLACEMENT_ASSET_URL
        ),
      },
    });
  }

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { heroImage: BROKEN_ASSET_URL },
        { galleryJson: { contains: BROKEN_ASSET_URL } },
      ],
    },
  });

  await Promise.all(
    projects.map((project) =>
      prisma.project.update({
        where: { id: project.id },
        data: {
          heroImage:
            project.heroImage === BROKEN_ASSET_URL
              ? REPLACEMENT_ASSET_URL
              : project.heroImage,
          galleryJson: project.galleryJson.replaceAll(
            BROKEN_ASSET_URL,
            REPLACEMENT_GALLERY_ASSET_URL
          ),
        },
      }),
    ),
}

export async function getSiteSettings() {
  await ensureSiteSeeded();

  const record = await prisma.siteContent.findUnique({
    where: { key: SITE_SETTINGS_KEY },
  });

  if (!record) return defaultSiteSettings;

  try {
    const parsed = JSON.parse(record.value) as Partial<SiteSettings>;
    return normalizeSettings(deepMerge(defaultSiteSettings, parsed));
  } catch {
    return defaultSiteSettings;
  }
}

export async function saveSiteSettings(settings: SiteSettings) {
  await prisma.siteContent.upsert({
    where: { key: SITE_SETTINGS_KEY },
    create: { key: SITE_SETTINGS_KEY, value: JSON.stringify(settings) },
    update: { value: JSON.stringify(settings) },
  });
}

export async function updateSiteSettings(
  updater: (settings: SiteSettings) => SiteSettings,
) {
  const current = await getSiteSettings();
  const next = updater(current);
  await saveSiteSettings(next);
  return next;
}

export async function getAllProjects() {
  await ensureSiteSeeded();
  const records = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return records.map(mapProject);
}

export async function getPublishedProjects() {
  const projects = await getAllProjects();
  return projects.filter((project) => project.published);
}

export async function getProjectBySlug(slug: string) {
  await ensureSiteSeeded();
  const record = await prisma.project.findUnique({ where: { slug } });
  return record ? mapProject(record) : null;
}

export async function getProjectById(id: string) {
  await ensureSiteSeeded();
  const record = await prisma.project.findUnique({ where: { id } });
  return record ? mapProject(record) : null;
}

export async function upsertProject(project: Omit<PublicProject, "createdAt"> & { createdAt?: string }) {
  const record = await prisma.project.upsert({
    where: { id: project.id },
    create: {
      id: project.id,
      title: project.title,
      slug: project.slug,
      category: project.category,
      client: project.client,
      year: project.year,
      servicesJson: serializeJsonArray(project.services),
      description: project.description,
      fullDescription: project.fullDescription,
      heroImage: project.heroImage,
      galleryJson: serializeProjectGallery(project.gallery),
      tagsJson: serializeJsonArray(project.tags),
      featured: project.featured,
      published: project.published,
      sortOrder: project.sortOrder,
      createdAt: project.createdAt ? new Date(project.createdAt) : undefined,
    },
    update: {
      title: project.title,
      slug: project.slug,
      category: project.category,
      client: project.client,
      year: project.year,
      servicesJson: serializeJsonArray(project.services),
      description: project.description,
      fullDescription: project.fullDescription,
      heroImage: project.heroImage,
      galleryJson: serializeProjectGallery(project.gallery),
      tagsJson: serializeJsonArray(project.tags),
      featured: project.featured,
      published: project.published,
      sortOrder: project.sortOrder,
    },
  });

  return mapProject(record);
}

export async function deleteProjectById(id: string) {
  await prisma.project.delete({ where: { id } });
}

export async function getAllJournalPosts() {
  await ensureSiteSeeded();
  const records = await prisma.journalPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return records.map(mapJournalPost);
}

export async function getPublishedJournalPosts() {
  const posts = await getAllJournalPosts();
  return posts.filter((post) => post.published);
}

export async function getJournalPostById(id: string) {
  await ensureSiteSeeded();
  const record = await prisma.journalPost.findUnique({ where: { id } });
  return record ? mapJournalPost(record) : null;
}

export async function getJournalPostBySlug(slug: string) {
  await ensureSiteSeeded();
  const record = await prisma.journalPost.findUnique({ where: { slug } });
  return record ? mapJournalPost(record) : null;
}

export async function upsertJournalPost(post: Omit<PublicJournalPost, "createdAt"> & { createdAt?: string }) {
  const record = await prisma.journalPost.upsert({
    where: { id: post.id },
    create: {
      id: post.id,
      title: post.title,
      slug: post.slug,
      category: post.category,
      authorName: post.authorName,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      tagsJson: serializeJsonArray(post.tags),
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      seoKeywords: post.seoKeywords,
      canonicalUrl: post.canonicalUrl,
      ogImage: post.ogImage,
      published: post.published,
      createdAt: post.createdAt ? new Date(post.createdAt) : undefined,
    },
    update: {
      title: post.title,
      slug: post.slug,
      category: post.category,
      authorName: post.authorName,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      tagsJson: serializeJsonArray(post.tags),
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      seoKeywords: post.seoKeywords,
      canonicalUrl: post.canonicalUrl,
      ogImage: post.ogImage,
      published: post.published,
    },
  });

  return mapJournalPost(record);
}

export async function deleteJournalPostById(id: string) {
  await prisma.journalPost.delete({ where: { id } });
}

export async function getAllInquiries() {
  await ensureSiteSeeded();
  const records = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return records.map(mapInquiry);
}

export async function createInquiry(data: Omit<PublicInquiry, "id" | "status" | "createdAt">) {
  const record = await prisma.inquiry.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      budget: data.budget || null,
      message: data.message,
    },
  });

  return mapInquiry(record);
}

export async function updateInquiryStatus(id: string, status: PublicInquiry["status"]) {
  const record = await prisma.inquiry.update({
    where: { id },
    data: { status },
  });

  return mapInquiry(record);
}
