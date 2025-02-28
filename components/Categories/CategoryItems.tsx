import { icons } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";

interface CategoryItemsProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function CategoryItems({ value, onChange }: CategoryItemsProps) {
  return (
    <ScrollArea className="h-[305px]">
      <div className={`grid grid-cols-2 gap-x-5 gap-y-10 p-4 cursor-pointer`}>
        {icons.map((icon, index) => {
          return (
            <div
              className={`border-2 rounded-lg p-4 hover:border-black hover:border-2 space-y-3 ${value === icon.toUpperCase() ? "border-black" : "border-gray-200 "}`}
              onClick={() => onChange?.(icon.toUpperCase())}
              key={index}
            >
              <Image
                src={`/categories/${icon}.svg`}
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
