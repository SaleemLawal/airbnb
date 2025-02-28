"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogOut() {
  const handleSignOut = async () => {
    await signOut({ redirectTo: "/" });
  };

  return (
    <Button variant={"link"} onClick={handleSignOut}>
      Log Out
    </Button>
  );
}
