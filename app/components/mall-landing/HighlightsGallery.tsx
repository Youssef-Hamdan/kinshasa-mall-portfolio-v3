"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ProgressSlider,
  SliderBtn,
  SliderBtnGroup,
  SliderContent,
  SliderWrapper,
} from "@/components/uilayouts/progressive-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { IMG } from "./constants";
import {
  SectionHeading,
  sectionHeaderContainerClass,
  sectionTitleAccentWordClass,
  sectionTitleLeadWordClass,
} from "./section-heading";

const HIGHLIGHT_ITEMS = [
  {
    img: IMG.gallery1,
    title: "Dining & cafés",
    desc: "From quick bites to sit-down meals, find flavors that fit every craving.",
    sliderName: "cfc",
    progressBarClass:
      "bg-gradient-to-br from-primary to-[color-mix(in_srgb,var(--primary)_28%,var(--background)_72%)]",
    titleChipClass:
      "border-primary/40 bg-[color-mix(in_srgb,var(--primary)_18%,var(--card)_82%)] text-foreground",
  },
  {
    img: IMG.gallery2,
    title: "Smokehouse & grill",
    desc: "Bold grills and smoky aromas — heart and satisfying.",
    sliderName: "smokin",
    progressBarClass:
      "bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_78%,var(--foreground)_22%)] to-[color-mix(in_srgb,var(--primary)_32%,var(--background)_68%)]",
    titleChipClass:
      "border-[color-mix(in_srgb,var(--border-strong)_70%,var(--primary)_30%)] bg-muted/90 text-foreground",
  },
  {
    img: IMG.gallery3,
    title: "Sweet treats",
    desc: "Cool off with ice cream and desserts perfect for families.",
    sliderName: "nice-cream",
    progressBarClass:
      "bg-gradient-to-br from-accent-soft to-[color-mix(in_srgb,var(--primary)_42%,var(--card)_58%)]",
    titleChipClass: "border-primary/30 bg-accent-soft text-primary",
  },
  {
    img: IMG.building,
    title: "Shopping & strolls",
    desc: "Browse stores, meet friends, and enjoy a welcoming place.",
    sliderName: "mall",
    progressBarClass:
      "bg-gradient-to-br from-border-strong to-[color-mix(in_srgb,var(--border-strong)_45%,var(--primary)_55%)]",
    titleChipClass:
      "border-border-strong bg-[color-mix(in_srgb,var(--card)_88%,var(--primary)_12%)] text-primary",
  },
] as const;

/** Refined shell: palette-aligned card, soft depth — section stays `bg-background` (page) unchanged */
const cardShellClassName =
  "relative mx-auto overflow-hidden rounded-2xl border border-border-strong/75 bg-card text-card-foreground shadow-[0_32px_100px_-32px_rgba(0,0,0,0.72),0_0_0_1px_color-mix(in_srgb,var(--foreground)_8%,transparent)] ring-1 ring-inset ring-[color-mix(in_srgb,var(--foreground)_6%,transparent)]";

export function HighlightsGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Shrink the motion range for a snappier "pop-in" effect rather than a long glide
  const t = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  
  const widthPx = useTransform(t, (p) => {
    if (typeof window === "undefined") return 1200;
    const vw = window.innerWidth;
    const sidePad = 24;
    const wCompact = Math.min(1100, vw - 2 * sidePad);
    /* End state: full viewport width (edge-to-edge highlight) */
    return wCompact + p * (vw - wCompact);
  });

  return (
    <section
      id="highlights"
      data-scroll-theme-light="theme-deep-teal"
      data-scroll-theme-dark="theme-deep-teal"
      className="scroll-mt-24 overflow-x-clip bg-background"
    >
      <div className={cn(sectionHeaderContainerClass, "pt-16 pb-12")}>
        <SectionHeading
          title={
            <div className="flex flex-col">
              <span
                className={cn(
                  sectionTitleLeadWordClass,
                  "font-light uppercase tracking-[0.22em] text-foreground/90"
                )}
              >
                Check
              </span>
              <span className={cn(sectionTitleAccentWordClass, "-mt-3 font-light italic")}>
                Highlights
              </span>
            </div>
          }
        />
      </div>

      <div
        ref={scrollRef}
        className="relative w-full"
        style={{ minHeight: "200vh" }}
      >
        <div className="sticky top-24 z-0 flex h-[calc(100dvh-6rem)] min-h-[calc(100dvh-6rem)] w-full max-w-[100vw] items-center justify-center px-0">
          {hasMounted ? (
            <motion.div
              className={cardShellClassName}
              style={{
                width: widthPx,
                height: "100%",
                maxWidth: "100%",
              }}
            >
              <HighlightsCarouselInner />
            </motion.div>
          ) : (
            <div className={cn(cardShellClassName, "h-full w-full max-w-6xl")}>
              <HighlightsCarouselInner />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function HighlightsCarouselInner() {
  const isSmUp = useMediaQuery("(min-width: 640px)");

  return (
    <ProgressSlider
      vertical={isSmUp}
      fastDuration={300}
      duration={4000}
      activeSlider={HIGHLIGHT_ITEMS[0].sliderName}
      className="flex h-full min-h-0 flex-col-reverse sm:flex-row"
    >
      <SliderBtnGroup className="z-10 grid h-fit w-full grid-cols-2 overflow-hidden sm:flex sm:h-full sm:w-[400px] sm:shrink-0 sm:flex-col sm:bg-gradient-to-b sm:from-card sm:to-[color-mix(in_srgb,var(--muted)_82%,var(--card)_18%)]">
        {HIGHLIGHT_ITEMS.map((item) => (
          <SliderBtn
            key={item.sliderName}
            value={item.sliderName}
            className={cn(
              "group relative border-border/80 p-4 text-left transition-colors duration-300 sm:flex-1 sm:border-b sm:border-b-border-strong/50 last:border-b-0",
              "hover:bg-[color-mix(in_srgb,var(--accent-soft)_55%,transparent)]",
              "aria-selected:bg-[color-mix(in_srgb,var(--primary)_10%,var(--card)_90%)] aria-selected:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--primary)_45%,transparent)]"
            )}
            progressBarClass={cn(
              "absolute bottom-0 left-0 h-1.5 sm:top-0 sm:left-0 sm:h-full sm:w-3 sm:border-r sm:border-r-border-strong/40",
              item.progressBarClass
            )}
          >
            <div className="relative z-10 pl-2 sm:pl-6">
              <h3
                className={cn(
                  "mb-2 w-fit rounded-sm border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] shadow-none sm:text-xs",
                  item.titleChipClass
                )}
              >
                {item.title}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-xs font-medium leading-snug md:text-sm">
                {item.desc}
              </p>
            </div>
          </SliderBtn>
        ))}
      </SliderBtnGroup>

      <SliderContent className="relative min-h-0 w-full flex-1 sm:h-full sm:min-w-0 border-l border-border-strong/55">
        {HIGHLIGHT_ITEMS.map((item, index) => (
          <SliderWrapper
            key={item.sliderName}
            value={item.sliderName}
            className="group absolute inset-0 h-full"
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[1.35s] ease-out motion-reduce:transition-none group-hover:scale-[1.045] motion-reduce:group-hover:scale-100"
                sizes="(max-width: 640px) 100vw, 60vw"
                priority={item.sliderName === HIGHLIGHT_ITEMS[0].sliderName}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-background/15 to-transparent"
                aria-hidden
              />
              <div className="absolute right-4 top-4 border border-primary/35 bg-[color-mix(in_srgb,var(--background)_52%,transparent)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                {String(index + 1).padStart(2, "0")} · Spotlight
              </div>
            </div>
          </SliderWrapper>
        ))}
      </SliderContent>
    </ProgressSlider>
  );
}