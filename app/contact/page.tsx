'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import BreakingNewsBanner from "@/components/BreakingNewsBanner"
import '@/app/globals.css'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContactPage() {
  return (
    <div className="min-h-screen main_bg rounded-xl">
      <BreakingNewsBanner/>

      <main className="container py-8">
        {/* Page Title */}
        <div className="border-black mb-8 pb-4 rounded-xl  ">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center text-black drop-shadow">Contact Our Advertising Team</h1>
          <p className="font-serif text-center text-lg mt-2 italic text-gray-700">
            We're here to help you create a distinctive advertising presence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div>
            <div className="border border-black p-8 bg-gradient-to-br from-white via-primary_bg to-white mb-8 rounded-xl shadow-2xl">
              <h2 className="font-serif text-2xl font-bold mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-black p-2 text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold">Email</h3>
                    <p className="font-serif">advertising@dailychronicle.com</p>
                    <p className="font-serif text-sm text-muted-foreground mt-1">
                      For general inquiries and information
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-black p-2 text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold">Phone</h3>
                    <p className="font-serif">(555) 123-4567</p>
                    <p className="font-serif text-sm text-muted-foreground mt-1">Monday to Friday, 9am to 5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-black p-2 text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold">Address</h3>
                    <p className="font-serif">VDoAds</p>
                    <p className="font-serif">1234 Newspaper Row</p>
                    <p className="font-serif">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-black p-2 text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold">Business Hours</h3>
                    <p className="font-serif">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="font-serif">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            
          </div>

          {/* Contact Form */}
          <div className="border border-black p-8 bg-white rounded-xl ">
            <h2 className="font-serif text-2xl font-bold mb-6">Advertising Inquiry</h2>

            <form className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="font-serif">
                      First Name
                    </Label>
                    <Input id="first-name" className="rounded-lg border-black" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="font-serif">
                      Last Name
                    </Label>
                    <Input id="last-name" className="rounded-lg border-black" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="font-serif">
                    Company
                  </Label>
                  <Input id="company" className="rounded-lg border-black" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-serif">
                    Email
                  </Label>
                  <Input id="email" type="email" className="rounded-lg border-black" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-serif">
                    Phone
                  </Label>
                  <Input id="phone" type="tel" className="rounded-lg border-black" />
                </div>

                <div className="space-y-2">
                  <Label className="font-serif">I'm interested in:</Label>
                  <RadioGroup defaultValue="front-page">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="front-page" id="front-page" />
                      <Label htmlFor="front-page" className="font-serif">
                        Front Page Advertising
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feature" id="feature" />
                      <Label htmlFor="feature" className="font-serif">
                        Feature Section Placement
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom" className="font-serif">
                        Custom Advertising Solution
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not-sure" id="not-sure" />
                      <Label htmlFor="not-sure" className="font-serif">
                        Not Sure Yet
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="font-serif">
                    Approximate Budget
                  </Label>
                  <Select>
                    <SelectTrigger className="rounded-lg border-black">
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="over-50k">Over $50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-serif">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your advertising goals and any specific requirements"
                    className="rounded-lg border-black min-h-[150px]"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="newsletter" className="mt-1" />
                  <Label htmlFor="newsletter" className="font-serif text-sm">
                    I would like to receive VDoAds's advertising newsletter with updates on new
                    opportunities and case studies.
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full rounded-xl bg-black hover:bg-black/80 text-white">
                Submit Inquiry
              </Button>

              <p className="font-serif text-xs text-center">
                By submitting this form, you agree to our{" "}
                <Link href="/privacy-policy" className="underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="underline">
                  Terms of Service
                </Link>
                .
              </p>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <section className="mb-16 rounded-xl">
          <h2 className="font-serif text-3xl font-bold text-center mb-8 text-black">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="border border-black bg-white rounded-xl shadow divide-y divide-black/10">
            <AccordionItem value="faq-1">
              <AccordionTrigger className="font-serif text-xl  px-6 py-4 bg-primary_bg/60 hover:bg-primary_bg/80 transition-colors rounded-t-xl">
                How quickly will I receive a response to my inquiry?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-800">
                Our advertising team typically responds to all inquiries within 24 business hours. For urgent matters, we recommend calling our office directly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger className="font-serif text-xl  px-6 py-4 bg-primary_bg/60 hover:bg-primary_bg/80 transition-colors">
                Can I schedule a consultation before committing to an advertising package?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-800">
                Absolutely. We offer complimentary consultations to discuss your advertising goals and recommend the most effective strategies for your brand. These can be conducted via phone, video conference, or in person at our office.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger className="font-serif text-xl  px-6 py-4 bg-primary_bg/60 hover:bg-primary_bg/80 transition-colors">
                Do you offer agency partnerships or volume discounts?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-800">
                Yes, we have special partnership programs for advertising agencies and offer volume discounts for long-term advertising commitments. Please contact our Director of Advertising for more information.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger className="font-serif text-xl px-6 py-4 bg-primary_bg/60 hover:bg-primary_bg/80 transition-colors rounded-b-xl">
                Can I request a custom media kit tailored to my industry?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-800">
                Yes, our team can prepare a customized media kit with case studies and performance data specific to your industry. Simply mention this request in your inquiry form or during your consultation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Call to Action */}
        <section className="secondary_bg text-white p-8 text-center rounded-xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="font-serif text-lg mb-6 max-w-2xl mx-auto">
            Contact our advertising team today to discuss how VDoAds can showcase your brand in a premium
            environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <Button variant="outline" className="text-black hover:text-white hover:bg-blue-800 border-white bg-white rounded-xl text-lg px-8">
              <Link href="/advertise">Contect Our Team</Link>
            </Button>
          </div>
        </section>
      </main>

    </div>
  )
}

