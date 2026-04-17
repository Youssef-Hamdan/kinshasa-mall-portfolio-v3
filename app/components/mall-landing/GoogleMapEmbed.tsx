"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { googleMapsEmbedSrc } from "@/lib/google-maps";
import { cn } from "@/lib/utils";

type GoogleMapEmbedProps = {
  title: string;
  lat: number;
  lng: number;
  className?: string;
  /** Fill a sized parent (e.g. footer thumbnail); omits default min-heights / flex-1 */
  fill?: boolean;
};

export function GoogleMapEmbed({ title, lat, lng, className, fill = false }: GoogleMapEmbedProps) {
  const narrowViewport = useMediaQuery("(max-width: 1023px)");
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  return (
    <div
      className={cn(
        !fill &&
          "relative mt-2 min-h-[88px] flex-1 overflow-hidden rounded-xl border border-border/40 bg-muted/35 max-lg:mt-1.5 max-lg:min-h-[56px] max-lg:rounded-lg sm:max-lg:min-h-[64px] sm:max-lg:rounded-md md:min-h-[112px]",
        fill && "relative mt-0 h-full min-h-0 w-full overflow-hidden rounded-[inherit] border-0",
        className,
      )}
      style={narrowViewport ? { contain: "paint" } : undefined}
    >
      {mapReady ? (
        <iframe
          title={`Map — ${title}`}
          src={googleMapsEmbedSrc(lat, lng)}
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-muted/10" aria-hidden />
      )}
    </div>
  );
}
