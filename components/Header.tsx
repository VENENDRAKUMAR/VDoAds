"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X, LayoutDashboard, Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/redux/store"
import { logout } from "@/redux/features/authSlice"

import { useRouter } from "next/navigation"

export function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated) 
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state: RootState) => state.auth.user)
  const userRole = user?.role // Assuming user has a role property

  useEffect(() => {
    // This will run whenever isAuthenticated changes
    console.log('Authentication status changed:', isAuthenticated)
    // Add any additional logic you need when auth state changes
  }, [isAuthenticated])

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      dispatch(logout()); // Clear user state
      router.push('/'); // Redirect to home page
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white  shadow-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo - visible on all screens */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-black">VDoAds</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search advertisements..."
              className="pl-10 bg-white/80 border-gray-200 focus:bg-white"
            />
          </div>

          

          <div className="flex items-center gap-8 px-4">
          <div>
            <Link href="/" className="text-sm font-semibold">
              Home
            </Link>
          </div>
          <div>
            <Link href="/advertise" className="text-sm font-semibold">
              Advertise
            </Link>
          </div>
          {/* <div className="w-24">
            <Link href="/case-studies" className="text-sm font-semibold">
              Case Studies
            </Link>
          </div> */}
          <div>
            <Link href="/gallery" className="text-sm font-semibold">
              Gallery
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/contact" className="text-sm font-semibold">
              Contact
            </Link>
          </div>
          </div>
        

          {/* Dashboard */}
          {userRole === 'ADMIN' && (
            <Link href="/dashboard/admin" className="hidden sm:flex items-center gap-1">
              <Button variant="outline">Dashboard</Button>
            </Link>
          )}
          {userRole === 'USER' && (
            <Link href="/dashboard/user" className="hidden sm:flex items-center gap-1">
              <Button variant="outline">Dashboard</Button>
            </Link>
          )}
          {userRole === 'ADVERTISER' && (
            <Link href="/dashboard/advertiser" className="hidden sm:flex items-center gap-1">
              <Button variant="outline">Dashboard</Button>
            </Link>
          )}


          {/* Notifications */}
          

          {/* Desktop Auth Buttons */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="hidden sm:flex">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="relative"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <SheetTitle></SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <span className="text-lg font-medium">Menu</span>
                  <SheetTrigger asChild>
                    
                  </SheetTrigger>
                </div>

                <nav className="flex flex-col gap-4 py-6">
                  {/* Desktop-like fields for mobile */}
                  <Link href="/" className="flex items-center gap-3 px-4 py-2 text-lg hover:bg-gray-100 rounded-md" onClick={() => setIsSheetOpen(false)}>
                    Home
                  </Link>
                  <Link href="/advertise" className="flex items-center gap-3 px-4 py-2 text-lg hover:bg-gray-100 rounded-md" onClick={() => setIsSheetOpen(false)}>
                    Advertise
                  </Link>
                  {/* <Link href="/case-studies" className="flex items-center gap-3 px-4 py-2 text-lg hover:bg-gray-100 rounded-md" onClick={() => setIsSheetOpen(false)}>
                    Case Studies
                  </Link> */}
                  <Link href="/gallery" className="flex items-center gap-3 px-4 py-2 text-lg hover:bg-gray-100 rounded-md" onClick={() => setIsSheetOpen(false)}>
                    Gallery
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 px-4 py-2 text-lg hover:bg-gray-100 rounded-md" onClick={() => setIsSheetOpen(false)}>
                    Contact
                  </Link>
                  {/* Dashboard links by role */}
                  {userRole === 'ADMIN' && (
                    <Link href="/dashboard/admin" className="flex items-center gap-3 px-4 py-2 text-lg hover:bg-gray-100 rounded-md" onClick={() => setIsSheetOpen(false)}>
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                  )}
                  {userRole === 'USER' && (
                    <Link href="/dashboard/user" className="flex items-center gap-3 px-4 py-2 text-lg hover:bg-gray-100 rounded-md" onClick={() => setIsSheetOpen(false)}>
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                  )}
                  {userRole === 'ADVERTISER' && (
                    <Link href="/dashboard/advertiser" className="flex items-center gap-3 px-4 py-2 text-lg hover:bg-gray-100 rounded-md" onClick={() => setIsSheetOpen(false)}>
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                  )}
                  
                  
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="mt-auto border-t py-4 space-y-4">
                  {isAuthenticated ? (
                    <Button className="w-full" onClick={() => { setIsSheetOpen(false); handleLogout(); }}>
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Button className="w-full" onClick={() => setIsSheetOpen(false)}>Register</Button>
                      <Button variant="outline" className="w-full" onClick={() => setIsSheetOpen(false)}>
                        Sign In
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      {isSearchExpanded && (
        <div className="md:hidden px-4 py-2 bg-[#f8f5e9] border-t border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search advertisements..."
              className="pl-10 bg-white/80 border-gray-200 focus:bg-white w-full"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  )
}

