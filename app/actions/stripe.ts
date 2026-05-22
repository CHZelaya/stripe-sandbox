'use server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
})

export async function createConnectedAccount() {
    //* Creating a new Express Account - Stripe will host the onboarding.
    const account = await stripe.accounts.create({
        type: 'express', 
        country: 'CAN',
        capabilities: {
            transfers: { requested: true },
        },
    })

    const accountLink = await stripe.accountLinks.create({
        //* Generating the onboading link for the created account.
        account: account.id,
        refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/refresh`,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/success`,
        type: 'account_onboarding',

    })


    return { accountId: account.id, onboardingUrl: accountLink.url }

}