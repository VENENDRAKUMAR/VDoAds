"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Wind } from "lucide-react"

export function WeatherWidget() {
  const [weather, setWeather] = useState({
    temp: "72°F",
    condition: "Sunny",
    icon: <Sun className="h-4 w-4" />,
  })

  useEffect(() => {
    // Simulate weather changes
    const weatherOptions = [
      { temp: "72°F", condition: "Sunny", icon: <Sun className="h-4 w-4" /> },
      { temp: "68°F", condition: "Cloudy", icon: <Cloud className="h-4 w-4" /> },
      { temp: "65°F", condition: "Rainy", icon: <CloudRain className="h-4 w-4" /> },
      { temp: "70°F", condition: "Windy", icon: <Wind className="h-4 w-4" /> },
    ]

    const interval = setInterval(() => {
      const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)]
      setWeather(randomWeather)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-1 font-serif text-xs">
      {weather.icon}
      <span>{weather.temp}</span>
      <span className="mx-1">|</span>
      <span>{weather.condition}</span>
    </div>
  )
}

