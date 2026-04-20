'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  useAnimationFrame,
} from 'framer-motion';
import { X, Clock, MapPin, Tag } from 'lucide-react'; 
import { TextAnimation } from "@/components/ui/text-animation";
import { cn } from "@/lib/utils";

import { 
  SectionHeading, 
  sectionHeaderContainerClass, 
  storeBandHeadingClass, 
  sectionTitleAccentWordClass, 
  sectionTitleLeadWordClass 
} from "./section-heading";
import { TextReveal } from "./TextReveal";

export type ShopTile = {
  id: string; 
  name: string;
  image: string;
  logo: string;
  description: string;
  floor: string;
  category: string;
};

export type MarqueeRow = {
  label: string;
  tiles: ShopTile[];
};

// ==========================================
// SUB-COMPONENT: SINGLE SHOP TILE (Enhanced)
// ==========================================
function ShopTileItem({ tile, onClick }: { tile: ShopTile; onClick: () => void }) {
  return (
    <figure
      onClick={onClick}
      className="flex w-[17rem] shrink-0 flex-col items-center gap-5 sm:w-[19rem] md:w-[21rem] lg:w-[23rem] cursor-pointer group select-none"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-border-strong">
        <Image 
          src={tile.image} 
          alt={tile.name} 
          fill 
          draggable={false} 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
          sizes="(max-width: 768px) 100vw, 400px" 
        />

        {/* Floating Floor Badge on Tile */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest opacity-0 transform -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <MapPin size={10} className="text-amber-500" /> {tile.floor}
        </div>
        
        <div className="absolute inset-0 z-10 flex items-center justify-center p-10 transition-all duration-700 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/90">
          {tile.logo && (
            <div className="relative z-20 w-full h-full max-h-[35%] opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100">
              <Image src={tile.logo} alt={tile.name} fill draggable={false} className="object-contain brightness-0 invert drop-shadow-2xl" />
            </div>
          )}
        </div>
      </div>
      <figcaption className="text-foreground px-1 text-center">
        <TextReveal className="block text-base sm:text-lg font-bold tracking-[0.15em] uppercase">{tile.name}</TextReveal>
        {/* Subtle floor indicator below name */}
        <span className="text-[10px] text-muted-foreground font-semibold tracking-widest uppercase mt-1 block opacity-60">Located on {tile.floor}</span>
      </figcaption>
    </figure>
  );
}

// ==========================================
// MARQUEE ROW LOGIC
// ==========================================
function wrapMarquee(min: number, max: number, v: number) {
  const rangeSize = max - min;
  if (rangeSize <= 0 || !Number.isFinite(v)) return min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function StoreMarqueeRow({
  tiles,
  onTileClick,
  reverse = false,
  className,
  trackClassName,
  durationSec,
  pauseOnHover = false,
}: {
  tiles: ShopTile[];
  onTileClick: (tile: ShopTile) => void;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
  durationSec: number;
  pauseOnHover?: boolean;
}) {
  const x = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const durationSecRef = useRef(durationSec);
  const reverseRef = useRef(reverse);

  durationSecRef.current = durationSec;
  reverseRef.current = reverse;

  const tick = useCallback((_t: number, deltaMs: number) => {
    const el = contentRef.current;
    if (!el) return;
    const tw = el.offsetWidth / 2;
    if (tw <= 0) return;

    const paused = (pauseOnHover && isHoveredRef.current) || isDraggingRef.current;

    if (!paused) {
      const pxPerSec = (reverseRef.current ? 1 : -1) * (tw / durationSecRef.current);
      const moveBy = pxPerSec * (deltaMs / 1000);
      x.set(wrapMarquee(-tw, 0, x.get() + moveBy));
    }
  }, [x, pauseOnHover]);

  useAnimationFrame(tick);

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <motion.div
        ref={contentRef}
        style={{ x }}
        drag="x"
        dragElastic={0.05}
        dragMomentum={false}
        onDragStart={() => {
          dragMovedRef.current = false;
          isDraggingRef.current = true;
        }}
        onDrag={(_, info) => {
          if (Math.abs(info.offset.x) > 6) dragMovedRef.current = true;
        }}
        onDragEnd={() => {
          isDraggingRef.current = false;
          const el = contentRef.current;
          if (el) {
            const tw = el.offsetWidth / 2;
            if (tw > 0) x.set(wrapMarquee(-tw, 0, x.get()));
          }
        }}
        className={cn("flex w-max touch-pan-x cursor-grab active:cursor-grabbing gap-8 md:gap-12", trackClassName)}
      >
        {tiles.map((tile) => (
          <ShopTileItem key={`${tile.id}-a`} tile={tile} onClick={() => { if (!dragMovedRef.current) onTileClick(tile); }} />
        ))}
        {tiles.map((tile) => (
          <ShopTileItem key={`${tile.id}-b`} tile={tile} onClick={() => { if (!dragMovedRef.current) onTileClick(tile); }} />
        ))}
      </motion.div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT: STORE DIRECTORY
// ==========================================
export function StoreDirectoryMosaic({ marqueeRows }: { marqueeRows: MarqueeRow[] }) {
  const [selectedStore, setSelectedStore] = useState<ShopTile | null>(null);
  const [heroImageFailed, setHeroImageFailed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selectedStore ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedStore]);

  useEffect(() => {
    setHeroImageFailed(false);
  }, [selectedStore?.id]);

  return (
    <section id="stores" className="relative w-full overflow-hidden py-16 md:py-24">
      <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.7 }}>
        
        <div className={cn(sectionHeaderContainerClass, "relative pb-8 md:pb-12")}>
          <SectionHeading
            title={<><span className={cn(sectionTitleLeadWordClass, "text-heading-lead")}>Our</span> <br className="hidden lg:block" /><span className={cn(sectionTitleAccentWordClass, "font-light italic text-heading-accent")}>Stores</span></>}
          />
        </div>

        <div className="relative mt-12 flex w-full flex-col gap-24">
          {marqueeRows.map((row, rowIdx) => (
            <div key={`${row.label}-${rowIdx}`} className="flex flex-col gap-10">
              {row.label && (
                <div className={cn(sectionHeaderContainerClass)}>
                  <TextAnimation as="h3" text={row.label} letterAnime className={cn(storeBandHeadingClass, "tracking-[0.2em] text-muted-foreground uppercase text-xs md:text-sm font-bold opacity-80")} />
                </div>
              )}

              <div className="w-full">
                <StoreMarqueeRow 
                  tiles={row.tiles} 
                  onTileClick={setSelectedStore} 
                  reverse={rowIdx % 2 === 1} 
                  durationSec={65} 
                  className="pb-4"
                  pauseOnHover
                />
              </div>
            </div>
          ))}
        </div>

        {/* Modal Portal (Full Info Display) */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {selectedStore && (
              <motion.div
                key="modal-overlay"
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div role="presentation" onClick={() => setSelectedStore(null)} className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-zoom-out" />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-50 flex h-auto w-full max-w-[540px] flex-col overflow-hidden rounded-[3rem] border border-white/10 bg-transparent shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
                >
                  <div className="relative h-[min(42vh,340px)] min-h-[200px] w-full shrink-0 overflow-hidden bg-muted">
                    {!heroImageFailed && selectedStore.image?.trim() ? (
                      // Native img: works with any HTTPS URL without next/image remotePatterns, and avoids fill/layout quirks in a portal.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={selectedStore.id}
                        src={selectedStore.image}
                        alt={selectedStore.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="eager"
                        decoding="async"
                        onError={() => setHeroImageFailed(true)}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted px-6 text-center text-sm text-muted-foreground">
                        No preview image
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-card via-card/55 to-transparent" />
                  </div>
                  
                  <button type="button" onClick={() => setSelectedStore(null)} className="absolute right-6 top-6 z-[60] p-3 bg-black/40 text-white rounded-full backdrop-blur-xl border border-white/20 transition-transform hover:bg-black/55 active:scale-90">
                    <X size={22} />
                  </button>
                  
                  <div className="relative rounded-b-[3rem] bg-card/95 p-10 pt-5 backdrop-blur-3xl">
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em]">
                      <Tag size={12} /> {selectedStore.category}
                    </div>
                    
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground mb-6">
                      {selectedStore.name}
                    </h2>
                    
                    <div className="flex flex-wrap gap-3 mb-8">
                      {/* Prominent Floor Information */}
                      <div className="flex items-center gap-2.5 text-[11px] font-black text-white bg-zinc-800 border border-white/10 px-5 py-2.5 rounded-full uppercase tracking-widest shadow-lg">
                        <MapPin size={14} className="text-amber-500" /> <span>{selectedStore.floor}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[11px] font-black text-white bg-zinc-800 border border-white/10 px-5 py-2.5 rounded-full uppercase tracking-widest shadow-lg">
                        <Clock size={14} className="text-primary" /> <span>10:00 AM - 10:00 PM</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">About the shop</span>
                      <p className="text-foreground-secondary leading-relaxed text-lg font-light italic">
                        "{selectedStore.description}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </MotionConfig>
    </section>
  );
}