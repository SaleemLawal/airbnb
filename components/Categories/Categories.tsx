"use client";
import Image from "next/image";
import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { iconFiles } from "@/lib/utils";

export default function Categories() {
  return (
    <ScrollArea className="border-b p-6 md:px-10 whitespace-nowrap">
      <div className="flex space-x-8 items-center justify-between">
        {iconFiles.map((icon, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 text-neutral-500 hover:text-neutral-800 cursor-pointer"
              onClick={() => console.log(icon, "clicked")}
            >
              <Image
                src={`categories/${icon}.svg`}
                width={24}
                height={24}
                alt={icon}
              />
              <p className="text-sm">{icon}</p>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
