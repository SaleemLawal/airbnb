"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Search } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Map from "../Map";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterContent from "./FilterContent";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import FilterDetail from "./FilterDetail";
import { getCities } from "@/actions/cities";

type countriesProp = Awaited<ReturnType<typeof getCities>>;

export default function SearchFilter() {
  const mapZoom = 10;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [_, setCount] = useState(0);
  const [date, setDate] = useState<DateRange | undefined>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [cities, setCities] = useState<countriesProp[]>(() => {
    const cachedCities = localStorage.getItem("cities");
    if (!cachedCities) return [];
    return JSON.parse(cachedCities);
  });
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await getCities();

        if (value.data) {
          setCities(value.data);
          localStorage.setItem("cities", JSON.stringify(value.data));
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    if (cities.length === 0) {
      fetchData();
    }
  }, [cities]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const OnNextClick = useCallback(() => {
    if (api) {
      api.scrollTo(api.selectedScrollSnap() + 1);
    }
  }, [api]);

  const onBackClick = useCallback(() => {
    if (api) {
      api.scrollTo(api.selectedScrollSnap() - 1);
    }
  }, [api]);

  const updateMap = useCallback(
    ({ latitude, longitude }: countriesProp) => {
      setMapCenter({ lat: latitude, lng: longitude });
    },
    [setMapCenter],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} asChild className="cursor-pointer rounded-full py-6 pl-6 pr-2.5">
          <div className="md:flex-0 flex-1 md:justify-center">
            <p>Anywhere</p>

            <Separator orientation="vertical" className="hidden h-6 w-[1px] bg-gray-200 md:block" />
            <p className="hidden md:block">Any week</p>

            <Separator orientation="vertical" className="hidden h-6 w-[1px] bg-gray-200 md:block" />
            <p className="hidden md:block">Add Guests</p>

            <div className="bg-red-bnb ml-auto flex h-10 w-10 items-center justify-center rounded-full ">
              <Search className="text-white" />
            </div>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:px-10">
        <DialogHeader>
          <DialogTitle className="border-b-1">Filters</DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <Carousel setApi={setApi} className="w-full overflow-x-auto">
          <CarouselContent>
            <CarouselItem>
              <FilterContent header="Where do you wanna go?" description="Find the perfect location">
                <Select onValueChange={(value) => updateMap(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>

                  <SelectContent className="max-h-70 overflow-y-auto">
                    <SelectGroup>
                      {cities.length > 0 &&
                        cities.map((val: countriesProp, index) => (
                          <SelectItem key={index} value={val}>
                            {val.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Separator className="h-0.25 bg-gray-200" />
                <Map center={mapCenter} zoom={mapZoom} />
              </FilterContent>
            </CarouselItem>
            <CarouselItem>
              <FilterContent header="Where do you plan go?" description="Make sure eveyone is free!">
                <Calendar
                  className="rounded-md border"
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  disabled={{ before: new Date() }}
                />
              </FilterContent>
            </CarouselItem>
            <CarouselItem>
              <FilterContent header="More information" description="Find your perfect place!">
                <div className="space-y-12">
                  <FilterDetail
                    title="Guests"
                    description="How many guests are coming?"
                    borderApply
                    count={guestCount}
                    setCount={setGuestCount}
                  />
                  <FilterDetail
                    title="Rooms"
                    description="How many rooms do you need?"
                    borderApply
                    count={roomCount}
                    setCount={setRoomCount}
                  />
                  <FilterDetail
                    title="Bathrooms"
                    description="How many bathrooms do you need"
                    count={bathroomCount}
                    setCount={setBathroomCount}
                  />
                </div>
              </FilterContent>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <DialogFooter className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
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
            {current === 3 ? "Search" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
