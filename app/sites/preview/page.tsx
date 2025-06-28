"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function PreviewSitePage() {
  const router = useRouter()

  useEffect(() => {
    const redirectToUserSite = async () => {
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
          // Not authenticated, redirect to dashboard
          router.push("/dashboard")
          return
        }

        // Get user's site
        const { data: site, error: siteError } = await supabase
          .from("sites")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (siteError || !site) {
          // No site found, redirect to site builder
          router.push("/dashboard/site-builder")
          return
        }

        if (site.subdomain) {
          // Redirect to actual user site
          window.location.href = `https://${site.subdomain}.${process.env.NEXT_PUBLIC_MAIN_DOMAIN}`
        } else {
          // No subdomain, redirect to site builder
          router.push("/dashboard/site-builder")
        }
      } catch (error) {
        console.error("Error redirecting to user site:", error)
        router.push("/dashboard")
      }
    }

    redirectToUserSite()
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your site...</p>
      </div>
    </div>
  )
}
