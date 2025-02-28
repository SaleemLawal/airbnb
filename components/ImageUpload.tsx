"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface ImageUploadProps {
  onChange: (urls: string[]) => void;
  value: string[];
  endpoint: "postImage";
  setError: Dispatch<SetStateAction<string>>;
}

function ImageUpload({
  endpoint,
  value,
  onChange,
  setError,
}: ImageUploadProps) {
  if (value.length > 0) {
    return (
      <div className="flex flex-wrap gap-4">
        {value.map((val, index) => (
          <div key={index} className="relative size-40">
            <Image
              src={val}
              alt="Upload"
              className="rounded-md size-40 object-cover"
              fill
            />
            <button
              onClick={() => {
                onChange(value.filter((_, i) => i !== index));
              }}
              className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
              type="button"
            >
              <XIcon className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res) {
          const urls = res.map((file) => file.ufsUrl);
          onChange([...value, ...urls]);
        }
        setError("");
      }}
      onUploadError={(error: Error) => {
        switch (error.name) {
          case "UploadThingError":
            setError("Invalid number of files");
            break;
          default:
            setError("Error Uploading File");
            break;
        }
      }}
    />
  );
}

export default ImageUpload;
