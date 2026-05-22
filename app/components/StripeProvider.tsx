'use client'

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

//! stripePromie is called outside the component. 
//! This is a best practice recommended by Stripe to avoid re-initializing the Stripe object on every render, which can lead to performance issues. By calling loadStripe outside the component, we ensure that the Stripe object is created only once and reused across renders.

export default function StripeProvider({
    children, 
    clientSecret
} : {
    children: React.ReactNode,
    clientSecret: string
}) {
    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            {children}
        </Elements>
    )
}