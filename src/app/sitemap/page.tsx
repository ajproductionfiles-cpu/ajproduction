import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getPublishedJournalPosts, getPublishedProjects, getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell, normalizeManagedPages, shouldIncludeUrlInSitemap } from "@/lib/site/visibility";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `Site Map — ${settings.brandName}`,
    description: `Browse every section of ${settings.brandName}: studio, work, services, and editorial.`,
  };
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 border-t border-[#d2d2d7] pt-10 text-[28px] font-semibold tracking-tight text-[#1d1d1f] first:mt-0 first:border-0 first:pt-0 md:text-[32px]">
      {children}
    </h2>
  );
}

function Subheading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#6e6e73]">{children}</h3>;
}

function LinkList({ items }: { items: { href: string; label: string }[] }) {
  if (items.length === 0) {
    return null;
  }
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item.href + item.label}>
          <Link href={item.href} className="text-[17px] text-[#0066cc] transition hover:underline">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function SiteMapPage() {
  const [settings, projects, posts] = await Promise.all([
    getSiteSettings(),
    getPublishedProjects(),
    getPublishedJournalPosts(),
  ]);
  const shell = getPublicLayoutShell(settings);
  const pages = normalizeManagedPages(settings.pageDirectory);

  const mainPages = pages.filter((p) => p.key !== "sitemap-html");
  const staticLinks = mainPages.map((p) => ({ href: p.href, label: p.label }));

  const workIndex = shouldIncludeUrlInSitemap("/work", settings.pageDirectory);
  const projectLinks = workIndex
    ? projects
        .filter((p) => p.published && shouldIncludeUrlInSitemap(`/work/${p.slug}`, settings.pageDirectory))
        .map((p) => ({ href: `/work/${p.slug}`, label: p.title }))
        .sort((a, b) => a.label.localeCompare(b.label))
    : [];

  const servicesIndex = shouldIncludeUrlInSitemap("/services", settings.pageDirectory);
  const serviceLinks = servicesIndex
    ? settings.servicesPage.detailPages
        .filter(
          (s) =>
            s.slug &&
            s.title &&
            shouldIncludeUrlInSitemap(`/services/${s.slug}`, settings.pageDirectory),
        )
        .map((s) => ({ href: `/services/${s.slug}`, label: s.title }))
        .sort((a, b) => a.label.localeCompare(b.label))
    : [];

  const blogListing = shouldIncludeUrlInSitemap("/blog", settings.pageDirectory);
  const journalListing = shouldIncludeUrlInSitemap("/journal", settings.pageDirectory);

  const blogPostLinks = blogListing
    ? posts
        .filter((post) => post.published && shouldIncludeUrlInSitemap(`/blog/${post.slug}`, settings.pageDirectory))
        .map((post) => ({ href: `/blog/${post.slug}`, label: post.title }))
    : [];

  const journalPostLinks = journalListing
    ? posts
        .filter((post) => post.published && shouldIncludeUrlInSitemap(`/journal/${post.slug}`, settings.pageDirectory))
        .map((post) => ({ href: `/journal/${post.slug}`, label: post.title }))
    : [];

  const xmlHref =
    settings.metadataBase.replace(/\/+$/, "") + "/sitemap.xml";

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="min-h-screen bg-[#fbfbfd] pb-32 pt-24 text-[#1d1d1f]">
        <div className="mx-auto max-w-[980px] px-6 md:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6e6e73]">Directory</p>
          <h1 className="mt-3 text-[48px] font-semibold leading-[1.05] tracking-tight md:text-[72px]">Site Map</h1>
          <p className="mt-5 max-w-[540px] text-[19px] leading-relaxed text-[#6e6e73] md:text-[21px]">
            {shell.brandName} — every public page in one place.
          </p>
          <p className="mt-8 text-[15px] leading-relaxed text-[#86868b]">
            For crawlers and feeds, use the{" "}
            <a href="/sitemap.xml" className="text-[#0066cc] hover:underline">
              XML sitemap
            </a>
            <span className="text-[#aeaeb2]"> · </span>
            <a href={xmlHref} className="text-[#0066cc] hover:underline">
              Absolute URL
            </a>
          </p>

          <SectionTitle>Explore</SectionTitle>
          <Subheading>Pages</Subheading>
          <LinkList items={staticLinks} />

          <SectionTitle>Work</SectionTitle>
          {workIndex ? (
            <>
              <Subheading>Portfolio</Subheading>
              <LinkList items={[{ href: "/work", label: "All work" }, ...projectLinks]} />
            </>
          ) : (
            <p className="mt-4 text-[15px] text-[#86868b]">This section is not published in the sitemap.</p>
          )}

          <SectionTitle>Services</SectionTitle>
          {servicesIndex ? (
            <>
              <Subheading>Overview &amp; detail</Subheading>
              <LinkList items={[{ href: "/services", label: "Services overview" }, ...serviceLinks]} />
            </>
          ) : (
            <p className="mt-4 text-[15px] text-[#86868b]">This section is not published in the sitemap.</p>
          )}

          <SectionTitle>Editorial</SectionTitle>
          {(blogListing || journalListing) && (
            <>
              {blogListing ? (
                <>
                  <Subheading>Blog</Subheading>
                  <LinkList items={[{ href: "/blog", label: "Blog home" }, ...blogPostLinks]} />
                </>
              ) : null}
              {journalListing ? (
                <>
                  <Subheading>Journal</Subheading>
                  <LinkList items={[{ href: "/journal", label: "Journal home" }, ...journalPostLinks]} />
                </>
              ) : null}
            </>
          )}
          {!blogListing && !journalListing ? (
            <p className="mt-4 text-[15px] text-[#86868b]">No editorial listings are enabled in the sitemap.</p>
          ) : null}
        </div>
      </main>
      <Footer
        brandName={shell.logoLabel}
        logoImage={shell.logoImage}
        groups={shell.footerGroups}
        legalLinks={shell.legalLinks}
        copyrightText={shell.copyrightText}
        locationLabel={shell.locationLabel}
      />
    </>
  );
}
