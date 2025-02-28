import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CiMenuBurger } from "react-icons/ci";
import Link from "next/link";
import FilterDialog from "@/components/SearchBar/FilterDialog";
import Login from "../Auth/Login";
import { auth } from "@/auth";
import { CgProfile } from "react-icons/cg";
import LogOut from "../Auth/LogOut";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import HostDialog from "../Host/HostDialog";

export default async function NavBar() {
  const session = await auth();

  return (
    <div className="flex items-center justify-between space-x-3 md:space-x-0">
      <Link
        href="/"
        className="hidden items-center justify-center space-x-2 lg:flex"
      >
        <Image src={"/airbnb.png"} width={25} height={25} alt="logo" />
        <h1 className="text-red-bnb text-xl font-semibold">airbnb</h1>
      </Link>

      <FilterDialog />

      <div className="flex cursor-pointer items-center justify-center space-x-2">
        <div className="hidden md:block">
          <HostDialog />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="pr-1! space-x-1 rounded-full py-5 flex items-center justify-center"
            >
              <CiMenuBurger className="w-8 h-8 stroke-[1.5]" />
              <Avatar className="hidden sm:block">
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
                  <Button variant={"link"}>
                    <Link href="/trips">My Trips</Link>
                  </Button>
                  <Button variant={"link"}>
                    <Link href="/favorites">My Favorites</Link>
                  </Button>
                  <Button variant={"link"}>
                    <Link href="/reservations">My Reservations</Link>
                  </Button>
                  <Button variant={"link"}>
                    <Link href="/properties">My Properties</Link>
                  </Button>
                  <Button variant={"link"}>
                    <Link href="/host-home">Airbnb my home</Link>
                  </Button>
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
