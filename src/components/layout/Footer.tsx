import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("site.footer");

  return (
    <footer className="mt-auto border-t border-[var(--glass-border)] bg-[var(--glass-bg)] bg-opacity-50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-8 text-sm text-[var(--text-muted)] sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="gradient-text text-sm font-semibold"
          >
            Long Jiang
          </Link>
          <span>·</span>
          <span>{t("builtWith")}</span>
        </div>
        <div className="flex items-center gap-4">
          <NextLink
            href="/feed"
            className="transition-colors hover:text-[var(--text-secondary)]"
          >
            {t("rss")}
          </NextLink>
          <a
            href="https://github.com/realreadpaper"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--text-secondary)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
