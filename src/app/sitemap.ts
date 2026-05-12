import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), priority: 0.3 },
    { url: `${SITE_URL}/tokushoho`, lastModified: new Date(), priority: 0.3 },
  ];
}
