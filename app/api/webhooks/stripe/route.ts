import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
})

export async function POST(request: NextRequest) {
    const body = await request.text()
    const signature = (await headers()).get('stripe-signature')!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature, 
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        //! If the signiture verfication fails, reject the request with a 400 error.
        //! Preventing malicious actors from faking payment events. 
        return NextResponse.json({ error: 'Invalid Signature' }, { status: 400 })
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            console.log(`Payment for ${paymentIntent.id} succeeded.`)

            //* Database updates go here, send comfirmation emails etc etc
            break
        case 'payment_intent.payment_failed':
            const failedPaymentIntent = event.data.object as Stripe.PaymentIntent
            console.log(`Payment for ${failedPaymentIntent.id} failed.`)

            //* Handle failed payment, notify the user, etc.
            break
    }
    return NextResponse.json({ recieved: true})
}

