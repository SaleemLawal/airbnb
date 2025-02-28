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
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hostSchema } from "@/schema/host.schema";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";

interface CarouselWrapperProps {
  mapCenter: { lat: number; lng: number };
  setApi: Dispatch<SetStateAction<CarouselApi | undefined>>;
  setMapCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
  handleSubmit: (value: z.infer<typeof hostSchema>) => void;
  current: number;
  count: number;
  onBack: () => void;
  onNext: () => void;
}

type countriesProp = Awaited<ReturnType<typeof getCities>>;
type FieldName = keyof z.infer<typeof hostSchema>;

export default function HostCarousel({
  setApi,
  mapCenter,
  setMapCenter,
  handleSubmit,
  current,
  count,
  onBack,
  onNext,
}: CarouselWrapperProps) {
  const form = useForm<z.infer<typeof hostSchema>>({
    resolver: zodResolver(hostSchema),
    defaultValues: {
      category: undefined,
      location: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      images: [],
      title: "",
      description: "",
      price: 1,
    },
  });
  const [, setShowImageUpload] = useState(false);
  const [error, setError] = useState("");
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

  const updateMap = useCallback(
    ({ latitude, longitude }: countriesProp) => {
      setMapCenter({ lat: latitude, lng: longitude });
    },
    [setMapCenter]
  );

  const handleClick = async () => {
    let fieldsToValidate: FieldName | FieldName[] = [];
    switch (current) {
      case 1:
        fieldsToValidate = ["category"];
        break;
      case 2:
        fieldsToValidate = ["location"];
        break;
      case 3:
        fieldsToValidate = ["guestCount", "roomCount", "bathroomCount"];
        break;
      case 4:
        fieldsToValidate = ["images"];
        break;
      case 5:
        fieldsToValidate = ["title", "description"];
        break;
      case 6:
        fieldsToValidate = ["price"];
        break;
    }
    const isValid = await form.trigger(fieldsToValidate);
    if (current === count) {
      form.handleSubmit((value) => handleSubmit(value))();
    } else if (isValid) {
      onNext();
    }
  };

  return (
    <Form {...form}>
      <form>
        <Carousel setApi={setApi} className="w-full max-w-[450px] px-4 mx-auto">
          <CarouselContent>
            <CarouselItem key="category">
              <FilterContent
                header="Which of these best describes your place?"
                description="Pick a category"
              >
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CategoryItems
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FilterContent>
            </CarouselItem>

            <CarouselItem key="location">
              <FilterContent
                header="Where is your place located"
                description="Help guests find you!"
              >
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(cityName: string) => {
                            const selectedCity = cities.find(
                              (city) => city.name === cityName
                            );
                            updateMap(selectedCity);
                            field.onChange(selectedCity.city);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a location" />
                          </SelectTrigger>

                          <SelectContent className="max-h-70 overflow-y-auto">
                            <SelectGroup>
                              {cities.length > 0 &&
                                cities.map((val: countriesProp, index) => (
                                  <SelectItem key={index} value={val.name}>
                                    {val.name}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator className="h-0.25 bg-gray-200" />
                {<MyMap center={mapCenter} />}
              </FilterContent>
            </CarouselItem>

            <CarouselItem key="basics">
              <FilterContent
                header="Share some basics about your place"
                description="What amenities do you have?"
              >
                <div className="space-y-12">
                  <FormField
                    control={form.control}
                    name="guestCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FilterDetail
                            title="Guests"
                            description="How many guests are coming?"
                            borderApply
                            count={field.value}
                            setCount={(value) => field.onChange(value)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roomCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FilterDetail
                            title="Rooms"
                            description="How many rooms do you need?"
                            borderApply
                            count={field.value}
                            setCount={(value) => field.onChange(value)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bathroomCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FilterDetail
                            title="Bathrooms"
                            description="How many bathrooms do you need"
                            count={field.value}
                            setCount={(value) => field.onChange(value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FilterContent>
            </CarouselItem>

            <CarouselItem key="photos">
              <FilterContent
                header="Add a photo of your place"
                description="Show guests what your place looks like!"
              >
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload
                          endpoint="postImage"
                          value={field.value}
                          onChange={async (urls) => {
                            field.onChange(urls);
                            if (urls.length === 0) setShowImageUpload(false);
                            await form.trigger("images");
                          }}
                          setError={setError}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
              </FilterContent>
            </CarouselItem>

            <CarouselItem key="description">
              <FilterContent
                header="How would you describe your place?"
                description="Short and sweet works best!"
              >
                <HostForm form={form} />
              </FilterContent>
            </CarouselItem>

            <CarouselItem key="price">
              <FilterContent
                header="Now, set your price"
                description="How much do you charge per night?"
              >
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
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
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FilterContent>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <DialogFooter className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 px-8 mt-7">
          {current !== 1 && (
            <Button
              className="w-full flex-1 cursor-pointer border-2 border-black p-6 sm:w-auto"
              variant={"outline"}
              type="button"
              onClick={onBack}
            >
              Back
            </Button>
          )}
          <Button
            className="bg-red-bnb hover:bg-red-bnb/85 w-full flex-1 cursor-pointer p-6 sm:w-auto"
            type="button"
            onClick={handleClick}
          >
            {current === count ? "Create" : "Next"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
