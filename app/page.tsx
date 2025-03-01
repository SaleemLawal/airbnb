import Categories from "@/components/Categories/Categories";
import ListingGrid from "@/components/Listing/ListingGrid";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Categories />
      <ListingGrid />
    </main>
  );
}
