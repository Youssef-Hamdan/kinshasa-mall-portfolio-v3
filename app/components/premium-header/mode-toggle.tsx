"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle({ heroOverlay = false }: { heroOverlay?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        className={cn(
          "inline-flex size-9 shrink-0 items-center justify-center rounded-full border opacity-0",
          heroOverlay ? "border-foreground/35" : "border-primary/30",
        )}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        heroOverlay
          ? "border-foreground/35 bg-foreground/10 text-foreground hover:bg-foreground/15"
          : "border-primary/30 bg-background/80 text-primary backdrop-blur-sm hover:bg-primary/10",
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="size-4" strokeWidth={2} aria-hidden /> : <Moon className="size-4" strokeWidth={2} aria-hidden />}
    </button>
  );
}
