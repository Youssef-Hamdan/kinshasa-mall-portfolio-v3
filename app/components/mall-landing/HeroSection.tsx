"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "../premium-header/language-provider";
import { IMG } from "./constants";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const container = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  const heroFade = useTransform(scrollY, [0, 350, 750], [1, 0.75, 0]);
  const heroY = useTransform(scrollY, [0, 750], ["0px", "-80px"]);

  const heroSrc = IMG.heroDay;

  useGSAP(
    () => {
      if (reduceMotion) return;

      const titleSplit = new SplitType("[data-hero='title']", {
        types: "chars",
      });

      if (titleSplit.chars) {
        gsap.set(titleSplit.chars, { yPercent: 100 });

        gsap.to(titleSplit.chars, {
          yPercent: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.1,
        });
      }

      gsap.to("[data-hero='img']", {
        yPercent: 30,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      return () => {
        titleSplit.revert();
      };
    },
    { scope: container, dependencies: [reduceMotion] }
  );

  const scrollPastHero = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      ref={container}
      className="bg-hero-bg relative flex min-h-[100svh] w-full scroll-mt-24 flex-col overflow-hidden max-lg:overflow-x-clip md:scroll-mt-28"
    >
      <motion.div
        style={{ opacity: heroFade, y: heroY }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="hero-kenburns absolute inset-0 z-[1] origin-center overflow-hidden">
          <Image
            data-hero="img"
            key={heroSrc}
            src={heroSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-100"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-background"
          style={{
            opacity: 0.98,
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 48%, black 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 48%, black 100%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: heroFade }}
        className="relative z-10 container mx-auto mt-auto px-4 pb-8 text-left sm:px-6 sm:pb-10 md:pb-12 lg:pb-14"
      >
        <div className="w-full overflow-hidden">
          <h1
            data-hero="title"
            className="text-foreground flex flex-col text-[clamp(3.2rem,10vw,12rem)] font-black uppercase leading-[0.78] tracking-[-0.06em]"
          >
            <span className="whitespace-nowrap">Plus qu’un Mall</span>
            <span className="text-primary mt-4 whitespace-nowrap pl-[0.08em] text-[0.72em] font-light italic tracking-[-0.04em]">
              Une Expérience
            </span>
          </h1>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: heroFade }}
        className="relative z-10 flex w-full flex-col items-center"
      >
        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: reduceMotion ? 0 : 1.1,
            duration: reduceMotion ? 0 : 0.8,
          }}
          className="flex flex-col items-center gap-2 pb-4"
        >
          <button
            type="button"
            onClick={scrollPastHero}
            className="group flex flex-col items-center gap-1 text-primary transition-colors hover:text-foreground"
            aria-label={t.hero.scrollHint}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.28em]">
              {t.hero.scrollHint}
            </span>

            <ChevronDown
              className="h-5 w-5 opacity-90 group-hover:opacity-100 motion-safe:animate-bounce"
              strokeWidth={1.25}
              aria-hidden
            />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}