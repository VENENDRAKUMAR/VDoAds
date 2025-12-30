import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Menu, Search } from "lucide-react"
import { AnimatedHeadline } from "@/components/animated-headline"
import { WeatherWidget } from "@/components/weather-widget"

export function NewspaperHeader() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
    
      

      {/* Masthead */}
      

      {/* Navigation */}
      

      {/* Breaking News Banner */}
      <div className="bg-black text-white py-2 overflow-hidden">
        <div className="container flex items-center gap-4">
          <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase whitespace-nowrap">
            Breaking News
          </span>
          <AnimatedHeadline />
        </div>
      </div>
    </>
  )
}

