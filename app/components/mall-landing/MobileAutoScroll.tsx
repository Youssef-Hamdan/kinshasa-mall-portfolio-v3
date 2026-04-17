"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function MobileAutoScroll({
  children,
  className,
  speed = 0.5,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isInteracting) {
        // Increment scroll position
        const currentScroll = container.scrollLeft;
        const scrollAmount = reverse ? -speed : speed;
        let newScroll = currentScroll + scrollAmount;

        const firstChild = container.firstElementChild as HTMLElement;
        const blockWidth = firstChild ? firstChild.offsetWidth : 0;
        
        // Add gap size to block width if needed. Assuming 16px (1rem) for gap-4.
        // We can dynamically compute it but this is an approximation for seamless scroll
        const gap = 16; 
        const loopWidth = blockWidth + gap;

        if (loopWidth > 16) {
          // Reset scroll position for infinite loop illusion
          if (!reverse && newScroll >= loopWidth) {
            newScroll -= loopWidth;
          } else if (reverse && newScroll <= 0) {
            newScroll += loopWidth;
          }
        }

        container.scrollLeft = newScroll;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isInteracting, speed, reverse]);

  const handleInteractStart = () => setIsInteracting(true);
  
  const handleInteractEnd = () => {
    // Small delay before resuming auto-scroll to make it feel natural
    setTimeout(() => {
      setIsInteracting(false);
    }, 1000);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      onTouchStart={handleInteractStart}
      onTouchEnd={handleInteractEnd}
      onMouseDown={handleInteractStart}
      onMouseUp={handleInteractEnd}
      onMouseLeave={handleInteractEnd}
      onWheel={handleInteractStart}
    >
      {children}
    </div>
  );
}
