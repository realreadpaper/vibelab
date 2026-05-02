import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProject, getAllProjectSlugs, getPostsForProject } from "@/lib/mdx";
import { MDXContent } from "@/components/blog/MDXContent";
import { BlogCard } from "@/components/blog/BlogCard";
import { Link } from "@/i18n/navigation";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs();
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const project = getProject(slug, locale);
  if (!project) return { title: "Not Found" };
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const project = getProject(slug, locale);
  const t = await getTranslations({ locale, namespace: "projects" });
  const blogT = await getTranslations({ locale, namespace: "blog" });
  const commonT = await getTranslations({ locale, namespace: "common" });

  if (!project) {
    notFound();
  }

  const relatedPosts = getPostsForProject(slug, locale);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/projects"
        className="mb-8 inline-block text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
      >
        {commonT("back")}
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            {project.frontmatter.title}
          </h1>
          <p className="mt-3 text-lg text-[var(--text-secondary)]">
            {project.frontmatter.description}
          </p>

          {project.frontmatter.techs &&
            project.frontmatter.techs.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.frontmatter.techs.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[var(--glass-border)] bg-white/5 px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

          <div className="mt-4 flex gap-3">
            {project.frontmatter.demoUrl && (
              <a
                href={project.frontmatter.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-white/20"
              >
                {t("viewDemo")} ↗
              </a>
            )}
            {project.frontmatter.sourceUrl && (
              <a
                href={project.frontmatter.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] px-4 py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-bg-hover)]"
              >
                {t("viewSource")} ↗
              </a>
            )}
          </div>
        </header>

        <MDXContent source={project.content} />
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-[var(--glass-border)] pt-12">
          <h2 className="mb-6 text-xl font-semibold text-[var(--text-primary)]">
            {t("relatedPosts")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedPosts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                href={`/${locale}/blog/${post.slug}`}
                publishedLabel={blogT("publishedOn")}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
