// login/page.tsx
"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "", // Changed to username to match backend
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Make API call to login
      const response = await api.post("/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to the activities page
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      setErrors({ form: error.response?.data?.message || "Invalid username or password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-10">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-semibold">
                Welcome Back to <span className="text-green-400">AgroEdge</span>
              </span>
            </div>
          </div>

          <div>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Log in to access your personalized farming insights and tools.
            </p>
          </div>

          {errors.form && (
            <div className="p-3 bg-red-50 text-red-800 rounded-md">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-green-700">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={cn("mt-1 block w-full rounded-md border-green-300", errors.username && "border-red-500")}
                />
                {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-green-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={cn("mt-1 block w-full rounded-md border-green-300", errors.password && "border-red-500")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-700"
                  >
                    {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember for 30 Days
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm font-medium text-green-500 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-300 text-white font-medium py-2 px-4 rounded-md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-green-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">OR</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <img className="h-5 w-5 mr-2" src="/images/google.png" alt="Google logo" />
                <span>Sign up with Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <img className="h-5 w-5 mr-2" src="/images/facebook.png" alt="Facebook logo" />
                <span>Sign up with Facebook</span>
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-green-600 hover:text-green-500">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 bg-green-50">
        <div className="flex flex-col justify-center px-12 text-white">
          <div className="flex flex-col justify-center px-12 py-10 h-full">
            <img
              src="/images/login.jpg"
              alt="Login"
              className="rounded-3xl max-h-screen shadow-2xl shadow-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}