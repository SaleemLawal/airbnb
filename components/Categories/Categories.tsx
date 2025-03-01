"use client";
import Image from "next/image";
import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { icons } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function Categories() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === searchParams.get("category")) {
      params.delete("category");
    } else {
      params.set("category", category.toLowerCase());
    }
    router.push(`/?${params.toString()}`);
  };
  return (
    <div className="sticky top-[88px] w-full bg-white z-20">
      <ScrollArea className="border-b p-6 md:px-10 whitespace-nowrap">
        <div className="flex space-x-8 items-center justify-between">
          {icons.map((category, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col items-center space-y-2 text-neutral-500 hover:text-neutral-800 cursor-pointer relative`}
                onClick={() => handleClick(category)}
              >
                <Image
                  src={`/categories/${category}.svg`}
                  width={24}
                  height={24}
                  alt={category}
                />
                <p className="text-sm">
                  {category[0].toUpperCase() + category.slice(1)}
                </p>
                {category === searchParams.get("category") ? (
                  <div className="absolute bottom-[0] left-0 w-full h-1 bg-black" />
                ) : (
                  <div className="absolute bottom-[0] left-0 w-full h-1 bg-white"></div>
                )}
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
