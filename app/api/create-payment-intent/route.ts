import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
})

export async function POST(request: NextRequest){
    const { amount, contractorStripeAccountId } = await request.json()

    const paymentIntent = await stripe.paymentIntents.create({
        amount, // Always in the smallest currency unit (e.g., cents for USD)
        currency: 'cad',
        // After payment, transfer funds to the contractor's connected account
        transfer_data: {
            destination: contractorStripeAccountId,
        },
        application_fee_amount: Math.round(amount * 0.02), // 2% platform fee
    })
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}

//! Stripe Gotchas:
//? 1. Always use the smallest currency unit (e.g., cents for USD) when creating payment intents.
//? 2. Ensure that the connected account ID is correct to avoid failed transfers.
//? 3. Handle errors gracefully, especially for payment failures or invalid account IDs.

//! Application Fees:
//? The `application_fee_amount` is how platforms such as Stripe make money. Stripe automatically splits the payment, the feee stays in the platform account, the rest goes to the contractor. In this example, we are charging a 2% fee on top of the amount paid by the client. 
//? This is real marketplace logic.

