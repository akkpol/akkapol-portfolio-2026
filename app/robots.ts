import type { MetadataRoute } from "next";

const siteUrl = "https://akkapol-systems-ak3lab.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
