"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux" // Import Redux hook
import axios from "axios" // Import Axios for API requests
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CampaignForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const token = useSelector((state: any) => state.auth.token) // Retrieve Bearer token from Redux

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "BANNER",
    headline: "",
    body: "",
    cta: "",
    image: null,
  })

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const data = new FormData()
    data.append("campaignName", formData.name)
    data.append("campaignDescription", formData.description)
    data.append("campaignType", formData.type)
    data.append("headline", formData.headline)
    data.append("body", formData.body)
    data.append("callToAction", formData.cta)
    if (formData.image) {
      data.append("image", formData.image)
    }

    try {
      const response = await axios.post(
        "https://advertisemedia.onrender.com/api/campaigns",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Add Bearer token
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      )

      if (response.status === 200) {
        toast({
          title: "Campaign created!",
          description: "Your campaign has been submitted for review.",
        })
        router.push("/dashboard/advertiser")
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card className="border-2">
        <CardContent className="pt-6">
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Campaign Details</TabsTrigger>
              <TabsTrigger value="creative">Creative Assets</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Summer Sale Promotion"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your campaign objectives and key messages"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="border-2"
                />
              </div>

              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                  name="type"
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="BANNER" id="banner" />
                    <Label htmlFor="banner" className="font-normal">
                      Banner Advertisement
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEATURED" id="featured" />
                    <Label htmlFor="featured" className="font-normal">
                      Featured Content
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="interactive" id="interactive" />
                    <Label htmlFor="INTERACTIVE" className="font-normal">
                      Interactive Advertisement
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="creative" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="headline">Advertisement Headline</Label>
                <Input
                  id="headline"
                  name="headline"
                  placeholder="Compelling headline for your advertisement"
                  value={formData.headline}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Advertisement Body</Label>
                <Textarea
                  id="body"
                  name="body"
                  placeholder="Main content of your advertisement"
                  rows={4}
                  value={formData.body}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cta">Call to Action</Label>
                <Input
                  id="cta"
                  name="cta"
                  placeholder="Shop Now, Learn More, etc."
                  value={formData.cta}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Upload Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  disabled={isLoading}
                  className="border-2"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => router.push("/dashboard/advertiser")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Campaign"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

