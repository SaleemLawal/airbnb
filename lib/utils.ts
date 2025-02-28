import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const icons = [
  "beach",
  "windmill",
  "modern",
  "countryside",
  "pool",
  "island",
  "lake",
  "skiing",
  "castle",
  "camping",
  "arctic",
  "cave",
  "desert",
  "barn",
  "lux",
];

export const defaultMapLocation = {
  lat: 40.7128,
  lng: -74.006,
};
export const defaultDate = {
  from: new Date(),
  to: new Date(),
};
