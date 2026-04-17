"use client";

import ImageMouseTrail from "@/components/ui/mousetrail";
import { useLanguage } from "../premium-header/language-provider";
import { IMG } from "./constants";
import { cn } from "@/lib/utils";
import {
  sectionEyebrowClass,
  sectionHeaderContainerClass,
  sectionLeadClass,
  sectionTitleAccentWordClass,
  sectionTitleClass,
  sectionTitleLeadWordClass,
} from "./section-heading";

/** Offset for fixed header when scrolling to `#about`. */
const anchorScrollClass = "scroll-mt-24 md:scroll-mt-28";

/** Body copy: TT Commons + semibold + larger than default `sectionLead` scale. */
const aboutBodyClass = cn(
  sectionLeadClass,
  "mt-0 max-w-2xl text-center font-sans font-semibold text-foreground-secondary sm:max-w-3xl lg:max-w-4xl",
  "text-lg leading-relaxed sm:text-xl sm:leading-relaxed md:text-2xl md:leading-relaxed lg:text-[1.65rem] lg:leading-snug",
);

/** Local mall imagery for the cursor trail (same host — no remote config). */
const ABOUT_MOUSE_TRAIL_IMAGES: string[] = [
  IMG.building,
  IMG.shopping,
  IMG.gallery1,
  IMG.gallery2,
  IMG.gallery3,
  "/images/shops/smokin.webp",
  "/images/shops/cfc.webp",
  "/images/shops/nice%20cream.webp",
  "/images/shops/rest%20post.webp",
  "/images/shops/al%20jawad.webp",
];

export function AboutCommunitySection() {
  const { t } = useLanguage();

  return (
    <section id="about" className={`bg-background ${anchorScrollClass}`} aria-label={t.about.eyebrow}>
      <div className={`${sectionHeaderContainerClass} pt-20 pb-16 md:pt-24 md:pb-20`}>
        <ImageMouseTrail
          items={ABOUT_MOUSE_TRAIL_IMAGES}
          maxNumberOfImages={5}
          distance={25}
          imgClass="h-36 w-28 sm:h-48 sm:w-40"
          fadeAnimation
          className="w-full"
        >
          <article className="relative z-50 mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center sm:gap-7 md:px-8 md:py-14 lg:gap-8">
            <p className={cn(sectionEyebrowClass, "mb-0")}>{t.about.eyebrow}</p>

            <h2 className={cn(sectionTitleClass, "text-balance")}>
              <span className={sectionTitleLeadWordClass}>{t.about.titleLead}</span>{" "}
              <span className={`${sectionTitleAccentWordClass} font-light italic`}>{t.about.titleAccent}</span>
            </h2>

            <p className={aboutBodyClass}>{t.about.lead}</p>

            <p className={aboutBodyClass}>{t.about.detail}</p>

            <p className={aboutBodyClass}>{t.about.supporting}</p>
          </article>
        </ImageMouseTrail>
      </div>
    </section>
  );
}
