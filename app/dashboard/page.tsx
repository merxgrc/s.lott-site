"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Camera, Globe, Plus, Settings, Users, Eye, Edit } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BarChart3 } from "lucide-react"

interface Booking {
  id: number
  client: string
  service: string
  date: string
  time: string
  status: string
}

export default function DashboardPage() {
  const [siteStatus, setSiteStatus] = useState("published") // published, draft, unpublished

  // Real user stats - starts empty for new users
  const stats = {
    totalBookings: 0,
    monthlyRevenue: 0,
    websiteViews: 0,
    newClients: 0,
  }

  const recentBookings: Booking[] = [
    // Empty array for new users - will be populated when they get real bookings
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={siteStatus === "published" ? "default" : "secondary"}
              className="bg-green-100 text-green-800"
            >
              <Globe className="w-3 h-3 mr-1" />
              {siteStatus === "published" ? "Live" : "Draft"}
            </Badge>
            <Link href="/sites/preview" target="_blank">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview Site
              </Button>
            </Link>
            <Link href="/dashboard/site-builder">
              <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Site
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">Start booking clients to see growth!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.monthlyRevenue}</div>
              <p className="text-xs text-muted-foreground">Revenue will appear as you serve clients</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Website Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.websiteViews}</div>
              <p className="text-xs text-muted-foreground">Publish your site to start tracking views</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newClients}</div>
              <p className="text-xs text-muted-foreground">New client acquisitions this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Your latest appointment bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.length > 0 ? (
                      recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{booking.client}</p>
                            <p className="text-sm text-gray-600">{booking.service}</p>
                            <p className="text-xs text-gray-500">
                              {booking.date} at {booking.time}
                            </p>
                          </div>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">No bookings yet</p>
                        <p className="text-xs">Your upcoming appointments will appear here</p>
                      </div>
                    )}
                  </div>
                  <Link href="/dashboard/bookings">
                    <Button variant="outline" className="w-full mt-4">
                      View All Bookings
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks to manage your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/dashboard/bookings/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Booking
                    </Button>
                  </Link>
                  <Link href="/dashboard/gallery">
                    <Button variant="outline" className="w-full justify-start">
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Photos
                    </Button>
                  </Link>
                  <Link href="/dashboard/clients">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Clients
                    </Button>
                  </Link>
                  {/* <Link href="/dashboard/billing">
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Billing
                    </Button>
                  </Link> */}
                  <Link href="/dashboard/settings">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage your appointment bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Bookings management interface would go here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>View and manage your client database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Client management interface would go here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Photo Gallery</CardTitle>
                <CardDescription>Manage your portfolio images</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Gallery management interface would go here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
