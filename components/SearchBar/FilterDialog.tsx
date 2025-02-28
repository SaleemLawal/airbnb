"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { defaultMapLocation, defaultDate } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type CarouselApi } from "@/components/ui/carousel";
import FilterCarousel from "./FilterCarousel";
import { Separator } from "@radix-ui/react-separator";

export default function FilterDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    defaultDate
  );
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
      setDateRange(defaultDate);
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
        <Button
          variant={"outline"}
          asChild
          className="cursor-pointer rounded-full py-6 pl-6 pr-2.5"
        >
          <div className="md:flex-0 flex-1 md:justify-center">
            <p>Anywhere</p>

            <Separator
              orientation="vertical"
              className="hidden h-6 w-[1px] bg-gray-400 md:block"
            />
            <p className="hidden md:block">Any week</p>

            <Separator
              orientation="vertical"
              className="hidden h-6 w-[1px] bg-gray-400 md:block"
            />
            <p className="hidden md:block">{`Add Guests`}</p>

            <div className="bg-red-bnb ml-auto flex h-10 w-10 items-center justify-center rounded-full ">
              <Search className="text-white" />
            </div>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl px-0">
        <DialogHeader>
          <DialogTitle className="border-b-1 px-6 pb-3 text-center">
            Filters
          </DialogTitle>
        </DialogHeader>

        <FilterCarousel
          setApi={setApi}
          dateRange={dateRange}
          guestCount={guestCount}
          roomCount={roomCount}
          bathroomCount={bathroomCount}
          mapCenter={mapCenter}
          setDateRange={setDateRange}
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
            {current === count ? "Search" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
