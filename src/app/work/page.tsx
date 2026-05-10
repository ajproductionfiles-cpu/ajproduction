import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmartImage } from "@/components/ui/smart-image";
import { WorkGallery } from "@/components/work/work-gallery";
import { getPublishedProjects, getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

export default async function WorkPage() {
  const [settings, projects] = await Promise.all([getSiteSettings(), getPublishedProjects()]);
  const shell = getPublicLayoutShell(settings);
  const page = settings.workPage;

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="bg-white pb-32 pt-24">
        <section className="page-shell section-stack">
          <p className="eyebrow fade-up-enter">Portfolio</p>
          <h1 className="display-hero fade-up-enter delay-1 mt-5 max-w-[12ch]">{page.title}</h1>
          <p className="body-large fade-up-enter delay-2 mt-6 max-w-[44rem]">
            {page.subtitle}
          </p>
          <div className="hero-frame fade-up-enter delay-3 relative mt-12 aspect-[16/8.5] bg-[var(--surface-soft)]">
            <SmartImage
              src={page.heroImage}
              alt={page.title}
              fill
              priority
              sizes="(min-width: 1180px) 1180px, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="page-shell section-stack-tight">
          <WorkGallery projects={projects} />
        </section>

        <section className="page-shell section-stack-tight">
          <div className="surface-dark [--display-title-color:#ffffff] [--eyebrow-color:rgba(255,255,255,0.58)] px-8 py-16 text-center md:px-12 md:py-18">
            <p className="eyebrow justify-center before:bg-white/30">Next Engagement</p>
            <h2 className="display-title mx-auto mt-5 max-w-[14ch]">{page.ctaTitle}</h2>
            <div className="mt-8">
              <Link href={page.ctaHref} className="studio-pill-primary">
                {page.ctaLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer brandName={shell.logoLabel} logoImage={shell.logoImage} groups={shell.footerGroups} legalLinks={shell.legalLinks} copyrightText={shell.copyrightText} locationLabel={shell.locationLabel} />
    </>
  );
}
