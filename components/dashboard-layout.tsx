"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  Calendar,
  Camera,
  Globe,
  Home,
  MessageSquare,
  Palette,
  Settings,
  Users,
  LogOut,
  User,
  Bell,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

const navigation = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: Home },
      { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Website",
    items: [
      { title: "Site Builder", url: "/dashboard/site-builder", icon: Palette },
      { title: "Templates", url: "/templates", icon: Globe },
      { title: "Gallery", url: "/dashboard/gallery", icon: Camera },
    ],
  },
  {
    title: "Business",
    items: [
      { title: "Bookings", url: "/dashboard/bookings", icon: Calendar },
      { title: "Clients", url: "/dashboard/clients", icon: Users },
      { title: "Messages", url: "/dashboard/messages", icon: MessageSquare },
    ],
  },
  {
    title: "Settings",
    items: [{ title: "Settings", url: "/dashboard/settings", icon: Settings }],
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<any>(null)
  const [userSite, setUserSite] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError
        if (!user) return

        setUser(user)

        // Get user's site info
        const { data: site, error: siteError } = await supabase
          .from("sites")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (siteError && siteError.code !== "PGRST116") throw siteError
        if (site) {
          setUserSite(site)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const getUserInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  const getUserDisplayName = (email: string) => {
    const name = email.split("@")[0]
    return name.split(".").map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(" ")
  }
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-pink-600 text-white">
                    <Palette className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">BeautyBuilder</span>
                    <span className="truncate text-xs">Dashboard</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {userSite && userSite.is_published && (
              <SidebarMenuItem>
                <SidebarMenuButton size="sm" asChild>
                  <Link 
                    href={`https://${userSite.subdomain}.${process.env.NEXT_PUBLIC_MAIN_DOMAIN}`}
                    target="_blank"
                    className="text-green-600 hover:text-green-700"
                  >
                    <ExternalLink className="size-3" />
                    <span className="text-xs">View Live Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {navigation.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="rounded-lg">
                        {user ? getUserInitials(user.email) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user ? getUserDisplayName(user.email) : "Loading..."}
                      </span>
                      <span className="truncate text-xs">
                        {user?.email || "Loading..."}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback className="rounded-lg">
                          {user ? getUserInitials(user.email) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user ? getUserDisplayName(user.email) : "Loading..."}
                        </span>
                        <span className="truncate text-xs">
                          {user?.email || "Loading..."}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
