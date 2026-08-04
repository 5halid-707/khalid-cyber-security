// app/sitemap.ts — Auto-generated sitemap.xml
import type { MetadataRoute } from "next";

const SITE_URL = "https://khalid-cyber-security.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/", changeFrequency: "monthly" as const, priority: 1.0 },
    { path: "/#about", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/#products", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/#previous-works", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/#certificates", changeFrequency: "yearly" as const, priority: 0.7 },
    { path: "/#training", changeFrequency: "yearly" as const, priority: 0.6 },
    { path: "/#reports", changeFrequency: "yearly" as const, priority: 0.7 },
    { path: "/#testimonials", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/#contact", changeFrequency: "yearly" as const, priority: 0.8 },
    { path: "/privacy-policy", changeFrequency: "yearly" as const, priority: 0.4 },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
