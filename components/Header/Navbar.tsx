import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CiMenuBurger } from "react-icons/ci";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import Link from "next/link";
import SearchFilter from "./SearchFilter";
import AuthWrapper from "../Auth/AuthWrapper";
import { auth } from "@/auth";
import { CgProfile } from "react-icons/cg";

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

        <HoverCard openDelay={0} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant={"outline"} className="space-x-1 rounded-full pr-1! py-5">
              <CiMenuBurger />
              <Avatar>
                <AvatarImage src={session?.user?.image || undefined} />
                <AvatarFallback className="bg-gray-300 text-black">
                  <CgProfile />
                </AvatarFallback>
              </Avatar>
            </Button>
          </HoverCardTrigger>

          <HoverCardContent className="w-40">
            <div className="flex flex-col items-start">
              {session?.user === undefined ? (
                <>
                  <AuthWrapper type="Login" />
                  <AuthWrapper type="Sign Up" />{" "}
                </>
              ) : (
                <AuthWrapper type="Log Out" />
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
