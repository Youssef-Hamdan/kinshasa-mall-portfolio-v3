"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "./language-provider";
import { cn } from "@/lib/utils";
import { scrollToHashId } from "@/lib/hash-scroll";

/** Always show the bar when within this many px of the top (bounce / overscroll). */
const SCROLL_TOP_PIN = 10;
/** Ignore sub-pixel jitter; real direction changes use this minimum step. */
const SCROLL_DELTA = 2;

export default function PremiumHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const scrollRaf = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const latestScrollY = useRef(0);
  const mobileMenuOpenRef = useRef(false);
  mobileMenuOpenRef.current = mobileMenuOpen;
  const reduceMotion = useReducedMotion();

  const scrollY = () =>
    window.pageYOffset ?? document.documentElement.scrollTop ?? 0;

  const handleHashNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    setMobileMenuOpen(false);
    if (pathname !== "/") return;
    e.preventDefault();
    const id = href.slice(1);
    scrollToHashId(id);
    window.history.replaceState(null, "", href);
  };

  useEffect(() => {
    const sync = () => {
      const y = scrollY();
      lastScrollY.current = y;
      latestScrollY.current = y;
    };
    sync();

    const handleScroll = () => {
      latestScrollY.current = scrollY();
      if (scrollRaf.current != null) return;
      scrollRaf.current = requestAnimationFrame(() => {
        scrollRaf.current = null;
        const current = latestScrollY.current;
        setIsScrolled(current > 50);

        if (mobileMenuOpenRef.current) {
          setHeaderVisible(true);
          lastScrollY.current = current;
          return;
        }

        const prev = lastScrollY.current;
        if (current <= SCROLL_TOP_PIN) {
          setHeaderVisible(true);
        } else if (current > prev + SCROLL_DELTA) {
          setHeaderVisible(false);
        } else if (current < prev - SCROLL_DELTA) {
          setHeaderVisible(true);
        }
        lastScrollY.current = current;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRaf.current != null) cancelAnimationFrame(scrollRaf.current);
    };
  }, []);

  // Deep link to /#section after hydration (Next does not always scroll to hash on its own).
  useEffect(() => {
    if (pathname !== "/") return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToHashId(id));
    });
  }, [pathname]);

  return (
    <motion.header
      initial={false}
      animate={{ y: headerVisible ? 0 : "-100%" }}
      transition={
        reduceMotion
          ? { duration: 0.2, ease: "easeOut" }
          : {
              type: "spring",
              stiffness: 380,
              damping: 34,
              mass: 0.72,
            }
      }
      className={cn(
        "fixed top-0 right-0 left-0 z-50 will-change-transform",
        !headerVisible && "pointer-events-none",
        "transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-out",
        isScrolled
          ? "border-border/10 border-b bg-background/90 pb-4 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-md max-md:bg-background/95 max-md:backdrop-blur-sm md:bg-background/70 md:backdrop-blur-2xl"
          : "bg-transparent pb-6 pt-[max(1.5rem,env(safe-area-inset-top))] md:pb-8 md:pt-[max(2rem,env(safe-area-inset-top))]",
      )}
    >
      <div className="container relative mx-auto flex max-w-[100vw] items-center justify-between pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:pl-[max(1.5rem,env(safe-area-inset-left))] sm:pr-[max(1.5rem,env(safe-area-inset-right))] md:pl-[max(3rem,env(safe-area-inset-left))] md:pr-[max(3rem,env(safe-area-inset-right))]">
        {/* Mobile: menu + logo (left). Desktop: logo only in this group. */}
        <div className="relative z-[60] flex min-w-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label={mobileMenuOpen ? t.navbar.menuOpen : t.navbar.menuClosed}
            aria-expanded={mobileMenuOpen}
            className="text-primary hover:text-foreground -ml-1 inline-flex size-10 shrink-0 items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-6" strokeWidth={2} aria-hidden />
            ) : (
              <Menu className="size-6" strokeWidth={2} aria-hidden />
            )}
          </button>
          <Link
            href="/"
            className="relative shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.replaceState(null, "", "/");
              }
            }}
          >
            <Image
              src="/images/logo2.webp"
              alt="Kinshasa Mall"
              width={200}
              height={52}
              className="h-12 w-auto md:h-20 dark:hidden"
              priority
            />
            <Image
              src="/images/logo1.webp"
              alt="Kinshasa Mall"
              width={200}
              height={52}
              className="hidden h-12 w-auto md:h-20 dark:block"
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {t.navbar.navItems.map((item: { label: string; href: string }) =>
            item.href.startsWith("#") ? (
              <a
                key={item.label}
                href={pathname === "/" ? item.href : `/${item.href}`}
                onClick={(e) => handleHashNavClick(e, item.href)}
                className="text-primary hover:text-foreground text-sm font-medium tracking-wide transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-primary hover:text-foreground text-sm font-medium tracking-wide transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageToggle />
          <ModeToggle />
        </div>

        {/* Mobile: language (right), same circular controls as desktop */}
        <div className="relative z-[60] flex items-center gap-2 md:hidden">
          <LanguageToggle />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background absolute top-0 left-0 z-40 flex h-[100svh] min-h-[100svh] w-full flex-col items-center justify-center gap-8 pt-[env(safe-area-inset-top)] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]"
            >
              {t.navbar.navItems.map((item: { label: string; href: string }, i: number) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.href.startsWith("#") ? (
                    <a
                      href={pathname === "/" ? item.href : `/${item.href}`}
                      className="text-primary text-3xl font-light tracking-tight transition-colors hover:text-foreground sm:text-4xl"
                      onClick={(e) => handleHashNavClick(e, item.href)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-primary text-3xl font-light tracking-tight transition-colors hover:text-foreground sm:text-4xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: t.navbar.navItems.length * 0.1 + 0.05,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-border/20 mt-2 flex justify-center border-t pt-8"
              >
                <ModeToggle />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
