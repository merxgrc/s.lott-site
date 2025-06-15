// Supabase client configuration
// TODO: Add your Supabase project URL and anon key

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for your database tables
export interface User {
  id: string
  email: string
  business_name: string
  full_name: string
  subdomain: string
  plan: "free" | "professional" | "enterprise"
  created_at: string
  updated_at: string
}

export interface Site {
  id: string
  user_id: string
  subdomain: string
  template_id: string
  custom_domain?: string
  site_data: {
    businessName: string
    tagline: string
    description: string
    owner: string
    phone: string
    email: string
    address: string
    hours: Record<string, string>
    social: {
      instagram?: string
      facebook?: string
    }
    services: Array<{
      name: string
      description: string
      duration: string
      price: number
    }>
    gallery: string[]
  }
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  site_id: string
  client_name: string
  client_email: string
  client_phone: string
  service_name: string
  appointment_date: string
  appointment_time: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  notes?: string
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  site_id: string
  name: string
  email: string
  phone: string
  notes?: string
  created_at: string
  updated_at: string
}

// Auth helper functions
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
