import { Feed } from "feed";
import { getAllPosts } from "@/lib/mdx";

const BASE_URL = "https://jianglong.dev";

export async function GET() {
  const feed = new Feed({
    title: "Long Jiang — Vibe Coding Explorer",
    description:
      "Exploring the frontier of Vibe Coding — turning ideas into products with AI.",
    id: BASE_URL,
    link: BASE_URL,
    language: "en",
    favicon: `${BASE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Long Jiang`,
    updated: new Date(),
    author: {
      name: "Long Jiang",
      email: "realreadpaper@163.com",
    },
  });

  const enPosts = getAllPosts("en");
  enPosts.forEach((post) => {
    feed.addItem({
      title: post.frontmatter.title,
      id: `${BASE_URL}/en/blog/${post.slug}`,
      link: `${BASE_URL}/en/blog/${post.slug}`,
      description: post.frontmatter.excerpt,
      date: new Date(post.frontmatter.date),
    });
  });

  const zhPosts = getAllPosts("zh");
  zhPosts.forEach((post) => {
    feed.addItem({
      title: post.frontmatter.title,
      id: `${BASE_URL}/zh/blog/${post.slug}`,
      link: `${BASE_URL}/zh/blog/${post.slug}`,
      description: post.frontmatter.excerpt,
      date: new Date(post.frontmatter.date),
    });
  });

  feed.addCategory("Technology");
  feed.addCategory("Programming");

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
