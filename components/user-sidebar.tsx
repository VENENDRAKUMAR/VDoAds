"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, BookOpen, Bell, Heart, Settings, LogOut } from "lucide-react"

export function UserSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { icon: User, label: "Profile", href: "/dashboard/user" },
    { icon: BookOpen, label: "Reading List", href: "/dashboard/user/reading-list" },
    { icon: Heart, label: "Favorites", href: "/dashboard/user/favorites" },
    { icon: Bell, label: "Notifications", href: "/dashboard/user/notifications" },
    { icon: Settings, label: "Settings", href: "/dashboard/user/settings" },
  ]

  return (
    <div className="w-64 border-r bg-card h-[calc(100vh-theme(spacing.16))]">
      <div className="p-4">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
            J
          </div>
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-xs text-muted-foreground">Reader</div>
          </div>
        </div>
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

