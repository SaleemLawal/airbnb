import { z } from "zod";

export const hostSchema = z.object({
  category: z.enum([
    "BEACH",
    "WINDMILL",
    "MODERN",
    "COUNTRYSIDE",
    "POOL",
    "ISLAND",
    "LAKE",
    "SKIING",
    "CASTLE",
    "CAMPING",
    "ARCTIC",
    "CAVE",
    "DESERT",
    "BARN",
    "LUX",
  ]),
  location: z.string(),
  guestCount: z.number().min(1),
  roomCount: z.number().min(1),
  bathroomCount: z.number().min(1),
  images: z.array(z.string()),
  title: z.string(),
  description: z.string(),
  price: z.number().min(1),
});
