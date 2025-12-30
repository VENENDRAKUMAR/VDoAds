"use client"

import type React from "react"
import { Suspense, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Share2, Flag, Calendar, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useCampaignDetails } from "@/hooks/use-campaigns"

function LoadingState() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div className="space-y-6">
          <Skeleton className="aspect-video rounded-md w-full" />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <Skeleton className="h-8 w-32" />
              <div className="flex space-x-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
            <Skeleton className="h-6 w-3/4 mt-2" />
            <div className="flex items-center mt-2">
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <Separator />
          <div>
            <Skeleton className="h-6 w-24 mb-3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
          </div>
        </div>
      </div>
    </div>
  )
}

function AdvertisementContent({ id }: { id: string }) {
  const { campaign, loading, error } = useCampaignDetails(id)

  if (loading) {
    return <LoadingState />
  }

  if (error || !campaign) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Advertisement Not Found</h1>
        <p className="mb-6">{error || "The advertisement you're looking for doesn't exist or has been removed."}</p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div className="space-y-6">
          <div className="relative aspect-video rounded-md overflow-hidden">
            <Image
              src={campaign.imageUrl || "/placeholder.svg"}
              alt={campaign.headline}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">{campaign.headline}</h1>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Flag className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <h2 className="text-xl font-medium mt-2">{campaign.campaignName}</h2>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Type: {campaign.campaignType}</span>
              </div>
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-1" />
                <span>Status: {campaign.status}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-700">{campaign.body}</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Advertiser Information</h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-semibold mr-4">
                {campaign.advertiser.fullName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{campaign.advertiser.fullName}</p>
                <p className="text-sm text-gray-500">{campaign.advertiser.companyName}</p>
              </div>
            </div>
            <Button className="w-full mt-4">{campaign.callToAction}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdvertisementDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  
  return (
    <main className="min-h-screen bg-[#f8f5e9] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Advertisements
          </Link>
        </div>
        
        <Suspense fallback={<LoadingState />}>
          <AdvertisementContent id={resolvedParams.id} />
        </Suspense>
      </div>
    </main>
  )
}

