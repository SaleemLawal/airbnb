"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hostSchema } from "@/schema/host.schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const hostHome = async (values: z.infer<typeof hostSchema>) => {
  const session = await auth();
  const validatedFields = hostSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const getUser = session?.user?.id;

  if (!getUser) {
    return {
      error: "Unauthorized!",
    };
  }

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    images,
    title,
    description,
    price,
  } = validatedFields.data;

  const hostListing = await prisma.$transaction(async (tx) => {
    const listing = await tx.listing.create({
      data: {
        hostId: getUser,
        title,
        description,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        category,
        pricePerNight: price,
      },
    });

    await tx.image.createMany({
      data: images.map((image) => ({
        url: image,
        listingId: listing.id,
      })),
    });

    return listing;
  });
  revalidatePath("/");

  return { success: "Hosted listing", data: hostListing };
};
