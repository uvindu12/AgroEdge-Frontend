"use client"

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "../components/ui/Card";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button"
import { s } from "node_modules/framer-motion/dist/types.d-6pKw1mTI";

export default function LoginPage () {
  const [formData, setFormData] = useState ({
    email: "",
    password: "",
    showPassword: false,
  })
  const [showPassword, setShowPassword] = useState (false)
  const [loading, setLoading] = useState (false)
  const [errors, setErrors] =useState<Record<string, string>> ({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> ={}

    if (!formData.email) {
      newErrors.email ="Email is required"
    }else if (!/\S+@\S+\.\S+/ .test(formData.email)) {
      newErrors.email = "Please enter a valid Email Address"
    }

    if (!formData.password){
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys (newErrors).length === 0
  }

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()

    if (!validateForm())
      return

    setLoading (true)
    try {
      await new Promise ((resolve) => setTimeout (resolve, 1500))
      router.push ("/dashboard")
    }catch (error) {
      console.error("Login error:", error)
    }finally { 
      setLoading (false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <h1>hello</h1>
    </div>
  )
}
