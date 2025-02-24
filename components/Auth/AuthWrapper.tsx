"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormWrapper from "./FormWrapper";

interface AuthWrapperProps {
  type: "Login" | "Sign Up";
  onClick?: () => void;
}

export default function AuthWrapper({ type }: AuthWrapperProps) {
  const [isRegistering, setIsRegistering] = useState<boolean>(type !== "Sign Up");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"}>{type}</Button>
      </DialogTrigger>

      <DialogContent className="h-[550px] max-w-[350px] p-6 py-8">
        <DialogHeader className={`${isRegistering ? "mb-5" : undefined}`}>
          <DialogTitle>{isRegistering ? "Login" : "Register"}</DialogTitle>
        </DialogHeader>
        <FormWrapper type={type} setIsRegistering={setIsRegistering} isRegistering={isRegistering} />
      </DialogContent>
    </Dialog>
  );
}
