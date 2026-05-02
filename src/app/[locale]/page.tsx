import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/BlogCard";
import { Link } from "@/i18n/navigation";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const blogT = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllPosts(locale).slice(0, 5);

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-24 sm:py-32">
      {/* Hero */}
      <div className="max-w-2xl text-center">
        <h1 className="gradient-text text-5xl font-bold tracking-tight sm:text-6xl">
          {t("greeting")}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
          {t("tagline")}
        </p>
      </div>

      {/* Latest Posts Section */}
      <section className="mt-20 w-full max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {t("latestPosts")}
          </h2>
          {posts.length > 0 && (
            <Link
              href="/blog"
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
            >
              {t("viewAll")}
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] p-6 text-center text-sm text-[var(--text-muted)] backdrop-blur-xl">
            Posts coming soon. Content is being prepared.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                href={`/${locale}/blog/${post.slug}`}
                publishedLabel={blogT("publishedOn")}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
