import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SmartImage } from "@/components/ui/smart-image";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const settings = await getSiteSettings();
  const service = settings.servicesPage.detailPages.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.navLabel,
    description: service.subtitle,
    openGraph: {
      title: service.navLabel,
      description: service.subtitle,
      images: service.heroImage ? [{ url: service.heroImage }] : undefined,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const settings = await getSiteSettings();
  const shell = getPublicLayoutShell(settings);
  const service = settings.servicesPage.detailPages.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const category =
    settings.servicesPage.categories.find((item) => normalize(item.title) === normalize(service.navLabel)) ||
    settings.servicesPage.categories.find((item) => normalize(item.title) === normalize(service.slug));

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="bg-[var(--surface-soft)] pb-24 pt-24">
        <Script
          id={`service-schema-${service.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: service.navLabel,
              description: service.subtitle,
              provider: {
                "@type": "Organization",
                name: settings.brandName,
                url: settings.metadataBase,
              },
              serviceType: service.navLabel,
            }),
          }}
        />

        <section className="page-shell section-stack-tight">
          <Link href="/services" className="premium-link text-[15px]">
            ← Back to services
          </Link>
        </section>

        <section className="page-shell-wide section-stack-tight pt-0">
          <div className="surface-dark overflow-hidden text-white">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_1.15fr]">
              <div className="relative flex flex-col justify-center px-8 py-14 md:px-12 md:py-[4.5rem]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(94,140,255,0.24),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,88,199,0.18),_transparent_38%)]" />
                <div className="relative z-10 max-w-[35rem]">
                  <p className="eyebrow text-white/56 before:bg-white/30">{service.eyebrow}</p>
                  <h1 className="display-hero mt-5 text-white">{service.title}</h1>
                  <p className="body-large mt-6 text-white/74">{service.subtitle}</p>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link href={service.ctaHref} className="studio-pill-primary">
                      {service.ctaLabel}
                    </Link>
                    <Link href="/work" className="studio-pill-secondary border-white/20 bg-white/10 text-white hover:border-white/[0.32] hover:bg-white/[0.14]">
                      See related work
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[360px] lg:min-h-[760px]">
                <SmartImage
                  src={service.heroImage}
                  alt={service.navLabel}
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014]/24 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="page-shell-wide section-stack-tight">
          <div className="grid gap-4 md:grid-cols-3">
            {service.metrics.map((metric) => (
              <article key={metric.label} className="surface-card p-6 md:p-7">
                <p className="metric-label">{metric.label}</p>
                <p className="metric-value mt-4">{metric.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-shell-wide section-stack-tight">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="surface-card p-8 md:p-10">
              <p className="eyebrow">Overview</p>
              <h2 className="section-title mt-5">{service.overviewTitle}</h2>
              <p className="body-copy mt-6">{service.overviewBody}</p>
            </article>

            <article className="surface-card p-8 md:p-10">
              <p className="eyebrow">Service Map</p>
              <h2 className="section-title mt-5">{service.featureTitle}</h2>
              <div className="mt-8 space-y-4">
                {service.features.map((feature, index) => (
                  <div key={feature.title} className="rounded-[1.5rem] border border-[var(--line-soft)] bg-white px-5 py-5">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--text-primary)] text-[13px] font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-[22px] font-semibold tracking-tight text-[var(--text-primary)]">
                          {feature.title}
                        </h3>
                        <p className="body-copy mt-2">
                          {feature.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        {category ? (
          <section className="page-shell-wide section-stack-tight pt-0">
            <div className="surface-card p-8 md:p-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow">Deliverables</p>
                  <h2 className="section-title mt-5">What can be included</h2>
                </div>
                <p className="body-copy max-w-[34rem]">
                  Every scope is tailored, but these are the kinds of outputs most teams ask us to build into the system.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--line-soft)] bg-[var(--surface-soft)] px-4 py-2 text-[14px] font-medium text-[var(--text-secondary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="page-shell section-stack-tight">
          <div className="surface-dark [--body-large-color:rgba(255,255,255,0.74)] [--display-title-color:#ffffff] [--eyebrow-color:rgba(255,255,255,0.58)] px-8 py-16 text-center md:px-12 md:py-20">
            <p className="eyebrow justify-center before:bg-white/30">Ready when you are</p>
            <h2 className="display-title mx-auto mt-5 max-w-[14ch]">{service.ctaTitle}</h2>
            <p className="body-large mx-auto mt-5 max-w-[44rem]">
              We can scope the engagement, define the rollout, and shape the first production-ready direction with you.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href={service.ctaHref} className="studio-pill-primary">
                {service.ctaLabel}
              </Link>
              <Link href="/contact" className="studio-pill-secondary border-white/20 bg-white/10 text-white hover:border-white/[0.32] hover:bg-white/[0.14]">
                Talk to the studio
              </Link>
            </div>
          </div>
        </section>
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

function normalize(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}
