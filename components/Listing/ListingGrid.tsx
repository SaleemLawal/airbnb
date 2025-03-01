import { getAllHomes } from "@/actions/host.action";
import ListingCard from "./ListingCard";

export default async function ListingGrid() {
  const listedHomes = await getAllHomes();
  const content = listedHomes.map((home) => (
    <ListingCard
      key={home.id}
      imgSrc={home.images[0]?.url}
      title={home.title}
      category={home.category}
      price={home.pricePerNight}
    />
  ));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {content}
    </div>
  );
}
