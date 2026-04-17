import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { TextAnimation } from "@/components/ui/text-animation";
import { STORE_MARQUEE_ROWS } from "./constants";
import {
  SectionHeading,
  sectionHeaderContainerClass,
  storeBandHeadingClass,
  sectionTitleAccentWordClass,
  sectionTitleLeadWordClass,
} from "./section-heading";
import { TextReveal } from "./TextReveal";
import { MobileAutoScroll } from "./MobileAutoScroll";

function ShopTile({ name, image, className }: { name: string; image: string; className?: string }) {
  return (
    <figure
      className={cn(
        "flex w-[17rem] shrink-0 flex-col items-center gap-4 sm:w-[19rem] md:w-[21rem] lg:w-[23rem]",
        className,
      )}
    >
      <div className="border-foreground/15 ring-foreground/5 relative aspect-square w-full overflow-hidden rounded-3xl border shadow-xl ring-1">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 272px, (max-width: 768px) 304px, (max-width: 1024px) 336px, 368px"
        />
      </div>
      <figcaption className="text-foreground px-1 text-center text-base font-black tracking-wide uppercase sm:text-lg">
        <TextReveal className="block">{name}</TextReveal>
      </figcaption>
    </figure>
  );
}

export function StoreDirectoryMosaic() {
  return (
    <section
      id="stores"
      className="bg-background relative w-full scroll-mt-24 overflow-hidden py-14 md:scroll-mt-28 md:py-18 lg:py-20"
    >
      <div className={cn(sectionHeaderContainerClass, "relative pb-4 md:pb-6")}>
        <SectionHeading
          title={
            <>
              <span className={sectionTitleLeadWordClass}>Our</span>{" "}
              <br className="hidden lg:block" />
              <span className={cn(sectionTitleAccentWordClass, "font-light italic")}>Stores</span>
            </>
          }
        />
      </div>

      <div className="relative mt-12 flex w-full flex-col gap-14 sm:mt-14 sm:gap-16 md:mt-16 md:gap-20">
        {STORE_MARQUEE_ROWS.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={cn("flex flex-col", row.label && "gap-8 sm:gap-9 md:gap-10")}
          >
            {row.label ? (
              <div className={cn(sectionHeaderContainerClass, "pb-1")}>
                <TextAnimation
                  as="h3"
                  text={row.label}
                  letterAnime
                  className={cn(storeBandHeadingClass, "text-left")}
                />
              </div>
            ) : null}
            <div className="hidden md:block">
              <Marquee
                reverse={rowIdx % 2 === 1}
                pauseOnHover
                className={cn(
                  "[--gap:2rem] md:[--gap:2.5rem]",
                  rowIdx === 1 ? "[--duration:48s]" : "[--duration:42s]",
                )}
              >
                {row.tiles.map((tile, idx) => (
                  <ShopTile key={`${tile.name}-${rowIdx}-${idx}`} name={tile.name} image={tile.image} />
                ))}
              </Marquee>
            </div>
            <MobileAutoScroll
              speed={1.5}
              reverse={rowIdx % 2 === 1}
              className="gap-4 px-4 pb-4 md:hidden"
            >
              {Array.from({ length: 4 }).map((_, repeatIdx) => (
                <div key={`repeat-${repeatIdx}`} className="flex gap-4 shrink-0">
                  {row.tiles.map((tile, idx) => (
                    <div key={`mobile-${tile.name}-${rowIdx}-${idx}`} className="shrink-0">
                      <ShopTile name={tile.name} image={tile.image} />
                    </div>
                  ))}
                </div>
              ))}
            </MobileAutoScroll>
          </div>
        ))}
      </div>

      <div
        className="from-background pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-1/4 bg-gradient-to-r to-transparent md:block"
        aria-hidden
      />
      <div
        className="from-background pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-1/4 bg-gradient-to-l to-transparent md:block"
        aria-hidden
      />
    </section>
  );
}
