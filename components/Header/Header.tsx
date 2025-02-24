import Image from "next/image";
import React from "react";
import DesktopNav from "./Navbar";

export default function Header() {
  return (
    <div className="border p-6">
      <DesktopNav />
    </div>
  );
}
