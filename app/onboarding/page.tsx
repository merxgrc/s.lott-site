"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Palette } from "lucide-react"
import Image from "next/image"

const templates = [
  {
    id: "elegant",
    name: "Elegant",
    description: "Perfect for luxury spas and high-end estheticians",
    preview: "/placeholder.svg?height=300&width=400",
    popular: true,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design for modern practices",
    preview: "/placeholder.svg?height=300&width=400",
    popular: false,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and focused design that highlights your work",
    preview: "/placeholder.svg?height=300&width=400",
    popular: false,
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    subdomain: "",
    businessType: "esthetician",
  })

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Complete onboarding
      // TODO: Create site in database and redirect to dashboard
      window.location.href = "/dashboard"
    }
  }

  const handleSubdomainChange = (value: string) => {
    // Clean subdomain (lowercase, no spaces, alphanumeric only)
    const cleanSubdomain = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 20)
    setBusinessInfo((prev) => ({ ...prev, subdomain: cleanSubdomain }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNumber <= step ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber < step ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${stepNumber < step ? "bg-pink-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Step {step} of 3</p>
          </div>
        </div>

        {/* Step 1: Business Information */}
        {step === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Palette className="h-8 w-8 text-pink-600" />
                <span className="text-2xl font-bold text-gray-900">BeautyBuilder</span>
              </div>
              <CardTitle className="text-2xl">Let's set up your business</CardTitle>
              <CardDescription>Tell us about your beauty business to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="e.g., Bella's Beauty Studio"
                  value={businessInfo.businessName}
                  onChange={(e) => setBusinessInfo((prev) => ({ ...prev, businessName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdomain">Choose Your Website Address</Label>
                <div className="flex items-center">
                  <Input
                    id="subdomain"
                    placeholder="bellas-beauty"
                    value={businessInfo.subdomain}
                    onChange={(e) => handleSubdomainChange(e.target.value)}
                    className="rounded-r-none"
                  />
                  <div className="bg-gray-100 border border-l-0 px-3 py-2 rounded-r-md text-sm text-gray-600">
                    .beautybuilder.com
                  </div>
                </div>
                {businessInfo.subdomain && (
                  <p className="text-sm text-gray-600">
                    Your website will be: <strong>{businessInfo.subdomain}.beautybuilder.com</strong>
                  </p>
                )}
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-pink-600 hover:bg-pink-700"
                disabled={!businessInfo.businessName || !businessInfo.subdomain}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Template Selection */}
        {step === 2 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Choose Your Template</CardTitle>
              <CardDescription>Select a design that matches your brand style</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedTemplate === template.id ? "ring-2 ring-pink-600 shadow-lg" : ""
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="relative">
                      <div className="aspect-[4/3] bg-gray-100 rounded-t-lg">
                        <Image
                          src={template.preview || "/placeholder.svg"}
                          alt={`${template.name} template`}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      {template.popular && <Badge className="absolute top-3 left-3 bg-pink-600">Popular</Badge>}
                      {selectedTemplate === template.id && (
                        <div className="absolute inset-0 bg-pink-600/20 rounded-t-lg flex items-center justify-center">
                          <div className="bg-pink-600 text-white rounded-full p-2">
                            <Check className="w-6 h-6" />
                          </div>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-pink-600 hover:bg-pink-700"
                disabled={!selectedTemplate}
              >
                Continue with {selectedTemplate ? templates.find((t) => t.id === selectedTemplate)?.name : "Template"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">You're All Set! 🎉</CardTitle>
              <CardDescription>Your beauty website is ready to customize</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Business Name:</span>
                  <span>{businessInfo.businessName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Website URL:</span>
                  <span className="text-pink-600">{businessInfo.subdomain}.beautybuilder.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Template:</span>
                  <span>{templates.find((t) => t.id === selectedTemplate)?.name}</span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Your website has been created! You can now customize your content, add services, upload photos, and
                  start accepting bookings.
                </p>

                <Button onClick={handleNext} className="w-full bg-pink-600 hover:bg-pink-700">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
