"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormWrapper from "./FormWrapper";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";

interface AuthWrapperProps {
  type: "Login" | "Sign Up" | "Log Out";
  onClick?: () => void;
}

export default function AuthWrapper({ type }: AuthWrapperProps) {
  const handleSignOut = () => {
    signOut({
      redirect: true,
      redirectTo: "/",
    });
  };
  const [isRegistering, setIsRegistering] = useState<boolean>(type !== "Sign Up");

  return (
    <Dialog>
      <DialogTrigger asChild>
        {type != "Log Out" ? (
          <Button variant={"link"}>{type}</Button>
        ) : (
          <Button variant={"link"} onClick={handleSignOut}>
            {type}
          </Button>
        )}
      </DialogTrigger>

      {type !== "Log Out" && (
        <DialogContent className="h-[550px] max-w-[350px] p-6 py-8">
          <DialogHeader className={`${isRegistering ? "mb-5" : undefined}`}>
            <DialogTitle>{isRegistering ? "Login" : "Register"}</DialogTitle>
          </DialogHeader>
          <FormWrapper type={type} setIsRegistering={setIsRegistering} isRegistering={isRegistering} />
        </DialogContent>
      )}
    </Dialog>
  );
}
