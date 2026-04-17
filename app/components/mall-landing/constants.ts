/** Mall listing map / “Open in Maps” links (adjust to the real pin). */
export const MALL_LOCATION = {
  title: "Kinshasa Mall",
  lat: -4.315525,
  lng: 15.291648,
} as const;

/**
 * All imagery from `/public/images` (local assets only).
 * Filenames with spaces are URL-encoded in paths.
 */
export const IMG = {
  /** Hero background — day photo used in light and dark themes (HeroSection, MidPageBanner). */
  heroDay: "/images/hero-night.webp",
  heroNight: "/images/hero-night.webp",
  /** @deprecated Use `heroDay` for on-page heroes */
  hero: "/images/hero-day.webp",
  building: "/images/shops/3C8A8159.webp",
  shopping: "/images/shops/3C8A8598.JPG",
  skyline: "/images/hero-night.webp",
  cityNight: "/images/shops/rest%20post.webp",
  mapPlaceholder: "/images/logo1.webp",
  gallery1: "/images/shops/cfc.webp",
  gallery2: "/images/shops/smokin.webp",
  gallery3: "/images/shops/nice%20cream.webp",
  footerMap: "/images/logo2.webp",
} as const;

/** Marquee store tiles: label + image from `/public/images/shops` */
export const SHOP_TILES = [
  { name: "CFC", image: "/images/shops/cfc.webp" },
  { name: "Al Jawad", image: "/images/shops/al%20jawad.webp" },
  { name: "Meat Way", image: "/images/shops/meat%20way.webp" },
  { name: "Nice Cream", image: "/images/shops/nice%20cream.webp" },
  { name: "Rest Post", image: "/images/shops/rest%20post.webp" },
  { name: "Smokin", image: "/images/shops/smokin.webp" },
  { name: "Kinshasa Mall", image: "/images/shops/3C8A8159.webp" },
  { name: "Food Court", image: "/images/shops/3C8A8595.JPG" },
  { name: "Shopping", image: "/images/shops/3C8A8598.JPG" },
] as const;

export type StoreMarqueeTile = { name: string; image: string };

/** Three scrolling rows under Stores: restaurants, retail, and general mall tiles. */
export const STORE_MARQUEE_ROWS: readonly { label: string | null; tiles: readonly StoreMarqueeTile[] }[] = [
  {
    label: "Restaurants",
    tiles: [
      { name: "Smokin", image: "/images/shops/smokin.webp" },
      { name: "Nice Cream", image: "/images/shops/nice%20cream.webp" },
      { name: "Rest Post", image: "/images/shops/rest%20post.webp" },
    ],
  },
  {
    label: "Shops",
    tiles: [
      { name: "CFC", image: "/images/shops/cfc.webp" },
      { name: "Al Jawad", image: "/images/shops/al%20jawad.webp" },
      { name: "Meat Way", image: "/images/shops/meat%20way.webp" },
    ],
  },
  {
    label: null,
    tiles: [
      { name: "Kinshasa Mall", image: "/images/shops/3C8A8159.webp" },
      { name: "Food Court", image: "/images/shops/3C8A8595.JPG" },
      { name: "Shopping", image: "/images/shops/3C8A8598.JPG" },
    ],
  },
] as const;
