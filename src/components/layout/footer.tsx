import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import type { EditableLink, FooterGroup } from "@/lib/site/types";

type FooterProps = {
  brandName: string;
  logoImage?: string;
  groups: FooterGroup[];
  legalLinks: EditableLink[];
  copyrightText: string;
  locationLabel: string;
};

export function Footer({
  brandName,
  logoImage,
  groups,
  legalLinks,
  copyrightText,
  locationLabel,
}: FooterProps) {
  const isExternal = (href: string) => href.startsWith("http://") || href.startsWith("https://");

  return (
    <footer className="border-t border-[var(--line-soft)] bg-[var(--surface-soft)] px-6 py-14 md:py-16" aria-label="Footer">
      <div className="page-shell">
        <div className="grid gap-10 border-b border-[var(--line-soft)] pb-10 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--text-primary)]">
              {logoImage ? (
                <SmartImage
                  src={logoImage}
                  alt={brandName}
                  width={176}
                  height={56}
                  sizes="176px"
                  className="h-9 w-auto max-w-[11rem] object-contain"
                />
              ) : (
                <>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current">
                    <span className="h-2.5 w-2.5 rounded-full bg-current" />
                  </span>
                  {brandName}
                </>
              )}
            </Link>
            <p className="mt-5 max-w-[16rem] text-[14px] leading-relaxed text-[var(--text-tertiary)]">
              Editorial brand systems, premium digital products, and launch experiences built to feel inevitable.
            </p>
          </div>

          {groups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} links`}>
              <h2 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)]">
                {group.title}
              </h2>
              <div className="space-y-3">
                {group.links.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    target={isExternal(link.href) ? "_blank" : undefined}
                    rel={isExternal(link.href) ? "noreferrer noopener" : undefined}
                    className="block text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[12px] text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <span>{copyrightText}</span>
            <nav className="flex flex-wrap gap-4" aria-label="Legal">
              {legalLinks.map((link) => (
                <Link key={link.href + link.label} href={link.href} className="hover:text-[var(--text-primary)]">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <span>{locationLabel}</span>
        </div>
      </div>
    </footer>
  );
}
