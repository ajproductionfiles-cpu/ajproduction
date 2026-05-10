import type {
  EditableLink,
  FooterGroup,
  ManagedPageVisibility,
  SiteSettings,
} from "@/lib/site/types";

export const defaultManagedPages: ManagedPageVisibility[] = [
  {
    key: "home",
    label: "Home",
    href: "/",
    showInHeader: true,
    showInFooter: false,
    includeInSitemap: true,
  },
  {
    key: "services",
    label: "Services",
    href: "/services",
    showInHeader: true,
    showInFooter: false,
    includeInSitemap: true,
  },
  {
    key: "work",
    label: "Work",
    href: "/work",
    showInHeader: true,
    showInFooter: true,
    includeInSitemap: true,
  },
  {
    key: "studio",
    label: "Studio",
    href: "/studio",
    showInHeader: true,
    showInFooter: true,
    includeInSitemap: true,
  },
  {
    key: "process",
    label: "Process",
    href: "/process",
    showInHeader: true,
    showInFooter: true,
    includeInSitemap: true,
  },
  {
    key: "blog",
    label: "Blog",
    href: "/blog",
    showInHeader: false,
    showInFooter: true,
    includeInSitemap: true,
  },
  {
    key: "contact",
    label: "Contact",
    href: "/contact",
    showInHeader: true,
    showInFooter: false,
    includeInSitemap: true,
  },
  {
    key: "privacy",
    label: "Privacy Policy",
    href: "/privacy",
    showInHeader: false,
    showInFooter: true,
    includeInSitemap: true,
  },
  {
    key: "terms",
    label: "Terms of Use",
    href: "/terms",
    showInHeader: false,
    showInFooter: true,
    includeInSitemap: true,
  },
  {
    key: "sitemap-html",
    label: "Site Map",
    href: "/sitemap",
    showInHeader: false,
    showInFooter: false,
    includeInSitemap: true,
  },
  {
    key: "journal-legacy",
    label: "Legacy Journal",
    href: "/journal",
    showInHeader: false,
    showInFooter: false,
    includeInSitemap: false,
  },
];

function normalizePath(href: string) {
  if (!href.startsWith("/")) {
    return null;
  }

  const [pathname] = href.split(/[?#]/);
  if (!pathname) {
    return null;
  }

  return pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
}

export function normalizeManagedPages(
  overrides: ManagedPageVisibility[] | undefined,
) {
  const byKey = new Map((overrides || []).map((page) => [page.key, page]));

  return defaultManagedPages.map((page) => {
    const override = byKey.get(page.key);
    return {
      ...page,
      ...override,
      key: page.key,
      label: override?.label?.trim() || page.label,
      href: override?.href?.trim() || page.href,
    };
  });
}

function getManagedPageForHref(
  href: string,
  pageDirectory: ManagedPageVisibility[] | undefined,
) {
  const normalizedHref = normalizePath(href);
  if (!normalizedHref) {
    return null;
  }

  return (
    normalizeManagedPages(pageDirectory).find(
      (page) => normalizePath(page.href) === normalizedHref,
    ) || null
  );
}

export function filterHeaderNavItems(
  navItems: EditableLink[],
  pageDirectory: ManagedPageVisibility[] | undefined,
) {
  return navItems.filter((item) => {
    const page = getManagedPageForHref(item.href, pageDirectory);
    return page ? page.showInHeader : true;
  });
}

export function filterFooterGroups(
  groups: FooterGroup[],
  pageDirectory: ManagedPageVisibility[] | undefined,
) {
  return groups
    .map((group) => ({
      ...group,
      links: group.links.filter((link) => {
        const page = getManagedPageForHref(link.href, pageDirectory);
        return page ? page.showInFooter : true;
      }),
    }))
    .filter((group) => group.links.length > 0);
}

export function filterLegalLinks(
  links: EditableLink[],
  pageDirectory: ManagedPageVisibility[] | undefined,
) {
  return links.filter((link) => {
    const page = getManagedPageForHref(link.href, pageDirectory);
    return page ? page.showInFooter : true;
  });
}

export type PublicLayoutShell = {
  brandName: string;
  logoLabel: string;
  logoImage: string;
  navItems: EditableLink[];
  footerGroups: FooterGroup[];
  legalLinks: EditableLink[];
  showSearchIcon: boolean;
  copyrightText: string;
  locationLabel: string;
};

export function getPublicLayoutShell(settings: SiteSettings): PublicLayoutShell {
  return {
    brandName: settings.brandName,
    logoLabel: settings.header.logoLabel,
    logoImage: settings.brandLogoUrl,
    navItems: filterHeaderNavItems(settings.header.navItems, settings.pageDirectory),
    footerGroups: filterFooterGroups(settings.footer.groups, settings.pageDirectory),
    legalLinks: filterLegalLinks(settings.footer.legalLinks, settings.pageDirectory),
    showSearchIcon: settings.showSearchIcon,
    copyrightText: settings.copyrightText,
    locationLabel: settings.locationLabel,
  };
}

export function shouldIncludePathInSitemap(
  href: string,
  pageDirectory: ManagedPageVisibility[] | undefined,
) {
  const page = getManagedPageForHref(href, pageDirectory);
  return page ? page.includeInSitemap : true;
}

/** Respects includeInSitemap for exact paths and for URLs under a managed parent (e.g. /work/slug). */
export function shouldIncludeUrlInSitemap(
  pathname: string,
  pageDirectory: ManagedPageVisibility[] | undefined,
) {
  const normalized = normalizePath(pathname);
  if (!normalized) {
    return false;
  }

  const pages = normalizeManagedPages(pageDirectory);
  const exact = pages.find((page) => normalizePath(page.href) === normalized);
  if (exact) {
    return exact.includeInSitemap;
  }

  const parents = pages
    .map((page) => ({ page, base: normalizePath(page.href) }))
    .filter((item): item is { page: ManagedPageVisibility; base: string } => Boolean(item.base && item.base !== "/"))
    .sort((a, b) => b.base.length - a.base.length);

  for (const { page, base } of parents) {
    if (normalized === base || normalized.startsWith(`${base}/`)) {
      return page.includeInSitemap;
    }
  }

  return true;
}

export function getSitemapPaths(
  pageDirectory: ManagedPageVisibility[] | undefined,
) {
  return normalizeManagedPages(pageDirectory)
    .filter((page) => page.includeInSitemap)
    .map((page) => page.href);
}
