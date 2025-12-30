"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

export function AnimatedHeadline() {
  const headlines = [
    "Premium advertising spaces now available for Q2",
    "New interactive ad formats launching next month",
    "Limited-time offer: 20% off premium placements",
    "Case study: How Brand X increased engagement by 300%",
    "Exclusive: Interview with marketing director on effective retro advertising",
  ]

  const [currentHeadline, setCurrentHeadline] = useState(0)  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <div className="animate-marquee font-serif" style={{ animationDuration: "20s" }}>
        {headlines.map((headline, index) => (
          <span key={index} className="mx-8">
            {headline}
          </span>
        ))}
      </div>
    </div>  
  )
}

