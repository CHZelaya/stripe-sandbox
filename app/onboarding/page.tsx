'use client'

import { useState } from 'react'
import { createConnectedAccount } from '../actions/stripe'

export default function OnboardingPage() {
    const [loading, setLoading] = useState(false)

    const handleOnboarding = async () => {
        setLoading(true)
        const { onboardingUrl } = await createConnectedAccount()
        //* Redirect the user to the Stripe onboarding URL
        window.location.href = onboardingUrl
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-bold">Contractor Onboarding</h1>
            <p className="text-gray-500">Connect your bank account to start receiving payments.
            </p>

            <button
            onClick={handleOnboarding}
            disabled={loading} 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >{loading ? 'Redirecting...' : 'Start Onboarding'}
            </button>


        </main>
    )
}