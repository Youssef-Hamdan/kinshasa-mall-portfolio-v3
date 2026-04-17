"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin, Info, ArrowUpRight } from "lucide-react";

import { GoogleMapEmbed } from "./GoogleMapEmbed";
import { IMG, MALL_LOCATION } from "./constants";
import { sectionCardTitleClass } from "./section-heading";
import { SocialRow } from "./SocialRow";
import { TextReveal } from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

export function InfoHoursSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Integrated your specific GSAP logic
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  return (
    <section 
      ref={sectionRef}
      className="mx-auto max-w-7xl px-4 pt-24 pb-20 md:pt-32 md:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        
        {/* --- Location Card --- */}
        <motion.div 
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardVariants}
          className="relative col-span-1 md:col-span-7 min-h-[32rem] overflow-hidden rounded-[2.5rem] bg-neutral-900 shadow-2xl"
        >
          {/* GSAP Target: Added data-amenity-img */}
          <div className="absolute inset-0 overflow-hidden">
            <Image 
              data-amenity-img
              src={IMG.cityNight} 
              alt="Mall Location" 
              fill 
              className="object-cover opacity-70 will-change-transform" 
              sizes="(max-width:768px) 100vw, 60vw" 
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
            <div className="space-y-6">
              <TextReveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-xl border border-white/20 uppercase tracking-widest">
                  <MapPin size={14} className="text-primary" /> Location
                </span>
              </TextReveal>
              <TextReveal delayMs={200}>
                <h3 className={`${sectionCardTitleClass} text-white text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter`}>
                  Find us in <br /> Kinshasa.
                </h3>
              </TextReveal>
            </div>

            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2 text-white">
                <p className="text-2xl font-medium">123 Avenue du Commerce</p>
                <p className="text-white/50 text-base uppercase tracking-wider">Gombe, DRC</p>
              </div>
              <SocialRow className="flex gap-4" />
            </div>
          </div>
        </motion.div>

        {/* --- Hours & Map Column --- */}
        <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
          <motion.div 
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            className="flex-1 rounded-[2.5rem] bg-secondary/20 border border-border/40 p-10 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" /> Hours
                </h3>
                <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-500 border border-emerald-500/20">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Open Now
                </span>
              </div>

              <div className="space-y-6">
                {[
                  { day: "Mon – Sun", hours: "08:00 – 23:00" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-border/20 pb-4">
                    <span className="text-muted-foreground text-lg">{item.day}</span>
                    <span className="font-bold text-lg tabular-nums">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex gap-4 rounded-3xl bg-primary/5 p-5 text-sm text-muted-foreground border border-primary/10">
              <Info className="w-5 h-5 shrink-0 text-primary" />
              <p>Holiday hours may vary. Visit our info desk for updates.</p>
            </div>
          </motion.div>

          {/* Map Preview */}
          <motion.div 
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            className="h-56 relative overflow-hidden rounded-[2.5rem] border border-border group/map shadow-xl cursor-pointer"
            // Click handler to open the external map
            onClick={() => {
              const mapUrl = `https://www.google.com/maps/search/?api=1&query=${MALL_LOCATION.lat},${MALL_LOCATION.lng}`;
              window.open(mapUrl, "_blank", "noopener,noreferrer");
            }}
          >
            <GoogleMapEmbed
              fill
              title={MALL_LOCATION.title}
              lat={MALL_LOCATION.lat}
              lng={MALL_LOCATION.lng}
            />
            
            {/* Overlay Scrim */}
            <div className="absolute inset-0 bg-black/20 group-hover/map:bg-transparent transition-colors duration-700 pointer-events-none" />

            {/* Directions Button */}
            <motion.button 
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-5 right-5 bg-white text-black text-xs font-black py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 uppercase tracking-widest z-20"
            >
              Get Directions <ArrowUpRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}