"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

type MotionTagName = keyof typeof motionTags;

type BlurRevealProps = {
  children: ReactNode;
  className?: string;
};

/** Fade + blur reveal for arbitrary rich content (subtitles, leads). */
export function BlurReveal({ children, className }: BlurRevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

type BlurRevealTitleProps = {
  as?: MotionTagName;
  className?: string;
  children: ReactNode;
};

/** Blur-in heading that supports rich children (lines, spans, live numbers). */
export function BlurRevealTitle({ as = "h2", className, children }: BlurRevealTitleProps) {
  const reduce = useReducedMotion();
  const M = motionTags[as] ?? motion.h2;
  return (
    <M
      initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </M>
  );
}

type TextAnimationProps = {
  as?: ElementType;
  text: string;
  letterAnime?: boolean;
  className?: string;
};

function resolveMotionTextTag(Tag: ElementType): (typeof motionTags)[MotionTagName] {
  if (typeof Tag === "string" && Tag in motionTags) {
    return motionTags[Tag as MotionTagName];
  }
  return motion.p;
}

/** Optional per-letter stagger, or a simple fade when `letterAnime` is false. */
export function TextAnimation({
  as: Tag = "p",
  text,
  letterAnime = true,
  className,
}: TextAnimationProps) {
  const reduce = useReducedMotion();

  if (!letterAnime || reduce) {
    const M = resolveMotionTextTag(Tag);
    return (
      <M
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {text}
      </M>
    );
  }

  const tagName: "p" | "h1" | "h2" | "h3" | "h4" =
    typeof Tag === "string" && ["p", "h1", "h2", "h3", "h4"].includes(Tag)
      ? (Tag as "p" | "h1" | "h2" | "h3" | "h4")
      : "p";

  const letters = Array.from(text).map((char, i) => (
    <motion.span
      key={`${i}-${char}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(i * 0.018, 0.9),
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="inline-block"
      style={{ whiteSpace: char === " " ? "pre" : undefined }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));

  switch (tagName) {
    case "h1":
      return <h1 className={className}>{letters}</h1>;
    case "h2":
      return <h2 className={className}>{letters}</h2>;
    case "h3":
      return <h3 className={className}>{letters}</h3>;
    case "h4":
      return <h4 className={className}>{letters}</h4>;
    default:
      return <p className={className}>{letters}</p>;
  }
}
