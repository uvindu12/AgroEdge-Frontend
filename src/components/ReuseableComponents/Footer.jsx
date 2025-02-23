import React from "react";

export default function Footer() {
  return (
    <section class="bg-green-50 dark:bg-gray-900 border-t border-white backdrop-blur-lg dark:border-gray-700 width-[700px]">
    <div class="container px-6 py-8 mx-auto ">
        <div class="text-center">
            {/* <p class="w-32 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"> hey</p> */}
            <img className="w-36 h-36 mx-auto"  src="src/images/agroedgelogo.png" alt="" />


            <div class="flex flex-wrap justify-center gap-4 mt-10">
            <a href="#home"> Home </a>
              <a href="#features"> Features </a>
              <a href="#mission"> About Us </a>
              <a href="#contact"> Contact </a>
              <a href="#team"> Team </a>
            </div>

        </div>

        <hr class="my-6 border-green-300 md:my-10 dark:border-gray-700" />
        <p className="mx-6 pb-2 text-xs">follow us on </p>
        <div class="flex flex-col items-center sm:flex-row sm:justify-between">
            
            <div className= "flex flex-col items-center sm:flex-row sm:justify-between gap-4" > 
                <a href="https://www.instagram.com/agro_edge_?igsh=MTV0eGZqbXcxbGtqcA%3D%3D&utm_source=qr">
              <img
                className="h-7 w-7"
                src="src/images/instagram logo_icon.svg"
                alt="Instagram logo"
              />
            </a>
            <a href="https://www.linkedin.com/in/agro-edge-0630aa342?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
              <img
                className="h-7 w-7"
                src="src/images/inkedin_logo.svg"
                alt="LinkedIn logo"
              />
            </a>
            <a href="https://www.instagram.com/agro_edge_?igsh=MTV0eGZqbXcxbGtqcA%3D%3D&utm_source=qr">
              <img
                className="h-7 w-7"
                src="src/images/facebook_logo.svg"
                alt="Facebook logo"
              />
            </a>
            </div>
          
<div className= "flex flex-col items-center sm:flex-row sm:justify-between gap-1 text-xs">
    <img className="h-4 w-4" src="src/images/copyright_icon.svg" alt=""/>
    <p>2025 AgroEdge | All Rights Reserved </p>
</div>
<p class="w-64 h-2 text-xs">
  Design & Developed By <span class="text-green-600 font-semibold">Team AgroEdge</span>
</p>
        </div>
        

    </div>
</section>
  )
}

