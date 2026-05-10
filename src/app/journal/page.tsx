import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getPublishedJournalPosts, getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

export default async function JournalPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getPublishedJournalPosts()]);
  const shell = getPublicLayoutShell(settings);
  const page = settings.journalPage;
  const [featured, ...rest] = posts;

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="bg-white pb-40 pt-24">
        <div className="mx-auto max-w-[1100px] px-6">
          <section className="py-20">
            <h1 className="text-[54px] font-semibold tracking-tight text-[#1d1d1f] md:text-[84px]">{page.title}</h1>
            <p className="mt-6 text-[22px] text-[#86868b] md:text-[28px]">{page.subtitle}</p>
          </section>

          {featured ? (
            <div className="space-y-16">
              <Link href={`/journal/${featured.slug}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] bg-[#f5f5f7]">
                  <SmartImage
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 1100px) 1100px, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-8 max-w-[760px]">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0066cc]">
                    {featured.category} · {new Date(featured.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                  <h2 className="mt-4 text-[38px] font-semibold leading-tight text-[#1d1d1f] md:text-[52px]">{featured.title}</h2>
                  <p className="mt-4 text-[18px] leading-relaxed text-[#86868b]">{featured.excerpt}</p>
                  <span className="mt-5 inline-flex text-[16px] font-medium text-[#0066cc]">Read article ›</span>
                </div>
              </Link>

              {rest.length > 0 ? (
                <div className="grid gap-10 md:grid-cols-2">
                  {rest.map((post) => (
                    <Link key={post.id} href={`/journal/${post.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#f5f5f7]">
                        <SmartImage
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">
                        {post.category} · {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                      <h3 className="mt-3 text-[28px] font-semibold text-[#1d1d1f] transition group-hover:text-[#0066cc]">{post.title}</h3>
                      <p className="mt-3 text-[16px] leading-relaxed text-[#86868b]">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <section className="rounded-[36px] bg-[#f5f5f7] px-8 py-16 text-center">
              <h2 className="text-[34px] font-semibold text-[#1d1d1f]">{page.emptyTitle}</h2>
              <p className="mx-auto mt-4 max-w-[660px] text-[18px] leading-relaxed text-[#86868b]">{page.emptyBody}</p>
            </section>
          )}
        </div>
      </main>
      <Footer brandName={shell.logoLabel} logoImage={shell.logoImage} groups={shell.footerGroups} legalLinks={shell.legalLinks} copyrightText={shell.copyrightText} locationLabel={shell.locationLabel} />
    </>
  );
}
