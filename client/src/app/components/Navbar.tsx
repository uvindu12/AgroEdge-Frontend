"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [active, setActive] = useState("home");

  return (
    <nav className="flex items-center px-8 py-2 mx-auto  ">
        <h1 className= "font-bold text-green-700 text-2xl">AGROEDGE</h1>
      {/* Centered Navbar */}

      <div className="flex justify-center flex-1">
        <div className="flex gap-8 bg-green-50 shadow-lg rounded-full px-6 py-3">
          {["home", "Features", "Contact Us", "about", "Team"].map((item) => (
            <Link
              key={item}
              href={`/${item === "home" ? "" : item}`}
              className={`relative px-5 py-2 rounded-full font-semibold transition-all ${
                active === item
                  ? "bg-green-200 text-black"
                  : "text-gray-700 hover:text-black"
              }`}
              onClick={() => setActive(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              
            </Link>
          ))}
        </div>
      </div>
      {/* Login & Sign Up Buttons */}
      <div className="flex gap-4">
        <Link href="/login" passHref>
          <button className="px-5 py-2 rounded-full font-medium text-green-600 border border-green-500 hover:bg-green-100 transition">
            Login
          </button>
        </Link>
        <Link href="/signup" passHref>
          <button className="px-5 py-2 rounded-full font-medium text-white bg-green-600 hover:bg-green-700 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
