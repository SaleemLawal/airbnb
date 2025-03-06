"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListingCardProps {
  imgSrc: string;
  price: number;
  location: string;
  category: string;
  id: string;
}

export default function ListingCard({
  imgSrc,
  location,
  category,
  price,
  id,
}: ListingCardProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/homes/${id}`);
  };
  return (
    <Card className="gap-0 py-0 cursor-pointer" onClick={handleClick}>
      <CardHeader className="p-4 pb-2 space-y-2">
        <CardTitle>
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={
                imgSrc !== undefined ? imgSrc : "https://placehold.co/400x300"
              }
              alt="Card Image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
              className="object-cover hover:scale-110 transition"
              fill
              priority
            />
          </div>
        </CardTitle>
        <CardDescription>
          <p className="font-semibold text-black">{location}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-1.5">
        <p className="text-muted-foreground text-sm">
          {category[0].toUpperCase() + category.slice(1).toLowerCase()}
        </p>
        <p className="text-sm">
          <span className="font-semibold">${price}</span> Night
        </p>
      </CardContent>
    </Card>
  );
}
