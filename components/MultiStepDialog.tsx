"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CarouselWrapper from "./Carousel/CarouselWrapper";
import { useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import { DateRange } from "react-day-picker";

interface MultiStepDialogProps {
  title: string;
  children: React.ReactNode;
  isRegistration: boolean;
}

const defaultMapLocation = {
  lat: 40.7128,
  lng: -74.006,
};
const defaultDate = {
  from: new Date(),
  to: new Date(),
};

export default function MultiStepDialogContent({
  title,
  children,
  isRegistration,
}: MultiStepDialogProps) {
  let footerTitile = "";

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    defaultDate
  );
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(
    defaultMapLocation
  );
  const [location, setLocation] = useState<string>("");

  if (current !== count) {
    footerTitile = "Next";
  } else {
    if (isRegistration) {
      footerTitile = "Create";
    } else {
      footerTitile = "Search";
    }
  }

  useEffect(() => {
    if (!isModalOpen) {
      setMapCenter(defaultMapLocation);
      setLocation("");
      setDateRange(defaultDate);
      setGuestCount(1);
      setRoomCount(1);
      setBathroomCount(1);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleSearch = () => {
    //TODO:SEND FORM
    console.log({
      location,
      dateRange,
      guestCount,
      roomCount,
      bathroomCount,
    });
    setIsModalOpen((prev) => !prev);
  };

  const OnNextClick = () => {
    if (api) {
      if (current === count) {
        handleSearch();
      } else {
        api.scrollTo(api.selectedScrollSnap() + 1);
      }
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
        {children}
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl px-0">
        <DialogHeader>
          <DialogTitle className="border-b-1 px-6 pb-3 text-center">
            {title}
          </DialogTitle>
        </DialogHeader>

        <CarouselWrapper
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
          isRegistration={isRegistration}
        />

        <DialogFooter className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 px-6">
          {current !== 1 && (
            <Button
              className="w-full flex-1 cursor-pointer border-2 border-black p-4 sm:w-auto"
              variant={"outline"}
              onClick={onBackClick}
            >
              Back
            </Button>
          )}
          <Button
            className="bg-red-bnb hover:bg-red-bnb/85 w-full flex-1 cursor-pointer p-4 sm:w-auto"
            onClick={OnNextClick}
          >
            {footerTitile}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
