"use client";
import Image from "next/image";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { defaultDate, defaultMapLocation } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Map from "@/components/Map";
import { Image as ListingImage, Listing, User } from "@prisma/client";

interface HomeDetailProps {
  home: Listing & {
    images: ListingImage[];
    host: User;
  };
}
export default function HomeDetail({ home }: HomeDetailProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    defaultDate
  );

  const nightDifference = () => {
    if (!dateRange?.from || !dateRange?.to) {
      return 0;
    }
    const startDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);

    const nights = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );

    return nights > 0 ? nights : 1;
  };
  return (
    <div className="w-full px-4 sm:mx-auto md:w-[85%] lg:w-3/4 xl:w-[60%] pt-5 space-y-7">
      <div>
        <p className="text-xl font-medium">{home.title}</p>
        <small>{home.location}</small>
      </div>
      <Image
        src={home.images[0]?.url || "https://placehold.co/400x300"}
        alt={home.title}
        width={1200}
        height={800}
        className="w-full rounded-2xl my-5 aspect-[16/9] object-cover"
      />
      <div className="lg:flex lg:gap-10 mt-7">
        <Card className="lg:order-1 lg:w-[50%] h-fit">
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              ${home.pricePerNight}
              <span className="text-muted-foreground text-sm"> night</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Calendar
              className="rounded-md border"
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              disabled={{ before: new Date() }}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-5">
            <Button
              variant="outline"
              className="bg-red-bnb text-white w-full p-6 hover:bg-red-bnb/80 hover:text-white"
            >
              Reserve
            </Button>
            <p className="flex w-full justify-between text-lg font-medium">
              Total <span>$ {nightDifference() * home.pricePerNight}</span>
            </p>
          </CardFooter>
        </Card>

        <div className="lg:w-[50%] space-y-5">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="font-medium text-xl">
                  Hosted by {home.host.name}
                </p>
                <Image
                  src={home.host.image || "https://placehold.co/32x32"}
                  alt="Profile Image"
                  height={32}
                  width={32}
                  className="rounded-full"
                />
              </div>
              <div className="flex text-muted-foreground space-x-3">
                <p>{home.guestCount} guests</p>
                <p>{home.roomCount} bedrooms</p>
                <p>{home.bathroomCount} bathrooms</p>
              </div>
            </div>

            <Separator />
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <p className="font-medium text-xl">
                {home.category[0].toUpperCase() +
                  home.category.slice(1).toLowerCase()}
              </p>
              <p className="text-muted-foreground">
                {`This property ${
                  home.category === "BEACH"
                    ? "is close to the beach"
                    : home.category === "COUNTRYSIDE"
                      ? "is in the countryside"
                      : `has a ${home.category.toLowerCase()} view`
                }`}
              </p>
            </div>

            <Separator />
          </div>

          <p className="text-muted-foreground">{home.description}</p>
          <Separator />

          <Map center={defaultMapLocation} height="400px" />
        </div>
      </div>
    </div>
  );
}
