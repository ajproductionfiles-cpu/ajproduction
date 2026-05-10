import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getSiteSettings } from "@/lib/site/data";
import { getPublicLayoutShell } from "@/lib/site/visibility";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `Terms of Use — ${settings.brandName}`,
    description: `Terms and conditions for using the ${settings.brandName} website and services.`,
  };
}

export default async function TermsOfUsePage() {
  const settings = await getSiteSettings();
  const shell = getPublicLayoutShell(settings);
  const brand = settings.brandName;

  return (
    <>
      <Header brandName={shell.brandName} logoImage={shell.logoImage} navItems={shell.navItems} showSearchIcon={shell.showSearchIcon} />
      <main className="bg-white pb-32 pt-28 text-[#1d1d1f]">
        <article className="mx-auto max-w-[720px] px-6 md:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Legal</p>
          <h1 className="mt-3 text-[40px] font-semibold tracking-tight md:text-[52px]">Terms of Use</h1>
          <p className="mt-4 text-[15px] text-[#6e6e73]">Last updated: May 10, 2026</p>

          <div className="mt-14 space-y-10 text-[17px] leading-[1.65] text-[#424245]">
            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Agreement</h2>
              <p>
                By accessing or using the website and online services of {brand}, you agree to these Terms of Use. If you do not
                agree, please do not use the site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Use of the site</h2>
              <p>You agree to use the site only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site. You may not attempt to gain unauthorized access to our systems, scrape the site in a manner that harms performance, or introduce malware.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Intellectual property</h2>
              <p>
                Unless otherwise noted, content on this site—including text, visuals, logos, and design—is owned by {brand} or
                its licensors and is protected by applicable intellectual property laws. You may not copy, modify, or distribute
                such content without prior written permission, except for temporary viewing in your browser as part of normal use.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Portfolio and case studies</h2>
              <p>
                Past work shown on this site is for illustrative purposes. It does not guarantee future results or availability of
                the same scope, timeline, or pricing for new engagements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Third-party links</h2>
              <p>
                The site may link to third-party websites or services. We are not responsible for their content or practices. Your
                use of third-party sites is at your own risk and subject to their terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Disclaimer</h2>
              <p>
                The site and its content are provided “as is” without warranties of any kind, express or implied, to the fullest
                extent permitted by law. We do not warrant that the site will be uninterrupted or error-free.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Limitation of liability</h2>
              <p>
                To the maximum extent permitted by law, {brand} and its team will not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your use of the site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Changes</h2>
              <p>
                We may update these terms from time to time. The “Last updated” date above will reflect changes. Continued use of
                the site after updates constitutes acceptance of the revised terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold text-[#1d1d1f]">Contact</h2>
              <p>
                For questions about these terms:{" "}
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
