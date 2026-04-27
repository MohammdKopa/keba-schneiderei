import type { MetadataRoute } from "next";
import { business } from "@/lib/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: business.siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          de: `${business.siteUrl}/`,
          ar: `${business.siteUrl}/ar`,
        },
      },
    },
    {
      url: `${business.siteUrl}/ar`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          de: `${business.siteUrl}/`,
          ar: `${business.siteUrl}/ar`,
        },
      },
    },
    {
      url: `${business.siteUrl}/impressum`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { de: `${business.siteUrl}/impressum`, ar: `${business.siteUrl}/ar/impressum` } },
    },
    {
      url: `${business.siteUrl}/datenschutz`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { de: `${business.siteUrl}/datenschutz`, ar: `${business.siteUrl}/ar/datenschutz` } },
    },
    {
      url: `${business.siteUrl}/ar/impressum`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: { languages: { de: `${business.siteUrl}/impressum`, ar: `${business.siteUrl}/ar/impressum` } },
    },
    {
      url: `${business.siteUrl}/ar/datenschutz`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: { languages: { de: `${business.siteUrl}/datenschutz`, ar: `${business.siteUrl}/ar/datenschutz` } },
    },
  ];
}
