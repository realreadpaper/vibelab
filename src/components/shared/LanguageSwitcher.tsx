"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const localeLabels: Record<string, string> = {
  zh: "中",
  en: "EN",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 rounded-full bg-[var(--glass-bg)] p-0.5 backdrop-blur-xl border border-[var(--glass-border)]">
      {["zh", "en"].map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
            locale === l
              ? "bg-white/20 text-[var(--text-primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          }`}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}
