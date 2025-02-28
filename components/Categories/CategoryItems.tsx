import { icons } from "@/lib/utils";
import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";

export default function CategoryItems() {
  const [activeSelection, setActiveSelection] = useState<string>("")
  return (
    <ScrollArea className="h-[300px]">
      <div className={`grid grid-cols-2 gap-x-5 gap-y-10 p-4 cursor-pointer`}>
        {icons.map((icon, index) => {
          return (
            <div
              className={`border-2 rounded-lg p-4 hover:border-black hover:border-2 space-y-3 ${activeSelection === icon ? "border-black" : "border-gray-200 "}`}
              onClick={() => setActiveSelection(icon)}
              key={index}
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
    </ScrollArea>
  );
}
