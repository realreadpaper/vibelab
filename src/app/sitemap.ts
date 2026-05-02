import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects } from "@/lib/mdx";

const BASE_URL = "https://jianglong.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["zh", "en"];

  const staticPages = ["", "/blog", "/projects", "/about"];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of locales) {
    const prefix = locale === "zh" ? "" : `/${locale}`;
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}${prefix}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  // Blog posts
  for (const locale of locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.frontmatter.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Projects
  for (const locale of locales) {
    const projects = getAllProjects(locale);
    for (const project of projects) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
