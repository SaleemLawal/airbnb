"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormWrapper from "./FormWrapper";

interface LoginProps {
  type: "Login" | "Sign Up";
}

export default function Login({ type }: LoginProps) {
  const [isRegistering, setIsRegistering] = useState<boolean>(type !== "Sign Up");

  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button variant={"link"}>{type}</Button>
      </DialogTrigger>

      <DialogContent className=" max-w-[350px] p-6 py-8">
        <DialogHeader className={`${isRegistering ? "mb-5" : undefined}`}>
          <DialogTitle>{isRegistering ? "Login" : "Register"}</DialogTitle>
        </DialogHeader>
        <FormWrapper setIsRegistering={setIsRegistering} isRegistering={isRegistering} />
      </DialogContent>
    </Dialog>
  );
}
