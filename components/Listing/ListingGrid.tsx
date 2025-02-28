import ListingCard from "./ListingCard";

export default function ListingGrid() {
  const content = Array.from({ length: 20 }, (_, i) => <ListingCard key={i} />);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {content}
    </div>
  );
}
