import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const booking = await request.json()

    // Insert booking into database
    const { data, error } = await supabase.from("bookings").insert([booking]).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // TODO: Send confirmation email to client
    // TODO: Send notification to business owner

    return NextResponse.json({ booking: data[0] })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Error creating booking" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get("siteId")

    if (!siteId) {
      return NextResponse.json({ error: "Site ID required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("site_id", siteId)
      .order("appointment_date", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ bookings: data })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Error fetching bookings" }, { status: 500 })
  }
}
