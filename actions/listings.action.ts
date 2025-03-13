"use server";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

export const getAllHomes = async () => {
  try {
    const homes = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return homes;
  } catch {
    throw new Error("Failed to fetch homes");
  }
};

export const getAllHomesByCategory = async (category: string) => {
  try {
    const homes = await prisma.listing.findMany({
      where: {
        category: category.toUpperCase() as Category,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!homes) console.log("No Home");
    return homes;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch homes");
  }
};
export const getHomeById = async (id: string) => {
  try {
    return await prisma.listing.findUnique({
      where: {
        id,
      },
      include: {
        images: {
          orderBy: {
            createdAt: "desc",
          },
        },
        host: true,
      },
    });
  } catch {
    throw new Error("Failed to fetch homes");
  }
};
