import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4">
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
        <button className="rounded-md bg-green-800 px-6 py-2 text-white hover:bg-green-700">Login</button>
        <button className="rounded-md bg-green-800 px-6 py-2 text-white hover:bg-green-700">Sign Up</button>
      </div>
    </nav>
  )
}

export default Navbar
