"use client";

import Image from "next/image";
import { TextAnimation } from "@/components/ui/text-animation";
import { cn } from "@/lib/utils";
import { IMG } from "./constants";
import { sectionTitleCompactClass } from "./section-heading";
import { TextReveal } from "./TextReveal";

export function MidPageBanner() {
  return (
    <section className="px-4 pb-16 md:px-6 lg:px-8">
      <div className="relative mx-auto min-h-[22rem] max-w-7xl overflow-hidden rounded-3xl py-24 md:min-h-[26rem]">
        <Image
          src={IMG.heroDay}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width:1280px) 100vw, 1280px"
        />
        <div className="bg-photo-scrim-55 absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <TextAnimation
            as="h2"
            text="Welcome to the heart of the city"
            letterAnime
            className={cn(sectionTitleCompactClass, "text-photo-text")}
          />
          <TextAnimation
            as="p"
            text="Steps from transit, parks, and nightlife — your everyday escape and weekend destination in one address."
            letterAnime={false}
            className="text-photo-text-secondary mt-4 text-lg"
          />
          <TextReveal delayMs={170}>
            <button
              type="button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 rounded-full px-8 py-3 text-sm font-semibold transition"
            >
              Read more
            </button>
          </TextReveal>
        </div>
      </div>
    </section>
  );
}
