import type React from "react"
import Link from "next/link"
import { BorderBeam } from "@/components/magicui/border-beam"




const Joinus: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100/50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Ready to revolutionize your farming?</h2>
          <div>
            <Link href="/signup">
              <button className="bg-green-200 hover:bg-green-300 text-green-800 text-lg px-8 py-3 h-auto rounded-full">
                Join AgroEdge Today 
                <BorderBeam
                size={40}
                initialOffset={20}
                className="from-transparent via-green-500 to-transparent"
                transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
                }}/>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Joinus
