import React from "react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-10 w-5/6 mx-auto bg-white border-b border-gray-200 rounded-2xl backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="max-w-5xl px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <span className="text-2xl font-semibold text-gray-900">
            <a href="#">
              <img
                className="w-32 h-32"
                src="src/images/agroedgelogo.png"
                alt=""
              />
            </a>
          </span>
          <ul>
            <div className="flex justify-center space-x-6 text-gray-900">
              <a href="#home"> Home </a>
              <a href="#features"> Features </a>
              <a href="#mission"> About Us </a>
              <a href="#contact"> Contact </a>
              <a href="#team"> Team </a>
            </div>
          </ul>
          <div>
            <a href="https://www.instagram.com/agro_edge_?igsh=MTV0eGZqbXcxbGtqcA%3D%3D&utm_source=qr">
              <img
                className="h-7 w-7"
                src="src/images/instagram logo_icon.svg"
                alt="Instagram logo"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
