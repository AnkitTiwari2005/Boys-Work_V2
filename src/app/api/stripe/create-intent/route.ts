import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' as any })

export async function POST(req: NextRequest) {
  const { amount, bookingId, customerId } = await req.json()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'inr',
    metadata: { bookingId, customerId },
    automatic_payment_methods: { enabled: true },
  })

  return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}
