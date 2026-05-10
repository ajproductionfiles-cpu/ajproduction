"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { clearAdminSession, createAdminSession, requireAdmin } from "@/lib/auth";
import { linesToLinks, linesToList, linesToProjectMedia, parseBoolean } from "@/lib/forms";
import { hashPassword, verifyPassword } from "@/lib/security";
import {
  createInquiry,
  deleteJournalPostById,
  deleteProjectById,
  getJournalPostById,
  getProjectById,
  getSiteSettings,
  saveSiteSettings,
  updateInquiryStatus,
  upsertJournalPost,
  upsertProject,
} from "@/lib/site/data";
import { defaultSiteSettings } from "@/lib/site/defaults";
import { saveUploadedFile, saveUploadedFiles } from "@/lib/uploads";
import type { ProjectMediaItem } from "@/lib/site/types";
import { normalizeManagedPages } from "@/lib/site/visibility";

type ActionState = {
  error?: string;
  success?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

function parseNumber(value: FormDataEntryValue | null, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function revalidatePublicSite() {
  const paths = [
    "/",
    "/services",
    "/process",
    "/studio",
    "/work",
    "/journal",
    "/blog",
    "/contact",
    "/sitemap",
    "/sitemap.xml",
    "/privacy",
    "/terms",
  ];
  paths.forEach((path) => revalidatePath(path));
}

async function resolveSiteImageUpload(
  formData: FormData,
  fieldName: string,
  folder: string,
  fallback = "",
) {
  const uploaded = formData.get(fieldName);
  if (uploaded instanceof File && uploaded.size > 0) {
    const url = await saveUploadedFile(uploaded, {
      folder,
      accept: "image",
    });

    if (url) {
      return url;
    }
  }

  return fallback;
}

async function resolveProjectHeroImage(formData: FormData, fallback = "") {
  const uploaded = formData.get("heroUpload");
  if (uploaded instanceof File && uploaded.size > 0) {
    const url = await saveUploadedFile(uploaded, {
      folder: "projects/hero",
      accept: "image",
    });
    if (url) {
      return url;
    }
  }

  return String(formData.get("heroImage") || fallback).trim();
}

async function resolveProjectGallery(formData: FormData) {
  const manual = linesToProjectMedia(formData.get("gallery"));
  const uploaded = await saveUploadedFiles(formData.getAll("galleryUploads"), {
    folder: "projects/gallery",
    accept: "both",
  });

  const uploadedMedia: ProjectMediaItem[] = uploaded.map((url) => ({
    type: /\.(mp4|webm|mov|ogv|ogg|m4v)(\?.*)?$/i.test(url) ? "video" : "image",
    url,
  }));

  return [
    ...manual,
    ...uploadedMedia,
  ];
}

async function resolveJournalCoverImage(formData: FormData, fallback = "") {
  const uploaded = formData.get("coverUpload");
  if (uploaded instanceof File && uploaded.size > 0) {
    const url = await saveUploadedFile(uploaded, {
      folder: "journal/covers",
      accept: "image",
    });
    if (url) {
      return url;
    }
  }

  return String(formData.get("coverImage") || fallback).trim();
}

async function resolveHomeServiceCardImage(formData: FormData, index: number, fallback = "") {
  const uploaded = formData.get(`serviceCardImageUpload${index}`);
  if (uploaded instanceof File && uploaded.size > 0) {
    const url = await saveUploadedFile(uploaded, {
      folder: "home/services",
      accept: "image",
    });

    if (url) {
      return url;
    }
  }

  return String(formData.get(`serviceCardImage${index}`) || fallback).trim();
}

async function resolveUploadedMediaField(
  formData: FormData,
  fieldName: string,
  fallback = "",
) {
  const uploaded = formData.get(fieldName);
  if (uploaded instanceof File && uploaded.size > 0) {
    const accept = uploaded.type.startsWith("video/") ? "video" : "image";
    const url = await saveUploadedFile(uploaded, {
      folder: fieldName.includes("serviceHero") ? "services/detail" : "home/featured-wall",
      accept,
    });

    if (url) {
      return url;
    }
  }

  return fallback;
}

export async function loginAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email aur password dono required hain." };
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });

  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    return { error: "Invalid login details. Please try again." };
  }

  await createAdminSession(admin.id);
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/login");
}

export async function submitInquiryAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const budget = String(formData.get("budget") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { error: "Name, email, aur message required hain." };
  }

  await createInquiry({
    name,
    email,
    phone,
    service: service || defaultSiteSettings.contactPage.serviceOptions[0],
    budget,
    message,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");

  return { success: "Thanks! Your inquiry has been sent." };
}

export async function saveBrandSettingsAction(formData: FormData) {
  await requireAdmin();
  const settings = await getSiteSettings();
  const uploadedLogo = await resolveSiteImageUpload(formData, "brandLogoUpload", "branding/logo", "");
  const manualLogo = String(formData.get("brandLogoUrl") ?? "").trim();

  settings.brandName = String(formData.get("brandName") || settings.brandName).trim();
  settings.brandLogoUrl = uploadedLogo || manualLogo;
  settings.siteTitle = String(formData.get("siteTitle") || settings.siteTitle).trim();
  settings.siteDescription = String(formData.get("siteDescription") || settings.siteDescription).trim();
  settings.metadataBase = String(formData.get("metadataBase") || settings.metadataBase).trim();
  settings.contactEmail = String(formData.get("contactEmail") || settings.contactEmail).trim();
  settings.contactPhone = String(formData.get("contactPhone") || settings.contactPhone).trim();
  settings.locationLabel = String(formData.get("locationLabel") || settings.locationLabel).trim();
  settings.copyrightText = String(formData.get("copyrightText") || settings.copyrightText).trim();
  settings.notificationEmail = String(formData.get("notificationEmail") || settings.notificationEmail).trim();

  await saveSiteSettings(settings);
  revalidatePublicSite();
  redirect("/admin/settings?saved=brand");
}

export async function saveExperienceSettingsAction(formData: FormData) {
  await requireAdmin();
  const settings = await getSiteSettings();

  settings.showCustomCursor = parseBoolean(formData.get("showCustomCursor"));
  settings.showSearchIcon = parseBoolean(formData.get("showSearchIcon"));
  settings.enableSmoothScroll = parseBoolean(formData.get("enableSmoothScroll"));

  await saveSiteSettings(settings);
  revalidatePublicSite();
  redirect("/admin/settings?saved=experience");
}

export async function savePageVisibilityAction(formData: FormData) {
  await requireAdmin();
  const current = await getSiteSettings();
  const base = normalizeManagedPages(current.pageDirectory);
  current.pageDirectory = base.map((page) => ({
    ...page,
    showInHeader: formData.get(`pageVis_${page.key}_header`) === "on",
    showInFooter: formData.get(`pageVis_${page.key}_footer`) === "on",
    includeInSitemap: formData.get(`pageVis_${page.key}_sitemap`) === "on",
  }));

  await saveSiteSettings(current);
  revalidatePublicSite();
  redirect("/admin/settings?saved=visibility");
}

export async function saveHeaderSettingsAction(formData: FormData) {
  await requireAdmin();
  const settings = await getSiteSettings();

  settings.header.logoLabel = String(formData.get("logoLabel") || settings.header.logoLabel).trim();
  settings.header.navItems = linesToLinks(formData.get("navItems"));

  await saveSiteSettings(settings);
  revalidatePublicSite();
  redirect("/admin/settings?saved=header");
}

export async function saveFooterSettingsAction(formData: FormData) {
  await requireAdmin();
  const settings = await getSiteSettings();

  settings.footer.groups = [
    {
      title: String(formData.get("footerGroupOneTitle") || "Studio").trim(),
      links: linesToLinks(formData.get("footerGroupOneLinks")),
    },
    {
      title: String(formData.get("footerGroupTwoTitle") || "Services").trim(),
      links: linesToLinks(formData.get("footerGroupTwoLinks")),
    },
    {
      title: String(formData.get("footerGroupThreeTitle") || "Connect").trim(),
      links: linesToLinks(formData.get("footerGroupThreeLinks")),
    },
  ];
  settings.footer.legalLinks = linesToLinks(formData.get("legalLinks"));

  await saveSiteSettings(settings);
  revalidatePublicSite();
  redirect("/admin/settings?saved=footer");
}

export async function saveHomeSettingsAction(formData: FormData) {
  await requireAdmin();
  const settings = await getSiteSettings();

  settings.home.heroTitle = String(formData.get("heroTitle") || "").trim();
  settings.home.heroSubtitle = String(formData.get("heroSubtitle") || "").trim();
  settings.home.primaryCtaLabel = String(formData.get("primaryCtaLabel") || "").trim();
  settings.home.primaryCtaHref = String(formData.get("primaryCtaHref") || "").trim();
  settings.home.secondaryCtaLabel = String(formData.get("secondaryCtaLabel") || "").trim();
  settings.home.secondaryCtaHref = String(formData.get("secondaryCtaHref") || "").trim();
  settings.home.heroImage =
    (await resolveSiteImageUpload(formData, "heroImageUpload", "home/hero", "")) ||
    String(formData.get("heroImage") || settings.home.heroImage || "").trim();
  settings.home.workIntroText = String(formData.get("workIntroText") || "").trim();
  settings.home.workCtaLabel = String(formData.get("workCtaLabel") || "").trim();
  settings.home.workCtaHref = String(formData.get("workCtaHref") || "").trim();

  settings.home.servicesCards = await Promise.all(
    [0, 1, 2, 3].map(async (index) => ({
      title: String(formData.get(`serviceCardTitle${index}`) || "").trim(),
      description: String(formData.get(`serviceCardDescription${index}`) || "").trim(),
      image: await resolveHomeServiceCardImage(
        formData,
        index,
        settings.home.servicesCards[index]?.image || "",
      ),
      primaryLabel: String(formData.get(`serviceCardPrimaryLabel${index}`) || "").trim(),
      primaryHref: String(formData.get(`serviceCardPrimaryHref${index}`) || "").trim(),
      secondaryLabel: String(formData.get(`serviceCardSecondaryLabel${index}`) || "").trim(),
      secondaryHref: String(formData.get(`serviceCardSecondaryHref${index}`) || "").trim(),
    })),
  );

  settings.home.featuredWall.title = String(formData.get("featuredWallTitle") || "").trim();
  settings.home.featuredWall.subtitle = String(formData.get("featuredWallSubtitle") || "").trim();
  settings.home.featuredWall.items = await Promise.all(
    [0, 1, 2, 3, 4, 5].map(async (index) => ({
      title: String(formData.get(`featuredWallItemTitle${index}`) || "").trim(),
      subtitle: String(formData.get(`featuredWallItemSubtitle${index}`) || "").trim(),
      badge: String(formData.get(`featuredWallItemBadge${index}`) || "").trim(),
      ctaLabel: String(formData.get(`featuredWallItemCtaLabel${index}`) || "").trim(),
      ctaHref: String(formData.get(`featuredWallItemCtaHref${index}`) || "").trim(),
      mediaType: String(formData.get(`featuredWallItemMediaType${index}`) || "image").trim() === "video" ? "video" : "image",
      mediaUrl:
        (await resolveUploadedMediaField(
          formData,
          `featuredWallMediaUpload${index}`,
          "",
        )) || String(formData.get(`featuredWallMediaUrl${index}`) || settings.home.featuredWall.items[index]?.mediaUrl || "").trim(),
    })),
  );

  await saveSiteSettings(settings);
  revalidatePublicSite();
  redirect("/admin/settings?saved=home");
}

export async function saveServicesPageAction(formData: FormData) {
  await requireAdmin();
  const settings = await getSiteSettings();

  settings.servicesPage.title = String(formData.get("title") || "").trim();
  settings.servicesPage.subtitle = String(formData.get("subtitle") || "").trim();
  settings.servicesPage.ctaTitle = String(formData.get("ctaTitle") || "").trim();
  settings.servicesPage.ctaLabel = String(formData.get("ctaLabel") || "").trim();
  settings.servicesPage.ctaHref = String(formData.get("ctaHref") || "").trim();
  settings.servicesPage.categories = [0, 1, 2, 3].map((index) => ({
    title: String(formData.get(`categoryTitle${index}`) || "").trim(),
    items: linesToList(formData.get(`categoryItems${index}`)),
  }));
  settings.servicesPage.detailPages = await Promise.all(
    [0, 1, 2, 3].map(async (index) => {
      const navLabel = String(formData.get(`serviceNavLabel${index}`) || "").trim();
      const title = String(formData.get(`serviceTitle${index}`) || "").trim();

      return {
        slug: slugify(String(formData.get(`serviceSlug${index}`) || "").trim() || navLabel || title),
        navLabel,
        title,
        eyebrow: String(formData.get(`serviceEyebrow${index}`) || "").trim(),
        subtitle: String(formData.get(`serviceSubtitle${index}`) || "").trim(),
        heroImage:
          (await resolveUploadedMediaField(
            formData,
            `serviceHeroUpload${index}`,
            "",
          )) || String(formData.get(`serviceHeroImage${index}`) || settings.servicesPage.detailPages[index]?.heroImage || "").trim(),
        overviewTitle: String(formData.get(`serviceOverviewTitle${index}`) || "").trim(),
        overviewBody: String(formData.get(`serviceOverviewBody${index}`) || "").trim(),
        metrics: [0, 1, 2].map((metricIndex) => ({
          label: String(formData.get(`serviceMetricLabel${index}-${metricIndex}`) || "").trim(),
          value: String(formData.get(`serviceMetricValue${index}-${metricIndex}`) || "").trim(),
        })),
        featureTitle: String(formData.get(`serviceFeatureTitle${index}`) || "").trim(),
        features: [0, 1, 2].map((featureIndex) => ({
          title: String(formData.get(`serviceFeatureItemTitle${index}-${featureIndex}`) || "").trim(),
          body: String(formData.get(`serviceFeatureItemBody${index}-${featureIndex}`) || "").trim(),
        })),
        ctaTitle: String(formData.get(`serviceCtaTitle${index}`) || "").trim(),
        ctaLabel: String(formData.get(`serviceCtaLabel${index}`) || "").trim(),
        ctaHref: String(formData.get(`serviceCtaHref${index}`) || "").trim(),
      };
    }),
  );

  await saveSiteSettings(settings);
  revalidatePublicSite();
  settings.servicesPage.detailPages.forEach((service) => {
    if (service.slug) {
      revalidatePath(`/services/${service.slug}`);
    }
  });
  redirect("/admin/settings?saved=services");
}

export async function saveWorkPageAction(formData: FormData) {
  await requireAdmin();
  const settings = await getSiteSettings();

  settings.workPage.title = String(formData.get("title") || "").trim();
  settings.workPage.subtitle = String(formData.get("subtitle") || "").trim();
  settings.workPage.heroImage =
    (await resolveSiteImageUpload(formData, "heroImageUpload", "work/hero", "")) ||
    String(formData.get("heroImage") || settings.workPage.heroImage || "").trim();
  settings.workPage.ctaTitle = String(formData.get("ctaTitle") || "").trim();
  settings.workPage.ctaLabel = String(formData.get("ctaLabel") || "").trim();
  settings.workPage.ctaHref = String(formData.get("ctaHref") || "").trim();

  await saveSiteSettings(settings);
  revalidatePublicSite();
  redirect("/admin/settings?saved=work");
}

export async function saveProcessPageAction(formData: FormData) {
  await requireAdmin();
  const settings = await getSiteSettings();

  settings.processPage.title = String(formData.get("title") || "").trim();
  settings.processPage.subtitle = String(formData.get("subtitle") || "").trim();
  settings.processPage.ctaTitle = String(formData.get("ctaTitle") || "").trim();
  settings.processPage.ctaLabel = String(formData.get("ctaLabel") || "").trim();
  settings.processPage.ctaHref = String(formData.get("ctaHref") || "").trim();
  settings.processPage.steps = [0, 1, 2, 3, 4].map((index) => ({
    id: String(formData.get(`stepId${index}`) || `${index + 1}`.padStart(2, "0")).trim(),
    title: String(formData.get(`stepTitle${index}`) || "").trim(),
    description: String(formData.get(`stepDescription${index}`) || "").trim(),
    accent: String(formData.get(`stepAccent${index}`) || "blue").trim(),
  }));

  await saveSiteSettings(settings);
  revalidatePublicSite();
  redirect("/admin/settings?saved=process");
}

export async function saveStudioPageAction(formData: FormData) {
  await requireAdmin();
  const settings = await getSiteSettings();

  settings.studioPage.title = String(formData.get("title") || "").trim();
  settings.studioPage.subtitle = String(formData.get("subtitle") || "").trim();
  settings.studioPage.image =
    (await resolveSiteImageUpload(formData, "imageUpload", "studio", "")) ||
    String(formData.get("image") || settings.studioPage.image || "").trim();
  settings.studioPage.visionTitle = String(formData.get("visionTitle") || "").trim();
  settings.studioPage.visionBody = String(formData.get("visionBody") || "").trim();
  settings.studioPage.cultureTitle = String(formData.get("cultureTitle") || "").trim();
  settings.studioPage.cultureBody = String(formData.get("cultureBody") || "").trim();
  settings.studioPage.ctaTitle = String(formData.get("ctaTitle") || "").trim();
  settings.studioPage.ctaLabel = String(formData.get("ctaLabel") || "").trim();
  settings.studioPage.ctaHref = String(formData.get("ctaHref") || "").trim();
  settings.studioPage.stats = [0, 1, 2, 3].map((index) => ({
    label: String(formData.get(`statLabel${index}`) || "").trim(),
    value: String(formData.get(`statValue${index}`) || "").trim(),
  }));

  await saveSiteSettings(settings);
  revalidatePublicSite();
  redirect("/admin/settings?saved=studio");
}

export async function saveJournalPageAction(formData: FormData) {
  await requireAdmin();
  const settings = await getSiteSettings();

  settings.journalPage.title = String(formData.get("title") || "").trim();
  settings.journalPage.subtitle = String(formData.get("subtitle") || "").trim();
  settings.journalPage.heroImage =
    (await resolveSiteImageUpload(formData, "heroImageUpload", "blog/hero", "")) ||
    String(formData.get("heroImage") || settings.journalPage.heroImage || "").trim();
  settings.journalPage.emptyTitle = String(formData.get("emptyTitle") || "").trim();
  settings.journalPage.emptyBody = String(formData.get("emptyBody") || "").trim();
  settings.journalPage.seoTitle = String(formData.get("seoTitle") || "").trim();
  settings.journalPage.seoDescription = String(formData.get("seoDescription") || "").trim();
  settings.journalPage.seoImage =
    (await resolveSiteImageUpload(formData, "seoImageUpload", "blog/seo", "")) ||
    String(formData.get("seoImage") || settings.journalPage.seoImage || "").trim();

  await saveSiteSettings(settings);
  revalidatePublicSite();
  redirect("/admin/settings?saved=journal");
}

export async function saveContactPageAction(formData: FormData) {
  await requireAdmin();
  const settings = await getSiteSettings();

  settings.contactPage.title = String(formData.get("title") || "").trim();
  settings.contactPage.subtitle = String(formData.get("subtitle") || "").trim();
  settings.contactPage.serviceOptions = linesToList(formData.get("serviceOptions"));
  settings.contactPage.budgetOptions = linesToList(formData.get("budgetOptions"));
  settings.contactPage.successTitle = String(formData.get("successTitle") || "").trim();
  settings.contactPage.successBody = String(formData.get("successBody") || "").trim();
  settings.contactPage.submitLabel = String(formData.get("submitLabel") || "").trim();

  await saveSiteSettings(settings);
  revalidatePublicSite();
  redirect("/admin/settings?saved=contact");
}

export async function saveAdminProfileAction(formData: FormData) {
  const admin = await requireAdmin();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!name || !email) {
    redirect("/admin/settings?authError=required");
  }

  if (password && password.length < 8) {
    redirect("/admin/settings?authError=password-length");
  }

  if (password && password !== confirmPassword) {
    redirect("/admin/settings?authError=password-match");
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing && existing.id !== admin.id) {
    redirect("/admin/settings?authError=email-taken");
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: {
      name,
      email,
      ...(password ? { passwordHash: hashPassword(password) } : {}),
    },
  });

  redirect("/admin/settings?saved=admin");
}

export async function createProjectAction(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  if (!title) {
    redirect("/admin/projects/new?error=title");
  }

  const heroImage = await resolveProjectHeroImage(formData);
  const gallery = await resolveProjectGallery(formData);

  const project = await upsertProject({
    id: crypto.randomUUID(),
    title,
    slug: slugify(String(formData.get("slug") || title)),
    category: String(formData.get("category") || "").trim(),
    client: String(formData.get("client") || "").trim(),
    year: String(formData.get("year") || "").trim(),
    services: linesToList(formData.get("services")),
    description: String(formData.get("description") || "").trim(),
    fullDescription: String(formData.get("fullDescription") || "").trim(),
    heroImage,
    gallery,
    tags: linesToList(formData.get("tags")),
    featured: parseBoolean(formData.get("featured")),
    published: parseBoolean(formData.get("published")),
    sortOrder: parseNumber(formData.get("sortOrder"), 0),
  });

  revalidatePublicSite();
  revalidatePath(`/work/${project.slug}`);
  redirect(`/admin/projects/${project.id}?saved=1`);
}

export async function updateProjectAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const current = id ? await getProjectById(id) : null;
  if (!current) {
    redirect("/admin/projects?error=missing");
  }

  const title = String(formData.get("title") || "").trim();
  const slug = slugify(String(formData.get("slug") || title));
  const heroImage = await resolveProjectHeroImage(formData, current.heroImage);
  const gallery = await resolveProjectGallery(formData);

  await upsertProject({
    id: current.id,
    title,
    slug,
    category: String(formData.get("category") || "").trim(),
    client: String(formData.get("client") || "").trim(),
    year: String(formData.get("year") || "").trim(),
    services: linesToList(formData.get("services")),
    description: String(formData.get("description") || "").trim(),
    fullDescription: String(formData.get("fullDescription") || "").trim(),
    heroImage,
    gallery,
    tags: linesToList(formData.get("tags")),
    featured: parseBoolean(formData.get("featured")),
    published: parseBoolean(formData.get("published")),
    sortOrder: parseNumber(formData.get("sortOrder"), current.sortOrder),
    createdAt: current.createdAt,
  });

  revalidatePublicSite();
  revalidatePath(`/work/${current.slug}`);
  revalidatePath(`/work/${slug}`);
  redirect(`/admin/projects/${id}?saved=1`);
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const current = id ? await getProjectById(id) : null;
  if (id) {
    await deleteProjectById(id);
  }
  revalidatePublicSite();
  if (current) {
    revalidatePath(`/work/${current.slug}`);
  }
  redirect("/admin/projects?deleted=1");
}

export async function createJournalPostAction(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();

  if (!title) {
    redirect("/admin/journal/new?error=title");
  }

  const coverImage = await resolveJournalCoverImage(formData);
  const ogImage =
    (await resolveSiteImageUpload(formData, "ogImageUpload", "blog/og", "")) ||
    String(formData.get("ogImage") || coverImage).trim();

  const post = await upsertJournalPost({
    id: crypto.randomUUID(),
    title,
    slug: slugify(String(formData.get("slug") || title)),
    category: String(formData.get("category") || "").trim(),
    authorName: String(formData.get("authorName") || "Studio Editorial").trim(),
    excerpt: String(formData.get("excerpt") || "").trim(),
    content: String(formData.get("content") || "").trim(),
    coverImage,
    tags: linesToList(formData.get("tags")),
    seoTitle: String(formData.get("seoTitle") || "").trim(),
    seoDescription: String(formData.get("seoDescription") || "").trim(),
    seoKeywords: String(formData.get("seoKeywords") || "").trim(),
    canonicalUrl: String(formData.get("canonicalUrl") || "").trim(),
    ogImage,
    published: parseBoolean(formData.get("published")),
  });

  revalidatePublicSite();
  revalidatePath(`/journal/${post.slug}`);
  revalidatePath(`/blog/${post.slug}`);
  redirect(`/admin/journal/${post.id}?saved=1`);
}

export async function updateJournalPostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const current = id ? await getJournalPostById(id) : null;

  if (!current) {
    redirect("/admin/journal?error=missing");
  }

  const title = String(formData.get("title") || "").trim();
  if (!title) {
    redirect(`/admin/journal/${id}?error=title`);
  }

  const slug = slugify(String(formData.get("slug") || title));
  const coverImage = await resolveJournalCoverImage(formData, current.coverImage);
  const ogImage =
    (await resolveSiteImageUpload(formData, "ogImageUpload", "blog/og", "")) ||
    String(formData.get("ogImage") || current.ogImage || coverImage).trim();

  await upsertJournalPost({
    id: current.id,
    title,
    slug,
    category: String(formData.get("category") || "").trim(),
    authorName: String(formData.get("authorName") || current.authorName || "Studio Editorial").trim(),
    excerpt: String(formData.get("excerpt") || "").trim(),
    content: String(formData.get("content") || "").trim(),
    coverImage,
    tags: linesToList(formData.get("tags")),
    seoTitle: String(formData.get("seoTitle") || "").trim(),
    seoDescription: String(formData.get("seoDescription") || "").trim(),
    seoKeywords: String(formData.get("seoKeywords") || "").trim(),
    canonicalUrl: String(formData.get("canonicalUrl") || "").trim(),
    ogImage,
    published: parseBoolean(formData.get("published")),
    createdAt: current.createdAt,
  });

  revalidatePublicSite();
  revalidatePath(`/journal/${current.slug}`);
  revalidatePath(`/journal/${slug}`);
  revalidatePath(`/blog/${current.slug}`);
  revalidatePath(`/blog/${slug}`);
  redirect(`/admin/journal/${id}?saved=1`);
}

export async function deleteJournalPostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const current = id ? await getJournalPostById(id) : null;
  if (id) {
    await deleteJournalPostById(id);
  }
  revalidatePublicSite();
  if (current) {
    revalidatePath(`/journal/${current.slug}`);
    revalidatePath(`/blog/${current.slug}`);
  }
  redirect("/admin/journal?deleted=1");
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "read") as "new" | "read" | "replied";
  if (id) {
    await updateInquiryStatus(id, status);
  }
  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  redirect("/admin/inquiries?updated=1");
}
