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
  ];
}
