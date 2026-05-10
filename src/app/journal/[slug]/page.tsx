import Link from "next/link";
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

export default async function JournalDetailPage({
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

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="bg-white pb-32 pt-24">
        <article className="mx-auto max-w-[1100px] px-6 py-20">
          <Link href="/journal" className="text-[15px] text-[#86868b] transition hover:text-[#1d1d1f]">
            ← Back to Journal
          </Link>

          <div className="mt-10 max-w-[880px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0066cc]">
              {post.category} · {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
            <h1 className="mt-5 text-[48px] font-semibold tracking-tight text-[#1d1d1f] md:text-[84px]">{post.title}</h1>
            <p className="mt-6 text-[22px] leading-relaxed text-[#86868b] md:text-[30px]">{post.excerpt}</p>
          </div>

          <div className="relative mt-14 aspect-[16/9] overflow-hidden rounded-[36px] bg-[#f5f5f7]">
            <SmartImage
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1100px) 1100px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mx-auto mt-16 max-w-[760px] space-y-8">
            {paragraphs.map((paragraph, index) => (
              <p key={`${post.id}-${index}`} className="text-[18px] leading-[1.9] text-[#424245] md:text-[20px]">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {nextPost && nextPost.slug !== post.slug ? (
          <Link href={`/journal/${nextPost.slug}`} className="block border-t border-[#f0f0f2] bg-[#fafafc] px-6 py-20 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">Next Article</p>
            <h2 className="mt-4 text-[34px] font-semibold tracking-tight text-[#1d1d1f] md:text-[54px]">{nextPost.title}</h2>
            <span className="mt-5 inline-flex text-[16px] font-medium text-[#0066cc]">Continue reading ›</span>
          </Link>
        ) : null}
      </main>
      <Footer brandName={shell.logoLabel} logoImage={shell.logoImage} groups={shell.footerGroups} legalLinks={shell.legalLinks} copyrightText={shell.copyrightText} locationLabel={shell.locationLabel} />
    </>
  );
}
