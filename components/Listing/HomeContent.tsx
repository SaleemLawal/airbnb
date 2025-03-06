import { getAllHomes, getAllHomesByCategory } from "@/actions/listings.action";
import ListingCard from "./ListingCard";
import Categories from "../Categories/Categories";
import NoListingFound from "./NoListingFound";

interface ListingGridProps {
  category?: string;
}
export default async function HomeContent({ category }: ListingGridProps) {
  const listedHomes = category
    ? await getAllHomesByCategory(category)
    : await getAllHomes();
  let content;

  if (listedHomes.length > 0) {
    content = listedHomes.map((home) => (
      <ListingCard
        key={home.id}
        imgSrc={home.images[0]?.url}
        location={home.location}
        category={home.category}
        price={home.pricePerNight}
        id={home.id}
      />
    ));
  }

  return (
    <>
      <Categories />
      {listedHomes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {content}
        </div>
      ) : (
        <NoListingFound />
      )}
    </>
  );
}
