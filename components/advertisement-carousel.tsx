"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useCampaigns } from "@/hooks/use-campaigns"

export function AdvertisementCarousel() {
  const [favorites, setFavorites] = useState<string[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")
  const { campaigns, loading, error } = useCampaigns("FEATURED")

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.clientWidth : current.clientWidth

      current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-[200px]"><Skeleton className="h-48 w-full" /></div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-[200px] text-red-500">{error}</div>
  }

  if (campaigns.length === 0) {
    return <div className="flex justify-center items-center min-h-[200px]">No featured advertisements available</div>
  }

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {campaigns.map((campaign) => (
          <Link
            href={`/advertisements/${campaign._id}`}
            key={campaign._id}
            className={cn(
              "flex-shrink-0 snap-start rounded-md border border-gray-200 bg-white overflow-hidden",
              "transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary",
              isMobile ? "w-[280px]" : isTablet ? "w-[320px]" : "w-[300px]",
            )}
          >
            <div className="relative h-48 w-full">
              <Image
                src={campaign.imageUrl}
                alt={campaign.headline}
                fill
                className="object-cover"
              />
              <button
                onClick={(e) => toggleFavorite(campaign._id, e)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white"
                aria-label={favorites.includes(campaign._id) ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors",
                    favorites.includes(campaign._id) ? "fill-red-500 text-red-500" : "text-gray-600",
                  )}
                />
              </button>
              <div className="absolute top-2 left-2 bg-amber-400 text-xs font-semibold px-2 py-1 rounded">
                FEATURED
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">{campaign.headline}</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">{campaign.campaignName}</p>
             
            </div>
          </Link>
        ))}
      </div>

      {campaigns.length > 1 && (
        <div className="flex justify-center mt-6 gap-4">
          <Button variant="outline" size="sm" onClick={() => scroll("left")} aria-label="Scroll left">
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => scroll("right")} aria-label="Scroll right">
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

