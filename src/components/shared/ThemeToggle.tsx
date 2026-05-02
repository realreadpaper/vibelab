"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-8 w-8" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 1zm0 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-1a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6.5-2a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1h1zM8 13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 13zm-6.5-5a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1h1zm.146-6.854a.5.5 0 0 1 .708 0l.708.708a.5.5 0 1 1-.708.708l-.708-.708a.5.5 0 0 1 0-.708zm11.001.708a.5.5 0 0 1 .708 0l.708.708a.5.5 0 0 1-.708.708l-.708-.708a.5.5 0 0 1 0-.708zm-11.001 10a.5.5 0 0 1 .708 0l.708.708a.5.5 0 0 1-.708.708l-.708-.708a.5.5 0 0 1 0-.708zm11.001.708a.5.5 0 0 1 .708 0l.708.708a.5.5 0 0 1-.708.708l-.708-.708a.5.5 0 0 1 0-.708z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
        </svg>
      )}
    </button>
  );
}
