import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface BlogFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  project?: string;
  cover?: string;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  techs?: string[];
  demoUrl?: string;
  sourceUrl?: string;
  cover?: string;
  order?: number;
}

export interface BlogPost {
  slug: string;
  locale: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

export interface Project {
  slug: string;
  locale: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

/**
 * Read all MDX files from a content subdirectory, with frontmatter.
 * Handles the case where the directory may not exist yet.
 */
function readMdxFiles<T>(
  dirPath: string,
  locale: string
): { slug: string; frontmatter: T; content: string }[] {
  if (!fs.existsSync(dirPath)) return [];

  const filenames = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));

  return filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(dirPath, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      frontmatter: data as T,
      content,
    };
  });
}

/** Get all blog posts for a given locale, sorted by date descending. */
export function getAllPosts(locale: string): BlogPost[] {
  const dirPath = path.join(CONTENT_ROOT, locale, "blog");
  const items = readMdxFiles<BlogFrontmatter>(dirPath, locale);

  return items
    .map((item) => ({
      ...item,
      locale,
    }))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

/** Get a single blog post by slug and locale. */
export function getPost(slug: string, locale: string): BlogPost | null {
  const filePath = path.join(CONTENT_ROOT, locale, "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    locale,
    frontmatter: data as BlogFrontmatter,
    content,
  };
}

/** Get all projects for a locale, sorted by order field. */
export function getAllProjects(locale: string): Project[] {
  const dirPath = path.join(CONTENT_ROOT, locale, "projects");
  const items = readMdxFiles<ProjectFrontmatter>(dirPath, locale);

  return items
    .map((item) => ({
      ...item,
      locale,
    }))
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}

/** Get a single project by slug and locale. */
export function getProject(slug: string, locale: string): Project | null {
  const filePath = path.join(CONTENT_ROOT, locale, "projects", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    locale,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

/** Find blog posts related to a given project slug. */
export function getPostsForProject(
  projectSlug: string,
  locale: string
): BlogPost[] {
  return getAllPosts(locale).filter(
    (p) => p.frontmatter.project === projectSlug
  );
}

/** Get all unique tags across all blog posts for a locale. */
export function getAllTags(locale: string): string[] {
  const posts = getAllPosts(locale);
  const tagSet = new Set<string>();
  posts.forEach((p) => p.frontmatter.tags?.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

/** Get all post slugs for static generation. */
export function getAllPostSlugs(): { slug: string; locale: string }[] {
  const results: { slug: string; locale: string }[] = [];
  for (const locale of ["zh", "en"]) {
    const posts = getAllPosts(locale);
    posts.forEach((p) => results.push({ slug: p.slug, locale }));
  }
  return results;
}

/** Get all project slugs for static generation. */
export function getAllProjectSlugs(): { slug: string; locale: string }[] {
  const results: { slug: string; locale: string }[] = [];
  for (const locale of ["zh", "en"]) {
    const projects = getAllProjects(locale);
    projects.forEach((p) => results.push({ slug: p.slug, locale }));
  }
  return results;
}
