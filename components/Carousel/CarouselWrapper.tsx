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
import FilterDetail from "@/components/Header/FilterDetail";
import FilterContent from "@/components/Header/FilterContent";
import { Calendar } from "@/components/ui/calendar";
import Map from "../Map";
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
  isRegistration: boolean;
}

type countriesProp = Awaited<ReturnType<typeof getCities>>;

export default function CarouselWrapper({
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
  isRegistration,
}: CarouselWrapperProps) {
  const mapZoom = 7;

  const updateMap = useCallback(
    ({ latitude, longitude }: countriesProp) => {
      setMapCenter({ lat: latitude, lng: longitude });
    },
    [setMapCenter]
  );

  const [cities, setCities] = useState<countriesProp[]>(() => {
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
        {isRegistration && (
          <CarouselItem>
            <FilterContent
              header="Which of these best describes your place?"
              description="Pick a category"
            >
              <p>Categories</p>
            </FilterContent>
          </CarouselItem>
        )}

        <CarouselItem>
          <FilterContent
            header={
              isRegistration
                ? "Where is your place located"
                : "Where do you wanna go?"
            }
            description={
              isRegistration
                ? "Help guests find you!"
                : "Find the perfect location"
            }
          >
            <Select
              onValueChange={(value: countriesProp) => {
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
                    cities.map((val: countriesProp, index) => (
                      <SelectItem key={index} value={val}>
                        {val.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Separator className="h-0.25 bg-gray-200" />
            {<Map center={mapCenter} zoom={mapZoom} />}
          </FilterContent>
        </CarouselItem>

        {!isRegistration && (
          <CarouselItem>
            <FilterContent
              header="Where do you plan go?"
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
        )}
        <CarouselItem>
          <FilterContent
            header={
              isRegistration
                ? "Share some basics about your place"
                : "More information"
            }
            description={
              isRegistration
                ? "What amenities do you have?"
                : "Find your perfect place!"
            }
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

        {isRegistration && (
          <CarouselItem>
            <FilterContent
              header="Add a photo of your place"
              description="Show guests what your place looks like!"
            >
              <p>Render Image</p>
            </FilterContent>
          </CarouselItem>
        )}

        {isRegistration && (
          <CarouselItem>
            <FilterContent
              header="How would you describe your place?"
              description="Short and sweet works best!"
            >
              <p>Render listing description</p>
            </FilterContent>
          </CarouselItem>
        )}

        {isRegistration && (
          <CarouselItem>
            <FilterContent
              header="Now, set your price"
              description="How much do you charge per night?"
            >
              <p>Render pricing</p>
            </FilterContent>
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  );
}
