import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("common");

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="gradient-text text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
        {t("notFound")}
      </h2>
      <p className="mt-2 text-[var(--text-secondary)]">
        {t("notFoundDesc")}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-white/20"
      >
        ← Home
      </Link>
    </main>
  );
}
