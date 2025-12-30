"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface PageFlipProps {
  children: React.ReactNode
}

export function PageFlip({ children }: PageFlipProps) {
  const [isFlipping, setIsFlipping] = useState(false)

  const handleFlip = () => {
    setIsFlipping(true)
    setTimeout(() => setIsFlipping(false), 1000)
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipping ? 180 : 0 }}
        transition={{ duration: 1 }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        className="w-full"
      >
        <div className="backface-hidden">{children}</div>
      </motion.div>

      <button
        onClick={handleFlip}
        className="absolute bottom-4 right-4 bg-black text-white px-3 py-1 text-xs font-serif hover:bg-black/80 transition-colors"
      >
        Flip Page
      </button>

      <style jsx global>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

