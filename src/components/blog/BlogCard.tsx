import type { BlogPost } from "@/lib/mdx";
import { GlassCard } from "@/components/shared/GlassCard";

interface BlogCardProps {
  post: BlogPost;
  href: string;
  publishedLabel: string;
}

export function BlogCard({ post, href, publishedLabel }: BlogCardProps) {
  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    post.locale === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <a href={href} className="block group">
      <GlassCard className="p-6 transition-all duration-300 group-hover:scale-[1.01] group-hover:bg-[var(--glass-bg-hover)]">
        {post.frontmatter.cover && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={post.frontmatter.cover}
              alt={post.frontmatter.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <time className="text-xs text-[var(--text-muted)]">
          {publishedLabel} {formattedDate}
        </time>

        <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)] group-hover:gradient-text">
          {post.frontmatter.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">
          {post.frontmatter.excerpt}
        </p>

        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.frontmatter.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </GlassCard>
    </a>
  );
}
