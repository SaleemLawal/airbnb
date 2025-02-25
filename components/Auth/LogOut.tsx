"use client";
import { logOut } from "@/actions/logout.action";
import React from "react";
import { Button } from "../ui/button";

export default function LogOut() {
  const handleSignOut = () => {
    logOut();
  };
  return (
    <Button variant={"link"} onClick={handleSignOut}>
      Log Out
    </Button>
  );
}
