import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/features";



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
        <Navbar/>
        <main className= "relative overflow-hidden">
        {children}
        </main>
        <Hero></Hero>
        <Stats></Stats>
        <Features></Features>
        <Footer/>
      </body>
    </html>
  );
}
