import { getTranslations } from "next-intl/server";
import { getAllProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const projects = getAllProjects(locale);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="gradient-text text-4xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-2 text-[var(--text-secondary)]">{t("description")}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            href={`/${locale}/projects/${project.slug}`}
            techStackLabel={t("techStack")}
          />
        ))}
      </div>
    </main>
  );
}
