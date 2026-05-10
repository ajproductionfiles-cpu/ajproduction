import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { Services } from "@/components/layout/services";
import { FeaturedWorkWall } from "@/components/layout/featured-work-wall";
import { Work } from "@/components/layout/work";
import { Footer } from "@/components/layout/footer";
import { getPublishedProjects, getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

export default async function Home() {
  const [settings, projects] = await Promise.all([getSiteSettings(), getPublishedProjects()]);
  const shell = getPublicLayoutShell(settings);
  const featuredProjects = projects
    .filter((project) => project.featured || project.published)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 3);

  return (
    <>
      <Header
        brandName={shell.brandName}
        logoImage={shell.logoImage}
        navItems={shell.navItems}
        showSearchIcon={shell.showSearchIcon}
      />
      <Hero
        title={settings.home.heroTitle}
        subtitle={settings.home.heroSubtitle}
        primaryCtaLabel={settings.home.primaryCtaLabel}
        primaryCtaHref={settings.home.primaryCtaHref}
        secondaryCtaLabel={settings.home.secondaryCtaLabel}
        secondaryCtaHref={settings.home.secondaryCtaHref}
        image={settings.home.heroImage}
      />
      <Services cards={settings.home.servicesCards} />
      <Work
        projects={featuredProjects}
        introText={settings.home.workIntroText}
        ctaLabel={settings.home.workCtaLabel}
        ctaHref={settings.home.workCtaHref}
      />
      <FeaturedWorkWall
        title={settings.home.featuredWall.title}
        subtitle={settings.home.featuredWall.subtitle}
        items={settings.home.featuredWall.items}
      />
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
