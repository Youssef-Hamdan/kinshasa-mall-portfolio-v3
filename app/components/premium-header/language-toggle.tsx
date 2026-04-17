"use client";

import { cn } from "@/lib/utils";
import { useLanguage, type Locale } from "./language-provider";

const label = (code: Locale) => (code === "en" ? "EN" : "FR");

export function LanguageToggle({ heroOverlay = false }: { heroOverlay?: boolean }) {
  const { locale, setLocale } = useLanguage();

  const toggle = () => setLocale(locale === "en" ? "fr" : "en");

  return (
    <button
      type="button"
      aria-label={locale === "en" ? "Language: English. Switch to French" : "Language: French. Switch to English"}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tracking-wide transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        heroOverlay
          ? "border-foreground/35 bg-foreground/10 text-foreground hover:bg-foreground/15"
          : "border-primary/30 bg-background/80 text-primary backdrop-blur-sm hover:bg-primary/10",
      )}
      onClick={toggle}
    >
      {label(locale)}
    </button>
  );
}
