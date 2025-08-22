'use client'

import CardShell from './CardShell'
import Image from './Image'

type Props = { onAction: (a: 'finish' | 'back') => void }

export default function CancelDoneVisaHelpYes({ onAction }: Props) {
  return (
    <CardShell
      title="Subscription Cancelled"
      currentStep={3}
      totalSteps={3}
      statusLabel="Completed"            
      
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left copy */}
        <div className="lg:col-span-6">
          <h2 className="text-[28px] lg:text-[34px] font-semibold tracking-tight text-gray-900">
            All done, your cancellation’s been processed.
          </h2>

          <p className="mt-4 text-gray-800">
            We’re stoked to hear you’ve landed a job and sorted your visa. Big
            congrats from the team. 🙌
          </p>

          <hr className="my-6 border-gray-200" />

          <button
            onClick={() => onAction('finish')}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
                       bg-[#7E57FF] text-white hover:opacity-90
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E57FF]/40"
          >
            Finish
          </button>
        </div>

        {/* Right image */}
        <div className="hidden lg:block lg:col-span-6 lg:self-start">
          <Image className="h-[360px]" />
        </div>
      </div>
    </CardShell>
  )
}
