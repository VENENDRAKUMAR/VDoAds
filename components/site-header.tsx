import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sun } from "lucide-react"

export function SiteHeader({ showLogin = true }: { showLogin?: boolean }) {
  return (
    <header className="w-full border-b bg-card">
      <div className="container flex flex-col items-center py-4">
        <div className="flex items-center text-sm">
          <div className="flex items-center mr-4">
            <Sun className="h-4 w-4 mr-1" />
            <span>72°F | Sunny</span>
          </div>
          <span className="italic">"All the News That's Fit to Print"</span>
        </div>

        <div className="my-4 text-center">
          <h1 className="newspaper-heading text-5xl md:text-7xl font-bold tracking-tight">THE DAILY</h1>
          <h1 className="newspaper-heading text-5xl md:text-7xl font-bold tracking-tight">CHRONICLE</h1>
        </div>

        <nav className="flex items-center justify-center space-x-6 text-sm font-medium uppercase tracking-wider">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/advertise" className="hover:underline">
            Advertise
          </Link>
          <Link href="/case-studies" className="hover:underline">
            Case Studies
          </Link>
          <Link href="/gallery" className="hover:underline">
            Gallery
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          {showLogin && (
            <Link href="/login">
              <Button variant="outline" size="sm" className="uppercase">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>

      <div className="w-full overflow-hidden bg-black">
        <div className="breaking-news whitespace-nowrap">
          New interactive ad formats launching next month &nbsp;&nbsp;&nbsp; Limited-time offer: 20% off premium
          placements &nbsp;&nbsp;&nbsp; New interactive ad formats launching next month &nbsp;&nbsp;&nbsp; Limited-time
          offer: 20% off premium placements
        </div>
      </div>
    </header>
  )
}

