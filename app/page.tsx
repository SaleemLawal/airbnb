import { auth } from "@/auth";
import Categories from "@/components/Categories/Categories";

export default async function Home() {
  const user = await auth();
  return (
    <main className="min-h-screen">
      <Categories />
      <h1>{user?.user?.name}</h1>
    </main>
  );
}
