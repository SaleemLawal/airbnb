import HomeContent from "@/components/Listing/HomeContent";
interface HomeProps {
  searchParams: { category?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;

  return (
    <main className="h-[80vh]">
      <HomeContent category={category} />
    </main>
  );
}
