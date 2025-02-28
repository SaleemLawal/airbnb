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
import MyMap from "../Map";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Separator } from "../ui/separator";
import { getCities } from "@/actions/cities";
import CategoryItems from "../Categories/CategoryItems";
import ImageUpload from "../ImageUpload";
import FormError from "../Status/FormError";
import HostForm from "../Host/HostForm";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

interface CarouselWrapperProps {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  mapCenter: { lat: number; lng: number };
  setGuestCount: Dispatch<SetStateAction<number>>;
  setRoomCount: Dispatch<SetStateAction<number>>;
  setBathroomCount: Dispatch<SetStateAction<number>>;
  setLocation: Dispatch<SetStateAction<string>>;
  setApi: Dispatch<SetStateAction<CarouselApi | undefined>>;
  setMapCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

type countriesProp = Awaited<ReturnType<typeof getCities>>;

export default function HostCarousel({
  setApi,
  guestCount,
  roomCount,
  bathroomCount,
  mapCenter,
  setGuestCount,
  setRoomCount,
  setBathroomCount,
  setMapCenter,
  setLocation,
}: CarouselWrapperProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  // const [isPosting, setIsPosting] = useState(false);
  const [, setShowImageUpload] = useState(false);
  const [error, setError] = useState("");

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
        <CarouselItem>
          <FilterContent
            header="Which of these best describes your place?"
            description="Pick a category"
          >
            <CategoryItems />
          </FilterContent>
        </CarouselItem>

        <CarouselItem>
          <FilterContent
            header="Where is your place located"
            description="Help guests find you!"
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
            {<MyMap center={mapCenter} />}
          </FilterContent>
        </CarouselItem>

        <CarouselItem>
          <FilterContent
            header="Share some basics about your place"
            description="What amenities do you have?"
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

        <CarouselItem>
          <FilterContent
            header="Add a photo of your place"
            description="Show guests what your place looks like!"
          >
            <ImageUpload
              endpoint="postImage"
              value={imageUrls}
              onChange={(urls) => {
                setImageUrls(urls);
                if (urls.length === 0) setShowImageUpload(false);
              }}
              setError={setError}
            />
            <FormError message={error} />
          </FilterContent>
        </CarouselItem>

        <CarouselItem>
          <FilterContent
            header="How would you describe your place?"
            description="Short and sweet works best!"
          >
            <HostForm />
          </FilterContent>
        </CarouselItem>

        <CarouselItem>
          <FilterContent
            header="Now, set your price"
            description="How much do you charge per night?"
          >
            <div className="relative">
              <DollarSign
                width={16}
                height={16}
                className="absolute left-1 top-1/2 -translate-y-1/2"
              />
              <Input
                placeholder="Price"
                className="p-6"
                type="number"
                min={0}
              />
            </div>
          </FilterContent>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
