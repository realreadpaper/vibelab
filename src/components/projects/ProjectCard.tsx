import type { Project } from "@/lib/mdx";
import { GlassCard } from "@/components/shared/GlassCard";

interface ProjectCardProps {
  project: Project;
  href: string;
  techStackLabel: string;
}

export function ProjectCard({
  project,
  href,
  techStackLabel,
}: ProjectCardProps) {
  return (
    <a href={href} className="block group">
      <GlassCard className="p-6 transition-all duration-300 group-hover:scale-[1.01] group-hover:bg-[var(--glass-bg-hover)]">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:gradient-text">
          {project.frontmatter.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm text-[var(--text-secondary)]">
          {project.frontmatter.description}
        </p>

        {project.frontmatter.techs && project.frontmatter.techs.length > 0 && (
          <div className="mt-4">
            <span className="text-xs text-[var(--text-muted)]">
              {techStackLabel}:
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {project.frontmatter.techs.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-md border border-[var(--glass-border)] bg-white/5 px-2 py-0.5 text-xs text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </GlassCard>
    </a>
  );
}
