"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function NoListingFound() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="flex items-center justify-center flex-col h-full space-y-3">
      <p className="font-medium text-2xl">No exact matches</p>
      <p className="text-muted-foreground text-md">
        Try changing your filters or category
      </p>
      <Button
        variant="outline"
        className="border-black border-2 p-5 px-6"
        onClick={handleClick}
      >
        Remove Filters
      </Button>
    </div>
  );
}
