import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPost, getAllPostSlugs } from "@/lib/mdx";
import { MDXContent } from "@/components/blog/MDXContent";
import { Link } from "@/i18n/navigation";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return { title: "Not Found" };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const commonT = await getTranslations({ locale, namespace: "common" });

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/blog"
        className="mb-8 inline-block text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
      >
        {commonT("back")}
      </Link>

      <article>
        <header className="mb-8">
          <time className="text-sm text-[var(--text-muted)]">
            {t("publishedOn")} {formattedDate}
          </time>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            {post.frontmatter.title}
          </h1>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <MDXContent source={post.content} />
      </article>
    </main>
  );
}
