'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import "@/app/globals.css"
import BreakingNewsBanner from "@/components/BreakingNewsBanner"

export default function AdvertisePage() {
  return (
    <div className="min-h-screen main_bg rounded-xl"> 
      <BreakingNewsBanner/>
      <main className="container py-8">
        {/* Page Title */}
        <div className=" border-black mb-8 pb-4 rounded-xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center">Advertising Opportunities</h1>
          <p className="font-serif text-center text-lg mt-2 italic">Premium spaces for distinguished brands</p>
        </div>

        {/* Introduction */}
        <div className="max-w-3xl mx-auto mb-12 rounded-lg">
          <p className="font-serif text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2">
            VDoAds offers a unique advertising platform that combines the timeless elegance of traditional
            print with cutting-edge digital capabilities. Our environment creates a distinctive context
            for your brand, allowing your message to stand out in an increasingly crowded digital landscape.
          </p>
          <p className="font-serif text-lg leading-relaxed mt-4">
            With carefully crafted placement options and a sophisticated audience, we provide an unparalleled
            opportunity to showcase your products and services in a premium environment that commands attention and
            respect.
          </p>
        </div>

        {/* Advertising Packages */}
        <section className="mb-16 rounded-xl">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">Premium Advertising Packages</h2>

          <Tabs defaultValue="front-page" className="w-full rounded-xl">
            <TabsList className="grid w-full grid-cols-3 mb-8 rounded-lg">
              <TabsTrigger value="front-page" className="font-serif text-lg rounded-lg">
                Front Page
              </TabsTrigger>
              <TabsTrigger value="feature" className="font-serif text-lg rounded-lg">
                Feature Section
              </TabsTrigger>
              <TabsTrigger value="custom" className="font-serif text-lg rounded-lg">
                Custom Solutions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="front-page" className="border border-black p-6 bg-white rounded-xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4">Front Page Prominence</h3>
                  <p className="font-serif mb-4">
                    Our most prestigious placement, the Front Page advertisement commands immediate attention and
                    delivers unmatched visibility. Limited to just one advertiser per edition, this exclusive position
                    ensures your brand receives the spotlight it deserves.
                  </p>
                  <ul className="font-serif space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Prime visibility with guaranteed impressions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Exclusive positioning above the fold</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Custom design services included</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Performance analytics and reporting</span>
                    </li>
                  </ul>
                  <div className="space-y-2">
                    <p className="font-serif font-bold">Starting at $2,500 per week</p>
                    <Button className="rounded-xl bg-black hover:bg-black/80 text-white">
                      Request This Placement
                    </Button>
                  </div>
                </div>
                <div className="relative aspect-[4/3] border border-black rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Front page advertisement example"
                    fill
                    className="object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm font-serif rounded-b-xl">
                    Example of front page advertisement placement
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="feature" className="border border-black p-6 bg-white rounded-xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4">Feature Section Integration</h3>
                  <p className="font-serif mb-4">
                    Strategically position your advertisement alongside relevant content in our feature sections. This
                    contextual placement creates natural alignment between your brand and topics of interest to your
                    target audience.
                  </p>
                  <ul className="font-serif space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Contextual placement in relevant sections</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Multiple size options available</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Enhanced engagement through content alignment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Flexible scheduling options</span>
                    </li>
                  </ul>
                  <div className="space-y-2">
                    <p className="font-serif font-bold">Starting at $1,200 per week</p>
                    <Button className="rounded-xl bg-black hover:bg-black/80 text-white">
                      Request This Placement
                    </Button>
                  </div>
                </div>
                <div className="relative aspect-[4/3] border border-black rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Feature section advertisement example"
                    fill
                    className="object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm font-serif rounded-b-xl">
                    Example of feature section advertisement placement
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="border border-black p-6 bg-white rounded-xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4">Bespoke Advertising Solutions</h3>
                  <p className="font-serif mb-4">
                    For brands with unique requirements, our custom advertising solutions offer unparalleled
                    flexibility. From sponsored content to interactive experiences, we collaborate closely with your
                    team to create distinctive advertising that resonates with our audience.
                  </p>
                  <ul className="font-serif space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Tailored solutions for specific campaign objectives</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Sponsored content opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Interactive advertisement formats</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span>Dedicated account management</span>
                    </li>
                  </ul>
                  <div className="space-y-2">
                    <p className="font-serif font-bold">Custom pricing based on requirements</p>
                    <Button className="rounded-xl bg-black hover:bg-black/80 text-white">
                      Schedule Consultation
                    </Button>
                  </div>
                </div>
                <div className="relative aspect-[4/3] border border-black rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Custom advertisement example"
                    fill
                    className="object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm font-serif rounded-b-xl">
                    Example of custom advertisement implementation
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        

        {/* Call to Action */}
        <section className="secondary_bg text-white p-8 text-center rounded-xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Brand?</h2>
          <p className="font-serif text-lg mb-6 max-w-2xl mx-auto">
            Contact our advertising team today to discuss how VDoAds can showcase your brand in a premium
            environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-black hover:bg-white/90 rounded-xl text-lg px-8">
              <Link href="/contact">Contact Sales Team</Link>
            </Button>
            
          </div>
        </section>
      </main>

      
    </div>
  )
}

