"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Social() {
  const onClick = async (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };
  return (
    <div className="flex flex-col space-y-5">
      <Button
        variant={"outline"}
        className="flex w-full cursor-pointer items-center justify-between border-2 border-black p-6"
        onClick={() => onClick("google")}
        type="button"
      >
        Continue with Google
        <FcGoogle />
      </Button>

      <div>
        <Button
          variant={"outline"}
          className="flex w-full cursor-pointer items-center justify-between border-2 border-black p-6"
          onClick={() => onClick("github")}
          type="button"
        >
          Continue with Github
          <FaGithub />
        </Button>
      </div>
    </div>
  );
}
