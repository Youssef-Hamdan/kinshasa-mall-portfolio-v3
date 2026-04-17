"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

/** Sub-themes driven by scroll (sections with `data-scroll-theme*`). Stripped when none intersect. */
const SCROLL_SUB_THEMES = [
  "theme-sand",
  "theme-cream",
  "theme-soft-charcoal",
  "theme-deep-teal",
  "theme-gold",
  "theme-night",
  "theme-luxury-cream",
] as const;

function subThemeClassFor(el: HTMLElement): string | null {
  const isDark = document.documentElement.classList.contains("dark");
  if (isDark) {
    return (
      el.getAttribute("data-scroll-theme-dark") ??
      el.getAttribute("data-scroll-theme")
    );
  }
  return (
    el.getAttribute("data-scroll-theme-light") ??
    el.getAttribute("data-scroll-theme")
  );
}

export function ScrollThemeController() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-scroll-theme-light], [data-scroll-theme-dark], [data-scroll-theme]"
      )
    );

    if (!sections.length) return;

    const root = document.documentElement;

    const hasAnyScrollTheme = () =>
      SCROLL_SUB_THEMES.some((c) => root.classList.contains(c));

    const clearSubThemes = () => {
      if (!hasAnyScrollTheme()) return;
      root.classList.remove(...SCROLL_SUB_THEMES);
    };

    const applySubTheme = (theme: string) => {
      if (root.classList.contains(theme)) return;
      root.classList.remove(...SCROLL_SUB_THEMES);
      root.classList.add(theme);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);

        if (!intersecting.length) {
          clearSubThemes();
          return;
        }

        const top = intersecting.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];

        const theme = subThemeClassFor(top.target as HTMLElement);
        if (theme) applySubTheme(theme);
      },
      {
        /* Fewer steps = fewer redundant callbacks at section edges (smoother feel) */
        threshold: [0, 0.2, 0.5],
        rootMargin: "-6% 0px -6% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      clearSubThemes();
    };
  }, [resolvedTheme]);

  return null;
}
