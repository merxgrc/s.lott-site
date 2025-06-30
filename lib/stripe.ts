// STRIPE INTEGRATION - COMMENTED OUT FOR NOW

/*
// Stripe configuration for payments
// TODO: Add your Stripe publishable key

import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export { stripePromise }

// Stripe price IDs for your plans
export const STRIPE_PRICES = {
  professional: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID || "",
  enterprise: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID || "",
}

// Helper function to create checkout session
export const createCheckoutSession = async (priceId: string, customerId?: string) => {
  const response = await fetch("/api/stripe/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      priceId,
      customerId,
    }),
  })

  const session = await response.json()
  return session
}

// Helper function to create customer portal session
export const createPortalSession = async (customerId: string) => {
  const response = await fetch("/api/stripe/create-portal-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId,
    }),
  })

  const session = await response.json()
  return session
}
*/
