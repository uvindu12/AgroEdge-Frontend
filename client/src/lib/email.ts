import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

type EmailOptions = {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: "AgroEdge <noreply@agroedge.com>",
      to: [to],
      subject,
      html,
    })

    if (error) {
      console.error("Email sending failed:", error)
      throw new Error("Failed to send email")
    }

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error("Email sending error:", error)
    throw error
  }
}

export function generatePasswordResetEmail(email: string, resetLink: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #22c55e; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">AgroEdge</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
        <h2>Reset Your Password</h2>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
        </div>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p>If the button above doesn't work, copy and paste this URL into your browser:</p>
        <p style="word-break: break-all; color: #6b7280; font-size: 14px;">${resetLink}</p>
      </div>
      <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
        <p>© ${new Date().getFullYear()} AgroEdge. All rights reserved.</p>
      </div>
    </div>
  `

  return html
}

