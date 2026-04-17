"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollBaseMarquee from "@/components/ui/scroll-text-marque";
export function HeroAmenitiesBridge() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background px-4"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="w-full text-center"
      >
        <ScrollBaseMarquee
          delay={500}
          baseVelocity={-3}
          clasname="text-foreground text-[clamp(4rem,13vw,14rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]"
        >
          A new way to meet -
          </ScrollBaseMarquee>

        <ScrollBaseMarquee
          delay={500}
          baseVelocity={3}
          clasname="text-primary text-[clamp(4rem,13vw,14rem)] font-black uppercase italic leading-[0.82] tracking-[-0.08em]"
        >
          shop, eat, and stay.
        </ScrollBaseMarquee>
      </motion.div>

    </section>
  );
}