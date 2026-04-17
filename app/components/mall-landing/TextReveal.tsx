"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

type TextRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before transition starts (ms) */
  delayMs?: number;
  /** `immediate`: play on mount (e.g. hero). `scroll`: when element enters viewport */
  mode?: "scroll" | "immediate";
};

export function TextReveal({
  children,
  className,
  delayMs = 0,
  mode = "scroll",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }
    if (mode === "immediate") {
      const id = window.setTimeout(() => setVisible(true), 30);
      return () => window.clearTimeout(id);
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mode, reduceMotion]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: reduceMotion ? "0ms" : `${delayMs}ms` }}
      className={cn(
        reduceMotion ? "" : "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible || reduceMotion ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
