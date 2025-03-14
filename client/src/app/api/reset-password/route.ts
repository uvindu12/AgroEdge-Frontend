import { NextResponse } from "next/server"
import { z } from "zod"
import { randomUUID } from "crypto"
import { PrismaClient } from "@prisma/client"
import { sendEmail, generatePasswordResetEmail } from "@/lib/email"

const prisma = new PrismaClient()

// Validation schema
const requestSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body
    const result = requestSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.format() }, { status: 400 })
    }

    const { email } = result.data

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Important: Don't reveal if the email exists or not to prevent enumeration attacks
    if (!user) {
      // Still return success to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: "If your email is registered, you will receive password reset instructions.",
      })
    }

    // Generate a secure token
    const token = randomUUID()

    // Set expiration time (1 hour from now)
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1)

    // Delete any existing reset tokens for this user
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    })

    // Create a new reset token
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    })

    // Generate reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`

    // Generate and send email
    const htmlContent = generatePasswordResetEmail(email, resetLink)
    await sendEmail({
      to: email,
      subject: "Reset Your AgroEdge Password",
      html: htmlContent,
    })

    return NextResponse.json({
      success: true,
      message: "If your email is registered, you will receive password reset instructions.",
    })
  } catch (error) {
    console.error("Password reset request error:", error)
    return NextResponse.json({ error: "Failed to process password reset request" }, { status: 500 })
  }
}

