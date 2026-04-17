"use client";

import { cn } from "@/lib/utils";
import { createRef, type ReactNode, useRef } from "react";

type ImageMouseTrailProps = {
  items: string[];
  children?: ReactNode;
  className?: string;
  imgClass?: string;
  distance?: number;
  maxNumberOfImages?: number;
  fadeAnimation?: boolean;
};

export default function ImageMouseTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = "h-36 w-28 sm:h-48 sm:w-40",
  distance = 25,
  fadeAnimation = false,
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLElement>(null);
  const refs = useRef(items.map(() => createRef<HTMLImageElement | null>()));
  const currentZIndexRef = useRef(1);

  let globalIndex = 0;
  let last = { x: 0, y: 0 };

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;

    /** Keep trail images below copy (`z-50`); only stack images among themselves. */
    const maxTrailZ = 8;
    if (currentZIndexRef.current > maxTrailZ) {
      currentZIndexRef.current = 1;
    }
    image.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current += 1;

    image.dataset.status = "active";
    if (fadeAnimation) {
      setTimeout(() => {
        image.dataset.status = "inactive";
      }, 1500);
    }
    last = { x, y };
  };

  const distanceFromLast = (x: number, y: number) => {
    return Math.hypot(x - last.x, y - last.y);
  };

  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = "inactive";
  };

  const handleOnMove = (e: { clientX: number; clientY: number }) => {
    const threshold = Math.max(12, window.innerWidth / distance);
    if (distanceFromLast(e.clientX, e.clientY) > threshold) {
      const lead = refs.current[globalIndex % refs.current.length].current;
      const tail =
        refs.current[(globalIndex - maxNumberOfImages) % refs.current.length]?.current;

      if (lead) activate(lead, e.clientX, e.clientY);
      if (tail) deactivate(tail);
      globalIndex++;
    }
  };

  return (
    <section
      onMouseMove={(e) => handleOnMove(e)}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (t) handleOnMove(t);
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) handleOnMove(t);
      }}
      ref={containerRef}
      className={cn(
        "relative isolate grid min-h-[min(520px,72vh)] w-full place-content-center overflow-hidden",
        className,
      )}
    >
      {items.map((item, index) => (
        // eslint-disable-next-line @next/next/no-img-element -- trail uses absolute positioned <img> for performance
        <img
          key={`mousetrail-${index}`}
          className={cn(
            "pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 scale-0 object-cover opacity-0 transition-transform duration-300 data-[status=active]:scale-100 data-[status=active]:opacity-100 data-[status=active]:duration-500 data-[status=active]:ease-out",
            imgClass,
          )}
          data-index={index}
          data-status="inactive"
          src={item}
          alt=""
          ref={refs.current[index]}
        />
      ))}
      {children}
    </section>
  );
}
