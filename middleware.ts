import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""
  
  // List of main domains (add your production domain here)
  const mainDomains = [
    "localhost:3000",
    "your-main-domain.vercel.app", // Replace with your actual Vercel domain
    "your-custom-domain.com", // Replace with your custom domain if you have one
  ]
  
  // Check if it's a main domain (not a subdomain)
  const isMainDomain = mainDomains.some(domain => hostname === domain)
  
  if (isMainDomain) {
    // This is the main app domain - serve normal routes
    return NextResponse.next()
  }
  
  // Extract subdomain
  const subdomain = hostname.split('.')[0]
  
  // Skip if it's www or other common subdomains
  if (subdomain === 'www' || subdomain === 'api') {
    return NextResponse.next()
  }
  
  // For subdomains, rewrite to the tenant site page
  url.pathname = `/sites/${subdomain}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
