import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10' as any,
  appInfo: {
    name: 'Boys@Work',
    version: '1.0.0'
  }
})
