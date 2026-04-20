import { AboutSection } from "./AboutCommunitySection";
import { AmenitiesScrollSection } from "./AmenitiesScrollSection";
import { MallInfoStackingCards } from "./MallInfoStackingCards";
import { HeroSection } from "./HeroSection";
import { HighlightsGallery } from "./HighlightsGallery";
import { InfoHoursSection } from "./InfoHoursSection";
import { MallFooter } from "./MallFooter";
import { MidPageBanner } from "./MidPageBanner";
import { OffersPromotionsSection } from "./OffersPromotionsSection";
import { StoreDirectoryMosaic } from "./StoreDirectoryMosaic";
import { HeroAmenitiesBridge } from "./HomeHeroBridge";
import { ScrollThemeController } from "./ScrollThemeController";
import { MallStatsSection } from "./MallStatsSection";
import { StackedImageReveal } from "./StackedImageReveal";
import { prisma } from "@/lib/db";
import LeasingSection from "./LeasingSection";

export const revalidate = 60;

export default async function MallLanding() {

  const liveShops = await prisma.shop.findMany({ 
    orderBy: { createdAt: "desc" } 
  });
  
  const uniqueCategories = Array.from(new Set(liveShops.map((shop: any) => shop.category)));

  const dynamicRows = uniqueCategories.map(categoryName => ({
    label: categoryName,
    tiles: liveShops.filter((shop: any) => shop.category === categoryName)
  }));

  // 3. Duplicate the array to create your Marquee's infinite scrolling loop!
  const marqueeRows = [...dynamicRows, ...dynamicRows];

  const liveHighlights = await prisma.highlight.findMany({ 
    orderBy: { createdAt: "desc" } 
  });

  return (
    <div className="bg-background font-sans text-foreground">
      <ScrollThemeController />
      <HeroSection />
      <HeroAmenitiesBridge />
      <AmenitiesScrollSection />
      
      <InfoHoursSection />
      <MallInfoStackingCards />
      <MallStatsSection />
      {/* <MidPageBanner /> */}
      
      <HighlightsGallery highlights={liveHighlights}/>
      <StackedImageReveal />
      {/* <OffersPromotionsSection /> */}
      <StoreDirectoryMosaic marqueeRows={marqueeRows} />
      {/* <AboutSection /> */}
      <LeasingSection />
      <MallFooter />
    </div>
  );
}
