"use client";

import {
  ParkingCircle,
  UtensilsCrossed,
  Landmark,
  Accessibility,
} from "lucide-react";

export const AMENITIES = [
  {
    label: "Spacious Parking",
    icon: <ParkingCircle strokeWidth={2.2} />,
  },
  {
    label: "Food Court & Dining",
    icon: <UtensilsCrossed strokeWidth={2.2} />,
  },
  {
    label: "ATM & Banking Services",
    icon: <Landmark strokeWidth={2.2} />,
  },
  {
    label: "Accessible Facilities",
    icon: <Accessibility strokeWidth={2.2} />,
  },
] as const;