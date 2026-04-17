"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { useLanguage } from "../premium-header/language-provider";

export default function TrustMarquee({ embedded = false }: { embedded?: boolean }) {
  const { t } = useLanguage();
  const items = t.trustMarquee;

  return (
    <div
      className={cn(
        "w-full border-t border-primary/25 bg-background/80 py-3 backdrop-blur-sm",
        embedded && "border-primary/20",
      )}
    >
      <Marquee pauseOnHover className="[--duration:50s] [--gap:3rem] py-1">
        {items.map((label) => (
          <span
            key={label}
            className="text-primary/80 shrink-0 text-[10px] font-medium tracking-[0.22em] uppercase sm:text-xs"
          >
            {label}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
