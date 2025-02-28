"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/login.schema";
import { Separator } from "../ui/separator";
import Social from "./Social";
import { login } from "@/actions/login.action";
import FormError from "../Status/FormError";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  toggle: () => void;
}

export default function LoginForm({ toggle }: LoginFormProps) {
  const { update } = useSession();
  const router = useRouter();
  const [, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await login(values);

      if (response?.error) {
        form.reset();
        setError(response.error);
        return;
      }
      await update();
      router.refresh();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  className="p-6"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  {...field}
                  className="p-6"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <Button
          type="submit"
          className="bg-red-bnb hover:bg-red-bnb/85 w-full p-6"
          disabled={isPending}
        >
          Continue
        </Button>

        <Separator />
        <Social />
        <small className="mt-10 flex flex-col items-center justify-center text-gray-400 sm:flex-row md:gap-2">
          First time using Airbnb?
          <span
            className="cursor-pointer text-black hover:underline"
            onClick={toggle}
          >
            Create an account
          </span>
        </small>
      </form>
    </Form>
  );
}
