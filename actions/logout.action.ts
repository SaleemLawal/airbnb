"use server";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export const logOut = async () => {
  await signOut({
    redirect: false,
  });
  revalidatePath("/");
};
