/** Shared highlight rail themes — index = count % length when creating a highlight. */
export const HIGHLIGHT_THEME_PRESETS = [
  {
    progressBarClass:
      "bg-gradient-to-br from-primary to-[color-mix(in_srgb,var(--primary)_28%,var(--background)_72%)]",
    titleChipClass:
      "border-primary/40 bg-[color-mix(in_srgb,var(--primary)_18%,var(--card)_82%)] text-primary",
  },
  {
    progressBarClass:
      "bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_78%,var(--foreground)_22%)] to-[color-mix(in_srgb,var(--primary)_32%,var(--background)_68%)]",
    titleChipClass:
      "border-[color-mix(in_srgb,var(--border-strong)_70%,var(--primary)_30%)] bg-muted/90 text-primary",
  },
  {
    progressBarClass:
      "bg-gradient-to-br from-accent-soft to-[color-mix(in_srgb,var(--primary)_42%,var(--card)_58%)]",
    titleChipClass: "border-primary/30 bg-accent-soft text-primary",
  },
  {
    progressBarClass:
      "bg-gradient-to-br from-border-strong to-[color-mix(in_srgb,var(--border-strong)_45%,var(--primary)_55%)]",
    titleChipClass:
      "border-border-strong bg-[color-mix(in_srgb,var(--card)_88%,var(--primary)_12%)] text-primary",
  },
  // Extra cycles so 5th+ highlights don’t reuse only the neutral (grey) chips
  {
    progressBarClass:
      "bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_55%,var(--card)_45%)] to-primary",
    titleChipClass:
      "border-primary/45 bg-[color-mix(in_srgb,var(--primary)_22%,var(--card)_78%)] text-primary",
  },
  {
    progressBarClass:
      "bg-gradient-to-br from-muted to-[color-mix(in_srgb,var(--primary)_38%,var(--muted)_62%)]",
    titleChipClass:
      "border-primary/25 bg-[color-mix(in_srgb,var(--accent-soft)_40%,var(--card)_60%)] text-primary",
  },
  {
    progressBarClass:
      "bg-gradient-to-br from-accent-soft to-[color-mix(in_srgb,var(--primary)_50%,var(--background)_50%)]",
    titleChipClass: "border-primary/40 bg-card text-primary",
  },
  {
    progressBarClass:
      "bg-gradient-to-br from-[color-mix(in_srgb,var(--border-strong)_60%,var(--primary)_40%)] to-primary",
    titleChipClass:
      "border-border-strong/80 bg-[color-mix(in_srgb,var(--primary)_14%,var(--card)_86%)] text-primary",
  },
] as const;
