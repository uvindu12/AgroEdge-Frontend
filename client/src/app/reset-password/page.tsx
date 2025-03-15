"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle, Loader2, ShieldCheck, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"



interface PasswordStrength {
  score: number
  label: string
  color: string
}

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const router = useRouter()
  const token = params.token

  // Verify token on page load
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`/api/reset-password/verify/${token}`)
        const data = await response.json()

        setIsTokenValid(data.valid)
        if (!data.valid) {
          setError(data.message || "Invalid or expired token")
        }
      } catch (err) {
        setError("Failed to verify token. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [token])

  // Password strength calculation
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    if (!password) {
      return { score: 0, label: "Very Weak", color: "bg-red-500" }
    }

    let score = 0

    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    // Normalize score to 0-100
    const normalizedScore = Math.min(Math.floor(score * 20), 100)

    // Determine label and color
    if (normalizedScore < 20) {
      return { score: normalizedScore, label: "Very Weak", color: "bg-red-500" }
    } else if (normalizedScore < 40) {
      return { score: normalizedScore, label: "Weak", color: "bg-orange-500" }
    } else if (normalizedScore < 60) {
      return { score: normalizedScore, label: "Moderate", color: "bg-yellow-500" }
    } else if (normalizedScore < 80) {
      return { score: normalizedScore, label: "Strong", color: "bg-blue-500" }
    } else {
      return { score: normalizedScore, label: "Very Strong", color: "bg-green-600" }
    }
  }

  const passwordStrength = calculatePasswordStrength(password)

  const validateForm = () => {
    if (!password) {
      setError("Please enter a new password")
      return false
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return false
    }

    if (passwordStrength.score < 40) {
      setError("Please choose a stronger password")
      return false
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/reset-password/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password")
      }

      // Show success state
      setIsSubmitted(true)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to reset password. The link may have expired.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-600" />
          <p className="mt-4 text-gray-600">Verifying your reset link...</p>
        </div>
      </div>
    )
  }

  // Show invalid token state
  if (!isTokenValid && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
                <span className="text-2xl font-semibold">AgroEdge</span>
              </div>
            </Link>
          </div>

          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Invalid or Expired Link</CardTitle>
              <CardDescription className="text-center">
                The password reset link is invalid or has expired.
              </CardDescription>
            </CardHeader>
            <CardContent >
              <p className="mb-6 text-gray-600">Please request a new password reset link to continue.</p>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/forgot-password")}>
                Request New Link
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/login" className="text-sm text-green-600 hover:underline">
                Back to login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
              <span className="text-2xl font-semibold">AgroEdge</span>
            </div>
          </Link>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
              <Link href="/login">
                <Button  className="rounded-full h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to login</span>
                </Button>
              </Link>
            </div>
            <CardDescription>Create a new password for your AgroEdge account</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium">Password Reset Successfully</h3>
                  <p className="text-sm text-gray-500">
                    Your password has been updated. You can now log in with your new password.
                  </p>
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => router.push("/login")}>
                    Go to Login
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="text-sm">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {password && (
                    <div className="space-y-1 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Password Strength</span>
                        <span className="text-xs font-medium">{passwordStrength.label}</span>
                      </div>
                      <Progress value={passwordStrength.score} className={`h-1 ${passwordStrength.color}`} />

                      <div className="text-xs text-gray-500 mt-2">
                        <p>Password should include:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li className={password.length >= 8 ? "text-green-600" : ""}>At least 8 characters</li>
                          <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>Uppercase letters (A-Z)</li>
                          <li className={/[a-z]/.test(password) ? "text-green-600" : ""}>Lowercase letters (a-z)</li>
                          <li className={/[0-9]/.test(password) ? "text-green-600" : ""}>Numbers (0-9)</li>
                          <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-600" : ""}>
                            Special characters (!@#$%^&*)
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <ShieldCheck className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              <span className="text-gray-500">Remember your password? </span>
              <Link href="/login" className="text-green-600 hover:underline font-medium">
                Back to login
              </Link>
            </div>

            <div className="text-center text-xs text-gray-500">
              <p>
                By continuing, you agree to AgroEdge's{" "}
                <Link href="/terms" className="underline hover:text-gray-800">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-gray-800">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

