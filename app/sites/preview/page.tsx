"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Instagram, Facebook, Star, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This is a preview version that anyone can access
const siteData = {
  businessName: "Bella's Beauty Studio",
  tagline: "Luxury Skincare & Esthetics",
  description:
    "Transform your skin with our premium facial treatments and personalized skincare solutions. Located in the heart of downtown, we provide a serene escape for your beauty needs.",
  owner: "Isabella Rodriguez",
  phone: "(555) 123-4567",
  email: "hello@bellasbeauty.com",
  address: "123 Beauty Lane, Downtown City, CA 90210",
  hours: {
    Monday: "9:00 AM - 7:00 PM",
    Tuesday: "9:00 AM - 7:00 PM",
    Wednesday: "9:00 AM - 7:00 PM",
    Thursday: "9:00 AM - 8:00 PM",
    Friday: "9:00 AM - 8:00 PM",
    Saturday: "10:00 AM - 6:00 PM",
    Sunday: "Closed",
  },
  social: {
    instagram: "@bellasbeauty",
    facebook: "bellasbeautystudio",
  },
  services: [
    {
      name: "Signature Facial",
      description: "Our most popular treatment featuring deep cleansing, exfoliation, and hydration",
      duration: "60 min",
      price: 120,
    },
    {
      name: "Chemical Peel",
      description: "Professional-grade peel to reveal smoother, brighter skin",
      duration: "45 min",
      price: 150,
    },
    {
      name: "Microdermabrasion",
      description: "Gentle exfoliation treatment for improved skin texture",
      duration: "50 min",
      price: 100,
    },
    {
      name: "Eyebrow Shaping",
      description: "Expert eyebrow shaping and tinting services",
      duration: "30 min",
      price: 45,
    },
  ],
  gallery: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  reviews: [
    {
      name: "Sarah M.",
      rating: 5,
      text: "Amazing facial! Isabella is so knowledgeable and my skin has never looked better.",
      date: "2 weeks ago",
    },
    {
      name: "Emma K.",
      rating: 5,
      text: "The studio is beautiful and relaxing. Highly recommend the signature facial!",
      date: "1 month ago",
    },
    {
      name: "Lisa R.",
      rating: 5,
      text: "Professional service and great results. Will definitely be back!",
      date: "1 month ago",
    },
  ],
}

export default function PreviewSitePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Preview Banner */}
      <div className="bg-pink-600 text-white p-3 text-center">
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="bg-white text-pink-600">
            PREVIEW MODE
          </Badge>
          <span className="text-sm">This is how your website will look to visitors</span>
          <Link href="/dashboard/site-builder">
            <Button variant="secondary" size="sm" className="bg-white text-pink-600 hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Editor
            </Button>
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{siteData.businessName}</h1>
            <p className="text-pink-600 text-sm">{siteData.tagline}</p>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-pink-600">
              About
            </a>
            <a href="#services" className="text-gray-600 hover:text-pink-600">
              Services
            </a>
            <a href="#gallery" className="text-gray-600 hover:text-pink-600">
              Gallery
            </a>
            <a href="#contact" className="text-gray-600 hover:text-pink-600">
              Contact
            </a>
          </nav>
          <Button className="bg-pink-600 hover:bg-pink-700">Book Now</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Experience Luxury
              <span className="text-pink-600"> Skincare</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">{siteData.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                Book Appointment
              </Button>
              <Button size="lg" variant="outline">
                View Services
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:block">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Beauty studio interior"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Meet {siteData.owner}</h3>
              <p className="text-gray-600 mb-6">
                With over 8 years of experience in esthetics, I'm passionate about helping clients achieve their best
                skin. I specialize in customized facial treatments and believe that healthy skin is the foundation of
                confidence.
              </p>
              <p className="text-gray-600 mb-8">
                My studio provides a tranquil environment where you can relax and rejuvenate while receiving
                professional skincare treatments tailored to your unique needs.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-pink-100 text-pink-800">Licensed Esthetician</Badge>
                <Badge className="bg-purple-100 text-purple-800">8+ Years Experience</Badge>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt={siteData.owner}
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional treatments designed to enhance your natural beauty
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteData.services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {service.duration}
                        </Badge>
                        <span className="text-2xl font-bold text-pink-600">${service.price}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">Book This Service</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Work</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See the amazing transformations and results from our treatments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.gallery.map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Real reviews from satisfied clients</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteData.reviews.map((review, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">"{review.text}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ready to book your appointment? Contact us today!</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-pink-600 mr-3" />
                    <span>{siteData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-pink-600 mr-3" />
                    <span>{siteData.email}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-pink-600 mr-3 mt-1" />
                    <span>{siteData.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Hours</h4>
                <div className="space-y-2">
                  {Object.entries(siteData.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Follow Us</h4>
                <div className="flex space-x-4">
                  <Link href="#" className="text-pink-600 hover:text-pink-700">
                    <Instagram className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="text-pink-600 hover:text-pink-700">
                    <Facebook className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>We'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="(555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interest</Label>
                    <Input id="service" placeholder="Which service are you interested in?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us about your skincare goals..." rows={4} />
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h4 className="text-xl font-bold">{siteData.businessName}</h4>
            <p className="text-gray-400">{siteData.tagline}</p>
          </div>
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; 2024 {siteData.businessName}. All rights reserved. Powered by BeautyBuilder.
          </p>
        </div>
      </footer>
    </div>
  )
}
