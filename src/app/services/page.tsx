import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

export default async function ServicesPage() {
  const settings = await getSiteSettings();
  const shell = getPublicLayoutShell(settings);
  const page = settings.servicesPage;

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="bg-[var(--surface-soft)] pb-24 pt-24">
        <section className="page-shell section-stack text-center">
          <p className="eyebrow justify-center before:hidden">Services</p>
          <h1 className="display-hero mt-5">{page.title}</h1>
          <p className="body-large mx-auto mt-6 max-w-[52rem]">
            {page.subtitle}
          </p>
        </section>

        <section className="page-shell-wide section-stack-tight">
          <div className="grid gap-4 lg:grid-cols-2">
            {page.detailPages.map((service, index) => {
              const matchingHomeCard = settings.home.servicesCards.find(
                (card) => card.primaryHref === `/services/${service.slug}`,
              );

              return (
                <article
                  key={service.slug}
                  className="surface-card-strong panel-hover flex min-h-[40rem] flex-col overflow-hidden px-7 pt-9 text-left md:min-h-[43rem] md:px-10 md:pt-10"
                >
                  <div className="max-w-[31rem]">
                    <p className="eyebrow">{service.eyebrow}</p>
                    <h2 className="card-title mt-5">{service.navLabel}</h2>
                    <p className="body-large mt-4 max-w-[25rem]">{service.subtitle}</p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Link href={`/services/${service.slug}`} className="studio-pill-primary">
                        {matchingHomeCard?.primaryLabel || "Explore service"}
                      </Link>
                      <Link href={service.ctaHref} className="studio-pill-secondary">
                        {matchingHomeCard?.secondaryLabel ||
                          (index === 0
                            ? "Start brand project"
                            : index === 1
                              ? "Plan campaign"
                              : index === 2
                                ? "Start AI concept"
                                : "Build website")}
                      </Link>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-1 items-end">
                    <div className="hero-frame relative aspect-[16/10] w-full bg-[var(--surface-soft)]">
                      <SmartImage
                        src={service.heroImage}
                        alt={service.navLabel}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="page-shell section-stack-tight">
          <div className="surface-dark [--body-large-color:rgba(255,255,255,0.74)] [--display-title-color:#ffffff] [--eyebrow-color:rgba(255,255,255,0.58)] px-8 py-16 text-center md:px-12 md:py-20">
            <p className="eyebrow justify-center before:bg-white/30">Build with the studio</p>
            <h2 className="display-title mx-auto mt-5 max-w-[14ch]">{page.ctaTitle}</h2>
            <p className="body-large mx-auto mt-5 max-w-[44rem]">
              From identity and launch films to AI visuals and flagship websites, we design systems that look premium and perform under real-world pressure.
            </p>
            <div className="mt-9">
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
