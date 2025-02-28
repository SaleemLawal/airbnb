import { z } from "zod";

export const ListingSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),

  description: z.string().min(1, {
    message: "Desctiption is required",
  }),
});
