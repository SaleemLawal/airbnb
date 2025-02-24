import React from "react";
import { PiMinusCircleThin, PiPlusCircleThin } from "react-icons/pi";

interface FilterDetailProps {
  title: string;
  description: string;
  borderApply?: boolean;
}
export default function FilterDetail({ title, description, borderApply }: FilterDetailProps) {
  return (
    <div className={`flex w-full flex-wrap items-center justify-between gap-4 ${borderApply ? "border-b-[1px]" : ""}`}>
      <div className="flex flex-col">
        <div>{title}</div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="text-muted-foreground flex items-center justify-center space-x-2">
        <PiMinusCircleThin className="h-8 w-8 cursor-pointer" />
        <div className="w-6 text-center">1</div>
        <PiPlusCircleThin className="h-8 w-8 cursor-pointer" />
      </div>
    </div>
  );
}
