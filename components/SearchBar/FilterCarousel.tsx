"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterDetail from "@/components/SearchBar/FilterDetail";
import FilterContent from "@/components/SearchBar/FilterContent";
import { Calendar } from "@/components/ui/calendar";
import MyMap from "../Map";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { DateRange } from "react-day-picker";
import { Separator } from "../ui/separator";
import { getCities } from "@/actions/cities";

interface CarouselWrapperProps {
  dateRange: DateRange | undefined;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  mapCenter: { lat: number; lng: number };
  setGuestCount: Dispatch<SetStateAction<number>>;
  setRoomCount: Dispatch<SetStateAction<number>>;
  setBathroomCount: Dispatch<SetStateAction<number>>;
  setLocation: Dispatch<SetStateAction<string>>;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
  setApi: Dispatch<SetStateAction<CarouselApi | undefined>>;
  setMapCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

type locationsProp = Awaited<ReturnType<typeof getCities>>;

export default function FilterCarousel({
  setApi,
  dateRange,
  guestCount,
  roomCount,
  bathroomCount,
  mapCenter,
  setGuestCount,
  setRoomCount,
  setBathroomCount,
  setDateRange,
  setMapCenter,
  setLocation,
}: CarouselWrapperProps) {
  const updateMap = useCallback(
    ({ latitude, longitude }: locationsProp) => {
      setMapCenter({ lat: latitude, lng: longitude });
    },
    [setMapCenter]
  );

  const [cities, setCities] = useState<locationsProp[]>(() => {
    const cachedCities = localStorage.getItem("cities");
    if (!cachedCities) return [];
    return JSON.parse(cachedCities);
  });

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

  return (
    <Carousel setApi={setApi} className="w-full overflow-x-auto px-4">
      <CarouselContent>
        <CarouselItem>
          <FilterContent
            header="Where do you wanna go?"
            description="Find the perfect location"
          >
            <Select
              onValueChange={(value: locationsProp) => {
                updateMap(value);
                setLocation(value.city);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>

              <SelectContent className="max-h-70 overflow-y-auto">
                <SelectGroup>
                  {cities.length > 0 &&
                    cities.map((val: locationsProp, index) => (
                      <SelectItem key={index} value={val}>
                        {val.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Separator className="h-0.25 bg-gray-200" />
            {<MyMap center={mapCenter} />}
          </FilterContent>
        </CarouselItem>

        <CarouselItem>
          <FilterContent
            header="When do you plan go?"
            description="Make sure eveyone is free!"
          >
            <Calendar
              className="rounded-md border"
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              disabled={{ before: new Date() }}
            />
          </FilterContent>
        </CarouselItem>

        <CarouselItem>
          <FilterContent
            header="More information"
            description="Find your perfect place!"
          >
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
  );
}
