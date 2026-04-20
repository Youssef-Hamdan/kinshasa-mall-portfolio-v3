"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Store, MapPin, Calendar, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const leasingOptions = [
  {
    icon: Store,
    title: "Rent a Store",
    description: "Secure a premier retail space alongside world-class fashion and lifestyle brands.",
  },
  {
    icon: MapPin,
    title: "Lease a Booth",
    description: "High-visibility pop-up and kiosk spaces perfect for emerging brands and product testing.",
  },
  {
    icon: Calendar,
    title: "Host an Event",
    description: "Transform our stunning architecture into the perfect backdrop for your next brand activation.",
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function LeasingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here (e.g., fetch API to your backend)
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your inquiry. Our leasing team will contact you shortly.");
    }, 1500);
  };

  return (
    <section 
      id="leasing" 
      className="relative w-full overflow-hidden py-24 md:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          ref={containerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left Column: Offerings & Text */}
          <div className="flex flex-col gap-10">
            <motion.div variants={fadeUpVariant} className="flex flex-col gap-4">
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                Leasing & Partnerships
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-heading-lead">
                Bring your vision to{" "}
                <span className="text-heading-accent font-medium">Kinshasa Mall</span>
              </h2>
              <p className="mt-4 text-lg text-foreground-secondary font-light leading-relaxed max-w-xl">
                From permanent flagship locations to high-impact weekend activations, we offer tailored spaces designed to elevate your brand and captivate an exclusive audience.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="flex flex-col gap-8 pt-4">
              {leasingOptions.map((option) => (
                <div key={option.title} className="group flex gap-5 items-start">
                  <div className="flex shrink-0 items-center justify-center rounded-full bg-accent-soft p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <option.icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1 pt-0.5">
                    <h3 className="text-lg font-medium text-foreground tracking-wide">
                      {option.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Inquiry Form */}
          <motion.div 
            variants={fadeUpVariant}
            className={cn(
              "relative overflow-hidden rounded-3xl p-8 sm:p-10",
              "bg-card/40 backdrop-blur-xl border border-border/50",
              "shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] dark:shadow-none"
            )}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-medium text-foreground tracking-wide">Submit an Inquiry</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light">
                Fill out the details below and our commercial team will prepare a bespoke proposal for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-xs font-medium text-foreground-secondary uppercase tracking-wider pl-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    required
                    className="w-full rounded-xl bg-background/50 border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Jane"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-xs font-medium text-foreground-secondary uppercase tracking-wider pl-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    required
                    className="w-full rounded-xl bg-background/50 border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-medium text-foreground-secondary uppercase tracking-wider pl-1">Business Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full rounded-xl bg-background/50 border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="jane@yourbrand.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="inquiryType" className="text-xs font-medium text-foreground-secondary uppercase tracking-wider pl-1">I am interested in...</label>
                <select 
                  id="inquiryType" 
                  required
                  defaultValue="" // The React way to set a default selected option
                  className="w-full rounded-xl bg-background/50 border border-border/60 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select an option</option> {/* Removed 'selected' from here */}
                  <option value="store">Renting a Store</option>
                  <option value="booth">Leasing a Booth / Kiosk</option>
                  <option value="event">Hosting an Event / Activation</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-medium text-foreground-secondary uppercase tracking-wider pl-1">Brand Details & Requirements</label>
                <textarea 
                  id="message" 
                  required
                  rows={4}
                  className="w-full rounded-xl bg-background/50 border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Tell us about your brand and space requirements..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-primary-foreground transition-all duration-500 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(41,188,183,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="text-sm font-medium tracking-wide uppercase">
                  {isSubmitting ? "Sending Inquiry..." : "Submit Inquiry"}
                </span>
                {!isSubmitting && (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background/10 transition-transform duration-500 group-hover:translate-x-1">
                    <Send className="size-4" strokeWidth={2} />
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}