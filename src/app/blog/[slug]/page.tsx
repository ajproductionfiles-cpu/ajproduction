import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SmartImage } from "@/components/ui/smart-image";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getJournalPostBySlug, getPublishedJournalPosts, getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

function splitContent(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 180))} min read`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [settings, post] = await Promise.all([getSiteSettings(), getJournalPostBySlug(slug)]);

  if (!post) {
    return {};
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || settings.siteDescription;
  const canonical = post.canonicalUrl || `${settings.metadataBase}/blog/${post.slug}`;
  const image = post.ogImage || post.coverImage;

  return {
    title,
    description,
    keywords: post.seoKeywords || undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [settings, post, posts] = await Promise.all([
    getSiteSettings(),
    getJournalPostBySlug(slug),
    getPublishedJournalPosts(),
  ]);
  const shell = getPublicLayoutShell(settings);

  if (!post || !post.published) {
    notFound();
  }

  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const nextPost = currentIndex >= 0 ? posts[(currentIndex + 1) % posts.length] : null;
  const paragraphs = splitContent(post.content);
  const canonical = post.canonicalUrl || `${settings.metadataBase}/blog/${post.slug}`;

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="bg-white pb-28 pt-24">
        <Script
          id={`article-schema-${post.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.seoTitle || post.title,
              description: post.seoDescription || post.excerpt,
              image: post.ogImage || post.coverImage,
              author: {
                "@type": "Person",
                name: post.authorName,
              },
              publisher: {
                "@type": "Organization",
                name: settings.brandName,
              },
              datePublished: post.createdAt,
              mainEntityOfPage: canonical,
            }),
          }}
        />

        <article className="page-shell section-stack">
          <Link href="/blog" className="premium-link text-[15px]">
            ← Back to Blog
          </Link>

          <div className="mt-10 max-w-[56rem]">
            <p className="eyebrow before:hidden text-[var(--brand-blue)]">
              {post.category}
            </p>
            <h1 className="display-hero mt-5 max-w-[12ch]">{post.title}</h1>
            <p className="body-large mt-6 max-w-[46rem]">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[14px] font-medium text-[var(--text-muted)]">
              <span>{post.authorName}</span>
              <span>{estimateReadTime(post.content)}</span>
              <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[var(--surface-soft)] px-3 py-1.5 text-[12px] font-semibold text-[var(--text-secondary)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-frame relative mt-14 aspect-[16/9] bg-[var(--surface-soft)]">
            <SmartImage
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1180px) 1180px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mx-auto mt-16 max-w-[48rem] space-y-8">
            {paragraphs.map((paragraph, index) => (
              <p key={`${post.id}-${index}`} className="body-copy-strong text-[1.08rem] md:text-[1.18rem]">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {nextPost && nextPost.slug !== post.slug ? (
          <Link href={`/blog/${nextPost.slug}`} className="mt-8 block border-t border-[var(--line-soft)] bg-[var(--surface-soft)] px-6 py-20 text-center">
            <p className="eyebrow justify-center before:hidden">Next Article</p>
            <h2 className="display-title mx-auto mt-5 max-w-[12ch]">{nextPost.title}</h2>
            <span className="mt-5 inline-flex text-[16px] font-medium text-[var(--brand-blue)]">Continue reading ›</span>
          </Link>
        ) : null}
      </main>
      <Footer brandName={shell.logoLabel} logoImage={shell.logoImage} groups={shell.footerGroups} legalLinks={shell.legalLinks} copyrightText={shell.copyrightText} locationLabel={shell.locationLabel} />
    </>
  );
}
