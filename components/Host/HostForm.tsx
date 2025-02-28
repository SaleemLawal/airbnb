import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Separator } from "../ui/separator";
import { Category } from "@prisma/client";

interface HostFormProps {
  form: UseFormReturn<{
    title: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: Category;
    location: string;
    images: string[];
    description: string;
    price: number;
  }>;
}

export default function HostForm({ form }: HostFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Title" {...field} className="p-6" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Description" {...field} className="p-6" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
