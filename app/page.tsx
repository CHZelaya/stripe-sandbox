import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold">Stripe Sandbox</h1>
      <div className="flex gap-4">
        <Link
          href="/onboarding"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Contractor Onboarding
        </Link>
        <Link
          href="/pay"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Make a Payment
        </Link>
      </div>
    </main>
  )
}