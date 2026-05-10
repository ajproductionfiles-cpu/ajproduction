import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ContactForm } from "@/components/contact/contact-form";
import { getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const shell = getPublicLayoutShell(settings);
  const page = settings.contactPage;

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="relative overflow-hidden bg-white pb-32 pt-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-[var(--brand-blue)]/6 blur-[90px]" />
          <div className="absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[rgba(155,122,54,0.08)] blur-[100px]" />
        </div>

        <section className="page-shell section-stack relative z-10">
          <div className="mx-auto max-w-[50rem] text-center">
            <p className="eyebrow justify-center before:hidden fade-up-enter">Start A Project</p>
            <h1 className="display-hero fade-up-enter delay-1 mt-5">{page.title}</h1>
            <p className="body-large fade-up-enter delay-2 mx-auto mt-6 max-w-[42rem]">
              {page.subtitle}
            </p>
          </div>

          <div className="fade-up-enter delay-3 mx-auto mt-12 max-w-[60rem]">
            <ContactForm
              services={page.serviceOptions}
              budgets={page.budgetOptions}
              successTitle={page.successTitle}
              successBody={page.successBody}
              submitLabel={page.submitLabel}
            />
          </div>
        </section>
      </main>
      <Footer brandName={shell.logoLabel} logoImage={shell.logoImage} groups={shell.footerGroups} legalLinks={shell.legalLinks} copyrightText={shell.copyrightText} locationLabel={shell.locationLabel} />
    </>
  );
}
