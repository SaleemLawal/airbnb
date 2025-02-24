"use client";
import React from "react";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/login.schema";
import { Separator } from "../ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface LoginFormProps {
  toggle: () => void;
}

export default function LoginForm({ toggle }: LoginFormProps) {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    console.log(values);
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
                <Input placeholder="Email" {...field} className="p-6" />
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
                <Input placeholder="Password" type="password" {...field} className="p-6" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-red-bnb hover:bg-red-bnb/85 w-full p-6">
          Continue
        </Button>

        <Separator />
        <div className="flex flex-col space-y-5">
          <Button
            variant={"outline"}
            className="flex w-full cursor-pointer items-center justify-between border-2 border-black p-6"
          >
            Continue with Google
            <FcGoogle />
          </Button>

          <div>
            <Button
              variant={"outline"}
              className="flex w-full cursor-pointer items-center justify-between border-2 border-black p-6"
            >
              Continue with Github
              <FaGithub />
            </Button>
          </div>
        </div>
        <small className="flex flex-col items-center justify-center text-gray-400 sm:flex-row md:gap-2 mt-10">
          First time using Airbnb?
          <span className="cursor-pointer text-black hover:underline" onClick={toggle}>
            Create an account
          </span>
        </small>
      </form>
    </Form>
  );
}
