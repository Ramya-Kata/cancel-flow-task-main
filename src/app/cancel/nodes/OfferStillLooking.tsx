'use client'

import type { Dispatch, SetStateAction } from 'react'
import CardShell from './CardShell'
import Image from './Image'

type Props = {
  onAction: (a: 'back' | 'accept' | 'decline') => void
  state: any
  setState: Dispatch<SetStateAction<any>>
}

export default function OfferStillLooking({ onAction, state, setState }: Props) {
  const acceptOffer = () => {
    setState((s: any) => ({ ...s, offer_choice: '50_off_until_job' }))
    onAction('accept')
  }

  const declineOffer = () => {
    setState((s: any) => ({ ...s, offer_choice: 'declined' }))
    onAction('decline')
  }

  return (
    <CardShell
      title="Subscription Cancellation"
      currentStep={1}
      totalSteps={3}
      onBack={() => onAction('back')}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Right image on desktop */}
        <div className="lg:order-2 lg:col-span-6">
          <Image />
        </div>

        {/* Left copy + offer */}
        <div className="lg:order-1 lg:col-span-6 flex flex-col justify-center">
          <div className="space-y-4">
            <h2 className="text-[28px] lg:text-[34px] font-semibold tracking-tight text-gray-900">
              We built this to help you land the job, this makes it a little easier.
            </h2>
            <p className="text-sm md:text-base text-gray-700">
              We’ve been there and we’re here to help you.
            </p>
          </div>

          {/* Offer card */}
          <div className="mt-6 rounded-lg border border-purple-200 bg-purple-50 p-4 shadow-sm">
            <p className="text-gray-900 text-base md:text-lg">
              <span className="font-semibold">Here’s <span className="underline">50% off</span></span> until you find a job:
            </p>

            <div className="mt-2 flex items-baseline gap-3">
              <div className="text-[18px] font-semibold text-purple-700">$12.50/month</div>
              <div className="text-xs text-gray-500 line-through">$25/month</div>
            </div>

            <button
              onClick={acceptOffer}
              className="mt-4 w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
                         bg-green-600 text-white hover:bg-green-700
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40"
            >
              Get 50% off
            </button>

            <p className="mt-2 text-[11px] text-gray-600 text-center">
              You won’t be charged until your next billing date.
            </p>
          </div>

          {/* Secondary action */}
          <button
            onClick={declineOffer}
            className="mt-4 w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
                       border border-gray-300 bg-white text-gray-900
                       hover:bg-gray-100 hover:border-gray-400
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 transition-colors"
          >
            No thanks
          </button>
        </div>
      </div>
    </CardShell>
  )
}
