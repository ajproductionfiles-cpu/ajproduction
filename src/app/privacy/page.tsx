import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `Privacy Policy — ${settings.brandName}`,
    description: `How ${settings.brandName} collects, uses, and protects your information.`,
  };
}

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  const shell = getPublicLayoutShell(settings);
  const brand = settings.brandName;

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="bg-white pb-32 pt-28 text-[#1d1d1f]">
        <article className="mx-auto max-w-[720px] px-6 md:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Legal</p>
          <h1 className="mt-3 text-[40px] font-semibold tracking-tight md:text-[52px]">Privacy Policy</h1>
          <p className="mt-4 text-[15px] text-[#6e6e73]">Last updated: May 10, 2026</p>

          <div className="mt-14 space-y-10 text-[17px] leading-[1.65] text-[#424245]">
            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Introduction</h2>
              <p>
                {brand} (“we,” “our,” or “us”) respects your privacy. This policy describes how we handle information when you
                visit our website, use our contact forms, or otherwise interact with us online.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Information we collect</h2>
              <p>We may collect:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="font-semibold text-[#1d1d1f]">Information you provide</strong>, such as your name, email
                  address, phone number, company, project details, and any message you send through our contact or inquiry
                  forms.
                </li>
                <li>
                  <strong className="font-semibold text-[#1d1d1f]">Technical data</strong>, such as browser type, device type,
                  general location (e.g. region), pages viewed, and referring URLs, collected through cookies and similar
                  technologies where applicable.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">How we use information</h2>
              <p>We use this information to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Respond to inquiries and provide client services;</li>
                <li>Operate, secure, and improve our website;</li>
                <li>Comply with legal obligations;</li>
                <li>Send transactional or service-related communications when appropriate.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Sharing</h2>
              <p>
                We do not sell your personal information. We may share data with trusted service providers who assist in hosting,
                analytics, or email delivery, subject to appropriate safeguards, or when required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Retention</h2>
              <p>
                We retain information only as long as needed for the purposes above, unless a longer period is required or
                permitted by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Your choices</h2>
              <p>
                Depending on your location, you may have rights to access, correct, or delete certain personal data, or to
                object to or restrict certain processing. Contact us using the details below to make a request.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Contact</h2>
              <p>
                Questions about this policy:{" "}
                <a href={`mailto:${settings.contactEmail}`} className="text-[#0066cc] hover:underline">
                  {settings.contactEmail}
                </a>
              </p>
            </section>

            <p className="border-t border-[#d2d2d7] pt-10 text-[14px] leading-relaxed text-[#86868b]">
              This page is provided for general information and is not legal advice. You should consult counsel for guidance
              specific to your situation.
            </p>
          </div>
        </article>
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
