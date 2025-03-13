import { getHomeById } from "@/actions/listings.action";
import HomeDetail from "./HomeDetail";

export default async function HomeDetailServer({ id }: { id: string }) {
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  const home = await getHomeById(id);
  if (!home) return null;

  return <HomeDetail home={home} />;
}
