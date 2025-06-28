"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, Eye, Palette, Type, ImageIcon, Phone, Plus, Trash2, Upload } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Service {
  name: string
  description: string
  duration: string
  price: number
}

interface SiteData {
  businessName: string
  tagline: string
  description: string
  owner: string
  phone: string
  email: string
  address: string
  hours: {
    [key: string]: string
  }
  services: Service[]
  social: {
    instagram: string
    facebook: string
  }
  colors: {
    primary: string
    secondary: string
  }
  gallery: string[]
  isPublished: boolean
}

export default function SiteBuilderPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()
  const [siteData, setSiteData] = useState<SiteData>({
    businessName: "",
    tagline: "",
    description: "",
    owner: "",
    phone: "",
    email: "",
    address: "",
    hours: {
      Monday: "",
      Tuesday: "", 
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
    },
    services: [],
    social: {
      instagram: "",
      facebook: "",
    },
    colors: {
      primary: "#ec4899", // Default pink, but user can change
      secondary: "#8b5cf6", // Default violet, but user can change
    },
    gallery: [],
    isPublished: false,
  })

  const [activeTab, setActiveTab] = useState("content")
  const [previewMode, setPreviewMode] = useState(false)
  const [userSite, setUserSite] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadSiteData = async () => {
      try {
        setIsInitialLoading(true)
        
        // Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError
        if (!user) throw new Error("Not authenticated")

        // Get the user's site
        const { data: site, error: siteError } = await supabase
          .from("sites")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (siteError && siteError.code !== "PGRST116") throw siteError // PGRST116 is "no rows returned"

        if (site) {
          setUserSite(site)
          setSiteData({
            ...site.site_data,
            isPublished: site.is_published,
          })
        }
      } catch (error) {
        console.error("Error loading site data:", error)
        toast({
          title: "Error",
          description: "Failed to load your site data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsInitialLoading(false)
      }
    }

    loadSiteData()
  }, [toast])

  const handleSave = async () => {
    try {
      setIsLoading(true)
      
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      if (!user) throw new Error("Not authenticated")

      // Get the user's site
      const { data: existingSite, error: siteError } = await supabase
        .from("sites")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (siteError && siteError.code !== "PGRST116") throw siteError // PGRST116 is "no rows returned"

      if (existingSite) {
        // Update existing site
        const { error: updateError } = await supabase
          .from("sites")
          .update({
            site_data: siteData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingSite.id)

        if (updateError) throw updateError
      } else {
        // Create new site
        const { error: insertError } = await supabase
          .from("sites")
          .insert([
            {
              user_id: user.id,
              subdomain: siteData.businessName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
              template_id: "elegant", // Default template
              site_data: siteData,
              is_published: false,
            },
          ])

        if (insertError) throw insertError
      }

      toast({
        title: "Success",
        description: "Your site has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving site:", error)
      toast({
        title: "Error",
        description: "Failed to save your site. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublish = async () => {
    try {
      setIsLoading(true)
      
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      if (!user) throw new Error("Not authenticated")

      // Get the user's site
      const { data: site, error: siteError } = await supabase
        .from("sites")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (siteError) throw siteError

      // Update published status
      const { error: updateError } = await supabase
        .from("sites")
        .update({
          is_published: !siteData.isPublished,
          updated_at: new Date().toISOString(),
        })
        .eq("id", site.id)

      if (updateError) throw updateError

      setSiteData((prev) => ({ ...prev, isPublished: !prev.isPublished }))
      
      toast({
        title: "Success",
        description: `Your site has been ${siteData.isPublished ? "unpublished" : "published"}.`,
      })
    } catch (error) {
      console.error("Error updating publish status:", error)
      toast({
        title: "Error",
        description: "Failed to update publish status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addService = () => {
    setSiteData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          name: "New Service",
          description: "Service description",
          duration: "30 min",
          price: 50,
        },
      ],
    }))
  }

  const removeService = (index: number) => {
    setSiteData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
  }

  const updateService = (index: number, field: string, value: any) => {
    setSiteData((prev) => ({
      ...prev,
      services: prev.services.map((service, i) => (i === index ? { ...service, [field]: value } : service)),
    }))
  }

  const handleImageUpload = async (files: FileList) => {
    try {
      setIsLoading(true)
      
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      if (!user) throw new Error("Not authenticated")

      // Get the user's site
      const { data: site, error: siteError } = await supabase
        .from("sites")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (siteError) throw siteError

      const uploadedUrls: string[] = []

      // Upload each file
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${user.id}/${site.id}/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(filePath)

        uploadedUrls.push(publicUrl)
      }

      // Update site data with new images
      const updatedGallery = [...(siteData.gallery || []), ...uploadedUrls]
      setSiteData(prev => ({ ...prev, gallery: updatedGallery }))

      // Save to database
      const { error: updateError } = await supabase
        .from("sites")
        .update({
          site_data: { ...siteData, gallery: updatedGallery },
          updated_at: new Date().toISOString(),
        })
        .eq("id", site.id)

      if (updateError) throw updateError

      toast({
        title: "Success",
        description: "Images uploaded successfully.",
      })
    } catch (error) {
      console.error("Error uploading images:", error)
      toast({
        title: "Error",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveImage = async (index: number) => {
    try {
      setIsLoading(true)
      
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      if (!user) throw new Error("Not authenticated")

      // Get the user's site
      const { data: site, error: siteError } = await supabase
        .from("sites")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (siteError) throw siteError

      // Remove image from storage
      const imageUrl = siteData.gallery[index]
      const filePath = imageUrl.split('/').pop()
      if (filePath) {
        const { error: deleteError } = await supabase.storage
          .from('gallery')
          .remove([`${user.id}/${site.id}/${filePath}`])

        if (deleteError) throw deleteError
      }

      // Update site data
      const updatedGallery = siteData.gallery.filter((_, i) => i !== index)
      setSiteData(prev => ({ ...prev, gallery: updatedGallery }))

      // Save to database
      const { error: updateError } = await supabase
        .from("sites")
        .update({
          site_data: { ...siteData, gallery: updatedGallery },
          updated_at: new Date().toISOString(),
        })
        .eq("id", site.id)

      if (updateError) throw updateError

      toast({
        title: "Success",
        description: "Image removed successfully.",
      })
    } catch (error) {
      console.error("Error removing image:", error)
      toast({
        title: "Error",
        description: "Failed to remove image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isInitialLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your site data...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (previewMode) {
    return (
      <div className="min-h-screen bg-white">
        {/* Preview Header */}
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Preview Mode</Badge>
            <span className="text-sm">This is how your website will look to visitors</span>
          </div>
          <Button variant="secondary" onClick={() => setPreviewMode(false)}>
            <Eye className="w-4 h-4 mr-2" />
            Exit Preview
          </Button>
        </div>

        {/* Website Preview */}
        <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50">
          {/* Header */}
          <header className="bg-white border-b sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{siteData.businessName}</h1>
                <p className="text-pink-600 text-sm">{siteData.tagline}</p>
              </div>
              <Button className="bg-pink-600 hover:bg-pink-700">Book Now</Button>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto text-center">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Experience Luxury
                <span className="text-pink-600"> Skincare</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{siteData.description}</p>
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                Book Appointment
              </Button>
            </div>
          </section>

          {/* Services Preview */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteData.services.map((service, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{service.name}</CardTitle>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{service.duration}</Badge>
                        <span className="text-2xl font-bold text-pink-600">${service.price}</span>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Site Builder</h1>
            <p className="text-gray-600">Customize your website content and design</p>
            {userSite && userSite.subdomain && (
              <p className="text-sm text-green-600 mt-1">
                Your site: {process.env.NEXT_PUBLIC_MAIN_DOMAIN}/sites/{userSite.subdomain}
                {userSite.is_published && (
                  <Link 
                    href={`/sites/${userSite.subdomain}`}
                    target="_blank"
                    className="ml-2 text-blue-600 hover:text-blue-700"
                  >
                    View Live →
                  </Link>
                )}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={siteData.isPublished ? "default" : "secondary"}>
              {siteData.isPublished ? "Published" : "Draft"}
            </Badge>
            <Button variant="outline" onClick={() => setPreviewMode(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button 
              onClick={handlePublish} 
              variant={siteData.isPublished ? "destructive" : "default"}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : siteData.isPublished ? "Unpublish" : "Publish Site"}
            </Button>
          </div>
        </div>

        {/* Site Builder Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">
              <Type className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="services">
              <Palette className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <ImageIcon className="w-4 h-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Basic information about your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={siteData.businessName}
                      onChange={(e) => setSiteData((prev) => ({ ...prev, businessName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={siteData.tagline}
                      onChange={(e) => setSiteData((prev) => ({ ...prev, tagline: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={siteData.description}
                      onChange={(e) => setSiteData((prev) => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner">Owner Name</Label>
                    <Input
                      id="owner"
                      value={siteData.owner}
                      onChange={(e) => setSiteData((prev) => ({ ...prev, owner: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Brand Colors</CardTitle>
                  <CardDescription>Customize your website colors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        id="primaryColor"
                        value={siteData.colors.primary}
                        onChange={(e) =>
                          setSiteData((prev) => ({
                            ...prev,
                            colors: { ...prev.colors, primary: e.target.value },
                          }))
                        }
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={siteData.colors.primary}
                        onChange={(e) =>
                          setSiteData((prev) => ({
                            ...prev,
                            colors: { ...prev.colors, primary: e.target.value },
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        id="secondaryColor"
                        value={siteData.colors.secondary}
                        onChange={(e) =>
                          setSiteData((prev) => ({
                            ...prev,
                            colors: { ...prev.colors, secondary: e.target.value },
                          }))
                        }
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={siteData.colors.secondary}
                        onChange={(e) =>
                          setSiteData((prev) => ({
                            ...prev,
                            colors: { ...prev.colors, secondary: e.target.value },
                          }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Services & Pricing</CardTitle>
                    <CardDescription>Manage your service offerings</CardDescription>
                  </div>
                  <Button onClick={addService}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {siteData.services.map((service, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Service {index + 1}</CardTitle>
                        <Button variant="destructive" size="sm" onClick={() => removeService(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Service Name</Label>
                          <Input value={service.name} onChange={(e) => updateService(index, "name", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input
                            value={service.duration}
                            onChange={(e) => updateService(index, "duration", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          value={service.price}
                          onChange={(e) => updateService(index, "price", Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={service.description}
                          onChange={(e) => updateService(index, "description", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Photo Gallery</CardTitle>
                <CardDescription>Upload and manage your portfolio images</CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                />
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-pink-500 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Photos</h3>
                  <p className="text-gray-600 mb-4">Drag and drop your images here, or click to browse</p>
                  <Button disabled={isLoading}>
                    {isLoading ? "Uploading..." : "Choose Files"}
                  </Button>
                </div>

                {/* Gallery Grid */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {siteData.gallery?.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>How clients can reach you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={siteData.phone}
                      onChange={(e) => setSiteData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={siteData.email}
                      onChange={(e) => setSiteData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea
                      id="address"
                      value={siteData.address}
                      onChange={(e) => setSiteData((prev) => ({ ...prev, address: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                  <CardDescription>When you're open for appointments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(siteData.hours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between">
                      <Label className="w-24">{day}</Label>
                      <Input
                        value={hours}
                        onChange={(e) =>
                          setSiteData((prev) => ({
                            ...prev,
                            hours: { ...prev.hours, [day]: e.target.value },
                          }))
                        }
                        className="flex-1 ml-4"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Connect your social accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram Handle</Label>
                    <Input
                      id="instagram"
                      value={siteData.social.instagram}
                      onChange={(e) =>
                        setSiteData((prev) => ({
                          ...prev,
                          social: { ...prev.social, instagram: e.target.value },
                        }))
                      }
                      placeholder="@yourbusiness"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook Page</Label>
                    <Input
                      id="facebook"
                      value={siteData.social.facebook}
                      onChange={(e) =>
                        setSiteData((prev) => ({
                          ...prev,
                          social: { ...prev.social, facebook: e.target.value },
                        }))
                      }
                      placeholder="yourbusinesspage"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
