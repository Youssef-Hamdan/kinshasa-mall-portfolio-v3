import type { ReactNode } from "react";
import { BlurReveal, BlurRevealTitle, TextAnimation } from "@/components/ui/text-animation";
import { cn } from "@/lib/utils";

/**
 * Horizontal shell for section titles so bands line up (same inset as `max-w-7xl` content).
 * Use on the wrapper around `SectionHeading` (not necessarily full-bleed media below).
 */
export const sectionHeaderContainerClass =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

/** Upper label above section titles (e.g. “The Destination”) — always primary. */
export const sectionEyebrowClass =
  "text-primary mb-4 text-xs font-bold tracking-[0.2em] uppercase";

/**
 * Primary section `<h2>` — base is `text-foreground`.
 * Use `<span className="text-primary">…</span>` inside `title` for one accent phrase only.
 */
export const sectionTitleClass =
  "text-foreground text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.05]";

/** Short line under the title — always muted (pairs with foreground title). */
export const sectionSubtitleClass =
  "text-muted-foreground mt-3 max-w-2xl text-base font-medium sm:mt-4 sm:text-lg md:text-xl";

/** Longer intro under the title — default muted; override for body copy on tinted cards. */
export const sectionLeadClass =
  "text-muted-foreground mt-6 max-w-sm text-base leading-relaxed sm:text-lg md:text-xl";

/** Smaller `<h2>` for banners / photo overlays. */
export const sectionTitleCompactClass =
  "text-foreground text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl";

/** In-card or column titles (`<h3>`). */
export const sectionCardTitleClass =
  "text-primary text-xl font-semibold tracking-tight sm:text-2xl";

/** Footer column labels — primary, same weight as in-page small headings. */
export const sectionFooterColumnTitleClass =
  "text-primary text-sm font-semibold tracking-tight";

/** Footer brand / site name line. */
export const sectionFooterBrandTitleClass =
  "text-primary text-lg font-semibold tracking-tight";

/** First word in split titles (“Our”, “Check”, “Explore”) — subtle horizontal gradient on `foreground`. */
export const sectionTitleLeadWordClass = "text-heading-lead";

/** Accent word (“Stores”, “Highlights”, “the Mall”) — teal horizontal gradient; pair with `font-light italic`. */
export const sectionTitleAccentWordClass = "text-heading-accent";

/**
 * Store directory band labels (e.g. Restaurants, Shops) — primary, uppercase; larger than body subtitles.
 */
export const storeBandHeadingClass =
  "m-0 text-primary text-base font-bold uppercase tracking-[0.18em] sm:text-lg md:text-xl lg:text-2xl sm:tracking-[0.2em] md:tracking-[0.22em]";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  /** Short subheading (muted). */
  subtitle?: ReactNode;
  /** Longer paragraph (muted by default; override with `leadClassName`). */
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  subtitleDelayMs?: number;
  leadDelayMs?: number;
  leadClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  lead,
  align = "left",
  className,
  subtitleDelayMs: _subtitleDelayMs = 70,
  leadDelayMs: _leadDelayMs,
  leadClassName,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const centerBlock = isCenter ? "mx-auto" : "";

  return (
    <div
      className={cn(
        isCenter ? "text-center [&_h2]:text-balance" : "text-left [&_h2]:text-pretty",
        className,
      )}
    >
      {eyebrow ? (
        <TextAnimation as="p" text={eyebrow} letterAnime className={sectionEyebrowClass} />
      ) : null}
      {typeof title === "string" ? (
        <TextAnimation as="h2" text={title} letterAnime className={sectionTitleClass} />
      ) : (
        <BlurRevealTitle className={sectionTitleClass}>{title}</BlurRevealTitle>
      )}
      {subtitle != null && subtitle !== false ? (
        typeof subtitle === "string" || typeof subtitle === "number" ? (
          <TextAnimation
            as="p"
            text={String(subtitle)}
            letterAnime
            className={cn(sectionSubtitleClass, centerBlock)}
          />
        ) : (
          <BlurReveal className={cn(sectionSubtitleClass, centerBlock)}>{subtitle}</BlurReveal>
        )
      ) : null}
      {lead ? (
        typeof lead === "string" || typeof lead === "number" ? (
          <TextAnimation
            as="p"
            text={String(lead)}
            letterAnime
            className={cn(sectionLeadClass, centerBlock, leadClassName)}
          />
        ) : (
          <BlurReveal className={cn(sectionLeadClass, centerBlock, leadClassName)}>{lead}</BlurReveal>
        )
      ) : null}
    </div>
  );
}
