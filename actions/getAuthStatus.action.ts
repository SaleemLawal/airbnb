"use server";

import { auth } from "@/auth";

export const getAuthStatus = async () => {
  const session = await auth();

  if (!session?.user) {
    return null; // Not authenticated
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image || null,
  };
};
