import {
  saveAdminProfileAction,
  saveBrandSettingsAction,
  saveContactPageAction,
  saveExperienceSettingsAction,
  saveFooterSettingsAction,
  saveHeaderSettingsAction,
  saveHomeSettingsAction,
  saveJournalPageAction,
  savePageVisibilityAction,
  saveProcessPageAction,
  saveServicesPageAction,
  saveStudioPageAction,
  saveWorkPageAction,
} from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { requireAdmin } from "@/lib/auth";
import { linksToMultiline, listToMultiline } from "@/lib/forms";
import { getSiteSettings } from "@/lib/site/data";

export default async function AdminSettingsPage() {
  const [settings, admin] = await Promise.all([getSiteSettings(), requireAdmin()]);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-[#2c2c2e] bg-[#1c1c1e] p-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">
          Website Studio
        </p>
        <h1 className="mt-3 text-[34px] font-semibold tracking-tight text-white md:text-[48px]">
          Edit Every Public-Facing Detail
        </h1>
        <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[#a1a1a6]">
          Branding, navigation, hero messaging, services copy, process content, studio story, journal empty states, footer links, and contact flow settings all live here.
        </p>
      </section>

      <section className="rounded-[28px] border border-[#2c2c2e] bg-[#151517] p-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">
          Page Controls
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            ["Visibility", "#page-visibility"],
            ["Home", "#home-page"],
            ["Services", "#services-page"],
            ["Work", "#work-page"],
            ["Studio", "#studio-page"],
            ["Process", "#process-page"],
            ["Blog", "#journal-page"],
            ["Contact", "#contact-page"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="rounded-full border border-[#2c2c2e] px-4 py-2 text-[13px] font-semibold text-white transition hover:border-[#3c3c3e]">
              {label}
            </a>
          ))}
        </div>
      </section>

      <Grid>
        <Card id="admin-access" title="Admin Access" description="Update the login identity for this dashboard. Leave password blank to keep the current one.">
          <form action={saveAdminProfileAction} className="space-y-4">
            <Field label="Admin Name"><input name="name" defaultValue={admin.name} className="admin-input" /></Field>
            <Field label="Login Email"><input name="email" type="email" defaultValue={admin.email} className="admin-input" /></Field>
            <Field label="New Password"><input name="password" type="password" className="admin-input" /></Field>
            <Field label="Confirm New Password"><input name="confirmPassword" type="password" className="admin-input" /></Field>
            <SubmitButton label="Save Admin Access" className="admin-button" />
          </form>
        </Card>

        <Card id="brand-seo" title="Brand & SEO" description="Global identity, logo, metadata, and contact information.">
          <form action={saveBrandSettingsAction} encType="multipart/form-data" className="space-y-4">
            <Field label="Brand Name"><input name="brandName" defaultValue={settings.brandName} className="admin-input" /></Field>
            <Field label="Brand Logo URL"><input name="brandLogoUrl" defaultValue={settings.brandLogoUrl} className="admin-input" /></Field>
            <Field label="Brand Logo Upload">
              <input
                name="brandLogoUpload"
                type="file"
                accept="image/*"
                className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
              />
            </Field>
            <Field label="Site Title"><input name="siteTitle" defaultValue={settings.siteTitle} className="admin-input" /></Field>
            <Field label="Site Description"><textarea name="siteDescription" defaultValue={settings.siteDescription} rows={3} className="admin-input" /></Field>
            <Field label="Metadata Base"><input name="metadataBase" defaultValue={settings.metadataBase} className="admin-input" /></Field>
            <Field label="Contact Email"><input name="contactEmail" defaultValue={settings.contactEmail} className="admin-input" /></Field>
            <Field label="Contact Phone"><input name="contactPhone" defaultValue={settings.contactPhone} className="admin-input" /></Field>
            <Field label="Location Label"><input name="locationLabel" defaultValue={settings.locationLabel} className="admin-input" /></Field>
            <Field label="Copyright"><input name="copyrightText" defaultValue={settings.copyrightText} className="admin-input" /></Field>
            <Field label="Notification Email"><input name="notificationEmail" defaultValue={settings.notificationEmail} className="admin-input" /></Field>
            <SubmitButton label="Save Brand Settings" className="admin-button" />
          </form>
        </Card>

        <Card id="experience" title="Experience" description="Performance-sensitive experience toggles.">
          <form action={saveExperienceSettingsAction} className="space-y-4">
            <Toggle label="Enable Custom Cursor" name="showCustomCursor" defaultChecked={settings.showCustomCursor} />
            <Toggle label="Show Search Icon in Header" name="showSearchIcon" defaultChecked={settings.showSearchIcon} />
            <Toggle label="Enable Smooth Scroll" name="enableSmoothScroll" defaultChecked={settings.enableSmoothScroll} />
            <SubmitButton label="Save Experience Settings" className="admin-button" />
          </form>
        </Card>

        <Card
          id="page-visibility"
          title="Navigation & sitemap"
          description="Hide links from the header or footer while keeping pages live. Control which URLs appear in sitemap.xml (still reachable by direct link)."
        >
          <form action={savePageVisibilityAction} className="space-y-4">
            <div className="overflow-x-auto rounded-[22px] border border-[#2c2c2e]">
              <table className="w-full min-w-[520px] text-left text-[13px] text-[#d2d2d7]">
                <thead className="border-b border-[#2c2c2e] bg-[#151517] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">
                  <tr>
                    <th className="px-4 py-3">Page</th>
                    <th className="px-4 py-3">Header</th>
                    <th className="px-4 py-3">Footer</th>
                    <th className="px-4 py-3">Sitemap</th>
                  </tr>
                </thead>
                <tbody>
                  {settings.pageDirectory.map((page) => (
                    <tr key={page.key} className="border-b border-[#2c2c2e] last:border-0">
                      <td className="px-4 py-3 font-medium text-white">
                        <span className="block">{page.label}</span>
                        <span className="mt-0.5 block text-[11px] font-normal text-[#86868b]">{page.href}</span>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          name={`pageVis_${page.key}_header`}
                          defaultChecked={page.showInHeader}
                          className="h-4 w-4 accent-[#0a84ff]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          name={`pageVis_${page.key}_footer`}
                          defaultChecked={page.showInFooter}
                          className="h-4 w-4 accent-[#0a84ff]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          name={`pageVis_${page.key}_sitemap`}
                          defaultChecked={page.includeInSitemap}
                          className="h-4 w-4 accent-[#0a84ff]"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <SubmitButton label="Save navigation & sitemap" className="admin-button" />
          </form>
        </Card>
      </Grid>

      <Grid>
        <Card id="header-settings" title="Header" description="Logo label and navigation links. Use `Label|/href` per line.">
          <form action={saveHeaderSettingsAction} className="space-y-4">
            <Field label="Logo Label"><input name="logoLabel" defaultValue={settings.header.logoLabel} className="admin-input" /></Field>
            <Field label="Navigation Links"><textarea name="navItems" defaultValue={linksToMultiline(settings.header.navItems)} rows={8} className="admin-input" /></Field>
            <SubmitButton label="Save Header" className="admin-button" />
          </form>
        </Card>

        <Card id="footer-settings" title="Footer" description="Footer groups and legal links. Use `Label|/href` per line.">
          <form action={saveFooterSettingsAction} className="space-y-4">
            <Field label="Group One Title"><input name="footerGroupOneTitle" defaultValue={settings.footer.groups[0]?.title} className="admin-input" /></Field>
            <Field label="Group One Links"><textarea name="footerGroupOneLinks" defaultValue={linksToMultiline(settings.footer.groups[0]?.links || [])} rows={6} className="admin-input" /></Field>
            <Field label="Group Two Title"><input name="footerGroupTwoTitle" defaultValue={settings.footer.groups[1]?.title} className="admin-input" /></Field>
            <Field label="Group Two Links"><textarea name="footerGroupTwoLinks" defaultValue={linksToMultiline(settings.footer.groups[1]?.links || [])} rows={6} className="admin-input" /></Field>
            <Field label="Group Three Title"><input name="footerGroupThreeTitle" defaultValue={settings.footer.groups[2]?.title} className="admin-input" /></Field>
            <Field label="Group Three Links"><textarea name="footerGroupThreeLinks" defaultValue={linksToMultiline(settings.footer.groups[2]?.links || [])} rows={6} className="admin-input" /></Field>
            <Field label="Legal Links"><textarea name="legalLinks" defaultValue={linksToMultiline(settings.footer.legalLinks)} rows={4} className="admin-input" /></Field>
            <SubmitButton label="Save Footer" className="admin-button" />
          </form>
        </Card>
      </Grid>

      <Card id="home-page" title="Homepage" description="Hero content, service cards, work CTA, and the animated featured wall before the footer.">
        <form action={saveHomeSettingsAction} encType="multipart/form-data" className="space-y-6">
          <Grid>
            <Field label="Hero Title"><input name="heroTitle" defaultValue={settings.home.heroTitle} className="admin-input" /></Field>
            <Field label="Hero Subtitle"><textarea name="heroSubtitle" defaultValue={settings.home.heroSubtitle} rows={3} className="admin-input" /></Field>
            <Field label="Primary CTA Label"><input name="primaryCtaLabel" defaultValue={settings.home.primaryCtaLabel} className="admin-input" /></Field>
            <Field label="Primary CTA Link"><input name="primaryCtaHref" defaultValue={settings.home.primaryCtaHref} className="admin-input" /></Field>
            <Field label="Secondary CTA Label"><input name="secondaryCtaLabel" defaultValue={settings.home.secondaryCtaLabel} className="admin-input" /></Field>
            <Field label="Secondary CTA Link"><input name="secondaryCtaHref" defaultValue={settings.home.secondaryCtaHref} className="admin-input" /></Field>
            <Field label="Hero Image URL"><input name="heroImage" defaultValue={settings.home.heroImage} className="admin-input" /></Field>
            <Field label="Hero Image Upload">
              <input
                name="heroImageUpload"
                type="file"
                accept="image/*"
                className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
              />
            </Field>
            <Field label="Work Intro"><input name="workIntroText" defaultValue={settings.home.workIntroText} className="admin-input" /></Field>
            <Field label="Work CTA Label"><input name="workCtaLabel" defaultValue={settings.home.workCtaLabel} className="admin-input" /></Field>
            <Field label="Work CTA Link"><input name="workCtaHref" defaultValue={settings.home.workCtaHref} className="admin-input" /></Field>
          </Grid>

          <div className="grid gap-6 lg:grid-cols-2">
            {settings.home.servicesCards.map((card, index) => (
              <div key={index} className="rounded-[24px] border border-[#2c2c2e] bg-[#151517] p-5">
                <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
                  Service Card {index + 1}
                </p>
                <div className="space-y-3">
                  <Field label="Title"><input name={`serviceCardTitle${index}`} defaultValue={card.title} className="admin-input" /></Field>
                  <Field label="Description"><textarea name={`serviceCardDescription${index}`} defaultValue={card.description} rows={3} className="admin-input" /></Field>
                  <Field label="Image URL"><input name={`serviceCardImage${index}`} defaultValue={card.image} className="admin-input" /></Field>
                  <Field label="Image Upload">
                    <input
                      name={`serviceCardImageUpload${index}`}
                      type="file"
                      accept="image/*"
                      className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
                    />
                  </Field>
                  <Field label="Primary Label"><input name={`serviceCardPrimaryLabel${index}`} defaultValue={card.primaryLabel} className="admin-input" /></Field>
                  <Field label="Primary Link"><input name={`serviceCardPrimaryHref${index}`} defaultValue={card.primaryHref} className="admin-input" /></Field>
                  <Field label="Secondary Label"><input name={`serviceCardSecondaryLabel${index}`} defaultValue={card.secondaryLabel} className="admin-input" /></Field>
                  <Field label="Secondary Link"><input name={`serviceCardSecondaryHref${index}`} defaultValue={card.secondaryHref} className="admin-input" /></Field>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-[28px] border border-[#2c2c2e] bg-[#151517] p-5">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
                Featured Wall
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#86868b]">
                This is the auto-scrolling multi-cover section shown before the footer on the homepage.
              </p>
            </div>
            <Grid>
              <Field label="Section Title"><input name="featuredWallTitle" defaultValue={settings.home.featuredWall.title} className="admin-input" /></Field>
              <Field label="Section Subtitle"><textarea name="featuredWallSubtitle" defaultValue={settings.home.featuredWall.subtitle} rows={3} className="admin-input" /></Field>
            </Grid>

            <div className="grid gap-6 xl:grid-cols-2">
              {settings.home.featuredWall.items.map((item, index) => (
                <div key={index} className="rounded-[24px] border border-[#2c2c2e] bg-[#111214] p-5">
                  <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
                    Wall Card {index + 1}
                  </p>
                  <div className="space-y-3">
                    <Field label="Title"><input name={`featuredWallItemTitle${index}`} defaultValue={item.title} className="admin-input" /></Field>
                    <Field label="Subtitle"><textarea name={`featuredWallItemSubtitle${index}`} defaultValue={item.subtitle} rows={3} className="admin-input" /></Field>
                    <Field label="Badge"><input name={`featuredWallItemBadge${index}`} defaultValue={item.badge} className="admin-input" /></Field>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Field label="CTA Label"><input name={`featuredWallItemCtaLabel${index}`} defaultValue={item.ctaLabel} className="admin-input" /></Field>
                      <Field label="CTA Link"><input name={`featuredWallItemCtaHref${index}`} defaultValue={item.ctaHref} className="admin-input" /></Field>
                    </div>
                    <Field label="Media Type">
                      <select name={`featuredWallItemMediaType${index}`} defaultValue={item.mediaType} className="admin-input">
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </Field>
                    <Field label="Media URL"><input name={`featuredWallMediaUrl${index}`} defaultValue={item.mediaUrl} className="admin-input" /></Field>
                    <Field label="Upload Cover">
                      <input
                        name={`featuredWallMediaUpload${index}`}
                        type="file"
                        accept="image/*,video/*"
                        className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SubmitButton label="Save Homepage" className="admin-button" />
        </form>
      </Card>

      <Grid>
        <Card id="services-page" title="Services Page" description="Category titles, dedicated service detail pages, and uploads.">
          <form action={saveServicesPageAction} encType="multipart/form-data" className="space-y-4">
            <Field label="Title"><input name="title" defaultValue={settings.servicesPage.title} className="admin-input" /></Field>
            <Field label="Subtitle"><textarea name="subtitle" defaultValue={settings.servicesPage.subtitle} rows={3} className="admin-input" /></Field>
            {settings.servicesPage.categories.map((category, index) => (
              <div key={index} className="rounded-[22px] border border-[#2c2c2e] bg-[#151517] p-4">
                <Field label={`Category ${index + 1} Title`}><input name={`categoryTitle${index}`} defaultValue={category.title} className="admin-input" /></Field>
                <Field label="Items"><textarea name={`categoryItems${index}`} defaultValue={listToMultiline(category.items)} rows={6} className="admin-input" /></Field>
              </div>
            ))}
            <Field label="CTA Title"><input name="ctaTitle" defaultValue={settings.servicesPage.ctaTitle} className="admin-input" /></Field>
            <Field label="CTA Label"><input name="ctaLabel" defaultValue={settings.servicesPage.ctaLabel} className="admin-input" /></Field>
            <Field label="CTA Link"><input name="ctaHref" defaultValue={settings.servicesPage.ctaHref} className="admin-input" /></Field>

            <div className="space-y-4 rounded-[24px] border border-[#2c2c2e] bg-[#111214] p-5">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
                  Dedicated Service Pages
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-[#86868b]">
                  Each service gets its own infographic-style detail page.
                </p>
              </div>

              <div className="space-y-6">
                {settings.servicesPage.detailPages.map((service, index) => (
                  <div key={service.slug || index} className="rounded-[22px] border border-[#2c2c2e] bg-[#151517] p-4">
                    <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
                      Service Detail {index + 1}
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <Field label="Slug"><input name={`serviceSlug${index}`} defaultValue={service.slug} className="admin-input" /></Field>
                      <Field label="Nav Label"><input name={`serviceNavLabel${index}`} defaultValue={service.navLabel} className="admin-input" /></Field>
                      <Field label="Eyebrow"><input name={`serviceEyebrow${index}`} defaultValue={service.eyebrow} className="admin-input" /></Field>
                      <Field label="Hero Image URL"><input name={`serviceHeroImage${index}`} defaultValue={service.heroImage} className="admin-input" /></Field>
                    </div>
                    <Field label="Hero Upload">
                      <input
                        name={`serviceHeroUpload${index}`}
                        type="file"
                        accept="image/*"
                        className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
                      />
                    </Field>
                    <Field label="Title"><input name={`serviceTitle${index}`} defaultValue={service.title} className="admin-input" /></Field>
                    <Field label="Subtitle"><textarea name={`serviceSubtitle${index}`} defaultValue={service.subtitle} rows={3} className="admin-input" /></Field>
                    <Field label="Overview Title"><input name={`serviceOverviewTitle${index}`} defaultValue={service.overviewTitle} className="admin-input" /></Field>
                    <Field label="Overview Body"><textarea name={`serviceOverviewBody${index}`} defaultValue={service.overviewBody} rows={4} className="admin-input" /></Field>
                    <Field label="Feature Section Title"><input name={`serviceFeatureTitle${index}`} defaultValue={service.featureTitle} className="admin-input" /></Field>

                    {service.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="grid gap-3 md:grid-cols-2">
                        <Field label={`Metric ${metricIndex + 1} Label`}><input name={`serviceMetricLabel${index}-${metricIndex}`} defaultValue={metric.label} className="admin-input" /></Field>
                        <Field label={`Metric ${metricIndex + 1} Value`}><input name={`serviceMetricValue${index}-${metricIndex}`} defaultValue={metric.value} className="admin-input" /></Field>
                      </div>
                    ))}

                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="rounded-[18px] border border-[#2c2c2e] bg-[#111214] p-4">
                        <Field label={`Feature ${featureIndex + 1} Title`}><input name={`serviceFeatureItemTitle${index}-${featureIndex}`} defaultValue={feature.title} className="admin-input" /></Field>
                        <Field label="Feature Body"><textarea name={`serviceFeatureItemBody${index}-${featureIndex}`} defaultValue={feature.body} rows={3} className="admin-input" /></Field>
                      </div>
                    ))}

                    <Field label="CTA Title"><input name={`serviceCtaTitle${index}`} defaultValue={service.ctaTitle} className="admin-input" /></Field>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Field label="CTA Label"><input name={`serviceCtaLabel${index}`} defaultValue={service.ctaLabel} className="admin-input" /></Field>
                      <Field label="CTA Link"><input name={`serviceCtaHref${index}`} defaultValue={service.ctaHref} className="admin-input" /></Field>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <SubmitButton label="Save Services Page" className="admin-button" />
          </form>
        </Card>

        <Card id="process-page" title="Process Page" description="Step-by-step narrative.">
          <form action={saveProcessPageAction} className="space-y-4">
            <Field label="Title"><input name="title" defaultValue={settings.processPage.title} className="admin-input" /></Field>
            <Field label="Subtitle"><textarea name="subtitle" defaultValue={settings.processPage.subtitle} rows={3} className="admin-input" /></Field>
            {settings.processPage.steps.map((step, index) => (
              <div key={index} className="rounded-[22px] border border-[#2c2c2e] bg-[#151517] p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="ID"><input name={`stepId${index}`} defaultValue={step.id} className="admin-input" /></Field>
                  <Field label="Accent"><input name={`stepAccent${index}`} defaultValue={step.accent} className="admin-input" /></Field>
                </div>
                <Field label="Title"><input name={`stepTitle${index}`} defaultValue={step.title} className="admin-input" /></Field>
                <Field label="Description"><textarea name={`stepDescription${index}`} defaultValue={step.description} rows={4} className="admin-input" /></Field>
              </div>
            ))}
            <Field label="CTA Title"><input name="ctaTitle" defaultValue={settings.processPage.ctaTitle} className="admin-input" /></Field>
            <Field label="CTA Label"><input name="ctaLabel" defaultValue={settings.processPage.ctaLabel} className="admin-input" /></Field>
            <Field label="CTA Link"><input name="ctaHref" defaultValue={settings.processPage.ctaHref} className="admin-input" /></Field>
            <SubmitButton label="Save Process Page" className="admin-button" />
          </form>
        </Card>
      </Grid>

      <Grid>
        <Card id="work-page" title="Work Page" description="Portfolio landing page title, hero image, and call to action.">
          <form action={saveWorkPageAction} encType="multipart/form-data" className="space-y-4">
            <Field label="Title"><input name="title" defaultValue={settings.workPage.title} className="admin-input" /></Field>
            <Field label="Subtitle"><textarea name="subtitle" defaultValue={settings.workPage.subtitle} rows={3} className="admin-input" /></Field>
            <Field label="Hero Image URL"><input name="heroImage" defaultValue={settings.workPage.heroImage} className="admin-input" /></Field>
            <Field label="Hero Image Upload">
              <input
                name="heroImageUpload"
                type="file"
                accept="image/*"
                className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
              />
            </Field>
            <Field label="CTA Title"><input name="ctaTitle" defaultValue={settings.workPage.ctaTitle} className="admin-input" /></Field>
            <Field label="CTA Label"><input name="ctaLabel" defaultValue={settings.workPage.ctaLabel} className="admin-input" /></Field>
            <Field label="CTA Link"><input name="ctaHref" defaultValue={settings.workPage.ctaHref} className="admin-input" /></Field>
            <SubmitButton label="Save Work Page" className="admin-button" />
          </form>
        </Card>

        <Card id="studio-page" title="Studio Page" description="Studio story, hero image, stats, and CTA.">
          <form action={saveStudioPageAction} encType="multipart/form-data" className="space-y-4">
            <Field label="Title"><input name="title" defaultValue={settings.studioPage.title} className="admin-input" /></Field>
            <Field label="Subtitle"><textarea name="subtitle" defaultValue={settings.studioPage.subtitle} rows={3} className="admin-input" /></Field>
            <Field label="Image URL"><input name="image" defaultValue={settings.studioPage.image} className="admin-input" /></Field>
            <Field label="Image Upload">
              <input
                name="imageUpload"
                type="file"
                accept="image/*"
                className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
              />
            </Field>
            <Field label="Vision Title"><input name="visionTitle" defaultValue={settings.studioPage.visionTitle} className="admin-input" /></Field>
            <Field label="Vision Body"><textarea name="visionBody" defaultValue={settings.studioPage.visionBody} rows={4} className="admin-input" /></Field>
            <Field label="Culture Title"><input name="cultureTitle" defaultValue={settings.studioPage.cultureTitle} className="admin-input" /></Field>
            <Field label="Culture Body"><textarea name="cultureBody" defaultValue={settings.studioPage.cultureBody} rows={4} className="admin-input" /></Field>
            {settings.studioPage.stats.map((stat, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-2">
                <Field label={`Stat ${index + 1} Label`}><input name={`statLabel${index}`} defaultValue={stat.label} className="admin-input" /></Field>
                <Field label={`Stat ${index + 1} Value`}><input name={`statValue${index}`} defaultValue={stat.value} className="admin-input" /></Field>
              </div>
            ))}
            <Field label="CTA Title"><input name="ctaTitle" defaultValue={settings.studioPage.ctaTitle} className="admin-input" /></Field>
            <Field label="CTA Label"><input name="ctaLabel" defaultValue={settings.studioPage.ctaLabel} className="admin-input" /></Field>
            <Field label="CTA Link"><input name="ctaHref" defaultValue={settings.studioPage.ctaHref} className="admin-input" /></Field>
            <SubmitButton label="Save Studio Page" className="admin-button" />
          </form>
        </Card>

        <div className="space-y-8">
          <Card id="journal-page" title="Blog / Journal Page" description="Listing copy, hero, empty state, and SEO defaults for the footer-only blog.">
            <form action={saveJournalPageAction} encType="multipart/form-data" className="space-y-4">
              <Field label="Title"><input name="title" defaultValue={settings.journalPage.title} className="admin-input" /></Field>
              <Field label="Subtitle"><textarea name="subtitle" defaultValue={settings.journalPage.subtitle} rows={3} className="admin-input" /></Field>
              <Field label="Hero Image URL"><input name="heroImage" defaultValue={settings.journalPage.heroImage} className="admin-input" /></Field>
              <Field label="Hero Image Upload">
                <input
                  name="heroImageUpload"
                  type="file"
                  accept="image/*"
                  className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
                />
              </Field>
              <Field label="Empty Title"><input name="emptyTitle" defaultValue={settings.journalPage.emptyTitle} className="admin-input" /></Field>
              <Field label="Empty Body"><textarea name="emptyBody" defaultValue={settings.journalPage.emptyBody} rows={3} className="admin-input" /></Field>
              <Field label="SEO Title"><input name="seoTitle" defaultValue={settings.journalPage.seoTitle} className="admin-input" /></Field>
              <Field label="SEO Description"><textarea name="seoDescription" defaultValue={settings.journalPage.seoDescription} rows={3} className="admin-input" /></Field>
              <Field label="SEO Image URL"><input name="seoImage" defaultValue={settings.journalPage.seoImage} className="admin-input" /></Field>
              <Field label="SEO Image Upload">
                <input
                  name="seoImageUpload"
                  type="file"
                  accept="image/*"
                  className="admin-input file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-black"
                />
              </Field>
              <SubmitButton label="Save Blog / Journal Page" className="admin-button" />
            </form>
          </Card>

          <Card id="contact-page" title="Contact Page" description="Form labels, option lists, and success state. One option per line.">
            <form action={saveContactPageAction} className="space-y-4">
              <Field label="Title"><input name="title" defaultValue={settings.contactPage.title} className="admin-input" /></Field>
              <Field label="Subtitle"><textarea name="subtitle" defaultValue={settings.contactPage.subtitle} rows={3} className="admin-input" /></Field>
              <Field label="Service Options"><textarea name="serviceOptions" defaultValue={listToMultiline(settings.contactPage.serviceOptions)} rows={5} className="admin-input" /></Field>
              <Field label="Budget Options"><textarea name="budgetOptions" defaultValue={listToMultiline(settings.contactPage.budgetOptions)} rows={5} className="admin-input" /></Field>
              <Field label="Success Title"><input name="successTitle" defaultValue={settings.contactPage.successTitle} className="admin-input" /></Field>
              <Field label="Success Body"><textarea name="successBody" defaultValue={settings.contactPage.successBody} rows={3} className="admin-input" /></Field>
              <Field label="Submit Label"><input name="submitLabel" defaultValue={settings.contactPage.submitLabel} className="admin-input" /></Field>
              <SubmitButton label="Save Contact Page" className="admin-button" />
            </form>
          </Card>
        </div>
      </Grid>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-8 xl:grid-cols-2">{children}</div>;
}

function Card({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rounded-[32px] border border-[#2c2c2e] bg-[#1c1c1e] p-6">
      <div className="mb-5">
        <h2 className="text-[22px] font-semibold text-white">{title}</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-[#86868b]">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#86868b]">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center justify-between rounded-[22px] border border-[#2c2c2e] bg-[#151517] px-4 py-4 text-[14px] font-medium text-white">
      <span>{label}</span>
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-[#0a84ff]" />
    </label>
  );
}
