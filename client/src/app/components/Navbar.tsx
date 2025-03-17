"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [active, setActive] = useState("home");

  return (
    <nav className="flex items-center px-8 py-2 mx-auto  ">
        <h1 className= "font-bold text-green-800 text-3xl">AGRO <span className="text-green-400">EDGE</span></h1>
      {/* Centered Navbar */}

      <div className="flex justify-center flex-1">
        <div className="flex gap-8 bg-green-100 drop-shadow-2xl rounded-full px-6 py-2 m-2">
          <Link
            href="/"
            className={`relative px-5 py-2 rounded-full font-semibold transition-all ${
              active === "home"
                ? "bg-green-300 text-black shadow-lg"
                : "text-gray-700 hover:text-black"
            }`}
            onClick={() => setActive("home")}
          >
            Home
          </Link>

          <Link
            href="/features"
            className={`relative px-5 py-2 rounded-full font-semibold transition-all ${
              active === "features"
                ? "bg-green-300 text-black shadow-lg"
                : "text-gray-700 hover:text-black"
            }`}
            onClick={() => setActive("features")}
          >
            Features
          </Link>

          <Link
            href="/contact us"
            className={`relative px-5 py-2 rounded-full font-semibold transition-all ${
              active === "contact us"
                ? "bg-green-300 text-black shadow-lg"
                : "text-gray-700 hover:text-black"
            }`}
            onClick={() => setActive("contact us")}
          >
            Contact Us
          </Link>

          <Link
            href="/about"
            className={`relative px-5 py-2 rounded-full font-semibold transition-all ${
              active === "about"
                ? "bg-green-300 text-black shadow-lg"
                : "text-gray-700 hover:text-black"
            }`}
            onClick={() => setActive("about")}
          >
            About
          </Link>

          <Link
            href="/team"
            className={`relative px-5 py-2 rounded-full font-semibold transition-all ${
              active === "team"
                ? "bg-green-300 text-black shadow-lg"
                : "text-gray-700 hover:text-black"
            }`}
            onClick={() => setActive("team")}
          >
            Team
          </Link>
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
