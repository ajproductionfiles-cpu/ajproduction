"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import type { EditableLink } from "@/lib/site/types";

type HeaderProps = {
  brandName: string;
  logoImage?: string;
  navItems: EditableLink[];
  showSearchIcon: boolean;
};

export function Header({ brandName, logoImage, navItems, showSearchIcon }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = "primary-mobile-nav";

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="glass fixed left-0 right-0 top-0 z-50 flex h-[56px] items-center border-b border-[var(--line-soft)]">
      <nav aria-label="Primary" className="page-shell flex w-full items-center justify-between gap-6">
        <Link href="/" aria-label={brandName} className="flex items-center gap-3 text-[13px] font-semibold text-[var(--text-primary)]">
          {logoImage ? (
            <SmartImage
              src={logoImage}
              alt={brandName}
              width={160}
              height={48}
              sizes="160px"
              priority
              className="h-8 w-auto max-w-[10rem] object-contain"
            />
          ) : (
            <>
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current">
                <span className="h-2.5 w-2.5 rounded-full bg-current" />
              </span>
              <span className="hidden sm:inline">{brandName}</span>
            </>
          )}
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-full px-1 py-1 text-[12px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {showSearchIcon ? (
            <Link
              href="/sitemap"
              aria-label="Open site map"
              className="hidden rounded-full border border-transparent p-2 text-[var(--text-secondary)] hover:border-[var(--line-soft)] hover:bg-white/70 hover:text-[var(--text-primary)] md:inline-flex"
            >
              <Search size={17} />
            </Link>
          ) : null}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls={mobileMenuId}
            aria-expanded={isMobileMenuOpen}
            className="inline-flex rounded-full border border-transparent p-2 text-[var(--text-secondary)] hover:border-[var(--line-soft)] hover:bg-white/70 hover:text-[var(--text-primary)] md:hidden"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div
          id={mobileMenuId}
          className="fixed inset-x-0 top-[56px] border-b border-[var(--line-soft)] bg-white/96 px-5 pb-6 pt-4 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur md:hidden"
        >
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-[22px] border border-[var(--line-soft)] bg-[var(--surface-soft)] px-4 py-3 text-[15px] font-medium text-[var(--text-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
