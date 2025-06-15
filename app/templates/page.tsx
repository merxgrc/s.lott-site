"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Search, Palette, Sparkles, Zap } from "lucide-react"
import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"

const templates = [
  {
    id: "elegant",
    name: "Elegant",
    description: "Perfect for luxury spas and high-end estheticians",
    category: "Luxury",
    color: "pink",
    features: ["Booking System", "Gallery", "Contact Form", "About Page"],
    preview: "/placeholder.svg?height=400&width=600",
    popular: true,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design for modern practices",
    category: "Modern",
    color: "purple",
    features: ["Booking System", "Gallery", "Contact Form", "Services Page"],
    preview: "/placeholder.svg?height=400&width=600",
    popular: false,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and focused design that highlights your work",
    category: "Minimal",
    color: "blue",
    features: ["Booking System", "Gallery", "Contact Form"],
    preview: "/placeholder.svg?height=400&width=600",
    popular: false,
  },
  {
    id: "botanical",
    name: "Botanical",
    description: "Nature-inspired design perfect for organic skincare",
    category: "Natural",
    color: "green",
    features: ["Booking System", "Gallery", "Contact Form", "Blog"],
    preview: "/placeholder.svg?height=400&width=600",
    popular: true,
  },
  {
    id: "glamour",
    name: "Glamour",
    description: "Bold and glamorous design for makeup artists",
    category: "Luxury",
    color: "gold",
    features: ["Booking System", "Gallery", "Contact Form", "Portfolio"],
    preview: "/placeholder.svg?height=400&width=600",
    popular: false,
  },
  {
    id: "wellness",
    name: "Wellness",
    description: "Calming design focused on wellness and relaxation",
    category: "Wellness",
    color: "teal",
    features: ["Booking System", "Gallery", "Contact Form", "Services"],
    preview: "/placeholder.svg?height=400&width=600",
    popular: false,
  },
]

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const categories = ["all", "Luxury", "Modern", "Minimal", "Natural", "Wellness"]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    // TODO: Navigate to site builder with selected template
    // router.push(`/dashboard/site-builder?template=${templateId}`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Template</h1>
          <p className="text-gray-600 mt-2">
            Select a professionally designed template to get started with your website
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-[3/2] bg-gray-100">
                  <Image
                    src={template.preview || "/placeholder.svg"}
                    alt={`${template.name} template preview`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                {template.popular && (
                  <Badge className="absolute top-3 left-3 bg-pink-600">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="outline">{template.category}</Badge>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Includes:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-pink-600 hover:bg-pink-700"
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Custom Template Option */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-pink-300 transition-colors">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Palette className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need something custom?</h3>
            <p className="text-gray-600 text-center mb-4">
              Contact our design team to create a unique template for your brand
            </p>
            <Button variant="outline">Request Custom Design</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
