// app/robots.ts — Auto-generated robots.txt with sitemap link
import type { MetadataRoute } from "next";

const SITE_URL = "https://khalid-cyber-security.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
