"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, type MotionValue } from "framer-motion";
import { UtensilsCrossed, Store, Dumbbell, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STAT_CARDS = [
  {
    label: "Cuisine",
    value: 10,
    suffix: "+",
    icon: UtensilsCrossed,
    imageSrc: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000",
    blurb: "A curated collection of gastronomic experiences, from artisanal coffee houses to world-class fine dining.",
    examples: ["Smokin", "Nice Cream", "Rest Post", "Meat Way"],
  },
  {
    label: "Boutiques",
    value: 40,
    suffix: "+",
    icon: Store,
    imageSrc: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000",
    blurb: "The intersection of global fashion and local craftsmanship. Discover a sanctuary of style and exclusive labels.",
    examples: ["CFC", "Al Jawad", "Meat Way", "Kinshasa Mall"],
  },
  {
    label: "Wellness",
    value: 3,
    suffix: "",
    icon: Dumbbell,
    imageSrc: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000",
    blurb: "State-of-the-art facilities designed for the modern athlete. Elevate your performance in a private, premium environment.",
    examples: ["Main arena", "Fitness studio", "Indoor courts"],
  },
  {
    label: "Leisure",
    value: 2,
    suffix: "",
    icon: Sparkles,
    imageSrc: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000",
    blurb: "Immersive entertainment tailored for discerning guests. Experience cinema and play in their most refined forms.",
    examples: ["Cinema complex", "Family arcade"],
  },
];

const CARD_COUNT = STAT_CARDS.length;

function useCountUp(target: number, durationMs: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = Math.round(durationMs / 16);
    const tick = () => {
      frame++;
      const t = frame / totalFrames;
      const eased = 1 - Math.pow(1 - t, 4);
      setN(Math.round(eased * target));
      if (frame < totalFrames) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, durationMs, active]);
  return n;
}

function StatCardBody({ row }: { row: (typeof STAT_CARDS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const n = useCountUp(row.value, 2000, inView);
  const Icon = row.icon;

  return (
    <div ref={ref} className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12 lg:p-16 overflow-hidden">
      
      {/* 1. Component Watermark: Increased opacity to /20 and set Z-0 */}
      <Icon 
        className="absolute -right-16 -top-16 size-80 text-primary/15 pointer-events-none rotate-12 z-0" 
        strokeWidth={0.3}
      />

      {/* 2. Content: Forced to Z-10 to stay above watermark */}
      <div className="relative z-10 space-y-10">
        <div className="flex flex-col gap-0">
          <motion.div 
            initial={{ height: 0 }}
            animate={inView ? { height: "4rem" } : { height: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="w-px bg-primary/30 ml-6 mb-4" 
          />
          
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex size-12 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary"
            >
              <Icon size={22} strokeWidth={1.5} />
            </motion.div>

            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={inView ? { width: "2.5rem" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-px bg-primary/60" 
              />
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary/80">
                {row.label}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-sans text-7xl font-extralight tracking-tighter md:text-9xl text-foreground">
            {n}{row.suffix}
          </h2>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground md:text-base italic font-light">
            {row.blurb}
          </p>
        </div>
      </div>

      <div className="relative z-10 group cursor-default border-t border-border/60 pt-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Curated Directory</span>
          <div className="flex items-center gap-2 group-hover:text-primary transition-colors cursor-pointer">
            <ArrowUpRight className="size-4 text-muted-foreground/60 group-hover:text-primary transition-all" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {row.examples.map((name, index) => (
            <motion.div 
              key={name}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
              className="flex items-center gap-2.5"
            >
              <div className="size-1 rounded-full bg-primary/40" />
              <span className="text-xs font-medium text-foreground/80 md:text-sm">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StackCard({ i, progress, imageSrc, children, imageLeft }: any) {
  const targetScale = 1 - (CARD_COUNT - i) * 0.04;
  const scale = useTransform(progress, [i * 0.25, 1], [1, targetScale]);
  
  const cardRef = useRef(null);
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(cardScroll, [0, 1], ["-10%", "10%"]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-4">
      <motion.div
        ref={cardRef}
        style={{ scale, top: `calc(6vh + ${i * 20}px)` }}
        /* - Removed 'backdrop-blur-xl'
           - Set background to 'bg-card' (solid) 
           - If you want the global hexagons to peek through slightly, use 'bg-card/95'
        */
        className="relative flex h-[75vh] max-h-[660px] w-full max-w-6xl origin-top overflow-hidden rounded-2xl border border-border/40 bg-card shadow-2xl transition-colors duration-500 hover:border-primary/30"
      >
        <div className={cn("flex w-full flex-col lg:flex-row", imageLeft && "lg:flex-row-reverse")}>
          <div className="flex w-full flex-col lg:w-1/2">
            {children}
          </div>
          <div className="relative hidden h-full w-1/2 overflow-hidden lg:block">
            <motion.div style={{ y }} className="absolute -inset-[20%]">
              <Image 
                src={imageSrc} 
                alt="" 
                fill 
                className="object-cover" 
                sizes="50vw" 
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export function MallInfoStackingCards() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    /* 4. Section Transparency: Removed bg-background to reveal Global Background */
    <section ref={container} id="explore" className="relative z-10 pt-20">
      <div className="mx-auto max-w-7xl">
        {STAT_CARDS.map((row, idx) => (
          <StackCard key={row.label} i={idx} progress={scrollYProgress} imageSrc={row.imageSrc} imageLeft={idx % 2 !== 0}>
            <StatCardBody row={row} />
          </StackCard>
        ))}
      </div>
    </section>
  );
}