import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' as any })

export async function POST(req: NextRequest) {
  const { paymentIntentId, bookingId } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const pi = await stripe.paymentIntents.retrieve(paymentIntentId)

  if (pi.status === 'succeeded') {
    await supabase.from('bookings').update({
      stripe_payment_status: 'paid',
      status: 'confirmed',
      stripe_payment_intent_id: paymentIntentId,
    }).eq('id', bookingId)

    await supabase.from('notifications').insert({
      user_id: pi.metadata.customerId,
      title: 'Booking Confirmed!',
      body: 'Your payment was successful. Your booking is confirmed.',
      type: 'payment',
      booking_id: bookingId,
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 400 })
}
