"use client";

import Image from "next/image";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import ScrollElement from "@/components/ui/scroll-animation";
import { cn } from "@/lib/utils";
import { AMENITIES } from "./AmenitiesBar";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const viewport = { amount: 0.45, margin: "0px 0px 0px 0px" } as const;

const IMAGES = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
];

type LineVariant = "left" | "right";

function AmenityLine({
  item,
  variant,
}: {
  item: (typeof AMENITIES)[number];
  variant: LineVariant;
}) {
  return (
    <div
      className={cn(
        "group flex w-full items-center gap-5",
        variant === "left" ? "justify-start text-left" : "justify-end text-right"
      )}
    >
      {variant === "left" && (
        <div className="text-primary shrink-0 rounded-full border border-primary/20 bg-primary/10 p-4 [&_svg]:h-8 [&_svg]:w-8 md:[&_svg]:h-10 md:[&_svg]:w-10">
          {item.icon}
        </div>
      )}

      <p className="max-w-[12ch] text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        {item.label}
      </p>

      {variant === "right" && (
        <div className="text-primary shrink-0 rounded-full border border-primary/20 bg-primary/10 p-4 [&_svg]:h-8 [&_svg]:w-8 md:[&_svg]:h-10 md:[&_svg]:w-10">
          {item.icon}
        </div>
      )}
    </div>
  );
}

function AmenityTextGroup({
  items,
  align,
  eyebrow,
}: {
  items: readonly (typeof AMENITIES)[number][];
  align: LineVariant;
  eyebrow: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        align === "right" ? "items-end" : "items-start"
      )}
    >
      <span className="text-primary text-xs font-semibold uppercase tracking-[0.35em]">
        {eyebrow}
      </span>

      <div className="flex flex-col gap-8 md:gap-10">
        {items.map((item) => (
          <ScrollElement
            key={item.label}
            direction={align === "left" ? "left" : "right"}
            viewport={viewport}
          >
            <AmenityLine item={item} variant={align} />
          </ScrollElement>
        ))}
      </div>
    </div>
  );
}

function AmenityImage({
  src,
  alt,
  size = "large",
}: {
  src: string;
  alt: string;
  size?: "large" | "small";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        size === "large" && "min-h-[420px] md:min-h-[620px] lg:min-h-[720px]",
        size === "small" && "min-h-[320px] md:min-h-[440px] lg:min-h-[520px]"
      )}
    >
      <div
        data-amenity-img
        className="absolute left-0 top-[-18%] h-[136%] w-full will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/20" />
    </div>
  );
}

export function AmenitiesScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const firstGroup = AMENITIES.slice(0, 2);
  const secondGroup = AMENITIES.slice(2, 4);

  useGSAP(
    () => {
      if (reduceMotion) return;

      gsap.utils.toArray<HTMLElement>("[data-amenity-img]").forEach((img) => {
        gsap.fromTo(
          img,
          { y: "-8%", scale: 1.05 },
          {
            y: "8%",
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top 85%",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );

  return (
    <section
      ref={sectionRef}
      data-scroll-theme-light="theme-deep-teal"
      data-scroll-theme-dark="theme-deep-teal"
      className="bg-background text-foreground overflow-x-clip"
      aria-label="Mall amenities"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 lg:py-32">
        <div className="flex flex-col gap-24 lg:gap-36">
          {/* First block */}
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <AmenityTextGroup
              items={firstGroup}
              align="left"
              eyebrow="Eat & gather"
            />

            <AmenityImage src={IMAGES[0]} alt="CFC shop" size="large" />
          </div>

          {/* Second block */}
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="lg:translate-y-16">
              <AmenityImage src={IMAGES[1]} alt="Smokin shop" size="small" />
            </div>

            <AmenityTextGroup
              items={secondGroup}
              align="right"
              eyebrow="Shop & discover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}