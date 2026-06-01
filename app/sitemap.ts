import type { MetadataRoute } from "next";

import { MODULES, QUICK_FINDER } from "@/lib/nav";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}${QUICK_FINDER.href}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  for (const m of MODULES) {
    entries.push({
      url: `${siteConfig.url}${m.href}`,
      lastModified,
      changeFrequency: "weekly",
      priority: m.href === "/award-search" ? 0.9 : 0.8,
    });
  }

  return entries;
}
