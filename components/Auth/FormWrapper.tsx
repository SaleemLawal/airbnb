"use client";
import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { cn } from "@/lib/utils";

interface FormWrapperProps {
  type: "Login" | "Sign Up";
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
  isRegistering: boolean;
}

export default function FormWrapper({ type, setIsRegistering, isRegistering }: FormWrapperProps) {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleRegisterFormSwitch = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsRegistering(false);
      setIsTransitioning(false);
    }, 300);
  };

  const handleLoginFormSwitch = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsRegistering(true);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div
      className={cn(
        `relative overflow-hidden transition-opacity duration-300 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"}`,
      )}
    >
      {isRegistering ? (
        <LoginForm toggle={handleRegisterFormSwitch} />
      ) : (
        <RegisterForm toggle={handleLoginFormSwitch} />
      )}
    </div>
  );
}
