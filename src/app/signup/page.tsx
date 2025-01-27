"use client";

import React from "react";
import { useRouter } from "next/navigation";


export default function SignupPage() {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });


  const onSignUp = async () => {
    // Sign-up logic will go here
    console.log("User signed up:", user);
  };

  return (
    <div className="flex flex-row gap-32 bg-white justify-center">
      <div className="flex flex-col items-center justify-center h-screen py-2">
        <h1 className=" text-black text-4xl  font-bold">Welcome Back</h1>
        <br />
        <h2 className="text-black text-center  font-medium">
          Today is a new day. It's your day. You shape it.
          <br /> Sign in to start managing your projects.
        </h2>
        <br />
        <hr />

        <input
          className="py-2 px-32 border-2 border-green-800 rounded-lg mb-2 focus:outline-none focus:border-green-900 bg-green-100 text-black"
          id="name"
          type="text"
          placeholder="Enter your Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <br />
        <hr />

        <input
          className="py-2 px-32 border-2 border-green-800 rounded-lg mb-2 focus:outline-none focus:border-green-900 bg-green-100 text-black"
          id="email"
          type="email"
          placeholder="Enter your Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />
        <hr />

        <input
          className="py-2 px-32 border-2 border-green-800 rounded-lg mb-2 focus:outline-none focus:border-green-900 bg-green-100 text-black"
          id="password"
          type="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />

        <button
          className="py-2 px-48 bg-green-800 text-white border-2 font-bold rounded-lg transition-all duration-300 ease-in-out delay-150 hover:bg-white hover:text-green-400 hover:border-2 hover:border-green-400"
          onClick={onSignUp}
        >
          Signup
        </button>
        <br />

        <span className=" flex flex-row gap-2">
          <p className="text-black">Already have an account ? </p>
          <a href="/login" className="text-green-500">
            Login
          </a>{" "}
        </span>

        <div className="flex items-center justify-center w-full my-4">
          <hr className="border-black w-1/2" />
          <span className="mx-2 text-black font-bold">or</span>
          <hr className="border-black w-1/2" />
        </div>

        <div className="flex items-center justify-center w-full gap-5 ">
            <img className="w-9 h-9" src="image/google.png" alt="google image" />
            <img className="w-8 h-8" src="image/facebook.png" alt="" />
            <img className="w-8 h-8" src="image/apple-logo.png" alt="" />
        </div>
      
      </div>
 
      <div className="flex flex-col items-center justify-center h-screen py-2">
        <img
          className="rounded-xl"
          src="image/signuppage.jpg"
          alt="Signup Page Image"
          width="450"
          height="80"
        />
      </div>
    </div>
  );
}
