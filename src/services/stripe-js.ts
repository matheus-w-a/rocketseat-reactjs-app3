import { loadStripe } from '@stripe/stripe-js'

export async function getStripeJs() {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

  return stripeJs
}

//integração do stripe para frontend - sdk do stripe para frontend