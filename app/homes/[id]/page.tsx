import { Suspense } from "react";
import LoadingHomeDetailSkeleton from "./LoadingHomeDetailSkeleton";
import HomeDetailServer from "./HomeDetailServer";

interface HomeDetailProps {
  params: { id: string };
}

export default async function HomeDetailWrapper({ params }: HomeDetailProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<LoadingHomeDetailSkeleton />}>
      <HomeDetailServer id={id} />
    </Suspense>
  );
}
