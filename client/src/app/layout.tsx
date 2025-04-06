import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth-context";


const geistSans = Geist({
  variable: "--font-Poppins",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-Poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgroEdge",
  description: "Farmer Management Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <AuthProvider>
        
        {children}
        
        <Toaster
          position="top-right"
          duration={3000}
          richColors
          expand={true}
          closeButton
        />
        </AuthProvider>
      </body>
    </html>
  );
}
