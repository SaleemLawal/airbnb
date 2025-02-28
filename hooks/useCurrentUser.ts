import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session } = useSession();
  if (!session) return null;
  return session?.user;
};
