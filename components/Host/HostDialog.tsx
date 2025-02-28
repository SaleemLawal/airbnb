"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";
import { defaultMapLocation } from "@/lib/utils";
import HostCarousel from "./HostCarousel";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Login from "../Auth/Login";
import { hostSchema } from "@/schema/host.schema";
import { z } from "zod";
import { hostHome } from "@/actions/host.action";

export default function HostDialog() {
  const user = useCurrentUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(
    defaultMapLocation
  );

  useEffect(() => {
    if (!isModalOpen) {
      setMapCenter(defaultMapLocation);
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

  const handleSubmit = async (value: z.infer<typeof hostSchema>) => {
    try {
      const response = await hostHome(value);
      if (response.success) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting host data:", error);
    }
  };

  const OnNextClick = () => {
    if (api) {
      if (current === count) {
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
      {!user ? (
        <Login type={"Login"} isDialog={true} />
      ) : (
        <DialogContent className="px-0 max-w-[500px] mx-auto">
          <DialogHeader>
            <DialogTitle className="border-b-1 px-6 pb-3 text-center">
              Airbnb your home!
            </DialogTitle>
          </DialogHeader>
          <HostCarousel
            setApi={setApi}
            setMapCenter={setMapCenter}
            mapCenter={mapCenter}
            handleSubmit={handleSubmit}
            current={current}
            count={count}
            onBack={onBackClick}
            onNext={OnNextClick}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}
