"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, FileText, Settings, LogOut, PlusCircle, CreditCard, Users } from "lucide-react"
import { useSelector } from "react-redux"
interface RootState {
  auth: {
    token: string;
    user: {
      id : string;
      fullName: string;
      email: string;
      role: string;
    } 
  }
}

export function AdvertiserSidebar() {
  const pathname = usePathname()
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user)
  const menuItems = [
    { icon: FileText, label: "Campaigns", href: "/dashboard/advertiser" },
    { icon: BarChart, label: "Analytics", href: "/dashboard/advertiser/analytics" },
    { icon: CreditCard, label: "Billing", href: "/dashboard/advertiser/billing" },
    { icon: Settings, label: "Settings", href: "/dashboard/advertiser/settings" },
  ]

  return (
    <div className="w-64 border-r bg-card h-[calc(100vh-theme(spacing.16))]">
      <div className="p-4">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
            A
          </div>
          <div>
            <div className="font-medium Name">{user?.fullName || "Guest"}</div>
            <div className="text-xs text-muted-foreground Gmail_Id">{user?.email || "user Email"}</div>
          </div>
        </div>
      </div>

      <div className="px-3 py-2">
        <Link href="/dashboard/advertiser/create">
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground">
            <PlusCircle className="h-4 w-4" />
            New Campaign
          </button>
        </Link>
      </div>

      <nav className="space-y-1 px-3 py-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

     
    </div>
  )
}

