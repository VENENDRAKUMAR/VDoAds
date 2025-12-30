'use client'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BreakingNewsBanner from "@/components/BreakingNewsBanner"
import '@/app/globals.css'

export default function GalleryPage() {
  return (
    <div className="min-h-screen main_bg rounded-xl">
    <BreakingNewsBanner/>

      <main className="container py-8">
        {/* Page Title */}
        <div className=" border-black mb-4 pb-4 rounded-xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center">Advertisement Gallery</h1>
          <p className="font-serif text-center text-lg mt-2 italic">Showcasing the art of premium advertising</p>
        </div>

        {/* Introduction */}
        <div className="max-w-3xl mx-auto mb-12 rounded-lg">
          <p className="font-serif text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2">
            VDoAds has had the privilege of showcasing exceptional advertisements from distinguished brands
            across various industries. Our gallery features a selection of these advertisements, demonstrating the
            unique aesthetic and impact that our newspaper-themed environment provides.
          </p>
        </div>

        {/* Gallery Tabs */}
        <Tabs defaultValue="luxury" className="w-full mb-16 rounded-xl">
          <TabsList className="grid w-full grid-cols-4 mb-8 rounded-lg">
            <TabsTrigger value="luxury" className="font-serif rounded-lg">
              Luxury
            </TabsTrigger>
            <TabsTrigger value="fashion" className="font-serif rounded-lg">
              Fashion
            </TabsTrigger>
            <TabsTrigger value="travel" className="font-serif rounded-lg">
              Travel
            </TabsTrigger>
            <TabsTrigger value="culinary" className="font-serif rounded-lg">
              Culinary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="luxury" className="space-y-8">
            <h2 className="font-serif text-3xl font-bold text-center mb-8">Luxury Advertisements</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={`luxury-${item}`} className="border border-black overflow-hidden group rounded-xl">
                  <div className="relative aspect-[3/4] rounded-t-xl overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=800&width=600`}
                      alt={`Luxury advertisement example ${item}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-t-xl"></div>
                  </div>
                  <div className="p-4 bg-white rounded-b-xl">
                    <h3 className="font-serif text-lg font-bold">Luxury Timepiece</h3>
                    <p className="font-serif text-sm">Front Page Advertisement</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fashion" className="space-y-8">
            <h2 className="font-serif text-3xl font-bold text-center mb-8">Fashion Advertisements</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={`fashion-${item}`} className="border border-black overflow-hidden group rounded-xl">
                  <div className="relative aspect-[3/4] rounded-t-xl overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=800&width=600`}
                      alt={`Fashion advertisement example ${item}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-t-xl"></div>
                  </div>
                  <div className="p-4 bg-white rounded-b-xl">
                    <h3 className="font-serif text-lg font-bold">Vintage Apparel</h3>
                    <p className="font-serif text-sm">Feature Section Advertisement</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="travel" className="space-y-8">
            <h2 className="font-serif text-3xl font-bold text-center mb-8">Travel Advertisements</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={`travel-${item}`} className="border border-black overflow-hidden group rounded-xl">
                  <div className="relative aspect-[3/4] rounded-t-xl overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=800&width=600`}
                      alt={`Travel advertisement example ${item}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-t-xl"></div>
                  </div>
                  <div className="p-4 bg-white rounded-b-xl">
                    <h3 className="font-serif text-lg font-bold">Heritage Hotels</h3>
                    <p className="font-serif text-sm">Custom Advertisement</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="culinary" className="space-y-8">
            <h2 className="font-serif text-3xl font-bold text-center mb-8">Culinary Advertisements</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={`culinary-${item}`} className="border border-black overflow-hidden group rounded-xl">
                  <div className="relative aspect-[3/4] rounded-t-xl overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=800&width=600`}
                      alt={`Culinary advertisement example ${item}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-t-xl"></div>
                  </div>
                  <div className="p-4 bg-white rounded-b-xl">
                    <h3 className="font-serif text-lg font-bold">Artisanal Spirits</h3>
                    <p className="font-serif text-sm">Feature Section Advertisement</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Advertisement */}
        <section className="mb-16 border border-black bg-white p-8 rounded-xl">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-black text-white px-4 py-1 font-serif text-sm rounded-lg">FEATURED ADVERTISEMENT</div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-square border border-black rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=800"
                alt="Featured luxury advertisement"
                fill
                className="object-cover rounded-xl"
              />
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-3xl font-bold">The Art of Advertising</h2>
              <p className="font-serif text-lg italic">A showcase of exceptional design and messaging</p>

              <p className="font-serif">
                This featured advertisement exemplifies the perfect balance of visual impact and compelling messaging.
                Created for a luxury timepiece brand, it leverages the newspaper aesthetic to evoke a sense of timeless
                elegance and craftsmanship.
              </p>

              <p className="font-serif">
                The monochromatic palette and strategic use of negative space create a sophisticated visual hierarchy
                that guides the viewer's eye to the product. The accompanying copy employs classic typography and
                concise language to communicate the brand's heritage and value proposition.
              </p>

              <div className="border-t border-black pt-4 mt-6">
                <h3 className="font-serif text-xl font-bold mb-2">Design Elements</h3>
                <ul className="font-serif space-y-2">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Classic typography with careful attention to kerning and leading</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Strategic use of white space to create visual impact</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>High-contrast imagery that commands attention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Elegant copy that reinforces brand positioning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section className="mb-16 rounded-xl">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">The Advertisement Design Process</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-black p-6 bg-white text-center hover:shadow-xl transition-shadow rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4 font-serif font-bold text-xl">
                1
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Concept</h3>
              <p className="font-serif">
                We begin with a thorough understanding of your brand and objectives to develop a compelling concept.
              </p>
            </div>

            <div className="border border-black p-6 bg-white text-center hover:shadow-xl transition-shadow rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4 font-serif font-bold text-xl">
                2
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Design</h3>
              <p className="font-serif">
                Our design team creates visual elements that align with both your brand identity and our newspaper
                aesthetic.
              </p>
            </div>

            <div className="border border-black p-6 bg-white text-center hover:shadow-xl transition-shadow rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4 font-serif font-bold text-xl">
                3
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Copywriting</h3>
              <p className="font-serif">
                Expert copywriters craft messaging that resonates with our audience while conveying your key value
                propositions.
              </p>
            </div>

            <div className="border border-black p-6 bg-white text-center hover:shadow-xl transition-shadow rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4 font-serif font-bold text-xl">
                4
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Refinement</h3>
              <p className="font-serif">
                We collaborate with you to refine the advertisement until it perfectly represents your brand vision.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="secondary_bg text-white p-8 text-center rounded-xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Create Your Own Masterpiece</h2>
          <p className="font-serif text-lg mb-6 max-w-2xl mx-auto">
            Join the distinguished brands featured in our gallery and create an advertisement that captivates and
            converts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-black hover:bg-white/90 rounded-xl text-lg px-8">
              <Link href="/contact">Contact Our Design Team</Link>
            </Button>
            
          </div>
        </section>
      </main>

    
    </div>
  )
}

