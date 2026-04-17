"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function splitTitleAccent(title: string): { lead: string | null; accent: string } {
  const parts = title.trim().split(/\s+/);
  if (parts.length <= 1) {
    return { lead: null, accent: parts[0] ?? title };
  }
  const accent = parts.pop()!;
  return { lead: parts.join(" "), accent };
}

export function StackedImageReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);

  panelRefs.current = [];
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !panelRefs.current.includes(el)) {
      panelRefs.current.push(el);
    }
  };

  useGSAP(() => {
    if (!triggerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=400%", 
        scrub: 1, 
        pin: true,
        anticipatePin: 1,
      },
    });

    const totalPanels = panelRefs.current.length;

    panelRefs.current.forEach((panel, i) => {
      const isLast = i === totalPanels - 1;

      if (!isLast) {
        // RESTORED: Exact shrink and tilt animation
        tl.to(panel, {
          scale: 0,
          rotate: 15,
          duration: 1,
          ease: "expo.inOut",
          transformOrigin: "center center",
        }, i);
      } else {
        // RESTORED: Exact zoom-out entry for the final panel
        tl.fromTo(panel, 
          { scale: 2.5, rotate: -10 }, 
          { 
            scale: 1, 
            rotate: 0, 
            duration: 1.5, 
            ease: "power4.out" 
          }, 
          i - 0.5 
        );
      }
    });

  }, { scope: containerRef });

  const CONTENT = [
    {
      src: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop",
      label: "Collection 01 / Origins",
      title: "Hand Picked",
      desc: "An artisanal selection of organic excellence, sourced daily from private estates.",
    },
    {
      src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2026&auto=format&fit=crop",
      label: "Collection 02 / Mastery",
      title: "Artisan Gold",
      desc: "Heritage baking traditions meet the warmth of modern patisserie.",
    },
    {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop",
      label: "Collection 03 / Essence",
      title: "Global Elite",
      desc: "Curating the world's most rare ingredients for the refined palate.",
    },
    {
      src: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=2074&auto=format&fit=crop",
      label: "Collection 04 / Presence",
      title: "La Prima",
      desc: "The pinnacle of the retail experience, redefined for the modern age.",
    }
  ];

  return (
    <div ref={containerRef} className="bg-background">
      <div ref={triggerRef} className="relative h-screen w-full overflow-hidden">
        {CONTENT.map((item, i) => {
          const { lead, accent } = splitTitleAccent(item.title);
          return (
          <div 
            key={i}
            ref={addToRefs}
            className="absolute inset-0 w-full h-full will-change-transform flex flex-col justify-center items-center overflow-hidden"
            style={{ zIndex: CONTENT.length - i }}
          >
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src={item.src} 
                alt={item.title} 
                fill 
                className="object-cover saturate-[1.06]" 
                priority={i === 0}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-black/[0.38]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_95%_at_50%_50%,transparent_38%,rgba(0,0,0,0.14)_72%,rgba(0,0,0,0.26)_100%)]"
                aria-hidden
              />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
              <div className="max-w-5xl space-y-10">
                <span className="inline-block rounded-full border border-primary/35 bg-[color-mix(in_srgb,var(--primary)_14%,rgba(0,0,0,0.65)_86%)] px-5 py-1.5 text-[10px] font-medium uppercase tracking-[0.4em] text-primary shadow-[0_2px_24px_rgba(0,0,0,0.35)] backdrop-blur-md md:text-xs">
                  {item.label}
                </span>
                
                <h2 className="font-sans text-7xl font-light italic leading-[0.85] tracking-tight md:text-9xl lg:text-[11rem]">
                  {lead ? (
                    <>
                      <span className="text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_4px_32px_rgba(0,0,0,0.55),0_0_1px_rgba(0,0,0,0.8)]">
                        {lead}{" "}
                      </span>
                      <span className="text-primary [text-shadow:0_2px_28px_rgba(0,0,0,0.65),0_0_40px_color-mix(in_srgb,var(--primary)_35%,transparent_65%)]">
                        {accent}
                      </span>
                    </>
                  ) : (
                    <span className="text-primary [text-shadow:0_2px_28px_rgba(0,0,0,0.65),0_0_40px_color-mix(in_srgb,var(--primary)_35%,transparent_65%)]">
                      {accent}
                    </span>
                  )}
                </h2>
                
                <div className="flex justify-center">
                  <div className="max-w-xl rounded-2xl border border-primary/20 bg-black/50 p-8 shadow-[0_8px_48px_rgba(0,0,0,0.45)] backdrop-blur-md">
                    <p className="text-sm font-light leading-relaxed tracking-wide text-zinc-100 md:text-lg italic">
                      {item.desc}
                    </p>
                    <div className="mx-auto mt-6 h-px w-12 bg-primary/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}