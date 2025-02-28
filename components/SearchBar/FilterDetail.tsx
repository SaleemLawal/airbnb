"use client";
import { PiMinusCircleThin, PiPlusCircleThin } from "react-icons/pi";

interface FilterDetailProps {
  title: string;
  description: string;
  borderApply?: boolean;
  count: number;
  setCount: (value: number) => void;
}

export default function FilterDetail({ title, description, borderApply, count, setCount }: FilterDetailProps) {
  const decrementCount = () => {
    if (count - 1 < 0) return;
    setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className={`flex w-full flex-wrap items-center justify-between gap-4 ${borderApply ? "border-b-[1px]" : ""}`}>
      <div className="flex flex-col">
        <div>{title}</div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="text-muted-foreground flex items-center justify-center space-x-2">
        <PiMinusCircleThin className="h-8 w-8 cursor-pointer" onClick={decrementCount} />
        <div className="w-6 text-center">{count}</div>
        <PiPlusCircleThin className="h-8 w-8 cursor-pointer" onClick={incrementCount} />
      </div>
    </div>
  );
}
