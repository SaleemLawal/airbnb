import { z } from "zod";

export const hostSchema = z.object({
  category: z.enum(
    [
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
    ],
    {
      message: "Please select a category",
    }
  ),
  location: z.string().min(1, "Location is required"),
  guestCount: z.number().min(1, "At least 1 guest is required"),
  roomCount: z.number().min(1, "At least 1 room is required"),
  bathroomCount: z.number().min(1, "At least 1 bathroom is required"),
  images: z.array(z.string()).min(1, "Please upload at least one image"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price must be at least $1"),
});
