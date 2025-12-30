import { useState, useEffect } from "react"

interface Campaign {
  _id: string
  advertiser: {
    _id: string
    fullName: string
    companyName: string
  }
  campaignName: string
  campaignType: string
  headline: string
  body: string
  callToAction: string
  imageUrl: string
  status: string
  analytics: {
    impressions: number
    clicks: number
    ctr: number
  }
}

export function useCampaigns(type: "BANNER" | "FEATURED" = "FEATURED") {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("https://advertisemedia.onrender.com/api/campaigns")
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns")
        }
        const data = await response.json()
        // Filter campaigns based on type and active status
        const filteredCampaigns = data.filter(
          (campaign: Campaign) => campaign.status === "ACTIVE" && campaign.campaignType === type
        )
        setCampaigns(filteredCampaigns)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching campaigns:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [type])

  return { campaigns, loading, error }
}

export function useCampaignDetails(id: string) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`https://advertisemedia.onrender.com/api/campaigns/${id}`)
        if (!response.ok) {
          throw new Error("Campaign not found")
        }
        const data = await response.json()
        setCampaign(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch campaign")
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [id])

  return { campaign, loading, error }
}
