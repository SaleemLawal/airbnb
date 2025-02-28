import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function ListingCard() {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="p-4 pb-2 space-y-2">
        <CardTitle>
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="https://placehold.co/400x300"
              alt="Card Image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
              className="object-cover hover:scale-110 transition"
              fill
              priority
            />
          </div>
        </CardTitle>
        <CardDescription>
          <p className="font-semibold text-black">Card Description</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-1.5">
        <p className="text-muted-foreground text-sm">Category</p>
        <p className="text-sm">
          <span className="font-semibold">$21</span> Night
        </p>
      </CardContent>
    </Card>
  );
}
