"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";
// import { useCurrentUser } from "@/hooks/useCurrentUser";
import { defaultMapLocation } from "@/lib/utils";
import HostCarousel from "./HostCarousel";

export default function HostDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(
    defaultMapLocation
  );
  const [, setLocation] = useState<string>("Any Where");

  useEffect(() => {
    if (!isModalOpen) {
      setMapCenter(defaultMapLocation);
      // setGuestCount(1);
      setRoomCount(1);
      setBathroomCount(1);
    }
  }, [isModalOpen]);

  // setting the count and current state of the carousel
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const OnNextClick = () => {
    if (api) {
      if (current === count) {
        setIsModalOpen((prev) => !prev);
      }
      api.scrollTo(api.selectedScrollSnap() + 1);
    }
  };

  const onBackClick = () => {
    if (api) {
      api.scrollTo(api.selectedScrollSnap() - 1);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger
        asChild
        className="transition-transform duration-200 hover:scale-101"
      >
        <Button variant="ghost" className="rounded-full py-3 h-full">
          Airbnb your home
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl px-0">
        <DialogHeader>
          <DialogTitle className="border-b-1 px-6 pb-3 text-center">
            Airbnb your home!
          </DialogTitle>
        </DialogHeader>

        <HostCarousel
          setApi={setApi}
          guestCount={guestCount}
          roomCount={roomCount}
          bathroomCount={bathroomCount}
          mapCenter={mapCenter}
          setGuestCount={setGuestCount}
          setRoomCount={setRoomCount}
          setBathroomCount={setBathroomCount}
          setMapCenter={setMapCenter}
          setLocation={setLocation}
        />

        <DialogFooter className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 px-6">
          {current !== 1 && (
            <Button
              className="w-full flex-1 cursor-pointer border-2 border-black p-6 sm:w-auto"
              variant={"outline"}
              onClick={onBackClick}
            >
              Back
            </Button>
          )}
          <Button
            className="bg-red-bnb hover:bg-red-bnb/85 w-full flex-1 cursor-pointer p-6 sm:w-auto"
            onClick={OnNextClick}
          >
            {current === count ? "Create" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
