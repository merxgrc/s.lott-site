import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""

  // Get the subdomain
  const subdomain = hostname.split(".")[0]

  // Main domain (your SaaS platform)
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "localhost:3000"

  // If it's the main domain, continue normally
  if (hostname === mainDomain || hostname.includes("localhost") || hostname.includes("vercel.app")) {
    return NextResponse.next()
  }

  // If it's a subdomain, rewrite to the tenant site
  if (subdomain && subdomain !== "www") {
    url.pathname = `/sites/${subdomain}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
