import { cn } from "@/lib/utils";
import { SectionHeading, sectionHeaderContainerClass } from "./section-heading";
import { TextReveal } from "./TextReveal";

export function OffersPromotionsSection() {
  return (
    <section id="promotions" className={cn(sectionHeaderContainerClass, "pb-24")}>
      <div className="bg-muted rounded-3xl px-8 py-16">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="text-left">
            <SectionHeading
              title={
                <>
                  <span className="text-primary">Offers</span> &amp; promotions
                </>
              }
              lead="Members get early access to sales, birthday treats, and partner perks across fashion, tech, and dining."
              leadClassName="text-foreground-secondary mt-4 max-w-none"
              leadDelayMs={80}
            />
            <div className="text-foreground mt-8 grid grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2">
                <li>
                  <TextReveal delayMs={100} className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Weekend double points</span>
                  </TextReveal>
                </li>
                <li>
                  <TextReveal delayMs={140} className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Free gift wrap</span>
                  </TextReveal>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <TextReveal delayMs={120} className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Dining bundles</span>
                  </TextReveal>
                </li>
                <li>
                  <TextReveal delayMs={160} className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>Parking rebates</span>
                  </TextReveal>
                </li>
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <TextReveal delayMs={180}>
                <button
                  type="button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7 py-3 text-sm font-semibold transition"
                >
                  Join rewards
                </button>
              </TextReveal>
              <TextReveal delayMs={220}>
                <button
                  type="button"
                  className="border-primary text-primary hover:bg-primary/10 rounded-full border-2 bg-transparent px-7 py-3 text-sm font-semibold transition"
                >
                  View catalog
                </button>
              </TextReveal>
            </div>
          </div>
          <div className="relative flex min-h-[280px] items-center justify-center">
            <div className="from-card to-background ring-border/40 absolute left-1/2 top-1/2 z-0 h-56 w-40 -translate-x-[58%] -translate-y-1/2 -rotate-6 rounded-2xl bg-gradient-to-br shadow-xl ring-1">
              <div className="flex h-full flex-col justify-between p-4">
                <TextReveal delayMs={40}>
                  <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">Gift card</span>
                </TextReveal>
                <TextReveal delayMs={90}>
                  <span className="text-foreground block text-center text-2xl font-black italic tracking-tight">NIKE</span>
                </TextReveal>
                <TextReveal delayMs={130}>
                  <span className="text-muted-foreground text-[10px]">Valid at participating stores</span>
                </TextReveal>
              </div>
            </div>
            <div className="bg-gradient-kinshasa-promo ring-accent-foreground/15 relative z-10 h-56 w-40 rotate-6 rounded-2xl shadow-xl ring-1">
              <div className="text-accent-foreground flex h-full flex-col justify-between p-4">
                <TextReveal delayMs={60}>
                  <span className="text-accent-foreground/85 text-xs font-semibold tracking-wider uppercase">Gift card</span>
                </TextReveal>
                <TextReveal delayMs={110}>
                  <span className="text-accent-foreground block text-center text-2xl font-black tracking-tight">H&amp;M</span>
                </TextReveal>
                <TextReveal delayMs={150}>
                  <span className="text-accent-foreground/80 text-[10px]">Redeem in-store or online</span>
                </TextReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
