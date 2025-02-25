import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CiMenuBurger } from "react-icons/ci";
import Link from "next/link";
import SearchFilter from "./SearchFilter";
import Login from "../Auth/Login";
import { auth } from "@/auth";
import { CgProfile } from "react-icons/cg";
import LogOut from "../Auth/LogOut";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

export default async function NavBar() {
  const session = await auth();
  return (
    <div className="flex items-center justify-between space-x-3 md:space-x-0">
      <Link href="/" className="hidden items-center justify-center space-x-2 md:flex">
        <Image src={"/airbnb.png"} width={25} height={25} alt="logo" />
        <h1 className="text-red-bnb text-xl font-semibold">airbnb</h1>
      </Link>

      <SearchFilter />

      <div className="flex cursor-pointer items-center justify-center">
        <Button variant={"link"} className="hidden rounded-l-full lg:block">
          <Link href={"/"}>Airbnb your home</Link>
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className="pr-1! space-x-1 rounded-full py-5">
              <CiMenuBurger />
              <Avatar>
                <AvatarImage src={session?.user?.image || undefined} />
                <AvatarFallback className="bg-gray-300 text-black">
                  <CgProfile />
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-70">
            <div className="flex flex-col items-start">
              {session?.user === undefined ? (
                <>
                  <Login type="Sign Up" />
                  <Login type="Login" />
                </>
              ) : (
                <>
                  <Button variant={"link"}>My Trips</Button>
                  <Button variant={"link"}>My Favorites</Button>
                  <Button variant={"link"}>My Reservations</Button>
                  <Button variant={"link"}>My Properties</Button>
                  <Button variant={"link"}>Airbnb my home</Button>
                  <Separator />
                  <LogOut />
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
