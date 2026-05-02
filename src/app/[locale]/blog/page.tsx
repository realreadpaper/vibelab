import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/BlogCard";

interface BlogListPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogListPage({ params }: BlogListPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllPosts(locale);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="gradient-text text-4xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-2 text-[var(--text-secondary)]">{t("description")}</p>

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-[var(--text-muted)]">
          {t("noPosts")}
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              href={`/${locale}/blog/${post.slug}`}
              publishedLabel={t("publishedOn")}
            />
          ))}
        </div>
      )}
    </main>
  );
}
