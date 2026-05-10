import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/site/data";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin/",
      },
    ],
    host: settings.metadataBase,
    sitemap: `${settings.metadataBase}/sitemap.xml`,
  };
}
