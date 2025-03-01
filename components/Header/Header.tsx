import React from "react";
import NavBar from "./Navbar";

export default function Header() {
  return (
    <div className="sticky top-0 w-full bg-white z-30 border-b p-6 md:px-10">
      <NavBar />
    </div>
  );
}
