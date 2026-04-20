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
import {
  SectionHeading,
  sectionHeaderContainerClass,
  sectionTitleAccentWordClass,
  sectionTitleLeadWordClass,
} from "./section-heading";

export type HighlightItem = {
  id: string;
  title: string;
  desc: string;
  img: string;
  sliderName: string;
  progressBarClass: string;
  titleChipClass: string;
};

const cardShellClassName =
  "relative mx-auto overflow-hidden rounded-2xl border border-border-strong/75 bg-card text-card-foreground shadow-[0_32px_100px_-32px_rgba(0,0,0,0.72),0_0_0_1px_color-mix(in_srgb,var(--foreground)_8%,transparent)] ring-1 ring-inset ring-[color-mix(in_srgb,var(--foreground)_6%,transparent)]";

export function HighlightsGallery({ highlights }: { highlights: HighlightItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // 1. We use state to store the actual DOM element after hydration
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // 2. Capture the element once the component is mounted in the browser
    if (scrollRef.current) {
      setScrollElement(scrollRef.current);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    // 3. ONLY target the element if it exists in state. 
    // This bypasses the hydration crash entirely.
    target: scrollElement ? { current: scrollElement } : undefined,
    offset: ["start start", "end end"],
  });

  const t = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  
  const widthPx = useTransform(t, (p) => {
    // Failsafe: return a clean 100% width during SSR/Initial Load
    if (typeof window === "undefined" || !scrollElement) return "100%";
    
    const vw = window.innerWidth;
    const sidePad = 24;
    const wCompact = Math.min(1100, vw - 2 * sidePad);
    return `${wCompact + p * (vw - wCompact)}px`;
  });

  if (!highlights || highlights.length === 0) return null;

  return (
    <section
      id="highlights"
      className="scroll-mt-24 overflow-x-clip bg-background"
    >
      <div className={cn(sectionHeaderContainerClass, "pt-16 pb-12")}>
        <SectionHeading
          title={
            <div className="flex flex-col">
              <span className={cn(sectionTitleLeadWordClass, "font-light uppercase tracking-[0.22em] text-foreground/90")}>
                Check
              </span>
              <span className={cn(sectionTitleAccentWordClass, "-mt-3 font-light italic")}>
                Highlights
              </span>
            </div>
          }
        />
      </div>

      {/* 4. The container providing the scroll height */}
      <div
        ref={scrollRef}
        className="relative w-full"
        style={{ minHeight: "200vh" }}
      >
        <div className="sticky top-24 z-0 flex h-[calc(100dvh-6rem)] min-h-[calc(100dvh-6rem)] w-full max-w-[100vw] items-center justify-center px-0">
          <motion.div
            className={cardShellClassName}
            style={{
              width: widthPx,
              height: "100%",
              maxWidth: "100%",
            }}
          >
            <HighlightsCarouselInner highlights={highlights} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HighlightsCarouselInner({ highlights }: { highlights: HighlightItem[] }) {
  const isSmUp = useMediaQuery("(min-width: 640px)");

  return (
    <ProgressSlider
      vertical={isSmUp}
      fastDuration={300}
      duration={4000}
      activeSlider={highlights[0].id}
      slideIds={highlights.map((h) => h.id)}
      className="flex h-full min-h-0 flex-col-reverse sm:flex-row"
    >
      <SliderBtnGroup className="z-10 grid h-fit w-full grid-cols-2 overflow-x-hidden overflow-y-auto sm:min-h-0 sm:flex sm:h-full sm:w-[400px] sm:shrink-0 sm:flex-col sm:overflow-y-auto sm:bg-gradient-to-b sm:from-card sm:to-[color-mix(in_srgb,var(--muted)_82%,var(--card)_18%)]">
        {highlights.map((item) => (
          <SliderBtn
            key={item.id}
            value={item.id}
            className={cn(
              "group relative border-border/80 p-4 text-left transition-colors duration-300 sm:min-h-0 sm:flex-1 sm:border-b sm:border-b-border-strong/50 last:border-b-0",
              "hover:bg-[color-mix(in_srgb,var(--accent-soft)_55%,transparent)]",
              "aria-selected:bg-[color-mix(in_srgb,var(--primary)_10%,var(--card)_90%)]"
            )}
            progressBarClass={cn(
              "absolute bottom-0 left-0 h-1.5 sm:top-0 sm:left-0 sm:h-full sm:w-3 sm:border-r sm:border-r-border-strong/40",
              item.progressBarClass
            )}
          >
            <div className="relative z-10 pl-2 sm:pl-6">
              <h3
                className={cn(
                  "mb-2 w-fit rounded-sm border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs shadow-none",
                  item.titleChipClass,
                  "text-primary"
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
        {highlights.map((item, index) => (
          <SliderWrapper key={item.id} value={item.id} className="group absolute inset-0 h-full">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[1.35s] ease-out group-hover:scale-[1.045]"
                sizes="(max-width: 640px) 100vw, 60vw"
                priority={index === 0}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-background/15 to-transparent" />
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