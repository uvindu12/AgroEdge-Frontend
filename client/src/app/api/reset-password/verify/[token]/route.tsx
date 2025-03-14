import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { token: string } }) {
  try {
    const { token } = params

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    // Find the reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    // Check if token exists and is not expired
    if (!resetToken || resetToken.expiresAt < new Date()) {
      return NextResponse.json({ valid: false, message: "Invalid or expired token" }, { status: 200 })
    }

    return NextResponse.json({
      valid: true,
      message: "Token is valid",
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ error: "Failed to verify token" }, { status: 500 })
  }
}

