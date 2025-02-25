"use client";
import React from "react";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../ui/separator";
import { RegisterSchema } from "@/schema/register.schema";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Social from "./Social";

interface RegisterFormProps {
  toggle: () => void;
}

export default function RegisterForm({ toggle }: RegisterFormProps) {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} className="p-6 " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} className="p-6 " />
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
                <Input placeholder="Password" type="password" {...field} className="p-6 " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-red-bnb hover:bg-red-bnb/85 w-full p-6">
          Continue
        </Button>

        <Separator />
        <Social />
        <small className="flex flex-col items-center justify-center text-gray-400 sm:flex-row md:gap-2">
          Already have an account?{" "}
          <span className="cursor-pointer text-black hover:underline" onClick={toggle}>
            Log in
          </span>
        </small>
      </form>
    </Form>
  );
}
