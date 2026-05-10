import type { MetadataRoute } from "next";
import { getPublishedJournalPosts, getPublishedProjects, getSiteSettings } from "@/lib/site/data";
import { getSitemapPaths, shouldIncludeUrlInSitemap } from "@/lib/site/visibility";

function absoluteUrl(metadataBase: string, pathname: string) {
  const base = metadataBase.replace(/\/+$/, "");
  if (pathname === "/" || pathname === "") {
    return base;
  }
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, projects, posts] = await Promise.all([
    getSiteSettings(),
    getPublishedProjects(),
    getPublishedJournalPosts(),
  ]);

  const shellPaths = getSitemapPaths(settings.pageDirectory);
  const routes = shellPaths.map((href) => {
    const pathSeg = href === "/" ? "" : href;
    return {
      url: absoluteUrl(settings.metadataBase, href),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: pathSeg === "" ? 1 : 0.8,
    };
  });

  const projectRoutes = projects
    .filter((project) => shouldIncludeUrlInSitemap(`/work/${project.slug}`, settings.pageDirectory))
    .map((project) => ({
      url: absoluteUrl(settings.metadataBase, `/work/${project.slug}`),
      lastModified: new Date(project.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const postRoutes = posts
    .filter((post) => shouldIncludeUrlInSitemap(`/journal/${post.slug}`, settings.pageDirectory))
    .map((post) => ({
      url: absoluteUrl(settings.metadataBase, `/journal/${post.slug}`),
      lastModified: new Date(post.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));

  const blogRoutes = posts
    .filter((post) => shouldIncludeUrlInSitemap(`/blog/${post.slug}`, settings.pageDirectory))
    .map((post) => ({
      url: absoluteUrl(settings.metadataBase, `/blog/${post.slug}`),
      lastModified: new Date(post.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const serviceRoutes = shouldIncludeUrlInSitemap("/services", settings.pageDirectory)
    ? settings.servicesPage.detailPages
        .filter((service) => service.slug && shouldIncludeUrlInSitemap(`/services/${service.slug}`, settings.pageDirectory))
        .map((service) => ({
          url: absoluteUrl(settings.metadataBase, `/services/${service.slug}`),
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.72,
        }))
    : [];

  return [...routes, ...serviceRoutes, ...projectRoutes, ...postRoutes, ...blogRoutes];
}
