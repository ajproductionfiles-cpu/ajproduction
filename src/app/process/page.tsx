import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProcessExperience } from "@/components/layout/process-experience";
import { getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

export default async function ProcessPage() {
  const settings = await getSiteSettings();
  const shell = getPublicLayoutShell(settings);

  return (
    <>
      <Header
        brandName={shell.brandName}
        logoImage={shell.logoImage}
        navItems={shell.navItems}
        showSearchIcon={shell.showSearchIcon}
      />
      <ProcessExperience page={settings.processPage} />
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
