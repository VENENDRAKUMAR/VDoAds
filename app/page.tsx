"use client"
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link"
import Image from "next/image"
import { Coffee, Mail, Menu, Search, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { AdvertisementCarousel } from "@/components/advertisement-carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useCampaigns } from "@/hooks/use-campaigns"
import { AdvertisementCarouselItem } from "@/components/AdvertisementCarouselItem"
import './globals.css'
import BreakingNewsBanner from "@/components/BreakingNewsBanner"

export default function Home() {
  const { campaigns: bannerCampaigns, loading: bannerLoading, error: bannerError } = useCampaigns("BANNER")
  const { campaigns: featuredCampaigns, loading: featuredLoading, error: featuredError } = useCampaigns("FEATURED")
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Get the most recent featured campaign
  const mostRecentFeatured = featuredCampaigns && featuredCampaigns.length > 0 ? featuredCampaigns[0] : null  

  // Auto-advance logic for banner carousel using Embla API
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaApi, setEmblaApi] = useState<any>(null);
  const bannerCount = bannerCampaigns?.length || 0;

  // Reset to first slide if banner count changes
  useEffect(() => {
    setActiveIndex(0);
    if (emblaApi) emblaApi.scrollTo(0);
  }, [bannerCount, emblaApi]);

  // Auto-advance carousel every 2 seconds
  useEffect(() => {
    if (!bannerCount || bannerLoading || bannerError || !emblaApi) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerCount;
        emblaApi.scrollTo(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerCount, bannerLoading, bannerError, emblaApi]);

  return (
    <div className="min-h-screen main_bg rounded-xl">
      {/* Header */}
      <BreakingNewsBanner/>
      {/* Main Content */}
      <main className="container py-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 rounded-xl">
          {/* Featured Story */}
          <div className="md:col-span-8  border-black  rounded-xl">
            <div className="space-y-6 rounded-xl">
              <div className="space-y-2 rounded-xl">
                <h2 className="font-serif text-4xl font-bold leading-tight">
                  Premium Advertising Space Now Available for Distinguished Brands
                </h2>
                <p className="font-serif text-lg italic">
                  Exclusive opportunities for businesses seeking to make a lasting impression
                </p>
              </div>

              <div className="relative aspect-[16/9] overflow-hidden border border-black rounded-xl shadow-lg">
                <Carousel className="w-full h-full" setApi={setEmblaApi}>
                  <CarouselContent>
                    {bannerLoading ? (
                      <CarouselItem>
                        <div className="relative w-full h-full aspect-[16/9]">
                          <Skeleton className="w-full h-full" />
                        </div>
                      </CarouselItem>
                    ) : bannerError ? (
                      <CarouselItem>
                        <div className="relative w-full h-full aspect-[16/9] flex items-center justify-center">
                          <p className="text-red-500">Error loading advertisements: {bannerError}</p>
                        </div>
                      </CarouselItem>
                    ) : (
                      bannerCampaigns.map((campaign) => (
                        <CarouselItem key={campaign._id}>
                          <AdvertisementCarouselItem campaign={campaign} />
                        </CarouselItem>
                      ))
                    )}
                  </CarouselContent>
                  {bannerCampaigns.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-4 bg-white/80 hover:bg-white" onClick={() => {
                        setActiveIndex((prev) => {
                          const next = (prev - 1 + bannerCount) % bannerCount;
                          if (emblaApi) emblaApi.scrollTo(next);
                          return next;
                        });
                      }} />
                      <CarouselNext className="absolute right-4 bg-white/80 hover:bg-white" onClick={() => {
                        setActiveIndex((prev) => {
                          const next = (prev + 1) % bannerCount;
                          if (emblaApi) emblaApi.scrollTo(next);
                          return next;
                        });
                      }} />
                    </>
                  )}
                </Carousel>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm font-serif z-10">
                  A collection of premium advertisements from our distinguished clients
                </div>
              </div>

              <p className="font-serif text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2">
                In an age of digital saturation, VDoAds offers a refreshing return to the golden era of
                advertising. Our premium platform combines the timeless elegance of traditional print
                with cutting-edge digital capabilities, creating an unparalleled advertising experience for discerning
                brands.
              </p>

              <p className="font-serif text-lg leading-relaxed">
                "The attention to detail and the unique aesthetic of VDoAds creates an environment where
                advertisements don't just compete for attention—they command it," says Marketing Director Elizabeth
                Harlow. "Our clients report engagement rates far exceeding industry standards."
              </p>

              <div className="primary_bg border  border-black p-6 my-8 rounded-xl">
                <h3 className="font-serif text-2xl font-bold mb-4 text-center text-black">Premium Advertising Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl">
                  <div className="border border-black bg-white p-4 text-center hover:shadow-xl transition-shadow rounded-xl">
                    <h4 className="font-serif text-xl font-bold">Front Page</h4>
                    <p className="font-serif my-2">Prime visibility with guaranteed impressions</p>
                    <Button className=" bg-black rounded-xl hover:bg-black/80 text-white mt-2">Learn More</Button>
                  </div>
                  <div className="border border-black bg-white p-4 text-center hover:shadow-xl transition-shadow rounded-xl">
                    <h4 className="font-serif text-xl font-bold">Feature Section</h4>
                    <p className="font-serif my-2">Contextual placement alongside relevant content</p>
                    <Button className=" bg-black rounded-xl hover:bg-black/80 text-white mt-2">Learn More</Button>
                  </div>
                  <div className="border border-black bg-white p-4 text-center hover:shadow-xl transition-shadow rounded-xl">
                    <h4 className="font-serif text-xl font-bold">Custom Insert</h4>
                    <p className="font-serif my-2">Bespoke advertising solutions for unique campaigns</p>
                    <Button className=" bg-black rounded-xl hover:bg-black/80 text-white mt-2">Learn More</Button>
                  </div>
                </div>
              </div>

              <p className="font-serif text-lg leading-relaxed">
                With a dedicated team of design specialists, VDoAds works closely with advertisers to
                ensure each placement not only captures attention but resonates with our sophisticated audience. The
                result is advertising that feels less like an interruption and more like a natural extension of the
                reading experience.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 rounded-xl">
            <div className="space-y-8 rounded-xl">
              {/* Ad Space Showcase */}
              <div className="border border-black p-4 primary_bg rounded-xl">
                <h3 className="font-serif text-xl text-black font-bold text-center  border-black pb-2 mb-4">
                  Latest Featured Advertisement
                </h3>
                <div className="relative aspect-[4/5] overflow-hidden border border-black mb-4 rounded-xl">
                  {featuredLoading ? (
                    <Skeleton className="w-full h-full" />
                  ) : featuredError ? (
                    <div className="w-full h-full flex items-center justify-center text-red-500 p-4 text-center">
                      Unable to load featured advertisement
                    </div>
                  ) : mostRecentFeatured ? (
                    <Link href={`/advertisements/${mostRecentFeatured._id}`} className="block relative w-full h-full">
                      <Image
                        src={mostRecentFeatured.imageUrl}
                        alt={mostRecentFeatured.headline}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-serif p-2 text-center">{mostRecentFeatured.headline}</span>
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 p-4 text-center">
                      No featured advertisements available
                    </div>
                  )}
                </div>
                <p className="font-serif text-sm italic text-center">
                  {mostRecentFeatured 
                    ? mostRecentFeatured.campaignName 
                    : "This premium space could feature your brand"}
                </p>
                <Button className="w-full rounded-xl bg-black hover:bg-black/80 text-white mt-4">
                  Reserve This Space
                </Button>
              </div>

              {/* Newsletter Signup */}
              <div className="border border-black p-4 rounded-xl">
                <h3 className="font-serif text-xl font-bold text-center mb-4">Subscribe to Our Newsletter</h3>
                <p className="font-serif text-sm mb-4">
                  Stay updated with our latest advertising opportunities and special rates.
                </p>
                <div className="space-y-2">
                  <Input placeholder="Your Email Address" className="rounded-xl border-black" />
                  <Button className="bg-black w-full rounded-xl">Subscribe Now</Button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="border border-black p-4 rounded-xl">
                <h3 className="font-serif text-xl font-bold text-center border-b border-black pb-2 mb-4">
                  Advertising Resources
                </h3>
                <ul className="space-y-2 font-serif">
                  <li>
                    <Link href="#" className="flex items-center hover:underline">
                      → Media Kit Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center hover:underline">
                      → Advertising Guidelines
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center hover:underline">
                      → Success Stories
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center hover:underline">
                      → Contact Our Ad Team
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center hover:underline">
                      → Pricing Information
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Coffee Break */}
              <div className="border border-black p-4 primary_bg text-black text-center rounded-xl">
                <Coffee className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-serif text-lg font-bold">Coffee Break</h3>
                <p className="font-serif text-sm italic">
                  "Good advertising does not just circulate information. It penetrates the public mind with desires and
                  belief."
                </p>
                <p className="font-serif text-sm mt-2">— William Bernbach</p>
              </div>
            </div>
          </div>
        </div>


        {/* Featured Advertisements */}
        <section className="my-12   border-black py-4 rounded-xl">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Featured Advertisements</h2>
          <AdvertisementCarousel />
        </section>

        {/* Testimonials Section */}
        <section className="my-12  border-black py-4 rounded-xl">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">What Our Advertisers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 rounded-xl">
            <div className="border border-black p-6 bg-white hover:shadow-xl transition-shadow rounded-xl">
              <p className="font-serif text-lg italic mb-4">
                "The vintage aesthetic combined with modern functionality created the perfect showcase for our luxury
                timepieces."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center font-serif font-bold text-xl">
                  L
                </div>
                <div>
                  <p className="font-serif font-bold">Lawrence Timeworks</p>
                  <p className="font-serif text-sm">Luxury Watchmaker</p>
                </div>
              </div>
            </div>
            <div className="border border-black p-6 bg-white hover:shadow-xl transition-shadow rounded-xl">
              <p className="font-serif text-lg italic mb-4">
                "Our campaign in VDoAds delivered a 300% increase in brand recognition among our target
                demographic."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center font-serif font-bold text-xl">
                  V
                </div>
                <div>
                  <p className="font-serif font-bold">Vintage Apparel Co.</p>
                  <p className="font-serif text-sm">Fashion Retailer</p>
                </div>
              </div>
            </div>
            <div className="border border-black p-6 bg-white hover:shadow-xl transition-shadow rounded-xl">
              <p className="font-serif text-lg italic mb-4">
                "The attention to detail and premium feel of this platform perfectly aligns with our brand values and
                aesthetic."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center font-serif font-bold text-xl">
                  A
                </div>
                <div>
                  <p className="font-serif font-bold">Artisanal Spirits</p>
                  <p className="font-serif text-sm">Craft Distillery</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="my-12 secondary_bg text-white p-8 text-center rounded-xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Secure Your Premium Advertising Space Today
          </h2>
          <p className="font-serif text-lg mb-6 max-w-2xl mx-auto">
            Join distinguished brands that understand the value of premium presentation and targeted reach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-black hover:border-white hover:text-white hover:bg-white/10 rounded-xl text-lg px-8">
             Contact Sales Team
            </Button>
            
          </div>
        </section>
      </main>

     
    </div>
  )
}

