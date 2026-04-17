"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Locale = "en" | "fr";

type NavItem = { label: string; href: string };

type Translations = {
  navbar: {
    menuOpen: string;
    menuClosed: string;
    navItems: NavItem[];
  };
  hero: {
    titleLine1: string;
    titleAccent: string;
    description: string;
    scrollHint: string;
  };
  about: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lead: string;
    detail: string;
    supporting: string;
  };
  trustMarquee: string[];
};

const translations: Record<Locale, Translations> = {
  en: {
    navbar: {
      menuOpen: "Close menu",
      menuClosed: "Open menu",
      navItems: [
        { label: "Explore", href: "#explore" },
        { label: "Highlights", href: "#highlights" },
        { label: "Stores", href: "#stores" },
        { label: "About Us", href: "#about" },
      ],
    },
    hero: {
      titleLine1: "More than a",
      titleAccent: "mall",
      description:
        "Curated retail, dining, and experiences in a light-filled space designed for the whole community — right here in Kinshasa.",
      scrollHint: "Explore",
    },
    about: {
      eyebrow: "Our story",
      titleLead: "About",
      titleAccent: "Us",
      lead:
        "We bring together local favorites and global brands in a welcoming space where neighbors meet, families gather, and visitors feel at home.",
      detail:
        "From morning coffee to evening dining, Kinshasa Mall is built for everyday life — wide walkways, convenient parking, and a curated mix of retailers and restaurants so you can shop, eat, and unwind at your own pace.",
      supporting:
        "We are proud to be part of Kinshasa’s growth: a destination where families mark special moments, friends catch up, and first-time visitors discover something new on every trip.",
    },
    trustMarquee: ["Retail", "Dining", "Community", "Events", "Family friendly", "Parking"],
  },
  fr: {
    navbar: {
      menuOpen: "Fermer le menu",
      menuClosed: "Ouvrir le menu",
      navItems: [
        { label: "Découvrir", href: "#explore" },
        { label: "À la une", href: "#highlights" },
        { label: "Magasins", href: "#stores" },
        { label: "À propos", href: "#about" },
      ],
    },
    hero: {
      titleLine1: "Bienvenue dans la plus belle",
      titleAccent: "destination shopping",
      description:
        "Commerces, restauration et loisirs dans un lieu lumineux pensé pour toute la communauté — ici à Kinshasa.",
      scrollHint: "Découvrir",
    },
    about: {
      eyebrow: "À propos",
      titleLead: "Notre",
      titleAccent: "centre",
      lead:
        "Nous réunissons enseignes locales et marques internationales dans un lieu accueillant où les voisins se retrouvent, les familles se retrouvent et les visiteurs se sentent comme chez eux.",
      detail:
        "Du premier café de la journée au dîner en soirée, notre centre est pensé pour le quotidien : allées spacieuses, stationnement pratique et une offre soignée de commerces et de restauration pour profiter du lieu sans stress.",
      supporting:
        "Nous sommes fiers d’accompagner l’évolution de Kinshasa : un lieu où les familles célèbrent les grands moments, où l’on retrouve ses amis et où chaque visite réserve une nouvelle découverte.",
    },
    trustMarquee: ["Commerce", "Restauration", "Communauté", "Événements", "Familles", "Parking"],
  },
};

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
