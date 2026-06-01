import type { MetadataRoute } from "next";

const siteUrl = "https://akkapol-portfolio-2026.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
