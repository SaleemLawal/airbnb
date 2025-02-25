"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Social() {
  const [isPending, setIsPending] = useState(false);

  const onClick = async (provider: "google" | "github") => {
    setIsPending(true);
    try {
      await signIn(provider, {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="flex flex-col space-y-5">
      <Button
        variant={"outline"}
        className="flex w-full cursor-pointer items-center justify-between border-2 border-black p-6"
        onClick={() => onClick("google")}
        type="button"
        disabled={isPending}
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
          disabled={isPending}
        >
          Continue with Github
          <FaGithub />
        </Button>
      </div>
    </div>
  );
}
