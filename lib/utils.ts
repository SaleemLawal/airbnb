import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const iconFiles = [
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
