"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { cn } from "@/lib/utils";

const STAT_DATA = [
  {
    value: 10000,
    unit: "m2",
    label: "Total Mall Area",
    description: "A sprawling architectural masterpiece in the heart of the city.",
    className: "col-span-12 md:col-span-6 lg:col-span-5 self-start",
  },
  {
    value: 5000,
    unit: "m2",
    label: "Leasing Area",
    description: "Premium spaces tailored for world-class retail brands.",
    className: "col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8 mt-12 lg:mt-32",
  },
  {
    value: 400,
    unit: "cars",
    label: "Indoor Parking",
    description: "Secure and convenient access for all our distinguished guests.",
    className: "col-span-12 md:col-span-5 lg:col-start-3 lg:col-span-4 lg:-mt-20",
  },
  {
    value: 1000,
    unit: "m2",
    label: "Supermarket Area",
    description: "A vast destination for daily essentials and luxury goods.",
    className: "col-span-12 md:col-span-10 lg:col-start-7 lg:col-span-6 mt-16 md:mt-0 lg:self-end",
  },
];

function Counter({ value, unit }: { value: number; unit: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      });
      return () => controls.stop();
    } else {
      setDisplayValue(0);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums font-extralight italic">
      {displayValue.toLocaleString()}
      <span className="text-[0.22em] ml-3 not-italic font-medium uppercase tracking-[0.3em] text-primary align-middle">
        {unit}
      </span>
    </span>
  );
}

export function MallStatsSection() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={container} 
      // Removed bg-background so we can see the Global Hexagons through the section
      className="relative min-h-[50vh] flex items-center py-24 px-6 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="grid grid-cols-12 gap-y-24 md:gap-x-12">
          {STAT_DATA.map((stat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
              className={cn("relative flex flex-col group", stat.className)}
            >
              <div className="relative mb-4">
                <span className="absolute -left-10 top-2 text-[10px] font-bold tracking-[0.5em] text-primary/40 uppercase">
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                <h2 className="text-7xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter text-foreground">
                  <Counter value={stat.value} unit={stat.unit} />
                </h2>
              </div>
              
              <div className="relative pl-6 lg:pl-12 space-y-2">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="absolute left-0 top-0 w-[2px] bg-primary"
                />

                <h3 className="text-sm md:text-base font-bold uppercase tracking-[0.4em] text-foreground">
                  {stat.label}
                </h3>
                
                <p className="max-w-[280px] text-muted-foreground/80 font-light leading-relaxed italic text-xs md:text-sm">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative lines - lowered opacity to stay in background */}
      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent hidden lg:block pointer-events-none" />
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent hidden lg:block pointer-events-none" />
    </section>
  );
}