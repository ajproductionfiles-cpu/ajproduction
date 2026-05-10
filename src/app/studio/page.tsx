import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

export default async function StudioPage() {
  const settings = await getSiteSettings();
  const shell = getPublicLayoutShell(settings);
  const page = settings.studioPage;

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="bg-white pb-32 pt-24">
        <section className="page-shell section-stack text-center">
          <p className="eyebrow justify-center before:hidden fade-up-enter">Studio</p>
          <h1 className="display-hero fade-up-enter delay-1 mx-auto max-w-[12ch]">{page.title}</h1>
          <p className="body-large fade-up-enter delay-2 mx-auto mt-6 max-w-[48rem]">{page.subtitle}</p>
        </section>

        <section className="page-shell section-stack-tight">
          <div className="hero-frame relative aspect-[16/9] bg-[var(--surface-soft)]">
            <SmartImage
              src={page.image}
              alt={page.title}
              fill
              priority
              sizes="(min-width: 1100px) 1100px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="surface-card p-8 md:p-10">
              <p className="eyebrow">Vision</p>
              <h2 className="section-title mt-5">{page.visionTitle}</h2>
              <p className="body-copy mt-5">{page.visionBody}</p>
            </article>
            <article className="surface-card p-8 md:p-10">
              <p className="eyebrow">Culture</p>
              <h2 className="section-title mt-5">{page.cultureTitle}</h2>
              <p className="body-copy mt-5">{page.cultureBody}</p>
            </article>
          </div>
        </section>

        <section className="bg-[var(--surface-soft)]">
          <div className="page-shell section-stack-tight">
            <div className="grid gap-5 md:grid-cols-4">
              {page.stats.map((stat) => (
                <article key={stat.label} className="surface-card p-6 text-center">
                  <p className="metric-value">{stat.value}</p>
                  <p className="metric-label mt-3">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-shell section-stack-tight text-center">
          <h2 className="display-title mx-auto max-w-[14ch]">{page.ctaTitle}</h2>
          <div className="mt-8">
            <Link href={page.ctaHref} className="studio-pill-primary">
              {page.ctaLabel}
            </Link>
          </div>
        </section>
      </main>
      <Footer brandName={shell.logoLabel} logoImage={shell.logoImage} groups={shell.footerGroups} legalLinks={shell.legalLinks} copyrightText={shell.copyrightText} locationLabel={shell.locationLabel} />
    </>
  );
}
