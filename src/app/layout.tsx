import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteEnhancements } from "@/components/providers/site-enhancements";
import { getSiteSettings } from "@/lib/site/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: {
      default: settings.siteTitle,
      template: `%s | ${settings.brandName}`,
    },
    description: settings.siteDescription,
    metadataBase: new URL(settings.metadataBase),
    applicationName: settings.brandName,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: settings.siteTitle,
      description: settings.siteDescription,
      type: "website",
      locale: "en_US",
      images: settings.home.heroImage ? [{ url: settings.home.heroImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.siteTitle,
      description: settings.siteDescription,
      images: settings.home.heroImage ? [settings.home.heroImage] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-sans">
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-md bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: settings.brandName,
              url: settings.metadataBase,
              email: settings.contactEmail,
              telephone: settings.contactPhone,
              sameAs: settings.footer.groups
                .flatMap((group) => group.links)
                .map((link) => link.href)
                .filter((href) => href.startsWith("http")),
            }),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: settings.brandName,
              url: settings.metadataBase,
              description: settings.siteDescription,
            }),
          }}
        />
        <SiteEnhancements
          enableSmoothScroll={settings.enableSmoothScroll}
          showCustomCursor={settings.showCustomCursor}
        >
          <main id="main-content" className="relative flex min-h-screen flex-col">
            {children}
          </main>
        </SiteEnhancements>
      </body>
    </html>
  );
}
