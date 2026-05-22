'use client'

import { useState, useEffect } from 'react'
import StripeProvider from '../components/StripeProvider'
import PaymentForm from '../components/PaymentForm'

export default function PayPage() {
    const [clientSecret, setClientSecret] = useState<string | null>(null)

    useEffect(() => {
        // Create a PaymentIntent as soon as the page loads
        fetch('/api/create-payment-intent', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                amount: 2000, // Amount in cents, e.g. $20.00, hardcoded for testing
                contractorStripeAccountId: 'acct_1TZxZHGgm2EUEILX', //Hardcoded test account
            }), 
        })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
        .catch(err => console.error('Error creating PaymentIntent:', err))
    }, [])

    if (!clientSecret) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Loading Payment...</h1>
            </main>
        )
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-bold">Make a Payment</h1>
            <div className="w-full max-w-md p-6 border rounded-lg shadow">
                <StripeProvider clientSecret={clientSecret}>
                    <PaymentForm />
                </StripeProvider>
            </div>
        </main>
    )
}