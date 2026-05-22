'use client'

import React, { useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"


export default function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()
    const [isProcessing, setIsProcessing] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
     
        //! Stripe.js hasn't loadet yet, never submit before ready.
        if (!stripe || !elements) return

        setIsProcessing(true)

        const { error } = await stripe.confirmPayment({
            elements, 
            confirmParams: {
                return_url: `${window.location.origin}/payment/complete`,
            },
        })
        if (error) {
            setMessage(error.message ?? 'Something went wrong.')
        }

        setIsProcessing(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />

            <button disabled={isProcessing || !stripe}>
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>

            {message && <p>{message}</p>}
        </form>
    )
}