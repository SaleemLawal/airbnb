import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CiMenuBurger } from "react-icons/ci";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import SearchFilter from "./SearchFilter";

export default function DesktopNav() {
  return (
    <div className="flex items-center justify-between space-x-3 md:space-x-0">
      <Link href="/" className="hidden items-center justify-center space-x-2 md:flex">
        <Image src={"/airbnb.png"} width={25} height={25} alt="logo" />
        <h1 className="text-red-bnb text-xl font-semibold">airbnb</h1>
      </Link>

      <SearchFilter />

      <div className="flex cursor-pointer items-center justify-center">
        <Button variant={"link"} className="hidden rounded-l-full lg:block">
          <Link href={""}>Airbnb your home</Link>
        </Button>

        <Popover>
          <Button variant={"outline"} className="space-x-1 rounded-full p-6" asChild>
            <PopoverTrigger className="cursor-pointer">
              <CiMenuBurger />
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-black">SL</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
          </Button>
          <PopoverContent className="flex flex-col items-start">
            <Button variant={"link"}>
              <Link href={"/sign-up"}>Sign Up</Link>
            </Button>
            <Button variant={"link"}>
              <Link href={"/Login"}>Login</Link>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
