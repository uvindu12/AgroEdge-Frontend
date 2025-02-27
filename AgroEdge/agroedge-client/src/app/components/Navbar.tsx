import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/Button"


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 border-b border-green-500 ">
      <div className="flex items-center gap-12">
        <img
          src="/logo.png"
          alt="AgroEdge - Keep Farmer"
          className="h-12"
        />
        <div className="flex gap-8">
          <a href="/" className="text-black hover:text-green-600">
            Home
          </a>
          <a href="/contact" className="text-black hover:text-green-600">
            Contact Us
          </a>
          <a href="/about" className="text-black hover:text-green-600">
            About Us
          </a>
          <div className="flex items-center gap-1">
            <a href="/menu" className="text-black hover:text-green-600">
              Cheese Menu
            </a>
            
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Link href="/login" passHref>
          <Button>Login</Button>
        </Link>
        <Link href="/signup" passHref>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Sign Up</Button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
