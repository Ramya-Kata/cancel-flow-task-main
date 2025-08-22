'use client'

import CardShell from './CardShell'
import Image from './Image'

type Props = { onAction: (a: 'finish' | 'back') => void }

export default function SubscriptionContinued({ onAction }: Props) {
  return (
    <CardShell title="Subscription" >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* image on right (desktop) */}
        <div className="lg:order-2 lg:col-span-6">
          <Image className="h-[260px] lg:h-[360px]" />
        </div>

        {/* copy on left */}
        <div className="lg:order-1 lg:col-span-6 flex flex-col justify-center">
          <h2 className="text-[26px] lg:text-[32px] font-semibold tracking-tight text-gray-900">
            Great choice, mate!
          </h2>

          <p className="mt-2 text-gray-900">
            You’re still on the path to your dream role.{' '}
            <span className="text-[#7E57FF] font-semibold">
              Let’s make it happen together!
            </span>
          </p>

          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p>You’ve got <span className="font-medium">XX days</span> left on your current plan.</p>
            <p>Starting from <span className="font-medium">XX date</span>, your monthly payment will be <span className="font-medium">$12.50</span>.</p>
            <p className="italic text-gray-500">You can cancel anytime before then.</p>
          </div>

          <hr className="my-6 border-gray-200" />

          <button
            onClick={() => onAction('finish')}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
                       bg-[#7E57FF] text-white hover:opacity-90
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E57FF]/40"
          >
            Land your dream role
          </button>
        </div>
      </div>
    </CardShell>
  )
}
