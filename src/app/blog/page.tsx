import type { Metadata } from "next";
import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getPublishedJournalPosts, getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const page = settings.journalPage;

  return {
    title: page.seoTitle || `${settings.brandName} Blog`,
    description: page.seoDescription || page.subtitle,
    openGraph: {
      title: page.seoTitle || `${settings.brandName} Blog`,
      description: page.seoDescription || page.subtitle,
      images: page.seoImage ? [{ url: page.seoImage }] : undefined,
      type: "website",
    },
  };
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 180))} min read`;
}

export default async function BlogPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getPublishedJournalPosts()]);
  const shell = getPublicLayoutShell(settings);
  const page = settings.journalPage;
  const [featured, ...rest] = posts;

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="bg-white pb-32 pt-24">
        <section className="page-shell section-stack">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow fade-up-enter">Editorial</p>
              <h1 className="display-hero fade-up-enter delay-1 mt-5 max-w-[10ch]">{page.title}</h1>
              <p className="body-large fade-up-enter delay-2 mt-6 max-w-[38rem]">{page.subtitle}</p>
            </div>
            <div className="hero-frame fade-up-enter delay-3 relative aspect-[16/10] bg-[var(--surface-soft)]">
              <SmartImage
                src={page.heroImage}
                alt={page.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="page-shell section-stack-tight">
          {featured ? (
            <div className="space-y-10">
              <Link href={`/blog/${featured.slug}`} className="group block surface-card-strong overflow-hidden p-4 md:p-5">
                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                  <div className="hero-frame relative aspect-[16/10] bg-white">
                    <SmartImage
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      sizes="(min-width: 1180px) 55vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="px-2 py-2">
                    <p className="eyebrow before:hidden text-[var(--brand-blue)]">{featured.category}</p>
                    <h2 className="display-title mt-5 text-[clamp(2.4rem,4vw,4rem)]">{featured.title}</h2>
                    <p className="body-copy mt-4">{featured.excerpt}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] font-medium text-[var(--text-muted)]">
                      <span>{featured.authorName}</span>
                      <span>{estimateReadTime(featured.content)}</span>
                      <span>{new Date(featured.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-[var(--surface-soft)] px-3 py-1.5 text-[12px] font-semibold text-[var(--text-secondary)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-8 inline-flex text-[16px] font-medium text-[var(--brand-blue)]">Read post ›</span>
                  </div>
                </div>
              </Link>

              {rest.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {rest.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group block surface-card overflow-hidden p-4">
                      <div className="hero-frame relative aspect-[4/3] bg-white">
                        <SmartImage
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="eyebrow mt-5 before:hidden">{post.category}</p>
                      <h3 className="card-title mt-4 transition group-hover:text-[var(--brand-blue)]">
                        {post.title}
                      </h3>
                      <p className="body-copy mt-3">{post.excerpt}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-4 text-[13px] font-medium text-[var(--text-muted)]">
                        <span>{post.authorName}</span>
                        <span>{estimateReadTime(post.content)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <section className="surface-card-strong rounded-[2.25rem] px-8 py-16 text-center">
              <h2 className="section-title">{page.emptyTitle}</h2>
              <p className="body-large mx-auto mt-4 max-w-[42rem]">{page.emptyBody}</p>
            </section>
          )}
        </section>
      </main>
      <Footer brandName={shell.logoLabel} logoImage={shell.logoImage} groups={shell.footerGroups} legalLinks={shell.legalLinks} copyrightText={shell.copyrightText} locationLabel={shell.locationLabel} />
    </>
  );
}
