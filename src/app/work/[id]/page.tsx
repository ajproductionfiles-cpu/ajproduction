import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SmartImage } from "@/components/ui/smart-image";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getProjectBySlug, getPublishedProjects, getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const [settings, project] = await Promise.all([getSiteSettings(), getProjectBySlug(id)]);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.heroImage ? [{ url: project.heroImage }] : undefined,
      type: "website",
    },
    alternates: {
      canonical: `${settings.metadataBase}/work/${project.slug}`,
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [settings, project, projects] = await Promise.all([
    getSiteSettings(),
    getProjectBySlug(id),
    getPublishedProjects(),
  ]);
  const shell = getPublicLayoutShell(settings);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = currentIndex >= 0 ? projects[(currentIndex + 1) % projects.length] : null;

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="bg-white pt-24">
        <Script
          id={`project-schema-${project.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              image: project.heroImage,
              creator: {
                "@type": "Organization",
                name: settings.brandName,
              },
            }),
          }}
        />

        <section className="relative overflow-hidden">
          <div className="relative aspect-[16/10] max-h-[90vh] overflow-hidden md:h-[82vh] md:aspect-auto">
            <SmartImage
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="page-shell absolute inset-x-0 bottom-12">
            <p className="eyebrow text-white/70 before:bg-white/30">
              {project.category} · {project.year}
            </p>
            <h1 className="display-hero mt-5 max-w-[10ch] text-white">{project.title}</h1>
          </div>
        </section>

        <section className="page-shell section-stack-tight">
          <Link href="/work" className="premium-link text-[15px]">
            ← Back to Work
          </Link>
        </section>

        <section className="page-shell section-stack-tight pt-0">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <article>
              <h2 className="section-title max-w-[16ch]">
                {project.description}
              </h2>
              <p className="body-large mt-8 max-w-[44rem]">{project.fullDescription}</p>
            </article>
            <aside className="surface-card h-fit p-8">
              <Meta title="Client" value={project.client} />
              <MetaList title="Services" values={project.services} />
              <Meta title="Year" value={project.year} />
              <MetaList title="Tags" values={project.tags} />
            </aside>
          </div>
        </section>

        <section className="page-shell section-stack-tight pt-0">
          <div className="space-y-6">
            {project.gallery.map((item, index) => (
              <div key={item.url + index} className="hero-frame relative aspect-[16/10] bg-[var(--surface-soft)]">
                {item.type === "video" ? (
                  <video src={item.url} controls playsInline preload="metadata" className="h-full w-full object-cover" />
                ) : (
                  <SmartImage
                    src={item.url}
                    alt={`${project.title} visual ${index + 1}`}
                    fill
                    sizes="(min-width: 1180px) 1180px, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {nextProject ? (
          <Link href={`/work/${nextProject.slug}`} className="mt-8 block border-t border-[var(--line-soft)] bg-[var(--surface-soft)] px-6 py-20 text-center">
            <p className="eyebrow justify-center before:hidden">Next Project</p>
            <h2 className="display-title mx-auto mt-5 max-w-[12ch]">{nextProject.title}</h2>
            <p className="body-copy mt-3">{nextProject.category}</p>
            <span className="mt-6 inline-flex text-[18px] font-medium text-[var(--brand-blue)]">View Case Study ›</span>
          </Link>
        ) : null}
      </main>
      <Footer brandName={shell.logoLabel} logoImage={shell.logoImage} groups={shell.footerGroups} legalLinks={shell.legalLinks} copyrightText={shell.copyrightText} locationLabel={shell.locationLabel} />
    </>
  );
}

function Meta({ title, value }: { title: string; value: string }) {
  return (
    <div className="pb-6 last:pb-0">
      <p className="metric-label">{title}</p>
      <p className="mt-2 text-[17px] font-medium text-[var(--text-primary)]">{value}</p>
    </div>
  );
}

function MetaList({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="pb-6 last:pb-0">
      <p className="metric-label">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((value) => (
          <span key={value} className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-[13px] text-[var(--text-primary)]">
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
